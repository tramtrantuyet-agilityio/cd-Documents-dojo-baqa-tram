// tests/group-booking.spec.js
const { test, expect } = require('@playwright/test');

// LS-301 is not built yet: each test is "fixme" (skipped, listed as a to-do).
// When the dev PR for a criterion merges, change test( to test( and fill in the steps.

test('LS-301 AC1: 2 Standard rooms for 2 nights cost 2,400,000 VND', async ({ page }) => {
  await page.goto('/');
  // add 2 Standard rooms, dates 2026-12-01 → 2026-12-03, click "Check price"
  await expect(page.locator('#result')).toHaveText('2 rooms · 2 night(s) · Total 2,400,000 VND');
});

test('LS-301 AC2: Standard + Deluxe for 2 nights cost 3,000,000 VND', async ({ page }) => {
  await page.goto('/');
  // add 1 Standard + 1 Deluxe room, dates 2026-12-01 → 2026-12-03, click "Check price"
  await expect(page.locator('#result')).toContainText('Total 3,000,000 VND');
});

test('LS-301 AC3: a 4th room shows the 3-room limit message', async ({ page }) => {
  await page.goto('/');
  // add 3 rooms, then try to add a 4th
  await expect(page.getByRole('alert')).toHaveText('You can book up to 3 rooms at once.');
});

test('LS-301 AC4: discount applies per room – 3,240,000 VND', async ({ page }) => {
  await page.goto('/');
  // add 2 Standard rooms, dates 2026-12-01 → 2026-12-04 (3 nights), click "Check price"
  await expect(page.locator('#result')).toContainText('Total 3,240,000 VND');
});
