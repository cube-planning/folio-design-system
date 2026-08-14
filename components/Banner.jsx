const VARIANTS = {
  error: {
    background: "var(--color-red-100)",
    border:     "var(--color-red-300)",
    color:      "var(--color-red-700)",
    icon:       "fa-solid fa-circle-xmark",
  },
  warning: {
    background: "var(--color-yellow-100)",
    border:     "var(--color-yellow-300)",
    color:      "var(--color-yellow-700)",
    icon:       "fa-solid fa-triangle-exclamation",
  },
  info: {
    background: "var(--color-blue-50)",
    border:     "var(--color-blue-300)",
    color:      "var(--color-blue-700)",
    icon:       "fa-solid fa-circle-info",
  },
  success: {
    background: "var(--color-green-100)",
    border:     "var(--color-green-300)",
    color:      "var(--color-green-700)",
    icon:       "fa-solid fa-circle-check",
  },
};

export function Banner({ variant = "info", title, children, style }) {
  const v = VARIANTS[variant] ?? VARIANTS.info;

  return (
    <div style={{
      display: "flex",
      gap: 8,
      padding: 12,
      borderRadius: 12,
      background: v.background,
      border: `1px solid ${v.border}`,
      fontFamily: "'DM Sans', sans-serif",
      ...style,
    }}
      role="alert"
    >
      <i
        className={v.icon}
        style={{ fontSize: 14, color: v.color, marginTop: 1, flexShrink: 0 }}
        aria-hidden="true"
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {title && (
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: v.color, lineHeight: "20px" }}>
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
  );
}
