import { useState } from "react";
import { Table, Cell, Checkbox, EditableCell } from "folio-design-system";

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
  { key: "budget", label: "Budget", align: "right", render: (v) => <Cell.Metric tone="cobalt" weight="medium">{v}</Cell.Metric> },
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
      <Table columns={columns} rows={[]} emptyState="No tasks match these filters." />
    </div>
  );
}

const treeColumns = [
  {
    key: "name",
    label: "QuickBooks Dimension",
    sortable: false,
    render: (v, row, meta) =>
      meta.isGroup ? v : (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <i className="fa-regular fa-file" style={{ color: "var(--color-cobalt-500)", fontSize: 14, width: 24, textAlign: "center" }} />
          <span style={{ color: "var(--color-cobalt-500)" }}>{v}</span>
        </span>
      ),
  },
  { key: "cube", label: "Cube Dimension", sortable: false, render: (v, row, meta) => (meta.isGroup ? "--" : v) },
  { key: "modified", label: "Last Modified", sortable: false, render: (v, row, meta) => (meta.isGroup ? "--" : v) },
];

const treeRows = [
  { id: "income", name: "Income", children: [
    { id: "sales", name: "Sales of Product Income", cube: "Product Revenue", modified: "Oct 14, 2026" },
    { id: "services", name: "Services", cube: "Service Revenue", modified: "Oct 14, 2026" },
    { id: "subs", name: "Subscription Revenue", children: [
      { id: "annual", name: "Annual Plans", cube: "Subscription Revenue", modified: "Oct 2, 2026" },
      { id: "monthly", name: "Monthly Plans", cube: "Subscription Revenue", modified: "Oct 2, 2026" },
    ] },
  ] },
  { id: "cogs", name: "Cost of Goods Sold", defaultExpanded: false, children: [
    { id: "hosting", name: "Hosting & Infrastructure", cube: "Cost of Revenue", modified: "Sep 28, 2026" },
  ] },
];

export function TreeRows() {
  return (
    <div style={{ width: 780 }}>
      <Table columns={treeColumns} rows={treeRows} />
    </div>
  );
}

