import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const serverPath = process.env.FEED_SERVER_PATH || fileURLToPath(new URL("../server.mjs", import.meta.url));
const bundlePath = fileURLToPath(new URL("../sample-fhir-bundle.json", import.meta.url));

test("MCP client can inspect both samples and receives safe errors", async () => {
  const client = new Client({ name: "feed-test", version: "1.0.0" });
  const transport = new StdioClientTransport({ command: process.execPath, args: [serverPath] });
  try {
    await client.connect(transport);
    const tools = await client.listTools();
    assert.deepEqual(tools.tools.map(tool => tool.name), ["inspect_healthcare_feed"]);
    const csv = await client.callTool({ name: "inspect_healthcare_feed", arguments: {} });
    assert.equal(csv.structuredContent.summary.late, 1);
    const fhir = await client.callTool({ name: "inspect_healthcare_feed", arguments: { dataPath: bundlePath } });
    assert.equal(fhir.structuredContent.summary.encounters, 2);
    const missing = await client.callTool({ name: "inspect_healthcare_feed", arguments: { dataPath: "/missing/feed.csv" } });
    assert.equal(missing.isError, true);
    assert.doesNotMatch(JSON.stringify(missing), /\/missing\/feed.csv/);
  } finally { await client.close(); }
});
