// Toast — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Badge page, "Toast" (node 179:22969)
//
// Axes from Figma:
//   type    : "success" | "warning" | "error" | "info" | "ai" | "neutral"
//             (Figma's "Nutral" typo normalized to "neutral" — see FeedbackButton.jsx notes)
//   header  : optional SemiBold lead line
//   button  : optional trailing labeled FeedbackButton — pass a string, or `false` to omit
//   dismissable : optional trailing FeedbackButton ghost × — defaults on, pass false to omit
//
// Icon set matches Banner's exactly (circle-check / triangle-exclamation / circle-xmark /
// circle-info / sparkles / circle-exclamation-regular) — same Figma component descriptions.
// Error is the only type with different header/body text shades (red-800 / red-700), same
// asymmetry Banner already documents for its own Error variant.

import { FeedbackButton } from "./FeedbackButton.jsx";

const VARIANTS = {
  success: {
    background: "var(--color-green-100)",
    border:     "var(--color-green-300)",
    color:      "var(--color-green-700)",
    icon:       "fa-solid fa-circle-check",
  },
  warning: {
    background: "var(--color-yellow-100)",
    border:     "var(--color-yellow-300)",
    color:      "var(--color-yellow-700)",
    icon:       "fa-solid fa-triangle-exclamation",
  },
  error: {
    background:  "var(--color-red-100)",
    border:      "var(--color-red-300)",
    color:       "var(--color-red-700)",
    headerColor: "var(--color-red-800)",
    icon:        "fa-solid fa-circle-xmark",
  },
  info: {
    background: "var(--color-blue-50)",
    color:      "var(--color-blue-700)",
    icon:       "fa-solid fa-circle-info",
  },
  ai: {
    background: "var(--color-purple-50)",
    color:      "var(--color-purple-700)",
    icon:       "fa-solid fa-sparkles",
  },
  neutral: {
    background: "var(--color-gray-50)",
    border:     "var(--color-gray-300)",
    color:      "var(--color-gray-800)",
    icon:       "fa-regular fa-circle-exclamation",
  },
};

function IconWrapper({ children }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, flexShrink: 0 }}>
      {children}
    </span>
  );
}

export function Toast({
  type = "success",
  title,
  children,
  button = "Button",
  onButtonClick,
  dismissable = true,
  onDismiss,
  style,
}) {
  const v = VARIANTS[type] ?? VARIANTS.success;

  return (
    <div
      role="status"
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        padding: 8,
        width: 300,
        boxSizing: "border-box",
        borderRadius: 8,
        background: v.background,
        border: v.border ? `1px solid ${v.border}` : "none",
        boxShadow: "var(--shadow-md)",
        fontFamily: "'DM Sans', sans-serif",
        ...style,
      }}
    >
      <div style={{ display: "flex", flex: 1, minWidth: 0, gap: 4, alignItems: "flex-start" }}>
        <IconWrapper>
          <i className={v.icon} style={{ fontSize: 16, color: v.color }} aria-hidden="true" />
        </IconWrapper>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, gap: 4, paddingTop: 2 }}>
          {title && (
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: v.headerColor ?? v.color, lineHeight: "20px" }}>
              {title}
            </p>
          )}
          {children && (
            <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: v.color, lineHeight: "20px" }}>
              {children}
            </p>
          )}
        </div>
      </div>

      {(button || dismissable) && (
        <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
          {button && (
            <FeedbackButton type={type} kind="plain" onClick={onButtonClick}>
              {button}
            </FeedbackButton>
          )}
          {dismissable && (
            <FeedbackButton type={type} kind="ghost" onClick={onDismiss} aria-label="Dismiss" />
          )}
        </div>
      )}
    </div>
  );
}
