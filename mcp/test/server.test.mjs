import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const serverPath = fileURLToPath(new URL("../server.mjs", import.meta.url));
const samplePath = fileURLToPath(new URL("../sample-manifest.json", import.meta.url));

test("MCP client can discover and call both local tools", async () => {
  const client = new Client({ name: "readiness-test", version: "1.0.0" });
  const transport = new StdioClientTransport({ command: process.execPath, args: [serverPath] });
  try {
    await client.connect(transport);
    const tools = await client.listTools();
    assert.deepEqual(tools.tools.map(tool => tool.name).sort(), ["list_dbt_models", "review_dbt_model"]);
    const listed = await client.callTool({ name: "list_dbt_models", arguments: { manifestPath: samplePath } });
    assert.equal(listed.structuredContent.models[0].name, "member_outreach");
    const reviewed = await client.callTool({ name: "review_dbt_model", arguments: { manifestPath: samplePath, useCase: "Member outreach" } });
    assert.equal(reviewed.structuredContent.summary.unknowns, 0);
    assert.equal(reviewed.structuredContent.followUp.length, 3);
    const missing = await client.callTool({ name: "review_dbt_model", arguments: { manifestPath: "/missing/manifest.json" } });
    assert.equal(missing.isError, true);
  } finally {
    await client.close();
  }
});
