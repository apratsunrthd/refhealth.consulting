// Shared, deterministic checks for the browser demo and local MCP server.
export const sampleManifest = {
  metadata: { dbt_version: "1.9.0" },
  nodes: {
    "model.demo.member_outreach": {
      unique_id: "model.demo.member_outreach",
      resource_type: "model",
      name: "member_outreach",
      description: "One row per member eligible for an outreach workflow.",
      columns: {
        member_id: { description: "Stable member identifier." },
        outreach_priority: { description: "Priority derived from documented rules." },
        last_contact_at: { description: "" }
      },
      meta: { owner: "Care operations analytics" },
      depends_on: { nodes: ["source.demo.member_events"] }
    },
    "test.demo.member_outreach_unique": {
      resource_type: "test",
      depends_on: { nodes: ["model.demo.member_outreach"] }
    }
  },
  sources: {
    "source.demo.member_events": {
      unique_id: "source.demo.member_events",
      resource_type: "source",
      name: "member_events",
      loaded_at_field: "event_received_at",
      freshness: { warn_after: { count: 24, period: "hour" } }
    }
  }
};

export function listModels(manifest) {
  if (!manifest || typeof manifest !== "object" || !manifest.nodes || typeof manifest.nodes !== "object") {
    throw new Error("This does not look like a dbt manifest.json file.");
  }
  return Object.entries(manifest.nodes)
    .filter(([, node]) => node && node.resource_type === "model")
    .map(([id, node]) => ({ id, name: node.name || id }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function upstreamInputs(manifest, modelId) {
  const found = new Map();
  const visited = new Set();
  const pending = [modelId];
  while (pending.length) {
    const id = pending.pop();
    if (visited.has(id)) continue;
    visited.add(id);
    const node = manifest.nodes?.[id] || manifest.sources?.[id];
    if (!node) continue;
    if (node.resource_type === "source" || node.resource_type === "seed") {
      found.set(id, node);
      continue;
    }
    for (const dependency of node.depends_on?.nodes || []) pending.push(dependency);
  }
  return [...found.values()];
}

export function evaluateManifest(manifest, { modelId, useCase = "" } = {}) {
  const models = listModels(manifest);
  if (!models.length) throw new Error("No dbt models were found in this manifest.");
  const selectedId = modelId || models[0].id;
  const model = manifest.nodes[selectedId];
  if (!model || model.resource_type !== "model") throw new Error("Select a model from this manifest.");

  const findings = [];
  const add = (status, title, evidence, nextStep) => findings.push({ status, title, evidence, nextStep });
  const description = model.description?.trim();
  add(description ? "observed" : "gap", "Model purpose", description || "No model description found.",
    description ? "Confirm that the description matches the proposed decision." : "Document the model's grain, intended use, and limits.");

  const owner = model.meta?.owner || manifest.groups?.[model.group]?.owner?.name;
  add(owner ? "observed" : "gap", "Accountable owner", owner ? `Owner: ${owner}` : "No owner in model metadata or its dbt group.",
    owner ? "Confirm who approves changes and resolves data issues." : "Name a business or data owner for this model.");

  const columns = Object.values(model.columns || {});
  const documented = columns.filter(column => column.description?.trim()).length;
  add(columns.length && documented === columns.length ? "observed" : "gap", "Column definitions",
    columns.length ? `${documented} of ${columns.length} declared columns have descriptions.` : "No columns are declared for this model in the manifest.",
    documented === columns.length && columns.length ? "Validate the definitions with downstream users." : "Describe the fields that affect the workflow's output.");

  const tests = Object.values(manifest.nodes).filter(node => node?.resource_type === "test" && node.depends_on?.nodes?.includes(selectedId));
  add(tests.length ? "observed" : "gap", "Declared tests", `${tests.length} dbt test${tests.length === 1 ? "" : "s"} reference${tests.length === 1 ? "s" : ""} this model.`,
    tests.length ? "Review test coverage and recent run results; the manifest does not show whether tests pass." : "Add tests for keys, required values, and business rules.");

  const inputs = upstreamInputs(manifest, selectedId);
  const sources = inputs.filter(input => input.resource_type === "source");
  add(inputs.length ? "observed" : "unknown", "Upstream inputs",
    inputs.length ? `${inputs.length} declared upstream input${inputs.length === 1 ? "" : "s"}: ${inputs.map(input => `${input.resource_type}: ${input.name}`).join(", ")}.` : "No upstream source or seed was found in this model's manifest lineage.",
    inputs.length ? "Confirm input contracts, refresh process, and permitted use." : "Trace the model back to its source data.");

  const freshness = sources.filter(source => source.loaded_at_field && (source.freshness?.warn_after || source.freshness?.error_after));
  add(!sources.length ? "unknown" : freshness.length === sources.length ? "observed" : "gap", "Freshness checks",
    sources.length ? `${freshness.length} of ${sources.length} upstream sources declare a loaded-at field and freshness threshold.` : "No dbt source is upstream of this model; the manifest cannot show freshness for seed-only or other lineage.",
    sources.length && freshness.length === sources.length ? "Check recent freshness results and whether thresholds fit the workflow." : "Establish how current the upstream data must be and how that is verified.");

  const followUp = [
    { title: "Privacy and access", evidence: "A dbt manifest cannot establish data classification, access policy, consent, or permitted AI use.", nextStep: "Review these controls with the data owner and security/privacy team." },
    { title: "Workflow and human review", evidence: "A dbt manifest cannot show decision ownership, clinical impact, escalation, or human review.", nextStep: "Map the actual workflow and define review and escalation points." },
    { title: "Business value", evidence: useCase ? `The manifest cannot show whether “${String(useCase).trim().slice(0, 500)}” improves a meaningful outcome.` : "No proposed use case was supplied, and a manifest cannot establish business value.", nextStep: "Define the decision, baseline, success measure, and cost of failure with the accountable team." }
  ];

  return {
    model: model.name || selectedId,
    modelId: selectedId,
    useCase: String(useCase).trim().slice(0, 500),
    findings,
    followUp,
    summary: {
      observed: findings.filter(item => item.status === "observed").length,
      gaps: findings.filter(item => item.status === "gap").length,
      unknowns: findings.filter(item => item.status === "unknown").length
    },
    limitation: "This is a metadata review, not an AI readiness certification. It does not inspect data values, test results, security controls, or clinical safety."
  };
}
