# LS-202 · Long-stay discount — test matrix

Ticket: [#11 LS-202 long-stay discount](https://github.com/tramtrantuyet-agilityio/cd-Documents-dojo-baqa-tram/issues/11)
Rules: R1 guests 1–6 whole number · R2 check-in today or later · R3 check-out after check-in · R4 price = nights × rate (Standard 600,000 VND, Deluxe 900,000 VND) · LS-202: 10% off when nights ≥ 3.

**Expected text formats**
- With discount: `N night(s) · Total X VND (10% long-stay discount)` (from AC1)
- Without discount: `N night(s) · Total X VND`, with no mention of a discount (AC2)

**Dates:** fixed dates are all after 21 Oct 2026, the date this matrix was written. `T` means the day the test is run.
Guests = 2 unless the row says otherwise.

| # | Inputs | Expected result | Test type |
|---|--------|-----------------|-----------|
| **Happy paths** |||
| 1 | Standard · 2026-11-10 → 2026-11-13 | `3 night(s) · Total 1,620,000 VND (10% long-stay discount)` | Happy path (AC1) |
| 2 | Deluxe · 2026-11-10 → 2026-11-14 | `4 night(s) · Total 3,240,000 VND (10% long-stay discount)` | Happy path (AC3) |
| 3 | Standard · 2026-11-10 → 2026-11-12 | `2 night(s) · Total 1,200,000 VND`, no discount wording | Happy path (AC2) |
| 4 | Deluxe · 2026-11-10 → 2026-11-12 | `2 night(s) · Total 1,800,000 VND`, no discount wording | Happy path (AC2) |
| 5 | Standard · 2026-11-10 → 2026-11-17 | `7 night(s) · Total 3,780,000 VND (10% long-stay discount)` | Happy path |
| **Boundaries — nights** |||
| 6 | Standard · 2026-11-10 → 2026-11-11 | `1 night(s) · Total 600,000 VND`, no discount | Boundary (min stay) |
| 7 | Deluxe · 2026-11-10 → 2026-11-11 | `1 night(s) · Total 900,000 VND`, no discount | Boundary (min stay) |
| 8 | Deluxe · 2026-11-10 → 2026-11-13 | `3 night(s) · Total 2,430,000 VND (10% long-stay discount)` | Boundary (first qualifying night count) |
| 9 | Standard · 2026-11-10 → 2026-11-14 | `4 night(s) · Total 2,160,000 VND (10% long-stay discount)` | Boundary (threshold + 1) |
| 10 | Standard · 2026-11-01 → 2026-12-01 | `30 night(s) · Total 16,200,000 VND (10% long-stay discount)` | Boundary (long stay) |
| 11 | Deluxe · 2026-12-01 → 2027-01-01 | `31 night(s) · Total 25,110,000 VND (10% long-stay discount)` | Boundary (long stay, crosses year) |
| 12 | Standard · 2026-11-01 → 2027-11-01 | `365 night(s) · Total 197,100,000 VND (10% long-stay discount)` | Boundary (max stay — limit not defined, see Q3) |
| **Boundaries — guests** |||
| 13 | Standard · 2026-11-10 → 2026-11-13 · 1 guest | `3 night(s) · Total 1,620,000 VND (10% long-stay discount)` | Boundary (min guests) |
| 14 | Standard · 2026-11-10 → 2026-11-13 · 6 guests | `3 night(s) · Total 1,620,000 VND (10% long-stay discount)`; same as #13, so guests don't change the price | Boundary (max guests) |
| 15 | Deluxe · 2026-11-10 → 2026-11-14 · 6 guests | `4 night(s) · Total 3,240,000 VND (10% long-stay discount)` | Boundary (max guests) |
| **Negative** |||
| 16 | Standard · 2026-11-10 → 2026-11-13 · 0 guests | `Guests must be between 1 and 6.`; no price, no discount note | Negative (R1) |
| 17 | Standard · 2026-11-10 → 2026-11-13 · 7 guests | `Guests must be between 1 and 6.`; no price, no discount note | Negative (R1) |
| 18 | Standard · 2026-11-10 → 2026-11-13 · guests empty | `Guests must be between 1 and 6.`; no price | Negative (R1) |
| 19 | Standard · 2026-11-10 → 2026-11-13 · −1 guests | `Guests must be between 1 and 6.`; no price | Negative (R1) |
| 20 | Standard · 2026-11-10 → 2026-11-13 · 2.5 guests | Per R1 (whole number): error, no price. Current code shows the price — see Q5 | Negative (R1) |
| 21 | Standard · 2026-11-10 → 2026-11-10 | `Check-out must be after check-in.`; no price | Negative (R3, 0 nights) |
| 22 | Standard · 2026-11-13 → 2026-11-10 | `Check-out must be after check-in.`; no price | Negative (R3, reversed dates) |
| 23 | Standard · T−1 → T+2 (would be 3 nights) | Rejected per R2, no price, no discount. Message text not defined — see Q4 | Negative (R2) |
| 24 | Standard · check-in empty · check-out 2026-11-13 | Browser blocks submit (required field); no result | Negative |
| 25 | Standard · check-in 2026-11-10 · check-out empty | Browser blocks submit (required field); no result | Negative |
| **Data variations** |||
| 26 | Standard · T → T+3 (check-in today) | `3 night(s) · Total 1,620,000 VND (10% long-stay discount)` | Data variation (today allowed by R2) |
| 27 | Standard · 2026-10-30 → 2026-11-02 | `3 night(s) · Total 1,620,000 VND (10% long-stay discount)` | Data variation (31-day month end) |
| 28 | Deluxe · 2026-10-31 → 2026-11-02 | `2 night(s) · Total 1,800,000 VND`, no discount | Data variation (month end, below threshold) |
| 29 | Deluxe · 2026-11-29 → 2026-12-02 | `3 night(s) · Total 2,430,000 VND (10% long-stay discount)` | Data variation (30-day month end) |
| 30 | Standard · 2026-12-30 → 2027-01-02 | `3 night(s) · Total 1,620,000 VND (10% long-stay discount)` | Data variation (year end) |
| 31 | Standard · 2027-02-27 → 2027-03-02 | `3 night(s) · Total 1,620,000 VND (10% long-stay discount)` | Data variation (Feb, non-leap) |
| 32 | Deluxe · 2028-02-27 → 2028-03-01 | `3 night(s) · Total 2,430,000 VND (10% long-stay discount)` | Data variation (Feb 29, leap year) |
| 33 | Standard · 2028-02-28 → 2028-03-01 | `2 night(s) · Total 1,200,000 VND`, no discount (catches code that treats Feb as 28 days) | Data variation (leap year, below threshold) |
| 34 | Standard · 2027-03-27 → 2027-03-30 · device timezone Europe/Berlin (DST starts 28 Mar) | `3 night(s) · Total 1,620,000 VND (10% long-stay discount)` | Data variation (DST in guest's browser) |
| 35 | Standard · 2026-11-10 → 2026-11-13 · browser language Vietnamese | Total still reads `1,620,000 VND` (current code always formats en-US) — see Q10 | Data variation (locale) |
| **Re-check / state** |||
| 36 | Run #1, then change check-out to 2026-11-12 and check again | `2 night(s) · Total 1,200,000 VND`; the discount note is gone | Regression (stale note) |
| 37 | Run #1, then switch room to Deluxe and check again | `3 night(s) · Total 2,430,000 VND (10% long-stay discount)` | Regression (room change) |
| 38 | Run #1, then set guests to 7 and check again | `Guests must be between 1 and 6.`; previous result cleared | Regression (error after result) |

## Assumptions
- The discount counts per booking, not per guest per year, and stacks with nothing (the ticket's open questions 1–2 are still open).
- AC3's "discount note" is the same `(10% long-stay discount)` text as AC1.
- The discount is a flat 10% for every stay of 3 nights or more, with no extra tier for longer stays.
- Nights are counted as check-out date minus check-in date.

## Open questions
1. **Which build is under test?** `app/index.html` (the folder the README names) still checks only `guests > 6`, so rows 16, 18 and 19 will show a price. The root `index.html` has the PR #6 fix (`guests < 1 || guests > 6`). `app/index.html` also has a stray `touch app/index.html` line after `</html>`.
2. **Discount display:** should the original price also show (e.g. a crossed-out 1,800,000)? Only the total is specified.
3. **Max stay:** no limit is defined. Is 365 nights (#12) valid, and does 10% stay flat at 28+ nights? The long-stay policy doc in this project suggested 20% for monthly stays.
4. **R2 is not built yet** (#3 LS-103 is open). What error text should #23 show, and should LS-202 sign-off wait for it?
5. **Decimal guests:** R1 says whole number, but LS-101 left decimals to a separate ticket. Is #20 in scope for LS-202?
6. **Rounding:** today's rates give whole-VND totals, so nothing rounds. If rates ever change, is the discounted total rounded, or floored to the nearest 1,000 VND?
7. **Deluxe "price wrong sometimes"** (#2 LS-102) has no cause yet. If a Deluxe row fails, is that LS-202 or LS-102?
8. **Whose "today"?** Hoi An time (UTC+7) or the guest's device? It changes the result of #23 and #26 for a guest abroad near midnight.
9. **Discount on 0- or negative-night errors:** the matrix expects no discount note on any error. Please confirm.
10. **Vietnamese UI** (#4 LS-104): should VND show as `1.620.000 ₫` in Vietnamese? Today's code always shows `1,620,000 VND`.
