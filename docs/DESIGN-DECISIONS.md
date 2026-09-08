# Design Decisions Log

> Dated record of *why* a rule reads the way it does — the evidence, the thing it
> replaced, and what was checked. Kept separate from the specs on purpose: a
> reader who just wants to ship a chart shouldn't have to sift live rules from
> history.
>
> **The specs are authoritative.** This file explains them; it never overrides
> them. If a spec and an entry here disagree, the spec is right and the entry is
> stale — fix the entry.
>
> Add an entry when a rule changes or a conflict is resolved. Live open issues
> stay in the spec (where they'll be seen), not here.

---

## 2026-09-08 — Chart series order corrected to the dataviz family

**Changed:** `docs/BRAND-FOUNDATION.md` § "Chart series order".

Previously declared `#12264D, #219E66, #173D82, #70CF98, #30886C, #97A3B6` as
FINAL. That was a bug in BRAND-FOUNDATION itself, not in the persona rules that
contradicted it. Corrected to the `--color-dataviz-*` family.

Evidence:

- `tokens/tokens.css` — the master primitive ramp — defines the dataviz family
  as teal / cyan / emerald / indigo / fuchsia / orange.
- The since-retired `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` § 1.1 called that
  same set "the ONLY chart colors" and shipped it as a copy-paste `CUBE_DATAVIZ`
  array.
- BRAND-FOUNDATION's own § "Primitive color palette" already adopts Folio's
  `tokens.css` ramp "plus the accent/data-viz families" as the single shared
  palette — so its series-order section contradicted its own palette section.
- The navy/green sequence was implemented in **no** token file, including
  `Cube BRAND Design System/colors_and_type.css`. Grepping `#12264D` shows those
  six hexes are Cube Software's brand and gradient stops (New Blue, the greens,
  Gray 500) — they look like brand colors mistakenly promoted into a chart rule.

This closed the "unresolved conflict" `glass-ui-style.md` § 4 had carried on
record.

---

## 2026-09-08 — Glass three-series set is slots 1 / 4 / 6

**Changed:** `glass-ui-style.md` § 4. Was slots 1 / 2 / 4 (teal, cyan, indigo).

The file's own prose had warned that "teal and cyan are adjacent on the wheel,
and a glass panel's `saturate()` pushes them closer still." Correct instinct,
now measured with the `dataviz` skill's validator (`--pairs all`, light):

| Set | Worst CVD pair | Worst normal-vision pair |
|---|---|---|
| 1 / 2 / 4 (was) | — | **teal ↔ cyan ΔE 7.1** (floor is 15) |
| 1 / 4 / 6 (now) | ΔE 16.3 | ΔE 27.4 |

Teal ↔ cyan is the worst normal-vision pair in the whole palette. Indigo ↔
fuchsia is worse still under protanopia (ΔE 0.6 — effectively identical), which
is why slot 5 stays out too.

---

## 2026-09-08 — `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` retired

**Removed.** The project standardised on Claude, so a ChatGPT-targeted
instruction wrapper had no audience.

Before deleting, its unique content was migrated rather than lost:

- §§ 1.2–1.5 (banned-from-series colors, the variance exception, chart chrome,
  chart form rules) existed **nowhere else** in the repo → moved to
  `Cube BRAND Design System/README.md` § "Charts & data display".
- § 1.6's four board themes already lived in fuller detail (7 slots, mental
  models) in `docs/boards_color_theme_project_summary.md` → not duplicated.
- §§ 2–6 duplicated `CLAUDE.md` and `tokens/tokens.css` → dropped.

**Drift caught on the way:** § 1.4's chart-chrome table specified raw hexes
(`#E4E7EC`, `#D0D5DD`, `#667085`, `#475467`, `#101828`, `#344054`) from an older
gray ramp — none matched any stop in the current `tokens/tokens.css`. Migrated as
token references mapped by role to the nearest current stop, so the table can't
drift again. Only `#98A2B3` survived unchanged, as an exact match for today's
`--color-gray-500`.

It never existed remotely, so no design-project deletion was needed;
`.design-sync/NOTES.md` records that the open upload-plan question is closed.

---

## 2026-09-08 — Variance uses a warm/cool diverging pair, not red/green

**Changed:** `Cube BRAND Design System/README.md` § "Variance". Was green
`#229E66` favorable / red `#D92D20` unfavorable.

Now orange `#F97316` (favorable) / indigo `#6366F1` (unfavorable) across a
neutral `gray-500` midpoint. Validator numbers:

| Pair | CVD separation |
|---|---|
| Green ↔ Red (was) | **ΔE 8.0** deutan — bottom of the "legal only with secondary encoding" band |
| Orange ↔ Indigo (now) | **ΔE 32.5** protan |

Reasoning beyond the score: both common CVD types attack the red-green axis and
leave blue-yellow intact, which is why warm/cool is the standard diverging pair
in cartography. Red 500 and Green 500 also sit at near-identical luminance, so
they collapse to one gray in greyscale print — orange/indigo differ in
temperature *and* lightness. At matched value and high saturation red/green
additionally vibrate, producing edge shimmer on a dense variance chart.

**Tradeoff accepted:** red/green for variance is a strong FP&A convention our
personas expect. Positional encoding of the sign (which side of the zero line,
plus an explicit `+`/`−`) is what makes dropping the convention safe.

---

## 2026-09-08 — Decorative graphics omit per-point labels

**Changed:** `docs/BRAND-FOUNDATION.md` § "Chart data-point display" gained a
scoped exemption; `glass-ui-style.md` § 4 documents the glass case.

The labelling rule ("every plotted value readable without interaction") was
written earlier the same day for product and report charts, driven by all four
personas sharing "difficulty communicating insights" and taking Cube output into
PowerPoint, where hover doesn't exist.

Applied to a *decorative* hero graphic it backfires: eighteen numbers on a
three-series trend compete with the lines they belong to. The `dataviz` skill had
predicted this in its own non-negotiables — "never a number on every point…
direct labels work *because* they are sparing."

Resolved by scoping rather than weakening: the boundary is **who reads it and for
what**. Reader wants the figure → label in full. Chart stands in for "we do
finance analytics" → omit numbers, keep legend and clean axis ticks. Ambiguous
cases default to labelled.

Reference implementation: `templates/chart-rules-mock/`.

---

## 2026-09-08 — Line weight 2px, markers 8px borderless

**Changed:** `glass-ui-style.md` § 4. Line weight was `2.5–3px`; the new value
is `2px`, matching the form rule's canonical figure, verified over glass.

Marker sizing was bracketed from both sides before landing:

| Radius | Diameter | Verdict |
|---|---|---|
| `r=3.5` | 7px | Under the 8px floor |
| `r=6` | 12px | 6× the stroke — read as beads on a wire, dots dominated the line |
| **`r=4`** | **8px** | At the floor, ~4× the stroke |

The governing ratio is diameter ≈ 4× stroke width; the absolute floor is 8px
because a marker on a product chart is also a hover target. Surface ring dropped
on decorative graphics (a white ring breaks the hue and reads as a separate
bead); **kept** on product charts, where hit area matters more than restraint.
