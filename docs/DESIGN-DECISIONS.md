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

## 2026-09-09 — Color cross-check against the brand reference; gradients corrected

**Source of truth:** a brand color reference (137 values across 13 ramps) plus the
Figma gradient spec, both supplied by the user. Confirmed: **`tokens/tokens.css`
is the accurate file.**

### Cross-check result

| File | Result |
|---|---|
| `tokens/tokens.css` | 137/137 match, no missing stops |
| `tokens/cube-colors.md` | Was **stale** — all 11 gray stops (Untitled UI ramp: `gray-900 #101828`, `gray-200 #E4E7EC`) and 7 blue stops (Tailwind ramp) wrong, plus `yellow-200`, `purple-200`. Realigned to `tokens.css`; now 0 mismatches |

User confirmed directly: gray-900 is `#222B3A`, gray-200 is `#F2F5F9`.

### Gradients — two corrections to earlier work in this session

- **`--color-gradient-ai` third stop was wrong.** It read `#5925DC`
  (purple-**700**); the Figma spec is `10% purple/500 → 50% purple/400 →
  100% purple/600`, i.e. `#7A5AF8 → #9B8AFB → #6938EF`. Corrected in 11 files,
  leaving the `--color-purple-700` ramp definitions untouched.
- **`--color-gradient-blue` had been deleted in error.** Earlier this session it
  was removed because its `#2A4DD0` stop was off-ramp and it had no consumers.
  The gradient is real ("UI Refresh"): `#2667D8 → #5024A7 → #4163B8`. Restored.
  Its 2nd and 3rd stops are **gradient-only values with no ramp stop of their
  own** — correct as given, and commented as such so they aren't "fixed" to a
  nearby ramp hex later.

### Mislabelled gradients found and fixed

Three gradients named for AI purple were actually built from off-ramp blues:

- `templates/usage.html` `--color-gradient-ai` → was `#7A5AF8, #255AA4, #2A40D0`
- `templates/homepage.html` (hero) → same values
- `templates/usage.html` AI-plugin SVG icon → `#7A5AF8, #285AD4, #2A4DD0`

All three now use the canonical gradient. Note `#2A4DD0` is the same bad hex
that had been sitting in `--color-gradient-blue`, which suggests one original
mistake propagated.

### Still open

1. **Series assignment conflicts with the accessibility re-step.** The brand
   reference assigns the accent families to slots — teal = series 1, cyan = 2,
   emerald = 3, indigo = 4, fuchsia = 5, orange = 6, at the 500 stop. That is
   the palette re-stepped earlier today for failing CVD and normal-vision
   checks. Re-tested keeping the reference's family order and varying only the
   stops: **0 of 48 (4 families), 0 of 240 (5), 0 of 1200 (6) pass.** Not
   fixable by re-stopping. Awaiting a decision — reference wins (ship the a11y
   failure), accessibility wins (update reference + Figma), or split the roles.
2. **Angle/stop-position variants.** A "Folio AI Gradient" from a different
   Figma frame uses `-18.86deg` at `33.1% / 62.1% / 98.4%`
   (`components/AddonTopNav.jsx`, `docs/cube-addon-design-spec.md`), and
   `templates/homepage.html` uses `-19deg` at `33/62/98` plus one 2-stop variant
   that drops purple-400 entirely. Colors are now right in all of them; the
   angle and stop positions still differ from the canonical `135deg 10/50/100`,
   which the gradient-direction rule arguably forbids. Normalising changes how
   the add-on AI button and homepage render, so it needs a deliberate call.
3. **Stale Folio hexes in `templates/usage.html` and `templates/homepage.html`**
   — `#344054`, `#E4E7EC`, `#9AA5B4`, `#12264D` (old cobalt-600) and similar.
   Distinct from the many third-party brand colors in those files (Google
   `#0F9D58`, Excel `#107C41`, Teams `#5059C9`, Outlook `#ED6C47`…), which are
   legitimately off-ramp and must not be recoloured.

---

## 2026-09-09 — Dataviz series: 6 slots, per the brand reference

**Settled:** the six accent families each map to one series at the `500` stop —
teal 1, cyan 2, emerald 3, indigo 4, fuchsia 5, orange 6 — as specified in the
brand color reference. `tokens/tokens.css` defines the slots as `var()`
references into the hue ramps so a series value cannot drift off the ramp.

Earlier in the session this palette was re-stepped to five slots on
accessibility grounds (colorblind separation and normal-vision contrast).
**Reverted per user direction:** these are graphic-design colors, are not held
to an accessibility standard, and no such rule is defined for them. The
accessibility rules, thresholds and open issues that had been written into
`docs/BRAND-FOUNDATION.md`, `docs/CHART-RULES.md` and `glass-ui-style.md` were
removed rather than left as dormant constraints.

