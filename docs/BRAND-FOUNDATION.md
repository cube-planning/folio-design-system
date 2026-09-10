# Cube Brand Foundation — Shared by Every Design Persona

> This is the single source of truth for facts that are true regardless of which
> agent/persona is working (Platform UI/UX, Marketing/Graphic Design, or any
> future persona). If a rule is specific to how one persona's components or
> page patterns *use* these facts, it does not belong here — it belongs in that
> persona's own rules (Folio's semantic token map, Cube Software's page recipes).
>
> **Status: FINAL.** All facts below are resolved. Anything that later turns
> out to conflict with this file is a bug in a persona's own rules or in an
> unsynced asset, not a reason to override this file without updating it here
> first.

---

## Confirmed facts

### Brand name
**Cube Software.** Never "Cube AI" as the company/brand name. "Cube AI" may
still appear as an in-product feature name (e.g. the "Cube AI Analyst" nav
item, "Cube AI assistant" trigger).

### Typography
**DM Sans is the font.** No second typeface for any deliverable, in any
persona. The shared type scale (Display 1–4, Title 1–3, Body, Caption 1–2 —
sizes, line heights, letter spacing, weights) is documented in `CLAUDE.md`
section 4 — that scale applies here too, not just to Folio.

### Icons
**Font Awesome. Never Lucide, never mix icon sets.** This applies to **both
personas** — product UI and marketing/graphic design — and to every surface:
components, templates, specimen cards, and generated graphics.

**`fa-solid` is the default style.** Use `fa-regular` (or `fa-light`) only
where the design specifies it. Note that the library choice and the weight
choice are two separate decisions: an icon needs a style class *and* a name
class (`fa-solid fa-house`), and the same icon exists in solid / regular /
light / thin / duotone off one glyph slot. "Use Font Awesome" does not by
itself settle the weight.

Documented weight exceptions:

| Case | Style |
|---|---|
| **AI sparkle** | `fa-solid fa-sparkles` — solid. Verified consistent across `Banner`, `Toast`, `AnalyzePanel`, `BuildPanel`, `AddonTopNav`, `PortalSideBarNav` and `docs/cube-addon-design-spec.md` |
| **Icon-only `Button`** | `fa-regular` at 14px (`large`) / 12px (`small`), per `CLAUDE.md` § 6 |
| Everything else | `fa-solid` |

> **Corrected 2026-09-09.** This section previously read "Font Awesome,
> **Regular weight only** (`fa-regular`) … never fall back to `fa-solid` /
> `fa-light` / `fa-duotone` as a default," which was wrong on the weight — and
> the bug was in *this* file, not in the persona rules. `CLAUDE.md` § 7 had the
> correct default (`fa-solid`) all along, and the codebase agrees: 92 `fa-solid`
> usages across 37 components were compliant, not violations. Per this file's
> own instruction, the fix was to update the Foundation rather than to "correct"
> the persona rule against it. The library rule (Font Awesome, never Lucide) was
> always right and is unchanged.

**Verify every icon name locally before using it.** Font Awesome Pro 7.3.1 is
vendored at `fontawesome-pro-7.3.1-web/`, and its `metadata/icons.json` is the
authoritative list. Check that the name exists *and* that the style you need
(`solid` by default) is among its styles:

```bash
python3 -c "import json;d=json.load(open('fontawesome-pro-7.3.1-web/metadata/icons.json'));n='calendar-days';s='solid';print(n in d and s in d[n]['styles'])"
```

Never guess a name from memory. If the icon genuinely isn't in the vendored
package, don't substitute a different set — ask for the exact name.

For any package that ships standalone (uploaded as its own skill, so it cannot
read repo-root files), vendor the stylesheet and webfonts alongside it rather
than relying on a CDN kit. `Cube BRAND Design System/vendor/fontawesome/` is
the reference layout — that package is archived, but the layout it uses is the
one to copy.

> **Fixed 2026-09-09.** `Cube BRAND Design System/preview/icons-system.html`
> — the card that *documents* the icon system — used to load Lucide from a
> `unpkg.com` CDN and advertise "Lucide 1.5px outline" as its subtitle, so it
> taught the wrong library and pulled a third-party script at render time. All
> 16 icons were remapped to verified `fa-solid` names served from the vendored
> package; the card now has no external script tags. There are no remaining
> non-Font-Awesome icon sets anywhere in the repo.

