import { Drawer, Button, Input } from 'folio-design-system';

export function DrawerShell() {
  return (
    <div style={{ position: "relative", width: 480, height: 420, overflow: "hidden", transform: "translateZ(0)", background: "#f9fafb", borderRadius: 12 }}>
      <Drawer
        open={true}
        title="Add Scenario"
        subtitle="Configure your forecast scenario"
        style={{ position: "absolute" }}
        footer={
          <>
            <Button type="secondary">Cancel</Button>
            <Button type="primary">Save Scenario</Button>
          </>
        }
      >
        <Input label="Scenario Name" placeholder="e.g. Q3 Upside" state="default" />
        <Input label="Description" placeholder="Optional description" state="default" />
      </Drawer>
    </div>
  );
}

export function DrawerHeader() {
  return (
    <div style={{
      width: 400,
      background: "#fff",
      borderRadius: "16px 0 0 16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      fontFamily: "'DM Sans', sans-serif",
      overflow: "hidden",
    }}>
      <div style={{
        padding: 16,
        borderBottom: "2px solid #173D82",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#101828", lineHeight: "28px" }}>
            Edit Dimension
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "#475467", lineHeight: "20px" }}>
            Modify the values for this dimension
          </p>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#475467", fontSize: 16, padding: 4 }}>
          ×
        </button>
      </div>
      <div style={{ padding: 16, color: "#667085", fontSize: 14 }}>
        Drawer body content…
      </div>
      <div style={{ padding: 16, borderTop: "1px solid #E4E7EC", display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button type="secondary" size="large">Cancel</Button>
        <Button type="primary" size="large">Apply</Button>
      </div>
    </div>
  );
}
