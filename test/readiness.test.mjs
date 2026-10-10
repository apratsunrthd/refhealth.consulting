import test from "node:test";
import assert from "node:assert/strict";
import { evaluateManifest, listModels, sampleManifest } from "../readiness-core.mjs";

test("sample review separates observable metadata from unanswered controls", () => {
  const report = evaluateManifest(sampleManifest, { useCase: "Member outreach" });
  assert.equal(report.model, "member_outreach");
  assert.deepEqual(report.summary, { observed: 5, gaps: 1, unknowns: 3 });
  assert.equal(report.findings.find(item => item.title === "Column definitions").status, "gap");
  assert.equal(report.findings.find(item => item.title === "Privacy and access").status, "unknown");
});

test("missing declarations remain gaps or unknowns, never proof of readiness", () => {
  const manifest = {
    nodes: { "model.demo.empty": { resource_type: "model", name: "empty", depends_on: { nodes: [] } } },
    sources: {}
  };
  const report = evaluateManifest(manifest);
  assert.equal(report.summary.observed, 0);
  assert.equal(report.findings.find(item => item.title === "Upstream inputs").status, "unknown");
  assert.equal(report.findings.find(item => item.title === "Freshness checks").status, "unknown");
  assert.equal(report.findings.find(item => item.title === "Column definitions").evidence, "No columns are declared for this model in the manifest.");
});

test("seed-only lineage from a dbt project is visible without a false freshness gap", () => {
  // Shape observed in the public Jaffle Shop manifest fixture from gouline/dbt-metabase.
  const manifest = {
    nodes: {
      "model.jaffle_shop.customers": { resource_type: "model", name: "customers", depends_on: { nodes: ["model.jaffle_shop.stg_customers"] } },
      "model.jaffle_shop.stg_customers": { resource_type: "model", name: "stg_customers", depends_on: { nodes: ["seed.jaffle_shop.raw_customers"] } },
      "seed.jaffle_shop.raw_customers": { resource_type: "seed", name: "raw_customers" }
    },
    sources: {}
  };
  const report = evaluateManifest(manifest, { modelId: "model.jaffle_shop.customers" });
  const inputs = report.findings.find(item => item.title === "Upstream inputs");
  assert.equal(inputs.status, "observed");
  assert.match(inputs.evidence, /seed: raw_customers/);
  const freshness = report.findings.find(item => item.title === "Freshness checks");
  assert.equal(freshness.status, "unknown");
  assert.doesNotMatch(freshness.evidence, /0 of 0/);
});

test("model selection rejects unknown IDs and malformed manifests", () => {
  assert.throws(() => listModels({}), /dbt manifest/);
  assert.throws(() => evaluateManifest(sampleManifest, { modelId: "model.missing" }), /Select a model/);
});