### AI accent color
**Purple is reserved for AI-related moments only** — never decorative, never a
generic accent, never primary-adjacent. **Resolved:** wherever AI-purple is a
fill, use the AI gradient (below), not a flat solid purple — no single flat
hex is the "AI purple" anymore, the gradient is. Folio's old `purple-600
#6938EF` and Cube Software's `Deep Purple #5547A5` are both retired as *the*
AI-purple reference; neither persona's components/assets should point to
either as "the" AI color going forward.

The one exception is technical, not a design choice: CSS `box-shadow` (used
by the AI glow/ring effects below) can't render a gradient, only a solid
color. For that narrow case, use **`#7A5AF8`** (Folio's `purple-500` — the
first/anchor stop of the AI gradient itself, so it stays visually tied to the
gradient rather than reintroducing either retired hex).

### AI gradient
**`--color-gradient-ai` only**, in both design systems, and this is now the
default way to render AI-purple anywhere a fill is used (text, surfaces, hero
elements) — not just an option. Folio's existing
`linear-gradient(135deg, #7A5AF8 10%, #9B8AFB 50%, #6938EF 100%)`. Cube
Software drops its own `--gradient-ai-signal` and `--gradient-midnight-ai` in
favor of this one.

### AI glow
A soft, diffuse ambient glow (not a hard ring, not a gradient fill) is a
legitimate way to signal "AI" without leaning on the AI gradient every time —
useful for adding visual pop/color in moderation. Reference: a recommendation
card and an "Ask Cube..." input, both with a soft purple/lavender glow
bleeding outward from the surface.

This is distinct from the two AI-ring tokens that already exist —
Folio's `--focus-ring-ai` (hard 4px ring, focus state only) and Cube
Software's `--shadow-ring-ai` (1px ring + 24px shadow) — neither is soft/
diffuse enough to match the reference. Needs a new token (something like
`--glow-ai`), not a reuse of either existing ring. Both existing ring tokens
currently use rgba values keyed to the *retired* purple hexes
(`rgba(122, 90, 248, ...)` is close to `#7A5AF8` already for Folio; Cube
Software's `rgba(85, 71, 165, ...)` is keyed to the now-retired `#5547A5` and
should be re-keyed to `#7A5AF8` too) — see "AI accent color" above.

**Usage split**: both personas may use it, but weight differs.
- **Folio (product)**: sparingly, only on real AI entry points — the AI
  prompt/ask bar, AI recommendation cards. Not a general-purpose decoration.
- **Cube Software (marketing/branding)**: more liberally — hero sections,
  demo screenshots, promotional cards, anywhere the brand wants to signal
  "AI" visually.

Purple is still the only color this applies to, per the AI accent color rule
above — the glow doesn't loosen that.

### Gradient direction
Gradients run in one consistent direction, never radial, never reversed.
Framed two ways across the two personas so far (Folio: "cool → warm";
Cube Software: "dark → light, horizontal left→right / vertical top→bottom") —
functionally the same rule, worth stating once, consistently, here rather than
twice with different wording.

### Chart series order
Per the brand color reference, each accent family maps to one series, all at the
`500` stop. Same order, both personas:

| Slot | Ramp stop | Hex |
|---|---|---|
| `--color-dataviz-1` | `teal-500` | `#14B8A6` |
| `--color-dataviz-2` | `cyan-500` | `#06B6D4` |
| `--color-dataviz-3` | `emerald-500` | `#10B981` |
| `--color-dataviz-4` | `indigo-500` | `#6366F1` |
| `--color-dataviz-5` | `fuchsia-500` | `#D946EF` |
| `--color-dataviz-6` | `orange-500` | `#F97316` |

Assign in fixed slot order, never cycled. Slots are `var()` references into the
hue ramps in `tokens/tokens.css`, so a series value can't drift off the ramp.

Beyond 6 series, group the tail into "Other" using `--color-gray-500`.

**These are graphic-design colors.** They are not held to an accessibility
contrast or colorblind-separation standard, and no such rule is defined for
them.

Supersedes the navy/green sequence this section once declared FINAL.

### Chart data-point display — no value is hover-only
**Every plotted value must be readable without interaction.** Tooltips,
crosshairs and hover states are an enhancement layer, never the only path to a
number.

This is a persona rule, not a stylistic one. It is keyed to what all four
personas in `docs/cube-personas.md` share rather than to any one of them:

