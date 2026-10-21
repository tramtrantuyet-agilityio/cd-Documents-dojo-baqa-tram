# Test matrix – LS-202 Long-stay discount

| # | Nights | Room | Guests | Expected | Type |
|---|--------|------|--------|----------|------|
| 1 | 2 | Standard | 2 | 1,200,000 VND, no discount | Boundary below |
| 2 | 3 | Standard | 2 | 1,620,000 VND + discount note | Boundary at |
| 3 | 4 | Deluxe | 1 | 3,240,000 VND + discount note | Happy path |
| 4 | 3 | Deluxe | 6 | 2,430,000 VND + discount note | Max guests |
| 5 | 3 (Nov 29 → Dec 2) | Standard | 2 | 1,620,000 VND + discount note | Across month end |
| 6 | 0 (same day) | Standard | 2 | Error R3, no price | Negative |

Not sure yet: is the discount note shown in Vietnamese too?
