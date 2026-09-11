# CLAUDE.md — Cube Design System Rules

> This file teaches Claude how to build UI that matches the Folio Design System Beta.
> Place at your project root. Claude reads it automatically.

---

## 0. Session Start

Always read these files at the start of every session before doing anything:

```
Read the following before doing anything:
- CLAUDE.md
- tokens/tokens.css
- tokens/cube-colors.md
- tokens/typography.css
- docs/foundation/cube-personas.md
- templates/shell.html

Confirm you have loaded the Folio design system context.
```

### Project Files Reference

| File | Purpose |
|---|---|
| `CLAUDE.md` | Design system rules — this file |
| `tokens/tokens.css` | Spacing, radius, shadows, focus rings, z-index, semantic color aliases |
| `tokens/cube-colors.md` | Full color palette with all ramps and Tailwind registration |
| `tokens/typography.css` | Type scale tokens and utility classes |
| `docs/foundation/cube-personas.md` | User personas — Max, Ava, Tobias, Chris |
| `templates/shell.html` | Base app layout — sidebar, nav, shell structure |
| `docs/process/DESIGN-PLAYBOOK.md` | How to structure prompts and run design sessions |
| `docs/process/DESIGN-DECISIONS.md` | Dated log of *why* a rule changed — evidence and what it replaced. Explains the specs; never overrides them |
| `docs/foundation/BRAND-FOUNDATION.md` | Facts shared by every persona (type, icons, chart series, radius, voice) — read before persona-specific rules |
| `brand/glass-ui-style.md` | Glass/isometric marketing graphic recipe — panels, layout, background. Charts over glass live in `docs/foundation/CHART-RULES.md` § "Glass-surface charts" |
| `templates/chart-rules-mock/` | Live specimen — decorative chart treatment, dependency-free |

### Repo layout — which folder governs what

Reorganized 2026-09-11 by *audience* rather than by file type, so that brand and
marketing work has a home of its own. Full rationale in `docs/process/DESIGN-DECISIONS.md`.

| Folder | Audience | Index |
|---|---|---|
| `tokens/`, `components/` | Shared foundations + the Folio app's React components | — |
| `docs/` | Rules and process, grouped `foundation/` · `product/` · `process/` | `docs/README.md` |
| `brand/` | **Marketing & brand** — site, graphics, slides, marketing tokens | `brand/BRAND.md` |
| `templates/` | App page shells **and** uploaded design-project specimens (two kinds — read the index first) | `templates/README.md` |
| `prototypes/` | One-off component prototypes, local only | — |
| `archive/` | Superseded and legacy material — **never** a source of current rules | — |

> **Building marketing, brand, or slide material?** Read `brand/BRAND.md`, not this file.
> This file governs the product app. `docs/foundation/BRAND-FOUNDATION.md` holds what
> both share, and takes precedence over surface-specific rules on shared facts.

> **Never take a rule from `archive/`.** It holds `MARKETING-DESIGN-SYSTEM.md` (a
> superseded marketing draft) and `cube-brand-design-system/` (a legacy artifact of the
> retired "Cube AI" branding system, carrying retired colors, a shifted radius scale, and
> retired Lucide/Source Sans 3 mandates). Both are kept as history only.

**Do not move these paths** — they are hardcoded in `.design-sync/config.json` and moving
them breaks the build or the sync: `components/**` (58 entries in `componentSrcMap`),
`tokens/tokens.css` (`cssEntry`), `tokens/typography.css` (`tokensGlob`),
`vendor/fonts/dm-sans/dm-sans.css` (`extraFonts`), and every `templates/*/` specimen dir
(their `ds-base.js` encodes the remote path).

> The glass graphics in `brand/graphics/` are the **exception** — they are brand-only
> and never uploaded to the Folio design project, so no remote path depends on where
> they sit. That is why they could move out of `templates/` on 2026-09-11 when the
> other specimen dirs could not.

---

## 1. Project Stack

- **Framework:** React + TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Components:** shadcn/ui (Radix primitives)
- **Fonts:** DM Sans (sole typeface — replaces Lato/Montserrat)
- **Build:** Vite

---

## 2. Naming Conventions

