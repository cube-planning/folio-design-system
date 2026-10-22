# Table

Data table for the Folio Design System. Use via `window.FolioDS.Table`; compose cells with `window.FolioDS.Cell`.

## Props
- `columns`: `Array<{ key, label, sortable?, align?, render? }>` — `render: (value, row, meta) => node` draws the cell.
  `meta` is `{ level, isGroup, expanded, rowIndex }` (the third argument is an object, not a bare index).
- `rows`: `Array<{ id, [key]: value }>`
- Sorting is built in (click a header). `align: "right"` for numeric columns; it also turns on tabular numerals.
- The Table root is the scroll container and its `style` is merged last, so pass `maxHeight`, `height` or `padding` there.

## Tree rows

Give a row a `children` array and the table becomes a tree. Group rows get a caret in the tree column
(the first column unless `treeColumn` names another), nested rows indent 24px per level, and sorting
applies to siblings so children stay under their parent. Flat tables are unaffected.

```jsx
const rows = [
  { id: "income", name: "Income", children: [
    { id: "sales", name: "Sales of Product Income", cube: "Product Revenue" },
    { id: "subs", name: "Subscription Revenue", children: [
      { id: "annual", name: "Annual Plans", cube: "Subscription Revenue" },
    ] },
  ] },
  { id: "cogs", name: "Cost of Goods Sold", defaultExpanded: false, children: [ /* … */ ] },
];

<Table columns={columns} rows={rows} />
```

- `rows[].id` — required in a tree. Expanded state is keyed on it.
- `rows[].defaultExpanded` — `false` starts that group collapsed. Groups start open by default.
- `defaultExpanded` (prop) — `"all"` (default), `"none"`, or an array of ids to start open.
- `expandedIds` + `onExpandedChange(ids)` — control expansion from outside, e.g. to force groups open while filtering.
- `treeColumn` — key of the column that carries the caret and indent. `indent` — px per level (default 24).
- `columns[].render(value, row, { level, isGroup, expanded })` — the third argument tells a cell where it sits.
  The table draws the caret; render only the icon and label (group rows show label only, leaves usually add an icon).

## Cell variants — say the name, get the cell

Ask for a column by its **cell name** and it maps to `Cell.*`:

| Cell name | `render` | Renders | Use for |
|---|---|---|---|
| **Text cell** | `Cell.Text` | plain gray-900 text | default values |
| **Link cell** | `Cell.Link` | blue clickable text | record / name links |
| **Metric cell** | `Cell.Metric` | right-aligned number; `tone="blue"\|"purple"\|"default"`, `bold` | KPIs, counts, totals |
| **Icon cell** | `Cell.Icon` | leading icon + text | schedule (clock), source, type |
| **User cell** | `Cell.User` | Avatar + name | owner, created by, assignee |
| **Status cell** | `Cell.Status` | Badge | statuses / states |
| **Progress cell** | `Cell.Progress` | `value/max` + bar | tasks, completion |
| **Actions cell** | `Cell.Actions` + `Cell.ActionButton` | trailing icon buttons | row actions (edit, delete, copy, ⋯) |

## Example

```jsx
const { Table, Cell } = window.FolioDS;

const columns = [
  { key: "name",   label: "Name",   render: (v) => <Cell.Link>{v}</Cell.Link> },
  { key: "owner",  label: "Owner",  render: (v) => <Cell.User name={v} /> },
  { key: "tasks",  label: "Tasks",  render: (v) => <Cell.Progress value={v[0]} max={v[1]} /> },
  { key: "status", label: "Status", render: (v) => <Cell.Status color={v === "In Progress" ? "info" : "neutral"}>{v}</Cell.Status> },
  { key: "spend",  label: "Spend",  align: "right", render: (v) => <Cell.Metric tone="default" bold>{v}</Cell.Metric> },
  { key: "_a",     label: "",       sortable: false, align: "right",
    render: () => <Cell.Actions><Cell.ActionButton aria-label="Edit" icon={<i className="fa-regular fa-pen" />} /></Cell.Actions> },
];

<Table columns={columns} rows={rows} />
```

Reserved (coming with the feature pages): **Select cell** (row checkbox) and **Diff cell** (old struck-through + new, for Audit Trail).

## Big grids (Headcount roster, costs, rate tables)

