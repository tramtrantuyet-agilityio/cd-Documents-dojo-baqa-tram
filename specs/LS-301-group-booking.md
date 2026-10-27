## LS-301 · Group booking (up to 3 rooms)

**User story**
As someone organising a trip for friends,
I want to check the price for several rooms at once,
so that I can book for the whole group in one go.

**Acceptance criteria**
- AC1 Given 2 Standard rooms for 2 nights, When I click "Check price",
      Then I see "2 rooms · 2 night(s) · Total 2,400,000 VND".
- AC2 Given 1 Standard and 1 Deluxe room for 2 nights,
      Then the total is 3,000,000 VND.
- AC3 Given 3 rooms already added, When I try to add a 4th,
      Then I see "You can book up to 3 rooms at once."
- AC4 Given 2 Standard rooms for 3 nights,
      Then the long-stay discount applies to each room: 3,240,000 VND.

**Scope**: price check for 1–3 rooms, mixed types, guests per room 1–6.
**Non-scope**: payment, partial availability, group discount.

**Open questions**: see Issue #31.

## Decisions
- 2026-10-29 · Maximum 3 rooms per booking (client, Issue #31)
- 2026-10-29 · Long-stay discount applies to each room (client, Issue #31)
- 2026-10-30 · Mixed room types allowed (client, Issue #33)
