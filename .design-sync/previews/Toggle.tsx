import { Toggle } from 'folio-design-system';

export function States() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 8 }}>
      <Toggle checked={false} label="Notifications off" id="t1" />
      <Toggle checked={true} label="Notifications on" id="t2" />
      <Toggle checked={false} label="Disabled off" disabled id="t3" />
      <Toggle checked={true} label="Disabled on" disabled id="t4" />
    </div>
  );
}

export function Standalone() {
  return (
    <div style={{ display: "flex", gap: 16, padding: 8, alignItems: "center" }}>
      <Toggle checked={false} id="s1" />
      <Toggle checked={true} id="s2" />
    </div>
  );
}
