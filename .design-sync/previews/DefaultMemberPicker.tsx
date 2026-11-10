import { DefaultMemberPicker } from "folio-design-system";

const members = [
  { id: "allsc", parentId: null, name: "All Scenarios" },
  { id: "act", parentId: "allsc", name: "Actuals" },
  { id: "bud", parentId: "allsc", name: "Budget" },
  { id: "fc", parentId: "allsc", name: "Forecast" },
  { id: "fc3", parentId: "fc", name: "Q3 Forecast" },
  { id: "fc4", parentId: "fc", name: "Q4 Forecast" },
];

export function NoDefaultSet() {
  return (
    <div style={{ width: 300 }}>
      <DefaultMemberPicker dimension="Scenario" members={members} />
    </div>
  );
}

export function DefaultSet() {
  return (
    <div style={{ width: 300 }}>
      <DefaultMemberPicker dimension="Scenario" members={members} defaultId="act" />
    </div>
  );
}

export function ViewerLocked() {
  return (
    <div style={{ width: 300 }}>
      <DefaultMemberPicker dimension="Scenario" members={members} defaultId="act" canEdit={false} />
    </div>
  );
}

export function ResetSheetOpen() {
  // The confirm sheet is absolutely positioned over the card, so give the card height.
  return (
    <div style={{ width: 300, height: 520, display: "flex", flexDirection: "column" }}>
      <DefaultMemberPicker dimension="Scenario" members={members} defaultId="act" startWithReset />
    </div>
  );
}
