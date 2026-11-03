import { DefaultMembersScreen } from "folio-design-system";

const dims = [
  { key: "time", label: "Time", automaticName: "FY2025" },
  { key: "dept", label: "Department", automaticName: "NetSuite Connection" },
  { key: "scen", label: "Scenario", automaticName: "All Scenarios", defaultName: "Actuals", meta: "Set by Nina Graham · just now" },
  { key: "ent", label: "Entity", automaticName: "Global Co", defaultName: "GCo US", meta: "Set by Nina Graham · just now" },
  { key: "prod", label: "Product", automaticName: "All Products" },
  { key: "mkt", label: "Market", automaticName: "All Markets" },
];

export function Admin() {
  return (
    <div style={{ width: 300 }}>
      <DefaultMembersScreen dimensions={dims} />
    </div>
  );
}

export function ViewerReadOnly() {
  return (
    <div style={{ width: 300 }}>
      <DefaultMembersScreen dimensions={dims} canEdit={false} />
    </div>
  );
}
