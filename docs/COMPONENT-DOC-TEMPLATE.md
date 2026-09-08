# Component Documentation Template

Use this when adding a new component page to the Folio Design System in Claude Design.
Copy the prompt below, fill in the bracketed sections, and paste it into Claude Design.

---

## How to use

1. Copy the prompt block below
2. Replace everything in `[brackets]`
3. Paste into Claude Design
4. The structure stays the same for every component

---

## Prompt

> Create a component documentation page for **[Component Name]** in the Folio Design System. Follow this exact structure:
>
> ---
>
> ### Overview
>
> **What it is:** [One sentence — what the component does and where it lives in the UI.]
>
> **When to use:**
> - [Context 1]
> - [Context 2]
> - [Context 3]
>
> **When not to use:**
> - [What to use instead and why]
> - [Edge case to avoid]
>
> **Anatomy:**
> Label each part of the component:
> - [Part 1 — e.g. Container]
> - [Part 2 — e.g. Label]
> - [Part 3 — e.g. Icon]
> - [Part 4 — e.g. Active indicator]
>
> ---
>
> ### Variants
>
> For each variant below, show: the rendered component at actual size, the variant name as a subheading, one line on when to use it, and a code snippet.
>
> [List all variants here — copy from Storybook story names]
>
> Example format per variant:
> **[Variant name]**
> [One line — when to use this variant]
> ```jsx
> <[ComponentName] variant="[variant]" />
> ```
>
> ---
>
> ### States
>
> Show the component in each interactive state:
> - Default
> - Hover
> - Focus
> - Active / Selected
> - Disabled
> - Error (if applicable)
> - Loading (if applicable)
>
> ---
>
> ### Usage Notes
>
> **Do**
> - [Rule 1]
> - [Rule 2]
> - [Rule 3]
>
> **Don't**
> - [Rule 1]
> - [Rule 2]
>
> ---
>
> ### Tokens
>
> | Property | Token | Value |
> |---|---|---|
> | Background | `[token name]` | `[hex]` |
> | Text | `[token name]` | `[hex]` |
> | Border | `[token name]` | `[hex]` |
> | Border radius | `[token name]` | `[px]` |
> | Font | `[scale token]` | `[size/weight]` |
> | Height | — | `[px]` |
> | Padding | — | `[px]` |
>
> ---
>
> ### Accessibility
>
> - **Keyboard:** [Tab behavior, Enter/Space behavior, Arrow key behavior if applicable]
> - **Screen reader:** [aria role, label expectations]
> - **Contrast:** [AA or AAA, which token pairs]
>
> ---
>
> ### Related components
>
> - [Related component 1] — [one line on how they relate]
> - [Related component 2] — [one line on how they relate]

---

## Filled example — Breadcrumb

> Create a component documentation page for **Breadcrumb** in the Folio Design System. Follow this exact structure:
>
> ### Overview
>
> **What it is:** A navigation aid that shows the user's location within the app hierarchy and allows them to navigate back up.
>
> **When to use:**
> - Pages nested 2 or more levels deep
> - When the user needs context of where they are in a flow
> - Inside drawers or detail views that open from a list
>
> **When not to use:**
> - Top-level pages with no parent context
> - Modal dialogs — use the modal title instead
>
> **Anatomy:**
> - Container — horizontal row of items
> - Item — clickable link (all except last)
> - Separator — slash `/` or chevron `›` between items
> - Current item — non-clickable, bold or dark text
> - Icon (optional) — appears before item label
>
> ### Variants
>
> Show all variants rendered at actual size with a code snippet each:
> - **Primary (Default)** — slash separator, blue links, dark current item
> - **Chevron Separator** — chevron icon between items
> - **With Last Separator** — trailing separator after current item
> - **With Icons (Chevron)** — icon before each item label, chevron separators
> - **With Icons (Slash)** — icon before each item label, slash separators
> - **Grey Link Color** — muted gray links for lower-emphasis navigation
> - **Grey Links with Icons** — gray links with icons
>
> ### States
> Default · Hover (link color darkens) · Focus (cobalt focus ring) · Disabled
>
> ### Usage Notes
>
> **Do**
> - Use `color-blue-500` for link items
> - Use `color-gray-900` for the current (last) item
> - Keep labels short — truncate with ellipsis if needed
> - Use chevron separator when items have icons
>
> **Don't**
> - Don't make the current item a link
> - Don't use more than 4 levels — collapse middle items with `…`
> - Don't use in modals or drawers with their own header
>
> ### Tokens
>
> | Property | Token | Value |
> |---|---|---|
> | Link color | `color-blue-500` | `#2667D8` |
> | Current item | `color-gray-900` | `#222B3A` |
> | Separator | `color-gray-400` | `#CDD5E0` |
> | Font | `caption-1` medium | 12px / 500 |
> | Icon size | — | 12px |
> | Gap between items | `spacing-2` | 8px |
>
> ### Accessibility
> - **Keyboard:** Tab moves focus through links, Enter activates
> - **Screen reader:** Wrap in `<nav aria-label="Breadcrumb">`, mark current item with `aria-current="page"`
> - **Contrast:** Blue-500 on white passes AA (4.6:1)
>
> ### Related components
> - Pagination — for navigating between pages of results, not hierarchy
> - Tabs — for switching between views at the same level

---

## Quick reference — token lookup

When filling in the Tokens section, use these:

| Need | Token |
|---|---|
| Primary action / CTA | `color-cobalt-500` `#173D82` |
| Link | `color-blue-500` `#2667D8` |
| Primary text | `color-gray-900` `#222B3A` |
| Secondary text | `color-gray-700` `#4A5567` |
| Disabled text | `color-gray-500` `#97A3B6` |
| Border default | `color-gray-300` `#E3E8EF` |
| Border strong | `color-gray-400` `#CDD5E0` |
| Background subtle | `color-gray-100` `#F8FAFC` |
| Success | `color-green-500` `#229E66` |
| Error | `color-red-500` `#D92D20` |
| Warning | `color-yellow-500` `#F79009` |
| AI accent | `color-purple-500` `#7A5AF8` |
| Focus ring | `focus-ring-default` cobalt at 24% |
| Button / pill radius | `radius-full` 9999px |
| Card radius | `radius-2xl` 16px |
| Input radius | `radius-lg` 8px |
| Input height | — 32px (large) · 28px (small) |
| Button height | — 32px (large) · 28px (small) |
