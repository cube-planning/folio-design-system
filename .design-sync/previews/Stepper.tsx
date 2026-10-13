import { Stepper } from "folio-design-system";

export function OnboardingInProgress() {
  return (
    <Stepper
      steps={[
        { key: "account", label: "Account", status: "completed" },
        { key: "workspace", label: "Workspace", status: "completed" },
        { key: "connect", label: "Connect data", status: "active" },
        { key: "invite", label: "Invite team", status: "upcoming" },
      ]}
    />
  );
}

export function SyncStepsSmall() {
  return (
    <Stepper
      size="sm"
      steps={[
        { key: "extract", label: "Extract", status: "completed" },
        { key: "map", label: "Map dimensions", status: "active" },
        { key: "validate", label: "Validate", status: "upcoming" },
        { key: "load", label: "Load", status: "upcoming" },
      ]}
    />
  );
}

export function AllComplete() {
  return (
    <Stepper
      steps={[
        { key: "setup", label: "Setup", status: "completed" },
        { key: "import", label: "Import", status: "completed" },
        { key: "review", label: "Review", status: "completed" },
      ]}
    />
  );
}

export function PageWizardFixedPitch() {
  return (
    <Stepper
      pitch={236}
      align="center"
      steps={[
        { key: "source", label: "Data Source", status: "completed" },
        { key: "config", label: "Table Configuration", status: "completed" },
        { key: "mapping", label: "Mapping", status: "active" },
      ]}
    />
  );
}