Also removed in that revert: the ">5 series" cap, the 5-slice pie limit, and the
"every prefix validates" nesting requirement. The rules are back to 6 series,
max 6 pie slices, and ">6 → Other" in `--color-gray-500`.

`glass-ui-style.md` keeps its own three-series guidance (slots 1 / 4 / 6) on
straightforward visual grounds: teal and cyan are adjacent on the wheel and a
glass panel's `saturate()` pushes them closer, so slot 2 is skipped there.

---

## 2026-09-09 — `Cube BRAND Design System/` archived as legacy

**Archived, not deleted.** Per the user: this package was produced by the *old*
branding design system and is not authoritative. Evidence:

- `SKILL.md` declared `name: cube-ai-design`; `_ds_manifest.json` uses namespace
  `CubeAIDesignSystem_484d47` — both carry the retired "Cube AI" brand name.
- Its own "Known deviations" cite *"this system's Lucide mandate"* and *"this
  system's Source Sans 3 body rule"* as its rules; both are retired.
- Shipped a radius scale shifted one step from Folio's, the retired Deep Purple
  `#5547A5`, and pre-alignment palette hexes.
- `"source": "spa"` — generated by another tool, not this repo's build.
- Entered in commit `19cd2b1` *alongside* BRAND-FOUNDATION, i.e. as the
  pre-existing artifact the Foundation was written to reconcile.

**Rescue before archive.** Earlier the same session, the chart rules had been
migrated *into* this package's README from the retired
`docs/CHATGPT-PROJECT-INSTRUCTIONS.md`. Archiving would have re-orphaned content
that exists nowhere else, so it was extracted first to **`docs/CHART-RULES.md`**
(which also lands in the Folio bundle via the `docs/*.md` guidelines glob). The
README now carries a pointer, not the content. Voice pillars were likewise
restated directly in BRAND-FOUNDATION § "Voice and tone", which had been citing
the package README as authoritative.

**Today's fixes kept, not reverted** (user's call): retired purple removed,
palette and radius aligned to Folio, edge-pair treatment retired, Lucide card
replaced. Nothing introduced new values — every edit moved it toward
BRAND-FOUNDATION — so the snapshot is at least internally consistent.

**Marked, so it can't be used by accident:** ARCHIVED banner at the top of
`README.md`; `SKILL.md` description rewritten to "ARCHIVED / DO NOT USE" and
`user-invocable` flipped to `false`.

**Nothing was pushed.** The remote "Demo Cube BRAND Design System" project still
holds *older* values than this local copy, so it is not a recovery source. An
earlier recommendation in this session to reconcile ~70 files down from that
remote was withdrawn — it would have imported more legacy, not less.

**Left open:** the authoritative marketing/brand source is undefined. Tracked in
BRAND-FOUNDATION § "Marketing/brand source", including the orphaned voice
material, `docs/MARKETING-DESIGN-SYSTEM.md`'s dependency on the archived README,
and the fact that `npm run style-guide:sync` currently copies `glass-ui-style.md`
into an archived package.

---

## 2026-09-09 — Icon rules: `fa-solid` default confirmed, Lucide card replaced

**Changed:** `docs/BRAND-FOUNDATION.md` § Icons, `CLAUDE.md` § 7,
`Cube BRAND Design System/preview/icons-system.html`.

Two separate axes were being conflated. "Font Awesome" is the *library* choice;
`fa-solid`/`fa-regular` is the *weight* choice. An icon needs both a style class
and a name class (`fa-solid fa-house`), and the same icon exists in solid /
regular / light / thin / duotone off one glyph slot (`fa-house` → `f015` in all
five), each backed by a different font file. So "use Font Awesome" does not
settle the weight.

**Weight — corrected in BRAND-FOUNDATION, which was the wrong one.** It had read
"Font Awesome, **Regular weight only** … never fall back to `fa-solid`". Per the
user: `fa-solid` is the correct default. `CLAUDE.md` § 7 had it right all along,
and the codebase agreed — 92 `fa-solid` usages across 37 components were
compliant. An earlier pass in this session had "fixed" CLAUDE.md *against* the
Foundation and mis-reported those 92 as violations; both were reverted. Recorded
exceptions: the AI sparkle is `fa-solid fa-sparkles` (verified consistent across
`Banner`, `Toast`, `AnalyzePanel`, `BuildPanel`, `AddonTopNav`,
`PortalSideBarNav` and `cube-addon-design-spec.md`), and icon-only `Button` is
`fa-regular` per `CLAUDE.md` § 6.

