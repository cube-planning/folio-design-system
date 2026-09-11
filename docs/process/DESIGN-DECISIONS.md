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

## 2026-09-11 — Repo reorganized by audience; `brand/` created as the marketing/brand home

**Changed:** New top-level `brand/` and `archive/`. `docs/` split into `foundation/` ·
`product/` · `process/`. `guidelinesGlob` in `.design-sync/config.json` widened to
`docs/**/*.md`. New indexes: `docs/README.md`, `templates/README.md`,
`brand/BRAND.md`, `brand/slides/README.md`. `CLAUDE.md` and `README.md` layout
sections rewritten. `docs/foundation/BRAND-FOUNDATION.md` § "Marketing/brand source"
closed.

**Why:** The repo was organized by file *type* (`docs/`, `tokens/`, `templates/`), which
worked while it was only the Folio app. Marketing material had already scattered across
six top-level locations (`glass-ui-style.md`, `marketing-landing-page/`,
`tokens/marketing-*.css`, `docs/MARKETING-DESIGN-SYSTEM.md`,
`templates/cube-abstract-graphic/`, `Cube BRAND Design System/`) with no folder that
answered "where does brand work go?" — and a company slide template was about to land.
`BRAND-FOUNDATION.md` § "Marketing/brand source" had flagged this as needing a human
decision since 2026-09-09. The reorg is the answer: organize by *audience* (app / brand /
shared / process), and give brand a top-level folder so the slide template has an
obvious home.

**Moves:** `glass-ui-style.md` → `brand/`; `tokens/marketing-*.css` → `brand/tokens/`;
`marketing-landing-page/` → `brand/landing-page/`; the stray root-level extensionless
`Charlie animate graphic` → `brand/graphics/charlie-animate-graphic.html`;
`Cube BRAND Design System/` → `archive/cube-brand-design-system/`;
`docs/MARKETING-DESIGN-SYSTEM.md` → `archive/`.

**The superseded doc was the real bug.** `MARKETING-DESIGN-SYSTEM.md` opens with
"**SUPERSEDED** — treat this file as historical/exploratory, not current", yet
`guidelinesGlob: ["docs/*.md", …]` swept it into `ds-bundle/guidelines/docs/` on every
sync, so the claude.ai/design project served it as a *current* guideline. Moving it to
`archive/` takes it out of every glob. This was the item most likely to poison new brand
work, which is why it moved rather than staying with a stronger banner.

**`docs/*.md` would have silently dropped the subfoldered docs.** The glob engine at
`.ds-sync/lib/docs.mjs:210` compiles `*` to `[^/]*`, so it does not cross a directory
separator — subfoldering `docs/` without widening the glob would have dropped all 13
guidelines from the sync with no error. Verified that `**` *is* supported (same function,
`**/` → `(?:[^/]+/)*`) and that the copy preserves the package-relative subpath
(`docs.mjs:250`), so files now land at `guidelines/docs/<group>/`. Widened in the same
commit as the move, not after.

**What deliberately did *not* move, and why:**
- **`components/`** — all 58 paths are hardcoded in `componentSrcMap`.
- **`tokens/tokens.css`, `tokens/typography.css`, `vendor/fonts/dm-sans/`** — they are
  `cssEntry`, `tokensGlob`, `extraFonts`.
- **Every `templates/*/` specimen dir**, including `cube-abstract-graphic/` even though it
  is marketing work that "belongs" in `brand/graphics/`. Each `ds-base.js` hardcodes
  `const base = '../..'`, authored for the *deployed* layout `templates/<name>/` in the
  design project. The local path mirrors the remote path on purpose, and
  `.design-sync/NOTES.md` already warns against breaking it. Grouping these under a
  `mocks/` folder was proposed and dropped for this reason; `templates/README.md` now
  documents the two-kinds-in-one-folder situation instead.
- **`docs/foundation/BRAND-FOUNDATION.md`** stayed in `docs/` rather than moving to
  `brand/`. It is explicitly cross-persona — the app depends on it too — so filing it
  under `brand/` would have implied brand owns facts the app also has to obey.

