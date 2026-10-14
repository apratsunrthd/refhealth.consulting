const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { calculate, createMemo } = require('../fractional-vp-data.js');
// Read the actual HTML defaults so calculations and the published example cannot drift.
const html = fs.readFileSync('fractional-vp-data.html', 'utf8');
const defaults = Object.fromEntries([...html.matchAll(/name="([^"]+)" type="number"[^>]*value="([^"]+)"/g)].map(([, key, value]) => [key, Number(value)]));

test('Year 1 cash excludes equity, includes bonus, recruiting, and engineering sprints', () => {
  const result = calculate(defaults);
  assert.equal(result.fullCost, 465000);
  assert.equal(result.fractionalCost, 138000);
  assert.equal(result.savings, 327000);
  assert.deepEqual(calculate({ ...defaults, equity: 500000 }), result);
});
test('runway uses remaining cash and monthly burn, not annual savings divided by burn', () => {
  const result = calculate(defaults);
  assert.equal(result.fullRunway, 2970000 / 236250);
  assert.equal(result.fractionalRunway, 2970000 / 209000);
  assert.equal(result.runwayDelta, result.fractionalRunway - result.fullRunway);
});
test('zero inputs remain zero and zero monthly burn has no finite runway', () => {
  const input = Object.fromEntries(Object.keys(defaults).map(key => [key, 0]));
  input.fullHours = 160;
  const result = calculate(input);
  assert.equal(result.fullCost, 0);
  assert.equal(result.fractionalCost, 0);
  assert.equal(result.capacity, 0);
  assert.equal(result.fullDays, 0);
  assert.equal(result.fullRunway, null);
  assert.equal(result.runwayDelta, null);
});
test('higher fractional costs and exhausted cash produce signed differences without negative runway', () => {
  const result = calculate({ ...defaults, retainer: 100000, sprints: 4000000 });
  assert.ok(result.savings < 0);
  assert.equal(result.fractionalRunway, 0);
  assert.ok(result.runwayDelta < 0);
});
test('capacity and search time are explicit independent assumptions', () => {
  const result = calculate(defaults);
  assert.equal(result.capacity, 25);
  assert.equal(result.fullDays, 210);
  assert.equal(result.fractionalDays, 44);
});
test('memo records assumptions, boundaries, and an intake URL with no financial inputs', () => {
  const memo = createMemo(defaults, calculate(defaults));
  for (const expected of ['$465,000', '$138,000', '$327,000', 'equity', 'paid upfront', 'not equivalent capacity', 'not a quote', 'clinical diagnosis', 'non-compete']) assert.ok(memo.includes(expected), expected);
  const url = new URL(memo.trim().split('\n').at(-1));
  assert.deepEqual([...url.searchParams], [['scope', 'fractional-vp-data']]);
});
test('unfunded upfront costs yield zero runway even when monthly burn is zero', () => {
  const input = { ...defaults, cash: 100, burn: 0, salary: 0, bonus: 0, benefits: 0, retainer: 0, recruiting: 200, sprints: 300 };
  const result = calculate(input);
  assert.equal(result.fullRunway, 0);
  assert.equal(result.fractionalRunway, 0);
  assert.equal(result.runwayDelta, 0);
  const memo = createMemo(input, result);
  assert.ok(memo.includes('Full-time runway: 0.0 months; fractional runway: 0.0 months.'));
  const funded = calculate({ ...input, cash: 300 });
  assert.equal(funded.fullRunway, null);
  assert.equal(funded.fractionalRunway, null);
});