```jsx
<Table
  columns={columns} rows={rows}
  stickyHeader stickyColumns={2}
  style={{ maxHeight: 480, padding: 0 }}   // root scrolls; padding 0 puts the sticky header flush to the edge
/>
```

- `stickyHeader` pins the header (`top: 0`, z-index 3). It needs a root with a height: pass `maxHeight` or `height` in `style`.
  With the default 16px root padding rows scroll visibly through the gap above the header, so use `padding: 0` here.
- `stickyColumns={N}` freezes the first N columns. Each `left` is the sum of the measured widths of the frozen columns before it
  (ResizeObserver, nothing hardcoded). Frozen cells are opaque and follow the row background (selected, hover, `_style.background`).
  The last frozen column gets a 1px right divider. Frozen header cells sit at z-index 4. `columns[].sticky` overrides per column;
  frozen columns must be contiguous from the left.
- `columns[].width` / `minWidth` size a column. Give wide tables a `minWidth` on every column so the horizontal scroll has something to scroll.
- `density="compact"` = 40px rows and 12px cell padding (costs grid). Default is 48px / 8px.

### Column API

| Prop | What it does |
|---|---|
| `label` | String (uppercased) or any node. A node label is never uppercased, so a checkbox, filter button or hint pill keeps its case. |
| `headerHint` | Small secondary line under the label, in normal case. |
| `sortable: false` | Hides the sort icon and the click. |
| `cellStyle(value, row)` | Per-cell `{ color, background, fontWeight }`: overrides, pre-plan greyed months, subtotals. |
| `headerStyle` | Same, for the th. |
| `selectAll: { state, onToggle }` | Header checkbox. `state` is `"checked"`, `"unchecked"` or `"indeterminate"`. The table never selects rows; you do, in `onToggle`. |

### Controlled sort

```jsx
<Table sortKey={key} sortDir={dir} onSortChange={(k, d) => { setKey(k); setDir(d); }} rows={sortedByYou} />
```

Passing `sortKey` (even `null`) makes the table controlled: it shows the icon, fires `onSortChange`, and never reorders rows itself.

### Row props (on the row object)

`_onClick(row, event)` (pointer cursor and hover background), `_style` (`background`, `color`, `fontWeight`, `borderTop`),
`_className`, `_selected` (selected row background, `--color-bg-row-selected`). `rowKey` is a field name or `(row, index) => key`;
default `row.id ?? index`.

**Clicks inside a cell reach the row.** A checkbox, button or link in a cell must call `e.stopPropagation()` in its own handler,
or clicking it also fires the row's `_onClick`. (The tree caret and the header `selectAll` already do.)

```jsx
{ key: "sel", label: "", render: (v, row) => (
  <span onClick={(e) => e.stopPropagation()}>
    <Checkbox checked={sel.has(row.id) ? "checked" : "unchecked"} onChange={() => toggle(row.id)} />
  </span>
) }
```

### Inline editing

```jsx
const [editing, setEditing] = useState(null);   // { rowKey, colKey }
<Table
  editingCell={editing}
  onEditStart={setEditing}                       // double-click on an editable cell
  onCellCommit={(cell, value, row) => { save(cell, value); setEditing(null); }}
  onCellCancel={() => setEditing(null)}
  columns={[{ key: "rate", label: "Rate", editable: true, align: "right",
    renderEditor: (v, row, commit, cancel) => <EditableCell value={v} onCommit={commit} onCancel={cancel} /> }]}
/>
```

`EditableCell` (also `Table.EditableCell`) wraps `Input size="small"`: Enter commits, Escape cancels, blur commits. The editing td does not
clip the 3px focus ring.

### Grid editor (`variant="grid"`)

1px cell borders, square outer corners, no card padding. An editable column with no `renderEditor` is an always-on input that fills
its cell (inset focus ring) and calls `onCellCommit` on Enter or blur when the value changed. Use it for full-screen editors where
every cell is an input.

### Header filter

```jsx
{ key: "dept", label: <>Department <Table.HeaderFilter options={depts} value={sel} onChange={setSel} /></> }
```

A filter button plus a checkbox menu anchored under the th. The menu renders in a portal on `document.body`, so the scrolling root never clips it.
Pass `children` for custom menu content, `multiple={false}` for single choice.

### Empty state

`emptyState={<>No people match these filters.</>}` shows a centered message under the header when `rows` is empty.
