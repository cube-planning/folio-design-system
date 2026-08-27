# Design Sync Notes — folio-design-system

## Re-sync command

```sh
cp -r "<skill-base-dir>"/package-build.mjs ... .ds-sync/   # re-stage scripts first
node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules \
  --entry ./dist/index.js --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json
./.design-sync/copy-fontawesome.sh   # REQUIRED — see "Font Awesome" note below; run before any validate/upload
```
Fetch `_ds_sync.json` from the project to `.design-sync/.cache/remote-sync.json` before running.

**Font Awesome — do not skip `copy-fontawesome.sh`.** `resync.mjs`/`package-build.mjs` wipe `ds-bundle/` on every run, so the Font Awesome files that `tokens/tokens.css`'s `@import url("./fontawesome/css/all.min.css")` depends on (see the dated entry below) must be re-copied from `vendor/fontawesome/` every single time, or `package-validate.mjs` fails `[CSS_IMPORT_MISSING]` and the driver's `ok` goes `false`. Run the script right after the build/resync step, before `package-validate.mjs` or any `DesignSync` upload.

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

## Tab icon variant added

**2026-08-19:** User asked for a Tab variant using a Font Awesome icon, sized 16px inside a 24x24 icon slot, referencing Figma node 215:27623 (the same Tab component synced earlier). Added an `IconWrapper` (24x24, centered, 16px font-size) around the existing `icon` prop, matching Figma's `IconWrapper`/`Icon` nesting exactly — previously `icon` rendered unwrapped at whatever size the passed element specified. Added `WithIconPrimary`/`WithIconSecondary` preview variants. Pushed scoped to just Tab (bundle + Tab's own component/preview files) — `_ds_sync.json` and `README.md` were deliberately NOT re-pushed this round since a concurrent session's uncommitted `PageHeader` component is also wired into `index.js`/`config.json` right now; pushing the anchor would have falsely marked `PageHeader` as fully synced without ever uploading its actual files.

## Font Awesome icons were rendering as empty boxes — root cause + fix

**2026-08-19:** User flagged that every Banner icon renders as an empty box in the synced project. This had been treated as an accepted/expected limitation everywhere in this repo (Select chevron, Table sort, Drawer close, etc. — see "Font Awesome icons" section above) on the assumption that fixing it requires an external FA CDN kit script the consumer may not have configured. That assumption was wrong: the project already self-hosts Font Awesome at `fontawesome/css/all.min.css` + `fontawesome/webfonts/` (visible in every `list_files` call this whole session) — `styles.css` just never imported it. Fixed by adding `@import url("./fontawesome/css/all.min.css");` to `tokens/tokens.css` (flows into `_ds_bundle.css` via the existing `cfg.cssEntry` mechanism, durable across every future rebuild) and vendoring the actual FA css + 4 core webfont files (`vendor/fontawesome/` in this repo) into the build output so `package-validate.mjs`'s `[CSS_IMPORT_MISSING]` check passes on a self-contained bundle rather than assuming the remote copy stays put. Confirmed fixed via the render-check contact sheet — every Banner icon now renders (circle-check, triangle-exclamation, circle-xmark, circle-info, sparkles, circle-exclamation) instead of an empty box. This likely fixes the same "empty box" symptom documented for every other component's icons too, since they all go through the same `styles.css`.

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

## Radio added (first of the 72 missing families), later renamed from RadioButton

**2026-08-19:** Built `RadioButton` from Figma's `Radio` component (node 678:43477, page "Radio") — the first pull from the "72 missing families" list. Figma props: State (Default/Hover/Focused/Disabled/Pressed), Selected (Yes/No), Size (Large/Small), Label (Yes/No), Label Text. Per the component's Figma description it was "built to match Checkbox for visual consistency" (cobalt-500 selected, gray-500 unselected) — implemented as CSS circle + inner dot (no image assets, consistent with how every other component in this repo draws its own chrome) rather than importing the Figma-exported SVG icons, since those asset URLs expire in ~7 days. Hover/Focused/Pressed states from Figma were not implemented as distinct visual states — this repo doesn't implement those for Toggle either, so kept scope consistent with existing components rather than one-off polishing Radio.

