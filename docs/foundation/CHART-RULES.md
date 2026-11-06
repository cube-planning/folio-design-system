# Chart Rules

> **Applies wherever charts appear**, for both personas — product dashboards
> and reports, decks, PDFs, one-pagers, marketing site sections, hero graphics
> and glass compositions. Only § "Glass-surface charts" is scoped to a single
> surface.
>
> The cross-persona facts (series order, the data-point display rule and its
> decorative exemption) live in `docs/foundation/BRAND-FOUNDATION.md`; this file holds the
> per-mark detail. A live specimen of the decorative treatment is
> `templates/chart-rules-mock/`.
>
> **Provenance.** These rules were migrated out of the retired
> `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` (2026-09-08) into the Cube BRAND
> Design System README, then moved here (2026-09-09) when that package was
> archived as a legacy artifact of the old branding system. They are current
> and authoritative; the package they briefly lived in is not.

---

### Chart component rule — no value is hover-only

> **Provenance note.** This section alone is *not* grounded in two independent
> Figma instances. It derives from `docs/foundation/cube-personas.md` and is promoted as a
> shared fact in `docs/foundation/BRAND-FOUNDATION.md` § "Chart data-point display". Treat
> it as a rule, not an observation awaiting a second instance — but don't cite
> Figma for it.

**Every plotted value must be readable without interaction.** Tooltips, crosshairs and
hover states are an enhancement layer, never the only path to a number.

Why this is a persona rule rather than a taste call: "difficulty communicating insights"
is a listed pain point for all four personas (Max, Ava, Tobias, Chris), and each of them
takes Cube output into a medium with no hover — board decks, PowerPoint, PDFs, pasted
screenshots. Chris, the non-finance budget owner, is the floor case: a read-only consumer
who will not hunt for a number. A hover-only value does not survive the export.

Density decides the *mechanism*, never whether the rule applies:

| Chart density | Requirement |
|---|---|
| ≤ 12 marks — bar, column, pie/donut, short line/trend | Direct-label **every** mark: value at the bar tip, on the column cap, at the line end |
| > 12 points per series — dense trends, time series | Direct-label endpoints, min, max, and the series the story is about; keep clean y-axis ticks; **and** pair the chart with a table/value view so every remaining value stays reachable without hover |
| A single headline number | Not a chart — use a stat tile / hero number |

Label styling, so the rule doesn't fight the rest of the system:

| Property | Value |
|---|---|
| Label type | `caption-1` (12px), Medium or SemiBold — see `CLAUDE.md` § 4 |
| Label color | Text tokens only — `var(--fg-body)` for the labelled value, `var(--fg-caption)` for axis/legend text; **never** the series color |
| Placement | Outside the mark by default; inside a bar or stacked segment only when the rendered text fits with padding on both sides — measure first, never `overflow: hidden` |
| Number format | Currency symbol + thousands/millions abbreviation, consistent within one chart |
| Legend | Always present at ≥ 2 series (a single series is named by the title instead) — identity is never carried by color alone |

Series order is governed by `docs/foundation/BRAND-FOUNDATION.md` § "Chart series order" (the
`--color-dataviz-*` family, assigned in fixed slot order). The rules below cover
everything else.

### What is banned from chart series

| Color | Why it's banned |
|---|---|
| **Gray** (any stop) | Reads as "less important / deprecated data" in a categorical chart |
| **Purple** (any stop) | Reserved system-wide for Cube AI features only |
| **Yellow** | Carries a warning connotation in a financial tool |
| **Red / Green** | Reserved for semantic status (favorable / unfavorable variance) only — never a category color |
| **Cobalt** | Brand/UI action color — keep chart series distinct from interactive UI |

Chart libraries ship their own default palettes: always pass an **explicit** color
array so a default can never leak in.

### Variance — a diverging pair, not red/green

When a chart's entire purpose is favorable vs. unfavorable variance — a variance
waterfall, a delta column — use a **warm/cool diverging pair across a neutral
midpoint**, not the status ramp. These reference the hue ramps directly rather
than categorical slots, because diverging is a different encoding job:

| Pole | Token | Hex |
|---|---|---|
| Favorable | `--color-orange-500` | `#F97316` |
| Unfavorable | `--color-indigo-500` | `#6366F1` |
| Midpoint / zero line | `--color-gray-500` | `#97A3B6` |

**Why not red/green** (updated 2026-09-08 — this section previously specified green
`#229E66` / red `#D92D20`). The reasons are aesthetic:

- Red and green at high saturation and near-identical lightness **vibrate**
  against each other, producing edge shimmer that's tiring on a dense variance
  chart.
- Because they sit at nearly the same lightness, they also flatten into one tone
  in greyscale print. Orange and indigo differ in temperature *and* lightness,
  so the split survives.
- Warm/cool is the conventional diverging axis — it reads as one scale with two
  poles, where a stoplight reads as two unrelated categories.

Encode the sign **positionally as well** — a column's side of the zero line, or an
explicit `+`/`−` on the label — so direction never rests on hue alone. Never mix a
diverging pair with categorical series in the same chart, and never use it to
distinguish two products, regions, or departments.

> **Tradeoff on record.** Red/green for variance is a strong FP&A convention that
> `docs/foundation/cube-personas.md` readers will expect, Chris (non-finance) most of all. The
> positional encoding above is what makes dropping it safe. If a specific
> customer-facing deliverable needs the convention, that's a per-deliverable
> exception — not a reason to revert this section.

### Chart chrome (axes, gridlines, labels)

Chart *structure* is gray — only the data marks carry the dataviz palette.

