(function () {
  "use strict";

  const money = (value) => new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0
  }).format(value);
  const months = (value) => value === null ? "not finite at zero burn" : value.toFixed(1) + " months";

  function calculate(input) {
    const fullRecurring = input.salary * (1 + input.bonus / 100) + input.benefits;
    const fullCost = fullRecurring + input.recruiting;
    const fractionalCost = input.retainer * 12 + input.sprints;
    const runway = (upfront, monthly) => monthly === 0 ? null : Math.max(0, input.cash - upfront) / monthly;
    const fullRunway = runway(input.recruiting, input.burn + fullRecurring / 12);
    const fractionalRunway = runway(input.sprints, input.burn + input.retainer);
    return {
      fullCost, fractionalCost, savings: fullCost - fractionalCost,
      fullRunway, fractionalRunway,
      runwayDelta: fullRunway === null || fractionalRunway === null ? null : fractionalRunway - fullRunway,
      capacity: input.fractionalHours / input.fullHours * 100,
      fullDays: input.searchDays + input.fullMetricDays,
      fractionalDays: input.fractionalStartDays + input.fractionalMetricDays
    };
  }

  function createMemo(input, result) {
    return `# Fractional VP of Data — planning scope memo

Illustrative planning scenario, not a quote, market benchmark, ROI claim, or delivery guarantee.

## Decision to scope
- Board metric or operating decision: [complete with your team]
- Accountable owner and deadline: [complete with your team]
- Engagement: [Strategic Advisory Retainer / Embedded Fractional Leadership]
- Priorities: board metric governance, HDAIOS roadmap, team design and technical diligence, cloud/vendor review.

## Year 1 cash comparison
- Full-time: ${money(result.fullCost)} = ${money(input.salary)} base + ${input.bonus}% cash bonus + ${money(input.benefits)} benefits/payroll taxes + ${money(input.recruiting)} one-time recruiting.
- Fractional: ${money(result.fractionalCost)} = 12 × ${money(input.retainer)} advisory budget + ${money(input.sprints)} engineering sprint budget.
- Full-time minus fractional: ${money(result.savings)} (negative means fractional costs more).
- Illustrative full-time equity value: ${money(input.equity)}; excluded from cash and runway. Not a valuation of dilution or total compensation.

## Runway assumptions
- Available cash: ${money(input.cash)}.
- Monthly cash burn excluding either leadership option: ${money(input.burn)}.
- Full-time runway: ${months(result.fullRunway)}; fractional runway: ${months(result.fractionalRunway)}.
- Fractional minus full-time runway: ${months(result.runwayDelta)}.
- Recruiting and all sprints are paid upfront. Recurring leadership costs are spread monthly. Cash below upfront costs yields zero runway. Recurring leadership costs begin immediately; timing inputs do not shift costs. Burn is constant; revenue, fundraising, and productivity changes are excluded.

## Capacity and first metric assumptions
- Full-time: ${input.fullHours} leadership hours/month; fractional: ${input.fractionalHours} hours/month (${result.capacity.toFixed(0)}% of full-time hours). Responsibilities and coverage differ; this is not equivalent capacity.
- Full-time first metric: ${input.searchDays} days until start + ${input.fullMetricDays} delivery days = ${result.fullDays} days.
- Fractional first metric: ${input.fractionalStartDays} days until start + ${input.fractionalMetricDays} delivery days = ${result.fractionalDays} days.
- Confirm the metric definition, data readiness, execution team, decision rights, and leadership cadence before agreeing delivery dates.

## Boundaries and next step
Administrative, financial, and operational scope only; clinical diagnosis and autonomous patient triage are outside scope. Review conflicts and non-compete restrictions before work begins. Do not include PHI, customer records, credentials, or confidential material.

A focused diagnostic starts at $2,500. Ongoing leadership scope and pricing are agreed separately. Calculation inputs are not transmitted by the intake link; share this memo separately only if you choose.

https://refhealth.consulting/intake.html?scope=fractional-vp-data
`;
  }

  function boot() {
    const calculator = document.getElementById("executive-calculator");
    if (!calculator) return;
    const form = document.getElementById("executive-inputs");
    const fields = Array.from(form.querySelectorAll("input"));
    const output = document.getElementById("calculator-output");
    const error = document.getElementById("calculator-error");
    const download = document.getElementById("download-executive-memo");
    const status = document.getElementById("memo-status");
    let scenario;

    function update() {
      const input = {};
      let valid = true;
      fields.forEach((field) => {
        const fieldValid = field.validity.valid && Number.isFinite(field.valueAsNumber);
        field.setAttribute("aria-invalid", String(!fieldValid));
        valid = valid && fieldValid;
        input[field.name] = field.valueAsNumber;
      });
      error.hidden = valid;
      output.hidden = !valid;
      download.disabled = !valid;
      status.textContent = "";
      scenario = valid ? { input, result: calculate(input) } : null;
      if (!scenario) return;
      const result = scenario.result;
      ["fullCost", "fractionalCost", "savings"].forEach((key) => {
        document.getElementById("result-" + key).textContent = money(Math.abs(result[key]));
      });
      document.getElementById("savings-label").textContent = result.savings < 0 ? "Year 1 additional fractional cash cost" : "Year 1 cash reduction";
      document.getElementById("runway-label").textContent = result.runwayDelta < 0 ? "Runway decrease with fractional" : "Runway increase with fractional";
      document.getElementById("result-runwayDelta").textContent = result.runwayDelta === null ? "Not comparable at zero burn" : months(Math.abs(result.runwayDelta));
      document.getElementById("runway-detail").textContent = "Full-time runway: " + months(result.fullRunway) + ". Fractional runway: " + months(result.fractionalRunway) + ".";
      document.getElementById("capacity-detail").textContent = "Leadership capacity: " + input.fractionalHours + " fractional vs. " + input.fullHours + " full-time hours/month (" + result.capacity.toFixed(0) + "% of full-time hours). Responsibilities and coverage differ.";
      document.getElementById("timing-detail").textContent = "First board metric, using your timing inputs: " + result.fractionalDays + " days fractional vs. " + result.fullDays + " days full-time. Confirm data readiness and delivery scope; these are not promised timelines.";
      document.getElementById("equity-detail").textContent = "Illustrative full-time equity: " + money(input.equity) + ", excluded from cash and runway.";
    }

    form.addEventListener("input", update);
    form.addEventListener("submit", (event) => event.preventDefault());
    form.addEventListener("reset", () => setTimeout(update, 0));
    download.addEventListener("click", () => {
      if (!scenario) return;
      const url = URL.createObjectURL(new Blob([createMemo(scenario.input, scenario.result)], { type: "text/markdown;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "fractional-vp-data-scope.md";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      status.textContent = "Memo download started. Review it before choosing to share it.";
    });
    update();
    calculator.hidden = false;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { calculate, createMemo };
  } else {
    boot();
  }
})();
