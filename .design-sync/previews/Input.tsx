import { Input } from "folio-design-system";

export function Canonical() {
  return (
    <Input label="Project name" placeholder="e.g. FutureQuest redesign" value="FutureQuest redesign" />
  );
}

export function StateSweep() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 280 }}>
      <Input label="Workspace URL" placeholder="your-team" state="default" />
      <Input label="Workspace URL" placeholder="your-team" state="focused" value="cube-design" />
      <Input
        label="Billing email"
        placeholder="name@company.com"
        state="error"
        value="not-an-email"
        errorMessage="Enter a valid email address"
      />
      <Input label="Account ID" placeholder="acct_1234" state="disabled" value="acct_9F3XQ" disabled />
    </div>
  );
}

export function WithLeadingIconAndCount() {
  return (
    <Input
      label="Search components"
      placeholder="Search"
      leadingIcon={<i className="fa-solid fa-magnifying-glass" />}
      value="Badge"
      charCount
      maxChars={40}
    />
  );
}

export function SizeSweep() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 260 }}>
      <Input size="large" label="Large" placeholder="Display name" />
      <Input size="small" label="Small" placeholder="Display name" />
    </div>
  );
}
