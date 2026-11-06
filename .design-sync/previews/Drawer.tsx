import { Drawer, Button, Input, Select, Banner } from "folio-design-system";

export function DrawerShell() {
  return (
    <div style={{ position: "relative", width: "100%", height: 520, transform: "translateZ(0)" }}>
      <Drawer
        open
        title="Edit forecast scenario"
        subtitle="Adjust the assumptions used to model this scenario."
        onClose={() => {}}
        footer={
          <>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save changes</Button>
          </>
        }
      >
        <Banner variant="info">Changes apply immediately to draft scenarios only.</Banner>
        <Input label="Scenario name" placeholder="e.g. Q3 Upside" value="Q3 Upside Case" />
        <Select label="Owner" options={["Ava Chen", "Max Torres", "Tobias Reyes"]} value="Ava Chen" />
        <Input label="Growth assumption (%)" placeholder="e.g. 12" value="12" />
      </Drawer>
    </div>
  );
}