**Cost paid:** ~100 bare-path references (`docs/BRAND-FOUNDATION.md` alone appears 50
times) rewritten across 29 files via a guarded idempotent script, and every moved
guideline reads as a delete + add in the remote design-project diff. Accepted because the
references were plain-text paths, not relative markdown links — only 3 relative links
existed in all of `docs/`, all in the now-archived marketing doc — which made the rewrite
mechanical and verifiable.

**Also fixed:** `README.md`'s "Folder Structure" section documented a `~/folio/` tree with
`RESEARCH.md` and `tokens.css` at the repo root. Neither had been true for a long time.

---

## 2026-09-11 — Background raised to 50–70%; new "matted" panel variant

**Changed:** `brand/glass-ui-style.md` § 1 (new variant, clear-mirror note), § 4
(background), § 6 (checklist). New `templates/cube-abstract-graphic/`.

**The complaint:** a reference marketing graphic (Glean) read as far more
transparent than ours, and the assumption was that its glass used a lower fill.
It doesn't. Its Plan card is an ordinary frosted card over a near-full-
saturation abstract render — **the transparency reads because the background is
loud**, not because the glass is thin.

Tested both levers on the same composition:

| Lever | Was | Tried | Effect |
|---|---|---|---|
| Clear-mirror fill | `0.20 → 0.08` | `0.16 → 0.04` (bottom of the allowed range) | Barely perceptible |
| Background blobs | 15–30% @ 95–115px | 55–70% @ 60–70px | **The entire difference** |

So the fill ranges were never the problem, and § 4's 15–30% ceiling was the
actual constraint. A clear-mirror panel over a 15–30% background has nothing to
transmit and reads milky — the variant's whole point was unreachable.

**The ceiling is now conditional on what sits in front of it**, which a flat
raise got wrong:

| Panel in front | Blobs |
|---|---|
| Clear mirror, or matted | 50–70% @ 60–80px |
| Frosted matte carrying dense content — chart marks, table rows, body copy | 15–30% @ 60–120px (unchanged) |

The first draft raised the band globally. That would have put loud colour
directly behind the chart marks in `templates/chart-rules-mock/` — the file
that exists to demonstrate the chart rules. Frosted is the content-dense
variant; calm behind it was always correct.

**New variant: matted.** A loud background costs legibility, which is what § 1
previously prevented by telling you to keep the background calm — i.e. by
forbidding the look. The matted variant buys both: outer panel is the
clear-mirror recipe verbatim and does the transmitting; an inner near-opaque
surface (`rgba(255,255,255,0.88–0.95)`, `--radius-xl` 12px, no shadow) holds
the copy. Radius steps down 16px → 12px per the radius scale. This is
structurally what the reference does.

**Corrected mid-change:** "Body copy does not go directly on a mirror panel"
was first written unconditionally, which would have made
`templates/glass-dashboard-mock/` non-compliant by fiat — its AI callout puts
body copy straight on a mirror fill and reads fine, because its background is
calm. The rule is now scoped to the 50–70% band, and the mock is cited as the
worked example of the other case. A mirror panel cannot both transmit a loud
background and hold unaided body copy; the two bands encode that trade.

**Separate bug fixed in the same pass.** `glass-dashboard-mock` drew **no
markers** on a 6-point series, breaking the under-12-points rule in the very
file its README calls the working example — and the file this session's new
template was copied from, which is how the omission propagated. Now 18
markers at `r=4`, borderless. Worth noting why nothing caught it: a spec'd
mark that is simply absent renders as a perfectly clean chart, so neither the
render check nor a screenshot review can see it.

> **Open.** Actuals and Forecast share a hue with the forecast dashed, and
> both now carry markers. Dots on a projected line arguably imply measured
> points. The form rule says markers below 12 points with no exception for
> dashed series; not resolved here.

---

## 2026-09-11 — Chart rules consolidated; AI accent moved to the Foundation

