const VARIANTS = {
  error: {
    background: "#FFE6E5",
    color:      "#B42318",
    icon:       "fa-solid fa-circle-xmark",
  },
  warning: {
    background: "#FFFAEB",
    color:      "#B54708",
    icon:       "fa-solid fa-triangle-exclamation",
  },
  info: {
    background: "#EFF6FF",
    color:      "#1D40AF",
    icon:       "fa-solid fa-circle-info",
  },
  success: {
    background: "#ECFDF3",
    color:      "#067647",
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
