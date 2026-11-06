// UserDropdown — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Navigation page ›
// "Portal/Navigation/Top/Component/User dropdown" (node 93:23773,
// Default/Hover/Pressed/focused states)
//
// A pill trigger button: avatar (initials) + name + trailing chevron-down,
// used in the portal top nav to open the account menu.
//
// Judgment call: Figma's Default state renders a plain white pill (shadow,
// no fill), while Hover/Pressed/focused swap to a blue-tinted fill with no
// shadow and a slightly different avatar color (teal vs green — reads as
// mock data variance, not an intentional state-driven avatar recolor).
// Modeled as one continuous interaction ramp on top of Default, the same
// pattern as this repo's own Button component (resting/hover/pressed +
// focus-ring), rather than 4 disconnected variants — `avatarColor` stays
// constant across states and is a caller-supplied prop.

import { useState } from "react";

const COLORS = {
  white: "#FFFFFF",
  gray600: "#677489",
  blue50: "#EFF6FF",
  blue100: "#DBEAFE",
  focusRing: "0px 0px 0px 4px rgba(38, 103, 216, 0.24)",
  shadowSm: "0px 1px 3px rgba(16,24,40,.10), 0px 1px 2px rgba(16,24,40,.06)",
};

function initialsFromName(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}

export function UserDropdown({
  name = "User",
  initials,
  avatarColor = "#14B8A6",
  onClick,
  style,
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const resolvedInitials = initials ?? initialsFromName(name);
  const active = hovered || pressed || focused;

  const background = pressed ? COLORS.blue100 : active ? COLORS.blue50 : COLORS.white;
  const boxShadow = focused ? COLORS.focusRing : active ? "none" : COLORS.shadowSm;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        height: 32,
        padding: "4px 6px",
        border: "none",
        borderRadius: 9999,
        background,
        boxShadow,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        transition: "background 80ms ease, box-shadow 80ms ease",
        ...style,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
          borderRadius: 9999,
          background: avatarColor,
          color: COLORS.white,
          fontSize: 10,
          fontWeight: 700,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {resolvedInitials}
      </span>
      <span style={{ fontSize: 14, fontWeight: 400, color: COLORS.gray600, whiteSpace: "nowrap" }}>
        {name}
      </span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22,
          height: 22,
          fontSize: 14,
          color: COLORS.gray600,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        <i className="fa-solid fa-chevron-down" style={{ fontSize: 10 }} />
      </span>
    </button>
  );
}