**Changed:** `brand/glass-ui-style.md` (−117 lines), `docs/foundation/CHART-RULES.md`,
`docs/foundation/BRAND-FOUNDATION.md`, `templates/chart-rules-mock/index.html`.

`brand/glass-ui-style.md` § 4 had accumulated two sets of rules that were not
glass-specific, so the one file a marketing graphic reads had become the only
home for rules that apply to every chart and to every AI surface.

**Charts.** Series slots 1 / 4 / 6, the marks table, and the data-point
labelling rules moved to `docs/foundation/CHART-RULES.md` as a new § "Glass-surface
charts". They were briefly written to a new repo-root `charting-rules.md`;
that file was deleted before commit, because `docs/foundation/CHART-RULES.md` already
existed for exactly this and a root file with a near-identical name would have
been the more confusing outcome. Three rules turned out to be **exact
duplicates** of "Chart form rules" already in that file — `2px` round-cap
stroke, `8px` (`r=4`) markers, markers below 12 points per series — and are
now stated once.

Two genuine conflicts surfaced in the merge and are recorded as open notes in
the spec rather than resolved here:

| Conflict | Positions |
|---|---|
| Marker border | Form rules keep the surface ring on a product chart (the marker is a hover target); the glass rule drops it unconditionally. Only collides on an interactive product chart behind glass, which nothing in the repo does |
| Label weight | Glass label chip says Regular; the general label styling table says `caption-1` Medium/SemiBold |

**AI accent.** The § 4 subsection was deleted, but it was pointing at
`docs/foundation/BRAND-FOUNDATION.md` for rules that were **not actually there**. Four
things were moved across before the deletion, having been checked against the
whole repo first:

- the **retired-hex table**, including **`#8B7FD1`** — which existed nowhere
  in the repo except `brand/glass-ui-style.md` and its archived mirror. Deleting the
  section as-written would have silently un-retired it. It never had a token
  behind it; the gradient's own `#9B8AFB` mid-stop is the lighter tint now.
- `background-clip: text` + `color: transparent` for gradient text fills
- the `IconBadge` exception for the AI icon
- the literal `--glow-ai` `box-shadow` fallback

`#335CFF` stayed in the glass checklist — it is the cobalt-ramp rule, not an
AI rule, and folding it into the Foundation pointer would have lost it.

**Bug found while verifying:** the Foundation's own token-flow diagram claimed
`IconBadge.ai-sparkle → sparkle icon in AI badges`, which directly contradicts
the `IconBadge` exception being added six sections above it. Checked against
the code rather than assumed: `IconBadge`'s `HUE` map is teal/cyan/emerald/
indigo/fuchsia/orange with no purple, and `grep` for `sparkle` across
`components/` shows it rendered in `Banner`, `Toast`, `AnalyzePanel`,
`BuildPanel`, `AddonTopNav` and `PortalSideBarNav` — never through
`IconBadge`. The row now reads `Banner.ai-sparkle`, true against
`Banner.jsx:48`.

**Second stale reference:** `templates/chart-rules-mock/index.html` carried a
comment citing a `2.5–3px` glass stroke that `brand/glass-ui-style.md` had already
stopped specifying. `STROKE` was already `2`, so nothing rendered had been
wrong — only the comment. Fixed, along with three pointers elsewhere that
named `brand/glass-ui-style.md` § 4 as the home of chart rules. Those were the
dangerous kind of stale: § 4 still exists as "Color", so they resolved to a
pointer stub instead of failing loudly.

*Deliberately not touched:* the `brand/glass-ui-style.md` § 4 references in the
dated entries below. Those are history and were accurate when written; this
file separates the log from the live spec on purpose.

---

## 2026-09-09 — Stale hexes in usage.html / homepage.html replaced from the ramp

**Changed:** `templates/usage.html`, `templates/homepage.html`, plus a broken
stylesheet path in three templates.

The two files held 41 off-ramp values. 30 are **third-party brand marks** inside
app-icon SVGs (Excel, PowerPoint, Teams, Slack, Sheets, Slides, Claude) and were
deliberately left alone — recolouring them would misrepresent someone else's
logo. The remaining 12 were ours, and split into two kinds.

