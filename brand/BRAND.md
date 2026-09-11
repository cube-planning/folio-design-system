# BRAND.md — Cube Software brand & marketing rules

> **This file is the authoritative home for marketing/brand work.** It closes the
> open question that [`docs/foundation/BRAND-FOUNDATION.md`](../docs/foundation/BRAND-FOUNDATION.md)
> § "Marketing/brand source" had left undefined since 2026-09-09.
>
> Scope split, so there is never a question of which file governs:
>
> | Surface | Governed by |
> |---|---|
> | Folio **product app** UI | [`CLAUDE.md`](../CLAUDE.md) |
> | Facts shared by **every** surface (type, icons, chart series, radius, voice, palette) | [`docs/foundation/BRAND-FOUNDATION.md`](../docs/foundation/BRAND-FOUNDATION.md) |
> | **Marketing & brand** deliverables (site, graphics, slides) | this file |

---

## 0. Session Start

Read before doing any brand or marketing work:

```
- brand/BRAND.md                       (this file)
- docs/foundation/BRAND-FOUNDATION.md  (shared facts — read FIRST, this file only adds to it)
- tokens/tokens.css                    (the shared primitive ramp — brand does not fork it)
- brand/tokens/marketing-primitives.css
- brand/tokens/marketing-semantic-tokens.css
- brand/glass-ui-style.md              (glass/isometric graphic recipe)
```

---

## 1. What lives here

| Path | Purpose |
|---|---|
| `brand/BRAND.md` | This file — brand rules and the index below |
| `brand/glass-ui-style.md` | Glass/isometric marketing graphic recipe (panels, layout, background) |
| `brand/tokens/marketing-primitives.css` | Marketing-only raw values: gradients, glows, type-scale gaps |
| `brand/tokens/marketing-semantic-tokens.css` | `{category}/{purpose}/{emphasis}/{state}` semantic layer — build against this |
| `brand/landing-page/` | Reference marketing site build (static HTML/CSS, not the app's React stack) |
| `brand/graphics/` | Standalone marketing graphics |
| `brand/slides/` | Company slide template — see `brand/slides/README.md` |

---

## 2. Inherited, not redefined

Brand work **reuses** the shared foundations rather than forking them. Per
`docs/foundation/BRAND-FOUNDATION.md`:

- **Palette** — one shared primitive ramp, Folio's, from `tokens/tokens.css`. There are
  no separate brand red/amber/purple values.
- **Typeface** — DM Sans.
- **Icons** — Font Awesome (`fa-solid` default). Never Lucide.
- **Charts** — `docs/foundation/CHART-RULES.md` governs every chart, including charts
  over glass surfaces.

Only add a rule here when it is genuinely marketing-specific (gradients, hero
treatments, photography, glow, slide layout). If a rule applies to the app too, it
belongs in `docs/foundation/BRAND-FOUNDATION.md` instead.

---

## 3. Stack

Static HTML/CSS per template, DM Sans via Google Fonts, Font Awesome, inline `:root`
tokens. **Not** the app's React/Tailwind stack — marketing pages ship independently of
the product app. `brand/landing-page/index.html` is the current reference build.

---

## 4. Superseded material

`archive/MARKETING-DESIGN-SYSTEM.md` was the previous draft of these rules. It is
archived, not current: several things it grounded from the Figma landing page (the
diagonal/radial hero gradient, DM Sans for body text) conflicted with the actual brand
rules. `archive/cube-brand-design-system/` is a legacy artifact of the retired "Cube AI"
branding system. Neither is authoritative — do not generate on-brand work from either.

---

## 5. Why a rule changed

Dated entries go in [`docs/process/DESIGN-DECISIONS.md`](../docs/process/DESIGN-DECISIONS.md),
same as product decisions. That log explains the specs; it never overrides them.
