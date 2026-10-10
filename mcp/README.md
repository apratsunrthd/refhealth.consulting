# ref(health) Data Readiness MCP

A local, read-only MCP server for reviewing dbt manifest metadata against a proposed healthcare AI use case. It uses the same deterministic checks as the [web demo](https://refhealth.consulting/readiness-checker.html). It does not send your manifest to ref(health) or inspect data rows.

## Run

1. Download and unzip `readiness-mcp.zip` from the web demo, or use this repository checkout.
2. Install Node.js 20 or newer.
3. In the unzipped `mcp` directory, run `npm ci`.
4. Configure your MCP client to launch `node /absolute/path/to/readiness-mcp/mcp/server.mjs` over stdio.

For a first check, ask your client to list the models in `/absolute/path/to/readiness-mcp/mcp/sample-manifest.json`, then review `model.demo.member_outreach` for a member outreach use case. Point it to your own `target/manifest.json` when ready.

The server exposes two tools:

- `list_dbt_models(manifestPath)` lists model names and unique IDs.
- `review_dbt_model(manifestPath, modelId?, useCase?)` returns observations, gaps, unknowns, and next questions.

Paths must point to local files. The server reads up to 10 MB. There are no network calls in the server. Package installation fetches its declared npm dependencies.

## Limits

The checker reads declared dbt metadata only. A declared test is not proof that it passed. Source freshness configuration is not proof that data is current. The manifest cannot establish access controls, privacy permission, clinical safety, workflow fit, or business value. Review those with accountable people before using a model in an AI workflow.

## Development

Run `npm test` in this directory. The test suite exercises both the shared checks and an MCP client session against the server.
