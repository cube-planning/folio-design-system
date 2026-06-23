import { Button } from 'folio-design-system';

export function PrimaryVariants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 8, alignItems: "center" }}>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="destructive">Destructive</Button>
      <Button type="destructive-secondary">Destr. Secondary</Button>
      <Button type="destructive-subtle">Destr. Subtle</Button>
    </div>
  );
}

export function GhostVariants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 8, alignItems: "center" }}>
      <Button type="ghost-blue">Ghost Blue</Button>
      <Button type="ghost-gray">Ghost Gray</Button>
      <Button type="ghost-destructive">Ghost Destructive</Button>
      <Button type="subtle-blue">Subtle Blue</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: "flex", gap: 8, padding: 8, alignItems: "center" }}>
      <Button type="primary" size="large">Large (32px)</Button>
      <Button type="primary" size="small">Small (28px)</Button>
      <Button type="secondary" size="large">Large</Button>
      <Button type="secondary" size="small">Small</Button>
    </div>
  );
}

export function States() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 8, alignItems: "center" }}>
      <Button type="primary">Default</Button>
      <Button type="primary" loading>Loading</Button>
      <Button type="primary" disabled>Disabled</Button>
      <Button type="secondary" disabled>Sec. Disabled</Button>
      <Button type="destructive" loading>Loading</Button>
    </div>
  );
}
