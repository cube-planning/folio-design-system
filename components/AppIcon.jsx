// Apps icons — branded tiles for third-party integration/data-source apps,
// used anywhere a source is listed (SourceCard, ImportDrawer, connection
// pickers). Best-effort build without a live Figma pull: mirrors SourceCard's
// tile/token conventions (self-styled inline React, no external assets).
// Flag to update against the real Figma "Apps icons" component once available.

// Backgrounds below are third-party brand colors (Salesforce blue, Slack
// purple, etc.), not Cube/Folio tokens — intentional exception to the
// "no arbitrary hex" rule since these logos have no token equivalent.
const APPS = {
  salesforce: { label: "Salesforce", background: "#00A1E0", icon: "fa-brands fa-salesforce", color: "#FFFFFF" },
  slack:      { label: "Slack",      background: "#4A154B", icon: "fa-brands fa-slack",      color: "#FFFFFF" },
  hubspot:    { label: "HubSpot",    background: "#FF7A59", icon: "fa-brands fa-hubspot",    color: "#FFFFFF" },
  google:     { label: "Google Sheets", background: "#0F9D58", icon: "fa-brands fa-google",  color: "#FFFFFF" },
  microsoft:  { label: "Excel",      background: "#217346", icon: "fa-brands fa-microsoft",  color: "#FFFFFF" },
  quickbooks: { label: "QuickBooks", background: "#2CA01C", icon: "fa-solid fa-file-invoice-dollar", color: "#FFFFFF" },
  netsuite:   { label: "NetSuite",   background: "#173D82", icon: "fa-solid fa-cube",         color: "#FFFFFF" },
  workday:    { label: "Workday",    background: "#F49A1A", icon: "fa-solid fa-briefcase",    color: "#FFFFFF" },
  adaptive:   { label: "Adaptive Insights", background: "#6E2585", icon: "fa-solid fa-chart-line", color: "#FFFFFF" },
};

// radius values map to tokens/tokens.css: 8 = --radius-lg, 6 = --radius-md,
// 4 = --radius-sm.
const SIZE = {
  large:  { box: 32, radius: 8,  fontSize: 16 },
  medium: { box: 24, radius: 6,  fontSize: 13 },
  small:  { box: 20, radius: 4,  fontSize: 11 },
};

export function AppIcon({ app, size = "medium", style }) {
  const meta = APPS[app] ?? { label: app, background: "#E4E7EC", icon: "fa-solid fa-plug", color: "#344054" };
  const s = SIZE[size] ?? SIZE.medium;

  return (
    <span
      role="img"
      aria-label={meta.label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: s.box,
        height: s.box,
        borderRadius: s.radius,
        background: meta.background,
        color: meta.color,
        fontSize: s.fontSize,
        flexShrink: 0,
        ...style,
      }}
    >
      <i className={meta.icon} aria-hidden="true" />
    </span>
  );
}

AppIcon.APPS = Object.keys(APPS);