### File Structure
```
src/
├── components/
│   ├── ui/                # shadcn primitives (button, input, dialog, etc.)
│   ├── cube/              # Folio Design System components (no Cube prefix)
│   │   ├── Drawer.tsx     # Side drawer shell
│   │   ├── Table.tsx      # Data table with sort headers
│   │   ├── SourceCard.tsx # Collapsible lifecycle source card
│   │   ├── Badge.tsx      # Lifecycle, Active, Status badges
│   │   ├── Banner.tsx     # Warning, Error, Info banners
│   │   ├── Segmented.tsx  # Segmented control (toggle group)
│   │   └── Toggle.tsx     # Small toggle switch
│   └── layout/
│       ├── Sidebar.tsx
│       └── TopHeader.tsx
├── styles/
│   └── globals.css            # Theme tokens + Tailwind config
├── lib/
│   └── utils.ts               # cn() helper, shared utilities
└── pages/
    └── Scenarios.tsx           # Full page compositions
```

### Component Naming
- **shadcn primitives:** Lowercase kebab-case files (`button.tsx`, `dialog.tsx`) — default shadcn convention
- **Folio components:** PascalCase, no prefix (`Drawer.tsx`, `SourceCard.tsx`, `Button.tsx`)
- **Layout:** PascalCase, no prefix (`Sidebar.tsx`, `TopHeader.tsx`)
- **Pages:** PascalCase, singular noun (`Scenarios.tsx`, `Dimensions.tsx`)

### CSS Class Naming
- Use Tailwind utility classes exclusively — no inline styles, no CSS modules
- Cube tokens as custom Tailwind colors: `bg-cube-cobalt-500`, `text-cube-gray-900`
- Use `cn()` helper from `lib/utils.ts` for conditional classes

---

## 3. Design Tokens (from Figma Variables)

### Colors

The full color palette lives in `tokens/cube-colors.md`. Below is a quick-reference for the tokens used most in components.

#### Primary Color
**Cobalt** is the primary brand color — it replaces the old Blue 500. `cube-cobalt-500` (`#173D82`) is the base hue and the resting/interactive stop used for buttons, toggles, and active indicators. `cube-cobalt-600` (`#122E64`) is the hover escalation, not the resting state. Use `cube-cobalt-*` for all primary actions; use `cube-blue-*` for links and navigation only.

#### Color Rule

| Stop range | Usage |
|---|---|
| `500` | Interactive UI resting state — primary button fill, active/selected borders, toggle "on" |
| `600` | Hover state for anything at `500` — not the resting color |
| `700` | Pressed state for anything at `500`/`600`; also colored text/icons |
| `700–800` | Text & icons — colored headings, labels, icons on light backgrounds |
| `50–200` | Surfaces & backgrounds — badge fills, banner backgrounds, tinted chips |
| `25–50` | Chip & page backgrounds — lightest tints for subtle surface differentiation |

#### Cobalt vs Blue

| Token | Use for |
|---|---|
| `cube-cobalt-*` | Primary buttons, CTAs, focus rings, active states, selected indicators |
| `cube-blue-*` | Links and navigation items only |

**Usage:** `bg-cube-cobalt-500`, `text-cube-gray-900`, `border-cube-gray-300`, etc.

