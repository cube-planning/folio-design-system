// SourceCard — Folio Design System
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) — confirmed intentional, generic addition (likely
// traces to an external "Card" library not present in this kit file).

import { useState } from "react";

const COLORS = {
  cobalt700: "#0E2349",
  cobalt500: "#173D82",
  cobalt100: "#C6D3EC",
  cobalt50:  "#E6EBF4",
  cobalt25:  "#F5F7FA",
  gray600:   "#475467",
};

export function SourceCard({ title, defaultOpen = false, children, style }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{
      background: COLORS.cobalt25,
      border: `1px solid ${COLORS.cobalt100}`,
      borderRadius: 12,
      fontFamily: "'DM Sans', sans-serif",
      overflow: "hidden",
      ...style,
    }}>
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: open ? "16px 16px 0" : "12px 16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 8,
        }}
        aria-expanded={open}
      >
        <span style={{
          fontSize: 14,
          fontWeight: 600,
          color: COLORS.cobalt700,
          lineHeight: "20px",
        }}>
          {title}
        </span>
        <i
          className={`fa-solid fa-chevron-${open ? "up" : "down"}`}
          style={{ fontSize: 12, color: COLORS.cobalt500, flexShrink: 0 }}
          aria-hidden="true"
        />
      </button>

      {/* Collapsible body */}
      {open && (
        <div style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}
