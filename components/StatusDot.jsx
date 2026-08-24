// StatusDot — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Status dot (node 179:23799)
//
//   color : "success" | "warning" | "error"
//
// Each dot has a 3px stroke ring in that status's -100 shade (e.g. success
// ring = green-100), added 2026-08-19.

const COLORS = {
  success: { dot: "#229E66", ring: "#DCFAE6" },
  warning: { dot: "#F79009", ring: "#FEF0C7" },
  error:   { dot: "#D92D20", ring: "#FFE6E5" },
};

export function StatusDot({ color = "success" }) {
  const c = COLORS[color] ?? COLORS.success;
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: 9999,
        background: c.dot,
        boxShadow: `0 0 0 3px ${c.ring}`,
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}
