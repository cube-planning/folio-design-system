# Cube Software Design System

> **The Agentic Finance Layer.** Decision-ready data, everywhere you work.

This design system codifies Cube Software's visual, verbal, and interaction language so any interface — production code, prototypes, slide decks, marketing sites — can be made on-brand from day one.

## Sources

- `uploads/brand_guidelines_2026.pdf` — Brand Guidelines 2026 v1.0 (Q2 2026, Confidential). Also archived at `assets/brand_guidelines_2026.pdf`.
- `uploads/Gradient Logo.png`, `Logo Light (3).png`, `Logo Dark (2).png`, `Gradient Logo on white (white background).png` — primary, reversed, dark, and gradient-on-white logo lockups.
- No codebase, Figma file, or product screenshots were provided. UI kits have not been built — if you have product access, link a codebase or Figma file and ask for UI kits to be generated.

## Company / Product Context

**Cube Software** (the brand name reverted from "Cube AI"; never use "Cube AI" as the brand name — see Language Rules) is **the Agentic Finance Layer** built for the AI era. It unifies financial data from every source system into a centralized command center for FP&A — planning, reporting, analysis — and exposes autonomous finance agents on top.

- **Founded by** Christina Ross, a three-time CFO.
- **Mission:** Make every organization's financial data decision-ready, wherever work happens.
- **Key differentiators:** patented bi-directional connectivity, Trace to Truth architecture (every AI insight maps back to the GL), FP&Agents suite (The Business Partner, The Planner, The Analyst, The Data Manager).

### Value Pillars
1. **Financial Integrity** — consistent, traceable, accurate numbers across every report and tool.
2. **Strategic Agility** — autonomous FP&Agents eliminate manual reconciliation.
3. **AI Trustworthiness** — Trace to Truth makes AI-driven insights safe for high-stakes decisions.

### Product Surfaces (inferred, unverified — no codebase provided)
- Marketing site
- FP&A product UI (dashboards, reports, planning, variance analysis)
- FP&Agents — agent interfaces / chat-like flows
- Brand / sales collateral (decks, PDFs)

---

## Index

Root files:
- `README.md` — this file.
- `colors_and_type.css` — all design tokens (color, type, spacing, radii, shadow, motion, gradients) as CSS custom properties.
- `SKILL.md` — Agent Skills manifest; lets Claude invoke this system on demand.

Folders:
- `assets/` — logos (gradient, light, dark, gradient-on-white) + archived PDF brand guidelines.
- `fonts/` — (empty) Google Fonts are loaded via `@import` in `colors_and_type.css`; no local font files are required.
- `preview/` — HTML "specimen cards" that populate the Design System tab (24 cards across Brand, Colors, Type, Spacing, Components).
- `ui_kits/` — not built. No product source was provided.
- `slides/` — not built. No deck templates were provided.
- `SKILL.md` — Agent Skills manifest for using this system as a portable skill in Claude Code.

---

## CONTENT FUNDAMENTALS

Cube Software's voice is **confident, technical, direct** — the seasoned CFO who is also fluent in AI.

### Voice Pillars
- **Confident.** No hedging. "Cube Software does X," not "Cube Software helps you do X" or "enables teams to." Lead with outcomes.
- **Grounded.** Every claim ties to a real capability or customer outcome. No vaporware.
- **Practitioner-first.** Speak the language of finance: close cycles, variance analysis, board decks, GL reconciliation. Assume craft expertise.
- **Provocative (when warranted).** Challenge the status quo with substance. "Chatbots are not enough." "Most AI for finance is a checkbox."

### Tone by Audience
| Audience | Framing term | Focus |
|---|---|---|
| CFOs & CEOs | **Decision-ready** | certainty, risk mitigation, high-stakes confidence |
| FP&A practitioners | **Analysis-ready** | speed, accuracy, tool flexibility |
| IT & Data leaders | **AI-ready** | governance, security, interoperability |

