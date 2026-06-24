import { Table, Badge } from 'folio-design-system';

const WORKFLOW_COLUMNS = [
  { key: "name",   label: "Name",   sortable: true },
  { key: "owner",  label: "Owner",  sortable: true },
  { key: "tasks",  label: "Tasks",  sortable: true },
  { key: "status", label: "Status", sortable: true },
];

const WORKFLOW_COLUMNS_WITH_BADGE = [
  { key: "name",  label: "Name",  sortable: true },
  { key: "owner", label: "Owner", sortable: true },
  { key: "tasks", label: "Tasks", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (val: string) => (
      <Badge variant={val === "In Progress" ? "lifecycle" : "active"}>{val}</Badge>
    ),
  },
];

const WORKFLOW_ROWS = [
  { id: 1, name: "FY 2026 Planning",                owner: "Bob Smith",     tasks: "0/3", status: "Not Started" },
  { id: 2, name: "Quarter Forecasting Q2 2025",     owner: "Alex Chen",     tasks: "6/6", status: "In Progress" },
  { id: 3, name: "Scenario Planning",               owner: "Alice Johnson", tasks: "2/7", status: "In Progress" },
  { id: 4, name: "Resource Allocation Strategies",  owner: "Michael Brown", tasks: "4/5", status: "Not Started" },
  { id: 5, name: "Risk Assessment and Mitigation",  owner: "Emily Davis",   tasks: "0/3", status: "Not Started" },
];

export function DefaultTable() {
  return <Table columns={WORKFLOW_COLUMNS} rows={WORKFLOW_ROWS} />;
}

export function WithBadges() {
  return <Table columns={WORKFLOW_COLUMNS_WITH_BADGE} rows={WORKFLOW_ROWS} />;
}

export function Compact() {
  return (
    <div style={{ maxWidth: 400 }}>
      <Table
        columns={[
          { key: "name",  label: "Name" },
          { key: "value", label: "Value", align: "right" as const },
        ]}
        rows={[
          { id: 1, name: "Total Revenue",      value: "$8.4M" },
          { id: 2, name: "COGS",               value: "$3.2M" },
          { id: 3, name: "Gross Margin",       value: "61.9%" },
          { id: 4, name: "Operating Expenses", value: "$2.1M" },
        ]}
      />
    </div>
  );
}
