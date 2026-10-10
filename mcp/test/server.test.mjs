import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const serverPath = fileURLToPath(new URL("../server.mjs", import.meta.url));

test("MCP client evaluates the sample and explains a late event", async () => {
  const client = new Client({ name: "workflow-test", version: "1.0.0" });
  const transport = new StdioClientTransport({ command: process.execPath, args: [serverPath] });
  try {
    await client.connect(transport);
    const tools = await client.listTools();
    assert.deepEqual(tools.tools.map(tool => tool.name).sort(), ["evaluate_outreach_workflow", "explain_outreach_event"]);
    const evaluated = await client.callTool({ name: "evaluate_outreach_workflow", arguments: {} });
    assert.equal(evaluated.structuredContent.summary.eligibleEvents, 10);
    const late = evaluated.structuredContent.outcomes.find(item => item.status === "late_data");
    const explained = await client.callTool({ name: "explain_outreach_event", arguments: { eventId: late.eventId } });
    assert.equal(explained.structuredContent.status, "late_data");
    assert.equal(explained.structuredContent.eventId, late.eventId);
    const missing = await client.callTool({ name: "evaluate_outreach_workflow", arguments: { dataPath: "/missing/workflow.json" } });
    assert.equal(missing.isError, true);
  } finally {
    await client.close();
  }
});