### Casing, Person, Style
- **Casing:** Sentence case for UI labels and headings. Title Case reserved for product / feature names (e.g. *The Business Partner*, *Trace to Truth*, *Agentic Finance Layer*, *FP&Agents*).
- **Person:** Second-person ("you") when addressing the reader; brand speaks in first-person plural ("we") sparingly in marketing. Avoid "it helps you" filler.
- **Oxford comma:** yes.
- **Numbers:** spell out one–nine; digits from 10+. Currency and financial figures always in mono: `$1,245,892.00`.
- **Emoji:** not used. Ever. The brand earns authority through restraint.
- **Em dashes:** allowed, but avoid the AI-writing tic of overusing them or the "it's not X — it's Y" construction.

### Signature Phrases (reuse verbatim)
- "AI can be 80% right. In finance, that's 100% wrong."
- "We don't compete with AI. We make it trustworthy."
- "Trace to Truth." Every number maps to the transaction.
- "The layer, not another tool."
- "From Books to Boardroom in 30 Minutes."
- "Your spreadsheets stay. Everything underneath gets smarter."
- "Decision-ready data at every AI endpoint."

### Always Say / Never Say
| Always | Never |
|---|---|
| Cube Software | Cube AI |
| The Agentic Finance Layer | The Intelligent Finance Layer |
| Agentic Finance Layer (as a category) | FP&A tool / FP&A software |
| Patented bi-directional connectivity | Patent-pending |
| FP&Agents | AI chatbot / AI assistant |
| Finance-grade AI | AI-powered (generic) |
| Thousands of finance professionals | 500+ finance teams / 500+ customers |
| The Business Partner (agent) | The Strategist |
| Trace to Truth | Black box / best guess |

### Never
- Pad with filler phrases or hollow language.
- Use dismissive labels for personas ("bean counters", "data janitors", "data plumbers").
- Default to generic SaaS copy. Every sentence should feel specific to Cube Software.
- Break voice across channels. The same tone holds in email, social, proposal, memo.

### FP&Agent Suite — official names and scope
- **The Business Partner** — presentation layer, board decks, investor narratives, cross-functional collaboration.
- **The Planner** — planning cycle, budgets, forecasts, rolling plans, variance tracking.
- **The Analyst** — ad-hoc analysis, trend detection, anomaly flagging, report generation.
- **The Data Manager** — data-layer governance, integrations, reconciliation, data quality.

### Sample Copy (as reference)
- Hero, marketing: *"Cube Software. The Agentic Finance Layer. Decision-ready data, everywhere you work."*
- Product empty state: *"No variances flagged this cycle. The Analyst will surface anomalies as they appear."*
- CTA block: *"From Books to Boardroom in 30 minutes. See a live demo."*
- Error / warning: *"Source ledger disconnected. Reconciliation paused — last trace 14 minutes ago."*

---

## ICONOGRAPHY

### Principles
Icons are **utility-first, never decorative**. They should feel precise and consistent with the glass-panel design language.

### Style
- **Stroke:** outlined, 1.5px at 24px. Scale proportionally — 1px at 16–20px, 2px at 32px+. Never hairline at 24px.
- **Shape:** rounded corners with 2px radius, consistent 24×24 grid with 2px padding.
- **Fill:** outline for UI and body content; filled variants for active/selected navigation and emphasis.
- **Never mix outlined and filled icons in the same context.**
- **Never apply gradients or shadows to individual icons.**
- Always optically align inside the bounding box; never stretch, rotate, or distort.
- Pair icons with text labels in navigation — never use icons as the sole indicator of meaning.

### Sizing
- **20px** — compact / table.
- **24px** — standard UI (default).
- **32px** — feature callout.
- **48px** — marketing hero.
- Always size in 4px increments.

