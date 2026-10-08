# Design Sync Notes — folio-design-system

## Re-sync command

```sh
npm run design-sync
```

That's the whole thing. It runs `node build.mjs` then `.design-sync/run-resync.mjs`, which drives build → diff → **Font Awesome copy** → validate → capture in the one order that works, and prints a single verdict plus the upload plan. Exit 0 means genuinely clean.

Two prerequisites it will warn you about rather than silently mis-report:
1. Re-stage the skill scripts into `.ds-sync/` first (`cp -r "<skill-base-dir>"/package-build.mjs ... .ds-sync/`).
2. Fetch the anchor: `DesignSync get_file _ds_sync.json` → `.design-sync/.cache/remote-sync.json`. Without it the diff reports every component as changed.

**Do not call `.ds-sync/resync.mjs` directly.** Its verdict is *always* `ok: false` on this repo, for a structural reason that is not a real failure — see the next section. That is exactly what `run-resync.mjs` exists to fix.

This is now **enforced, not just documented.** `.claude/settings.json` registers a `PreToolUse` hook on `Bash` (`.claude/hooks/block-direct-resync.sh`) that denies any `node … .ds-sync/resync.mjs` command and explains why. It matches *execution* only — `grep`/`sed`/`cat`/`shasum` on the driver stay allowed, since reading it is how you re-verify the mirrored `renderTier`/`pickCanary` logic. `npm run design-sync` is unaffected: the wrapper spawns the driver as a child process, which never passes through the Bash tool. Both files are tracked, so the guard travels with the repo.

To change or remove it, edit `.claude/settings.json` or run `/hooks`. If you add the hook to a fresh clone and it doesn't fire, open `/hooks` once — the settings watcher only watches directories that had a settings file when the session started.

**Known limitation — the guard is lexical.** A `PreToolUse` hook only sees the raw Bash command text and cannot tell code from a quoted string, so it matches only at a *command position* (start of line, or after `;` `&&` `||` `|`, allowing leading whitespace and env assignments). That was tightened after the first version denied a `git commit` whose **message described this very hook**. It still cannot be perfect: a command that embeds a separator-prefixed invocation inside a quoted string — e.g. a heredoc or `-m` message containing `; node .ds-sync/resync.mjs` — is denied. If you hit that, put the text in a file (`git commit -F msg.txt`, or a script) so the fixture never appears in a shell command. `.claude/hooks/block-direct-resync.test.mjs` (17 cases, `node .claude/hooks/block-direct-resync.test.mjs`) keeps the fixtures in a file for exactly this reason and covers both directions.

## Why `.ds-sync/resync.mjs` always reports ok:false here (2026-09-03)

`package-build.mjs` opens with `rmSync(OUT, { recursive: true, force: true })` (line ~203) and has **no preserve list**, so every build wipes `ds-bundle/` — including the Font Awesome files that `tokens/tokens.css`'s `@import url("./fontawesome/css/all.min.css")` depends on. `cfg.cssEntry` is appended into `_ds_bundle.css` verbatim (line ~384), `@import` and all, and the converter never resolves or copies the imported asset.

