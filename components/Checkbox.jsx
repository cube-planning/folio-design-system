// Checkbox — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Checkbox (node 236:29293)
//
//   checked  : "unchecked" | "checked" | "mixed" — tri-state, matches native indeterminate semantics
//   size     : "large" (16px) | "small" (14px)
//   onChange : (nextChecked: boolean) => void
//
// Fill/icon colors match ListItem's inline multi-select checkbox for
// visual consistency across the system: cobalt-600 fill, gray-400 border.

const COLORS = {
  cobalt600: "#122E64",
  gray400:   "#98A2B3",
  gray500:   "#97A3B6",
  gray300:   "#E3E8EF",
  white:     "#FFFFFF",
};

const SIZE = {
  large: { box: 16, icon: 9, fontSize: 14 },
  small: { box: 14, icon: 8, fontSize: 12 },
};

export function Checkbox({
  checked = "unchecked",
  onChange,
  disabled = false,
  size = "large",
  label,
  id,
}) {
  const s = SIZE[size] ?? SIZE.large;
  const isChecked = checked === "checked";
  const isMixed = checked === "mixed";
  const filled = isChecked || isMixed;
  const borderColor = disabled ? COLORS.gray300 : filled ? COLORS.cobalt600 : COLORS.gray400;

  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: s.fontSize,
        color: "#101828",
        userSelect: "none",
      }}
    >
      <span
        style={{
          position: "relative",
          width: s.box,
          height: s.box,
          flexShrink: 0,
          borderRadius: 4,
          border: `1px solid ${borderColor}`,
          background: disabled && filled ? COLORS.gray300 : filled ? COLORS.cobalt600 : COLORS.white,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          transition: "background 100ms, border-color 100ms",
        }}
      >
        {isChecked && <i className="fa-solid fa-check" style={{ fontSize: s.icon, color: COLORS.white }} aria-hidden="true" />}
        {isMixed && <i className="fa-solid fa-minus" style={{ fontSize: s.icon, color: COLORS.white }} aria-hidden="true" />}
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          ref={el => { if (el) el.indeterminate = isMixed; }}
          disabled={disabled}
          onChange={e => onChange?.(e.target.checked)}
          style={{
            position: "absolute", opacity: 0, width: "100%", height: "100%",
            margin: 0, cursor: disabled ? "not-allowed" : "pointer",
          }}
        />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