**Renamed `RadioButton` → `Radio` later the same day**: the self-check flagged it as a new kit-vocabulary mismatch (Figma's literal name is `Radio`, not `RadioButton`) — same category of fix as `Segmented` → `SegmentedButton`, just the opposite direction (dropping a word instead of adding one). No behavior change, file/export/config rename only.

## Segmented renamed to SegmentedButton

**2026-08-19:** The claude.ai/design self-check flagged 11 component names as not matching the Figma "Folio Design System Beta" kit vocabulary. Cross-referenced against a full read of the file (all 354 top-level components, 14 pages): most flags were either stale (Banner, Select, Stepper, Toggle already match exactly) or legitimate code-side abstractions with no 1:1 Figma node (ListItem = Figma's `Single Select_List item`/`MultiSelect_List item`, Table/Text/SourceCard/TaskCard have no matching Figma component at all — SourceCard/TaskCard likely trace to an external `Card` library not in this file). Only `Segmented` had a clean, non-draft match worth adopting: Figma's `Segmented button` (node 179:39449) → renamed to `SegmentedButton` across `components/`, `index.js`, `.design-sync/config.json`, and `.design-sync/previews/`. `Drawer`'s Figma match (`Drawer_d`) was left alone — the `_d` suffix reads as a draft-naming artifact, not a name worth copying. `ImportDrawer` still has no Figma equivalent.

## ListItem extracted from Select

**2026-08-19:** `ListItem` was pulled out of `Select`'s dropdown rows into its own component (`components/ListItem.jsx`) so it can be reused for tree/multi-select rows elsewhere. Added to `index.js`, `.design-sync/config.json` componentSrcMap, and authored a preview at `.design-sync/previews/ListItem.tsx`. `Select.jsx` now renders `<ListItem>` internally — its own rendered output (closed states) is unchanged, so `Select`'s render hash did not change in this sync.

## Select dropdown

The dropdown overlay (open state) requires a click interaction. Static previews show only the closed state (default, populated, disabled) and multi-select with chips. The open state is not captured and should not be attempted in future previews.

**2026-08-13:** `Select.jsx`'s error state renders a red border. CLAUDE.md's component rules say "never use red borders for errors — use soft `bg-cube-red-100` banners" (that rule targets a different design language than this repo's actual Folio/Cube JSX components, which predate the doc). This is real shipped behavior, not a preview defect — flagged to the user as a possible component fix, not something the sync should paper over.

## Grid overflow overrides

**2026-08-13 re-sync:** the config's `overrides` block referenced by "Re-sync risks" below (`Button`/`Drawer` cardMode) was NOT present in `.design-sync/config.json` going into this re-sync — likely lost in the repo reorg along with the deleted previews. All 17 components were re-authored from scratch this run; re-check `package-validate.mjs` output for `[GRID_OVERFLOW]` warns and re-apply `cfg.overrides.<Name>` (`cardMode: "column"` for wide/multi-button rows, `cardMode: "single"` + `primaryStory` for escaping fixed-position content) if it fires again.

## AppIcon added (best-effort, no live Figma access)

**2026-08-24:** Built `AppIcon` ("Apps icons" in the missing-families audit) without being able to pull the real Figma node this session (connector unauthorized). It's a branded square tile per integration/data source (Salesforce, Slack, HubSpot, Google Sheets, Excel, QuickBooks, NetSuite, Workday, Adaptive Insights) using Font Awesome brand icons where one exists and a generic fallback glyph where it doesn't (NetSuite, Workday, Adaptive Insights, QuickBooks — no official FA brand glyph). **Flag to re-check against the real Figma "Apps icons" component once Figma access is available** — colors, icon choices, and size scale (`small`/`medium`/`large`, 20/24/32px) are guesses based on SourceCard's existing token conventions, not sourced from Figma.

## Unclassified-token audit scoped to hand-authored tokens only

**2026-08-24:** The design-sync issue list flagged 4,376 of 4,624 tokens as unclassified (`@kind`), mostly `--fa-*` and `--z-*`-style vars. Confirmed the bulk of these live inside vendored Font Awesome CSS (`vendor/fontawesome/css/all.min.css`) — utility custom properties like `--fa-width`, `--fa-animation-direction`, icon-glyph content vars, etc. — not hand-authored design tokens. Per user decision, `@kind` classification stays scoped to `tokens/tokens.css` (already fully annotated, see z-index/transition/blur entries above); vendored Font Awesome internals are out of scope and won't be annotated. If the self-check's token count needs to reach zero unclassified, it needs an exclusion rule for `vendor/` paths, not per-token comments.

## CLAUDE.md's Tailwind rules don't apply to this repo

**2026-08-25:** A review flagged `AppIcon.jsx` and `Modal.jsx` for using inline
`style={{}}` and arbitrary hex values, citing CLAUDE.md's "Never use inline
style attributes" / "always use Tailwind token classes" rules. Checked and
this repo has **no Tailwind setup at all** — no `tailwind.config`, no
`lib/utils.ts`/`cn()` helper, no Tailwind/PostCSS in `package.json`. It's a
plain-JSX package built with esbuild (`build.mjs` → `dist/index.js`), and
every component (`Button.jsx`, `Modal.jsx`, etc.) is built the same way:
inline `style` objects, referencing `tokens/tokens.css` custom properties
(`var(--radius-2xl)`, `var(--shadow-lg)`, ...) or raw resolved pixel values
that match the token scale. This is the same gap already noted above for the
Select red-border rule: CLAUDE.md describes the Tailwind+shadcn *consumer*
app pattern, not this source package. **Do not rewrite components here to
use Tailwind classes or `cn()`** — inline styles + CSS custom properties are
the correct, established convention for `components/`. The only real
violations to check for are: (1) radius/spacing/shadow/color values that
don't map to an actual token in `tokens/tokens.css` (fix by snapping to the
nearest real token, not by switching to Tailwind), and (2) arbitrary hex used
where a Folio token exists (third-party brand colors, e.g. `AppIcon`'s
per-app backgrounds, are a legitimate exception since they have no token
equivalent).

## Button 3.0 prop rename (`type` → `variant`) missed the conventions header

**2026-08-25:** User reported every non-primary `Button` variant rendering identically to
primary in the synced preview output. Root cause: an earlier session rewrote `Button.jsx`'s
API from `type`/`stroke`/`radius` to a single `variant` prop (adding `plain-blue`/`plain-gray`/
`plain-destructive`), and updated `.design-sync/previews/Button.tsx`, `Drawer.tsx`, and
`PageHeader.tsx` — but that fix was never actually committed/pushed (stashed during a git
rebase and never popped back before the push). Re-committed and re-synced this run. Separately,
`.design-sync/conventions.md` — the file inlined into the design agent's system prompt — was
**also** still teaching the old `type="primary"` prop and was missing the 3 new plain-* variant
names. Fixed both the mount example and the idiomatic build example, and extended the variant
list. This is the one file most likely to silently reintroduce this exact bug class (wrong prop
name in agent-facing docs) since nothing in the render check catches a doc naming a prop that
doesn't exist — **always grep `conventions.md` for a component's old prop/variant names after
any prop rename**, not just the previews.

## Button `ai` variant added, conventions.md variant list was stale

**2026-08-27:** Added a new `Button` `variant="ai"` (purple-100/purple-500, pill,
`shadow-sm`) sourced from Figma "Add-Ons" file node 6548:2969 ("Build with AI").
Same color spec as the existing `subtle-purple` variant but kept as its own entry
since that Figma frame pairs a 14px sparkles icon with a 28px-tall button —
oversized relative to the normal small-size icon scale. Added a `Variants` cell
example to `.design-sync/previews/Button.tsx` and regraded (all 4 cells `good`).
While regrading, found `.design-sync/conventions.md`'s enumerated Button `variant`
list (line ~46) was already missing `subtle-purple` and now also missing `ai` —
same drift class as the 2026-08-25 `type`→`variant` entry above. Fixed the list;
**always grep `conventions.md`'s variant enumeration whenever a Button variant is
added or renamed**, not just on prop renames.

## 10 new components added but deferred to floor cards (2026-08-27)

**2026-08-27:** This resync's diff surfaced 10 components never synced before —
`AccordionSection`, `AddonSidebar`, `AddonTopNav`, `AnalyzePanel`, `BuildPanel`,
`ExpandCollapseControl`, `FilterField`, `RangeSelectorTree`, `RangeSelectorTrigger`,
`Tooltip` — added to `index.js`/`componentSrcMap` by other work in this repo before
this sync ran. Per user decision, none were authored this run; they uploaded as
floor cards (render check confirmed 9/10 render real content with synthesized
default props, only `Tooltip` swaps to the typographic placeholder). **These are
the standing offer for incremental authoring on a future sync** — see the preview
scope question in the base skill's §2 step 5.

## Cube Add-on Sidebar built out fully, synced so it's editable in claude.ai/design (2026-08-27)

**2026-08-27:** User asked for the full Cube Add-on sidebar (Build/Analyze/Publish/Tables,
per `docs/cube-addon-design-spec.md` and a much more detailed follow-up spec) implemented
as real interactive components, then separately reported the page was "read only" in
claude.ai/design — root cause: the new components existed in the repo but had never been
synced, so the design agent had nothing editable to build the page with. Fixed by:
1. Rewrote `BuildPanel.jsx` with an explicit 3-stage state machine (`picker` → `picked` →
   `fetched`) instead of the old single-shape controlled props, to support the
   Select/New/Open picker step and the post-fetch Dimensions/Transactions field groups.
2. Bumped `AccordionSection`'s closed-row height 48px → 56px per spec (open/closed already
   shared one bordered container with no inner seams, so no further change needed there).
3. Added `fullWidth`/`style` props to `SegmentedButton` (previously `inline-flex` only,
   with no style-override escape hatch) — needed for the Dimensions/Transactions and
   Data/Web Report/New Table/Existing segmented controls to span their containers.
4. Added `PublishPanel.jsx` and `TablesPanel.jsx` (new), plus a `CubeAddonSidebar.jsx`
   composite that owns all real `useState` wiring end-to-end (accordion open state per
   section — independent, not mutually exclusive; Build's stage machine; the range
   multi-select tree's indeterminate-parent logic; Publish's create-report form; Tables'
   Setup→Configured→Settings detail screen) as the reference implementation other
   consumers should copy into their own data layer.
5. Added all 3 new components to `componentSrcMap` and re-synced (atomic path, `upload.bundle: true`
   ships the real code regardless of each component's own "unchanged"/"added" classification —
   that classification only gates preview recapture/regrade, never what ships in `_ds_bundle.js`).
   All 3 render cleanly with synthesized default props (no floor card needed) — screenshots
   confirmed styled/complete/plausible without authoring `.tsx` previews for them yet.

Caught two real bugs during interactive verification (esbuild-bundled the actual source
into a throwaway browser harness and clicked through every state — screenshots alone would
have missed both):
- `PublishPanel`'s create-form footer clipped "Create Web Report" text outside its pill
  when paired 50/50 with "Cancel" in a 300px sidebar — fixed by giving Cancel intrinsic
  width instead of `flex: 1`, and switching its variant to `secondary` per CLAUDE.md's
  Cancel-button-variant rule (no header `×` in this inline create panel).
- `CubeAddonSidebar`'s initial range-tree data hardcoded "All" as `checked` even though
  Sheet 2/Drilldown 1 start unchecked — should have been `mixed` (indeterminate). The bug
  was invisible in a screenshot (mixed and checked render as the same filled navy square,
  differing only in a 9px minus-vs-check glyph) — caught by inspecting the actual icon
  className via `preview_eval`, not by eyeballing the render.

## Full-force re-verify audit (2026-08-27)

**2026-08-27:** User asked to "force a full re-sync" — a deliberate audit of all
carried-forward grades, not just the changed-since-last-sync set. Ran
`package-capture.mjs --force`, which cleared grades for all 27 authored
components (100+ cells total) and re-captured every sheet from scratch. Reviewed
every sheet and regraded all 27 `good` — no regressions found; this was a clean
audit, not a bug hunt. Confirmed via a follow-up `package-capture.mjs` run with
no `--force`: all 27 printed `carried forward` with zero `grade cleared`, proving
the fresh grades are stable and match the current build. Then did a full atomic
upload of every component + bundle + styling (not diff-scoped) per the user's
explicit "everything" request, even though the diff itself reported `upload.any:
false` (nothing had actually changed in source). Also pruned 11 stale grade/review
files left over from the pre-rename component set (`CubeBadge`, `CubeButton`,
`CubeDrawer`, `CubeInput`, `CubeSegmented`, `CubeSelect`, `CubeSourceCard`,
`CubeTable`, `CubeText`, `CubeToggle`, `RadioButton`) — harmless leftovers from
the 2026-06-23 rename, cleaned up automatically by `package-capture.mjs`.

## Known render warns

(None — all warnings were triaged as expected behavior, documented above.)

## Upload plan must include fontawesome/**

**2026-08-25:** The skill's standard `finalize_plan` writes list (`components/**`,
`tokens/**`, `fonts/**`, `_vendor/**`, `_preview/**`, `guidelines/**`, plus root
files) does NOT include `fontawesome/**` — but this repo's Font Awesome files
live there (via `copy-fontawesome.sh`, see above), not under `tokens/` or
`fonts/`. Omitting it from the plan would upload a project whose
`_ds_bundle.css` `@import "./fontawesome/css/all.min.css"` 404s for every
future consumer. Added `"fontawesome/**"` to both `writes` and the uploaded
file list this run. **Always add `fontawesome/**` to the `finalize_plan`
writes for this repo** — it's not covered by the generic skill list.