- "Difficulty communicating insights" / "communicating financial insights to
  non-finance stakeholders" is a listed pain point for **every** persona —
  Max, Ava, Tobias and Chris.
- Every one of them moves Cube output into a medium where hover does not
  exist: board and exec decks (Max, Ava, Tobias), PowerPoint (all four list it
  under Technology), PDFs, screenshots pasted into Slack and email. The
  Reporter segments (Q1/Q3) are explicitly described as wanting "to use Cube
  outputs in other media (slide decks, etc.)."
- Chris, the non-finance budget owner, is the floor case: a read-only consumer
  of someone else's chart who will not go hunting for a number.

A value that only appears on hover is a value that does not survive the
export. That makes "labelled by default" a persona requirement, not a
preference to be traded away for a cleaner-looking chart.

**How to satisfy it without flooding the chart.** Density decides the
mechanism, not whether the rule applies:

| Chart density | Requirement |
|---|---|
| ≤ 12 marks (bar, column, pie/donut, short line/trend) | Direct-label **every** mark — value at the bar tip, on the column cap, at the line end |
| > 12 points per series (dense trends, time series) | Direct-label the endpoints, the min, the max, and the series the story is about; keep clean y-axis ticks; **and** ship a table/value view alongside, so every remaining value is still reachable without hover |
| Single headline number | Not a chart — use a stat tile / hero number |

Labels wear text tokens (primary/secondary/muted ink), never the series
color — the mark beside them already carries identity.

**Scoped exemption — decorative graphics.** A chart that is *illustration*
rather than *reporting* omits the per-point numbers entirely. Hero images,
section illustrations, deck covers, glass marketing panels: the trend shape and
the color relationships are the whole payload, the y-axis carries magnitude,
and a value beside every dot competes with the line it belongs to. The
`dataviz` skill's own non-negotiable agrees — "direct labels work *because*
they are sparing."

The boundary is **who reads it and for what**, not where it sits:

| Case | Treatment |
|---|---|
| Reader is there for the number — dashboards, reports, board packs, anything a persona reads figures off | Labelling rule above applies in full |
| Chart stands in for "we do finance analytics" — marketing, hero, decorative | Omit per-point numbers; keep the legend and clean axis ticks |

If you can't tell which case you're in, you're in the first one. A decorative
graphic that starts getting used as a reference for real figures has become a
product chart and needs the labels.

Full per-mark detail: `docs/CHART-RULES.md`. Reference implementation of the
decorative treatment: `templates/chart-rules-mock/`. Glass-specific
constraints: `glass-ui-style.md` § 4.

> **Reconciling with the `dataviz` skill.** That skill's non-negotiables say
> "selective direct labels (never a number on every point)," aimed at dense
> series where a number per dot becomes noise. The table above is the
> reconciliation, not an override: at ≤ 12 marks "every mark" and "selective"
> are the same instruction, and above 12 we follow the skill's selective
> labelling *plus* a table view so nothing is hover-gated. If a case ever
> genuinely forces a choice between the two, this file wins and the exception
> gets recorded here — same handling as the glass/series-order conflict noted
> in `glass-ui-style.md`.

### Spacing and radius — "high-radius / pill" style
**4px base grid** for all spacing (4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64...).
**Radius scale**: pill (`9999px`) for buttons, chips, badges, toggles, avatars;
`8px` for inputs, selects, textareas; `16px` for cards, large containers,
modals, drawers.

One scale, one set of names, both personas:

| Token | Value | Use |
|---|---|---|
| `--radius-none` | 0 | — |
| `--radius-xs` | 2px | Brand-system only (icon corners); Folio has no 2px stop |
| `--radius-sm` | 4px | Chips, small inline surfaces |
| `--radius-md` | 6px | — |
| `--radius-lg` | 8px | Inputs, selects, textareas |
| `--radius-xl` | 12px | Nested tiles inside a card — **not** card containers |
| `--radius-2xl` | 16px | Cards, large containers, modals, drawers |
| `--radius-full` | 9999px | Buttons, chips, badges, toggles, avatars |

**Always state the px value alongside the token name** in a cross-persona
rule. Card containers are 16px — never 12px; see `components/Card.md`
("never `rounded-xl`").

