const COLORS = {
  cobalt500: "#173D82",
  gray400:   "#98A2B3",
  white:     "#FFFFFF",
};

export function Toggle({ checked = false, onChange, disabled = false, label, id }) {
  const trackColor = checked ? COLORS.cobalt500 : COLORS.gray400;

  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.38 : 1,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        fontWeight: 400,
        color: "#101828",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 28,
          height: 14,
          borderRadius: 9999,
          background: trackColor,
          flexShrink: 0,
          transition: "background 150ms",
        }}
      >
        <div style={{
          position: "absolute",
          top: 2,
          left: checked ? 14 : 2,
          width: 10,
          height: 10,
          borderRadius: 9999,
          background: COLORS.white,
          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
          transition: "left 150ms",
        }} />
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={e => onChange?.(e.target.checked)}
          style={{
            position: "absolute", opacity: 0, width: "100%", height: "100%",
            margin: 0, cursor: disabled ? "not-allowed" : "pointer",
          }}
        />
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}
