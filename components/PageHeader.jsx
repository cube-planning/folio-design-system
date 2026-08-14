// PageHeader — Folio Design System
// Source of truth: Figma "Folio DS — 2026 UI Refresh" › Portal Header (node 186:29002)
//
// Two row layout, measured from Figma:
//   Row 1 — breadcrumb (left) + topActions (right), e.g. bell/Import icon buttons
//   Row 2 — title + inline badges (left) + actions (right), e.g. edit/Mark Complete
//   gap between rows: 8px · bottom padding after header: 16px · title: 24px bold
//
// Two supported patterns:
//   - Integration Overview: badges inline next to title, topActions on breadcrumb row
//   - Workflow / secondary page level: owner + status stacked below title, actions on title row
//
//   breadcrumbs : [{ label, onClick? }] — last item renders as current (non-link)
//   title       : string
//   badges      : node — inline next to title (e.g. "Update Mapping", "Mapping Assistant")
//   owner       : string — renders as "Owner: {owner}" below the title
//   status      : { label, color } — passed straight to <Badge color>, below the title
//   topActions  : node — right-aligned slot on the breadcrumb row (e.g. bell, Import)
//   actions     : node — right-aligned slot on the title row (e.g. edit icon + Mark Complete)

import { Badge } from "./Badge";

const COLORS = {
  gray900: "#101828",
  gray600: "#475467",
  gray400: "#98A2B3",
  gray200: "#E4E7EC",
};

function Breadcrumbs({ items }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      color: COLORS.gray400,
    }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {item.onClick && !isLast ? (
              <a
                onClick={item.onClick}
                style={{ color: COLORS.gray600, cursor: "pointer", textDecoration: "none" }}
              >
                {item.label}
              </a>
            ) : (
              <span style={{ color: isLast ? COLORS.gray900 : COLORS.gray600 }}>
                {item.label}
              </span>
            )}
            {!isLast && <i className="fa-solid fa-chevron-right" style={{ fontSize: 10, color: COLORS.gray400 }} />}
          </span>
        );
      })}
    </div>
  );
}

export function PageHeader({
  breadcrumbs,
  title,
  badges,
  owner,
  status,
  topActions,
  actions,
  style,
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 8,
      paddingBottom: 16,
      borderBottom: `1px solid ${COLORS.gray200}`,
      fontFamily: "'DM Sans', sans-serif",
      ...style,
    }}>
      {(breadcrumbs || topActions) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, height: 32 }}>
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : <span />}
          {topActions && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              {topActions}
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 24, fontWeight: 700, lineHeight: "32px", color: COLORS.gray900 }}>
              {title}
            </div>
            {badges}
          </div>
          {(owner || status) && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: COLORS.gray600 }}>
              {owner && <span>Owner: {owner}</span>}
              {status && <Badge color={status.color} size="sm">{status.label}</Badge>}
            </div>
          )}
        </div>

        {actions && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