**Known stale values** — these were ramp stops under an older ramp, so the
mapping is semantic rather than a nearest-colour guess:

| Was | Now | Basis |
|---|---|---|
| `#344054` (2) | `gray-700` `#4A5567` | same stop, Untitled UI ramp (ΔE 7.8, visible) |
| `#E4E7EC` (2) | `gray-200` `#F2F5F9` | same stop, Untitled UI ramp (ΔE 4.2) |
| `#12264D` (2) | `cobalt-600` `#122E64` | the pre-alignment cobalt-600 value |
| `#8EABE1` (1) | `cobalt-200` `#8EA8E1` | **transposition typo** of `8EA8E1` |

**Near-identical drift** — ΔE ≤ 2.1, visually indistinguishable:

`#9AA5B4` ×14 → `gray-500`; `#F2F3F5` ×2 → `gray-200`; `#EFF5FF` → `blue-50`;
`#DDE1E8` → `gray-300`; `#E8F0FE` ×6 → `cobalt-50`; `#EEF0F4` ×2 → `gray-200`.

For the last two, arithmetic nearest was `indigo-50`, but that was overridden:
a nav hover state and a neutral app-circle belong on cobalt and gray, not on a
data-viz accent hue. **Nearest-by-distance is the wrong tiebreak when the
semantic role is clear.**

**Ultramarine retired.** `--color-ultramarine-100: #0CDCF8` and
`--color-ultramarine-500: #000087` were a token family with no ramp behind it
and zero consumers. Repointed at `cobalt-100` / `cobalt-500` per direction; the
names survive only so a stray reference still resolves.

**Bug found while verifying:** `templates/{homepage,shell,library}.html` linked
`../tokens.css`, which resolves to the repo root — but the file is at
`tokens/tokens.css`. The stylesheet had been 404ing, so every `var(--color-*)`
in those templates silently fell back to nothing. Fixed to
`../tokens/tokens.css`; verified in-browser that `--color-gray-100`,
`--color-gray-800` and `--color-cobalt-500` now resolve.

*Caught in review:* the global hex replace also rewrote a historical note so it
read "was stale #122E64" instead of `#12264D`. Restored. Global find-replace
across a file that documents its own old values will corrupt those notes.

---

## 2026-09-09 — Charlie superagent orb: radial gradient removed

**Changed:** `brand/landing-page/index.html`, `Charlie animate graphic`.

The orb was a `radialGradient`, which the gradient-direction rule forbids
outright ("never radial, never reversed"). Converted to a `linearGradient` with
the vector `x1=0 y1=0 x2=1 y2=1` — the SVG equivalent of CSS `135deg` — and the
canonical AI gradient's three stops (`10% purple-500, 50% purple-400,
100% purple-600`). It had been a 2-stop gradient missing purple-500 entirely.

**A file every earlier sweep missed.** The standalone `Charlie animate graphic`
at the repo root has **no file extension**, so every `grep --include="*.html"`
skipped it. It still held the original off-ramp `#8b7ff0` / `#4f3fd6` and its
own radial gradient long after the same values had been fixed in
`index.html`. Now matching.

*Lesson:* extension-scoped greps silently skip extensionless files. When an
audit needs to be complete, search by content or walk the directory instead of
filtering on `*.ext`.

Both copies of the orbiting-sparkle animation called `requestAnimationFrame`
unconditionally. Both now honour `prefers-reduced-motion: reduce` per
`brand/glass-ui-style.md` § 2, parking the sparkle at its start angle instead of
orbiting. Flagging that as a behaviour change rather than a pure fix — revert if
the motion is wanted unconditionally.

Verified in-browser: `linearGradient`, stops `10% #7A5AF8 / 50% #9B8AFB /
100% #6938EF`, and zero `radialGradient` anywhere in the rendered page.

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