### Color Mapping
| Meaning | Token | Hex |
|---|---|---|
| Default / inactive | `--gray-600` | `#677489` |
| Active / selected | `--new-blue` | `#12264D` |
| AI / intelligence | `--deep-purple` | `#5547A5` |
| Success / positive | `--green-og` | `#219E66` |
| Warning / attention | `--burnt-amber` | `#D4802A` |
| Destructive / error | `--error` | `#E53E3E` (outside core palette) |
| On dark backgrounds | white or `--light-green` | `#70CF98` |

### Library
**Font Awesome** is the required library, matching Folio (the product design system) so marketing and product share one icon set. `fa-regular` is the default style for the outline look this spec calls for; `fa-solid` for filled/active states. **Do not mix icon sets.**

Font Awesome Kit is loaded via CDN:
```html
<script src="https://kit.fontawesome.com/YOUR_KIT_CODE.js" crossorigin="anonymous"></script>
```

Never guess icon names — verify at fontawesome.com/icons before using one.

### Emoji & Unicode
- **Emoji:** never.
- **Unicode icons:** never used as UI icons. The arrow glyphs (`→`, `↗`, `↘`) are acceptable **inside text** for flow/direction — for example in taglines like *"Books → Boardroom"*.

### Logos (in `assets/`)
- `logo-gradient.png` — primary, green-to-white gradient cube on dark backgrounds.
- `logo-light.png` — all-white, for single-color print, embroidery, low-res, photo overlays.
- `logo-dark.png` — solid Navy, for light backgrounds; default for documents / web / print on light.
- `logo-gradient-on-white.png` — gradient cube with solid wordmark, approved for light marketing surfaces.

Clear space: height of the "c" in "cube" on every side. Minimum width: **80px** digital, **20mm** print. Never stretch, rotate, recolor, add effects, or place on low-contrast backgrounds.

---

## MARKETING WEBSITE — COMPONENTS & PAGE PATTERNS

Grounded from the marketing site's own Figma file (Landing Page Layout) and Untitled UI structural
references, cross-checked against the Non-negotiables above (SKILL.md). Where the Figma source
conflicts with a Non-negotiable, **the rule wins** — the conflict is listed as a known deviation
to fix, not something to replicate.

### Component catalog (status)

| Section type | Status |
|---|---|
| Header navigation | ✅ Grounded, with deviations noted below |
| Header sections (marketing hero) | ✅ Grounded, with deviations noted below |
| Content | ✅ Grounded — spacing matches this system's tokens exactly |
| Blog sections | ✅ Grounded (card pattern) — post-header/subscribe-card variants not yet pulled |
| Customer Logo Strip | ✅ Grounded (simple pattern, no card structure) |
| Solutions Section (content grid) | ✅ Grounded |
| CTA sections | 🟡 Partially grounded ("Connect to Cube" pattern — see below; not mapped in full detail) |
| Features sections, "The Agentic Finance Layer" | ⚠️ Stale — the prototype's own node references for these no longer resolve in Figma; re-find before grounding, don't reuse the old IDs. Scaffold added under "Scaffolds — not yet filled in" |
| Footers, Metrics, Social proof, Testimonial, Pricing, FAQ, Newsletter CTA, Team, Contact, Careers | ⬜ Scaffold added under "Scaffolds — not yet filled in" — no real reference reviewed yet, values are TBD placeholders |

### Confirmed rules (backed by 2+ independent instances)

These generalize beyond the one example that first surfaced them — each has shown up twice,
independently, so they're rules, not single data points.

**Card rule.** Every card seen so far (Blog Post Card, and each card in the Solutions Section grid)
follows the same structure:
```
Image — 16:9 or similar, var(--radius-2xl) (16px) corners, var(--border-subtle) hairline border
  ↓ var(--space-5) gap
Title — 18px Semibold, var(--fg-heading)
  ↓
Description — 16px Regular, var(--fg-secondary)
  ↓ (optional)
Inline link list — 2-column grid, var(--space-2) gap, 14px Semibold, var(--blue-og)
```
Note: the Figma source used `cobalt-500` (`#173D82`) for the link-list color — that's an exact
match to this system's `--blue-og`, so no substitution judgment call was needed there.

