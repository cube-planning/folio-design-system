import { TaskCard } from "folio-design-system";

export function ActiveWithSteps() {
  return (
    <TaskCard
      title="EMEA Entity – Intacct Sync Dimensions"
      steps={[
        { key: "extract", label: "Extract", status: "done" },
        { key: "map", label: "Map", status: "active" },
        { key: "validate", label: "Validate", status: "inactive" },
        { key: "load", label: "Load", status: "inactive" },
      ]}
      user={{ name: "Jessica Smith" }}
      startedAt="Started 4:23 pm"
      action={{ label: "Stop", onClick: () => {} }}
    />
  );
}

export function AutomatedQueued() {
  return (
    <TaskCard
      title="NAM Entity – NetSuite Sync Dimensions"
      steps={[
        { key: "extract", label: "Extract", status: "inactive" },
        { key: "map", label: "Map", status: "inactive" },
        { key: "validate", label: "Validate", status: "inactive" },
        { key: "load", label: "Load", status: "inactive" },
      ]}
      automated
      startedAt="Queued 4:31 pm"
      action={{ label: "Cancel", onClick: () => {} }}
    />
  );
}

export function HistoryCompleted() {
  return (
    <TaskCard
      title="EMEA Entity – Intacct Sync Dimensions"
      user={{ name: "Jessica Smith" }}
      startedAt="Started 4:23 pm"
      status={{ label: "Completed", color: "green", icon: <i className="fa-solid fa-circle-check" /> }}
    />
  );
}

export function HistoryFailed() {
  return (
    <TaskCard
      title="APAC Entity – Workday Sync Dimensions"
      user={{ name: "Marcus Chen" }}
      startedAt="Started 2:05 pm"
      status={{ label: "Failed", color: "red", icon: <i className="fa-solid fa-circle-exclamation" /> }}
    />
  );
}
