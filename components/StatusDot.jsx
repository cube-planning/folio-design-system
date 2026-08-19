// StatusDot — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Status dot (node 179:23799)
//
//   color : "success" | "warning" | "error"

const COLORS = {
  success: "#229E66",
  warning: "#F79009",
  error:   "#D92D20",
};

export function StatusDot({ color = "success" }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: 9999,
        background: COLORS[color] ?? COLORS.success,
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}
