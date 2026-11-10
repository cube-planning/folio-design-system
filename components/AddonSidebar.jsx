// AddonSidebar — Folio Design System (Layout)
// Checked against Figma "Add-Ons" (kmQDBYBQPuG9bt90qedB6A, node 6399:17463)
// — the actual source file for the addon — not just "Folio Design System
// Beta" (Q7G87Bmjx2aYNVDKYLlBaG). In that file this shell corresponds to the
// "Drawer" frame (6399:17480), but that name is already taken by the kit's
// own `Drawer.jsx` (the generic modal side-drawer) — adopting it here would
// collide. Confirmed intentional NOT to rename; distinct from
// `PortalSideBarNav`, which IS the kit's main-app sidebar.
// Defines the Cube Add-on panel's structure only — a fixed-width shell with
// a docked top nav and a scrollable content column — and delegates all
// content to whatever Feature panels are passed in as `children`/`topNav`.
//
//   topNav  : usually an <AddonTopNav />
//   width   : panel width in px (Sheets/Excel add-on sidebars are ~300px)
//   Content column: 16px padding and 16px between cards (Figma "Add-Ons" 6399:17463,
//   cards 268px wide in a 300px panel).
//   overlay : absolutely positioned content (a menu, a toast) that floats over
//             the whole panel; the shell is `position: relative` for it

const COLORS = {
  gray200: "#E4E7EC",
  bg:      "#F7F9FC",
};

export function AddonSidebar({ topNav, children, width = 300, overlay }) {
  return (
    <div style={{
      position: "relative",
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
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        {children}
      </div>
      {overlay}
    </div>
  );
}
