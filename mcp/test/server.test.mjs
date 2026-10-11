import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const serverPath = process.env.FEED_SERVER_PATH || fileURLToPath(new URL("../server.mjs", import.meta.url));
const bundlePath = fileURLToPath(new URL("../sample-fhir-bundle.json", import.meta.url));

test("MCP client can inspect both samples and receives safe errors", async () => {
  const client = new Client({ name: "feed-test", version: "1.0.0" });
  const transport = new StdioClientTransport({ command: process.execPath, args: [serverPath] });
  const directory = mkdtempSync(join(tmpdir(), "feed-triage-test-"));
  try {
    await client.connect(transport);
    const tools = await client.listTools();
    assert.deepEqual(tools.tools.map(tool => tool.name), ["inspect_healthcare_feed"]);
    const csv = await client.callTool({ name: "inspect_healthcare_feed", arguments: {} });
    assert.equal(csv.structuredContent.summary.late, 1);
    assert.match(csv.structuredContent.investigationGuide.url, /refhealth\.consulting\/feed-triage\.html\?utm_source=claude.*#investigate$/);
    assert.equal(JSON.parse(csv.content[0].text).investigationGuide.label, "How to investigate these findings");
    const fhir = await client.callTool({ name: "inspect_healthcare_feed", arguments: { dataPath: bundlePath } });
    assert.equal(fhir.structuredContent.summary.encounters, 2);
    assert.ok(fhir.structuredContent.investigationGuide);
    const cleanPath = join(directory, "clean.csv");
    writeFileSync(cleanPath, "event_id,patient_id,event_type,event_time,received_at\ne1,p1,discharge,2026-01-01T00:00:00Z,2026-01-01T01:00:00Z\n");
    const clean = await client.callTool({ name: "inspect_healthcare_feed", arguments: { dataPath: cleanPath } });
    assert.equal(clean.structuredContent.totalIssues, 0);
    assert.equal(clean.structuredContent.investigationGuide, undefined);
    const missing = await client.callTool({ name: "inspect_healthcare_feed", arguments: { dataPath: "/missing/feed.csv" } });
    assert.equal(missing.isError, true);
    assert.doesNotMatch(JSON.stringify(missing), /\/missing\/feed.csv/);
  } finally { await client.close(); rmSync(directory, { recursive: true, force: true }); }
});
