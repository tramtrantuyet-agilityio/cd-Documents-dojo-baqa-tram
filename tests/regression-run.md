# Regression run – 2026-11-05 – <your name>

| # | Case | Expected | Result | Notes |
|---|------|----------|--------|-------|
| 1 | 2 nights Standard, 2 guests | 1,200,000 VND | Pass | |
| 2 | 3 nights Standard | 1,620,000 VND + note | Fail | LS-202 not built (#12) |
| 3 | 0 guests | Error R1 | Pass | |
| 4 | 2.5 guests | Error R1 | Fail | known bug #7 |
| 5 | Check-in yesterday | Error R2 | Fail | known bug #8 |
| 6 | Check-out before check-in | Error R3 | Pass | |

## Exploratory hour
Charter: explore the date fields with unusual values for 30 minutes.
- 2028-02-29 to 2028-03-02 → 2 nights, correct.
- Same-day check-in and check-out → error R3 shown. OK.
- 60 nights Deluxe → 54,000,000 VND, commas correct.
Charter: explore the guests field for 30 minutes.
- Empty, -1, 999 → error shown. OK.

Bugs filed today: <Issue numbers>
