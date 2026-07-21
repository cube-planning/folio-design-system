# Table

Data table for the Folio Design System. Use via `window.FolioDS.Table`; compose cells with `window.FolioDS.Cell`.

## Props
- `columns`: `Array<{ key, label, sortable?, align?, render? }>` — `render: (value, row) => node` draws the cell.
- `rows`: `Array<{ id, [key]: value }>`
- Sorting is built in (click a header). `align: "right"` for numeric columns.

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