**Library — the one real violation, now fixed.** `preview/icons-system.html`
loaded Lucide from `unpkg.com` and advertised "Lucide 1.5px outline". All 16
icons remapped to `fa-solid` equivalents, each verified against the vendored
`metadata/icons.json` for both existence and solid style:

`home→house`, `layout-dashboard→table-columns`, `sparkles→sparkles`,
`check-circle-2→circle-check`, `triangle-alert→triangle-exclamation`,
`circle-x→circle-xmark`, `database→database`, `line-chart→chart-line`,
`file-text→file-lines`, `git-branch→code-branch`, `users→users`,
`settings→gear`, `search→magnifying-glass`, `bell→bell`, `plug→plug`,
`calculator→calculator`.

The card's CSS moved from Lucide's SVG `stroke-width` model to font-based
`font-size`, hardcoded chrome colors became tokens, and the external script tag
is gone. Verified in-browser: 16/16 glyphs resolve, Font Awesome loaded, zero
external scripts, `window.lucide` undefined.

**Enforcement added:** icon names must be verified against the vendored
`fontawesome-pro-7.3.1-web/metadata/icons.json` rather than looked up from
memory, and a package that ships standalone vendors the stylesheet + webfonts
instead of relying on a CDN kit (`Cube BRAND Design System/vendor/fontawesome/`
is the reference layout).

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

## 2026-09-08 — Brand radius scale realigned to Folio's names

**Changed:** `Cube BRAND Design System/colors_and_type.css` and its dependents.

The two systems had radius scales shifted by one step, so the same token name
meant different values:

| Token | Folio | Brand (was) | Brand (now) |
|---|---|---|---|
| `md` | 6px | 8px | 6px |
| `lg` | 8px | 12px | 8px |
| `xl` | 12px | **16px** | 12px |
| `2xl` | 16px | **24px** | 16px |
| `full` / `pill` | 9999px | 999px (`pill`) | 9999px (`full`) |

A 16px card was therefore `--radius-xl` in the brand system and `--radius-2xl`
in Folio. BRAND-FOUNDATION had asserted the two were "already consistent — no
conflict," which was true of the values and false of the names.

**Safe because nothing consumed the shifted names.** `--radius-2xl` (24px) was
used nowhere; `--radius-md`/`lg`/`xl` appeared only in README prose; the only
real code consumer was `.cube-code` → `--radius-xs`, which is unchanged. All 24
`preview/*.html` cards hardcode px values and reference no radius token, so no
rendered card broke.

Kept deliberately:
- `--radius-xs: 2px` — brand-only extension, Folio has no 2px stop, and icon
  corners need it.
- `--radius-pill` — now a deprecated alias of `--radius-full` rather than an
  independent `999px`, so existing references keep working.

Fixed in the same pass:
- Two README refs reading `var(--radius-xl) (16px)` → `--radius-2xl`.
- Mega-menu nav-item card said `var(--radius-md)`, meaning 8px under the old
  scale — would have silently become 6px. Now `var(--radius-lg) (8px)`, the
  grounded value preserved. **This is the failure mode to watch for**: prose
  written against the old scale changes meaning under the new names unless the
  px value is stated.
- `docs/COMPONENT-DOC-TEMPLATE.md` said `Card radius | radius-xl 12px`, a
  straight contradiction of `components/Card.md`. Now `radius-2xl` 16px.
- `tokens/tokens.css` labelled `--radius-xl: 12px` as `/* Cards */`. Now
  "Nested tiles inside a card — NOT card containers."
- `.design-sync/conventions.md` documented the *shifted* scale as the Folio
  bundle's own — verified wrong against `ds-bundle/_ds_bundle.css`, which ships
  `md 6 / lg 8 / xl 12 / 2xl 16`. This one mattered most: that file tells
  designers in the synced design project which token names to use.
- `preview/spacing-radii.html` (the card that *documents* the scale) now reads
  its swatches from the tokens instead of hardcoding them, so it can't drift
  from the CSS again. Verified in-browser: all seven labels match their rendered
  `borderRadius`.

**Not done:** remote propagation. `npm run design-sync` is Folio-only
(`.design-sync/config.json`, `pkg: folio-design-system`); the brand system is a
separate project (`source: "spa"`, 0 components, 24 cards) needing a
`DesignSync get_file` → patch → upload pass. Also still open: the other 23
preview cards hardcode `10px`/`7px`/`3px` radii that sit on neither scale.

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
