// Tooltip — Folio Design System (Foundation)
//
//   content   : tooltip body (string or node)
//   placement : "top" (default) | "bottom" | "left" | "right"
//   children  : the trigger element (icon, button, etc.) — Tooltip wraps it,
//               it does not render one for you
//
// Hover/focus driven; dark gray-900 bubble with a matching pointer arrow,
// matching the info-icon tooltip used in the Cube Add-on sidebar.

import { useState } from "react";

const COLORS = {
  gray900: "#101828",
  white: "#FFFFFF",
};

const PLACEMENT = {
  top:    { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
  bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
  left:   { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  right:  { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
};

const ARROW = {
  top:    { top: "100%", left: "50%", marginLeft: -4, borderTopColor: COLORS.gray900 },
  bottom: { bottom: "100%", left: "50%", marginLeft: -4, borderBottomColor: COLORS.gray900 },
  left:   { left: "100%", top: "50%", marginTop: -4, borderLeftColor: COLORS.gray900 },
  right:  { right: "100%", top: "50%", marginTop: -4, borderRightColor: COLORS.gray900 },
};

export function Tooltip({ content, children, placement = "top", maxWidth = 220 }) {
  const [open, setOpen] = useState(false);

  if (!content) return children;

  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            zIndex: 60,
            maxWidth,
            padding: "8px 10px",
            borderRadius: 8,
            background: COLORS.gray900,
            color: COLORS.white,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: 400,
            boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
            pointerEvents: "none",
            ...PLACEMENT[placement] ?? PLACEMENT.top,
          }}
        >
          {content}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 0,
              height: 0,
              border: "4px solid transparent",
              ...ARROW[placement] ?? ARROW.top,
            }}
          />
        </span>
      )}
    </span>
  );
}
