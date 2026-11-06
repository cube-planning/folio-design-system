// HelpMenu — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Navigation page ›
// "Portal/Navigation/Top/Component/Help Menu" (node 93:23738, Default/Hover row states)
//
// A small dropdown panel (rendered open/static — positioning against a
// trigger is left to the consumer, same convention as this repo's other
// dropdown-shaped components) listing 4 fixed help actions: Help Center,
// What's New, Submit Feedback, Status page.
//
// Judgment call: Figma's "Check Cube's Status" row uses a custom brand
// favicon image asset (a Statuspage icon), not a Font Awesome glyph — since
// image assets aren't sourced/vendored for this component and every other
// row already uses an FA icon, swapped in `fa-solid fa-tower-broadcast` as a
// generic "status/signal" stand-in consistent with the rest of the icon set.

import { useState } from "react";

const COLORS = {
  white: "#FFFFFF",
  gray700: "#4A5567",
  gray300: "#E3E8EF",
  blue500: "#2667D8",
  blue50: "#EFF6FF",
};

const ITEMS = [
  { key: "help", icon: "fa-circle-info", label: "Visit the Help Center", handlerProp: "onHelpCenterClick" },
  { key: "whatsNew", icon: "fa-megaphone", label: "See what's new", handlerProp: "onWhatsNewClick" },
  { key: "feedback", icon: "fa-message-lines", label: "Submit Feedback", handlerProp: "onFeedbackClick" },
  { key: "status", icon: "fa-tower-broadcast", label: "Check Cube's Status", handlerProp: "onStatusClick" },
];

export function HelpMenu({
  onHelpCenterClick,
  onWhatsNewClick,
  onFeedbackClick,
  onStatusClick,
  style,
}) {
  const [hoveredKey, setHoveredKey] = useState(null);

  const handlers = { onHelpCenterClick, onWhatsNewClick, onFeedbackClick, onStatusClick };

  return (
    <div
      role="menu"
      style={{
        display: "flex",
        flexDirection: "column",
        width: 220,
        background: COLORS.white,
        border: `1px solid ${COLORS.gray300}`,
        borderRadius: 6,
        padding: "8px 0",
        fontFamily: "'DM Sans', sans-serif",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {ITEMS.map((item) => {
        const onClick = handlers[item.handlerProp];
        const isHovered = hoveredKey === item.key;
        return (
          <button
            key={item.key}
            type="button"
            role="menuitem"
            onClick={onClick}
            onMouseEnter={() => setHoveredKey(item.key)}
            onMouseLeave={() => setHoveredKey(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              height: 28,
              padding: "4px 8px 4px 4px",
              border: "none",
              background: isHovered ? COLORS.blue50 : "transparent",
              color: COLORS.gray700,
              fontSize: 12,
              fontFamily: "'DM Sans', sans-serif",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                fontSize: 12,
                color: COLORS.blue500,
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <i className={`fa-solid ${item.icon}`} />
            </span>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
