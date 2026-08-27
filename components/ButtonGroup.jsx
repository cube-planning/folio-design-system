import { useState } from "react";

// ButtonGroup — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Button group (node 179:39429)
// and Button group/block (node 179:39663, which turned out to just be the same
// component's Default/Hover/Pressed state documentation — not a distinct
// full-width/stacked layout, so it did not warrant a separate component or a
// "block" prop).
//
// A row of joined, icon-only action buttons (e.g. Merge / Duplicate / AI
// Analyze on a scenario row) sharing one continuous cobalt-500 border, with
// rounded end caps and square-cut joins in the middle. Distinct from
// SegmentedButton: there is no "selected" state here — every segment is an
// independent click target (a command), not a single-choice toggle.
//
// Simplification: Figma models each segment with its own partial borders
// (e.g. the left segment has border-top/left/bottom but not border-right) so
// adjacent segments don't double up their shared edge. We reproduce the same
// visual with one outer 1px cobalt-500 border around the whole group plus a
// 1px cobalt-500 divider between segments — equivalent pixels, fewer
// per-segment conditionals.

const COLORS = {
  cobalt100: "#C6D3EC", // hover fill
  cobalt200: "#8EABE1", // pressed fill
  cobalt500: "#173D82", // border + icon color
};

const SHADOW_SM = "0 1px 1.5px rgba(16,24,40,.10), 0 1px 1px rgba(16,24,40,.06)";

const SIZE = 32; // only size observed in the Figma spec
const ICON_SIZE = 16;
const ICON_WRAP = 24;

function IconSlot({ children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: ICON_WRAP,
        height: ICON_WRAP,
        fontSize: ICON_SIZE,
        color: COLORS.cobalt500,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function ButtonGroup({ items = [], style }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(null);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "#FFFFFF",
        border: `1px solid ${COLORS.cobalt500}`,
        borderRadius: 16,
        boxShadow: SHADOW_SM,
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        ...style,
      }}
    >
      {items.map((item, i) => {
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        const isPressed = pressedIndex === i;
        const isHovered = hoveredIndex === i;
        const disabled = !!item.disabled;

        let background = "transparent";
        if (!disabled && isPressed) background = COLORS.cobalt200;
        else if (!disabled && isHovered) background = COLORS.cobalt100;

        if (!item["aria-label"]) {
          throw new Error("ButtonGroup: every item requires an aria-label (icon-only button).");
        }

        return (
          <button
            key={item.value ?? i}
            type="button"
            aria-label={item["aria-label"]}
            disabled={disabled}
            onClick={item.onClick}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setPressedIndex(null);
            }}
            onMouseDown={() => setPressedIndex(i)}
            onMouseUp={() => setPressedIndex(null)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: SIZE,
              height: SIZE,
              boxSizing: "border-box",
              background,
              border: "none",
              borderLeft: isFirst ? "none" : `1px solid ${COLORS.cobalt500}`,
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.5 : 1,
              transition: "background 80ms ease",
              padding: 0,
            }}
          >
            <IconSlot>{item.icon}</IconSlot>
          </button>
        );
      })}
    </div>
  );
}
