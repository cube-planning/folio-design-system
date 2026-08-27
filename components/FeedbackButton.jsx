// Feedback Button — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Badge page, "Feedback Button" (node 179:22885)
//
// Small accessory button used inside Toast's button group. Two Figma axes:
//   type : "info" | "error" | "success" | "warning" | "ai" | "neutral"
//          (Figma's own variant is literally named "Nutral" — a typo in the source file,
//          normalized to "neutral" here rather than perpetuated, same call this repo made
//          for Banner's analogous mis-copied variant — see components/Banner.jsx notes.)
//   kind : "plain" (labeled pill, Figma "Plain")  | "ghost" (icon-only dismiss, Figma "Ghost")
//
// Figma's Ghost variant renders the dismiss icon-only button with inconsistent corner radii
// across types (rounded-full for Info, rounded-4px square for every other type) — read as an
// authoring inconsistency rather than intent, so this implementation uses one consistent shape
// (rounded-full, 28x28) for every type, matching CLAUDE.md's pill convention for buttons/chips
// and this repo's existing icon-only button pattern (Badge's remove ×).
//
// Figma's Plain variant nests two concentric pills (an outer ring + a lighter inner fill) for
// success/warning/neutral but a single bordered pill for info/error/ai. Collapsed to one
// consistent single-pill treatment (tinted bg + colored border + colored text) across all six
// types, consistent with how Badge's "solid" type already resolves bg/border/fg per color.

const PALETTE = {
  info:    { bg: "#EFF6FF", border: "#9DC4F8", text: "#2667D8" },
  error:   { bg: "#FEF3F2", border: "#FECDCA", text: "#D92D20" },
  success: { bg: "#ECFDF3", border: "#75E0A7", text: "#229E66" },
  warning: { bg: "#FFFAEB", border: "#FEC84B", text: "#DC6803" },
  ai:      { bg: "#F4F3FF", border: "#DBD0FE", text: "#7A5AF8" },
  neutral: { bg: "#F8FAFC", border: "#E3E8EF", text: "#4A5567" },
};

export function FeedbackButton({
  type = "info",
  kind = "plain",
  children = "Button",
  onClick,
  "aria-label": ariaLabel,
  style,
}) {
  const p = PALETTE[type] ?? PALETTE.info;

  if (kind === "ghost") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel ?? "Dismiss"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          padding: 0,
          border: "none",
          borderRadius: 9999,
          background: "transparent",
          color: p.text,
          cursor: "pointer",
          fontSize: 14,
          lineHeight: 1,
          flexShrink: 0,
          ...style,
        }}
      >
        <i className="fa-regular fa-xmark" aria-hidden="true" />
      </button>
    );
  }

  // kind === "plain"
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 28,
        paddingInline: 10,
        borderRadius: 9999,
        background: p.bg,
        border: `1px solid ${p.border}`,
        color: p.text,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        fontWeight: 500,
        lineHeight: "18px",
        cursor: "pointer",
        whiteSpace: "nowrap",
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