**Section rhythm rule.** Every full-width section seen so far (Solutions Section, Content Section)
uses:
```
Vertical padding: var(--space-24) (96px)
Container: max-width 1280px, var(--space-8) (32px) side padding
Heading block → body content gap: var(--space-16) (64px)
```

### Typography usage (by context — only where 2+ instances agree)

| Context | Size / weight | Color | Evidence |
|---|---|---|---|
| Card title | 18px Semibold | var(--fg-heading) | Blog Post Card + Solutions Section cards |
| Card description | 16px Regular | var(--fg-secondary) | Blog Post Card + Solutions Section cards |
| Card inline link | 14px Semibold | var(--blue-og) | Blog Post Card + Solutions Section cards |

### Observed once — not yet a rule

Single instance each. Don't treat these as "the" size for their apparent role until a second
example confirms them — a hero headline and a CTA-banner headline both being ~48px could be
the same rule, or could be coincidence; one more example of either settles it.

| Element | Size / weight | Where seen |
|---|---|---|
| Hero headline | 48px/58px Bold | Header sections (marketing hero) |
| Section heading | 36px/48px SemiBold | Solutions Section |
| CTA-banner heading | ~48px/60px | "Connect to Cube" section (not fully mapped) |
| CTA-banner secondary text | ~30px | "Connect to Cube" section |
| Eyebrow / section label | 14px Bold, accent color | Solutions Section ("Solutions" label) |

### Header navigation
```
Height 64px · background var(--surface-default) · flex justify-between items-center
Padding: var(--space-12) horizontal / var(--space-4) vertical
Nav link gap: var(--space-8) · 14px · var(--fg-secondary)
Button gap: var(--space-2) · var(--shadow-sm) · var(--radius-full), 32px tall
```

### Header sections (marketing hero)
```
Section padding: var(--space-24)? sides ~120px (wider than the standard scale — verify against a
  second hero example before treating 120px as a rule rather than this one instance)
Split layout: gap var(--space-16) · copy column gap var(--space-5)
Headline: var(--fs-display), var(--fw-extrabold) per brand (Figma used Bold — brand spec wins)
Highlighted phrase: var(--fg-on-dark-accent) (Light Green)
Subhead: var(--fg-on-dark) at reduced emphasis — weight TBD, Figma used a "Light" weight that
  doesn't exist in this system's --fw-* scale (light/regular/medium/semibold/bold/extrabold has no
  "light" either — closest is --fw-regular)
```

### Content Section
```
Section: var(--space-24) vertical padding · var(--space-16) inner gap
Container: var(--space-8) side padding
Two columns: var(--space-16) gap
Heading → supporting text gap: var(--space-5)
```
Spacing here matched this system's scale exactly, token-for-token — no correction needed, just
substitute the named tokens for the raw pixel values pulled from Figma.

### Blog Post Card
```
Card: image:content gap var(--space-4) · content block gap var(--space-5)
Heading/subheading gap: var(--space-3)
Image border: var(--border-subtle), not a raw rgba(0,0,0,0.1) value
Title + icon gap: var(--space-4) · description below
Avatar row gap: var(--space-2)
```
Follows the Card rule above.

### Customer Logo Strip
```
Background: var(--surface-default) (white) · var(--space-10) (40px) vertical padding
Single full-width logo-row image, 60% opacity, no card/grid structure
```
Simplest section pattern seen so far — no title, no card, just a logo row.

### Solutions Section (content grid)
```
Section: follows the Section rhythm rule above (96/32/64px)
Eyebrow label: "Solutions" — 14px Bold, accent color (see Typography usage, observed once)
Heading: 36px/48px SemiBold with one word/phrase highlighted in accent color
Supporting text: 16px Regular, var(--fg-secondary)
Card grid: 3 cards, each following the Card rule above, min-width 320px, wraps responsively
```

