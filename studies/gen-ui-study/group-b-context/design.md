# Folio Design System

## How to build with this folder

**Always start from the template. Reuse what is in this folder. Do not create anything from scratch.**

1. **Call the template first, every time.** Whenever you are asked to create or change any UI, start from `WorkflowListTemplate` in `WorkflowListTemplate.jsx`, and render it exactly as it is before you ideate. Never start from a blank file. It is the whole Workflows page: side navigation, top bar, header, stat cards, filter bar and table, all built from the components. Add your work only inside the marked SLOT and leave the rest of the page as it is. On later requests, keep working from the same template and the same slot.
2. **Reuse the components.** For every element, find its component in `folio-components.jsx` (see the table below) and use it with its props and variants. Do not restyle it, rename it, or make a lookalike.
3. **Use tokens only.** Take every color, size, space, radius and shadow from `tokens.css`, `typography.css` and `colors.md`. Do not write raw hex values or one-off pixel sizes.
4. **Use the icons that are embedded.** Show icons with the `Icon` component. Do not draw or import other icons.
5. If something is truly not covered, build it from the closest existing component and match how the template already does it.

## Overview

A reference for building screens in the Folio look. Use it for every visual decision: colors, type, spacing, radius, icons and component patterns.

## The files in this folder

| File | What it is |
|---|---|
| `README.md` | The short rules. Read first. |
| `design.md` | This file. How to apply the system, and the component specs. |
| `tokens.css` | Every design token: colors, spacing, radius, shadows, focus rings, borders, z-index |
| `typography.css` | The full type scale and text style classes |
| `colors.md` | The full color palette with usage rules for each stop |
| `WorkflowListTemplate.jsx` | The page template. Render it first, then add to the SLOT. |
| `persona.md` | Who uses these screens and what they need |
| `folio-components.jsx` | **All the components, as code.** Every component used on these screens and in the task. Reuse them. |
| `Table.md` | How to use the table and its cell types |

## Components you must reuse

`folio-components.jsx` contains these components. Use them. Do not build your own version of any of them, and do not restyle them.

| Need | Use |
|---|---|
| Any button | `Button` (primary, secondary, ghost-blue, ghost-gray, plain-blue; large 32px or small 28px) |
| Text field or search | `Input` |
| Dropdown select | `Select` (with `ListItem`) |
| Checkbox | `Checkbox` |
| Filter trigger ("Status: All") | `Filter` |
| Filter with its option panel | `FilterDropdown` |
| The whole filter bar | `SearchAndFilter` |
| A small removable label | `Tag` |
| Status pill | `Badge` |
| Small state dot | `StatusDot` |
| Data table | `Table`, with cells from `Cell` (Text, Link, Metric, Icon, User, Status, Progress, Actions, ActionButton) |
| Person avatar | `Avatar` |
| Page title with actions | `PageHeader` |
| Breadcrumb trail | `Breadcrumbs` |
| Hover help text | `Tooltip` |
| Styled text | `Text` |
| Side navigation | `PortalSideBarNav` (with `SidenavIcon`) |
| Top bar: company, help, user | `CompanySwitcher`, `HelpMenu`, `UserDropdown` |
| Message bar (warning, error, info, success) | `Banner` |
| Short confirmation message | `Toast` (with `FeedbackButton`) |
| Dialog | `Modal` |
| Side panel | `Drawer` |
| On and off switch | `Toggle` |
| Choose one of a few options | `SegmentedButton` |
| Tabs | `Tab`, `TabGroup` |
| Joined buttons | `ButtonGroup` |
| Multi-line text | `Textarea` |
| Radio choice | `Radio` |
| Collapsible section | `AccordionSection` |
| Labeled filter row | `FilterField` |

When you need an element, find it in this table first. If a component exists for it, use that component with its props and variants. Only if nothing here fits, build the closest thing from these components and the tokens in `tokens.css`.

**If two files disagree, this file wins.**

---

## 1. Principles