> **Realigned 2026-09-08.** This section used to claim the scale was "already
> consistent between Folio and Cube Software's `colors_and_type.css` — no
> conflict." The *values* agreed; the *names* did not. The brand scale was
> shifted one step (`md` 8, `lg` 12, `xl` 16, `2xl` 24), so a 16px card was
> `--radius-xl` there and `--radius-2xl` in Folio. The brand scale has now been
> renamed to match Folio name-for-name; `--radius-pill` survives as a
> deprecated alias of `--radius-full`. Details in `docs/DESIGN-DECISIONS.md`.
>
> **Local only — not yet pushed.** The brand system is its own design project
> (`_ds_manifest.json` namespace `CubeAIDesignSystem_484d47`) and is **not**
> covered by `npm run design-sync`, which is Folio-only. Propagating this needs
> a `DesignSync get_file` → patch → upload pass against that project, and the
> local/remote copies have drifted before.
>
> **Still open:** the 24 `preview/*.html` specimen cards hardcode radii of
> `10px`, `7px`, `3px` and `2px` — values on neither scale, before or after.
> Only `preview/spacing-radii.html` was converted to read from the tokens.
>
> **Not yet realigned — scope, verified 2026-09-08.** Smaller than it looks.
> **Nothing in `Cube BRAND Design System/preview/` references the radius tokens
> at all** — all 24 specimen cards hardcode px values — so renaming the tokens
> breaks no rendered card. The real consumers are:
>
> | File | What needs doing |
> |---|---|
> | `colors_and_type.css` | The definitions; one internal use (`.cube-code` → `--radius-xs`) |
> | `_adherence.oxlintrc.json` | Two lists of allowed radius token names |
> | `_ds_manifest.json` | Generated token inventory — regenerated, not hand-edited |
> | `README.md` | Two prose refs reading "var(--radius-xl) (16px)" |
> | `preview/spacing-radii.html` | The card that *documents* the scale — its `@dsCard` subtitle and six swatches assert the brand-shifted scale as truth |
> | `.design-sync/conventions.md` | Documents the brand-shifted scale as if it were the only one |
>
> `npm run design-sync` does **not** cover this folder — see
> `.design-sync/config.json`, which is Folio-only (`pkg: folio-design-system`).
> The brand system is its own design project (`_ds_manifest.json` namespace
> `CubeAIDesignSystem_484d47`, `source: "spa"`, 0 components, 24 cards), so
> propagating a realignment remotely is a `DesignSync get_file` → patch →
> upload pass against *that* project.
>
> Separate issue found while scoping: the preview cards hardcode radii of
> `10px`, `7px`, `3px` and `2px`, which sit on **neither** scale.

This is the **"high-radius / pill" style**, not to be confused with the old
legacy Cube Design System (the separate, superseded Figma file referenced in
`CLAUDE.md` section 9), which used small ~4px radius on both buttons and
cards. Don't reintroduce that sharp-corner look on either persona's work.

### Voice and tone
Confident, technical, direct, grounded, practitioner-first, provocative — the
seasoned CFO who is also fluent in AI. Not the `cube-sa-brain:cube-brand`
plugin's version (approachable, compelling, futuristic, bold, brave, energetic,
human, leader, thoughtful); that plugin is out of date on this point, same as it
was on typography.

> **Source moved 2026-09-09.** This section used to say "follow the Cube BRAND
> Design System's voice (its own `README.md`)". That package is now **archived**
> as a legacy artifact of the old branding system, so it can no longer be cited
> as authoritative. The pillars above are restated here directly. The fuller
> voice material still sitting in that archived README (tone-by-audience,
> signature phrases, always/never-say tables, sample copy) has **not** been
> re-homed — see § "Marketing/brand source" below.

### Primitive color palette
**One shared palette: Folio's.** Cube Software (marketing/branding) uses
Folio's full primitive ramp from `tokens/tokens.css` (cobalt, gray, red,
green, purple, amber, plus the accent/data-viz families) as-is — no separate
red/amber/purple values of its own. Folio's ramp is the master because it's
the more complete structure (full 10-stop 25–900 ramps vs. Cube Software's
narrower set), matching the precedent already set for typography, icons, and
voice in this doc. `Cube BRAND Design System/colors_and_type.css`'s
independently-defined red/amber/purple values are retired in favor of
Folio's.

