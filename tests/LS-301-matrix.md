# Test matrix + exploratory session – LS-301 Group booking

Run: 2026-10-28 · build: `main` at `bbe6b20` (PR #44) · Chromium via Playwright · run by Claude for Tram Tran
Expected values were calculated by hand from the rates (Standard 600,000 / Deluxe 900,000 VND per night) and the LS-202 rule (10% off per room from 3 nights).

## Matrix

| # | Case | Expected | Type | Result | Actual | Evidence |
|---|------|----------|------|--------|--------|----------|
| 1 | AC1: 2 Standard, 2 nights | 2 rooms · 2 night(s) · Total 2,400,000 VND | Happy path | Pass | 2 rooms · 2 night(s) · Total 2,400,000 VND | evidence/LS-301-1.png |
| 2 | AC2: Standard + Deluxe, 2 nights | Total 3,000,000 VND | Mixed types | Pass | 2 rooms · 2 night(s) · Total 3,000,000 VND | evidence/LS-301-2.png |
| 3 | AC3: add a 4th room | "You can book up to 3 rooms at once.", still 3 rooms | Boundary above max | Pass | message shown, 3 rooms | evidence/LS-301-3.png |
| 4 | AC4: 2 Standard, 3 nights | Total 3,240,000 VND (10% per room) | Discount per room | Pass | 2 rooms · 3 night(s) · Total 3,240,000 VND (10% long-stay discount) | evidence/LS-301-4.png |
| 5 | 1 room only, 2 nights | 2 night(s) · Total 1,200,000 VND (no "1 rooms") | Regression | Pass | 2 night(s) · Total 1,200,000 VND | |
| 6 | 3 rooms Standard + Deluxe + Deluxe, 2 nights | 4,800,000 VND | Max rooms, mixed | Pass | 3 rooms · 2 night(s) · Total 4,800,000 VND | |
| 7 | 3 rooms S + D + D, 3 nights | 6,480,000 VND (discount on each room) | Max rooms + discount | Pass | 3 rooms · 3 night(s) · Total 6,480,000 VND (10% long-stay discount) | |
| 8 | Deluxe first, Standard second, 2 nights | 3,000,000 VND | Order of types | Pass | 2 rooms · 2 night(s) · Total 3,000,000 VND | |
| 9 | 2 Deluxe, 2 nights | 3,600,000 VND, no discount note | Boundary below discount | Pass | 2 rooms · 2 night(s) · Total 3,600,000 VND | |
| 10 | 3 rooms, 6 guests each, 3 nights | 4,860,000 VND | Max guests per room | Pass | 3 rooms · 3 night(s) · Total 4,860,000 VND (10% long-stay discount) | |
| 11 | Room 2 with 7 guests | Error "Guests must be between 1 and 6.", no price | Negative | Pass | error shown, no price | |
| 12 | Room 2 with 0 guests | Same error, no price | Negative | Pass | error shown, no price | |
| 13 | 3 rooms, check-out before check-in | Error R3, no price | Negative | Pass | Check-out must be after check-in. | |

13 of 13 pass. The automated suite also passes (13 tests, with R1 and R2 expected to fail as known bugs #7 and #8).

## Exploratory session

Two charters, run as a scripted Playwright session, not a manual hour. Findings below are what the app actually did.

### Charter A – change things after a price is shown, and probe the room rows
- **Stale price.** After a price is shown, adding a room or changing a room type leaves the old price on screen until "Check price" is clicked again. Example: 1 Standard room shows 1,200,000 VND, add a second room, and the page still shows 1,200,000 VND. Screenshot: evidence/LS-301-explore-stale.png.
- New rooms copy room 1's current guests and type (room 1 with 4 guests gives a new room with 4). Not in the spec; harmless, but unexpected.
- The 3-room limit message disappears on the next action (adding is blocked, submitting clears it). OK.
- Room 2 with empty guests shows the guests error. OK.
- The guests error does not say which room is wrong ("Guests must be between 1 and 6." for room 2 or room 3).
- 2.5 guests in room 2: nothing happens, no price and no message in the page. The browser's own number-field check blocks the submit. Same as room 1 (known bug #7).

### Charter B – dates and sizes with several rooms
- 2028-02-28 to 2028-03-02 (leap day, 3 nights), Standard + Deluxe: 4,050,000 VND with discount note. Correct.
- 2026-12-30 to 2027-01-02 (year end, 3 nights): 4,050,000 VND. Correct.
- 365 nights, Standard + Deluxe: 492,750,000 VND with discount. Correct arithmetic; the spec has no maximum stay.
- Check-in in the past (2020-01-01): priced as normal (known bug #8).
- Same-day check-in and check-out: error R3. OK.
- Enter key in a room 2 guests field submits the form and shows the price. OK.
- Reload resets to 1 room. No duplicate element ids. Labels are linked correctly (Guests / Guests 2, Room / Room 2).
- There is no way to remove a room once added.

## Candidate bugs (not filed)

| # | Finding | Severity | Notes |
|---|---------|----------|-------|
| 1 | Price stays on screen after rooms or room types change | Medium | The total shown no longer matches the form. Suggest clearing `#result` when the form changes or a room is added. |
| 2 | Guests error does not name the room | Low | Suggest "Room 2: Guests must be between 1 and 6." |
| 3 | No way to remove a room | Low | Not in the spec; needs a BA decision (Issue #31 area). |
| 4 | No maximum stay length | Question | Spec silent. 365 nights prices normally. |
| 5 | New rooms copy room 1's values | Question | Not in the spec. |

Already known and unchanged by LS-301: 2.5 guests (#7), past check-in (#8).
