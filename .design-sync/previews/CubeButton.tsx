import { CubeButton } from 'folio-design-system';

export function PrimaryVariants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 8, alignItems: "center" }}>
      <CubeButton type="primary">Primary</CubeButton>
      <CubeButton type="secondary">Secondary</CubeButton>
      <CubeButton type="destructive">Destructive</CubeButton>
      <CubeButton type="destructive-secondary">Destr. Secondary</CubeButton>
      <CubeButton type="destructive-subtle">Destr. Subtle</CubeButton>
    </div>
  );
}

export function GhostVariants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 8, alignItems: "center" }}>
      <CubeButton type="ghost-blue">Ghost Blue</CubeButton>
      <CubeButton type="ghost-gray">Ghost Gray</CubeButton>
      <CubeButton type="ghost-destructive">Ghost Destructive</CubeButton>
      <CubeButton type="subtle-blue">Subtle Blue</CubeButton>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: "flex", gap: 8, padding: 8, alignItems: "center" }}>
      <CubeButton type="primary" size="large">Large (32px)</CubeButton>
      <CubeButton type="primary" size="small">Small (28px)</CubeButton>
      <CubeButton type="secondary" size="large">Large</CubeButton>
      <CubeButton type="secondary" size="small">Small</CubeButton>
    </div>
  );
}

export function States() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 8, alignItems: "center" }}>
      <CubeButton type="primary">Default</CubeButton>
      <CubeButton type="primary" loading>Loading</CubeButton>
      <CubeButton type="primary" disabled>Disabled</CubeButton>
      <CubeButton type="secondary" disabled>Sec. Disabled</CubeButton>
      <CubeButton type="destructive" loading>Loading</CubeButton>
    </div>
  );
}
