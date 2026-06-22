import { CubeBanner } from 'folio-design-system';

export function Variants() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8, maxWidth: 480 }}>
      <CubeBanner variant="info" title="Data refreshes daily">
        Your metrics are updated every morning at 6 AM UTC.
      </CubeBanner>
      <CubeBanner variant="success" title="Scenario saved">
        Your changes have been saved successfully.
      </CubeBanner>
      <CubeBanner variant="warning" title="Review required">
        This scenario has unresolved comments from the last review.
      </CubeBanner>
      <CubeBanner variant="error" title="Sync failed">
        Unable to connect to your data source. Check your credentials.
      </CubeBanner>
    </div>
  );
}

export function Minimal() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8, maxWidth: 480 }}>
      <CubeBanner variant="info">Connected to QuickBooks Online.</CubeBanner>
      <CubeBanner variant="warning">Forecast period ends in 3 days.</CubeBanner>
    </div>
  );
}
