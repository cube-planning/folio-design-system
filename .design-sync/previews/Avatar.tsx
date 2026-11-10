import { Avatar } from "folio-design-system";

export function Canonical() {
  return <Avatar type="initials" name="Priya Chandran" size="md" />;
}

export function SizeSweep() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar type="initials" name="Priya Chandran" size="xs" />
      <Avatar type="initials" name="Priya Chandran" size="sm" />
      <Avatar type="initials" name="Priya Chandran" size="md" />
      <Avatar type="initials" name="Priya Chandran" size="lg" />
      <Avatar type="initials" name="Priya Chandran" size="xl" />
      <Avatar type="initials" name="Priya Chandran" size="2xl" />
    </div>
  );
}

export function InitialsColorPool() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar type="initials" name="Marcus Webb" size="md" />
      <Avatar type="initials" name="Sofia Reyes" size="md" />
      <Avatar type="initials" name="Devon Ashcroft" size="md" />
      <Avatar type="initials" name="Lena Kowalski" size="md" />
    </div>
  );
}

export function PlaceholderType() {
  return <Avatar type="placeholder" size="md" />;
}

export function SystemType() {
  return <Avatar type="system" size="md" />;
}

export function BorderOnColoredBg() {
  return (
    <div style={{ display: "flex", gap: 12, padding: 16, background: "#173D82", borderRadius: 12 }}>
      <Avatar type="initials" name="Priya Chandran" size="lg" border />
      <Avatar type="system" size="lg" border />
    </div>
  );
}
