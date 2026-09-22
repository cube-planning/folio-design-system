# brand/slides/ — company slide template

Home for the company slide template. Empty on purpose as of 2026-09-11; this folder
exists so the template lands somewhere obvious instead of at the repo root.

## Before building it, read

- [`brand/BRAND.md`](../BRAND.md) — marketing/brand rules
- [`docs/foundation/BRAND-FOUNDATION.md`](../../docs/foundation/BRAND-FOUNDATION.md) — shared
  facts (DM Sans, Font Awesome, chart series order, radius, voice). Slides inherit these.
- [`docs/foundation/CHART-RULES.md`](../../docs/foundation/CHART-RULES.md) — governs any chart
  on a slide, including charts over glass surfaces
- [`brand/glass-ui-style.md`](../glass-ui-style.md) — if slides use the glass/isometric treatment

## Note on file format

`brand/*.md` is swept into the design-sync guidelines upload, but `brand/slides/*.md` is
**not** — the glob is one segment deep by design (see `.design-sync/config.json`). If the
slide rules should reach the claude.ai/design project, put them in `brand/BRAND.md` or add
`brand/slides/*.md` to `guidelinesGlob` explicitly. Binary templates (`.pptx`, `.potx`)
never sync either way.
