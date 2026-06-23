import { Badge } from 'folio-design-system';

export function Lifecycle() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 8 }}>
      <Badge variant="lifecycle">Draft</Badge>
      <Badge variant="lifecycle">In Review</Badge>
      <Badge variant="lifecycle">Approved</Badge>
      <Badge variant="lifecycle">Published</Badge>
      <Badge variant="lifecycle">Archived</Badge>
    </div>
  );
}

export function Active() {
  return (
    <div style={{ display: "flex", gap: 8, padding: 8 }}>
      <Badge variant="active">Active</Badge>
      <Badge variant="lifecycle">Inactive</Badge>
    </div>
  );
}

export function InContext() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
      <span style={{ color: "#101828", fontWeight: 600 }}>Q3 Revenue Scenario</span>
      <Badge variant="lifecycle">Draft</Badge>
      <Badge variant="active">Active</Badge>
    </div>
  );
}
