import { Select } from "folio-design-system";

const OWNERS = ["Ava Chen", "Max Torres", "Tobias Reyes", "Chris Nakamura"];

export function Closed() {
  return (
    <div style={{ width: 280 }}>
      <Select label="Owner" placeholder="Select an owner" options={OWNERS} />
    </div>
  );
}

export function Populated() {
  return (
    <div style={{ width: 280 }}>
      <Select label="Owner" options={OWNERS} value="Ava Chen" />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: 280 }}>
      <Select label="Owner" options={OWNERS} value="Max Torres" disabled />
    </div>
  );
}

export function MultiWithChips() {
  return (
    <div style={{ width: 320 }}>
      <Select
        label="Reviewers"
        multi
        options={OWNERS}
        value={["Ava Chen", "Tobias Reyes"]}
      />
    </div>
  );
}

export function ErrorState() {
  return (
    <div style={{ width: 280 }}>
      <Select
        label="Owner"
        placeholder="Select an owner"
        options={OWNERS}
        state="error"
        errorMessage="An owner is required"
      />
    </div>
  );
}