### CTA section ("Connect to Cube" pattern)
```
Large display heading (~48px/60px) + secondary text (~30px) — see "Observed once," not fully
  mapped to this system's tokens yet
Pill buttons: var(--radius-full)
Card radius: var(--radius-2xl) (16px)
Accent colors in play: green-og and a light surface tint
```
Pulled at a shallower level of detail than the sections above — the underlying markup was too
large for one pass. Treat this as a starting point, not a complete spec; re-pull for full detail
before building a CTA section from it.

### Header navigation — mega-menu (dropdown)
Structural pattern only (columns, gutters, card padding) — the spacing held up, the icon/font
choices didn't (see deviations below).
```
Container: var(--space-24) side padding · 3–4 equal columns · var(--space-5) gutter
Column top padding: var(--space-6) · label-to-list gap: var(--space-8)
Nav-item card: var(--space-3) padding/gap · var(--radius-lg) (8px) · hover fill var(--surface-muted)
```

### Scaffolds — not yet filled in

The 12 sections below have no real reference reviewed yet. Each has the same skeleton the
grounded sections above use, with every value left as TBD rather than guessed. Fill these in
directly (in Cursor or here) as real decisions get made — check "Confirmed rules" and "Typography
usage" above first before writing a new value, since a lot of this may just reuse what's already
established there rather than needing something new.

#### Features sections
```
Status: ⬜ scaffold only — old node reference is stale, needs a fresh one
Layout: TBD — grid vs list, column count
Spacing: TBD — check Section rhythm rule first
Typography: TBD — check Typography usage table first
Colors: TBD
Card/element rule: TBD — does this reuse the Card rule above, or need its own pattern?
```

#### Footers
```
Status: ⬜ scaffold only
Layout: TBD — column count, column content
Spacing: TBD
Typography: TBD
Colors: TBD
```

#### Metrics sections
```
Status: ⬜ scaffold only
Layout: TBD — stat count, arrangement
Spacing: TBD
Typography: TBD — numeral treatment, label treatment
Colors: TBD
```

#### Social proof sections
```
Status: ⬜ scaffold only
Layout: TBD — logo grid, quote, stat, or combination
Spacing: TBD
Typography: TBD
Colors: TBD
```

#### Testimonial sections
```
Status: ⬜ scaffold only
Layout: TBD — single quote vs carousel vs grid
Spacing: TBD
Typography: TBD — quote size vs attribution size
Colors: TBD
```

#### Pricing sections
```
Status: ⬜ scaffold only
Layout: TBD — tier count, column vs table
Spacing: TBD
Typography: TBD — price emphasis vs feature list
Colors: TBD
Card/element rule: TBD — does this reuse the Card rule above, or need its own pattern?
```

#### FAQ sections
```
Status: ⬜ scaffold only
Layout: TBD — accordion vs static list
Spacing: TBD
Typography: TBD
Colors: TBD
```

#### Newsletter CTA sections
```
Status: ⬜ scaffold only
Layout: TBD
Spacing: TBD — check Section rhythm rule first
Typography: TBD
Colors: TBD
Form treatment: TBD — does this reuse the email-capture pattern from the hero CTA?
```

#### Team sections
```
Status: ⬜ scaffold only
Layout: TBD — grid, count per row
Spacing: TBD
Typography: TBD — name vs title vs bio
Colors: TBD
Card/element rule: TBD — does this reuse the Card rule above, or need its own pattern?
```

#### Contact sections
```
Status: ⬜ scaffold only
Layout: TBD — form vs contact-info layout
Spacing: TBD
Typography: TBD
Colors: TBD
```

#### Careers section
```
Status: ⬜ scaffold only
Layout: TBD — listing format, filters
Spacing: TBD
Typography: TBD
Colors: TBD
```

