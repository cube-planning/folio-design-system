import { Cell } from "folio-design-system";

export function TextAndLink() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Cell.Text>FY26 Headcount Plan</Cell.Text>
      <Cell.Link href="#">OPP-10482</Cell.Link>
    </div>
  );
}

export function MetricAndStatus() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      <Cell.Metric tone="blue" bold>$482,000</Cell.Metric>
      <Cell.Status variant="lifecycle">In Review</Cell.Status>
    </div>
  );
}

export function UserAndProgress() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Cell.User name="Ava Chen" />
      <Cell.Progress value={7} max={10} />
    </div>
  );
}

export function IconAndActions() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Cell.Icon icon={<i className="fa-solid fa-building" />}>Acme Corp</Cell.Icon>
      <Cell.Actions>
        <Cell.ActionButton icon={<i className="fa-solid fa-pen" />} aria-label="Edit row" />
        <Cell.ActionButton icon={<i className="fa-solid fa-trash" />} aria-label="Delete row" />
      </Cell.Actions>
    </div>
  );
}
