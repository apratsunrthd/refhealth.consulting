import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { inspectCsv, inspectFhir } from "../feed-core.mjs";

const csv = readFileSync(new URL("../sample-feed.csv", import.meta.url), "utf8");
const fhir = JSON.parse(readFileSync(new URL("../sample-fhir-bundle.json", import.meta.url)));

test("CSV sample identifies timing, duplicate, and clock defects", () => {
  const report = inspectCsv(csv);
  assert.deepEqual(report.summary, { validEvents: 4, excludedRows: 2, onTime: 3, late: 1, medianLatencyHours: 0.8, p95LatencyHours: 31, byEventType: { discharge: 3, admission: 1 } });
  assert.deepEqual(report.issues.map(issue => issue.kind), ["duplicate_event_id", "receipt_before_event", "late_delivery"]);
  assert.equal(report.deliveryWindows.find(item => item.hours === 48).onTime, 4);
  assert.doesNotMatch(JSON.stringify(report), /synthetic-001|evt-001/);
});

test("delivery target changes the finding", () => {
  assert.equal(inspectCsv(csv, { windowHours: 48 }).summary.late, 0);
  assert.equal(inspectCsv(csv, { windowHours: 1 }).summary.late, 2);
});

test("quoted CSV and malformed inputs", () => {
  const quoted = "event_id,patient_id,event_type,event_time,received_at\na,p,\"ED, urgent\",2026-01-01T00:00:00Z,2026-01-01T01:00:00Z";
  assert.equal(inspectCsv(quoted).summary.byEventType["ED, urgent"], 1);
  assert.throws(() => inspectCsv("foo,bar\na,b"), /missing required columns/);
  assert.equal(inspectCsv(csv.replace("2026-10-01T08:15:00Z", "2026-10-01T08:15:00")).issues[0].kind, "invalid_timestamp");
});

test("conflicting duplicate IDs are not treated as trustworthy events", () => {
  const conflict = csv.replace("evt-002,synthetic-002,discharge,2026-10-01T10:00:00Z,2026-10-02T17:00:00Z\nevt-005", "evt-002,synthetic-002,discharge,2026-10-01T10:00:00Z,2026-10-02T18:00:00Z\nevt-005");
  const report = inspectCsv(conflict);
  assert.equal(report.summary.validEvents, 3);
  assert.equal(report.summary.late, 0);
  assert.match(report.issues.find(issue => issue.kind === "duplicate_event_id").detail, /both rows are excluded/);
});

test("FHIR Bundle checks references and encounter timing without inventing latency", () => {
  const report = inspectFhir(fhir);
  assert.equal(report.summary.encounters, 2);
  assert.deepEqual(report.issues.map(issue => issue.kind), ["unresolved_patient_reference", "missing_end_time"]);
  assert.equal("deliveryWindows" in report, false);
  assert.doesNotMatch(JSON.stringify(report), /synthetic-001|synthetic-002/);
});
