import { RangeBuilder } from "folio-design-system";

const dimensions = [
  { key: "account", label: "Account" }, { key: "dept", label: "Department" }, { key: "scen", label: "Scenario" },
  { key: "time", label: "Time" }, { key: "ent", label: "Entity" }, { key: "prod", label: "Product" },
  { key: "mkt", label: "Market" }, { key: "class", label: "Class" },
];

export function Empty() {
  return (
    <div style={{ width: 268 }}>
      <RangeBuilder dimensions={dimensions} layout={{ columns: [], rows: [], filters: [] }} />
    </div>
  );
}

export function DimensionsPlaced() {
  return (
    <div style={{ width: 268 }}>
      <RangeBuilder
        dimensions={dimensions}
        layout={{ columns: ["time"], rows: ["account"], filters: ["scen", "ent"] }}
        rootNameFor={(key) => `All ${key}`}
      />
    </div>
  );
}
