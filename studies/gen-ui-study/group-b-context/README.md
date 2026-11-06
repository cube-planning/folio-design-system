# Folio Design System

Rules for building screens in the Folio look.

## Rules

1. **Call the template first, every time.** Whenever you are asked to create or change any UI, start from `WorkflowListTemplate` in `WorkflowListTemplate.jsx`. Render it exactly as it is before you ideate. Never start from a blank file. It is the whole Workflows page, built from the components. Add your work only inside the marked SLOT. Do not rebuild, restyle or replace any other part of the page. On later requests, keep working from the same template and the same slot.
2. **Reuse the components.** Every element comes from `folio-components.jsx`. Use the component with its props and variants. Do not restyle it or build a lookalike. `design.md` has a table of which component to use for each need.
3. **Use design tokens only.** Every color, size, space, radius and shadow comes from `tokens.css`, `typography.css` and `colors.md`. No raw hex values. No one-off pixel sizes.
4. **Use the embedded icons.** Show icons with the `Icon` component. Do not draw or import other icons.
5. **Do not create anything from scratch.** No new components, styles, colors, icons or patterns. If something is missing, build it from the closest existing component.

## Design tokens at a glance

| Token group | Values |
|---|---|
| Primary color | cobalt-500 `#173D82` (hover cobalt-600 `#122E64`, pressed cobalt-700 `#0E2349`) |
| Page canvas | cobalt-25 `#F5F7FA` |
| Surface | white `#FFFFFF` |
| Links and navigation | blue-500 `#2667D8`, hover and selected fill blue-50 `#EFF6FF` |
| Text | gray-900 `#222B3A` primary, gray-600 `#677489` secondary, gray-700 `#4A5567` labels |
| Borders | gray-300 `#E3E8EF` cards, gray-400 `#CDD5E0` controls |
| Table header fill | gray-200 `#F2F5F9` |
| Typeface | DM Sans only (400, 500, 600, 700) |
| Type scale | 24/32 page title, 18/28 section title, 14/20 body, 12/18 caption, 10/16 micro |
| Spacing | 4px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48. Page content padding 24px |
| Radius | pill 9999 buttons and badges, 8 inputs and filter controls, 12 stat cards, 16 tables and cards, 3 tags |
| Shadow | xs on cards, md on dropdown panels |
| Control height | 32px large, 28px small |

## Files

| File | What it is |
|---|---|
| `README.md` | These rules |
| `design.md` | How to apply the system, the component table, and component specs |
| `WorkflowListTemplate.jsx` | The page template. Render it first, then add to the SLOT. |
| `folio-components.jsx` | All components and icons, as code |
| `Table.md` | How to use the table and its cell types |
| `tokens.css` | Every design token |
| `typography.css` | The type scale |
| `colors.md` | The full color palette |
| `persona.md` | Who uses these screens |
| `product-screen.png` | The starting screen |