There is **no config hook and no post-build hook** for this. Verified 2026-09-03: `cfg.extraEntries` is JS-module-only (it feeds the bundle's export gates), and `cfg.extraFonts` only extracts `@font-face` blocks and drops the `.fa-*` glyph rules, so neither can carry `all.min.css`.

Because `resync.mjs` runs build → diff → validate → capture in one process, its own validate stage *always* fails `[CSS_IMPORT_MISSING]`, its verdict is *always* `ok: false`, and capture is *always* skipped `"prior_failure"` — even on a healthy re-sync. That made the driver's verdict worthless as a signal and hid real failures inside an expected one.

`.design-sync/run-resync.mjs` fixes it by treating only resync's **build and diff** stages as authoritative, then doing the FA copy and re-running validate and capture itself. It captures the diff's plain `changed + added` worklist and prints it, because grading is still yours.

Two things it does to avoid paying for the workaround twice:
- It passes `--no-render-check` **into** resync. That stage is doomed to fail `[CSS_IMPORT_MISSING]` regardless, but it runs the full 56-preview chromium render check on the way there — so without the flag every re-sync did two full render passes and discarded the first. Safe because the diff runs *before* validate and `renderChurned` comes from hashes, not rendering, and capture is scoped by `.sync-diff.json`, not by validate.
- It mirrors the driver's **render-check tiering** on the authoritative pass (skip on an anchored no-change re-sync, `--render-sample 10` when nothing render-affecting moved, full otherwise). Kept in sync with the block in `resync.mjs` by hand; if a skill update changes that condition this goes stale in the *safe* direction — it over-renders. A clean no-change re-sync now takes ~4s.

Both mirrored decisions — `renderTier` and `pickCanary` — are exported pure functions with tests: `npm run design-sync:test` (19 cases, covering every tier branch and the canary's bound, dedupe, floor-card drop, single/portal preference and graded-over-ungraded ordering). They exist as tests because those branches only fire on a diff shape you can't choose on demand, so they'd otherwise ship unverified.

`MIRRORED_DRIVER_SHA` in the wrapper pins the `.ds-sync/resync.mjs` version they were copied from (currently `509db748227c1ea3`). On mismatch the wrapper warns and continues — re-read the driver's tiering block and canary pick, then update the constant. Not a hard stop, because both mirrors fail safe: stale, they over-render and over-capture, never under.

**Not mirrored:** the driver's reference-drift baseline. It's gated on `shape === 'storybook'` and cannot trigger on this package-shape repo, so there's nothing to lose.

## The proper fix is upstream — see UPSTREAM-REQUEST.md

Everything above is a workaround. The root cause is that the converter has no static-asset copy hook, which no amount of local scripting fixes. [`UPSTREAM-REQUEST.md`](./UPSTREAM-REQUEST.md) is a ready-to-send request for a `cfg.extraAssets` key, with the file:line evidence and a list of what we'd delete once it lands. **Send it to whoever maintains the design-sync skill.** The skill is not installed on this machine, so there's no local repo or issue tracker to file it against.

## `ds-base.js`'s `base = '../..'` is correct — do not "fix" it

All three local templates (`cube-addon-demo`, `audit-trail-demo`, `page-header-demo`) set `const base = '../..'`, which resolves to the *repo root* locally — where there is no `_ds_bundle.js`. That looks like a bug and isn't. Templates run **uploaded**, at `templates/<name>/` in the design project, where `../..` is the project root and `_ds_bundle.js`, `_ds_bundle.css`, `styles.css`, `fonts/` and `fontawesome/` all sit at the top level. The path is authored for the deployed layout. Repointing it at `ds-bundle` would fix a local preview and break every template in the project.

**Why the wrapper lives in `.design-sync/` and not `.ds-sync/`:** `.ds-sync/` is vendored and gets re-staged from the skill, so a patch to `package-build.mjs` there would be silently wiped (see "Re-sync risks"). `.design-sync/` is ours and survives.

Ordering footnote: the FA copy lands *after* the diff, so the `styleSha`/`auxSha` in `_ds_sync.json` are computed pre-copy. That is self-consistent — every run's diff compares a pre-copy build against a pre-copy anchor — and post-copy `package-validate` confirms "anchor matches the bundle". Don't "fix" this by moving the copy earlier; it would fork the sidecar hashes from every previously uploaded anchor.

## `npm run build` does not refresh `ds-bundle/` (2026-09-16)

`build.mjs` writes **`dist/`** only — `dist/index.js` + `dist/index.cjs`. `ds-bundle/`
is produced by `.ds-sync/package-build.mjs`, which runs *inside* `npm run design-sync`.

So after editing a component, `node build.mjs` alone leaves `ds-bundle/_ds_bundle.js`
stale. Verifying a component change against a locally staged template at that point
reads the **previous** implementation and looks like the edit silently did nothing.
Cost a debugging detour on 2026-09-16 (the `IconBadge` dynamic-hue change).

Check you're looking at fresh output before concluding anything:

```sh
grep -c "<something only the new code has>" dist/_ds_bundle.js   # wrong path — dist has no bundle
grep -c "<something only the new code has>" ds-bundle/_ds_bundle.js
```

If `dist/` has the change and `ds-bundle/` doesn't, you need `npm run design-sync`, not
`npm run build`.

## Component discovery

Components are in `components/` (JSX, no TypeScript). The dist entry (`dist/index.js`) doesn't expose PascalCase exports in a way ts-morph can detect, so all 11 components are mapped explicitly via `cfg.componentSrcMap`. Add new components there when they're added to the package.

**2026-06-23:** All 11 components were renamed from `CubeXxx` → `Xxx` (e.g., `CubeBadge` → `Badge`). The config's `componentSrcMap` already reflected the new names. Authored previews in `.design-sync/previews/` were renamed and updated in the same sync run.

## No TypeScript / no .d.ts files

The package is plain JSX — no `.d.ts` files are generated. The `[DTS_REACT]` warning on each build is expected and harmless (no `.d.ts` files to parse, so `@types/react` is irrelevant for this sync).

> **Corrected 2026-09-11.** This section used to end "Props bodies are synthesized from the
> JSX source by the converter." **That is not what happens.** Measured on the 2026-09-11
> re-sync: **42 of the 58** emitted `<Name>.d.ts` files carry an empty prop bag —
> `export interface <Name>Props { [key: string]: unknown; }` — and nothing more. The
> **16** with real prop bodies are exactly the 16 components that have a *hand-written*
> `components/<Name>.d.ts` in this repo (`AiPromptBar`, `AppsIcon`, `Breadcrumbs`,
> `ButtonGroup`, `CompanySwitcher`, `Favicon`, `FeedbackButton`, `FilterDropdown`,
> `HelpMenu`, `Logo`, `PortalSideBarNav`, `SearchAndFilter`, `SidenavIcon`, `TabGroup`,
> `Toast`, `UserDropdown`). The converter passes those through; for everything else it
> emits the empty bag. There is no JSX-source synthesis.
>
> **Why this matters more than a warning count.** Per the design-sync skill, `<Name>.d.ts`
> (`<Name>Props`) is *"the API contract the design agent codes against."* So for 42 of 58
> components — including `Button`, `Input`, `Table`, `Modal`, `Drawer`, `Text` — the design
> agent gets **no prop contract at all** and has to infer the API from the
> `.prompt.md` and the preview card. That is very likely why `conventions.md` has
> accumulated hand-written prop documentation (the Button `variant` enum, the Text variant
> enum, the icon-only `icon`/`aria-label` rule): the header is currently compensating for
> the missing `.d.ts` contracts.
>
> **The fix, when someone wants it:** `cfg.dtsPropsFor.<Name>` takes a hand-written props
> body per component (documented in the skill's config table), or add real
> `components/<Name>.d.ts` files the way those 16 already do. Either closes the gap
> durably, in a place the design agent actually reads, rather than in the header. Not done
> on 2026-09-11 — it is 42 components of prop authoring and was out of scope for a
> reorg-driven re-sync.

## Conventions header validated against the build (2026-09-11)

The skill's conventions step runs on every re-sync: validate every name in
`.design-sync/conventions.md` against the freshly built artifacts, never re-author. Full
pass this run, after the repo reorg moved a lot of paths:

- **Clean:** the header references only *bundle-relative* paths
  (`components/general/<Name>/<Name>.prompt.md`, `styles.css`, `_ds_bundle.css`,
  `fontawesome/css/all.min.css`), so the reorg could not and did not break it. Worth
  keeping that way — a repo-relative path in this file would rot on every reorg.
- **18/18 tokens verify** with the exact documented values (cobalt/gray/red colors,
  `--spacing-1` 4px … `--spacing-10` 40px, the full radius scale incl. `--radius-lg` 8px /
  `--radius-2xl` 16px / `--radius-full` 9999px, 4 shadows, `--font-base`).
- **11/11 named components** exist as `components/general/<Name>/`.
- **Text variant enum: 10/10 exact**, no extras either side.
- **Button variant enum: one omission, now fixed.** `subtle-gray` is a real variant in
  `components/Button.jsx`'s `VARIANTS` map but was missing from the header's list, so the
  design agent would never have used it. Added. Nothing in the list was *wrong* — the
  other 14 all verify.
- **Button icon-only claims verify exactly:** the `icon` prop (`Button.jsx:208`), the
  `aria-label` throw (`Button.jsx:232`), and the 32×32 / 28×28 `iconOnly` sizes
  (`Button.jsx:154-155`).
- **Font Awesome claim verifies transitively:** `styles.css` → `_ds_bundle.css:20` →
  `fontawesome/css/all.min.css`. `styles.css` does *not* import FA directly, so anyone
  checking only `styles.css` will wrongly conclude it's unwired — the second hop is the
  proof, and it's the one that counts since rendered designs receive the `styles.css`
  import closure.
- **`window.FolioDS`** confirmed in the bundle header (`"namespace":"FolioDS"`).
- **"No provider needed"** still true — no `cfg.provider` is set and previews render.

**Method note for the next run:** validating an enum against `_ds_bundle.js` with a
*string* grep gives false negatives. esbuild keeps identifier-safe object keys unquoted,
so `destructive` reads as `destructive:` in the bundle while `"destructive-secondary"`
stays quoted. `destructive` looked missing for that reason alone. Check enums against the
component **source**'s map (bounded to the map's line range — `SIZE`'s `large`/`small`
keys otherwise leak in), not the minified bundle.

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

**2026-08-27 — guess confirmed wrong, fixed:** The next audit (4,376 of 4,624 tokens still unclassified) confirmed the syntax guess above was wrong — the actual contract is `@kind other` (no colon, lowercase, space-separated), attached same-line or immediately before the declaration. Fixed all 14 (`zIndex`/`motion`/`blur` all became `other` — those aren't in the confirmed color/spacing/radius/shadow/font vocabulary). Also found and fixed 13 more `tokens.css` custom properties that don't match the naming-convention scan: `border-input-*`/`border-table-*` → `@kind color` (they're color aliases), `focus-ring-*` → `@kind shadow` (they're box-shadow values). That's 27 total in `tokens.css`.

The overwhelming majority of the 4,376, though, was never `tokens.css` at all — it was the vendored `vendor/fontawesome/css/all.min.css`: 4,378 custom-property declarations (the `--fa` glyph-content property repeated once per icon selector, plus ~16 unique `--fa-*` internals like `--fa-style-family-classic`). Annotated all of them via a one-shot regex substitution (insert `/* @kind other */` before each declaration's terminating `;` or `}`) rather than by hand — verified correct via an exact byte-length diff (4378 × `" /* @kind other */".length` = 78804) and a clean 40/40 render check (icons render identically). See "Re-sync risks" below — this is a vendored file and will need the same substitution re-applied on any future Font Awesome version bump.

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

**Superseded 2026-08-27:** the user explicitly asked for the vendored Font Awesome internals to be annotated too (not excluded) — see the entry above. Both the `@kind` syntax guess AND the "out of scope" decision here turned out wrong; keeping this entry for the history but the current state is: all 4,378 FA declarations ARE annotated, via a machine-applied regex, not by hand.

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
per `docs/product/cube-addon-design-spec.md` and a much more detailed follow-up spec) implemented
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

## 16 new components built from real Figma pulls; naming audit re-verified against current kit (2026-08-27)

**Task 2 — missing families.** The user's audit cited 90 Figma families vs 40 built (50 missing). Pulled the real family list directly via `list_file_components_for_code_connect` on fileKey `Q7G87Bmjx2aYNVDKYLlBaG` rather than trust the raw count: 280 published entries (57 component sets + 223 standalone components, 215 of which are individual icon glyphs on the "Icons" page — not separate families). After removing icon-glyph noise, internal sub-parts (`_parent`, `header`, `Master button`), and duplicate/instance-path artifacts, the real count was **~23 distinct missing families**, several of which turned out to already be covered by existing composites (Table's header/cell families → `Table.jsx`+`TableCells.jsx` already handle these; `Segmenented button block` → already covered by `SegmentedButton`'s `fullWidth` prop; `Button group/block` → same composition as `Button group`, not a separate variant).

Built 16 new components (all flat `components/<Name>.jsx` + hand-written `components/<Name>.d.ts`, matching this repo's existing plain-JSX layout — NOT the nested `components/<Name>/<Name>.jsx` shape, which is the ds-bundle upload format, not this repo's source layout) via 5 parallel subagents, each pulling live `get_design_context` from the real file: `Logo`, `Favicon`, `FeedbackButton`, `Toast`, `PortalSideBarNav`, `SidenavIcon`, `CompanySwitcher`, `HelpMenu`, `UserDropdown`, `Breadcrumbs`, `AiPromptBar`, `TabGroup`, `FilterDropdown`, `SearchAndFilter`, `ButtonGroup`, and (built directly, not via subagent) `AppsIcon`.

**Figma tool gotcha hit by 3 of 5 subagents:** they defaulted to `plugin:figma:figma`'s `get_design_context`, which is a DIFFERENT, unauthorized Figma MCP server — got a "needs OAuth" dead end. The working, already-authenticated server is `mcp__e3b9232a-cce4-4558-9af5-73f9834ad683__*`. Future sessions/subagents: name the exact tool prefix explicitly in the prompt, don't just say "use Figma" or "call get_design_context."

**Real asset handling:** `Logo`/`Favicon` (brand marks) and `AppsIcon` (PowerPoint/Excel/Slack/Teams/Claude/ChatGPT/Google Slides/Sheets brand logos) download real SVGs from Figma into `components/assets/` rather than hand-drawing replicas, per the design-to-code skill's asset rule. `PortalSideBarNav`'s Apps grid substituted generic Font Awesome glyphs for a few third-party brands (ChatGPT/Claude/Sheets/Slides/Teams) instead of downloading real assets — a minor inconsistency with the AppsIcon approach, left as-is; worth reconciling on a future pass if those icons matter more than as illustrative nav entries.

**Build-breaking bug found and fixed:** `build.mjs`'s esbuild config had no loader for `.svg`, so any component importing an SVG asset (`Logo`, `Favicon`, `AppsIcon`) failed the build with `No loader is configured for ".svg" files`. Fixed by adding `loader: { ".svg": "dataurl" }` to the shared esbuild config — SVGs now inline as data URIs in the bundle, no separate asset files needed at runtime.

**AppIcon vs AppsIcon — genuinely two different components, not a naming collision.** Pulling real Figma data for "Apps icons" (node 52:1982) revealed it's a completely different icon set (PowerPoint/Slides/Excel/Sheets/Slack/Teams/Claude/ChatGPT — productivity/AI tools) than the pre-existing `AppIcon.jsx` (Salesforce/NetSuite/QuickBooks — CRM/ERP data sources), which was originally built as a guess without Figma access. Kept both: `AppIcon` (data-source tiles, confirmed no kit equivalent) and the new `AppsIcon` (matches the real "Apps icons" family). Updated `AppIcon.jsx`'s header comment to drop the stale "flag to update" note now that this is confirmed, not a guess.

**Portal Header collision caught before it happened.** Batch B's assignment included building "Portal Header"/"Library Portal Header" as new components — but `PageHeader.jsx` already exists, sourced from an older sibling Figma file's version of the same family (different node id, same concept). Redirected the subagent mid-run to compare against the real current spec instead of building a duplicate; it confirmed `PageHeader` already covers both hierarchy variants closely enough, and reported two real spec drifts for a future pass: (1) the kit's "secondary" variant puts action buttons on the breadcrumb row → maps to `topActions`, not `actions`, not obvious from the current JSDoc; (2) the "primary" variant has a helper-text + "Last Sync" badge combo `PageHeader` doesn't support.

**Task 3 — naming audit, re-verified against the current kit rather than trusted at face value.** The user's example list included `Banner`, which turned out to be a false positive — `Banner.jsx` already cites an exact Figma match (node 179:23016) confirmed in an earlier sync (2026-08-19 entry above). This suggests the "25 misnamed" figure the user relayed may itself be stale or approximate, not a fresh machine-generated list — worth keeping in mind for any future audit report from this self-check.

For the rest, added an explicit `// Kit vocabulary: ...` comment to every component's file header confirming its relationship to the current kit (exact match already documented as source-of-truth citations for `Radio`/`SegmentedButton`; explicit "no matching family, confirmed intentional" for the addon-specific composites `AccordionSection`, `AddonSidebar`, `AddonTopNav`, `AnalyzePanel`, `BuildPanel`, `ExpandCollapseControl`, `PublishPanel`, `TablesPanel`, `CubeAddonSidebar`, `FilterField`, `RangeSelector`, `Modal`, `Text`, `SourceCard`, `TaskCard`; explicit "confirmed intentional deviation" for `Drawer` (kit's `Drawer_d`, `_d` suffix deliberately dropped) and `ImportDrawer` (sourced from a different, older Figma file); `TableCells`/`Cell` noted as covering the kit's "Cell Icon"/"Table cell lead action" ideas as a generic toolkit rather than 1:1; `PageHeader` noted as the kit's "Portal Header" family with the two drifts above. Did NOT add a new field to `.design-sync/config.json` for this — the schema is strictly validated by the converter scripts and an unrecognized key fails the build; an in-file comment (which flows into the generated `.prompt.md`) is the safer machine-adjacent confirmation mechanism per the user's "comment or sync config" instruction.

**Task 3 follow-up — the initial "confirmed intentional" comments checked the wrong Figma file, so the self-check kept flagging the addon components.** Those comments cited "Folio Design System Beta" (`Q7G87Bmjx2aYNVDKYLlBaG`), the main kit — but the addon components were actually designed in the separate "Add-Ons" file (`kmQDBYBQPuG9bt90qedB6A`). Re-checked against `get_design_context` on node `6399:17463` (the "Analyze" state) in that file and found two real, evidence-backed rename targets:
- `PublishPanel` → **`PublishCard`** — its collapsed instance in Figma is literally named "Publish Card".
- `TablesPanel` → **`TablesCard`** — its collapsed instance is factored into its own named component, and Figma's own generated reference code names the function `TablesCard` (node 5167:16310, data-name "Tables Card").
Both renamed across `components/`, `index.js`, `.design-sync/config.json`'s `componentSrcMap`, and `CubeAddonSidebar.jsx`'s imports/usages, then pushed via `DesignSync` (write new `PublishCard`/`TablesCard` dirs + bundle/styles, delete the old `PublishPanel`/`TablesPanel` dirs, re-write `_ds_sync.json` last).

For the remaining addon components, re-checked against the same "Add-Ons" file and confirmed (with reasons, not just "no match") that no rename applies: `AddonSidebar`'s content maps to that file's "Drawer" frame, but `Drawer.jsx` already exists as the kit's own side-drawer — renaming would collide. `AddonTopNav`'s top bar and `BuildPanel`'s open-state body are inline, unfactored Figma markup with no component name to adopt. `AccordionSection`'s open/closed header pattern only gets factored into named components at the two card states (`PublishCard`/`TablesCard`), not as a wrapper itself. `AnalyzePanel`'s underlying frame is literally named "Product Newsletter Card" — confirmed leftover copy-paste residue from an unrelated task-management template (sibling layers named "Task Management"/"Add Task"), not a deliberate name worth adopting. Updated each of these five components' header comments to cite the correct file and this reasoning instead of the wrong-file citation.

**Task 3, closing note — the self-check's naming finding is not a reliable per-component signal, and should stop being chased as one.** After the `PublishCard`/`TablesCard` rename synced clean, the next report repeated the *same* "33 components named outside kit vocabulary" finding, still including `AccordionSection`/`AddonSidebar`/`AddonTopNav`/`BuildPanel`/`AnalyzePanel`/`PublishCard`/`TablesCard`. Asked the user for the finding's literal text (not a paraphrase) to check for a specific confirmation mechanism — there isn't one; it's fixed boilerplate ("rename to the kit's vocabulary or confirm they're intentional additions") with no named file, marker, or field. More importantly, the literal 10-name sample it gave included **`Banner`** and **`Drawer`** — both of which already have exact, cited, previously-confirmed Figma matches (`Banner` → node 179:23016, confirmed 2026-08-19; `Drawer` → kit's `Drawer_d`, documented above). A check that still flags components with a verified correct match isn't testing "does this name exist in the kit" per-component — it reads as a static name-string list that isn't recomputed against current repo state (comments, `.d.ts`, `.prompt.md` content) at all. Chasing it further would mean either renaming components already proven correct, or inventing an unverifiable "confirmation" format on spec. Decision: stop treating this specific finding as actionable per-component signal. The two real, evidence-backed renames (`PublishCard`, `TablesCard`) already happened; everything else in this family has a documented, Figma-checked reason to keep its current name, and that documentation is the correct end state regardless of whether this self-check clears.

## JetBrains Mono removed — DM Sans is now the sole typeface (2026-09-01)

**2026-09-01:** Per user decision, JetBrains Mono was removed from Folio entirely (CLAUDE.md, `Text.jsx`, `Input.jsx`, `Card.md`, `.design-sync/conventions.md`, `.design-sync/config.json`'s `runtimeFontPrefixes`). `Text`'s `mono` prop was deleted outright (it only ever switched `fontFamily`; once that branch was removed it was dead weight forcing `fontWeight: 400`) — the `.design-sync/previews/Text.tsx` `MonoData` export was removed along with it, since it existed solely to demo the mono variant. Re-synced: only `Text`'s render hash changed (Input's mono removal didn't change its own hash — check why if that's surprising later, but the render check came back clean either way). Regraded both remaining `Text` cells (`ColorOverride`, `Scale`) `good` from the fresh sheet. **If any future component reintroduces a monospace/data-font treatment, it should use DM Sans + `font-variant-numeric: tabular-nums` or similar CSS, not a second typeface** — CLAUDE.md now states DM Sans is the only typeface, no exception for numeric/data content.

## The add-on prototype exists in TWO remote copies and NEITHER is in this repo (2026-09-03)

**2026-09-03:** The interactive add-on prototype lives only in the claude.ai/design project, as two near-identical hand-authored `sc-if` templates:

- `templates/cube-addon-sidebar/CubeAddonSidebar.dc.html` — standalone, 320px sidebar on a gray page
- `templates/cube-addon-sidebar-sheets-host/CubeAddonSidebar.dc.html` — the same sidebar embedded in `GoogleSheetsHost.dc.html`

Neither is mirrored locally, and neither uses the packaged `AccordionSection`/`BuildPanel`/`PublishCard` components — they're 78KB of inline markup with their own `state = { … }` block. **A fix to `components/*.jsx` does not reach them.** Fetch, patch, and re-upload the template itself.

This caused a real, confusing bug: a session asked to fix the empty-sheet default state edited the **standalone** copy while the preview pane was showing the **sheets-host** copy, then reported success. The render didn't change, because the two files had diverged (`analyzeOpen: true` in one, `publishOpen/tablesOpen: true` in the other). **When editing the add-on prototype, patch both copies in the same pass and say which one the preview is showing.**

Empty-sheet default is now `buildOpen: true, analyzeOpen: false, publishOpen: false, tablesOpen: false` in both, matching `components/CubeAddonSidebar.jsx`. Confirmed with the user on 2026-09-03: on an empty sheet, Build is the only actionable section.

## AccordionSection: no children ⇒ never renders open (2026-09-03)

**2026-09-03:** `AccordionSection` used to drive the body wrapper, the tinted background, the up-chevron, and `aria-expanded` off the `open` prop alone. A section given `open` but no `children` therefore rendered a tall blank padded card promising content that wasn't there — which is exactly how the add-on demo's Publish and Tables sections looked, since they were created with no children at all. Now `isOpen = open && Children.toArray(children).length > 0` drives all four. `templates/cube-addon-demo/CubeAddonDemo.dc.html` was also wired up with real `PublishCard`/`TablesCard` children and switched from single-active `openSection` to independent `openSections`, matching the accordion rule documented in `CubeAddonSidebar.jsx`.

Note this is a **bundle-level** fix: in `package` shape the per-component `ds-bundle/components/general/*/*.jsx` files are only re-export shims, so `remote-diff` correctly reported `AccordionSection` **unchanged** (its preview render is byte-identical) while flagging `bundle: true`. Don't read "unchanged" as "my edit didn't land" — check `ds-bundle/_ds_bundle.js`.

## Uploaded SVGs come back changed — that is not corruption (2026-09-03)

**2026-09-03:** `DesignSync write_files` injects C2PA provenance into uploaded SVGs and round-trips them through an XML parser. A 38KB export came back as 50KB with an added `xmlns:c2pa` attribute, a `<metadata><c2pa:manifest>` block, and every self-closing `<rect .../>` expanded to `<rect ...></rect>`. **A byte comparison against the local file will fail.** It is still semantically identical and renders the same — `<metadata>` is a valid, non-rendering SVG element. To verify an uploaded SVG, normalise before comparing: strip `<metadata>`, strip `xmlns:c2pa`, collapse whitespace, and canonicalise self-closing tags. Element counts (paths, filters, gradients, masks) are the quick check.

## Illustration assets: reference as sibling files, don't inline

The web-report empty state lives at `templates/cube-addon-sidebar*/web-report-empty-state.svg` and is referenced as `<img src="./web-report-empty-state.svg">`. `./file.svg` is the established pattern for sibling assets in this project (see `templates/integrations-page`, `templates/boards-page/thumb-*.svg`).

Prefer this over inlining for anything non-trivial. The real export is 38KB — mostly a 400-path decorative backdrop — which would have grown each 76KB template by ~50%, and it carries Figma-generated ids (`filter0_d_5276_8740`, `mask0_5276_8740`, `paint0_radial_…`). Inline, those ids are global to the page and collide if the sidebar is ever rendered twice; as a separate document they stay scoped to the image. **Both prototype copies need their own copy of the asset** — template folders don't share assets in this project.

## AgentCard + IconBadge added, both with authored previews (2026-09-08)

**2026-09-08:** `IconBadge` had existed untracked in `components/` since before this session but was never in `index.js`'s sync path or `componentSrcMap`, so it had never reached the design project. `AgentCard` is new — a card showing one agent's response (avatar + name/role + status pill, message, optional trace chip), spec'd by the user. Both added to `componentSrcMap` and **both got authored `.tsx` previews** (`AgentCard.tsx` 4 cells, `IconBadge.tsx` 2 cells), all graded `good` — so neither joins the 29-component floor-card backlog.

`IconBadge` needed `cfg.overrides.IconBadge = {"cardMode": "column"}` — its `Hues` and `Sizes` stories lay six badges out in a row and tripped `[GRID_OVERFLOW]` on the default card mode. Fixed with the targeted loop (`node .ds-sync/lib/preview-rebuild.mjs --node-modules ./node_modules --out ./ds-bundle --components IconBadge --config .design-sync/config.json`), then re-validated: overflow gone, grades carried. Note that script's flags are **not** optional — bare `--components X` errors out with a usage line; it needs `--node-modules`, `--out` and `--config` too.

**The user's `AgentCard` spec carried values that don't exist in Folio, corrected on the way in** — worth recording because the same hexes will likely resurface from whatever generated it:
- `#693BEF` (twice: status pill fg and the avatar gradient's first stop) is not a Folio color. It reads as a transposition of `#6938EF` = purple-600, which `docs/foundation/BRAND-FOUNDATION.md` **retires** as the AI reference. Resolved by routing the pill through the real `Badge` (`color="ai"` → `#7A5AF8`, the one sanctioned flat AI hex) and the avatar through `--color-gradient-ai`.
- The `done` status paired `#ECFDF5` (emerald-50) with `#0D9488` (teal-600) — two different accent ramps, neither the system's success green. `Badge color="green"` replaced both.
- Card radius 12 → 16 (`Card.md`: "never `rounded-xl`" for card containers), and off-grid `gap: 10` / `marginTop: 14` / `padding: 4px 9px` snapped to the 4px grid.

**Left as-specified, flagged not fixed:** the card's `name` renders Bold in cobalt-600, but `Card.md` says every standalone card title is `title-3` **Medium**, `gray-900`, "Don't substitute Bold or SemiBold here." That's a visual-identity call rather than token plumbing, so it wasn't auto-corrected — if AgentCard should match every other card title, it's a two-token change.

**Upload was scoped, deliberately excluding a new doc.** Uploaded the 8 component files, 2 `_preview/*.js`, bundle, `styles.css`, `README.md`, `fontawesome/**`, then `_ds_sync.json` last. Did **not** upload `guidelines/**`, because `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` is a new local doc that doesn't exist remotely and publishing it wasn't part of the request — the rest of `guidelines/docs/` is unchanged from what's already there. If a future sync needs the aux tree pushed, decide about that file explicitly rather than letting a glob carry it.

> **Resolved 2026-09-08 — this open question is now closed.** `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` was deleted from the repo (the project is standardising on Claude, so a ChatGPT-targeted instruction wrapper has no audience). Its unique chart rules — banned-from-series colors, the variance exception, chart chrome, and the form specs — were migrated into `archive/cube-brand-design-system/README.md` § "Charts & data display" first; the named board themes already lived in `docs/product/boards_color_theme_project_summary.md`. Since it never existed remotely, **no remote deletion is required** — a future `guidelines/**` push is now safe to let a glob carry.

## Reorg publish — 18 written, 15 deleted by exact path (2026-09-11)

**2026-09-11:** Published the repo reorg's aux tree (commit `91192b0`). This is the
first sync where the **delete list was non-empty while the diff's own
`upload.deletePaths` was empty**, so it is worth recording how that was resolved.

The reorg moved `docs/*.md` into `docs/foundation|product|process/`, moved
`glass-ui-style.md` to `brand/`, added `brand/BRAND.md` + `docs/README.md`, and
archived `MARKETING-DESIGN-SYSTEM.md`. The anchor-based diff tracks *components*, not
guideline paths, so it reported `deletePaths: []` — but 15 remote guideline paths were
genuinely orphaned by the move. Left alone they would have sat alongside the new ones as
stale duplicates, which is exactly the "design project serves a superseded rule" failure
the reorg existed to fix.

**Resolution: enumerate all 15 exact paths in `finalize_plan`'s `deletes`, never a glob.**
That honors the rule in the section below (whose point is "only those exact paths, never
a directory glob") while still removing real orphans. Deleted:
`guidelines/glass-ui-style.md` plus the 14 flat `guidelines/docs/*.md`
(including `MARKETING-DESIGN-SYSTEM.md`, the superseded doc).

Wrote 18: `guidelines/index.md`, `brand/BRAND.md`, `brand/glass-ui-style.md`,
`docs/README.md`, `docs/foundation/` ×3, `docs/process/` ×7, `docs/product/` ×3,
`tokens/cube-colors.md`. Then `_ds_sync.json` last, as always.

**Verified after the fact via `list_files`:** all **12** remote-only hand-authored files
survived (the whole point of the rule below), remote `guidelines/` now holds 30 files
(12 hand-authored + 18 generated), and no flat `guidelines/docs/*.md` remains. A
follow-up `npm run design-sync` reported `upload: nothing (no-change re-sync)`,
confirming the anchor and the remote agree.

`guidelines/index.md` was safe to overwrite: the remote copy listed only the 17
generated files, never the 12 hand-authored ones, so nothing was lost from it.

`fontawesome/**` was included in the plan's `writes` per the standing rule below but not
re-uploaded — the bundle and styling were unchanged (`bundle: false`, `styling: false`)
and the remote copy was already correct.

## `guidelines/` holds 12 remote-only files — never use a `guidelines/**` delete glob (2026-09-11)

**2026-09-11:** A docs-only re-sync (`upload: aux`) surfaced this. The build emits
**17** files under `ds-bundle/guidelines/` (`docs/*.md` ×14, `brand/glass-ui-style.md`,
`index.md`, `tokens/cube-colors.md`). The project holds **29**. The extra 12 are
hand-authored in claude.ai/design and have no local source:

```
guidelines/Colors.html          guidelines/button-spec-handoff.md
guidelines/Effects.html         guidelines/documenting-interactive-components.md
guidelines/FocusRings.html      guidelines/icons.md
guidelines/Radii.html           guidelines/prompt-template-interactive-component.md
guidelines/Shadows.html         guidelines/table-cells.md
guidelines/Spacing.html
guidelines/colors.html
```

The base skill's incremental close-out puts `guidelines/**` in the plan's
**deletes** and then deletes every remote path the local `ds-bundle/` doesn't
contain. On this repo that would destroy all 12. They are the same class of
hazard as the server-provisioned `fonts/DMSans-*.ttf` already documented above,
but unlike the fonts they are *authored content*, not regenerable.

**Rule: on this repo, pass `deletes: []` to `finalize_plan` unless the diff's own
`upload.deletePaths` is non-empty** — and then pass only those exact paths, never
a directory glob. The anchor-based diff already computes real deletions
(component renames land there, as `PublishPanel`/`TablesPanel` did on
2026-08-27); the glob adds nothing except the ability to delete things nobody
asked to delete. Note `finalize_plan` **requires** the `deletes` key — omitting
it errors; pass an explicit empty array.

## Known render warns

- **`AppsIcon` is a canary for a skipped Font Awesome copy.** Verified 2026-09-03: pre-copy, validate flags `[RENDER_BLANK]` on *both* `AppsIcon` and `SidenavIcon`; post-copy, only `SidenavIcon` remains (55/56 clean). `AppsIcon` renders nothing but its icon glyph, so it drops under the 5KB floor exactly when `fontawesome/` is absent. If you ever see `AppsIcon` in this list, the Font Awesome copy did not run — don't whitelist it, fix the pipeline.
- `SidenavIcon` — genuinely tiny (14px glyph in a 22px slot), same class of warning as `StatusDot`. `[RENDER_BLANK]` fires because the floor-card PNG is <5KB, not because it's broken — confirmed via screenshot the icon renders correctly.

(All other warnings were triaged as expected behavior, documented above.)

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
- **`vendor/fontawesome/css/all.min.css` now carries hand-inserted `@kind other` annotations** (2026-08-27, 4,378 of them) — this is a vendored third-party file. Any future Font Awesome version bump that re-copies this file from a fresh `fontawesome-pro-*-web/` download will wipe the annotations and the self-check will flag ~4,378 unclassified tokens again. Re-apply via the same regex, not by hand: `content.replace(/(--[a-zA-Z0-9-]+\s*:\s*(?:"[^"]*"|[^;}]+?))(;|\})/g, '$1 /* @kind other */$2')` against the freshly-vendored file, then verify the replacement count matches the file's total custom-property declaration count before committing.
- **16 more components uploaded as floor cards 2026-08-27** (see above) — no authored preview yet: `Logo`, `Favicon`, `FeedbackButton`, `Toast`, `AppsIcon`, `PortalSideBarNav`, `SidenavIcon`, `CompanySwitcher`, `HelpMenu`, `UserDropdown`, `Breadcrumbs`, `AiPromptBar`, `TabGroup`, `ButtonGroup`, `FilterDropdown`, `SearchAndFilter`. That's 29 total floor-card components now (13 from before + these 16) — all verified render-clean via screenshots this run, but none have a dedicated grade, so a future regression in any of them is only caught by the render check's crash/blank detection, not visual review.
- **`build.mjs` now has an `.svg` loader** (`dataurl`) — added 2026-08-27 because `Logo`/`Favicon`/`AppsIcon` import real brand SVGs. If a future component needs a different asset handling strategy (e.g. `.png`, or SVGs too large to inline as data URIs), extend the `loader` map rather than reverting this one.
- **`IconBadge` depends on `cfg.overrides.IconBadge.cardMode: "column"`** (2026-09-08) — its stories are horizontal rows of six badges and re-flag `[GRID_OVERFLOW]` immediately if that override is lost the way the `Button`/`Drawer` ones were in the 2026-08-13 reorg.
- **`AppIcon` vs `AppsIcon`** are two different, confirmed-intentional components (data-source tiles vs productivity/AI-tool brand icons) that happen to have very similar names — don't merge them or "fix" the near-duplicate name without re-reading both files' header comments first.
- **`conventions.md` hand-enumerates two prop enums that nothing keeps in sync.** Its "Where to look" section lists every `Button` `variant` and every `Text` `variant` by hand. Those lists live in `components/Button.jsx`'s `VARIANTS` map and `components/Text.jsx`'s `VARIANTS` map, and **no build step cross-checks them** — the 2026-09-11 re-sync found `subtle-gray` had been missing from the Button list (added then). **Add a variant to either component and you must update `conventions.md` in the same commit**, or the design agent silently never uses the new variant. The enum check is part of the conventions validation pass every re-sync runs; the root fix is `cfg.dtsPropsFor` (see "No TypeScript / no `.d.ts` files" above) so the enums live in the `.d.ts` contract the agent actually reads, instead of being restated in prose.
- **Conventions-header paths must stay bundle-relative.** `conventions.md` survived the 2026-09-11 repo reorg untouched *only* because every path it names is bundle-relative (`components/general/<Name>/…`, `styles.css`, `fontawesome/css/all.min.css`). A repo-relative path in that file (`docs/…`, `tokens/…`) would rot on the next reorg and would ship the rot to the design agent. Keep it that way.

## A component *implementation* change never shows up in the diff's `changed` list (2026-09-15)

Editing `components/Tab.jsx` produced `changed: []` with `bundle: true, styling: true`
and an unchanged `Tab` `sourceKey`/`renderHash`. That is **not** a missed change — it's
how the package shape works, and it's worth knowing before you go hunting:

`ds-bundle/components/general/<Name>/<Name>.jsx` is a **161-byte re-export stub**:

```js
// Re-export of folio-design-system@1.0.0 Tab. Implementation is in the root _ds_bundle.js (window.FolioDS).
Object.assign(window, { Tab: window.FolioDS.Tab });
```

`sourceHashes`/`sourceKeys` hash those stubs, and a stub only changes when a component is
added, removed or renamed. The actual implementation ships in `_ds_bundle.js`, so a props
or styling change moves `bundleSha12` (and usually `styleSha`) and nothing else.

**Consequences:**
- `upload: bundle | styling` *is* the complete plan for a component implementation change —
  there is no per-component file to push, because the stub didn't change.
- Don't read `changed: []` as "my edit didn't land". Verify with
  `grep '<your new code>' ds-bundle/_ds_bundle.js` instead.
- The `changed` list is only meaningful for structural moves (add/remove/rename), which is
  also why `capture` reports "no component sources moved" on these runs.

Corollary for the anchor: after uploading, refresh the cache with
`cp ds-bundle/_ds_sync.json .design-sync/.cache/remote-sync.json` — otherwise the next run
re-reports the same `aux`/`bundle` deltas against a stale anchor.

## FlowCard + FlowRow added (2026-10-08)

**2026-10-08:** The Source -> Connection -> Destination overview was hand-built twice (CSS classes in `templates/integrations-page/Integrations.dc.html`, plus a planned copy in the Tables page). Promoted to two components, `FlowCard` (one 300x164 card) and `FlowRow` (the tinted 1fr 40px 1fr 40px 1fr panel with arrows), so one fix plus one sync reaches every page. Both added to `index.js` and `componentSrcMap`, with hand-written `.d.ts` files (real prop contracts, unlike most of the package) and authored previews (`FlowCard.tsx` 5 cells, `FlowRow.tsx` 1 cell), all graded `good`.

- `FlowRow` needed `cfg.overrides.FlowRow = {"cardMode": "column"}` and the preview wraps the panel in `zoom: 0.62`: the panel is ~1028px wide (three fixed 300px cards), wider than the preview card. Fixed with the targeted `preview-rebuild.mjs` loop.
- Actions are 24x24 `plain-blue` icon buttons pinned 16px from the card's top-right. `Button` only offers 28/32 icon-only sizes, so the 24px comes from `style={{ width: 24, height: 24 }}`. If a 24px `Button` size is ever added, drop that override.
- The old inline `subtle-blue` overrides (cobalt-50 fill, cobalt-500 text, pill radius) are gone: they equalled the variant's defaults and only served to disable its hover colour.
- The Connection card's button is 28px, not the old squeezed 25px: body rows sit 8px under the header (`marginTop: -8` on the body) so the content fits the 164px card.
- Titles truncate with an ellipsis and show the full text in a `Tooltip` only when clipped (measured with a `ResizeObserver`).
- `templates/integrations-page/tim-flowcard-specimen.html` renders every variant locally; it needs `ds-bundle/` and staged logos, neither of which is committed.
- **Hand-written `.d.ts` must keep every shape inline in the Props interface.** The converter copies only `<Name>Props` into the emitted `.d.ts`, so named helper types (`FlowCardStatus` and friends) end up referenced but undefined, and `ReactNode` unions collapse to `any` (no `@types/react`). `FlowCard.d.ts` types `icon` and `actions` as their object forms only for that reason.
- **Uploaded 2026-10-08:** 8 component files, 2 `_preview/*.js`, `_ds_bundle.js`, `_ds_bundle.css`, `styles.css`, `README.md`, `.ds-build-meta.json`, then `_ds_sync.json` last. `fontawesome/**` was in the plan's `writes` per the standing rule but not re-uploaded (the remote copy was already correct). A follow-up sync reported "the project already matches this build".
- **Templates are not part of this sync.** `Integrations.dc.html` lives in the design project separately; after this sync it still needs `F.FlowRow` / `F.FlowCard` swapped in there (DesignSync `get_file`, patch, re-upload).
