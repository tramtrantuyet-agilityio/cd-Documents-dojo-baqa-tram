// @ts-check
const { test, expect } = require('@playwright/test');

test('booking page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Lantern Stay/);
  await expect(page.getByRole('button', { name: 'Check price' })).toBeVisible();
});
