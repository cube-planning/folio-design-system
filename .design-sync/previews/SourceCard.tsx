import { SourceCard, Text, Badge } from 'folio-design-system';

export function Expanded() {
  return (
    <div style={{ padding: 8, maxWidth: 420 }}>
      <SourceCard title="QuickBooks Online" defaultOpen={true}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#101828" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#475467" }}>Connection status</span>
            <Badge variant="active">Active</Badge>
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
      </SourceCard>
    </div>
  );
}

export function Collapsed() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8, maxWidth: 420 }}>
      <SourceCard title="QuickBooks Online" defaultOpen={false} />
      <SourceCard title="Stripe" defaultOpen={false} />
      <SourceCard title="Salesforce CRM" defaultOpen={false} />
    </div>
  );
}

export function Mixed() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8, maxWidth: 420 }}>
      <SourceCard title="Revenue Data" defaultOpen={true}>
        <Text variant="body" color="#475467">Maps to accounts: 4000–4999. Updated daily from QuickBooks.</Text>
      </SourceCard>
      <SourceCard title="Expense Data" defaultOpen={false} />
    </div>
  );
}
