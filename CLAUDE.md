# CLAUDE.md — Cube Design System Rules

> This file teaches Claude how to build UI that matches the Folio Design System Beta.
> Place at your project root. Claude reads it automatically.

---

## 0. Session Start

Always read these files at the start of every session before doing anything:

```
Read the following before doing anything:
- CLAUDE.md
- tokens.css
- cube-colors.md
- typography.css
- cube-personas.md
- shell.html

Confirm you have loaded the Folio design system context.
```

### Project Files Reference

| File | Purpose |
|---|---|
| `CLAUDE.md` | Design system rules — this file |
| `tokens.css` | Spacing, radius, shadows, focus rings, z-index, semantic color aliases |
| `cube-colors.md` | Full color palette with all ramps and Tailwind registration |
| `typography.css` | Type scale tokens and utility classes |
| `cube-personas.md` | User personas — Max, Ava, Tobias, Chris |
| `shell.html` | Base app layout — sidebar, nav, shell structure |
| `DESIGN-PLAYBOOK.md` | How to structure prompts and run design sessions |

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
│   ├── ui/                    # shadcn primitives (button, input, dialog, etc.)
│   ├── cube/                  # Cube-specific compound components
│   │   ├── CubeDrawer.tsx     # Side drawer shell
│   │   ├── CubeTable.tsx      # Data table with sort headers
│   │   ├── CubeSourceCard.tsx # Collapsible lifecycle source card
│   │   ├── CubeBadge.tsx      # Lifecycle, Active, Status badges
│   │   ├── CubeBanner.tsx     # Warning, Error, Info banners
│   │   ├── CubeSegmented.tsx  # Segmented control (toggle group)
│   │   ├── CubeTimePicker.tsx # Hierarchical time tree picker
│   │   └── CubeToggle.tsx     # Small toggle switch
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
- **Cube components:** PascalCase with `Cube` prefix (`CubeDrawer.tsx`, `CubeSourceCard.tsx`)
- **Layout:** PascalCase, no prefix (`Sidebar.tsx`, `TopHeader.tsx`)
- **Pages:** PascalCase, singular noun (`Scenarios.tsx`, `Dimensions.tsx`)

### CSS Class Naming
- Use Tailwind utility classes exclusively — no inline styles, no CSS modules
- Cube tokens as custom Tailwind colors: `bg-cube-cobalt-500`, `text-cube-gray-900`
- Use `cn()` helper from `lib/utils.ts` for conditional classes

---

## 3. Design Tokens (from Figma Variables)

### Colors

The full color palette lives in `cube-colors.md`. Below is a quick-reference for the tokens used most in components.

#### Primary Color
**Cobalt 500** (`#4A73CD`) is the primary interactive color — replaces the old Blue 500. Use `cube-cobalt-*` for all primary actions, focus states, and active indicators. Use `cube-blue-*` for links and navigation only.

#### Color Rule

| Stop range | Usage |
|---|---|
| `600` | Interactive UI — buttons, active states; minimum for AA with white text |
| `700–800` | Text & icons — colored headings, labels, icons on light backgrounds |
| `50–200` | Surfaces & backgrounds — badge fills, banner backgrounds, tinted chips |
| `25–50` | Chip & page backgrounds — lightest tints for subtle surface differentiation |

#### Cobalt vs Blue

| Token | Use for |
|---|---|
| `cube-cobalt-*` | Primary buttons, CTAs, focus rings, active states, selected indicators |
| `cube-blue-*` | Links and navigation items only |

**Usage:** `bg-cube-cobalt-600`, `text-cube-gray-900`, `border-cube-gray-300`, etc.

---

## 4. Typography

### Font Loading

Load DM Sans via Google Fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

> **Note:** DM Sans is the sole typeface across all token roles — display, titles, body, captions, labels, inputs, and table content. Do not use Lato or Montserrat.

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
| Cards | 12px | `rounded-xl` |
| Large containers, modals, drawers | 16px | `rounded-2xl` |

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
| Primary | `h-8 px-4 py-2 rounded-full bg-cube-cobalt-500 text-white font-semibold text-sm` |
| Secondary | `h-8 px-4 py-2 rounded-full border border-cube-cobalt-500 text-cube-cobalt-500 font-semibold text-sm` |
| Ghost | `h-8 px-4 py-2 rounded-full font-semibold text-sm text-cube-gray-900` |
| Add Source | `h-8 w-full rounded-full border border-cube-cobalt-500 text-cube-cobalt-500 font-semibold text-xs text-center` |

#### Button Size Scale
| Size | Height | Padding | Font Size |
|---|---|---|---|
| sm | 32px | `px-3 py-1.5` | 12px |
| md (default) | 40px | `px-4 py-2` | 14px |
| lg | 48px | `px-5 py-3` | 16px |

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

```tsx
{/* Solid (default) */}
<i className="fa-solid fa-house" />

{/* Regular */}
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
- Never guess icon names — verify at fontawesome.com/icons
- Apply color via Tailwind `text-*` classes on the `<i>` element

---

## 8. Rules for Claude

### DO
- Always use Tailwind utility classes with Cube tokens (`bg-cube-cobalt-500`, not `bg-[#2667D8]`)
- Use Cobalt as the primary color — not Blue
- Use pill/`rounded-full` for all buttons, badges, chips, and toggles
- Use `rounded-lg` (8px) for inputs and selects
- Use shadcn primitives as the base, then customize with Cube token classes
- Use `cn()` for conditional/merged classes
- Keep components in `components/cube/` with `Cube` prefix
- Match Figma measurements exactly: 32px input height, 48px row height, 400px drawer width
- Use DM Sans for all UI text — it is the only typeface in Folio
- Collapsible sections default to collapsed when data exists, expanded when empty
- Reference `cube-personas.md` when a feature targets a specific user — use persona context to inform UX decisions
- Use `shell.html` as the base layout for all new screens — only add content inside `<main>`

### DO NOT
- Never use `rounded-[4px]` for buttons — use `rounded-full`
- Never use inline `style={{}}` attributes
- Never use arbitrary hex values — always use token classes
- Never use Lato or Montserrat — DM Sans only
- Never reference Blue 500 as primary — Cobalt 500 is primary
- Never use red borders for errors — use soft `bg-cube-red-100` banners
- Never put lifecycle rules in the create-new-scenario drawer
- Never use `<form>` tags in components (use event handlers directly)
- Never modify the sidebar, header, or shell structure when building new screens

### WHEN BUILDING NEW COMPONENTS
1. Check if a shadcn primitive exists (Sheet, Dialog, Switch, Collapsible, etc.)
2. Wrap it in a `Cube*` component with Cube token styling
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
