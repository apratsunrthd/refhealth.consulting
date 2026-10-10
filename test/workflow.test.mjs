import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evaluateWorkflow, explainEvent } from "../workflow-core.mjs";

const sample = JSON.parse(readFileSync(new URL("../mcp/sample-workflow.json", import.meta.url)));

test("synthetic scenario produces traceable timing and data quality results", () => {
  const report = evaluateWorkflow(sample);
  assert.deepEqual(report.summary, {
    eligibleEvents: 10, on_time: 4, late_outreach: 3, late_data: 2,
    missed: 1, pending: 0, medianReceiptHours: 10, dataIssues: 3
  });
  assert.deepEqual(report.issues.map(issue => issue.kind), ["duplicate_event", "invalid_event", "unmatched_attempt"]);
  assert.equal(new Set(report.outcomes.map(item => item.eventId)).size, 10);
  assert.ok(report.outcomes.every(item => item.sourceRef.startsWith("Encounter/") && item.deadlineAt));
  const late = report.outcomes.find(item => item.status === "late_data");
  assert.match(explainEvent(sample, late.eventId).explanation, /after its outreach deadline/);
});

test("deadline and cohort choices change the outcome rather than fixed labels", () => {
  const short = evaluateWorkflow(sample, { windowHours: 24 });
  const long = evaluateWorkflow(sample, { windowHours: 72 });
  const emergency = evaluateWorkflow(sample, { includeInpatient: false });
  assert.equal(short.summary.on_time, 2);
  assert.equal(long.summary.on_time, 6);
  assert.equal(emergency.summary.eligibleEvents, 8);
});

test("conflicting IDs are excluded and pending events remain pending", () => {
  const data = {
    asOf: "2026-10-10T12:00:00Z",
    events: [
      { eventId: "e1", memberId: "m1", eventType: "EMER", occurredAt: "2026-10-10T10:00:00Z", receivedAt: "2026-10-10T11:00:00Z" },
      { eventId: "e2", memberId: "m2", eventType: "EMER", occurredAt: "2026-10-09T10:00:00Z", receivedAt: "2026-10-09T11:00:00Z" },
      { eventId: "e2", memberId: "m3", eventType: "EMER", occurredAt: "2026-10-09T10:00:00Z", receivedAt: "2026-10-09T11:00:00Z" }
    ],
    attempts: []
  };
  const report = evaluateWorkflow(data);
  assert.equal(report.summary.eligibleEvents, 1);
  assert.equal(report.summary.pending, 1);
  assert.equal(report.issues[0].kind, "conflicting_event");
  assert.throws(() => explainEvent(data, "e2"), /not in the eligible/);
});

test("invalid input fails clearly", () => {
  assert.throws(() => evaluateWorkflow({}), /events and attempts/);
  assert.throws(() => evaluateWorkflow(sample, { windowHours: 0 }), /1–168/);
});

test("attempts before trigger receipt or after evaluation do not count", () => {
  const data = {
    asOf: "2026-10-12T12:00:00Z",
    events: [{ eventId: "e1", memberId: "m1", eventType: "EMER", occurredAt: "2026-10-09T10:00:00Z", receivedAt: "2026-10-09T12:00:00Z" }],
    attempts: [
      { attemptId: "before", eventId: "e1", attemptedAt: "2026-10-09T11:00:00Z" },
      { attemptId: "future", eventId: "e1", attemptedAt: "2026-10-13T10:00:00Z" }
    ]
  };
  const report = evaluateWorkflow(data);
  assert.equal(report.summary.missed, 1);
  assert.equal(report.summary.dataIssues, 2);
});
