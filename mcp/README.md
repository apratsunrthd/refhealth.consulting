# ref(health) Outreach Workflow MCP

A local, read-only MCP server for evaluating whether emergency and inpatient encounter events reach an outreach workflow in time, and whether outreach attempts meet a selected deadline. It shares its deterministic evaluator with the [web demo](https://refhealth.consulting/workflow-evaluator.html).

## Run

1. Download and unzip `workflow-mcp.zip` from the web demo, or use this repository checkout.
2. Install Node.js 20 or newer.
3. In the unzipped `mcp` directory, run `npm ci`.
4. Configure your MCP client to launch `node /absolute/path/to/workflow-mcp/mcp/server.mjs` over stdio.

Ask your client to evaluate the bundled sample at 48 hours, compare it with 24 hours, then explain one `late_data` event ID. The sample's encounter IDs, classes, and end times come from [Synthea synthetic FHIR R4 data](https://github.com/synthetichealth/synthea-sample-data). Receipt times, outreach attempts, duplicate delivery, and missing fields are simulated by ref(health). The original Synthea project is [Apache 2.0 licensed](https://github.com/synthetichealth/synthea/blob/master/LICENSE).
The source archive was downloaded on 2026-10-10; its SHA-256 is `56cb9e49f7ba6ad4e61c40aa80999f8c10a710823fed1becdf2502053777a521`.

The server exposes two tools:

- `evaluate_outreach_workflow(dataPath?, windowHours?, includeInpatient?)` returns cohort counts, event-level outcomes, and input defects. Omit `dataPath` to use the bundled sample.
- `explain_outreach_event(eventId, dataPath?, windowHours?, includeInpatient?)` gives the timestamps and reason for one eligible event's classification.

A custom JSON file must contain `asOf`, `events`, and `attempts`. Each event needs `eventId`, `memberId`, `eventType` (`EMER` or `IMP`), `occurredAt` (encounter end), and `receivedAt`. Each attempt needs `attemptId`, `eventId`, and `attemptedAt`. Timestamps must include a timezone. See `sample-workflow.json` for the exact format. Files are limited to 10 MB, 5,000 events, and 5,000 attempts.

The server makes no network calls with the data. Your AI client may send tool output to its model provider, so use synthetic or approved data. Package installation fetches the declared npm dependencies.

## Interpretation

A record is `late_data` if it arrived after the deadline; `on_time` if it arrived and had an attempt by the deadline; `late_outreach` if it arrived in time but the first attempt was late; `missed` if no attempt was recorded by `asOf`; and `pending` if the deadline has not passed. Duplicate event IDs count once. Conflicting IDs are excluded. The evaluation does not determine clinical appropriateness, consent, permitted contact, or improved outcomes.

## Development

Run `npm test` in this directory. The tests exercise the shared evaluator and a real MCP client session.