// ── Large grid: 20 columns x 40 rows, 2 frozen columns, scrolls both axes ─────────────────
const FIRST = ["Ava", "Max", "Tobias", "Chris", "Priya", "Mateo", "Hannah", "Kenji", "Lena", "Omar"];
const LAST = ["Chen", "Torres", "Reyes", "Nakamura", "Shah", "Ruiz", "Brandt", "Sato", "Novak", "Haddad"];
const ROLES = ["Account Executive", "Solutions Architect", "FP&A Analyst", "Software Engineer", "Product Designer", "Customer Success Mgr", "Data Engineer", "Recruiter"];
const DEPTS = ["Sales", "Engineering", "Finance", "Product", "Customer Success", "People"];
const CITIES = ["Boston", "Austin", "Toronto", "Remote (US)", "London", "Denver"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const roster = Array.from({ length: 40 }, (_, i) => {
  const base = 78000 + ((i * 7919) % 90) * 1000;
  const startMonth = i % 9 === 4 ? 3 : 0; // a few mid-year hires: earlier months are pre-plan
  const row: Record<string, any> = {
    id: "emp-" + (1001 + i),
    name: `${FIRST[i % 10]} ${LAST[(i * 3) % 10]}`,
    role: ROLES[i % ROLES.length],
    dept: DEPTS[i % DEPTS.length],
    city: CITIES[(i * 5) % CITIES.length],
    manager: `${FIRST[(i + 4) % 10]} ${LAST[(i + 7) % 10]}`,
    start: startMonth ? "Apr 1, 2026" : `Jan ${1 + (i % 27)}, 202${3 + (i % 3)}`,
    base,
    startMonth,
  };
  MONTHS.forEach((m, mi) => { row[m] = mi < startMonth ? 0 : base / 12; });
  row.total = MONTHS.reduce((t, _m, mi) => t + (mi < startMonth ? 0 : base / 12), 0);
  return row;
});

const gridColumns = [
  { key: "name", label: "Employee", minWidth: 180, sortable: false },
  { key: "role", label: "Role", minWidth: 190, sortable: false },
  { key: "dept", label: "Department", minWidth: 150 },
  { key: "city", label: "Location", minWidth: 130 },
  { key: "manager", label: "Manager", minWidth: 160 },
  { key: "start", label: "Start date", minWidth: 120 },
  { key: "base", label: "Base salary", align: "right", minWidth: 120, render: (v: number) => money(v) },
  ...MONTHS.map((m) => ({
    key: m, label: m + " 26", align: "right", minWidth: 96, sortable: false,
    render: (v: number) => (v ? money(v) : "--"),
    cellStyle: (v: number) => (v ? undefined : { color: "var(--color-gray-500)", background: "var(--color-gray-100)" }),
  })),
  { key: "total", label: "FY total", align: "right", minWidth: 120, headerHint: "Prorated", render: (v: number) => money(v), cellStyle: () => ({ fontWeight: 600 }) },
];

export function StickyHeaderAndColumns() {
  const [sortKey, setSortKey] = useState<string | null>("base");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const sorted = [...roster].sort((a, b) => {
    const k = sortKey as string;
    const cmp = typeof a[k] === "number" ? a[k] - b[k] : String(a[k]).localeCompare(String(b[k]));
    return sortDir === "asc" ? cmp : -cmp;
  });
  return (
    <div style={{ width: 780 }}>
      <Table
        columns={gridColumns}
        rows={sorted}
        stickyHeader
        stickyColumns={2}
        density="compact"
        sortKey={sortKey}
        sortDir={sortDir}
        onSortChange={(k, d) => { setSortKey(k); setSortDir(d); }}
        style={{ height: 420 }}
      />
    </div>
  );
}

// ── Selectable rows + header checkbox + header filter + hint ───────────────────────────
export function SelectableRows() {
  const [sel, setSel] = useState<Set<string>>(new Set(["emp-1002"]));
  const [depts, setDepts] = useState<string[]>([]);
  const data = roster.slice(0, 8).filter((r) => !depts.length || depts.includes(r.dept));
  const all = data.length > 0 && data.every((r) => sel.has(r.id));
  const some = data.some((r) => sel.has(r.id));
  const toggle = (id: string) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const cols = [
    {
      key: "sel", label: "", sortable: false, width: 48,
      selectAll: { state: all ? "checked" : some ? "indeterminate" : "unchecked", onToggle: () => setSel(all ? new Set() : new Set(data.map((r) => r.id))) },
      render: (_v: any, row: any) => (
        <span onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={sel.has(row.id) ? "checked" : "unchecked"} onChange={() => toggle(row.id)} />
        </span>
      ),
    },
    { key: "name", label: "Employee", headerHint: "Click a row to select" },
    {
      key: "dept",
      label: (<>Department <Table.HeaderFilter label="Filter department" value={depts} onChange={setDepts as any}
        options={DEPTS.map((d) => ({ value: d, label: d }))} /></>),
      sortable: false,
    },
    { key: "base", label: "Base salary", align: "right", render: (v: number) => money(v) },
  ];
  return (
    <div style={{ width: 780 }}>
      <Table
        columns={cols}
        rows={data.map((r) => ({ ...r, _selected: sel.has(r.id), _onClick: () => toggle(r.id) }))}
        emptyState="No people in these departments."
      />
    </div>
  );
}

// ── Compact density with subtotal rows ────────────────────────────────────────────────
export function CompactCosts() {
  const costCols = [
    { key: "line", label: "Cost line" },
    { key: "q1", label: "Q1", align: "right" },
    { key: "q2", label: "Q2", align: "right" },
    { key: "q3", label: "Q3", align: "right" },
    { key: "q4", label: "Q4", align: "right" },
  ];
  const sub = { background: "var(--color-gray-200)", fontWeight: 600, borderTop: "1px solid var(--color-border-strong)" };
  const costRows = [
    { id: 1, line: "Salaries", q1: "$412,300", q2: "$418,900", q3: "$431,250", q4: "$433,000" },
    { id: 2, line: "Payroll taxes", q1: "$38,120", q2: "$38,740", q3: "$39,910", q4: "$40,060" },
    { id: 3, line: "Benefits", q1: "$61,845", q2: "$62,835", q3: "$64,688", q4: "$64,950" },
    { id: 4, line: "Total people cost", q1: "$512,265", q2: "$520,475", q3: "$535,848", q4: "$538,010", _style: sub },
  ];
  return (
    <div style={{ width: 780 }}>
      <Table columns={costCols} rows={costRows} density="compact" />
    </div>
  );
}

// ── Inline edit: double-click a rate ─────────────────────────────────────────────────
export function InlineEdit() {
  const [rows, setRows] = useState([
    { id: "r1", role: "Account Executive", rate: "$142.50", unit: "per hour" },
    { id: "r2", role: "Solutions Architect", rate: "$168.00", unit: "per hour" },
    { id: "r3", role: "FP&A Analyst", rate: "$121.25", unit: "per hour" },
  ]);
  const [editing, setEditing] = useState<{ rowKey: any; colKey: string } | null>({ rowKey: "r2", colKey: "rate" });
  const cols = [
    { key: "role", label: "Role", sortable: false },
    {
      key: "rate", label: "Bill rate", align: "right", sortable: false, editable: true,
      renderEditor: (v: any, _row: any, commit: any, cancel: any) => <EditableCell value={v} onCommit={commit} onCancel={cancel} />,
    },
    { key: "unit", label: "Unit", sortable: false },
  ];
  return (
    <div style={{ width: 780 }}>
      <Table
        columns={cols}
        rows={rows}
        editingCell={editing}
        onEditStart={setEditing}
        onCellCommit={(c, v) => { setRows((rs) => rs.map((r) => (r.id === c.rowKey ? { ...r, [c.colKey]: v } : r))); setEditing(null); }}
        onCellCancel={() => setEditing(null)}
      />
    </div>
  );
}

// ── Grid editor: every cell is an input ───────────────────────────────────────────────
export function GridEditor() {
  const [rows, setRows] = useState(
    roster.slice(0, 8).map((r) => ({ id: r.id, name: r.name, dept: r.dept, jan: String(Math.round(r.base / 12)), feb: String(Math.round(r.base / 12)), mar: String(Math.round(r.base / 12)) }))
  );
  const cols = [
    { key: "name", label: "Employee", sticky: true, minWidth: 180 },
    { key: "dept", label: "Department", editable: true, minWidth: 150 },
    { key: "jan", label: "Jan", editable: true, align: "right", minWidth: 100 },
    { key: "feb", label: "Feb", editable: true, align: "right", minWidth: 100 },
    { key: "mar", label: "Mar", editable: true, align: "right", minWidth: 100 },
  ];
  return (
    <div style={{ width: 780 }}>
      <Table
        variant="grid"
        stickyHeader
        density="compact"
        columns={cols.map((c) => ({ ...c, sortable: false }))}
        rows={rows}
        onCellCommit={(c, v) => setRows((rs) => rs.map((r) => (r.id === c.rowKey ? { ...r, [c.colKey]: v } : r)))}
        style={{ maxHeight: 360 }}
      />
    </div>
  );
}
