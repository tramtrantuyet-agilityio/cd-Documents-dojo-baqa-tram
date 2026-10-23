---
name: ticket-pack-writer
description: Turn a rough client request into a ticket pack for the Lantern Stay booking page - user story, three Given/When/Then acceptance criteria with real values, scope and non-scope, open questions, and an "AI-drafted, human-edited" line. Use when the user pastes a client request, feature idea or email and asks for a ticket, a ticket pack, user story or acceptance criteria.
---

# ticket-pack-writer

Write one ticket pack per request, in the same shape as LS-202 (issue #11 in
tramtrantuyet-agilityio/cd-Documents-dojo-baqa-tram, and `LS-202.md` in the repo root).
Read the existing rules in `README.md` (R1-R4) first so new tickets do not contradict them.

## Output

Print the ticket as Markdown in chat only. Do not create files or GitHub issues unless asked.

Use exactly these sections, in this order:

```
## LS-<number> · <Short feature name>

**User story**
As a <who>,
I want <what>,
so that <why>.

**Acceptance criteria**
- AC1 Given <state with real values>, When <one action>,
      Then <exact visible result>.
- AC2 ...
- AC3 ...

**Scope**: <what is included, one line>
**Non-scope**: <what is explicitly excluded, comma-separated>

**Open questions** (for the client)
1. <question>
2. <question>

**Analyst**: <name> · AI-drafted, human-edited
```

## Rules

1. **Exactly 3 acceptance criteria.** Make them: the main case, a boundary or
   negative case (the point where behaviour changes, or where nothing should happen),
   and a second value that proves the rule is general. Add more than 3 only if the
   user asks.
2. **Real values, no vague words.** Every AC names concrete inputs and the exact
   screen text, in quotes, using the app's existing format, for example
   `"3 night(s) · Total 1,620,000 VND (10% long-stay discount)"`. Never write
   "correct price", "an error" or "works as expected".
3. **Check the arithmetic.** Compute every total from the rates in `README.md`
   (Standard 600,000, Deluxe 900,000 VND per night) before writing it. Re-do the
   sum once after drafting.
4. **One action per When, one result per Then.** Split compound steps into
   separate criteria.
5. **Missing facts: assume, mark, ask.** If the request lacks a number, limit or
   wording, pick a sensible value, write it in the AC, add "(price assumed)" or
   "(wording assumed)" next to the item in Open questions, and ask the client about
   it. Never silently invent a value.
6. **Open questions** are things only the client can answer (money, limits,
   timing, stacking with other offers). Write 2-3, each answerable in one sentence.
   Do not ask what the request already says.
7. **Scope and non-scope** are one line each. Non-scope lists the nearby things
   someone might assume are included.
8. **Last line** is always `**Analyst**: <name> · AI-drafted, human-edited`. Use
   the name the user gives; otherwise leave `<your name>` for them to fill in.
9. **Ticket number**: use the next LS-2xx number the user gives. If none, write
   `LS-2xx` and say so.
10. Keep it short. No intro, no explanation of the format, no extra sections.

## Before replying

- Count the ACs (must be 3) and confirm each Then has quoted text or a number.
- Confirm every assumed value also appears in Open questions.
- Confirm the Analyst line is present.

## Model

LS-202:

```
## LS-202 · Long-stay discount

**User story**
As a guest staying 3 nights or more,
I want a 10% discount shown before I book,
so that I'm rewarded for a longer stay.

**Acceptance criteria**
- AC1 Given a Standard room for 3 nights, When I click "Check price",
      Then I see "3 night(s) · Total 1,620,000 VND (10% long-stay discount)".
- AC2 Given any room for 2 nights, When I click "Check price",
      Then no discount is applied or mentioned.
- AC3 Given a Deluxe room for 4 nights, When I click "Check price",
      Then the total is 3,240,000 VND with the discount note.

**Scope**: discount on the price check only.
**Non-scope**: payment, promo codes, discounts for returning guests.

**Open questions** (for the client)
1. Does the discount stack with any future promotions?
2. Is "3 nights" counted per booking, or per guest per year?

**Analyst**: <your name> · AI-drafted, human-edited
```

Why it works: AC1 is the main case at the threshold (3 nights), AC2 is the
negative case just below it (2 nights), AC3 is a second room and length that proves
the rule is general. Totals are exact (3 x 600,000 x 0.9 = 1,620,000;
4 x 900,000 x 0.9 = 3,240,000).
