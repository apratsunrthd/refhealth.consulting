import { readFile, stat } from "node:fs/promises";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { inspectCsv, inspectFhir } from "./feed-core.mjs";

const samplePath = fileURLToPath(new URL("./sample-feed.csv", import.meta.url));

async function inspect(dataPath, windowHours) {
  const path = dataPath || samplePath;
  const extension = extname(path).toLowerCase();
  if (![".csv", ".json"].includes(extension)) throw new Error("Choose a .csv event feed or .json FHIR Bundle.");
  let file;
  let content;
  try {
    file = await stat(path);
    if (!file.isFile() || file.size > 10 * 1024 * 1024) throw new Error("Choose a file under 10 MB.");
    content = await readFile(path, "utf8");
  } catch (error) {
    if (error.message === "Choose a file under 10 MB.") throw error;
    throw new Error("Could not open the file. Check its path and read permissions.");
  }
  if (extension === ".csv") return inspectCsv(content, { windowHours });
  try { return inspectFhir(JSON.parse(content)); }
  catch (error) {
    if (error instanceof SyntaxError) throw new Error("Invalid JSON FHIR Bundle.");
    throw error;
  }
}

const server = new McpServer({ name: "refhealth-feed-triage", version: "0.1.0" });
server.registerTool("inspect_healthcare_feed", {
  title: "Inspect a healthcare event feed",
  description: "Read a local CSV event feed or FHIR Bundle and return aggregate counts, delivery timing when receipt timestamps exist, and row-numbered quality findings. Defaults to a bundled synthetic CSV. Does not return patient IDs, event IDs, or raw records. Use only synthetic or approved de-identified data; findings are shared with the AI client.",
  inputSchema: {
    dataPath: z.string().optional().describe("Absolute path to a local .csv or .json file; omit for the bundled synthetic CSV"),
    windowHours: z.number().int().min(1).max(168).optional().describe("CSV event-to-receipt delivery target in hours; default 24. FHIR Bundles have no receipt timestamp and do not use this value")
  },
  annotations: { readOnlyHint: true, openWorldHint: false }
}, async ({ dataPath, windowHours }) => {
  try {
    const value = await inspect(dataPath, windowHours);
    return { content: [{ type: "text", text: JSON.stringify(value) }], structuredContent: value };
  } catch (error) {
    return { isError: true, content: [{ type: "text", text: error instanceof Error ? error.message : "Could not inspect the feed." }] };
  }
});

await server.connect(new StdioServerTransport());
