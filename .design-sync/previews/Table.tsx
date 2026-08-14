import { Table, Cell } from "folio-design-system";

const columns = [
  {
    key: "task",
    label: "Task",
    render: (v, row) => (
      <Cell.Link icon={row.isWorkflow ? <i className={row.icon ?? "fa-solid fa-diagram-project"} /> : undefined}>
        {v}
      </Cell.Link>
    ),
  },
  { key: "owner", label: "Owner", render: (v) => <Cell.User name={v} /> },
  { key: "status", label: "Status", sortable: false, render: (v) => <Cell.Status color={Cell.statusColor(v)}>{v}</Cell.Status> },
  { key: "progress", label: "Progress", sortable: false, render: (v, row) => <Cell.Progress value={v} max={row.total} /> },
  { key: "budget", label: "Budget", align: "right", render: (v) => <Cell.Metric tone="blue" weight="medium">{v}</Cell.Metric> },
  {
    key: "actions",
    label: "",
    sortable: false,
    align: "right",
    render: () => (
      <Cell.Actions>
        <Cell.ActionButton icon={<i className="fa-solid fa-pen" />} aria-label="Edit" />
        <Cell.ActionButton icon={<i className="fa-solid fa-ellipsis" />} aria-label="More" />
      </Cell.Actions>
    ),
  },
];

const rows = [
  { id: 1, task: "Migrate revenue model to NetSuite", owner: "Ava Chen", status: "In Review", progress: 7, total: 10, budget: "$48,200" },
  { id: 2, task: "Q3 headcount plan reconciliation", owner: "Max Torres", status: "Active", progress: 4, total: 8, budget: "$12,900" },
  { id: 3, task: "Salesforce pipeline mapping cleanup", owner: "Tobias Reyes", status: "Draft", progress: 1, total: 6, budget: null },
  { id: 4, task: "FY26 opex variance review", owner: "Chris Nakamura", status: "Done", progress: 9, total: 9, budget: "$76,050" },
  { id: 5, task: "FY 2026 Planning", owner: "Thomas Lee", status: "Todo", progress: 0, total: 5, budget: null, isWorkflow: true, icon: "fa-solid fa-sitemap" },
];

export function ProjectTasks() {
  return (
    <div style={{ width: 780 }}>
      <Table columns={columns} rows={rows} />
    </div>
  );
}

export function EmptyState() {
  return (
    <div style={{ width: 780 }}>
      <Table columns={columns} rows={[]} />
    </div>
  );
}
