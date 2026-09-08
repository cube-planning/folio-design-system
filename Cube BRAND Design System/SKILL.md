---
name: cube-ai-design
description: Use this skill to generate well-branded interfaces and assets for Cube Software (the Agentic Finance Layer) — for production code or throwaway prototypes, mocks, slides, and marketing artifacts. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- `README.md` — brand overview, content fundamentals, iconography, marketing website component
  rules. Visual foundation rules were condensed into "Non-negotiables" below rather than kept as
  separate long-form prose.
- `colors_and_type.css` — all design tokens as CSS custom properties. Import this in any HTML you generate.
- `assets/` — logos (gradient, light, dark, gradient-on-white) + archived brand guidelines PDF.
- `preview/` — specimen cards demonstrating every token and component.

## Non-negotiables

- Brand is **Cube Software** — never "Cube AI" (that name was reverted).
- Light surfaces first. Saturated color is the exception, never the rule.
- Deep Purple `#5547A5` is reserved for AI moments. Never decorative.
- Gradients flow cool → warm (raw data → decision). Never radial, diagonal, or reversed.
- No emoji. Ever.
- Icons: Font Awesome, matching Folio (the product design system). Never mix icon sets; never apply gradients or shadows to icons.
- Typography: DM Sans only — display and body/UI — matching Folio. All on Google Fonts, imported in `colors_and_type.css`.
