import { evaluateManifest, listModels, sampleManifest } from "./readiness-core.mjs";

const form = document.querySelector("#checker-form");
const fileInput = document.querySelector("#manifest-file");
const modelSelect = document.querySelector("#model-select");
const useCase = document.querySelector("#use-case");
const fileStatus = document.querySelector("#file-status");
const error = document.querySelector("#checker-error");
const report = document.querySelector("#report");
let manifest = sampleManifest;

function showError(message) {
  error.textContent = message;
  error.hidden = !message;
}

function fillModels() {
  modelSelect.replaceChildren();
  for (const model of listModels(manifest)) {
    const option = document.createElement("option");
    option.value = model.id;
    option.textContent = `${model.name} (${model.id})`;
    modelSelect.append(option);
  }
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = text;
  return node;
}

function render(result) {
  document.querySelector("#report-intro").textContent = `Model: ${result.model}. ${result.useCase ? `Proposed use: ${result.useCase}` : "Add a use case to frame the discussion."}`;
  const summary = document.querySelector("#report-summary");
  summary.replaceChildren(
    element("span", "checker-count checker-count--observed", `${result.summary.observed} observed`),
    element("span", "checker-count checker-count--gap", `${result.summary.gaps} gaps`),
    element("span", "checker-count checker-count--unknown", `${result.summary.unknowns} unknowns`)
  );
  const findings = document.querySelector("#report-findings");
  findings.replaceChildren();
  for (const finding of result.findings) {
    const card = element("article", `checker-finding checker-finding--${finding.status}`, "");
    card.append(
      element("span", "checker-finding__status", finding.status),
      element("h3", "", finding.title),
      element("p", "", finding.evidence),
      element("p", "checker-finding__next", `Next: ${finding.nextStep}`)
    );
    findings.append(card);
  }
  document.querySelector("#report-limitation").textContent = result.limitation;
  report.hidden = false;
  if (typeof window.gtag === "function") window.gtag("event", "checker_report_view", { manifest_source: fileInput.files?.length ? "local_file" : "sample" });
  report.scrollIntoView({ behavior: "smooth", block: "start" });
}

fileInput.addEventListener("change", async () => {
  showError("");
  const file = fileInput.files?.[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) {
    fileInput.value = "";
    showError("Choose a manifest under 10 MB.");
    return;
  }
  try {
    const parsed = JSON.parse(await file.text());
    const models = listModels(parsed);
    if (!models.length) throw new Error("No dbt models were found in this manifest.");
    manifest = parsed;
    fillModels();
    fileStatus.textContent = `${file.name}: ${models.length} models found. The file stays in this browser tab.`;
    report.hidden = true;
  } catch (cause) {
    fileInput.value = "";
    showError(cause instanceof SyntaxError ? "Choose a valid JSON file." : cause.message);
  }
});

document.querySelector("#reset-sample").addEventListener("click", () => {
  manifest = sampleManifest;
  fileInput.value = "";
  useCase.value = "Prioritize member outreach for a care team";
  fileStatus.textContent = "Using the synthetic sample manifest.";
  report.hidden = true;
  showError("");
  fillModels();
});

form.addEventListener("submit", event => {
  event.preventDefault();
  showError("");
  try {
    render(evaluateManifest(manifest, { modelId: modelSelect.value, useCase: useCase.value }));
  } catch (cause) {
    showError(cause.message);
  }
});

useCase.value = "Prioritize member outreach for a care team";
fillModels();

document.querySelector("#mcp-download").addEventListener("click", () => {
  if (typeof window.gtag === "function") window.gtag("event", "mcp_download_click");
});
