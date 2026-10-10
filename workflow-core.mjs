// Shared deterministic workflow evaluation for the browser and local MCP server.
export const DEFAULT_WINDOW_HOURS = 48;

function timestamp(value) {
  if (typeof value !== "string" || !/T.*(?:Z|[+-]\d\d:\d\d)$/.test(value)) return NaN;
  return Date.parse(value);
}

function hours(ms) {
  return Math.round(ms / 360000) / 10;
}

export function evaluateWorkflow(data, { windowHours = DEFAULT_WINDOW_HOURS, includeInpatient = true } = {}) {
  if (!data || !Array.isArray(data.events) || !Array.isArray(data.attempts)) {
    throw new Error("Choose a workflow JSON file with events and attempts arrays.");
  }
  if (data.events.length > 5000 || data.attempts.length > 5000) throw new Error("Use at most 5,000 events and 5,000 attempts.");
  if (!Number.isInteger(windowHours) || windowHours < 1 || windowHours > 168) throw new Error("The outreach window must be 1–168 whole hours.");
  const asOf = timestamp(data.asOf);
  if (!Number.isFinite(asOf)) throw new Error("The dataset needs a valid asOf timestamp with a timezone.");

  const issues = [];
  const byId = new Map();
  const conflicts = new Set();
  for (const [index, event] of data.events.entries()) {
    const row = index + 1;
    const occurred = timestamp(event?.occurredAt);
    const received = timestamp(event?.receivedAt);
    if (!event?.eventId || !event?.memberId || !event?.eventType || !Number.isFinite(occurred) || !Number.isFinite(received) || received < occurred || received > asOf) {
      issues.push({ kind: "invalid_event", row, eventId: event?.eventId || null, detail: "Missing ID, member, type, valid timestamps, or receipt falls outside the event-to-evaluation period." });
      continue;
    }
    const prior = byId.get(event.eventId);
    if (prior) {
      if (prior.memberId !== event.memberId || prior.eventType !== event.eventType || prior.occurredAt !== event.occurredAt) {
        conflicts.add(event.eventId);
        issues.push({ kind: "conflicting_event", row, eventId: event.eventId, detail: "The same event ID has conflicting member, type, or event time; excluded from the cohort." });
      } else {
        issues.push({ kind: "duplicate_event", row, eventId: event.eventId, detail: "Repeated delivery of the same event ID; counted once." });
        if (received < timestamp(prior.receivedAt)) byId.set(event.eventId, event);
      }
      continue;
    }
    byId.set(event.eventId, event);
  }
  for (const id of conflicts) byId.delete(id);

  const attemptsByEvent = new Map();
  for (const [index, attempt] of data.attempts.entries()) {
    const at = timestamp(attempt?.attemptedAt);
    if (!attempt?.attemptId || !attempt?.eventId || !Number.isFinite(at) || at > asOf) {
      issues.push({ kind: "invalid_attempt", row: index + 1, eventId: attempt?.eventId || null, detail: "Missing attempt ID, event ID, valid timestamp, or attempt occurs after evaluation time." });
      continue;
    }
    const event = byId.get(attempt.eventId);
    if (!event) {
      issues.push({ kind: "unmatched_attempt", row: index + 1, eventId: attempt.eventId, detail: "Attempt references no usable event." });
      continue;
    }
    if (at < timestamp(event.receivedAt)) {
      issues.push({ kind: "invalid_attempt", row: index + 1, eventId: attempt.eventId, detail: "Attempt precedes receipt of its trigger event." });
      continue;
    }
    const attempts = attemptsByEvent.get(attempt.eventId) || [];
    attempts.push(attempt);
    attemptsByEvent.set(attempt.eventId, attempts);
  }

  const eligibleTypes = includeInpatient ? new Set(["EMER", "IMP"]) : new Set(["EMER"]);
  const outcomes = [];
  for (const event of byId.values()) {
    if (!eligibleTypes.has(event.eventType)) continue;
    const occurred = timestamp(event.occurredAt);
    const received = timestamp(event.receivedAt);
    const deadline = occurred + windowHours * 3600000;
    const attempts = (attemptsByEvent.get(event.eventId) || []).filter(attempt => timestamp(attempt.attemptedAt) >= occurred)
      .sort((a, b) => timestamp(a.attemptedAt) - timestamp(b.attemptedAt));
    const first = attempts[0];
    let status;
    if (received > deadline) status = "late_data";
    else if (first && timestamp(first.attemptedAt) <= deadline) status = "on_time";
    else if (first) status = "late_outreach";
    else status = asOf < deadline ? "pending" : "missed";
    outcomes.push({
      eventId: event.eventId,
      memberId: event.memberId,
      eventType: event.eventType,
      sourceRef: event.sourceRef || `Encounter/${event.eventId}`,
      occurredAt: event.occurredAt,
      receivedAt: event.receivedAt,
      deadlineAt: new Date(deadline).toISOString(),
      firstAttemptId: first?.attemptId || null,
      firstAttemptAt: first?.attemptedAt || null,
      receiptDelayHours: hours(received - occurred),
      outreachDelayHours: first ? hours(timestamp(first.attemptedAt) - occurred) : null,
      status
    });
  }
  outcomes.sort((a, b) => a.occurredAt.localeCompare(b.occurredAt));
  const counts = Object.fromEntries(["on_time", "late_outreach", "late_data", "missed", "pending"].map(status => [status, outcomes.filter(item => item.status === status).length]));
  const delays = outcomes.map(item => item.receiptDelayHours).sort((a, b) => a - b);
  const middle = Math.floor(delays.length / 2);
  const medianReceiptHours = delays.length ? (delays.length % 2 ? delays[middle] : Math.round((delays[middle - 1] + delays[middle]) * 5) / 10) : null;
  return {
    windowHours,
    includeInpatient,
    asOf: data.asOf,
    provenance: data.provenance || null,
    summary: { eligibleEvents: outcomes.length, ...counts, medianReceiptHours, dataIssues: issues.length },
    issues,
    outcomes,
    boundary: "Operational timing review only. It does not determine clinical appropriateness, consent, permitted contact, or whether outreach improved outcomes."
  };
}

export function explainEvent(data, eventId, options = {}) {
  if (!eventId) throw new Error("Provide an event ID.");
  const report = evaluateWorkflow(data, options);
  const outcome = report.outcomes.find(item => item.eventId === eventId);
  if (!outcome) throw new Error("That event is not in the eligible, usable cohort.");
  const explanations = {
    on_time: "The event arrived and the first outreach attempt occurred within the selected window.",
    late_outreach: "The event arrived within the window, but the first outreach attempt occurred after the deadline.",
    late_data: "The event reached the workflow after its outreach deadline; changing outreach execution alone cannot fix this case.",
    missed: "The event arrived within the window, but no outreach attempt was recorded by the evaluation time.",
    pending: "The event arrived within the window and its deadline has not passed yet."
  };
  return { ...outcome, explanation: explanations[outcome.status], windowHours: report.windowHours, asOf: report.asOf };
}
