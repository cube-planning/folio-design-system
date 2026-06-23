# Design Sync Notes — folio-design-system

## Re-sync command

```sh
cp -r "<skill-base-dir>"/package-build.mjs ... .ds-sync/   # re-stage scripts first
node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules \
  --entry ./dist/index.js --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json
```
Fetch `_ds_sync.json` from the project to `.design-sync/.cache/remote-sync.json` before running.

## Component discovery

Components are in `components/` (JSX, no TypeScript). The dist entry (`dist/index.js`) doesn't expose PascalCase exports in a way ts-morph can detect, so all 11 components are mapped explicitly via `cfg.componentSrcMap`. Add new components there when they're added to the package.

**2026-06-23:** All 11 components were renamed from `CubeXxx` → `Xxx` (e.g., `CubeBadge` → `Badge`). The config's `componentSrcMap` already reflected the new names. Authored previews in `.design-sync/previews/` were renamed and updated in the same sync run.

## No TypeScript / no .d.ts files

The package is plain JSX — no `.d.ts` files are generated. The `[DTS_REACT]` warning on each build is expected and harmless (no `.d.ts` files to parse, so `@types/react` is irrelevant for this sync). Props bodies are synthesized from the JSX source by the converter.

## Font Awesome icons

Several components use Font Awesome icon classes (`fa-solid fa-*`). These render as empty boxes in the preview cards because FA requires a CDN kit script which isn't loaded in the static preview HTML. This is working as designed — the components themselves are fully functional and the non-icon rendering is correct. Recorded under "Known render warns" for the render check.

- Affected components: Select (chevron), Banner (alert icon), Drawer (close ×), Table (sort carets), SourceCard (chevron), Input (error triangle)

## DM Sans fonts — server-provisioned

The claude.ai/design self-check detected DM Sans referenced in the bundle CSS and automatically provisioned the full DM Sans font family into `fonts/`. These are NOT in the local ds-bundle and should NOT be deleted in re-sync reconciliation passes. They are managed server-side.

## CubeDrawer preview approach

CubeDrawer uses `position: fixed` which breaks out of normal CSS flow. The preview wraps it in a `div` with `transform: translateZ(0)` to create a new fixed-position containing block. This is a CSS rendering trick specific to Chromium — verified to work in the render check.

## CubeSelect dropdown

The dropdown overlay (open state) requires a click interaction. Static previews show only the closed state (default, populated, disabled) and multi-select with chips. The open state is not captured and should not be attempted in future previews.

## Grid overflow overrides applied

- `CubeButton`: `{"cardMode": "column"}` — Sizes story was wider than grid cells
- `CubeDrawer`: `{"cardMode": "single", "primaryStory": "DrawerShell"}` — fixed-position content escapes grid cells

## Known render warns

(None — all warnings were triaged as expected behavior, documented above.)

## Re-sync risks

- **componentSrcMap** maps all components by hand — if a component is renamed or added, update the map AND rename the corresponding authored preview in `.design-sync/previews/` or re-sync will use the old preview (stale) or have no preview (floor card).
- **Drawer.DrawerShell preview** depends on the `transform: translateZ(0)` CSS trick for fixed-position containment — if Chromium changes behavior here the preview could break.
- **Font Awesome icons** — if the DS switches from FA classes to a different icon system (e.g. bundled SVGs), update the previews to remove the empty-box notes.
- **DM Sans font provisioning** — server-side. If the self-check behavior changes or fonts need to be explicitly shipped, set `cfg.extraFonts` to the font files.
- **No TypeScript** — `.d.ts` prop bodies are synthesized from JSX source. Complex prop shapes (unions, callbacks) may not extract perfectly. Improve with `cfg.dtsPropsFor.<Name>` if needed.
