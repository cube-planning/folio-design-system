import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { PageHeader } from "../components/PageHeader.jsx";
import { Button } from "../components/Button.jsx";
import { Badge } from "../components/Badge.jsx";
import { SegmentedButton } from "../components/SegmentedButton.jsx";

const STATUS_OPTIONS = [
  { value: "In Progress", color: "blue" },
  { value: "Completed", color: "green" },
  { value: "Not Started", color: "yellow" },
];

function Canvas({ children }) {
  return (
    <div style={{ width: 640, background: "#fff", borderRadius: 16, border: "1px solid #E4E7EC", padding: 24 }}>
      {children}
    </div>
  );
}

function Demo() {
  const [status, setStatus] = useState("In Progress");
  const statusColor = STATUS_OPTIONS.find((o) => o.value === status).color;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F0F2F5", padding: "2.5rem", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: "#101828", marginBottom: 4 }}>PageHeader — Folio DS Prototype</h1>
      <p style={{ fontSize: 13, color: "#667085", marginBottom: 28 }}>
        Built from the real <code>PageHeader</code>/<code>Button</code>/<code>Badge</code> components — not hand-rolled markup. Two patterns, one component.
      </p>

      <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "#98A2B3", margin: "32px 0 10px" }}>
        Workflow / secondary page level — actions on title row, owner + status below
      </h2>
      <Canvas>
        <PageHeader
          breadcrumbs={[
            { label: "Workflows", icon: <i className="fa-regular fa-list-check" />, onClick: () => {} },
            { label: "Close checklist" },
          ]}
          title="Close checklist"
          owner="Nina Graham"
          status={{ label: status, color: statusColor }}
          actions={
            <>
              <Button icon={<i className="fa-regular fa-pen" />} aria-label="Edit" variant="ghost-gray" />
              <Button variant="primary">Mark Complete</Button>
            </>
          }
        />
      </Canvas>
      <div style={{ marginTop: 16 }}>
        <SegmentedButton
          options={STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.value }))}
          value={status}
          onChange={setStatus}
          size="small"
        />
      </div>

      <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "#98A2B3", margin: "32px 0 10px" }}>
        Integration overview — actions on breadcrumb row, badges inline with title
      </h2>
      <Canvas>
        <PageHeader
          breadcrumbs={[
            { label: "Integrations", icon: <i className="fa-regular fa-database" />, onClick: () => {} },
            { label: "Teal Plantations" },
          ]}
          title="Teal Plantations"
          badges={
            <>
              <Badge color="red" icon={<i className="fa-regular fa-xmark" />} size="md">Update Mapping</Badge>
              <Badge color="purple" icon={<i className="fa-regular fa-sparkles" />} size="md">Mapping Assistant</Badge>
            </>
          }
          topActions={
            <>
              <Button icon={<i className="fa-regular fa-bell" />} aria-label="Notifications" variant="ghost-gray" />
              <Button variant="secondary" leadingIcon={<i className="fa-regular fa-arrow-down-to-line" />}>
                Import
              </Button>
            </>
          }
        />
      </Canvas>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Demo />);
