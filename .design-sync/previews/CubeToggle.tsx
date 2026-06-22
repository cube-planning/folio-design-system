import { CubeToggle } from 'folio-design-system';

export function States() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 8 }}>
      <CubeToggle checked={false} label="Notifications off" id="t1" />
      <CubeToggle checked={true} label="Notifications on" id="t2" />
      <CubeToggle checked={false} label="Disabled off" disabled id="t3" />
      <CubeToggle checked={true} label="Disabled on" disabled id="t4" />
    </div>
  );
}

export function Standalone() {
  return (
    <div style={{ display: "flex", gap: 16, padding: 8, alignItems: "center" }}>
      <CubeToggle checked={false} id="s1" />
      <CubeToggle checked={true} id="s2" />
    </div>
  );
}
