// AddonMenu — Folio Design System (Feature, Cube Add-on)
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) or "Add-Ons" (kmQDBYBQPuG9bt90qedB6A) — confirmed
// intentional; distinct from the kit's `HelpMenu`/`UserDropdown`, which belong
// to the main app header. The small dropdown the add-on's hamburger opens.
//
// Renders absolutely, so mount it as a child of a `position: relative` host
// (AddonSidebar's `overlay` slot is one). A transparent scrim behind it closes
// the menu on an outside click.
//
//   items    : [{ id, label, icon? }] — icon is a Font Awesome <i/>
//   onSelect : (id) => void
//   onClose  : () => void

import { useState } from "react";

const COLORS = { gray900: "#222B3A", gray300: "#E3E8EF", cobalt500: "#173D82", white: "#FFFFFF" };

export function AddonMenu({ items = [], onSelect, onClose }) {
  const [hovered, setHovered] = useState(null);
  return (
    <>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, zIndex: 20 }} />
      <div role="menu" style={{
        position: "absolute", top: 48, left: 8, zIndex: 21, width: 220, background: COLORS.white, border: `1px solid ${COLORS.gray300}`,
        borderRadius: 12, boxShadow: "0 8px 24px rgba(34,43,58,.16)", padding: 4, fontFamily: "'DM Sans', sans-serif", color: COLORS.gray900,
      }}>
        {items.map((it) => (
          <div
            key={it.id}
            role="menuitem"
            tabIndex={0}
            onClick={() => onSelect?.(it.id)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect?.(it.id); } }}
            onMouseEnter={() => setHovered(it.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex", alignItems: "center", gap: 10, height: 36, padding: "0 10px", borderRadius: 8, cursor: "pointer", fontSize: 13,
              background: hovered === it.id ? "#F1F5FB" : "transparent",
            }}
          >
            {it.icon && <span style={{ width: 14, fontSize: 12, color: COLORS.cobalt500, display: "inline-flex", justifyContent: "center" }}>{it.icon}</span>}
            {it.label}
          </div>
        ))}
      </div>
    </>
  );
}