## Re-sync risks

- **componentSrcMap** maps all components by hand — if a component is renamed or added, update the map AND add the corresponding authored preview in `.design-sync/previews/` or re-sync will have no preview (floor card) for it.
- **Drawer/ImportDrawer previews** depend on the `transform: translateZ(0)` CSS trick (+ explicit `height` for longer content, see above) for fixed-position containment — if Chromium changes behavior here the preview could break.
- **Font Awesome icons** — if the DS switches from FA classes to a different icon system (e.g. bundled SVGs), update the previews to remove the empty-box notes.
- **DM Sans font provisioning** — server-side. If the self-check behavior changes or fonts need to be explicitly shipped, set `cfg.extraFonts` to the font files.
- **No TypeScript** — `.d.ts` prop bodies are synthesized from JSX source. Complex prop shapes (unions, callbacks) may not extract perfectly. Improve with `cfg.dtsPropsFor.<Name>` if needed.
- **2026-08-13: all 17 previews were re-authored from scratch** after a prior "reorganize repo structure" commit deleted the previous set. Grades in `.design-sync/.cache/review/` are fresh, not carried forward from history.
- **10 components uploaded as floor cards 2026-08-27** (see above) — no authored preview yet: `AccordionSection`, `AddonSidebar`, `AddonTopNav`, `AnalyzePanel`, `BuildPanel`, `ExpandCollapseControl`, `FilterField`, `RangeSelectorTree`, `RangeSelectorTrigger`, `Tooltip`. Author them on any future re-sync per §2.5's preview-scope question.
- **3 more floor-card components added same day**: `PublishPanel`, `TablesPanel`, `CubeAddonSidebar` — same deal, no authored `.tsx` yet. `CubeAddonSidebar` in particular is the full addon shell (topnav + all 4 sections wired together); its floor-card render uses whatever default props its own `useState` initializes with, which happens to look complete — but it has no dedicated grade, so a future component-level regression there wouldn't be caught by capture/grade, only by the render check's crash detection.