### Known deviations found in the current Figma / prototype build
These exist in the live `marketing-landing-page/index.html` prototype and the Figma Landing Page
Layout today. Don't copy them — they need to be corrected to match this system:

1. **Hero background gradient is diagonal (139°).** Rule: never radial/diagonal/reversed. Its three
   color stops (`#0A1229`, `#12264D`, `#0A1A39`) are exactly this system's Darkest/New Blue/Navy —
   so the color choice was right, the angle wasn't. Use `--gradient-cool-depth` (the same three
   stops, `linear-gradient(180deg, ...)`) instead.
2. **Decorative glow blob behind the hero copy is radial.** Forbidden outright. Redesign as a thin
   gradient edge accent (`--edge-navy-green` or similar) instead of a soft radial glow.
3. ~~Icons are Font Awesome vs. this system's Lucide mandate.~~ Resolved: this system now mandates
   Font Awesome too, matching Folio (the product design system) — no deviation.
4. ~~Nav links, body copy, and placeholder text use DM Sans vs. this system's Source Sans 3 body
   rule.~~ Resolved: this system now uses DM Sans only, matching Folio — no deviation.
5. **The hero email-capture CTA has an ambient purple glow.** Deep Purple/the AI shadow ring
   (`--shadow-ring-ai`) is reserved for AI moments only, never decorative — verify this specific CTA
   is genuinely AI-related before reusing that treatment; if not, it should be removed.
6. **Green-500 in the (separate) Folio app tokens is `#229E66`; this system's Green OG is
   `#219E66`.** One hex digit apart — worth reconciling to the official value for any marketing-site
   work, even though the app's own token is out of scope here.

### Page recipes (starter — not final)
Page type → section roles, using the vocabulary above. Not yet validated against a real template
for most rows.

| Page type | Section roles (in order) |
|---|---|
| Landing pages | Header navigation → Header sections → Social proof → Features/Content → CTA sections → Footers |
| Case Study / Customer Story | Header navigation → Header sections → Metrics sections → Testimonial sections → Social proof → CTA sections → Footers |
| About pages | Header navigation → Header sections → Content → Team sections → CTA sections → Footers |
| Blog posts | Header navigation → Content → Newsletter CTA sections → Footers |
| Blogs (index) | Header navigation → Header sections → Blog sections → Footers |
| Contact pages | Header navigation → Header sections → Contact sections → Footers |
| FAQ pages | Header navigation → Header sections → FAQ sections → CTA sections → Footers |
| Pricing pages | Header navigation → Header sections → Pricing sections → FAQ sections → CTA sections → Footers |
| Team pages | Header navigation → Header sections → Team sections → CTA sections → Footers |
| Log in / Sign up pages | Header navigation (often minimal) → Content (form) → Footers |
| Legal pages | Header navigation → Content → Footers |
| 404 pages | Header navigation → Content (error state) → Footers |

### Update prompt (reusable)

Use this whenever you have something new to record for a section/page type listed in the
component catalog above — a Figma link, live URL, screenshot, or just a decision you want written
down in plain text.