### Token naming grammar
Three layers, terminology per Gordashko (cited in Kutschmann, "Design Token-Based UI
Architecture," Martin Fowler, 2024) — not our own invented terms, this is established
industry vocabulary:

| Layer | What it is | Example |
|---|---|---|
| **Option tokens** | Raw palette/scale values — what's *available*, not all necessarily used | `--color-cobalt-600`, `--space-4` |
| **Decision tokens** | Semantic tokens that reference option tokens and encode *when/why* to use them | `color-bg-fill-primary-hover` → `{cobalt-600}` |
| **Component tokens** | Mapping a decision token onto a specific UI part | `button.primary.background` → `{color-bg-fill-primary-hover}` |

Decision-token naming grammar: `color-{category}-[{subtype}-]{priority}-{state}`
- `category`: `bg` \| `text` \| `border` \| `icon`
- `subtype` (optional, category-dependent): e.g. `surface` (large tinted area) vs. `fill`
  (solid interactive fill)
- `priority`: `primary` \| `secondary` \| `tertiary` — visual emphasis, not a color name
- `state`: `default` \| `hover` \| `active` \| `disabled`

Status colors (success/warning/error/AI) don't fit the `primary/secondary/tertiary` axis —
they get a parallel branch, e.g. `color-bg-status-warning-hover`, not
`color-bg-primary-hover`.

This grammar is documentation-only for now — no component code has been migrated to it.
The next step (not yet done) is piloting it against the real gaps the token-usage audit
found (Banner's per-color contrast-driven state stops, the gray text hierarchy, Table's
status column) before touching any `.jsx` files, exactly as Kutschmann's "1 layer is still
useful, but offers the least guidance; add layers once there's clear need" guidance
suggests — we're not obligated to build all three layers at once.

### Token usage flow — a worked example
The grammar above is about *naming* one token. This is about how one primitive actually
*fans out* in practice: a single global token can feed several semantic tokens, and each
semantic token can feed several components. Worked using the AI-purple case we already
resolved:

```
GLOBAL TOKEN                SEMANTIC TOKENS              COMPONENT TOKENS              UI
--color-purple-500    ┬──  color-icon-ai          ┬──  IconBadge.ai-sparkle      →  sparkle icon in AI badges
   (#7A5AF8)           │                            └──  PortalSideBarNav.ai-icon →  "Cube AI Analyst" nav icon
                        │
                        ├──  color-glow-ai          ┬──  RecommendationCard.glow  →  AI card ambient glow
                        │                            └──  AiPromptBar.glow        →  "Ask Cube..." input glow
                        │
                        └──  color-ring-ai-focus    ──  AiPromptBar.focus-ring    →  focus ring on send button
```

Same global value, three different semantic roles, each role reused across more than
one component. This is also why the AI-purple hex decision mattered more than it looked
like at first — get the global token wrong and every branch below it inherits the mistake.

---

### Marketing/brand source — currently undefined

**Open question, needs a human decision.** `Cube BRAND Design System/` was
archived on 2026-09-09 as a legacy artifact of the old branding system (it
carries the retired "Cube AI" name, a superseded radius scale, retired colors,
and its own retired Lucide/Source Sans 3 mandates). Nothing has replaced it as
the marketing/brand persona's home.

Rules that were living there and are now orphaned:

| Content | Status |
|---|---|
| Chart rules | ✅ Rescued to `docs/CHART-RULES.md` |
| Voice pillars | ✅ Restated in § "Voice and tone" above |
| Tone by audience, signature phrases, always/never-say, sample copy | ⬜ Still only in the archived README |
| Marketing website component & page-pattern rules | ⬜ `docs/MARKETING-DESIGN-SYSTEM.md` derives from the archived README |
| The 11 components and 7 marketing templates in the remote design project | ⬜ Never mirrored locally; status unknown |

Consequences to resolve when a new source is chosen:
- `npm run style-guide:sync` copies `glass-ui-style.md` into the **archived**
  package, so the "marketing graphics always use the style guide" guarantee
  currently points into an archive.
- The remote "Demo Cube BRAND Design System" project holds *older* values than
  the archived local copy; it should not be treated as a recovery source.

---

## How each persona should use this file

- Read this file before applying persona-specific rules, not after — if a
  persona's own rules seem to contradict something here, that's a bug in the
  persona's rules, not a reason to ignore this file.
- If a persona's learning log (`LEARNING.md`) surfaces a fact that would also
  be true for the other persona, promote it here instead of letting it settle
  only into that persona's own prompt library. That's what keeps two personas
  from drifting the way Folio and Cube Software's font/icon/brand-name rules
  already did once.