- **Calm and structured.** White cards on a pale blue-gray canvas. Lots of space, thin borders, very light shadows.
- **One primary color.** Cobalt blue is for primary actions and selected states. Links use a brighter blue.
- **One typeface.** DM Sans for all text.
- **Rounded, friendly shapes.** Buttons and badges are pills. Inputs and filter controls are 8px. Cards are 12px or 16px. Small tags are 3px.
- **Sentence case labels.** Short and plain. Table column headers are the one exception: uppercase.
- **4px grid.** Every gap, padding and size is a multiple of 4.

---

## 2. Color

These are the colors the Workflows screens use. The full palette is in `colors.md` and `tokens.css`. Pick from these first. Reach for another ramp only if nothing here fits, and use only the named tokens.

| Role | Token | Hex |
|---|---|---|
| Page canvas (behind everything) | cobalt-25 | `#F5F7FA` |
| Card and table surface | white | `#FFFFFF` |
| Primary action fill | cobalt-500 | `#173D82` |
| Primary hover | cobalt-600 | `#122E64` |
| Primary pressed | cobalt-700 | `#0E2349` |
| Tinted selected / tag fill | cobalt-50 | `#E6EBF4` |
| Text on tint, active state | cobalt-500 | `#173D82` |
| Links and record names | blue-500 | `#2667D8` |
| Nav hover / selected row fill | blue-50 | `#EFF6FF` |
| Primary text | gray-900 | `#222B3A` |
| Secondary text, helper text | gray-600 | `#677489` |
| Labels, icons, table headers | gray-700 | `#4A5567` |
| Placeholder, resting sort icon | gray-500 | `#97A3B6` |
| Control border | gray-400 | `#CDD5E0` |
| Card border, dividers | gray-300 | `#E3E8EF` |
| Table header fill, track fill | gray-200 | `#F2F5F9` |
| Success / done | green-500 | `#229E66` |
| Warning / draft / not started | yellow-600 text, yellow-50 fill | `#DC6803` / `#FFFAEB` |
| Error / to do | red-500 | `#D92D20` |

Avoid purple. It is reserved for AI features and is not used on these screens.

---

## 3. Typography

DM Sans only. Weights: 400 regular, 500 medium, 600 semibold, 700 bold.

| Use | Size / line height | Weight | Color |
|---|---|---|---|
| Page title | 24px / 32px | 700 | gray-900 |
| Page subtitle | 14px / 20px | 400 | gray-600 |
| Section title (for example "Tasks (5)") | 18px / 28px | 600 | gray-900 |
| Stat value | 28px | 700 | gray-900 |
| Body, table cells, control text | 14px / 20px | 400 | gray-900 |
| Table column header | 12px / 20px, uppercase | 600 | gray-700 |
| Filter label ("Filter by:") | 14px | 500 | gray-900 |
| Caption, helper text, stat labels | 12px / 18px | 400 | gray-600 |
| Count badge, micro text | 10px / 16px | 600 | white on cobalt |

---

## 4. Spacing, radius and shadow

**Spacing:** 4, 8, 12, 16, 20, 24, 32, 40, 48. Nothing else.

**Radius**

| Element | Radius |
|---|---|
| Buttons, badges, avatars, count badges | 9999px (pill) |
| Inputs, selects, filter controls | 8px |
| Stat cards | 12px |
| Tables, large cards, modals | 16px |
| Tag (small removable label) | 3px |

**Shadow:** cards and stat cards use `shadow-xs` (a 1px, 5% shadow). Dropdown panels use `shadow-md`. Do not add heavy shadows.

---

## 5. Icons

All icons are Font Awesome icons, already embedded as inline SVG in `folio-components.jsx`, so nothing needs to load. **Use only these icons. Do not draw, invent or import any other icon.**

- To show an icon, use the `Icon` component: `<Icon name="xmark" />` (regular style, the default) or `<Icon name="chevron-down" solid />`.
- The same icon also works as `<FaI className="fa-regular fa-xmark" />`.
- Size follows the text size and color follows the text color, so set `fontSize` and `color` on the icon or its parent.
- In an icon-only `Button`, pass the icon through the `icon` prop.
- The side navigation icons and the third-party app logos (ChatGPT, Claude, Excel and so on) are already inside `PortalSideBarNav`. Use that component.
- Use the regular style by default. A few controls use solid (chevrons in filters, the x in tags, sort arrows, carets).

