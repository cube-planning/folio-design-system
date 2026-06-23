import { Banner } from 'folio-design-system';

export function Variants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8, maxWidth: 480 }}>
      <Banner variant="info" title="Data refreshes daily">
        Your metrics are updated every morning at 6 AM UTC.
      </Banner>
      <Banner variant="success" title="Scenario saved">
        Your changes have been saved successfully.
      </Banner>
      <Banner variant="warning" title="Review required">
        This scenario has unresolved comments from the last review.
      </Banner>
      <Banner variant="error" title="Sync failed">
        Unable to connect to your data source. Check your credentials.
      </Banner>
    </div>
  );
}

export function Minimal() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8, maxWidth: 480 }}>
      <Banner variant="info">Connected to QuickBooks Online.</Banner>
      <Banner variant="warning">Forecast period ends in 3 days.</Banner>
    </div>
  );
}
