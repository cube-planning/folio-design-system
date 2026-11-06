import { useState } from "react";
import { SidenavIcon } from "./SidenavIcon.jsx";

// CompanySwitcher — Folio Design System (Navigation)
// Source: Figma "Folio Design System Beta" › Navigation ›
// "Portal/Navigation/Top/Component/Company Switcher" (node 93:23709).
// A pill dropdown trigger for the top nav — shows the active company and
// opens a switcher menu (menu itself isn't in this Figma node; `onClick`
// is left to the consumer to wire up a Select/menu component).
//
// Judgment calls:
//  - Figma's own "Default" state uses rounded-[4px] on the outer clip layer
//    (rounded-[16px] on the inner fill) — almost certainly a Figma authoring
//    slip, since CLAUDE.md's button rule is pill-radius, never 4px. Rendered
//    as a consistent pill (rounded-full) in every state instead.
//  - Uses Blue tokens (not Cobalt) per CLAUDE.md's "blue is for links and
//    navigation only" rule, matching the blue-50/100/500 stops Figma
//    specified for this component's hover/pressed/focus states.

const COLORS = {
  white: "#FFFFFF",
  gray600: "#677489",
  cobalt500: "#173D82",
  blue50: "#EFF6FF",
  blue100: "#DBEAFE",
  blue500: "#2667D8",
};

const SHADOW_SM = "0px 1px 3px rgba(16, 24, 40, 0.10), 0px 1px 2px rgba(16, 24, 40, 0.06)";

export function CompanySwitcher({ companyName = "[Company name]", onClick, disabled = false, style }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const background = pressed ? COLORS.blue100 : hovered ? COLORS.blue50 : COLORS.white;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        height: 32,
        padding: "5.6px 12px",
        border: "none",
        borderRadius: 9999,
        background,
        boxShadow: focused ? `0 0 0 2px ${COLORS.blue500}` : SHADOW_SM,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        fontFamily: "'DM Sans', sans-serif",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <SidenavIcon icon={<i className="fa-solid fa-buildings" style={{ color: COLORS.cobalt500 }} />} />
      <span style={{ fontSize: 14, lineHeight: "20px", color: COLORS.gray600, whiteSpace: "nowrap" }}>
        {companyName}
      </span>
      <SidenavIcon icon={<i className="fa-regular fa-chevron-down" style={{ color: COLORS.gray600 }} />} />
    </button>
  );
}
