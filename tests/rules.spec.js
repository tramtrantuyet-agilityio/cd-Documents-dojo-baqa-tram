// tests/rules.spec.js
const { test, expect } = require('@playwright/test');

// A date N days from today, as YYYY-MM-DD
function isoDate(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

test('R1: 2.5 guests is rejected', async ({ page }) => {
  test.fail(true, 'Known bug: Issue #7 – decimal guests accepted');
  await page.goto('/');
  await page.getByLabel('Check-in').fill('2026-12-01');
  await page.getByLabel('Check-out').fill('2026-12-03');
  await page.getByLabel('Guests').fill('2.5');
  await page.getByRole('button', { name: 'Check price' }).click();
  await expect(page.getByRole('alert')).toHaveText('Guests must be between 1 and 6.');
});

test('R2: check-in yesterday is rejected', async ({ page }) => {
  test.fail(true, 'Known bug: Issue #8 – past check-in accepted');
  await page.goto('/');
  await page.getByLabel('Check-in').fill(isoDate(-1));
  await page.getByLabel('Check-out').fill(isoDate(1));
  await page.getByLabel('Guests').fill('2');
  await page.getByRole('button', { name: 'Check price' }).click();
  await expect(page.locator('#result')).toHaveText('');
});
