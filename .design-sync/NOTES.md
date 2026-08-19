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

- Affected components: Select (chevron), Banner (alert icon), Drawer (close ×), Table (sort carets), SourceCard (chevron), Input (error triangle), ListItem (tree chevron, checkbox check/minus, selected check)

## DM Sans fonts — server-provisioned

The claude.ai/design self-check detected DM Sans referenced in the bundle CSS and automatically provisioned the full DM Sans font family into `fonts/`. These are NOT in the local ds-bundle and should NOT be deleted in re-sync reconciliation passes. They are managed server-side.

## Drawer preview approach

Drawer uses `position: fixed` which breaks out of normal CSS flow. The preview wraps it in a `div` with `transform: translateZ(0)` to create a new fixed-position containing block. This is a CSS rendering trick specific to Chromium — verified to work in the render check.

**2026-08-13:** ImportDrawer needed more than the transform alone. The wrapper's own height is `auto` (0, since fixed children don't contribute to layout), so the drawer's `top:0; bottom:0` collapses to 0px and the scrollable body renders empty — only header/footer show. This was invisible on Drawer's own (short) preview content but showed immediately on ImportDrawer's longer body. Fix: add an explicit `height: 680` + `position: "relative"` alongside `transform: "translateZ(0)"` on the wrapper. Applied in `.design-sync/previews/ImportDrawer.tsx`. **If Drawer's own preview content ever grows, apply the same explicit-height fix there.**

## Banner updated against real Figma variant instances

**2026-08-19:** User pointed at the Figma Banner component set (node 179:23016, 54 variants across 6 types × dismissable × button × header) and asked for an update. Pulled real instances for all 6 types (Error/Warning/Success/Info/AI/Neutral, each with header+button+dismiss) and diffed against our implementation. Found two real drifts: (1) header weight should be SemiBold/600 everywhere, ours was Medium/500; (2) Error is the only type where header and body use different shades in Figma (header red-800, body red-700) — every other type uses one shade for both, which our single `v.color` already handled correctly. Everything else (backgrounds, button pill colors, icons, border-only-on-neutral) already matched exactly. Deliberately did NOT copy Neutral's Figma feedback-button fill (yellow-200 on the "Nutral" variant) — it looks like leftover copy-paste from another type, not intentional, given the page's own typo ("Nutral") and general lower-polish signals on that variant.

## Filter added (per explicit user request, rest of the missing list on hold)

**2026-08-19:** Built `Filter` from Figma's plain `Filter` component (node 185:32652, "Search & Filter" page) — a filter chip: `label: value` text, an optional cobalt-500 count badge for active filters, trailing chevron-down. Figma's count badge used Lato — rendered in DM Sans instead, per CLAUDE.md's "DM Sans only" rule. User asked to build only this one and hold off on the rest of the missing-families list for now.

## Checkbox, StatusDot, Tag, Tab added (4 more of the 72 missing families)

**2026-08-19:** Second batch from the missing-families list, pulled from real Figma nodes: `Checkbox` (236:29293, moved to its own page — description notes 4/60 variants were repaired placeholders on 2026-08-19), `Status dot` (179:23799, success/warning/error), `Tag` (397:40165, with a clearable variant), `Tab` (215:27623, primary card-style vs secondary underline, each with active/inactive). All built CSS-only (no image assets, same rationale as RadioButton) and use FA icon classes for glyphs (check/minus/xmark) consistent with the rest of the system. `Tab`'s Figma source has many more state/icon combinations than implemented — kept to primary/secondary × active/inactive, no icon variant, since that covers the realistic usage and matches how other components in this repo scope down complex Figma variant matrices (e.g. Radio skipped Hover/Focused/Pressed).

## @kind tags added for the 14 unclassified tokens

**2026-08-19:** The self-check's own wording ("annotate ... with `@kind` tags") was the only spec available — no syntax for this is documented anywhere in this repo's staged `.ds-sync/` scripts (confirmed by grep; the kind classification for color/font/spacing/radius/shadow is inferred server-side, not from a local annotation mechanism). Took the message literally: added `/* @kind: zIndex */`, `/* @kind: motion */`, `/* @kind: blur */` as trailing comments on the 14 z-index/transition/blur declarations in `tokens/tokens.css`. Confirmed the comments survive into the built `_ds_bundle.css` unminified. Whether the self-check's classifier actually reads this exact form won't be known until the next audit — flag to the user if it's still showing as unclassified next time, since the syntax was a best-effort guess, not a documented contract.

## DM Sans @font-face wired in

