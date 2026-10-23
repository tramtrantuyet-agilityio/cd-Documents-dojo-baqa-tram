---
name: repro-bug-report
description: Turn rough bug notes (and an attached screenshot, if any) into a reproducible bug report for the Lantern Stay booking page - Title, Rule broken, Steps to reproduce, Expected, Actual, Environment, Evidence, Severity/priority, Missing info. Use when the user pastes bug notes, describes something wrong with the booking page, or asks for a bug report or repro steps.
---

# repro-bug-report

Write one bug report per bug, in the shape of issue #17 in
tramtrantuyet-agilityio/cd-Documents-dojo-baqa-tram. Read `README.md` first: the rules
R1-R4 are what "broken" is measured against.

## Output

Print the report as Markdown in chat only. Do not file a GitHub issue unless asked.

Use exactly these sections, in this order:

```
## Bug: <what is wrong, with the trigger value>

**Rule broken**: R<n> – <rule text from README.md>.

**Steps to reproduce**
1. Open app/index.html (or http://localhost:8080).
2. Check-in <date>, Check-out <date>.
3. Guests: <n> · Room: <Standard|Deluxe>.
4. Click "Check price".

**Expected**: <exact screen text or "no price">.
**Actual**: "<exact screen text>".

**Environment**: <browser and version, OS, build or commit>
**Evidence**: <screenshot file name and what it shows, or "none">
**Severity / priority**: <Low|Medium|High> / <Low|Medium|High> (<one-line reason>)

**Missing info**: <list, or "None">
```

## Rules

1. **Title**: `Bug: <symptom>` plus the value that triggers it, for example
   `Bug: Check-in date in the past (last week) is accepted and priced`. No ticket
   numbers, no "issue with".
2. **Rule broken**: name the rule (R1-R4 in `README.md`) and copy its wording. If the
   bug matches no rule, say "No rule covers this" and put it under Missing info.
3. **Steps**: numbered, one action each, with exact field values (dates as
   YYYY-MM-DD, guests, room). Start at "Open app/index.html". A stranger must be
   able to repeat it with no guessing. If the bug depends on today's date, state
   the date you tested on and give the offset ("a week in the past").
4. **Expected** comes from the rule. Use the app's real message when it exists
   (`Guests must be between 1 and 6.`, `Check-out must be after check-in.`). If the
   app has no message yet, write the wording and mark it "assumed wording".
5. **Actual** is the exact text the user saw, in quotes, such as
   `"2 night(s) · Total 1,200,000 VND"`. Add other values that also fail or pass
   if the notes say so (for example "yesterday is also accepted; today works").
6. **Environment**: only what the notes state - browser and version, OS, commit.
   Never invent a version.
7. **Evidence**: with a screenshot, give its file name and describe only what is
   visible in it (field values, result text, anything odd). Do not claim anything
   the image does not show. Without one, write "none".
8. **Severity / priority**: propose both with a one-line reason tied to guest or
   money impact (wrong price or bookable past dates = High; cosmetic = Low). The
   user confirms.
9. **Missing info is always present.** List what the notes do not give: browser
   version, build, exact dates, expected wording, whether other values fail. Do not
   fill gaps with guesses. Write "None" only if every field above is backed by the
   notes.
10. One bug per report. If the notes describe two, write two reports.
11. Keep it short. No intro and no extra sections.

## Before replying

- Could someone repeat the steps without asking a question?
- Is Expected taken from a rule, and Actual quoted exactly?
- Does Missing info list every field you did not get from the notes?

## Model

Issue #17:

```
## Bug: Check-in date in the past (last week) is accepted and priced

**Rule broken**: R2 – Check-in must be today or later.

**Steps to reproduce**
1. Open app/index.html (or http://localhost:8080).
2. Check-in 2026-10-14, Check-out 2026-10-16 (tested on 2026-10-21, so check-in is a week in the past).
3. Guests: 2 · Room: Standard.
4. Click "Check price".

**Expected**: an error saying check-in must be today or later; no price.
**Actual**: "2 night(s) · Total 1,200,000 VND" is shown. Yesterday (2026-10-20) is also accepted. Today (2026-10-21) correctly shows a price.

**Environment**: Chromium 141.0.7390.37 (Playwright, headless), Linux, origin/main @ ac09eda
**Evidence**: R2-past-checkin-price-shown.png
**Severity / priority**: High / High (guests can book dates that have already passed)

**Missing info**: None
```

Why it works: the title carries the trigger value; steps give exact dates and say
how far in the past; Actual quotes the screen and brackets the boundary (yesterday
fails, today works); severity gives a reason.
