// tests/ls-101.spec.js
// LS-101: Guests must be a whole number from 1 to 6 (rule R1).
const { test, expect } = require('@playwright/test');

const PRICE = '2 night(s) · Total 1,200,000 VND';
const GUESTS_ERROR = 'Guests must be between 1 and 6.';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

async function checkPrice(page, guests) {
  await page.getByLabel('Check-in').fill('2026-12-01');
  await page.getByLabel('Check-out').fill('2026-12-03');
  await page.getByLabel('Room').selectOption('standard');
  await page.getByLabel('Guests').fill(guests);
  await page.getByRole('button', { name: 'Check price' }).click();
}

test('LS-101: 0 guests shows the guests error and no price', async ({ page }) => {
  // Known bug LS-101: the app accepts 0 guests. Remove this line once LS-101 is fixed.
  test.fail(true, 'Known bug LS-101: app accepts 0 guests');
  await checkPrice(page, '0');
  await expect(page.getByRole('alert')).toHaveText(GUESTS_ERROR);
  await expect(page.getByText(/Total .* VND/)).toHaveCount(0);
});

test('LS-101: 1 guest shows the price', async ({ page }) => {
  await checkPrice(page, '1');
  await expect(page.getByRole('alert')).toHaveText('');
  await expect(page.getByText(PRICE)).toBeVisible();
});

test('LS-101: 6 guests shows the price', async ({ page }) => {
  await checkPrice(page, '6');
  await expect(page.getByRole('alert')).toHaveText('');
  await expect(page.getByText(PRICE)).toBeVisible();
});

test('LS-101: 7 guests shows the guests error and no price', async ({ page }) => {
  await checkPrice(page, '7');
  await expect(page.getByRole('alert')).toHaveText(GUESTS_ERROR);
  await expect(page.getByText(/Total .* VND/)).toHaveCount(0);
});
