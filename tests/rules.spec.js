// tests/rules.spec.js
// Open bugs: LS-102 (stale price, R4) and LS-103 (past check-in, R2).
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// Local-date YYYY-MM-DD (toISOString would give the UTC date, which can be off by one).
function isoDate(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

async function checkPrice(page, { checkin, checkout, guests = '2', room = 'standard' }) {
  await page.getByLabel('Check-in').fill(checkin);
  await page.getByLabel('Check-out').fill(checkout);
  await page.getByLabel('Guests').fill(guests);
  await page.getByLabel('Room').selectOption(room);
  await page.getByRole('button', { name: 'Check price' }).click();
}

const STALE_PRICE = '2 night(s) · Total 1,200,000 VND';

test('R4: changing the room after a price check does not leave the old price on screen', async ({ page }) => {
  // Issue #2 (LS-102): https://github.com/tramtrantuyet-agilityio/cd-Documents-dojo-baqa-tram/issues/2
  // Known bug: the old price stays on screen after the room changes. Remove this line once it is fixed.
  test.fail(true, 'Known bug LS-102 (Issue #2): stale price after room change');
  await checkPrice(page, { checkin: '2026-12-01', checkout: '2026-12-03' });
  await expect(page.getByText(STALE_PRICE)).toBeVisible();

  await page.getByLabel('Room').selectOption('deluxe');

  // Either the price is cleared or it is recalculated; the Standard total must not remain.
  await expect(page.getByText(STALE_PRICE)).toHaveCount(0);
});

test('R4: changing the dates after a price check does not leave the old price on screen', async ({ page }) => {
  // Issue #2 (LS-102): https://github.com/tramtrantuyet-agilityio/cd-Documents-dojo-baqa-tram/issues/2
  // Known bug: the old price stays on screen after the dates change. Remove this line once it is fixed.
  test.fail(true, 'Known bug LS-102 (Issue #2): stale price after date change');
  await checkPrice(page, { checkin: '2026-12-01', checkout: '2026-12-03' });
  await expect(page.getByText(STALE_PRICE)).toBeVisible();

  await page.getByLabel('Check-out').fill('2026-12-05');

  await expect(page.getByText(STALE_PRICE)).toHaveCount(0);
});

test('R2: a check-in date in the past shows an error and no price', async ({ page }) => {
  // Issue #3 (LS-103): https://github.com/tramtrantuyet-agilityio/cd-Documents-dojo-baqa-tram/issues/3
  // Known bug: the app has no "today or later" check. Remove this line once it is fixed.
  test.fail(true, 'Known bug LS-103 (Issue #3): app accepts a past check-in date');
  const today = new Date();
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

  await checkPrice(page, { checkin: isoDate(yesterday), checkout: isoDate(today) });

  // Wording is assumed in the issue ("Check-in must be today or later."); the README gives no message for R2.
  await expect(page.getByRole('alert')).toHaveText('Check-in must be today or later.');
  await expect(page.getByText(/Total .* VND/)).toHaveCount(0);
});
