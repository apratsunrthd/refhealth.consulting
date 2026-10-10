const REQUIRED_COLUMNS = ["event_id", "patient_id", "event_type", "event_time", "received_at"];
const TIMEZONE = /(Z|[+-]\d{2}:\d{2})$/i;

function timestamp(value) {
  if (typeof value !== "string" || !TIMEZONE.test(value)) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function percentile(values, fraction) {
  if (!values.length) return null;
  const ordered = [...values].sort((a, b) => a - b);
  return Math.round(ordered[Math.ceil(fraction * ordered.length) - 1] * 10) / 10;
}

function parseCsv(text) {
  if (typeof text !== "string") throw new Error("CSV input must be text.");
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index++) {
    const character = text[index];
    if (character === '"') {
      if (quoted && text[index + 1] === '"') { field += '"'; index++; }
      else if (!quoted && field === "") quoted = true;
      else if (quoted) quoted = false;
      else throw new Error(`Malformed CSV near row ${rows.length + 1}.`);
    } else if (character === "," && !quoted) {
      row.push(field.trim()); field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && text[index + 1] === "\n") index++;
      row.push(field.trim()); field = "";
      if (row.some(value => value !== "")) rows.push(row);
      row = [];
    } else field += character;
  }
  if (quoted) throw new Error("CSV has an unclosed quoted field.");
  row.push(field.trim());
  if (row.some(value => value !== "")) rows.push(row);
  if (!rows.length) throw new Error("CSV is empty.");
  rows[0][0] = rows[0][0].replace(/^\uFEFF/, "");
  return rows;
}

function finding(row, kind, detail, action) { return { row, kind, detail, action }; }
function issueCounts(issues) {
  return Object.fromEntries([...new Set(issues.map(issue => issue.kind))].map(kind => [kind, issues.filter(issue => issue.kind === kind).length]));
}

export function inspectCsv(text, { windowHours = 24 } = {}) {
  if (!Number.isInteger(windowHours) || windowHours < 1 || windowHours > 168) throw new Error("windowHours must be 1–168.");
  const [header, ...rows] = parseCsv(text);
  if (rows.length > 20000) throw new Error("CSV has more than 20,000 data rows.");
  const columns = header.map(value => value.toLowerCase());
  const missing = REQUIRED_COLUMNS.filter(column => !columns.includes(column));
  if (missing.length) throw new Error(`CSV is missing required columns: ${missing.join(", ")}.`);
  if (new Set(columns).size !== columns.length) throw new Error("CSV has duplicate column names.");
  const issues = [];
  const seen = new Map();
  const valid = [];
  for (let index = 0; index < rows.length; index++) {
    const line = index + 2;
    const cells = rows[index];
    if (cells.length !== columns.length) { issues.push(finding(line, "column_count", "Field count differs from the header.", "Repair the CSV row before using this event.")); continue; }
    const item = Object.fromEntries(columns.map((column, offset) => [column, cells[offset]]));
    const empty = REQUIRED_COLUMNS.filter(column => !item[column]);
    if (empty.length) { issues.push(finding(line, "missing_required", `Missing: ${empty.join(", ")}.`, "Populate the required fields from the source feed.")); continue; }
    if (seen.has(item.event_id)) {
      const prior = seen.get(item.event_id);
      const conflicts = prior.fingerprint !== JSON.stringify(item);
      if (conflicts && !prior.conflicted) {
        const position = valid.findIndex(event => event.eventId === item.event_id);
        if (position >= 0) valid.splice(position, 1);
        prior.conflicted = true;
      }
      issues.push(finding(line, "duplicate_event_id", `Event ID repeats row ${prior.row}; ${conflicts ? "payload conflicts and both rows are excluded" : "payload matches"}.`, "Confirm retry behavior and which version is authoritative."));
      continue;
    }
    seen.set(item.event_id, { row: line, fingerprint: JSON.stringify(item), conflicted: false });
    const occurred = timestamp(item.event_time);
    const received = timestamp(item.received_at);
    if (occurred === null || received === null) { issues.push(finding(line, "invalid_timestamp", "Event or receipt time is invalid or lacks a timezone.", "Supply ISO 8601 timestamps with an explicit offset.")); continue; }
    if (received < occurred) { issues.push(finding(line, "receipt_before_event", "Receipt precedes event time.", "Check clock synchronization and timestamp semantics.")); continue; }
    const latencyHours = (received - occurred) / 3600000;
    valid.push({ row: line, eventId: item.event_id, eventType: item.event_type, latencyHours });
  }
  const typeCounts = {};
  for (const item of valid) {
    const type = Object.hasOwn(typeCounts, item.eventType) || Object.keys(typeCounts).length < 50 ? item.eventType : "other";
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  }
  const late = valid.filter(item => item.latencyHours > windowHours);
  for (const item of late) issues.push(finding(item.row, "late_delivery", `Received ${Math.round(item.latencyHours * 10) / 10} hours after the event; target is ${windowHours} hours.`, "Trace source publishing, transport, and ingestion timestamps."));
  const rates = [1, 6, 24, 48, 72].map(hours => ({ hours, onTime: valid.filter(item => item.latencyHours <= hours).length, eligible: valid.length }));
  return {
    format: "csv", targetHours: windowHours, rows: rows.length,
    summary: { validEvents: valid.length, excludedRows: rows.length - valid.length, onTime: valid.length - late.length, late: late.length, medianLatencyHours: percentile(valid.map(item => item.latencyHours), 0.5), p95LatencyHours: percentile(valid.map(item => item.latencyHours), 0.95), byEventType: typeCounts },
    deliveryWindows: rates, issueCounts: issueCounts(issues), issues: issues.slice(0, 30), totalIssues: issues.length,
    interpretation: "Delivery timing alone does not establish clinical suitability, consent, complete cohort coverage, or outreach success. Counts describe only supplied rows."
  };
}

