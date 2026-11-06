import { AppIcon } from "folio-design-system";

export function Salesforce() {
  return <AppIcon app="salesforce" />;
}

export function Slack() {
  return <AppIcon app="slack" />;
}

export function NetSuite() {
  return <AppIcon app="netsuite" />;
}

export function Sizes() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <AppIcon app="hubspot" size="small" />
      <AppIcon app="hubspot" size="medium" />
      <AppIcon app="hubspot" size="large" />
    </div>
  );
}
