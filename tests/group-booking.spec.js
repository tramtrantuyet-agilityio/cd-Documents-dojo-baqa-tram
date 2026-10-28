// tests/group-booking.spec.js
// LS-301: group booking, up to 3 rooms (specs/LS-301-group-booking.md)
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

async function setDates(page, checkin, checkout) {
  await page.getByLabel('Check-in').fill(checkin);
  await page.getByLabel('Check-out').fill(checkout);
}

// Rooms 2 and 3 are labelled "Room 2" / "Room 3"; room 1 is just "Room".
async function addRooms(page, types) {
  for (const [i, type] of types.entries()) {
    await page.getByRole('button', { name: 'Add room' }).click();
    await page.getByLabel(`Room ${i + 2}`, { exact: true }).selectOption(type);
  }
}

test('LS-301 AC1: 2 Standard rooms for 2 nights cost 2,400,000 VND', async ({ page }) => {
  await setDates(page, '2026-12-01', '2026-12-03');
  await addRooms(page, ['standard']);
  await page.getByRole('button', { name: 'Check price' }).click();
  await expect(page.locator('#result')).toHaveText('2 rooms · 2 night(s) · Total 2,400,000 VND');
});

test('LS-301 AC2: Standard + Deluxe for 2 nights cost 3,000,000 VND', async ({ page }) => {
  await setDates(page, '2026-12-01', '2026-12-03');
  await addRooms(page, ['deluxe']);
  await page.getByRole('button', { name: 'Check price' }).click();
  await expect(page.locator('#result')).toContainText('Total 3,000,000 VND');
});

test('LS-301 AC3: a 4th room shows the 3-room limit message', async ({ page }) => {
  await addRooms(page, ['standard', 'standard']);
  await page.getByRole('button', { name: 'Add room' }).click();
  await expect(page.getByRole('alert')).toHaveText('You can book up to 3 rooms at once.');
  await expect(page.getByLabel('Room 4', { exact: true })).toHaveCount(0);
});

test('LS-301 AC4: discount applies per room – 3,240,000 VND', async ({ page }) => {
  await setDates(page, '2026-12-01', '2026-12-04');
  await addRooms(page, ['standard']);
  await page.getByRole('button', { name: 'Check price' }).click();
  await expect(page.locator('#result')).toContainText('Total 3,240,000 VND');
});

test('LS-301: adding a room or changing a room type clears the old price', async ({ page }) => {
  await setDates(page, '2026-12-01', '2026-12-03');
  await page.getByRole('button', { name: 'Check price' }).click();
  await expect(page.locator('#result')).toContainText('Total 1,200,000 VND');
  await page.getByRole('button', { name: 'Add room' }).click();
  await expect(page.locator('#result')).toHaveText('');
  await page.getByRole('button', { name: 'Check price' }).click();
  await expect(page.locator('#result')).toContainText('Total 2,400,000 VND');
  await page.getByLabel('Room 2', { exact: true }).selectOption('deluxe');
  await expect(page.locator('#result')).toHaveText('');
});
