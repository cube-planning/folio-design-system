---
name: cube-ai-design
description: "ARCHIVED / DO NOT USE — legacy artifact of the old branding design system, retained as a historical snapshot only. It carries the retired 'Cube AI' brand name, a superseded radius scale and retired colors. Do not use it to generate branded interfaces or assets. Current rules: docs/BRAND-FOUNDATION.md (cross-persona facts), docs/CHART-RULES.md (charts), glass-ui-style.md (marketing graphics)."
user-invocable: false
---

**This skill is archived and must not be used to produce work.** Read the
ARCHIVED notice at the top of `README.md` for what superseded it. If you were
looking for current brand rules, use `docs/BRAND-FOUNDATION.md`,
`docs/CHART-RULES.md` and `glass-ui-style.md` instead.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- `README.md` — brand overview, content fundamentals, iconography, marketing website component
  rules, **charts & data display**. Visual foundation rules were condensed into "Non-negotiables"
  below rather than kept as separate long-form prose.
- `glass-ui-style.md` — **read this before generating any marketing graphic.** The glass/isometric
  recipe: panel variants, shared perspective, specular streak, and the chart-mark rules that apply
  over glass (series slots, 2px strokes, 8px borderless markers, when values are labelled).
- `colors_and_type.css` — all design tokens as CSS custom properties. Import this in any HTML you generate.
- `assets/` — logos (gradient, light, dark, gradient-on-white) + archived brand guidelines PDF.
- `preview/` — specimen cards demonstrating every token and component.

## Non-negotiables

- Brand is **Cube Software** — never "Cube AI" (that name was reverted).
- Light surfaces first. Saturated color is the exception, never the rule.
- Purple is reserved for AI moments. Never decorative. Render it as
  `--color-gradient-ai` wherever it is a fill; the only flat hex is `#7A5AF8`, and only for
  `box-shadow` (which cannot take a gradient). **Deep Purple `#5547A5` is retired** — do not use it.
- Gradients run in one consistent direction: dark → light, horizontal left→right or vertical
  top→bottom. Never radial, diagonal, or reversed.
- **Charts:** series colors come from the `--color-dataviz-*` family in fixed slot order, never
  cycled — a three-series graphic uses slots 1 / 4 / 6. Gray, purple, yellow, cobalt, red and green
  are banned from categorical series. Variance uses the warm/cool diverging pair (orange/indigo),
  **not** red/green. Marks: 2px strokes, 8px borderless markers, no area fill over glass.
  Decorative/hero graphics omit per-point value labels; anything a reader takes a figure from
  labels every value. Full rules: `README.md` § "Charts & data display" and `glass-ui-style.md` § 4.
- No emoji. Ever.
- Icons: Font Awesome, matching Folio (the product design system). Never mix icon sets; never apply gradients or shadows to icons.
- Typography: DM Sans only — display and body/UI — matching Folio. All on Google Fonts, imported in `colors_and_type.css`.
