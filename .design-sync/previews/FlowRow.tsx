import { FlowCard, FlowRow } from "folio-design-system";

export function Overview() {
  return (
    // The panel is ~1028px wide (three fixed 300px cards); zoom keeps it inside the preview card.
    <div style={{ zoom: 0.62 }}>
    <FlowRow marginBottom={0}>
      <FlowCard
        label="Source"
        icon={{ company: "paylocity" }}
        iconShape="circle"
        title="Teal Plantations"
        onTitleClick={() => {}}
        actions={[{ icon: "fa-arrows-rotate", label: "Sync dimensions", tooltip: "Sync Dimensions Now" }]}
        button={{ label: "Source Dimensions" }}
      />
      <FlowCard
        label="Connection"
        icon={{ flow: "import" }}
        title="Import Setup"
        actions={[{ icon: "fa-clock", label: "Schedule" }]}
        body={
          <div style={{ fontSize: 12, color: "#4A5567", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", gap: 2, marginTop: -8 }}>
            <span><b style={{ fontWeight: 500 }}>Schedule: </b>Weekly, Monday, 7 am</span>
            <span><b style={{ fontWeight: 500 }}>Date Range: </b>Last 3 months</span>
          </div>
        }
        button={{ label: "Mapping" }}
      />
      <FlowCard
        label="Destination"
        icon={{ flow: "cube" }}
        title="Cube Dimensions"
        actions={[{ icon: "fa-arrow-up-from-bracket", label: "Export", tooltip: "Data Exporter" }]}
        button={{ label: "Cube Dimensions" }}
      />
    </FlowRow>
    </div>
  );
}