Available icon names:

`angles-left`, `angles-right`, `arrow-down`, `arrow-down-to-line`, `arrow-left`, `arrow-right`, `arrow-rotate-right`, `arrow-up`, `arrow-up-from-bracket`, `arrow-up-right-from-square`, `bars`, `bell`, `book-open-cover`, `book-sparkles`, `bookmark`, `buildings`, `calendar`, `calendar-days`, `caret-down`, `caret-left`, `caret-right`, `caret-up`, `chart-column`, `chart-line`, `chart-user`, `check`, `chevron-down`, `chevron-left`, `chevron-right`, `chevron-up`, `circle`, `circle-check`, `circle-dollar`, `circle-exclamation`, `circle-info`, `circle-question`, `circle-xmark`, `clock`, `code-branch`, `comment`, `comments`, `copy`, `database`, `dot-circle`, `download`, `ellipsis`, `ellipsis-vertical`, `envelope`, `eye`, `eye-slash`, `file`, `file-excel`, `file-lines`, `file-powerpoint`, `filter`, `filter-list`, `flag`, `folder`, `gauge-simple-high`, `gear`, `grid`, `grid-2`, `hashtag`, `house`, `layer-group`, `lightbulb`, `link`, `list`, `lock`, `magnifying-glass`, `megaphone`, `message-bot`, `message-lines`, `microchip-ai`, `minus`, `network-wired`, `paperclip`, `pen`, `pen-to-square`, `plus`, `presentation-screen`, `rectangle-list`, `robot`, `rotate`, `screen-users`, `share`, `sliders`, `sort`, `sort-down`, `sort-up`, `sparkles`, `square`, `square-check`, `square-root-variable`, `star`, `table`, `table-cells`, `tag`, `thumbs-down`, `thumbs-up`, `tower-broadcast`, `trash`, `triangle-exclamation`, `upload`, `user`, `user-group`, `user-plus`, `users`, `wave-square`, `xmark`

---

## 6. Page layout

- The sidebar and top bar are part of the starting screen. Leave them exactly as they are.
- Page content sits on the canvas (`#F5F7FA`) with **24px padding** on all sides.
- A page has: a title row (24px icon plus the title, an optional primary button on the right), a 14px subtitle, then content. Gap between blocks is 16px.
- Content blocks are white cards or tables on the canvas.

---

## 7. Components

### Buttons

Pill shaped, 14px medium text.

| Variant | Look | Use |
|---|---|---|
| Primary | cobalt-500 fill, white text | One main action per area |
| Secondary | white fill, 1.5px cobalt-500 border, cobalt-500 text | Supporting action next to a primary |
| Ghost blue | no fill, cobalt-500 text, hover fill cobalt-50 | Low-emphasis action, small toolbars |
| Plain blue | no fill, cobalt-500 text, underline on hover | Inline text action |

| Size | Height | Horizontal padding | Text |
|---|---|---|---|
| Large (default) | 32px | 16px | 14px |
| Small | 28px | 12px | 12px |

Leading icons are 14px (12px on small) with 6px to 8px gap to the label. An icon-only button is a square (32px or 28px).

### Input and search

Height 32px, 8px radius, 1px gray-400 border, white fill, 14px text, placeholder gray-500, 8px side padding. Hover and focus: border cobalt-500. Focus adds a soft cobalt ring (`focus-ring-default`). A search field has a leading `magnifying-glass` icon in gray-500.

### Filter control (dropdown trigger)

A button-like control that shows a label and its current value, for example "Status: All".

