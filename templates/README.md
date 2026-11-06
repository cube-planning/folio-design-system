# templates/ — two different kinds of file, one folder

This folder holds two things that look alike and are not. Check which kind you have
before editing.

## 1. App page shells — plain `.html`

`shell.html`, `homepage.html`, `library.html`, `usage.html`

Local, standalone pages. `shell.html` is the base layout for all new screens; per
[`CLAUDE.md`](../CLAUDE.md) only add content inside `<main>` and never modify the
sidebar, header, or shell structure.

## 2. Design-project specimens — `<Name>.dc.html` + `ds-base.js` + `support.js`

`audit-trail-demo/`, `board-mvp-single-add/`, `chart-rules-mock/`, `cube-addon-demo/`,
`cube-addon-sidebar/`, `cube-addon-sidebar-sheets-host/`, `page-header-demo/`

`cube-addon-sidebar/` ("Cube Add-on Sidebar") and `cube-addon-sidebar-sheets-host/`
("Cube Add-on — Google Sheets Host") are the two hand-authored add-on prototypes. They were
remote-only until 2026-10-27, when both were exported into the repo with **default filter
members** added for all six filter dimensions (Time, Department, Scenario, Entity, Product,
Market): each filter row opens a member-tree screen pre-filled with the default, admins hover
a member to "Set default" (confirm sheet, toast, Default badge), and the header hamburger
menu opens a **Default filter members** screen that lists every dimension's default with a
Change button (viewers see View). Reference source for the original Department-only version
is in `prototypes/default-filter-member/`. Account stays static (it is a row axis). **The repo
copies are now ahead of the design project**, which still holds the pre-feature versions.
Patch both folders' `CubeAddonSidebar.dc.html` in the same pass; they differ only in the
card layout (fixed 320px vs 100%-height flex) and the filter list's `max-height`.

The **Integrations > Mapping** screen (Figma "Folio DS 2026 UI Refresh, Eng Handoff", node
`460:30254`) is not its own template. It lives only inside
`integrations-page/Integrations.dc.html`, opened from the **Mapping** button on a
connection overview, and includes the Mapping Rules drawer and Edit Mapping mode. Keep it
to that one copy; a separate standalone page drifted from it and was retired.

`board-mvp-single-add/` — design-project name **"Board MVP: single add"** — is the
Interactive Boards canvas flow: edit mode and read-only view, the Add Widget drawer,
the Preview widget editor, and single-widget insertion. Built from Figma "Interactive
Boards (Canvas)" (`laazPiD6J57Wc91WJ4uRMM`, section `3397:34692`), whose annotation
reads *"MVP: single add (multi-select bulk add to come V2)"*. Distinct from the
remote-only `boards-page` template, which is the Boards *list* screen.

> **Uploading a template directory does not register it.** `npm run design-sync` has
> no template glob — it covers components, styling and guidelines only. The design
> project's `_ds_manifest.json` is compiled app-side and needs a `name`,
> `description`, `folder`, `entryPath` and a captured `.thumbnail` per template, so a
> freshly uploaded directory sits there unlisted until the app's self-check indexes
> it. That is why `audit-trail-demo/` and `cube-addon-demo/` are not in the design
> project at all. Verified 2026-09-16.

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
