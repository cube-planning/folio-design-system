import { Modal, Button, Input } from "folio-design-system";

export function ModalShell() {
  return (
    <div style={{ position: "relative", width: "100%", height: 420, transform: "translateZ(0)" }}>
      <Modal
        open
        title="Delete data source?"
        subtitle="This removes the connection and all synced data. This can't be undone."
        onClose={() => {}}
        footer={
          <>
            <Button variant="secondary">Cancel</Button>
            <Button variant="destructive">Delete source</Button>
          </>
        }
      >
        <Input label="Type DELETE to confirm" placeholder="DELETE" />
      </Modal>
    </div>
  );
}
