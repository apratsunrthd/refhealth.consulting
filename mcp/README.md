# Healthcare Feed Triage

A free, local Claude Desktop extension for inspecting a healthcare event feed before using it in an operational workflow. It is a read-only MCP server. Claude calls `inspect_healthcare_feed` on a local CSV or FHIR Bundle and receives aggregate counts and row-numbered findings.

## Install

Download `refhealth-feed-triage.mcpb` from [the product page](https://refhealth.consulting/feed-triage.html). In Claude Desktop, use Settings → Extensions → Advanced settings → Install Extension… and select the file. Restart Claude Desktop if the tool does not appear. No separate Node.js installation or API key is required for the packaged extension.

Try these prompts:

1. “Use Healthcare Feed Triage on its included sample. Could this feed support a 24-hour follow-up trigger? Show the evidence and what I should ask the data owner.”
2. “Inspect `/absolute/path/to/events.csv` against a 48-hour delivery target. Which rows need investigation?”
3. “Inspect `/absolute/path/to/bundle.json` and explain what the FHIR checks can and cannot tell me.”

## Inputs and interpretation

CSV requires `event_id`, `patient_id`, `event_type`, `event_time`, and `received_at`. Timestamps must include a timezone. The tool counts unique valid events, delivery within a selected 1–168 hour target, median and p95 latency, event types, duplicate IDs, invalid rows, and late deliveries. Identical retries count once; conflicting rows with the same ID are all excluded. The sample CSV is wholly synthetic and includes a late delivery, duplicate, and invalid clock ordering.

FHIR JSON must be a Bundle with an `entry` array. The tool checks Encounter IDs, `subject.reference`, `period.end`, period ordering, and whether a `Patient/<id>` reference resolves when Patient resources are present in the supplied Bundle. A missing Patient from this file may simply be stored elsewhere. `meta.lastUpdated` is not treated as delivery time. The sample Bundle is wholly synthetic.

Files are limited to 10 MB and 20,000 CSV rows or Bundle entries. Outputs contain aggregate counts and row-numbered issue descriptions; the tool does not return patient IDs, event IDs, names, or raw records. The server does not call ref(health) or any other network service. Claude receives the tool output, so use only synthetic or approved de-identified data. The checks do not establish complete cohort coverage, consent, clinical suitability, or successful outreach.

## Development

From this repo, run `npm ci --prefix mcp`, then `npm test --prefix mcp`. Run `./scripts/build-feed-bundle.sh` to recreate the `.mcpb` archive with bundled dependencies. Claude Desktop includes the Node.js runtime for Node extensions.
