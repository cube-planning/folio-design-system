import { CubeSourceCard, CubeText, CubeBadge } from 'folio-design-system';

export function Expanded() {
  return (
    <div style={{ padding: 8, maxWidth: 420 }}>
      <CubeSourceCard title="QuickBooks Online" defaultOpen={true}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#101828" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#475467" }}>Connection status</span>
            <CubeBadge variant="active">Active</CubeBadge>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#475467" }}>Last synced</span>
            <span>Today, 6:00 AM</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#475467" }}>Accounts mapped</span>
            <span>24 of 24</span>
          </div>
        </div>
      </CubeSourceCard>
    </div>
  );
}

export function Collapsed() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8, maxWidth: 420 }}>
      <CubeSourceCard title="QuickBooks Online" defaultOpen={false} />
      <CubeSourceCard title="Stripe" defaultOpen={false} />
      <CubeSourceCard title="Salesforce CRM" defaultOpen={false} />
    </div>
  );
}

export function Mixed() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8, maxWidth: 420 }}>
      <CubeSourceCard title="Revenue Data" defaultOpen={true}>
        <CubeText variant="body" color="#475467">Maps to accounts: 4000–4999. Updated daily from QuickBooks.</CubeText>
      </CubeSourceCard>
      <CubeSourceCard title="Expense Data" defaultOpen={false} />
    </div>
  );
}
