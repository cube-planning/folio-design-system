// AddonSidebar — Folio Design System (Layout)
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) — confirmed intentional. This is the Cube
// Sheets/Excel add-on's own shell, not a kit component; distinct from
// `PortalSideBarNav`, which IS the kit's main-app sidebar.
// Defines the Cube Add-on panel's structure only — a fixed-width shell with
// a docked top nav and a scrollable content column — and delegates all
// content to whatever Feature panels are passed in as `children`/`topNav`.
//
//   topNav : usually an <AddonTopNav />
//   width  : panel width in px (Sheets/Excel add-on sidebars are ~300px)

const COLORS = {
  gray200: "#E4E7EC",
  bg:      "#F7F9FC",
};

export function AddonSidebar({ topNav, children, width = 300 }) {
  return (
    <div style={{
      width,
      display: "flex",
      flexDirection: "column",
      background: COLORS.bg,
      border: `1px solid ${COLORS.gray200}`,
      borderRadius: 16,
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
      boxSizing: "border-box",
    }}>
      {topNav}
      <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        {children}
      </div>
    </div>
  );
}