- Height 32px, 8px radius, 1px gray-400 border, white fill.
- Padding 4px 8px, gap 8px.
- Text 14px gray-800 (`#353F4F`), then a `fa-solid fa-chevron-down` at 12px in gray-600.
- If more than zero options are chosen, a **count badge** sits before the chevron: pill, 16px tall, cobalt-500 fill, white 10px semibold number.
- A row of filters sits on one line after the label "Filter by:" (14px, medium) with 8px gaps. A **Clear** action (ghost blue, small) follows the last filter. The search field is aligned to the right edge of the same row, 250px wide.
- A dropdown panel opens 4px below the control: white, 1px gray-300 border, 12px radius, `shadow-md`, 12px padding. Options are checkboxes with 14px labels. A footer has a plain "Clear" action on the left and a small primary "Apply" button on the right.

### Tag

A compact label that can show a value and can be removed.

- Height 24px (14px text) or 20px (12px text).
- Fill cobalt-50 (`#E6EBF4`), text cobalt-500, 3px radius, 4px padding, 4px gap.
- Optional trailing remove icon: `fa-solid fa-xmark`, 10px, cobalt-500.
- Several tags in a row have 8px between them.

### Status badge

Pill with a tinted fill and a matching 1px border, 12px medium text. When the status can be changed it has a trailing `fa-regular fa-chevron-down`.

| Status | Fill | Border | Text |
|---|---|---|---|
| Not Started, Draft | `#FFFAEB` | `#FEF0C7` | `#DC6803` |
| In Progress | `#EFF6FF` | `#DBEAFE` | `#2667D8` |
| Completed, Done | `#ECFDF3` | `#DCFAE6` | `#229E66` |
| To Do | `#FEF3F2` | `#FFE6E5` | `#D92D20` |

Heights: 28px on lists, 32px when the badge sits in a row with 14px text.

### Table

- Container: white, 1px gray-300 border, 16px radius, 16px padding.
- Header row: 40px tall, gray-200 fill, 8px side padding, 12px semibold uppercase gray-700. Sortable columns show `fa-solid fa-sort` (14px, gray-500) after the label.
- Body rows: 48px tall, white, 14px gray-900, 1px gray-200 divider between rows (none after the last).
- Record names are links: blue-500 text, 14px, with a 13px `fa-regular fa-layer-group` (or `file-lines`) icon in blue-500 in front.
- Owner and assignee cells: an avatar plus the name (14px).
- Progress cells: "x/y" in 14px, with a 6px high pill bar under it. Track gray-200, fill green-400 (`#70CF98`), minimum width 72px.
- A trailing actions cell is right-aligned and holds a small icon button (`copy`, or `ellipsis-vertical`) in gray-500.

### Avatar

Circle with white initials. 24px for table rows (10px text) and 32px in the top bar (14px text). Fill comes from this fixed set, chosen by the name: `#4E80EE`, `#2357B8`, `#22D3EE`, `#2DD4BF`, `#34D399`, `#70CF98`, `#818CF8`, `#E879F9`.

### Stat card

White, 1px gray-300 border, 12px radius, `shadow-xs`, 16px padding, 8px gap. Label 12px gray-600, value 28px bold, optional "/5" in 14px gray-600, optional 6px progress bar (gray-200 track, green fill). Four cards sit in a row with 16px gaps.

### Breadcrumbs

13px text. Parent link in cobalt-500 medium with a 13px `layer-group` icon, a 9px `chevron-right` in gray-600, then the current page in gray-900 medium.

### Page toolbar (detail pages)

Title row: 24px bold title. Under it a 14px line with "Owner:" text and a small status badge. Right side: an icon-only button (`pen`) and a primary button. A section header row has the 18px semibold section title on the left, and on the right a ghost blue small "Bulk actions" button with a trailing chevron and a secondary small button with a leading `plus` icon.

### Dates and mentions in tables

A date that is due or overdue sits in a 24px tall, 4px radius chip with red-50 fill (`#FEF3F2`) and 13px gray-900 text. An @mention is a 22px tall chip, 4px radius, gray-200 fill, 13px medium blue-500 text.

---

## 8. Do and don't

**Do**
- Reuse the starting screen's controls, spacing and wording before creating anything new.
- Keep one primary action per area.
- Keep text short and in sentence case.

**Don't**
- Add colors that are not in `tokens.css`, other fonts, or other icon sets.
- Use heavy shadows, gradients, or purple.
- Use red borders for errors.
- Change the sidebar or top bar.
