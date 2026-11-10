import { useState } from "react";
import { SidenavIcon } from "./SidenavIcon.jsx";

// PortalSideBarNav — Folio Design System (Layout / Navigation)
// Source: Figma "Folio Design System Beta" › Navigation ›
//   "Portal Side Bar Navigation" (52:986) plus its two states:
//   "..._Sections_Expanded" (52:2143) and "..._Sections_Collapsed" (52:2251).
//
// The Figma frame ships ~90 near-duplicate symbols (one per section ×
// expanded/collapsed, repeated per app tab). This component reproduces that
// shell once, data-driven, instead of hardcoding 90 blocks:
//   expanded         : whole-rail state — true = 256px labeled rail,
//                       false = 48px icon-only rail (Sections_Collapsed)
//   expandedSections : per-section accordion state, keyed by section id
//                       plus "apps" — only meaningful when expanded=true.
//                       Controlled if passed; otherwise managed internally.
//   activeItemId     : id of the highlighted nav item (see SECTIONS/APPS ids)
//   onItemClick      : (itemId) => void
//   onToggleSection  : (sectionId) => void — controlled accordion toggle
//
// Judgment calls (Figma frame didn't fully specify, or was internally
// inconsistent):
//  - Rail width snapped to 256px (4px spacing grid) — Figma measured 255px.
//  - Nav item hover/active colors aren't specified in this frame; using
//    cobalt-50/cobalt-700 to match this system's selected-state convention
//    elsewhere (Badge "active" variant, Segmented active state).
//  - The Reporting & Analytics section listed "Cube AI" twice in the raw
//    Figma frame (once via a generic item, once via a near-identical
//    duplicate instance) — treated as a duplication artifact and collapsed
//    to a single entry.
//  - The nested Library > Reports/Files indent uses a simplified single
//    vertical rule instead of Figma's per-row rule-plus-item composition —
//    same visual result, fewer nodes.
//  - Apps grid icons are third-party app logos (ChatGPT, Claude, Google
//    Sheets/Slides, Excel, PowerPoint, Slack, Teams). Font Awesome ships no
//    official brand glyph for most of these (verified against the local
//    fontawesome-pro-7.3.1-web icon set), so the closest available
//    equivalents are used — fa-brands fa-slack is an exact match; the rest
//    (fa-solid fa-robot for Claude, fa-regular fa-message-bot for ChatGPT,
//    fa-solid fa-table-cells for Sheets, fa-solid fa-presentation-screen for
//    Slides, fa-brands fa-microsoft for Teams) are generic stand-ins.

const COLORS = {
  white: "#FFFFFF",
  gray900: "#222B3A",
  gray700: "#4A5567",
  gray300: "#E3E8EF",
  gray100: "#F8FAFC",
  gray50: "#FCFCFD",
  cobalt700: "#0E2349",
  cobalt50: "#E6EBF4",
};

const SECTIONS = [
  {
    id: "reporting",
    label: "Reporting & Analytics",
    items: [
      { id: "cubeBI", label: "Cube BI", icon: "fa-regular fa-chart-line" },
      { id: "boards", label: "Boards", icon: "fa-regular fa-chart-user" },
      { id: "smartVariance", label: "Smart Variance", icon: "fa-regular fa-wave-square" },
      { id: "cubeAI", label: "Cube AI", icon: "fa-solid fa-sparkles" },
      {
        id: "library",
        label: "Library",
        icon: "fa-regular fa-book-open-cover",
        children: [
          { id: "reports", label: "Reports" },
          { id: "files", label: "Files" },
        ],
      },
    ],
  },
  {
    id: "planning",
    label: "Planning",
    items: [
      { id: "tables", label: "Tables", icon: "fa-regular fa-table" },
      { id: "planners", label: "Planners", icon: "fa-regular fa-book-sparkles" },
      { id: "scenarios", label: "Scenarios", icon: "fa-regular fa-code-branch" },
      { id: "workflows", label: "Workflows", icon: "fa-light fa-layer-group" },
    ],
  },
  {
    id: "modeling",
    label: "Modeling",
    items: [
      { id: "dimensions", label: "Dimensions", icon: "fa-regular fa-network-wired" },
      { id: "formulas", label: "Formulas", icon: "fa-regular fa-square-root-variable" },
      { id: "tags", label: "Tags", icon: "fa-regular fa-hashtag" },
    ],
  },
  {
    id: "data",
    label: "Data",
    items: [
      { id: "integrations", label: "Integrations", icon: "fa-regular fa-database" },
      { id: "dataExport", label: "Data Export", icon: "fa-regular fa-arrow-up-from-bracket" },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    items: [
      { id: "users", label: "Users", icon: "fa-regular fa-screen-users" },
      { id: "currencies", label: "Currencies", icon: "fa-regular fa-circle-dollar" },
      { id: "auditTrail", label: "Audit Trail", icon: "fa-regular fa-rectangle-list" },
      { id: "usage", label: "Usage", icon: "fa-regular fa-gauge-simple-high" },
    ],
  },
];

const APPS = [
  { id: "aiPlugin", label: "AI Plugin", icon: "fa-solid fa-microchip-ai" },
  { id: "chatgpt", label: "ChatGPT", icon: "fa-regular fa-message-bot" },
  { id: "claude", label: "Claude", icon: "fa-solid fa-robot" },
  { id: "excel", label: "Excel", icon: "fa-solid fa-file-excel" },
  { id: "sheets", label: "Sheets", icon: "fa-solid fa-table-cells" },
  { id: "slack", label: "Slack", icon: "fa-brands fa-slack" },
  { id: "teams", label: "Teams", icon: "fa-brands fa-microsoft" },
  { id: "slides", label: "Slides", icon: "fa-solid fa-presentation-screen" },
  { id: "powerpoint", label: "PowerPoint", icon: "fa-solid fa-file-powerpoint" },
];

function NavItem({ icon, label, active, onClick, indent = 32 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        height: 32,
        paddingLeft: indent,
        paddingRight: 16,
        border: "none",
        background: active ? COLORS.cobalt50 : hovered ? COLORS.gray50 : COLORS.white,
        color: active ? COLORS.cobalt700 : COLORS.gray900,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        lineHeight: "20px",
        cursor: "pointer",
        textAlign: "left",
        boxSizing: "border-box",
      }}
    >
      {icon && <SidenavIcon icon={<i className={icon} aria-hidden="true" />} />}
      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
    </button>
  );
}

