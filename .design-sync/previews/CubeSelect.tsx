import { CubeSelect } from 'folio-design-system';

const ACCOUNT_OPTIONS = ["Operating Account", "Payroll Account", "Reserve Fund", "Credit Line"];
const PERIOD_OPTIONS = ["January 2024", "February 2024", "March 2024", "Q1 2024", "Q2 2024"];

export function Closed() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 8, maxWidth: 320 }}>
      <CubeSelect label="Account" placeholder="Select an account" options={ACCOUNT_OPTIONS} />
      <CubeSelect label="Period" value="Q1 2024" options={PERIOD_OPTIONS} />
      <CubeSelect label="Disabled" placeholder="Select..." options={ACCOUNT_OPTIONS} disabled />
    </div>
  );
}

export function MultiSelect() {
  return (
    <div style={{ padding: 8, maxWidth: 360 }}>
      <CubeSelect
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
      <CubeSelect
        label="Account"
        placeholder="Select an account"
        options={ACCOUNT_OPTIONS}
        state="error"
        errorMessage="Please select a valid account"
      />
    </div>
  );
}