1. ~~Series assignment conflicts with the accessibility re-step.~~
   **Resolved:** the brand reference wins. These are graphic-design colors,
   held to no accessibility standard. The six-family mapping at the 500 stop
   stands and the accessibility rules were removed — see the entry below.
2. **Angle/stop-position variants.** A "Folio AI Gradient" from a different
   Figma frame uses `-18.86deg` at `33.1% / 62.1% / 98.4%`
   (`components/AddonTopNav.jsx`, `docs/product/cube-addon-design-spec.md`), and
   `templates/homepage.html` uses `-19deg` at `33/62/98` plus one 2-stop variant
   that drops purple-400 entirely. Colors are now right in all of them; the
   angle and stop positions still differ from the canonical `135deg 10/50/100`,
   which the gradient-direction rule arguably forbids. Normalising changes how
   the add-on AI button and homepage render, so it needs a deliberate call.
3. ~~Stale Folio hexes in `templates/usage.html` and `templates/homepage.html`.~~
   **Resolved 2026-09-09** — see the entry below.

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
`docs/foundation/BRAND-FOUNDATION.md`, `docs/foundation/CHART-RULES.md` and `brand/glass-ui-style.md` were
removed rather than left as dormant constraints.

Also removed in that revert: the ">5 series" cap, the 5-slice pie limit, and the
"every prefix validates" nesting requirement. The rules are back to 6 series,
max 6 pie slices, and ">6 → Other" in `--color-gray-500`.

`brand/glass-ui-style.md` keeps its own three-series guidance (slots 1 / 4 / 6) on
straightforward visual grounds: teal and cyan are adjacent on the wheel and a
glass panel's `saturate()` pushes them closer, so slot 2 is skipped there.

---

## 2026-09-09 — `archive/cube-brand-design-system/` archived as legacy

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
that exists nowhere else, so it was extracted first to **`docs/foundation/CHART-RULES.md`**
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
material, `archive/MARKETING-DESIGN-SYSTEM.md`'s dependency on the archived README,
and the fact that `npm run style-guide:sync` currently copies `brand/glass-ui-style.md`
into an archived package.

---

## 2026-09-09 — Icon rules: `fa-solid` default confirmed, Lucide card replaced

**Changed:** `docs/foundation/BRAND-FOUNDATION.md` § Icons, `CLAUDE.md` § 7,
`archive/cube-brand-design-system/preview/icons-system.html`.

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
instead of relying on a CDN kit (`archive/cube-brand-design-system/vendor/fontawesome/`
is the reference layout).

---

## 2026-09-08 — Chart series order corrected to the dataviz family

**Changed:** `docs/foundation/BRAND-FOUNDATION.md` § "Chart series order".

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
  `archive/cube-brand-design-system/colors_and_type.css`. Grepping `#12264D` shows those
  six hexes are Cube Software's brand and gradient stops (New Blue, the greens,
  Gray 500) — they look like brand colors mistakenly promoted into a chart rule.

This closed the "unresolved conflict" `brand/glass-ui-style.md` § 4 had carried on
record.

---

## 2026-09-08 — Glass three-series set is slots 1 / 4 / 6

**Changed:** `brand/glass-ui-style.md` § 4. Was slots 1 / 2 / 4 (teal, cyan, indigo).

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
  `archive/cube-brand-design-system/README.md` § "Charts & data display".
- § 1.6's four board themes already lived in fuller detail (7 slots, mental
  models) in `docs/product/boards_color_theme_project_summary.md` → not duplicated.
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

**Changed:** `archive/cube-brand-design-system/README.md` § "Variance". Was green
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

**Changed:** `docs/foundation/BRAND-FOUNDATION.md` § "Chart data-point display" gained a
scoped exemption; `brand/glass-ui-style.md` § 4 documents the glass case.

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

**Changed:** `archive/cube-brand-design-system/colors_and_type.css` and its dependents.

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
- `docs/process/COMPONENT-DOC-TEMPLATE.md` said `Card radius | radius-xl 12px`, a
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

**Changed:** `brand/glass-ui-style.md` § 4. Line weight was `2.5–3px`; the new value
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