```
CONTEXT — read this before doing anything:

This project ("Cube Software Design System") is the authoritative brand system for Cube Software, sourced
from the official Brand Guidelines 2026 v1.0 PDF (archived in assets/). README.md documents the
full system — Content Fundamentals, Iconography, and Non-negotiables (see SKILL.md) — and
colors_and_type.css holds every token (color, type, spacing, radii, shadow, gradient, motion) as
CSS custom properties.

This section, "MARKETING WEBSITE — COMPONENTS & PAGE PATTERNS," documents what's been grounded
so far about the marketing site specifically (cubesoftware.com) — real spacing/type/color pulled
from its Figma file and live pages, checked against the rules in this system.

The standing rule: when something pulled from Figma or a live page conflicts with a rule already
documented here (gradient direction, icon library, font usage, color usage, etc.), the rule in
this project wins — the Figma/live source is not automatically trusted, it gets checked first.
Conflicts get logged under "Known deviations found in the current Figma / prototype build," not
silently copied or silently resolved.

The end goal: a self-serve system where anyone can ask for a marketing page in plain language and
get something automatically on-brand, because the rules and reusable section patterns are
documented here, not re-derived per request.

---

TASK — update the marketing section of this design system based on the input I'm about to give you.

Input: [a Figma link / live URL / screenshot, OR a plain-text decision or description — e.g.
  "FAQ sections use a single-column accordion, one open panel at a time" — any of these are valid]
This maps to: [section type from the component catalog above, e.g. "CTA sections"]
on the [page type, e.g. "Landing pages"] page recipe.

Before touching anything, read:
- README.md — especially ICONOGRAPHY and MARKETING WEBSITE — COMPONENTS & PAGE PATTERNS
- SKILL.md — Non-negotiables (this is now the authoritative rule list; the longer prose version that used to live in README.md's "VISUAL FOUNDATIONS" was removed as redundant with it)
- colors_and_type.css
- SKILL.md (Non-negotiables)

Process to follow:
1. If the input is a Figma link or live URL, pull the real spec from it (Figma
   get_design_context/get_metadata for Figma links, browser tools for live URLs) — never estimate
   from a screenshot alone if a live source is available. If the input is a plain-text decision or
   description, treat it as the ground truth directly — write down exactly what was said, don't
   expand it with invented detail it didn't specify (leave anything unspecified as TBD rather than
   filling it in yourself).
2. Check colors_and_type.css FIRST for every value (color, spacing, radius, shadow, gradient,
   font size). Reuse an existing token wherever the pulled value already matches or is close to
   one. Only add a new custom property when there's a real, grounded gap this system's scale
   genuinely doesn't cover.
3. Check every value against the Non-negotiables (SKILL.md) — gradient direction/type, icon
   library (Font Awesome only), font usage (DM Sans only), color usage (Deep Purple = AI
   only). If the reference conflicts with a rule,
   do NOT copy it — add it to "Known deviations found in the current Figma / prototype build"
   instead, and name the compliant token/pattern that should be used in its place.
4. Classify each generalizable pattern you find (a card structure, a spacing rhythm, a typography
   size/context pairing) into one of three tiers — don't skip straight to calling something a
   rule:
   - **Confirmed rule** — this exact pattern already appears elsewhere in "Confirmed rules" or
     "Typography usage," and this reference is a second (or later) independent instance of it.
     Add this as supporting evidence; don't restate the rule as if it's new.
   - **Observed once** — this is the first time this specific pattern/size/context pairing has
     shown up. Add it to "Observed once — not yet a rule," not to "Confirmed rules" or "Typography
     usage," even if it looks like it's probably the right answer.
   - **Promotion** — if this reference is the *second* independent instance of something already
     sitting in "Observed once," move it up into "Confirmed rules" or "Typography usage" and note
     both source instances.
5. Update this section:
   - Component catalog table — flip this section's status to ✅ Grounded
   - Add or correct the spec block for this section
   - "Confirmed rules" / "Typography usage" / "Observed once" — per the classification in step 4
   - Add to "Known deviations" if anything conflicted with a Non-negotiable (SKILL.md) rule
   - Update the Page recipes table if this reference confirms or corrects a guessed section order
6. Don't touch any other section's spec, and don't invent values for anything not shown in this
   reference.

Report back what changed, what's still a gap, and anything that needs a human decision rather
than being resolved silently.
```

---

## CHARTS & DATA DISPLAY

Charts are a graphic-design deliverable in this system (decks, PDFs, one-pagers, hero
graphics, marketing site sections), so their rules live here alongside the component
rules — not only in the product's own spec.

