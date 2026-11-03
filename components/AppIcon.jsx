// AppIcon — branded tiles for third-party integration/data-source apps
// (Salesforce, NetSuite, QuickBooks, ...), used anywhere a data source is
// listed (SourceCard, ImportDrawer, connection pickers).
//
// Kit vocabulary: confirmed via a live Figma pull (2026-08-27) that this is
// NOT the same thing as Figma "Folio Design System Beta"'s "Apps icons"
// family (node 52:1982, Navigation page) — that family covers a fixed,
// different set of productivity/AI-tool brands (PowerPoint, Slack, Teams,
// Claude, ChatGPT, etc.) for inline nav/context UI, now built separately as
// `AppsIcon`. This component's data-source tile set has no Figma kit
// equivalent — confirmed intentional, not a rename target. Self-styled
// inline React (no external assets), mirroring SourceCard's tile/token
// conventions.

import quickbooksLogo from "./assets/quickbooks.svg";

// An entry with `image` shows that real logo (an exported SVG in ./assets) instead of a glyph on a
// brand-color tile. The tile is clipped to its radius, so the logo follows the shape.
//
// Backgrounds below are third-party brand colors (Salesforce blue, Slack
// purple, etc.), not Cube/Folio tokens — intentional exception to the
// "no arbitrary hex" rule since these logos have no token equivalent.
const APPS = {
  salesforce: { label: "Salesforce", background: "#00A1E0", icon: "fa-brands fa-salesforce", color: "#FFFFFF" },
  slack:      { label: "Slack",      background: "#4A154B", icon: "fa-brands fa-slack",      color: "#FFFFFF" },
  hubspot:    { label: "HubSpot",    background: "#FF7A59", icon: "fa-brands fa-hubspot",    color: "#FFFFFF" },
  google:     { label: "Google Sheets", background: "#0F9D58", icon: "fa-brands fa-google",  color: "#FFFFFF" },
  microsoft:  { label: "Excel",      background: "#217346", icon: "fa-brands fa-microsoft",  color: "#FFFFFF" },
  quickbooks: { label: "QuickBooks", background: "#FFFFFF", image: quickbooksLogo },
  netsuite:   { label: "NetSuite",   background: "#173D82", icon: "fa-solid fa-cube",         color: "#FFFFFF" },
  workday:    { label: "Workday",    background: "#F49A1A", icon: "fa-solid fa-briefcase",    color: "#FFFFFF" },
  adaptive:   { label: "Adaptive Insights", background: "#6E2585", icon: "fa-solid fa-chart-line", color: "#FFFFFF" },
  // No official Font Awesome brand glyph for Sage or Xero; generic glyphs on the brand color, like NetSuite/Workday.
  sage:       { label: "Sage",       background: "#00A651", icon: "fa-solid fa-leaf",         color: "#FFFFFF" },
  xero:       { label: "Xero",       background: "#13B5EA", icon: "fa-solid fa-chart-pie",    color: "#FFFFFF" },
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
        overflow: "hidden",
        ...style,
      }}
    >
      {meta.image
        ? <img src={meta.image} alt="" width="100%" height="100%" style={{ display: "block" }} />
        : <i className={meta.icon} aria-hidden="true" />}
    </span>
  );
}

AppIcon.APPS = Object.keys(APPS);