#### Token usage flow — a worked example
Same fan-out pattern documented in `docs/foundation/BRAND-FOUNDATION.md`'s "Token usage flow"
section, worked here with a Folio-only case (this one doesn't apply to Cube Software):

```
GLOBAL TOKEN               SEMANTIC TOKENS               COMPONENT TOKENS              UI
--color-cobalt-500   ┬──  color-bg-fill-primary    ┬──  Button.primary.bg         →  primary button fill
   (#173D82)          │                              └──  Toggle.on.bg             →  toggle "on" state
                       │
                       ├──  color-border-active      ┬──  Input.focus-border       →  input focus ring color
                       │                              └──  SegmentedButton.active   →  active segment border
                       │
                       └──  color-border-accent      ──  Drawer.header-border      →  side drawer header rule
```

One global cobalt value, three semantic roles (fill, focus/active border, accent border),
each reused across more than one component — same shape as the AI-purple example, just
scoped to Folio's own primary color rather than the shared AI accent.

---

## 4. Typography

### Font Loading

Load the typeface via Google Fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

> **Note:** DM Sans is the only typeface in Folio — used for all UI text, including numeric and data-adjacent content. Do not use Lato, Montserrat, or JetBrains Mono.

---

### Type Scale

#### Display — DM Sans

| Token | Font Size | Line Height | Letter Spacing | Weights |
|---|---|---|---|---|
| `display-1` | 48px | 1.25 × / 60px | −2% | Regular, Medium, SemiBold, Bold |
| `display-2` | 36px | 1.33 × / 48px | −1% | Regular, Medium, SemiBold, Bold |
| `display-3` | 30px | 1.33 × / 40px | 0% | Regular, Medium, SemiBold, Bold |
| `display-4` | 24px | 1.33 × / 32px | 0% | Regular, Medium, SemiBold, Bold |

#### Title — DM Sans

| Token | Font Size | Line Height | Letter Spacing | Weights |
|---|---|---|---|---|
| `title-1` | 20px | 1.4 × / 28px | 0% | Regular, Medium, SemiBold, Bold |
| `title-2` | 18px | 1.55 × / 28px | 0% | Regular, Medium, SemiBold, Bold |
| `title-3` | 16px | 1.5 × / 24px | 0% | Regular, Medium, SemiBold, Bold |

#### Body — DM Sans

| Token | Font Size | Line Height | Letter Spacing | Weights |
|---|---|---|---|---|
| `body` | 14px | 1.43 × / 20px | 0% | Regular, Medium, SemiBold, Bold |

#### Caption — DM Sans

| Token | Font Size | Line Height | Letter Spacing | Weights |
|---|---|---|---|---|
| `caption-1` | 12px | 1.5 × / 18px | 0% | Regular, Medium, SemiBold, Bold |
| `caption-2` | 10px | 1.6 × / 16px | 0% | Regular, Medium, SemiBold, Bold |

---

### Tailwind Class Reference

```
/* Display */
display-1    font-['DM_Sans'] text-[48px] leading-[60px] tracking-[-0.02em]
display-2    font-['DM_Sans'] text-[36px] leading-[48px] tracking-[-0.01em]
display-3    font-['DM_Sans'] text-[30px] leading-[40px] tracking-[0]
display-4    font-['DM_Sans'] text-2xl    leading-8       tracking-[0]

/* Title */
title-1      font-['DM_Sans'] text-xl    leading-7  tracking-[0]
title-2      font-['DM_Sans'] text-lg    leading-7  tracking-[0]
title-3      font-['DM_Sans'] text-base  leading-6  tracking-[0]

/* Body */
body             font-['DM_Sans'] text-sm  leading-5  tracking-[0]  font-normal
body-medium      font-['DM_Sans'] text-sm  leading-5  tracking-[0]  font-medium
body-semibold    font-['DM_Sans'] text-sm  leading-5  tracking-[0]  font-semibold
body-bold        font-['DM_Sans'] text-sm  leading-5  tracking-[0]  font-bold

/* Caption */
caption-1          font-['DM_Sans'] text-xs     leading-[18px]  tracking-[0]
caption-2          font-['DM_Sans'] text-[10px] leading-4        tracking-[0]
```

---

### Usage Guidelines

| Context | Token | Weight |
|---|---|---|
| Page titles | `display-4` | Bold |
| Drawer & panel headers | `title-2` | SemiBold |
| Section headings | `title-3` | Bold |
| Default UI text | `body` | Regular |
| Emphasized body text | `body` | SemiBold |
| Table headers | `body` | Bold |
| Form labels | `caption-1` | SemiBold |
| Hint & helper text | `caption-1` | Regular |
| Metadata / micro labels | `caption-2` | Regular or Medium |

---

## 5. Border Radius

Folio Beta uses a high-border-radius / pill convention throughout. Never use `rounded-[4px]` for buttons.

| Element | Radius | Tailwind |
|---|---|---|
| Buttons, chips, badges, toggles, avatars | 9999px (pill) | `rounded-full` |
| Inputs, selects, textareas | 8px | `rounded-lg` |
| Cards, large containers, modals, drawers | 16px | `rounded-2xl` |

---

## 6. Component Specs

### Inputs & Selects
```
h-8 border border-cube-gray-400 rounded-lg px-2 py-[5px]
font-['DM_Sans'] text-sm text-cube-gray-900
placeholder → text-cube-gray-500

Hover:  border-cube-gray-600
Focus:  border-cube-cobalt-500 + box-shadow focus-ring-default
Error:  border-cube-red-500
```

### Buttons

| Variant | Classes |
|---|---|
| Primary | `h-8 px-4 py-2 rounded-full bg-cube-cobalt-500 text-white font-medium text-sm` (hover: `bg-cube-cobalt-600`, pressed: `bg-cube-cobalt-700`) |
| Secondary | `h-8 px-4 py-2 rounded-full border border-cube-cobalt-500 bg-white text-cube-cobalt-500 font-medium text-sm` |
| Subtle Blue | `h-8 px-4 py-2 rounded-full bg-cube-cobalt-50 text-cube-cobalt-500 font-medium text-sm` |
| Ghost | `h-8 px-4 py-2 rounded-full font-medium text-sm text-cube-gray-900` |
| Add Source | `h-8 w-full rounded-full border border-cube-cobalt-500 text-cube-cobalt-500 font-medium text-xs text-center` |

#### Cancel Button Variant Rule
`Cancel` (or any dismiss/back-out action) picks its variant based on whether the container already has a header `×` close control:

- **Has a header `×`** (most modals) → `Cancel` uses `ghost-gray`. The `×` already owns the dismiss action; `Cancel` is a low-emphasis echo of it, so it shouldn't compete visually.
- **No header `×`** (e.g. an inline edit-mode panel/bar) → `Cancel` uses `secondary`. It's the only way to back out, so it needs enough visual weight to read as a real, findable action.

Do not ask which variant to use for a Cancel button — check for a header `×` and apply this rule automatically.

#### Subtle Blue States
```
Resting: bg-cube-cobalt-50  text-cube-cobalt-500
Hover:   bg-cube-cobalt-100 text-cube-cobalt-600
Active:  bg-cube-cobalt-200 text-cube-cobalt-700
Focus:   + box-shadow focus-ring-default
```

#### Button Size Scale
| Size | Height | Padding | Font Size | Font Weight |
|---|---|---|---|---|
| large (default) | 32px | `px-4 py-2` | 14px (body) | medium (500) |
| small | 28px | `px-3 py-1.5` | 12px (caption-1) | medium (500) |

#### Icon-Only Buttons
Icon-only buttons are a fixed 32px × 32px square (28px × 28px at `small` size) — never rectangular.

Pass the icon through the dedicated `icon` prop, **not** as `children` and **not** as `leadingIcon`/`trailingIcon`. `Button` only applies the fixed square width and zero horizontal padding when `icon` is set and `children` is empty; passing an icon as `children` leaves the button unconstrained width. `aria-label` is required on icon-only buttons — `Button` throws if it's missing.

```tsx
<Button icon={<i className="fa-regular fa-bell" />} aria-label="Notifications" />
```

Use `fa-regular` icons at 14px (`large`) / 12px (`small`), matching the `iconSize` token — verify the icon name at fontawesome.com before using it.

#### Default Variant for Header Icon Buttons
`PageHeader`'s `topActions` and `actions` slots only accept the Folio `Button` component (see `components/PageHeader.jsx`) — never a raw `<button>`. For icon-only buttons in those slots (bell, import, edit, etc.), default to `variant="ghost-gray"` `size="large"` (32×32) unless the Figma reference or the user specifies a different variant. Do not ask which variant/size to use for a header icon button — apply this default automatically.

### Side Drawer
```
Container: w-[400px] h-full bg-white rounded-2xl p-4 shadow-lg
Header:    pb-4 border-b-2 border-cube-cobalt-500 flex justify-between items-start
Footer:    pt-4 mt-4 flex gap-2 justify-end
```
**shadcn:** Use `<Sheet side="right">` with custom width and header styling.

### Source Card (Collapsible)
```
Expanded:  bg-cube-cobalt-25 border border-cube-cobalt-100 rounded-xl p-4 flex flex-col gap-4
Collapsed: bg-cube-cobalt-25 border border-cube-cobalt-100 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer
Header:    font-semibold text-sm text-cube-cobalt-700
```
**shadcn:** Use `<Collapsible>` with custom trigger styling.

### Segmented Control
```
Container: flex gap-1 bg-cube-gray-200 rounded-full
Inactive:  flex-1 h-8 rounded-full font-semibold text-sm text-cube-gray-900 bg-cube-gray-200 border border-transparent
Active:    flex-1 h-8 rounded-full font-semibold text-sm text-cube-cobalt-500 bg-cube-cobalt-100 border border-cube-cobalt-500
```
**shadcn:** Use `<ToggleGroup type="single">` with custom item styling.

### Toggle
```
w-7 h-3.5 rounded-full
On:  bg-cube-cobalt-500
Off: bg-cube-gray-400
Knob: w-2.5 h-2.5 bg-white rounded-full
```
**shadcn:** Use `<Switch>` with custom size overrides.

### Badges
| Variant | Classes |
|---|---|
| Lifecycle | `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-cube-cobalt-100 text-cube-cobalt-800` |
| Active | `inline-flex items-center gap-0.5 pl-1 pr-2 py-[3px] rounded-full text-xs font-semibold bg-cube-gray-50 border border-cube-gray-300 text-cube-gray-800` + green dot |

### Banners
| Type | Classes |
|---|---|
| Error (soft) | `p-2 rounded-xl bg-cube-red-100 text-sm text-cube-red-800` |
| Warning | `p-3 rounded-xl bg-cube-warn-bg text-sm text-cube-warn-text` |
| Info | `p-3 rounded-xl bg-cube-info-bg text-sm text-cube-info-text` |
| Success | `p-3 rounded-xl bg-cube-success-bg text-sm text-cube-success-700` |

### Table
```
Container:  border border-cube-gray-300 rounded-xl p-4
Header row: bg-cube-gray-200 h-10 font-bold text-sm text-cube-gray-900
Body row:   bg-white h-12 border-b border-cube-gray-200 text-sm text-cube-gray-900
Sort icon:  text-cube-gray-500
```

### Shadows & Focus Rings

Effect styles pushed to Figma — use these token names in code:

| Token | Usage |
|---|---|
| `shadow-xs` | Subtle card lift |
| `shadow-sm` | Dropdown, tooltip |
| `shadow-md` | Modal, drawer |
| `shadow-lg` | Floating panel |
| `shadow-button-default` | Button resting state |
| `shadow-button-hover` | Button hover state |
| `focus-ring-default` | Standard input/button focus |
| `focus-ring-default-sm` | Compact component focus |
| `focus-ring-destructive` | Error state focus |
| `focus-ring-ai` | AI-powered component focus |

---

## 7. Icon System

**Font Awesome Kit** — loaded via CDN in `index.html`:
```html
<script src="https://kit.fontawesome.com/YOUR_KIT_CODE.js" crossorigin="anonymous"></script>
```
> Replace `YOUR_KIT_CODE` with the kit code from fontawesome.com → Kits. Do not commit the actual key to a public repo.

### Usage in HTML/JSX

`fa-solid` is the default style. A style class is always required alongside the
icon-name class — `fa-solid`/`fa-regular` selects the weight, `fa-house` selects
the icon.

```tsx
{/* Solid (default) */}
<i className="fa-solid fa-house" />

{/* Regular — when the design specifies it */}
<i className="fa-regular fa-bell" />
```

### Sizing & color with Tailwind

```tsx
<i className="fa-solid fa-xmark text-cube-gray-600" />
<i className="fa-solid fa-magnifying-glass text-sm" />

<span className="w-4 h-4 flex items-center justify-center">
  <i className="fa-solid fa-chevron-right text-cube-gray-500" />
</span>
```

### Rules
- Always use Font Awesome — do not use Lucide or other icon libraries
- Use `fa-solid` as the default style; switch to `fa-regular` or `fa-light` only when the design specifies
- **AI sparkle:** the AI moment uses `fa-solid fa-sparkles` — solid, consistently, across `Banner`, `Toast`, `AnalyzePanel`, `BuildPanel`, `AddonTopNav` and `PortalSideBarNav`
- Never guess icon names — verify against the vendored `fontawesome-pro-7.3.1-web/metadata/icons.json`, checking that the name exists and that the style you want is among its styles
- Apply color via Tailwind `text-*` classes on the `<i>` element

> Icon-only `Button`s are the one documented Regular case — see the Button
> section above (`fa-regular` at 14px/12px, matching the `iconSize` token).

---

## 8. Rules for Claude

### DO
- Always use Tailwind utility classes with Cube tokens (`bg-cube-cobalt-500`, not `bg-[#2667D8]`)
- Use Cobalt as the primary color — not Blue
- Use pill/`rounded-full` for all buttons, badges, chips, and toggles
- Use `rounded-lg` (8px) for inputs and selects
- Use shadcn primitives as the base, then customize with Cube token classes
- Use `cn()` for conditional/merged classes
- Keep components in `components/cube/` — no prefix, PascalCase only
- Match Figma measurements exactly: 32px input height, 48px row height, 400px drawer width
- Use DM Sans for all UI text — it is the only typeface in Folio
- Collapsible sections default to collapsed when data exists, expanded when empty
- Reference `cube-personas.md` when a feature targets a specific user — use persona context to inform UX decisions
- Use `templates/shell.html` as the base layout for all new screens — only add content inside `<main>`

### DO NOT
- Never use `rounded-[4px]` for buttons — use `rounded-full`
- Never use inline `style={{}}` attributes
- Never use arbitrary hex values — always use token classes
- Never use Lato or Montserrat — DM Sans only
- Never reference Blue 500 as primary — Cobalt is primary (`cobalt-500` resting/interactive, `cobalt-600` hover)
- Never use red borders for errors — use soft `bg-cube-red-100` banners
- Never put lifecycle rules in the create-new-scenario drawer
- Never use `<form>` tags in components (use event handlers directly)
- Never modify the sidebar, header, or shell structure when building new screens

### WHEN BUILDING NEW COMPONENTS
1. Check if a shadcn primitive exists (Sheet, Dialog, Switch, Collapsible, etc.)
2. Wrap it in a PascalCase component (no prefix) with Folio token styling
3. Export with clear prop types
4. Follow the collapsible pattern for complex sections (expanded/collapsed with chevron)
5. Keep drawer content scrollable with fixed header/footer

---

## 9. Figma Reference

| Resource | Link / ID |
|---|---|
| Folio Design System Beta | `Q7G87Bmjx2aYNVDKYLlBaG` |
| Cube Design System (legacy) | `u2JGuG2uQ9qVDRbBL5mZya` |

To pull design context: `Figma:get_design_context(fileKey, nodeId)`
To pull variables: `Figma:get_variable_defs(fileKey, nodeId)`

> Always reference the Folio file (`Q7G87Bmjx2aYNVDKYLlBaG`) for tokens and components. Use the legacy Cube file only when checking against existing production screens.

---

## 10. Design Sync

To push this package to the claude.ai/design project, run:

```
npm run design-sync
```

**Never call `node .ds-sync/resync.mjs` directly** — a `PreToolUse` hook will block you. On this repo its verdict is *always* `ok: false` and its capture stage is *always* skipped `prior_failure`, even on a perfectly healthy re-sync — `package-build.mjs` wipes `ds-bundle/` including the Font Awesome files that `tokens/tokens.css` `@import`s, so its own validate stage can never pass. Reading that verdict at face value means either believing a healthy sync failed, or missing a real failure inside the expected one. `npm run design-sync` puts the Font Awesome copy in the right place and produces the one trustworthy verdict; `exit 0` means genuinely clean.

Reading the driver is *not* blocked — `grep`/`sed`/`cat` on it are how you re-verify the `renderTier`/`pickCanary` logic that `.design-sync/run-resync.mjs` mirrors from it.

Fetch the anchor before syncing, or the diff reports every component as changed:
`DesignSync get_file _ds_sync.json` → `.design-sync/.cache/remote-sync.json`

Read `.design-sync/NOTES.md` before any sync work — it records the per-component decisions, the known render warnings (a warning **not** listed there is new and needs looking at), and the upload-plan rules.

### The add-on prototype is not in this repo

The interactive Cube add-on sidebar exists **only** in the design project, as two hand-authored `sc-if` templates that have drifted apart before:

- `templates/cube-addon-sidebar/CubeAddonSidebar.dc.html`
- `templates/cube-addon-sidebar-sheets-host/CubeAddonSidebar.dc.html`

They do **not** use the packaged components, so editing `components/*.jsx` never reaches them. `DesignSync get_file` → patch → re-upload, and **patch both copies in the same pass** — a previous session edited one while the preview showed the other and reported success on a screen that hadn't changed.