export function inspectFhir(bundle) {
  if (!bundle || bundle.resourceType !== "Bundle" || !Array.isArray(bundle.entry)) throw new Error("Choose a FHIR Bundle JSON file with an entry array.");
  if (bundle.entry.length > 20000) throw new Error("Bundle has more than 20,000 entries.");
  const patientIds = new Set(bundle.entry.filter(entry => entry?.resource?.resourceType === "Patient" && entry.resource.id).map(entry => entry.resource.id));
  const issues = [];
  const seen = new Map();
  const encounters = [];
  for (let index = 0; index < bundle.entry.length; index++) {
    const resource = bundle.entry[index]?.resource;
    if (resource?.resourceType !== "Encounter") continue;
    const row = index + 1;
    encounters.push(resource);
    if (!resource.id) issues.push(finding(row, "missing_encounter_id", "Encounter has no resource ID.", "Ensure the source assigns stable Encounter IDs."));
    else if (seen.has(resource.id)) issues.push(finding(row, "duplicate_encounter_id", `Encounter ID repeats entry ${seen.get(resource.id)}.`, "Determine whether this is a duplicate or a later version."));
    else seen.set(resource.id, row);
    const reference = resource.subject?.reference;
    if (!reference) issues.push(finding(row, "missing_patient_reference", "Encounter has no subject reference.", "Link the encounter to a patient before downstream use."));
    else if (patientIds.size && reference.startsWith("Patient/") && !patientIds.has(reference.slice(8))) issues.push(finding(row, "unresolved_patient_reference", "Patient reference has no matching Patient in this Bundle.", "Check whether the Patient is supplied separately or the reference is broken."));
    if (!resource.period?.end || timestamp(resource.period.end) === null) issues.push(finding(row, "missing_end_time", "Encounter has no valid period.end with timezone.", "Provide an encounter end time before using discharge timing."));
    else if (resource.period.start && timestamp(resource.period.start) !== null && timestamp(resource.period.end) < timestamp(resource.period.start)) issues.push(finding(row, "end_before_start", "Encounter ends before it starts.", "Correct the period timestamps at the source."));
  }
  return {
    format: "fhir_bundle", entries: bundle.entry.length,
    summary: { encounters: encounters.length, patientsInBundle: patientIds.size, encountersWithIssues: new Set(issues.map(issue => issue.row)).size, byStatus: Object.fromEntries([...new Set(encounters.map(item => item.status || "missing"))].map(status => [status, encounters.filter(item => (item.status || "missing") === status).length])) },
    issueCounts: issueCounts(issues), issues: issues.slice(0, 30), totalIssues: issues.length,
    interpretation: "Bundle checks cover structure and references within the supplied file. FHIR meta.lastUpdated is not a delivery receipt timestamp, so delivery latency is not calculated. External Patient references may be valid."
  };
}
