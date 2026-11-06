// Banner — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Banner (node 179:23016)
//
// Axes from Figma:
//   type        : "error" | "warning" | "success" | "info" | "ai" | "neutral"
//   header      : optional SemiBold lead line above the body text (all 6 types
//                 use SemiBold/600 for the header per Figma — confirmed 2026-08-19)
//   button      : optional trailing pill CTA
//   dismissable : optional trailing ghost × button
//   icon        : leading icon — defaults to the type's glyph; pass a Font Awesome
//                 class string to swap it, or `false` to omit the icon entirely
//
// Error is the only type where header/body use different shades in Figma
// (header red-800, body red-700) — every other type uses one shade for both.
// Neutral's Figma feedback-button fill (yellow-200) looks like leftover
// copy-paste from another variant, not intentional — kept our existing
// gray-based button styling instead of copying that inconsistency.

const VARIANTS = {
  error: {
    background:  "var(--color-red-100)",
    color:       "var(--color-red-700)",
    headerColor: "var(--color-red-800)",
    icon:        "fa-solid fa-circle-xmark",
    button:      { background: "var(--color-red-50)", border: "var(--color-red-200)", color: "var(--color-red-500)" },
  },
  warning: {
    background: "var(--color-yellow-100)",
    color:      "var(--color-yellow-700)",
    icon:       "fa-solid fa-triangle-exclamation",
    button:     { background: "var(--color-yellow-50)", border: "var(--color-yellow-200)", color: "var(--color-yellow-600)" },
  },
  success: {
    background: "var(--color-green-100)",
    color:      "var(--color-green-700)",
    icon:       "fa-solid fa-circle-check",
    button:     { background: "var(--color-green-50)", border: "var(--color-green-200)", color: "var(--color-green-500)" },
  },
  info: {
    background: "var(--color-blue-50)",
    color:      "var(--color-blue-700)",
    icon:       "fa-solid fa-circle-info",
    button:     { background: "var(--color-blue-50)", border: "var(--color-blue-200)", color: "var(--color-blue-500)" },
  },
  ai: {
    background: "var(--color-purple-50)",
    color:      "var(--color-purple-700)",
    icon:       "fa-solid fa-sparkles",
    button:     { background: "var(--color-purple-50)", border: "var(--color-purple-200)", color: "var(--color-purple-500)" },
  },
  neutral: {
    background: "var(--color-gray-50)",
    border:     "var(--color-gray-300)",
    color:      "var(--color-gray-800)",
    icon:       "fa-regular fa-circle-exclamation",
    button:     { background: "var(--color-gray-100)", border: "var(--color-gray-300)", color: "var(--color-gray-700)" },
  },
};

function IconWrapper({ children }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, flexShrink: 0 }}>
      {children}
    </span>
  );
}

export function Banner({
  variant = "info",
  title,
  children,
  icon,
  button,
  onButtonClick,
  dismissable = false,
  onDismiss,
  style,
}) {
  const v = VARIANTS[variant] ?? VARIANTS.info;
  const resolvedIcon = icon === false ? null : (icon ?? v.icon);

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        padding: 8,
        borderRadius: 8,
        background: v.background,
        border: v.border ? `1px solid ${v.border}` : "none",
        boxShadow: "var(--shadow-sm)",
        fontFamily: "'DM Sans', sans-serif",
        ...style,
      }}
      role="alert"
    >
      <div style={{ display: "flex", flex: 1, minWidth: 0, gap: 4, alignItems: "flex-start" }}>
        {resolvedIcon && (
          <IconWrapper>
            <i className={resolvedIcon} style={{ fontSize: 16, color: v.color }} aria-hidden="true" />
          </IconWrapper>
        )}
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
            <button
              type="button"
              onClick={onButtonClick}
              style={{
                height: 28,
                paddingInline: 10,
                borderRadius: 9999,
                background: v.button.background,
                border: `1px solid ${v.button.border}`,
                color: v.button.color,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                lineHeight: "18px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {button}
            </button>
          )}
          {dismissable && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                padding: 0,
                border: "none",
                background: "transparent",
                color: v.color,
                cursor: "pointer",
                borderRadius: 9999,
              }}
            >
              <IconWrapper>
                <i className="fa-regular fa-xmark" style={{ fontSize: 16 }} aria-hidden="true" />
              </IconWrapper>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
