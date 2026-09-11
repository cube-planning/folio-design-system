# templates/ — two different kinds of file, one folder

This folder holds two things that look alike and are not. Check which kind you have
before editing.

## 1. App page shells — plain `.html`

`shell.html`, `homepage.html`, `library.html`, `usage.html`

Local, standalone pages. `shell.html` is the base layout for all new screens; per
[`CLAUDE.md`](../CLAUDE.md) only add content inside `<main>` and never modify the
sidebar, header, or shell structure.

## 2. Design-project specimens — `<Name>.dc.html` + `ds-base.js` + `support.js`

`audit-trail-demo/`, `chart-rules-mock/`, `cube-addon-demo/`, `page-header-demo/`

These run **uploaded**, inside the claude.ai/design project, not locally.

> **Do not move or rename these directories.** Every `ds-base.js` hardcodes
> `const base = '../..'`, which is authored for the *deployed* layout — `templates/<name>/`
> in the design project, where `../..` is the project root and `_ds_bundle.js`,
> `_ds_bundle.css`, `styles.css`, `fonts/` and `fontawesome/` all sit at the top level.
> The local path mirrors the remote path on purpose. Repointing `base` at `ds-bundle/`
> would fix a local preview and break every template in the project. See
> `.design-sync/NOTES.md` § "`ds-base.js`'s `base = '../..'` is correct".

This is why the 2026-09-11 reorg left these in `templates/` instead of grouping them
under a `mocks/` folder.

> **The glass graphics moved out — 2026-09-11.** `cube-abstract-graphic/`,
> `cube-product-frame/` and `glass-dashboard-mock/` now live in
> [`brand/graphics/`](../brand/graphics/). The reorg had originally kept
> `cube-abstract-graphic/` here on the grounds that `ds-base.js`'s `base = '../..'`
> mirrors the deployed path in the Folio design project — but glass graphics are
> **brand-only** and are never uploaded to that project, so the constraint never
> applied to them. Their `ds-bundle` paths are `../../../` to match the extra
> folder depth. The rule above still binds every dir still listed here.

Dirs with a `preview-local.sh` can be previewed locally through that script.
`_verify.local.html` files are gitignored scratch output.
