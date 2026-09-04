// AccordionSection — Folio Design System (Composite)
// Checked against Figma "Add-Ons" (kmQDBYBQPuG9bt90qedB6A, node 6399:17463)
// — the actual source file for the addon. The open/closed "section header"
// pattern repeats inline across Build/Analyze/Publish/Tables there; only the
// two collapsed states (Publish, Tables) are factored into named components
// (`PublishCard`/`TablesCard` — see those files), and the open-state
// wrapper itself has no distinct name to adopt. Confirmed intentional,
// generic addition.
// Built from: Icon (Font Awesome), Text, chevron toggle — no domain knowledge.
//
// A single collapsible section: icon + title row that expands to reveal
// `children`. Used to build the Cube Add-on sidebar's Build/Analyze/Publish/
// Tables stack, but generic enough for any collapsible panel list.
//
// Colors verified against Figma "Add-Ons" file (node 6399:17463): each
// section carries a theme — Build/Publish/Tables are Brand-Blue, Analyze is
// Purple — that colors its header text and, only while open, its
// background/border tint. Collapsed sections stay white with a Brand-Blue-100
// border regardless of theme. That frame sets the header label in Lato
// SemiBold; kept DM Sans here per CLAUDE.md's "DM Sans only" rule.
//
//   icon    : leading Font Awesome <i/>, colored to match the title
//   title   : section label
//   theme   : "blue" (default) | "purple"
//   open    : controlled expanded state
//   onToggle: (nextOpen) => void — fires on header click
//   badge   : optional trailing node before the chevron (e.g. an info icon)
//
// A section with no `children` never renders as open, even when `open` is
// true: an expanded body wrapper with nothing in it reads as a tall blank
// card, and the up-chevron/tinted background promise content that isn't
// there. `open` alone used to drive all four of those, so a section wired
// up before its panel existed rendered as visibly broken rather than
// simply collapsed.

import { Children, useId } from "react";

const COLORS = {
  gray900: "#222B3A",
  white:   "#FFFFFF",
};

const THEME = {
  blue:   { text: "#263FA9", border: "#DBEAFE", openBg: "#F7FBFF" },
  purple: { text: "#4A1FB8", border: "#EBE9FE", openBg: "#FBFAFE" },
};

export function AccordionSection({ icon, title, theme = "blue", open = false, onToggle, badge, children }) {
  const bodyId = useId();
  const t = THEME[theme] ?? THEME.blue;
  // Children.toArray drops null/undefined/false, so conditionally-rendered
  // children that all resolve to nothing count as an empty body.
  const isOpen = open && Children.toArray(children).length > 0;

  return (
    <div
      style={{
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        background: isOpen ? t.openBg : COLORS.white,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={() => onToggle?.(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 56,
          padding: "0 16px",
          background: "none",
          border: "none",
          borderRadius: 12,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {icon && (
          <span style={{ display: "inline-flex", fontSize: 16, color: t.text, flexShrink: 0 }} aria-hidden="true">
            {icon}
          </span>
        )}
        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: t.text }}>
          {title}
        </span>
        {badge}
        <i
          className={`fa-solid fa-chevron-${isOpen ? "up" : "down"}`}
          style={{ fontSize: 12, color: COLORS.gray900, flexShrink: 0 }}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div id={bodyId} style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
          {children}
        </div>
      )}
    </div>
  );
}
