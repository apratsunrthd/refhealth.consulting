import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { evaluateWorkflow, explainEvent } from "../workflow-core.mjs";

const samplePath = fileURLToPath(new URL("./sample-workflow.json", import.meta.url));

async function readWorkflow(dataPath = samplePath) {
  const file = await stat(dataPath);
  if (!file.isFile() || file.size > 10 * 1024 * 1024) throw new Error("Choose a workflow JSON file under 10 MB.");
  return JSON.parse(await readFile(dataPath, "utf8"));
}

function failure(error) {
  return { isError: true, content: [{ type: "text", text: error.message }] };
}

function result(value) {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }], structuredContent: value };
}

const server = new McpServer({ name: "refhealth-workflow", version: "0.2.0" });

server.registerTool("evaluate_outreach_workflow", {
  title: "Evaluate outreach timing",
  description: "Evaluate synthetic or approved encounter events against outreach attempts. Returns event-level timing, missed attempts, and data defects with source IDs. Reads only a named local JSON file; defaults to the bundled synthetic scenario.",
  inputSchema: {
    dataPath: z.string().optional().describe("Absolute path to workflow JSON; omit for the bundled synthetic scenario"),
    windowHours: z.number().int().min(1).max(168).optional().describe("Hours from encounter end to outreach deadline; default 48"),
    includeInpatient: z.boolean().optional().describe("Include inpatient encounters alongside emergency encounters; default true")
  },
  annotations: { readOnlyHint: true, openWorldHint: false }
}, async ({ dataPath, windowHours, includeInpatient }) => {
  try { return result(evaluateWorkflow(await readWorkflow(dataPath), { windowHours, includeInpatient })); }
  catch (error) { return failure(error); }
});

server.registerTool("explain_outreach_event", {
  title: "Explain one outreach event",
  description: "Explain why one encounter was on time, late, missed, or pending using its receipt and outreach timestamps. Reads only a named local JSON file; defaults to the bundled synthetic scenario.",
  inputSchema: {
    eventId: z.string().min(1).describe("Event ID from evaluate_outreach_workflow"),
    dataPath: z.string().optional().describe("Absolute path to workflow JSON; omit for the bundled synthetic scenario"),
    windowHours: z.number().int().min(1).max(168).optional(),
    includeInpatient: z.boolean().optional()
  },
  annotations: { readOnlyHint: true, openWorldHint: false }
}, async ({ eventId, dataPath, windowHours, includeInpatient }) => {
  try { return result(explainEvent(await readWorkflow(dataPath), eventId, { windowHours, includeInpatient })); }
  catch (error) { return failure(error); }
});

await server.connect(new StdioServerTransport());
