# templates/ — two different kinds of file, one folder

This folder holds two things that look alike and are not. Check which kind you have
before editing.

## 1. App page shells — plain `.html`

`shell.html`, `homepage.html`, `library.html`, `usage.html`

Local, standalone pages. `shell.html` is the base layout for all new screens; per
[`CLAUDE.md`](../CLAUDE.md) only add content inside `<main>` and never modify the
sidebar, header, or shell structure.

## 2. Design-project specimens — `<Name>.dc.html` + `ds-base.js` + `support.js`

`audit-trail-demo/`, `chart-rules-mock/`, `cube-abstract-graphic/`, `cube-addon-demo/`,
`cube-product-frame/`, `glass-dashboard-mock/`, `page-header-demo/`

These run **uploaded**, inside the claude.ai/design project, not locally.

The glass ones are the worked examples of the two composition modes in
[`brand/glass-ui-style.md`](../brand/glass-ui-style.md) § 0 — start from whichever
matches what you're building:

| Template | Mode |
|---|---|
| `cube-abstract-graphic/` | Abstract — planes and a trend, no real UI |
| `cube-product-frame/` | Framed product mock — a real screen on opaque white inside a glass frame |
| `glass-dashboard-mock/` | Abstract, over a calm background — the case where copy can sit directly on a mirror fill |

> **Do not move or rename these directories.** Every `ds-base.js` hardcodes
> `const base = '../..'`, which is authored for the *deployed* layout — `templates/<name>/`
> in the design project, where `../..` is the project root and `_ds_bundle.js`,
> `_ds_bundle.css`, `styles.css`, `fonts/` and `fontawesome/` all sit at the top level.
> The local path mirrors the remote path on purpose. Repointing `base` at `ds-bundle/`
> would fix a local preview and break every template in the project. See
> `.design-sync/NOTES.md` § "`ds-base.js`'s `base = '../..'` is correct".

This is why the 2026-09-11 reorg left these in `templates/` instead of grouping them
under a `mocks/` folder, and why `cube-abstract-graphic/` stayed here rather than moving
to `brand/graphics/` with the other marketing graphic.

Dirs with a `preview-local.sh` can be previewed locally through that script.
`_verify.local.html` files are gitignored scratch output.
