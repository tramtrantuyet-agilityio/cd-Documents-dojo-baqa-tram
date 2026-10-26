# Regression run results

**Build:** `app/index.html` (last changed in commit 5877e4a)
**Environment:** Chromium 153.0.8010.12 (Playwright, headless), Linux, opened via `file://`
**Run date:** 2026-10-26

## 1. Matrix run (LS-101, LS-202)

Evidence screenshots are in `evidence/`.

| ID | Case | Result | Actual |
|---|---|---|---|
| LS-101-1 | 0 guests | Pass | Guests error, no price |
| LS-101-2 | 1 guest | Pass | 1,200,000 VND |
| LS-101-3 | 6 guests | Pass | 1,200,000 VND |
| LS-101-4 | 7 guests | Pass | Guests error, no price |
| LS-202-1 | 2 nights, Standard | Pass | 1,200,000 VND, no discount |
| LS-202-2 | 3 nights, Standard | Fail | 1,800,000 VND, no discount (expected 1,620,000) |
| LS-202-3 | 4 nights, Deluxe | Fail | 3,600,000 VND, no discount (expected 3,240,000) |
| LS-202-4 | 3 nights, Deluxe, 6 guests | Fail | 2,700,000 VND, no discount (expected 2,430,000) |
| LS-202-5 | 3 nights, Nov 29 to Dec 2 | Fail | 1,800,000 VND, no discount (expected 1,620,000) |
| LS-202-6 | Same-day stay | Pass | Check-out error, no price |

Totals: 6 Pass, 4 Fail, 0 Blocked. All four failures come from the long-stay discount not being built (gap #26).

## 2. Exploratory run

| Area | Case | Result |
|---|---|---|
| Dates | 28 Feb to 1 Mar 2028 (leap year) | Pass: 2 nights |
| Dates | 29 Feb to 1 Mar 2028 | Pass: 1 night |
| Dates | 30 Dec 2099 to 2 Jan 2100 | Pass: 3 nights |
| Dates | 60 nights, Deluxe | Pass: 54,000,000 VND |
| Dates | Check-in equals check-out | Pass: check-out error |
| Dates | Past check-in (2020-01-01) | Fail: price shown (known bug #8, R2) |
| Guests | Empty, `-1`, `abc`, `999`, spaces | Pass: guests error |
| Guests | `2.5`, `0.5` | No price and no app message: the browser blocks the submit; the app code has no whole-number check (known bug #7, R1) |
| Display | Large totals | Pass: commas correct |
| Display | Phone width 375px | Fail: inputs overflow by 4px (BUG-B) |
| Display | Stray text after the result | Fail: `touch app/index.html` shown (BUG-A) |
| Display | Change inputs after a price is shown | Fail: old price stays (BUG-C, R4) |

## 3. New bugs

- **BUG-A** (Low): stray text "touch app/index.html" shown on the page.
- **BUG-B** (Medium): form overflows the screen at phone width.
- **BUG-C** (Medium): old price stays on screen after the form changes.

## 4. Open questions for the client

1. Is there a maximum stay length or booking window? A 2,912,108-night stay is accepted and shows 2,620,897,200,000 VND.
2. What message should show for decimal guests?
3. Should the night count have thousands separators?
4. Is the long-stay discount note also needed in Vietnamese?
