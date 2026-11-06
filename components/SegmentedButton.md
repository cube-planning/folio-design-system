# Segmented

Segmented control (single-select toggle group) for the Folio Design System. Use via `window.FolioDS.Segmented`.

## Props
- `options`: `Array<{ value, label?, icon?, "aria-label"? }>`
  - `label` only → **Text** segment
  - `icon` only → **Icon** segment (pass `aria-label`)
  - `icon` + `label` → **Icon+Text** segment
- `value`: currently selected `value` (controlled)
- `onChange(value)`: called when a segment is clicked
- `size`: `"large"` (32px, 14px text) | `"small"` (28px, 12px text)

Supports 2–5 segments. Icons are Font Awesome nodes, e.g. `icon={<i className="fa-solid fa-table" />}`.

## Anatomy
- Track: `gray-200` (#F2F5F9), radius 4, 4px gap.
- Unselected segment: transparent (blends into the track), `gray-900` text, radius 4.
- Selected segment: `cobalt-50` (#E6EBF4) fill, 1px `cobalt-500` (#173D82) border, `cobalt-500` text, radius 8.
- Text weight 500 (DM Sans Medium).

## Example

```jsx
const { Segmented } = window.FolioDS;
const [view, setView] = React.useState("table");

<Segmented
  size="large"
  value={view}
  onChange={setView}
  options={[
    { value: "table", label: "Table",  icon: <i className="fa-solid fa-table" /> },
    { value: "chart", label: "Chart",  icon: <i className="fa-solid fa-chart-simple" /> },
    { value: "board", label: "Board",  icon: <i className="fa-solid fa-columns" /> },
  ]}
/>
```
