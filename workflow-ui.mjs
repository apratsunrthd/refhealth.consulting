import { evaluateWorkflow } from "./workflow-core.mjs";

const form = document.querySelector("#workflow-form");
const fileInput = document.querySelector("#workflow-file");
const status = document.querySelector("#file-status");
const error = document.querySelector("#workflow-error");
const report = document.querySelector("#report");
let sample;
let data;

function element(tag, className, value) {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = value;
  return node;
}

function showError(message) {
  error.textContent = message;
  error.hidden = !message;
}

function displayTime(value) {
  return value ? `${new Date(value).toLocaleString("en-US", { timeZone: "UTC", dateStyle: "medium", timeStyle: "short" })} UTC` : "none";
}

function render(result) {
  document.querySelector("#report-intro").textContent = `${result.windowHours}-hour deadline · ${result.includeInpatient ? "emergency and inpatient" : "emergency only"} · evaluated as of ${result.asOf}`;
  const labels = [
    ["eligibleEvents", "eligible events"], ["on_time", "on time"],
    ["late_outreach", "late outreach"], ["late_data", "late data"],
    ["missed", "no attempt"], ["pending", "pending"], ["dataIssues", "data issues"]
  ];
  document.querySelector("#report-summary").replaceChildren(...labels.map(([key, label]) => element("span", `checker-count checker-count--${key}`, `${result.summary[key]} ${label}`)));
  document.querySelector("#report-context").textContent = `${result.summary.late_data} events arrived after their deadline; ${result.summary.late_outreach} arrived in time but had late outreach. Median receipt delay: ${result.summary.medianReceiptHours ?? "—"} hours. Each outcome shows its source encounter and timing.`;
  const outcomes = document.querySelector("#report-outcomes");
  outcomes.replaceChildren();
  const descriptions = {
    on_time: "Receipt and outreach met the deadline.",
    late_outreach: "The event arrived in time; outreach happened after the deadline.",
    late_data: "The event arrived after the deadline.",
    missed: "The event arrived in time; no outreach attempt was recorded.",
    pending: "The deadline has not passed yet."
  };
  for (const item of result.outcomes.slice(0, 100)) {
    const card = element("article", `checker-finding workflow-finding--${item.status}`, "");
    card.append(
      element("span", "checker-finding__status", item.status.replaceAll("_", " ")),
      element("h3", "", `${item.eventType} · ${item.eventId.slice(0, 8)}`),
      element("p", "", descriptions[item.status]),
      element("p", "", `Source: ${item.sourceRef}`),
      element("p", "", `End: ${displayTime(item.occurredAt)} · Received: ${displayTime(item.receivedAt)}`),
      element("p", "", `Deadline: ${displayTime(item.deadlineAt)} · First attempt: ${displayTime(item.firstAttemptAt)}`),
      element("p", "checker-finding__next", `Receipt delay ${item.receiptDelayHours}h · Outreach delay ${item.outreachDelayHours === null ? "none" : `${item.outreachDelayHours}h`}`)
    );
    outcomes.append(card);
  }
  if (result.outcomes.length > 100) outcomes.append(element("p", "checker-help", `Showing the first 100 of ${result.outcomes.length} events. The MCP result includes all events.`));
  const issues = document.querySelector("#report-issues");
  issues.replaceChildren();
  document.querySelector("#issues-summary").textContent = `Data quality issues (${result.issues.length})`;
  for (const issue of result.issues.slice(0, 100)) {
    const card = element("article", "checker-finding workflow-finding--issue", "");
    card.append(element("h3", "", issue.kind.replaceAll("_", " ")), element("p", "", `Row ${issue.row} · ${issue.eventId || "no event ID"}`), element("p", "", issue.detail));
    issues.append(card);
  }
  if (!result.issues.length) issues.append(element("p", "", "No input issues found."));
  document.querySelector("#report-boundary").textContent = result.boundary;
  report.hidden = false;
  if (typeof window.gtag === "function") window.gtag("event", "workflow_report_view", { dataset_source: fileInput.files?.length ? "local_file" : "sample" });
  report.scrollIntoView({ behavior: "smooth", block: "start" });
}

fileInput.addEventListener("change", async () => {
  showError("");
  const file = fileInput.files?.[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) { fileInput.value = ""; showError("Choose a JSON file under 10 MB."); return; }
  try {
    const parsed = JSON.parse(await file.text());
    evaluateWorkflow(parsed);
    data = parsed;
    status.textContent = `${file.name} loaded locally. ${parsed.events.length} event rows found.`;
    report.hidden = true;
  } catch (cause) {
    fileInput.value = "";
    showError(cause instanceof SyntaxError ? "Choose a valid JSON file." : cause.message);
  }
});

document.querySelector("#reset-sample").addEventListener("click", () => {
  data = sample;
  fileInput.value = "";
  document.querySelector("#window-hours").value = "48";
  document.querySelector("#cohort").value = "all";
  status.textContent = "Using the synthetic Synthea-derived scenario.";
  report.hidden = true;
  showError("");
});

form.addEventListener("submit", event => {
  event.preventDefault();
  showError("");
  try {
    if (!data) throw new Error("The sample is still loading.");
    render(evaluateWorkflow(data, { windowHours: Number(document.querySelector("#window-hours").value), includeInpatient: document.querySelector("#cohort").value === "all" }));
  } catch (cause) { showError(cause.message); }
});

fetch("mcp/sample-workflow.json")
  .then(response => { if (!response.ok) throw new Error("Could not load the sample scenario."); return response.json(); })
  .then(parsed => { sample = parsed; data = parsed; status.textContent = "Using the synthetic Synthea-derived scenario."; })
  .catch(cause => showError(cause.message));

document.querySelector("#mcp-download").addEventListener("click", () => {
  if (typeof window.gtag === "function") window.gtag("event", "mcp_download_click");
});