**Provenance note.** Unlike the rules above, this section is *not* grounded in two
independent Figma instances. It is derived from `docs/cube-personas.md` and is promoted
as a shared fact in `docs/BRAND-FOUNDATION.md` § "Chart data-point display". Treat it as
a rule, not as an observation awaiting a second instance — but don't cite Figma for it.

### Chart component rule — no value is hover-only

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

Series order is governed by `docs/BRAND-FOUNDATION.md` § "Chart series order" (the
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
midpoint**, not the status ramp:

| Pole | Token | Hex |
|---|---|---|
| Favorable | `--color-dataviz-6` | `#F97316` Orange 500 |
| Unfavorable | `--color-dataviz-4` | `#6366F1` Indigo 500 |
| Midpoint / zero line | `--color-gray-500` | `#97A3B6` |

**Why not red/green** (updated 2026-09-08 — this section previously specified green
`#229E66` / red `#D92D20`):

- Red 500 and Green 500 separate by only **ΔE 8.0** under deuteranopia — the bottom of
  the "legal only with secondary encoding" band. Orange ↔ indigo scores **32.5**.
- The two common colorblindness types both attack the red-green axis and leave
  blue-yellow intact, which is why warm/cool is the standard diverging pair in
  cartography rather than a stoplight.
- Red and green sit at near-identical luminance, so they collapse to one gray in
  greyscale printing. Orange and indigo differ in temperature *and* lightness —
  two channels, not one.
- At high saturation and matched value they also vibrate, producing edge shimmer on a
  dense variance chart.

Encode the sign **positionally as well** — a column's side of the zero line, or an
explicit `+`/`−` on the label — so direction never rests on hue alone. Never mix a
diverging pair with categorical series in the same chart, and never use it to
distinguish two products, regions, or departments.

> **Tradeoff on record.** Red/green for variance is a strong FP&A convention that
> `docs/cube-personas.md` readers will expect, Chris (non-finance) most of all. The
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

Glass-surface graphics have their own additional constraints (three-series limit, slot
selection, line weight) — see `glass-ui-style.md` § 4.

### Named chart themes

The four board presets — **Board Room**, **Fiscal**, **Growth**, **Forecast** — are
documented in full, with 7 slots each and their intended use, in
`docs/boards_color_theme_project_summary.md`. Use a preset whole; never mix slots
between themes.

---

## Caveats & Gaps

- **Marketing site product source reviewed (partial)** — the Figma Landing Page Layout and a live
  `marketing-landing-page/index.html` prototype have now been reviewed (see "MARKETING WEBSITE —
  COMPONENTS & PAGE PATTERNS" above). Several deviations from this system's Non-negotiables
  (SKILL.md) were found and listed there — treat that section, not the raw Figma/prototype,
  as the source of truth going forward. Most section types (CTA, Footer, Features, Metrics, Social
  proof, Testimonial, Pricing, FAQ, Newsletter CTA, Team, Contact, Careers) still have no product
  source reviewed at all.
- **Two stale Figma references** — the node IDs the original prototype cited for "Features
  sections" and "The Agentic Finance Layer" no longer resolve in the Figma file (deleted, moved,
  or renamed). Don't reuse those old IDs; they need to be re-found from a fresh Figma link before
  either section can be grounded.
- **No product source (product UI)** — no codebase import, no Figma link, no product screenshots
  for the FP&A product UI itself were attached. UI kits were **not** built. Ask for product access
  to generate them.
- **No slide templates** — no sample decks were attached. Slide kit was **not** built.
- **No icons vendored** — the brand uses Font Awesome (matching Folio); it is loaded from CDN via kit script rather than vendored.
- **No customer photography** — imagery direction is documented but no specimen photos are in the system.
- Fonts (DM Sans only, matching Folio) are loaded from Google Fonts via `@import`. If the project needs offline / CSP-locked fonts, download the `.woff2` files into `fonts/` and swap the `@import` for local `@font-face` declarations.