function SectionHeader({ label, open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        width: "100%",
        padding: "8px 16px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        fontWeight: 500,
        color: COLORS.gray700,
        boxSizing: "border-box",
      }}
    >
      <i
        className={open ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}
        style={{ fontSize: 12, width: 16, textAlign: "center", flexShrink: 0 }}
        aria-hidden="true"
      />
      <span style={{ flex: 1, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
      </span>
    </button>
  );
}

function AppTile({ icon, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: 52 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          borderRadius: 16,
          background: COLORS.gray100,
          border: `1px solid ${COLORS.gray300}`,
          color: COLORS.gray900,
          fontSize: 14,
          boxSizing: "border-box",
        }}
      >
        <i className={icon} aria-hidden="true" />
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10,
          fontWeight: 500,
          color: COLORS.gray900,
          textAlign: "center",
          lineHeight: "16px",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function CollapsedTile({ icon, label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: 4,
        border: "none",
        background: active ? COLORS.cobalt50 : hovered ? COLORS.gray50 : "transparent",
        color: active ? COLORS.cobalt700 : COLORS.gray900,
        cursor: "pointer",
        fontSize: 14,
        boxSizing: "border-box",
      }}
    >
      <i className={icon} aria-hidden="true" />
    </button>
  );
}

export function PortalSideBarNav({
  expanded = true,
  expandedSections,
  onToggleSection,
  activeItemId,
  onItemClick,
  style,
}) {
  const [internalExpandedSections, setInternalExpandedSections] = useState(() =>
    Object.fromEntries([...SECTIONS.map((s) => [s.id, true]), ["apps", true]])
  );
  const openMap = expandedSections ?? internalExpandedSections;
  const toggleSection = (id) => {
    if (onToggleSection) {
      onToggleSection(id);
      return;
    }
    setInternalExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const containerStyle = {
    width: expanded ? 256 : 48,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    background: COLORS.white,
    padding: "8px 0",
    boxSizing: "border-box",
    fontFamily: "'DM Sans', sans-serif",
    ...style,
  };

  if (!expanded) {
    return (
      <nav style={containerStyle} aria-label="Portal navigation">
        {SECTIONS.map((section) => (
          <div key={section.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            {section.items.map((item) => (
              <CollapsedTile
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={item.id === activeItemId}
                onClick={() => onItemClick?.(item.id)}
              />
            ))}
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          {APPS.map((app) => (
            <CollapsedTile key={app.id} icon={app.icon} label={app.label} onClick={() => onItemClick?.(app.id)} />
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav style={containerStyle} aria-label="Portal navigation">
      {SECTIONS.map((section) => {
        const open = openMap[section.id] ?? true;
        return (
          <div key={section.id} style={{ display: "flex", flexDirection: "column" }}>
            <SectionHeader label={section.label} open={open} onToggle={() => toggleSection(section.id)} />
            {open && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {section.items.map((item) => (
                  <div key={item.id}>
                    <NavItem
                      icon={item.icon}
                      label={item.label}
                      active={item.id === activeItemId}
                      onClick={() => onItemClick?.(item.id)}
                    />
                    {item.children && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: 32,
                          paddingLeft: 16,
                          borderLeft: `2px solid ${COLORS.gray300}`,
                        }}
                      >
                        {item.children.map((child) => (
                          <NavItem
                            key={child.id}
                            label={child.label}
                            indent={0}
                            active={child.id === activeItemId}
                            onClick={() => onItemClick?.(child.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div style={{ display: "flex", flexDirection: "column" }}>
        <SectionHeader label="Apps" open={openMap.apps ?? true} onToggle={() => toggleSection("apps")} />
        {(openMap.apps ?? true) && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", rowGap: 16, padding: "8px 16px" }}>
            {APPS.map((app) => (
              <AppTile key={app.id} icon={app.icon} label={app.label} />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
