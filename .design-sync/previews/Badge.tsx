import { Badge } from "folio-design-system";

export function Canonical() {
  return <Badge color="blue" type="solid">In review</Badge>;
}

export function TypeSweep() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Badge color="green" type="solid">Active</Badge>
      <Badge color="green" type="dark">Active</Badge>
      <Badge color="green" type="outlined" dot>Active</Badge>
    </div>
  );
}

export function ColorSweep() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <Badge color="green">Live</Badge>
      <Badge color="yellow">Pending</Badge>
      <Badge color="red">Blocked</Badge>
      <Badge color="blue">Scheduled</Badge>
      <Badge color="purple">AI-assisted</Badge>
      <Badge color="gray">Archived</Badge>
    </div>
  );
}

export function SizeSweep() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Badge color="blue" size="lg">Publishing</Badge>
      <Badge color="blue" size="md">Publishing</Badge>
      <Badge color="blue" size="sm">Publishing</Badge>
    </div>
  );
}

export function WithIconAndDot() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Badge color="red" icon={<i className="fa-solid fa-circle-exclamation" />}>Overdue</Badge>
      <Badge color="green" type="outlined" dot>On track</Badge>
    </div>
  );
}

export function RemovableAndSelectable() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Badge color="blue" removable onRemove={() => {}}>Q3 Roadmap</Badge>
      <Badge color="gray" type="outlined" selectable>Owner</Badge>
    </div>
  );
}