**2026-08-19:** The self-check flagged DM Sans as `"status": "no-face"` — the token referenced the family name but no `@font-face` backed it (the repo only ever loaded DM Sans via a Google Fonts `<link>` in `index.html`/`shell.html`, which doesn't reach the sandboxed design-system preview). A separate session vendored the actual variable font files + a hand-written `@font-face` CSS at `vendor/fonts/dm-sans/` (commits `33fb1b4`/`d3cc64e`) for the app shell's own use — reused that directly here via `cfg.extraFonts: "vendor/fonts/dm-sans/dm-sans.css"` rather than duplicating font files. Styling-only change (no component grades affected); the project's existing per-weight `fonts/DMSans-*.ttf` files (server-provisioned earlier) are untouched — these are additive variable-font files living alongside them.

## RadioButton added (first of the 72 missing families)

**2026-08-19:** Built `RadioButton` from Figma's `Radio` component (node 678:43477, page "Radio") — the first pull from the "72 missing families" list. Figma props: State (Default/Hover/Focused/Disabled/Pressed), Selected (Yes/No), Size (Large/Small), Label (Yes/No), Label Text. Per the component's Figma description it was "built to match Checkbox for visual consistency" (cobalt-500 selected, gray-500 unselected) — implemented as CSS circle + inner dot (no image assets, consistent with how every other component in this repo draws its own chrome) rather than importing the Figma-exported SVG icons, since those asset URLs expire in ~7 days. Hover/Focused/Pressed states from Figma were not implemented as distinct visual states — this repo doesn't implement those for Toggle either, so kept scope consistent with existing components rather than one-off polishing Radio.

## Segmented renamed to SegmentedButton

**2026-08-19:** The claude.ai/design self-check flagged 11 component names as not matching the Figma "Folio Design System Beta" kit vocabulary. Cross-referenced against a full read of the file (all 354 top-level components, 14 pages): most flags were either stale (Banner, Select, Stepper, Toggle already match exactly) or legitimate code-side abstractions with no 1:1 Figma node (ListItem = Figma's `Single Select_List item`/`MultiSelect_List item`, Table/Text/SourceCard/TaskCard have no matching Figma component at all — SourceCard/TaskCard likely trace to an external `Card` library not in this file). Only `Segmented` had a clean, non-draft match worth adopting: Figma's `Segmented button` (node 179:39449) → renamed to `SegmentedButton` across `components/`, `index.js`, `.design-sync/config.json`, and `.design-sync/previews/`. `Drawer`'s Figma match (`Drawer_d`) was left alone — the `_d` suffix reads as a draft-naming artifact, not a name worth copying. `ImportDrawer` still has no Figma equivalent.

## ListItem extracted from Select

**2026-08-19:** `ListItem` was pulled out of `Select`'s dropdown rows into its own component (`components/ListItem.jsx`) so it can be reused for tree/multi-select rows elsewhere. Added to `index.js`, `.design-sync/config.json` componentSrcMap, and authored a preview at `.design-sync/previews/ListItem.tsx`. `Select.jsx` now renders `<ListItem>` internally — its own rendered output (closed states) is unchanged, so `Select`'s render hash did not change in this sync.

## Select dropdown

The dropdown overlay (open state) requires a click interaction. Static previews show only the closed state (default, populated, disabled) and multi-select with chips. The open state is not captured and should not be attempted in future previews.

**2026-08-13:** `Select.jsx`'s error state renders a red border. CLAUDE.md's component rules say "never use red borders for errors — use soft `bg-cube-red-100` banners" (that rule targets a different design language than this repo's actual Folio/Cube JSX components, which predate the doc). This is real shipped behavior, not a preview defect — flagged to the user as a possible component fix, not something the sync should paper over.

## Grid overflow overrides

**2026-08-13 re-sync:** the config's `overrides` block referenced by "Re-sync risks" below (`Button`/`Drawer` cardMode) was NOT present in `.design-sync/config.json` going into this re-sync — likely lost in the repo reorg along with the deleted previews. All 17 components were re-authored from scratch this run; re-check `package-validate.mjs` output for `[GRID_OVERFLOW]` warns and re-apply `cfg.overrides.<Name>` (`cardMode: "column"` for wide/multi-button rows, `cardMode: "single"` + `primaryStory` for escaping fixed-position content) if it fires again.

## Known render warns

(None — all warnings were triaged as expected behavior, documented above.)

## Re-sync risks

- **componentSrcMap** maps all components by hand — if a component is renamed or added, update the map AND add the corresponding authored preview in `.design-sync/previews/` or re-sync will have no preview (floor card) for it.
- **Drawer/ImportDrawer previews** depend on the `transform: translateZ(0)` CSS trick (+ explicit `height` for longer content, see above) for fixed-position containment — if Chromium changes behavior here the preview could break.
- **Font Awesome icons** — if the DS switches from FA classes to a different icon system (e.g. bundled SVGs), update the previews to remove the empty-box notes.
- **DM Sans font provisioning** — server-side. If the self-check behavior changes or fonts need to be explicitly shipped, set `cfg.extraFonts` to the font files.
- **No TypeScript** — `.d.ts` prop bodies are synthesized from JSX source. Complex prop shapes (unions, callbacks) may not extract perfectly. Improve with `cfg.dtsPropsFor.<Name>` if needed.
- **2026-08-13: all 17 previews were re-authored from scratch** after a prior "reorganize repo structure" commit deleted the previous set. Grades in `.design-sync/.cache/review/` are fresh, not carried forward from history.
