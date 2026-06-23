import { Select } from 'folio-design-system';

const ACCOUNT_OPTIONS = ["Operating Account", "Payroll Account", "Reserve Fund", "Credit Line"];
const PERIOD_OPTIONS = ["January 2024", "February 2024", "March 2024", "Q1 2024", "Q2 2024"];

export function Closed() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 8, maxWidth: 320 }}>
      <Select label="Account" placeholder="Select an account" options={ACCOUNT_OPTIONS} />
      <Select label="Period" value="Q1 2024" options={PERIOD_OPTIONS} />
      <Select label="Disabled" placeholder="Select..." options={ACCOUNT_OPTIONS} disabled />
    </div>
  );
}

export function MultiSelect() {
  return (
    <div style={{ padding: 8, maxWidth: 360 }}>
      <Select
        label="Periods"
        placeholder="Select periods..."
        options={PERIOD_OPTIONS}
        value={["January 2024", "February 2024"]}
        multi
      />
    </div>
  );
}

export function ErrorState() {
  return (
    <div style={{ padding: 8, maxWidth: 320 }}>
      <Select
        label="Account"
        placeholder="Select an account"
        options={ACCOUNT_OPTIONS}
        state="error"
        errorMessage="Please select a valid account"
      />
    </div>
  );
}
