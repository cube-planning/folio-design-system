import { SourceCard, Badge, Cell } from "folio-design-system";

export function Collapsed() {
  return (
    <div style={{ width: 360 }}>
      <SourceCard title="Salesforce — Opportunity Pipeline" defaultOpen={false}>
        <Cell.Text>Not shown while collapsed</Cell.Text>
      </SourceCard>
    </div>
  );
}

export function Expanded() {
  return (
    <div style={{ width: 360 }}>
      <SourceCard title="NetSuite — Revenue Actuals" defaultOpen={true}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#475467" }}>
            Last synced 2 hours ago
          </span>
          <Badge variant="lifecycle">Active</Badge>
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#101828" }}>
          412 rows mapped across 6 dimensions. No unmapped fields detected in this pull.
        </div>
      </SourceCard>
    </div>
  );
}
