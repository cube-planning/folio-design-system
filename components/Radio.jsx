// Radio — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Radio (node 678:43477)
//
//   selected : boolean, controlled
//   size     : "large" (24px) | "small" (22px)
//   onChange : (value) => void — fires when this radio is picked
//
// Colors match Checkbox for visual consistency: selected border/dot is
// cobalt-500, unselected border is gray-500 (per Figma component description).

const COLORS = {
  cobalt500: "#173D82",
  gray500:   "#97A3B6",
  gray300:   "#E3E8EF",
  white:     "#FFFFFF",
};

const SIZE = {
  large: { box: 24, dot: 10, fontSize: 14 },
  small: { box: 22, dot: 9, fontSize: 12 },
};

export function Radio({
  selected = false,
  onChange,
  disabled = false,
  size = "large",
  label,
  name,
  value,
  id,
}) {
  const s = SIZE[size] ?? SIZE.large;
  const borderColor = disabled ? COLORS.gray300 : selected ? COLORS.cobalt500 : COLORS.gray500;
  const dotColor = disabled ? COLORS.gray300 : COLORS.cobalt500;

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
          borderRadius: 9999,
          border: `2px solid ${borderColor}`,
          background: COLORS.white,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          transition: "border-color 100ms",
        }}
      >
        {selected && (
          <span style={{ width: s.dot, height: s.dot, borderRadius: 9999, background: dotColor }} />
        )}
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={selected}
          disabled={disabled}
          onChange={e => onChange?.(e.target.value)}
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
