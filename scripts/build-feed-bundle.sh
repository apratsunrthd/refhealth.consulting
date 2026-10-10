#!/usr/bin/env bash
set -euo pipefail
repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_dir/mcp"
if [[ ! -d node_modules/@modelcontextprotocol/sdk ]]; then
  echo "Run npm ci --prefix mcp first." >&2
  exit 1
fi
bundle="$repo_dir/refhealth-feed-triage.mcpb"
rm -f "$bundle"
zip -q -X -r "$bundle" manifest.json server.mjs feed-core.mjs sample-feed.csv sample-fhir-bundle.json package.json README.md node_modules -x '*/.DS_Store' '*/.package-lock.json'
unzip -tq "$bundle"
echo "Built $bundle"
