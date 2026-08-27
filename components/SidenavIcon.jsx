// SidenavIcon — Folio Design System (Foundation)
// Source: Figma "Folio Design System Beta" › Navigation › "Sidenav icon"
// (node 93:43842) — a 22px centered hit-box around a 14px glyph. Figma
// treats this as its own reusable component because it's instanced by
// ~20 different nav items inside PortalSideBarNav (Cube BI, Boards, Tables,
// Users, Currencies, etc.) and the Company Switcher's leading/trailing
// icons — each swaps in its own Font Awesome glyph via the `icon` prop.
//
// Mirrors the inline IconSlot pattern already used in Button.jsx/Badge.jsx,
// but exported standalone since Figma's component graph references this
// exact node by id rather than inlining it per-instance.

export function SidenavIcon({ icon = <i className="fa-solid fa-grid-2" />, size = 14, wrapperSize = 22, style }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: wrapperSize,
        height: wrapperSize,
        fontSize: size,
        lineHeight: 1,
        flexShrink: 0,
        color: "inherit",
        ...style,
      }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}
