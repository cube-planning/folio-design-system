import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { UploadModal } from "../components/UploadModal.jsx";
import { Button } from "../components/Button.jsx";

function Demo() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ padding: 24 }}>
      <Button variant="primary" size="large" onClick={() => setOpen(true)}>Upload Files</Button>
      <UploadModal open={open} onClose={() => setOpen(false)} accept=".csv,.xlsx,.xls,.pdf,.txt" maxSizeMB={1024} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Demo />);
