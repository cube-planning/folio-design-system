import { PageHeader, Button, ButtonGroup, Badge } from "folio-design-system";

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
        badges={
          <>
            <Badge color="red" type="solid" size="md" icon={<i className="fa-regular fa-xmark" />}>Update Mapping</Badge>
            <Badge color="purple" type="solid" size="md" icon={<i className="fa-solid fa-sparkles" />}>Mapping Assistant</Badge>
          </>
        }
        topActions={
          <>
            <Button icon={<i className="fa-regular fa-bell" />} aria-label="Notifications" variant="secondary" />
            <Button variant="primary" leadingIcon={<i className="fa-regular fa-file-import" />}>
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
        badges={
          <>
            <Badge type="outlined" color="gray" size="md">Owner: Ava Chen</Badge>
            <Badge type="solid" color="blue" size="md">In Progress</Badge>
          </>
        }
        topActions={
          <>
            <ButtonGroup
              items={[
                { icon: <i className="fa-regular fa-bell" />, "aria-label": "Notifications", onClick: () => {} },
                { icon: <i className="fa-regular fa-pen" />, "aria-label": "Edit", onClick: () => {} },
              ]}
            />
            <Button variant="primary" leadingIcon={<i className="fa-regular fa-circle-check" />}>Mark Complete</Button>
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
