> **SUPERSEDED.** This work has moved to the "Cube Software Design System" project
> (`archive/cube-brand-design-system/README.md`, section "MARKETING WEBSITE — COMPONENTS & PAGE
> PATTERNS"), which is sourced from the official Brand Guidelines 2026 v1.0 PDF and takes priority
> over what's documented below. Several things grounded here from the Figma landing page — the
> diagonal/radial hero gradient, Font Awesome icons, DM Sans for body/UI text — turned out to
> conflict with that system's actual rules. Treat this file as historical/exploratory, not current.

# MARKETING-DESIGN-SYSTEM.md — Folio Marketing Site Rules

> Companion to root [`CLAUDE.md`](../CLAUDE.md). That file governs the Folio **app** (Cobalt-primary,
> pill-radius, DM Sans). This file governs the **marketing website** — a visually distinct system
> (dark navy hero sections, green CTA accents, gradients, photography) that shares Folio's
> typography, icon set, and spacing scale but is not the app UI.
>
> Status: working draft, built from a handful of reference pages (Figma + live cubesoftware.com
> pages), not yet exhaustive. Extend it as more example pages are reviewed — don't treat a
> pattern seen once as a rule; promote it here only once it repeats.

---

## 0. Session Start

Read before doing marketing-site work:

```
- archive/MARKETING-DESIGN-SYSTEM.md   (this file)
- CLAUDE.md                          (Folio app rules — typography/icons/spacing inherited from here)
- tokens/tokens.css                  (spacing scale + app color/font primitives, shared with the app)
- brand/tokens/marketing-primitives.css    (marketing-only raw values: gradients, glows, type-scale gaps)
- brand/tokens/marketing-semantic-tokens.css  (category/purpose/emphasis/state semantic layer — the actual rule to build against)
- brand/landing-page/index.html  (current reference build)
```

---

## 1. Stack

Static HTML/CSS per template (matches the existing [`brand/landing-page/index.html`](../brand/landing-page/index.html)):
DM Sans via Google Fonts, Font Awesome, inline `:root` tokens. **Not** the app's React/Tailwind
stack — marketing pages are built and shipped independently of the product app.

Figma home base: **DS-Marketing-Website** (`fileKey: FqR1h9ed4RIM7ZFotFBv5J`). Existing pages there
as of this writing: `Input`, `Checkbox`, `Landing Page Layout`. Note: this file's page list is
only reliable via direct node-id links — the "list all pages" API call only returns pages
currently cached in the desktop app, so ask for a direct link to anything not already catalogued
in §8 below.

---

## 2. Design Tokens

Two-layer token architecture:

- **Primitives** — raw values, no meaning. Color and font primitives are the app's existing
  `tokens/tokens.css` / `tokens/typography.css` ramps (marketing reuses these directly — no new
  color or spacing primitives needed; every spacing value seen in reference material, 4–96px,
  already exists at [`tokens/tokens.css:357-370`](../tokens/tokens.css)). Marketing-only additions
  (gradients, glows, the type-scale gap sizes) live in `brand/tokens/marketing-primitives.css`.
- **Semantic tokens** — `{category}/{purpose}/{emphasis}/{state}`, e.g. `background/brand/bold/default`.
  This is the layer components should actually be built against. Defined in
  `brand/tokens/marketing-semantic-tokens.css`, with every token traced to the specific Figma node it
  came from.

  **Light/dark mode**: the marketing site has light sections (Nav, Content Section, Blog Card,
  mega-menu) and dark sections (the Hero). Token *names* are identical across both — only the
  values differ. Light values are the `:root` defaults; dark values live in a
  `[data-mode="dark"]` override block. Wrap a dark section's root element with
  `data-mode="dark"` and everything inside it resolves to the dark values automatically — no
  per-component suffix, no separate dark variants of each component.

  One deliberate extension to the base spec still needs your sign-off: an added `accent` purpose
  (for the green CTA color, which isn't really "success" semantics or the primary brand color) —
  see Open Decision #2.

Note: `tokens.css` already has its own semantic layer for the app (`--color-text-primary`,
`--color-bg-subtle`, `--color-success`, etc.) using a flatter 2-layer pattern. The marketing
semantic file intentionally uses the new 4-layer pattern instead — the two systems now use
different semantic conventions by design, not by accident. Worth reconciling at some point, but
out of scope for this doc.

---

## 3. Typography

Inherit Folio's DM Sans type scale (`CLAUDE.md` §4) **except** where marketing sections run
larger — flagged as gaps below rather than silently mapped:

| Marketing usage | Observed size/line-height | Closest Folio token | Gap? |
|---|---|---|---|
| Hero headline | 48px / 58px, Bold | `display-1` (48/60) | Close — line-height differs by 2px |
| Content section heading | 36px / 44px, Semibold, -0.72px tracking | `display-2` (36/48) | Line-height differs by 4px |
| Content section sub-heading | 30px / 38px, Semibold | `display-3` (30/40) | Line-height differs by 2px |
| Hero/content supporting text | 20px / 30px, Regular | *(none — Folio tops out at `title-1` 20/28)* | **Gap** — marketing supporting text has no home in the app scale |
| Content body copy | 18px / 28px, Regular | *(none — between `body` 14 and `title-3` 16)* | **Gap** — marketing body reads larger than app body throughout |
| Hero subhead | 16px / 24px, **Light** | `body` (14/20) is closest by size, but weight doesn't match | **Gap — see Open Decision #3** |

## 4. Component Specs

### Nav / Top Bar
Source: Landing Page Layout `56:45447`.
```
Height: 64px · bg-white · flex justify-between items-center
Padding: 48px horizontal / 16px vertical  (spacing-12 / spacing-4)
Nav links: gap 32px (spacing-8) · DM Sans Medium 14px/1.43 · text-gray-700
Buttons: gap 8px (spacing-2) · shadow-sm · pill, 32px tall
```
**Open decision #1**: current build wires Log In / Get a Demo to the old app Button. Should use
the dedicated marketing Button component instead (see below) — not yet fixed, see §7.

### Button (marketing)
Source: DS-Marketing-Website `18:51`, documented in Figma as *"Cube marketing site button."*
```
Types:  Primary · Secondary · Outline · Ghost · Purple
Sizes:  Large (38px) · Small (28px)
States: Default · Hover · Disabled
Bound to Cobalt / Green / Gray color styles.
```
Use this component for every marketing-site button — nav, hero, CTA banners, footer. Do not reuse
the app's `Button.tsx` on marketing pages (heights differ: 38/28px here vs. 32/28px in the app).

### Mega-Menu (Nav Dropdown)
Source: Untitled UI reference `6360:83787` and `5142:371532` — **structure only**, not their colors.
This is the fix for the nav/footer taxonomy duplication flagged on cubesoftware.com/customers:
group into a shallow mega-menu with real item cards instead of a flat link dump repeated in the
footer.
```
Panel: full-width, offset 72px below the top bar
Container: 80px side padding
Columns: 3–4 equal-width columns, 20px gutter, 24px top padding per column
Column label → item list: 32px gap
Items within a column: 2px gap (reads as one continuous block)
```
**Nav-item card** (title + description, not a bare link):
```
Padding 12px · icon-to-content gap 12px · radius 8px (radius-lg) · subtle hover fill (gray-50)
Icon: 20px, leading
Title: 14px Semibold  →  gap 4px  →  Description: 14px Regular, gray-600
```
**Slim "quick links" column** (far-right column, variant A only — lighter weight, no card, no icon):
```
Plain text list, 32px gap between items, 14px Semibold gray-600
```
**Utility footer row inside the menu** (variant B only — bottom-of-menu CTA/legal strip):
```
68px bar · same 80px/32px container padding as columns above
Left: one CTA (label + button) · Right: 2–3 secondary links, flush right
```
Cap mega-menus at **3–4 columns total**. If a section needs more taxonomy than that, it belongs in
the footer, not duplicated in both places.

### Hero (Split Hero)
Source: Landing Page Layout `56:45490` / `56:45492`. **Dark section** — wrap the section root
with `data-mode="dark"` (see §2) so `text-neutral-bold-default`, `text-neutral-subtle-default`,
and `text-accent-bold-default` resolve to their dark values automatically.
```
Section: 120px side padding · 80px top / 90px bottom (asymmetric)
Background: --primitive-gradient-hero-navy + --primitive-glow-green-radial decorative blob (see §2, §6)
Split layout: gap 64px · copy column gap 20px
```
```
Headline: text-neutral-bold-default (white), 48/58 Bold, value-prop phrase in text-accent-bold-default (green-400)
Subhead: text-neutral-subtle-default (cobalt-50), 16/24, weight TBD (Open Decision #3)
CTA pill: white pill container (light surface, even though the section around it is dark) ·
  shadow = --primitive-glow-purple-40 as ambient glow (not a focus ring) ·
  text-neutral-subtlest-default placeholder text 14px ·
  inner submit pill: background-accent-bold-default (green-500) bg, 12px Medium white text
Visual panel: cobalt-700 bg, 16px radius (radius-2xl), 380px tall, screenshot cropped inside
```

### Content Section (two-column feature/story block)
Source: Untitled UI reference `1431:222559` — spacing pattern only, restyle with Folio type per §3.
```
Section: py-96px (spacing-24) · inner gap 64px (spacing-16)
Container: max-w-1280px · px-32px (spacing-8)
Two columns: gap 64px · each min-w-480px, max-w-720–768px
Heading → supporting text gap: 20px
Secondary heading block: 40px padding-top / 20px padding-bottom around it
```

### Blog Post Card
Source: Untitled UI reference `1390:59` — spacing pattern only.
```
Card: width 384px (min 320px) · image:content gap 16px
Image: 3:2 aspect ratio, 0.5px border (black/10%)
Content block gap: 20px · heading/subheading gap: 12px
Category badge: pill, 4px/12px padding, 8px gap — map to Folio badge tokens, not their purple
Title: 18px/28px Semibold + 20px trailing icon, 16px gap
Description: 16px/24px Regular
Avatar row: 8px gap · 40px avatar · name/date both 14px/20px
```

---

## 5. Information Architecture (separate workstream — not covered here)

Nav/footer taxonomy de-duplication and footer column count on live pages (e.g. the 9-column
footer + duplicated mega-nav taxonomy seen on `cubesoftware.com/customers`) is tracked as its own
cleanup effort, not part of this component-rules doc. The Mega-Menu spec above exists to give that
future cleanup a real pattern to land on.

---

## 6. Imagery & Gradient Rules

- **Hero gradient** (`--primitive-gradient-hero-navy`, `brand/tokens/marketing-primitives.css`): diagonal
  dark-navy 3-stop gradient, ~139°. Close to but distinct from `cobalt-700/800/900` — treat as its
  own primitive, don't substitute a flat cobalt value.
- **Ambient glow blobs** (`--primitive-glow-green-radial`): soft, large-radius radial gradients at
  very low opacity (6% seen in hero) behind hero copy — decorative only, never load-bearing for
  contrast/legibility.
- **AI/CTA emphasis**: use `--primitive-glow-purple-40` (`brand/tokens/marketing-primitives.css`) as an
  ambient box-shadow on AI-forward CTAs (the hero email-capture pill's white container does this,
  independent of the green submit button inside it) — same purple hue as the app's
  `--focus-ring-ai`, but a different opacity and job, so it's a distinct primitive rather than a
  reused one.
- **Product screenshots**: cropped inside a rounded dark panel (`cobalt-700`, `radius-2xl`), not
  presented as a bare image.
- Photography treatment: not yet established — needs more example pages before writing a rule here.

---

## 7. Open Decisions

Do not resolve these silently — confirm with the design lead before building:

1. **Nav buttons**: switch from the old app Button to the dedicated marketing Button (`18:51`)?
2. **Semantic-token extension** (`brand/tokens/marketing-semantic-tokens.css`): added a 6th purpose,
   `accent`, for the green CTA color, since it's neither the primary brand color nor "success"
   semantics — confirm or fold it into `brand`.
   *(Resolved: light/dark mode now uses a `[data-mode="dark"]` override block, per your direction —
   see §2.)*
3. **"Light" weight**: the hero subhead uses a DM Sans Light weight that doesn't exist anywhere in
   Folio's defined type system (Regular/Medium/SemiBold/Bold only). Either sanction Light as a
   marketing-only exception, or snap it to Regular.

---

## 8. Figma Reference

| Node | File | Description |
|---|---|---|
| `56:45446` | `FqR1h9ed4RIM7ZFotFBv5J` | Landing Page Layout (full page) |
| `56:45447` | `FqR1h9ed4RIM7ZFotFBv5J` | Nav / Top Bar |
| `56:45490` / `56:45492` | `FqR1h9ed4RIM7ZFotFBv5J` | Hero (Split Hero) |
| `18:51` | `FqR1h9ed4RIM7ZFotFBv5J` | Marketing Button component |
| `22:2` | `FqR1h9ed4RIM7ZFotFBv5J` | Input (Default/On Dark/White × 5 states) |
| `1431:222569` | `P69wKt2ldYBnwRBS3utflh` | Content Section variants (reference only) |
| `3947:417447` | `P69wKt2ldYBnwRBS3utflh` | Content Item / heading-paragraph-quote scale (reference only) |
| `1390:58` | `P69wKt2ldYBnwRBS3utflh` | Blog Post Card variants (reference only) |
| `665:1107` | `P69wKt2ldYBnwRBS3utflh` | Blog sections (reference only) |
| `6360:83787` | `P69wKt2ldYBnwRBS3utflh` | Mega-menu, 3-column + quick-links variant (reference only) |
| `5142:371532` | `P69wKt2ldYBnwRBS3utflh` | Mega-menu, 4-column + utility footer row variant (reference only) |

Note: `P69wKt2ldYBnwRBS3utflh` (Untitled UI) node lookups only work via direct link — the file's
page-list API is unreliable for this file too. Always ask for a fresh link rather than guessing IDs.

---

## 9. Component Catalog & Page Recipes (starter — not final)

The full set of reusable section types, confirmed against the Untitled UI "Marketing Website
Components" index. This is the vocabulary every page recipe below is built from.

| Section type | Status |
|---|---|
| Header navigation | ✅ Grounded (Nav, `56:45447`) |
| Header sections | ✅ Grounded (Hero / Split Hero, `56:45490`/`56:45492`) |
| Content | ✅ Grounded (Content Section, `1431:222569`) |
| Blog sections | ✅ Grounded (Blog Post Card, `1390:59`) — post-header and subscribe-card variants still unpulled |
| CTA sections | ⬜ Not yet grounded |
| Footers | ⬜ Not yet grounded |
| Features sections | ⬜ Not yet grounded |
| Metrics sections | ⬜ Not yet grounded |
| Social proof sections | ⬜ Not yet grounded |
| Testimonial sections | ⬜ Not yet grounded |
| Pricing sections | ⬜ Not yet grounded |
| FAQ sections | ⬜ Not yet grounded |
| Newsletter CTA sections | ⬜ Not yet grounded |
| Team sections | ⬜ Not yet grounded |
| Contact sections | ⬜ Not yet grounded |
| Careers section | ⬜ Not yet grounded |

**Page recipes** — page type → ordered section roles. Starter draft, confirmed against the
Untitled UI "Marketing Website Examples" index plus one addition (Case Study / Customer Story,
grounded in the live `cubesoftware.com/customers` page rather than Untitled UI). Not yet
validated against a real template for most rows — treat each row as a guess until a template
confirms or corrects it.

| Page type | Section roles (in order) |
|---|---|
| Landing pages | Header navigation → Header sections → Social proof → Features/Content → CTA sections → Footers |
| **Case Study / Customer Story** | Header navigation → Header sections → Metrics sections → Testimonial sections → Social proof → CTA sections → Footers |
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

When a section role in a recipe is still "Not yet grounded" above, pull a real Figma reference or
live example before building it — don't invent the spec to fill the gap.
