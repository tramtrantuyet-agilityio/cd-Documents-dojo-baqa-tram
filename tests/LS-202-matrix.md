# Test matrix – LS-202 Long-stay discount

| # | Nights | Room | Guests | Expected | Type | Result | Actual | Evidence |
|---|--------|------|--------|----------|------|--------|--------|----------|
| 1 | 2 | Standard | 2 | 1,200,000 VND, no discount | Boundary below | Pass | 2 night(s) · Total 1,200,000 VND | evidence/LS-202-1.png |
| 2 | 3 | Standard | 2 | 1,620,000 VND + discount note | Boundary at | Fail | 3 night(s) · Total 1,800,000 VND | evidence/LS-202-2.png |
| 3 | 4 | Deluxe | 1 | 3,240,000 VND + discount note | Happy path | Fail | 4 night(s) · Total 3,600,000 VND | evidence/LS-202-3.png |
| 4 | 3 | Deluxe | 6 | 2,430,000 VND + discount note | Max guests | Fail | 3 night(s) · Total 2,700,000 VND | evidence/LS-202-4.png |
| 5 | 3 (Nov 29 → Dec 2) | Standard | 2 | 1,620,000 VND + discount note | Across month end | Fail | 3 night(s) · Total 1,800,000 VND | evidence/LS-202-5.png |
| 6 | 0 (same day) | Standard | 2 | Error R3, no price | Negative | Pass | Error: Check-out must be after check-in. | evidence/LS-202-6.png |

Not sure yet: is the discount note shown in Vietnamese too?
