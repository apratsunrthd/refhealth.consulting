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
  assert.equal(report.findings.find(item => item.title === "Source lineage").status, "unknown");
  assert.equal(report.findings.find(item => item.title === "Freshness checks").status, "gap");
});

test("model selection rejects unknown IDs and malformed manifests", () => {
  assert.throws(() => listModels({}), /dbt manifest/);
  assert.throws(() => evaluateManifest(sampleManifest, { modelId: "model.missing" }), /Select a model/);
});
