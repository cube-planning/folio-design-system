import { Stepper } from "folio-design-system";

export function OnboardingInProgress() {
  return (
    <Stepper
      steps={[
        { key: "account", label: "Account", status: "done" },
        { key: "workspace", label: "Workspace", status: "done" },
        { key: "connect", label: "Connect data", status: "active" },
        { key: "invite", label: "Invite team", status: "inactive" },
      ]}
    />
  );
}

export function SyncStepsSmall() {
  return (
    <Stepper
      size="sm"
      steps={[
        { key: "extract", label: "Extract", status: "done" },
        { key: "map", label: "Map dimensions", status: "active" },
        { key: "validate", label: "Validate", status: "inactive" },
        { key: "load", label: "Load", status: "inactive" },
      ]}
    />
  );
}

export function AllComplete() {
  return (
    <Stepper
      steps={[
        { key: "setup", label: "Setup", status: "done" },
        { key: "import", label: "Import", status: "done" },
        { key: "review", label: "Review", status: "done" },
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
        { key: "source", label: "Data Source", status: "done" },
        { key: "config", label: "Table Configuration", status: "done" },
        { key: "mapping", label: "Mapping", status: "active" },
      ]}
    />
  );
}
