import { CubeBadge } from 'folio-design-system';

export function Lifecycle() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 8 }}>
      <CubeBadge variant="lifecycle">Draft</CubeBadge>
      <CubeBadge variant="lifecycle">In Review</CubeBadge>
      <CubeBadge variant="lifecycle">Approved</CubeBadge>
      <CubeBadge variant="lifecycle">Published</CubeBadge>
      <CubeBadge variant="lifecycle">Archived</CubeBadge>
    </div>
  );
}

export function Active() {
  return (
    <div style={{ display: "flex", gap: 8, padding: 8 }}>
      <CubeBadge variant="active">Active</CubeBadge>
      <CubeBadge variant="lifecycle">Inactive</CubeBadge>
    </div>
  );
}

export function InContext() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
      <span style={{ color: "#101828", fontWeight: 600 }}>Q3 Revenue Scenario</span>
      <CubeBadge variant="lifecycle">Draft</CubeBadge>
      <CubeBadge variant="active">Active</CubeBadge>
    </div>
  );
}