| Element | Token |
|---|---|
| Chart background | White |
| Gridlines | `--color-gray-300` |
| Axis line | `--color-gray-400` |
| Axis tick labels | `--color-gray-600` |
| Axis title | `--color-gray-700` |
| Chart title | `--color-gray-900` |
| Data labels / values | `--color-gray-900` |
| Legend text | `--color-gray-800` |
| Tooltip surface | White + `--color-gray-300` border |
| Zero / reference line | `--color-gray-500` |

> **Migration note (2026-09-08).** These rows were carried over from the retired
> `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` § 1.4, which specified them as raw hexes from
> an older gray ramp (`#E4E7EC`, `#D0D5DD`, `#667085`, `#475467`, `#101828`, `#344054`)
> — **none** of which match any stop in the current `tokens/tokens.css` gray ramp. They
> have been re-expressed as token references, mapped by role to the nearest current
> stop, so this table can't drift from the ramp again. Only `#98A2B3` (the old
> zero-line value) survived unchanged as an exact match for today's
> `--color-gray-500`.

### Chart form rules

- **Bar / column:** solid fill at the `500` stop, `4px` corner radius on the value end only — no gradients, no 3D, no drop shadows, no outlines.
- **Stacked bars:** consecutive dataviz slots (1, 2, 3…), never two stops of the same hue.
- **Line:** `2px` stroke, round caps, no shadow. Markers only when there are fewer than 12 points.
- **Markers:** `8px` diameter (`r=4`) — the floor, and ~4× the stroke width. Past ~10px the dots start dominating the line they sit on. Borderless on a decorative graphic; keep the surface ring on a product chart, where the marker is also a hover target.
- **Area:** the `500` stop stroke over the matching `-subtle` fill at 100% opacity — never a semi-transparent `500`.
- **Pie / donut:** maximum 6 slices, dataviz order, `2px` white gap between slices. Prefer a bar chart over a pie whenever there are more than 4 categories.
- **Actuals vs. forecast:** same hue — actuals solid, forecast dashed (`4 4`) at the same `500` stop. Do not switch hue for forecast.
- **More than 6 series:** group the tail into "Other" using `--color-gray-500`. Do not extend the palette.
- Never apply gradients, transparency, textures, or glow to data marks.

### Glass-surface charts

Additional constraints for a chart sitting on a glass panel (`brand/glass-ui-style.md`).
Everything above still applies; these are the deltas.

#### Series selection

Always **three distinct hues**, never monochrome shades of one color — a
monochrome ramp loses its series separation entirely once it's behind blur and
saturation shifts.

Use `--color-dataviz-*` from `tokens/tokens.css`. For a three-series glass
graphic, slots 1, 4 and 6 give the widest visual spread:

| Token | Ramp stop | Hex |
|---|---|---|
| `--color-dataviz-1` | `teal-500` | `#14B8A6` |
| `--color-dataviz-4` | `indigo-500` | `#6366F1` |
| `--color-dataviz-6` | `orange-500` | `#F97316` |

Skipping slots is fine; **reordering** them is not — slot order still ascends
(1 → 4 → 6). Teal and cyan are adjacent on the wheel and a glass panel's
`saturate()` pushes them closer still, which is why slot 2 isn't in the
three-series set.

Space the series **geometrically** as well as by hue — at hero scale, two
closely-tracking lines in adjacent hues read as one thick line no matter what
the legend says.

#### Marks over glass

Line weight (`2px`, round caps), marker diameter (`8px` / `r=4`, ~4× the
stroke) and marker density (below 12 points per series) are unchanged from
"Chart form rules" above. Two things differ:

| Property | Value |
|---|---|
| Area fills | None — an area fill over a translucent panel muddies both |
| Marker border | None over glass — a white surface ring breaks the hue and reads as a separate bead |

> **Open — marker border on a product chart behind glass.** "Chart form rules"
> keeps the surface ring on a product chart because the marker is also a hover
> target; the glass rule drops it unconditionally. The two only collide on a
> real, interactive product chart rendered on a glass panel, which nothing in
> the repo currently does. Not resolved here.

#### Data point labels — decorative graphics omit them

A glass graphic is almost always a **decorative** chart: a hero image, a
section illustration, a deck cover, standing in for "we do finance analytics"
rather than reporting a figure. In that case **omit the per-point numbers.** A
value beside every dot competes with the line it belongs to, and nobody reads
eighteen of them. The trend shape and the color relationships are the payload;
the y-axis carries magnitude.

This is a scoped exemption from `docs/foundation/BRAND-FOUNDATION.md` § "Chart data-point
display", granted there explicitly — **not** a licence to drop labels from a
chart someone reads figures off. The moment a glass panel carries a real
reportable number (a dashboard behind glass, a report screenshot), the
labelling rule applies in full and the constraints below govern how.

**If you do label over glass:**

| Concern | Rule |
|---|---|
| Chip | Solid `gray-900` fill with `gray-50` type reversed out, Regular weight. Fully opaque — a translucent chip lets the blur behind it bleed through the value |
| Color | Per the general label styling above (text tokens, never the series color) — glass is simply where it bites hardest: a teal number on a saturated panel is the worst case in the system |
| Never | Bare text directly over a `backdrop-filter` region, where a blob passing behind it changes the contrast |

> **Open — label weight.** The chip above specifies Regular; the general label
> styling table earlier in this file specifies `caption-1` Medium or SemiBold.
> Reversed-out type on a solid dark chip is the case for the lighter weight,
> but the two tables disagree as written. Not resolved here.

### Named chart themes

The four board presets — **Board Room**, **Fiscal**, **Growth**, **Forecast** — are
documented in full, with 7 slots each and their intended use, in
`docs/product/boards_color_theme_project_summary.md`. Use a preset whole; never mix slots
between themes.

---
