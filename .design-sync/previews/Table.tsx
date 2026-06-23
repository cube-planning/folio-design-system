import { Table, Badge } from 'folio-design-system';

const COLUMNS = [
  { key: "name", label: "Scenario" },
  { key: "period", label: "Period" },
  { key: "revenue", label: "Revenue", align: "right" as const },
  { key: "status", label: "Status", sortable: false },
];

const ROWS = [
  { id: 1, name: "Base Case", period: "Q3 2024", revenue: "$2.4M", status: "Draft" },
  { id: 2, name: "Upside", period: "Q3 2024", revenue: "$3.1M", status: "In Review" },
  { id: 3, name: "Conservative", period: "Q3 2024", revenue: "$1.8M", status: "Approved" },
  { id: 4, name: "Board Scenario", period: "Q4 2024", revenue: "$4.2M", status: "Draft" },
];

const COLUMNS_WITH_BADGE = [
  { key: "name", label: "Scenario" },
  { key: "period", label: "Period" },
  { key: "revenue", label: "Revenue", align: "right" as const },
  {
    key: "status",
    label: "Status",
    sortable: false,
    render: (val: string) => <Badge variant="lifecycle">{val}</Badge>,
  },
];

export function DefaultTable() {
  return (
    <div style={{ padding: 8 }}>
      <Table columns={COLUMNS} rows={ROWS} />
    </div>
  );
}

export function WithBadges() {
  return (
    <div style={{ padding: 8 }}>
      <Table columns={COLUMNS_WITH_BADGE} rows={ROWS} />
    </div>
  );
}

export function Compact() {
  return (
    <div style={{ padding: 8, maxWidth: 400 }}>
      <Table
        columns={[{ key: "name", label: "Name" }, { key: "value", label: "Value", align: "right" as const }]}
        rows={[
          { id: 1, name: "Total Revenue", value: "$8.4M" },
          { id: 2, name: "COGS", value: "$3.2M" },
          { id: 3, name: "Gross Margin", value: "61.9%" },
          { id: 4, name: "Operating Expenses", value: "$2.1M" },
        ]}
      />
    </div>
  );
}
