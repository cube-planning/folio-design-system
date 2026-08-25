import { PageHeader, Button, Badge } from "folio-design-system";

// Cobalt-25 canvas behind the header, matching the app page background it
// actually sits on (not exported — helper only, not a story).
function Canvas({ children }) {
  return (
    <div style={{ background: "#F5F7FA", padding: 24 }}>
      {children}
    </div>
  );
}

export function TopLevelPage() {
  return (
    <Canvas>
      <PageHeader
        icon={<i className="fa-regular fa-database" />}
        title="Integrations"
      />
    </Canvas>
  );
}

export function IntegrationOverview() {
  return (
    <Canvas>
      <PageHeader
        breadcrumbs={[
          { label: "Integrations", icon: <i className="fa-regular fa-database" />, onClick: () => {} },
          { label: "Teal Plantations" },
        ]}
        title="Teal Plantations"
        badges={<Badge variant="lifecycle">Update Mapping</Badge>}
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
  );
}

export function WorkflowPage() {
  return (
    <Canvas>
      <PageHeader
        breadcrumbs={[
          { label: "Workflows", icon: <i className="fa-regular fa-list-check" />, onClick: () => {} },
          { label: "Close checklist" },
        ]}
        title="Close checklist"
        owner="Ava Chen"
        status={{ label: "In progress", color: "blue" }}
        actions={
          <>
            <Button icon={<i className="fa-regular fa-pen" />} aria-label="Edit" variant="ghost-gray" />
            <Button variant="primary">Mark Complete</Button>
          </>
        }
      />
    </Canvas>
  );
}

export function TitleOnly() {
  return (
    <Canvas>
      <PageHeader
        icon={<i className="fa-regular fa-network-wired" />}
        breadcrumbs={[{ label: "Dimensions" }]}
        title="Dimensions"
      />
    </Canvas>
  );
}
