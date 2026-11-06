import { FlowCard, Badge } from "folio-design-system";

const sync = { icon: "fa-arrows-rotate", label: "Sync dimensions", tooltip: "Sync Dimensions Now" };

export function Source() {
  return (
    <FlowCard
      label="Source"
      icon={{ initial: "G" }}
      iconShape="circle"
      title="Green Plantations"
      onTitleClick={() => {}}
      actions={[sync, { icon: "fa-pen", label: "Edit connection", tooltip: "Edit connection" }]}
      button={{ label: "Source Dimensions" }}
    />
  );
}

export function SourceDisconnected() {
  return (
    <FlowCard
      label="Source"
      icon={{ initial: "O" }}
      iconShape="circle"
      title="Orange Plantations"
      status={{ tone: "red", text: "Xero is Disconnected" }}
      actions={[sync, { icon: "fa-link-slash", label: "Connect Xero", tooltip: "Connect Xero" }]}
      button={{ label: "Source Dimensions" }}
    />
  );
}

export function ConnectionUnmapped() {
  return (
    <FlowCard
      label="Connection"
      icon={{ flow: "import" }}
      title="Import Setup"
      status={{ tone: "orange", text: "Set Mapping Rules", onClick: () => {} }}
      badge={<Badge color="red" size="sm">12 unmapped values</Badge>}
      actions={[{ icon: "fa-clock", label: "Schedule" }]}
      button={{ label: "Mapping", tone: "danger" }}
    />
  );
}

export function TruncatedTitle() {
  return (
    <FlowCard
      label="Source"
      icon={{ fa: "fa-folder-open" }}
      title="Cube-Hosted File Management"
      onTitleClick={() => {}}
      status={{ tone: "red", icon: "fa-wrench", text: "Enable Boomi Atom" }}
      actions={[sync, { icon: "fa-folder", label: "File Management", tooltip: "File Management" }]}
      button={{ label: "Source Dimensions" }}
    />
  );
}

export function Destination() {
  return (
    <FlowCard
      label="Destination"
      icon={{ fa: "fa-table" }}
      title="Revenue Table"
      subtitle="Actuals, Budget"
      actions={[{ icon: "fa-arrow-up-from-bracket", label: "Export", tooltip: "Data Exporter" }]}
      button={{ label: "Open table" }}
    />
  );
}
