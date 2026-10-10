import { readFile, stat } from "node:fs/promises";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { evaluateManifest, listModels } from "../readiness-core.mjs";

async function readManifest(manifestPath) {
  const file = await stat(manifestPath);
  if (!file.isFile() || file.size > 10 * 1024 * 1024) throw new Error("Choose a manifest.json file under 10 MB.");
  return JSON.parse(await readFile(manifestPath, "utf8"));
}

function failure(error) {
  return { isError: true, content: [{ type: "text", text: error.message }] };
}

const server = new McpServer({ name: "refhealth-readiness", version: "0.1.0" });

server.registerTool("list_dbt_models", {
  title: "List dbt models",
  description: "List model names and IDs in a local dbt manifest.json. Reads only the named local file; no network or data upload.",
  inputSchema: { manifestPath: z.string().min(1).describe("Absolute path to a local dbt manifest.json file") },
  annotations: { readOnlyHint: true, openWorldHint: false }
}, async ({ manifestPath }) => {
  try {
    const models = listModels(await readManifest(manifestPath));
    return { content: [{ type: "text", text: JSON.stringify(models, null, 2) }], structuredContent: { models } };
  } catch (error) { return failure(error); }
});

server.registerTool("review_dbt_model", {
  title: "Review a dbt model for an AI use case",
  description: "Review documentation, ownership, tests, lineage, and declared freshness in a local dbt manifest. Returns gaps and unknowns; does not certify AI readiness or inspect data values. No network or data upload.",
  inputSchema: {
    manifestPath: z.string().min(1).describe("Absolute path to a local dbt manifest.json file"),
    modelId: z.string().optional().describe("Model unique_id from list_dbt_models; defaults to the first model"),
    useCase: z.string().max(500).optional().describe("Proposed AI workflow or decision")
  },
  annotations: { readOnlyHint: true, openWorldHint: false }
}, async ({ manifestPath, modelId, useCase }) => {
  try {
    const result = evaluateManifest(await readManifest(manifestPath), { modelId, useCase });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }], structuredContent: result };
  } catch (error) { return failure(error); }
});

await server.connect(new StdioServerTransport());
