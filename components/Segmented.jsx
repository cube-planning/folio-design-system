const COLORS = {
  cobalt500: "#173D82",
  cobalt100: "#C6D3EC",
  gray900:   "#101828",
  gray200:   "#E4E7EC",
};

export function Segmented({ options = [], value, onChange, size = "large" }) {
  const height = size === "small" ? 28 : 32;
  const fontSize = size === "small" ? 12 : 14;

  return (
    <div
      role="group"
      style={{
        display: "inline-flex",
        gap: 2,
        padding: 2,
        background: COLORS.gray200,
        borderRadius: 9999,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {options.map(opt => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            onClick={() => onChange?.(opt.value)}
            style={{
              height,
              paddingInline: size === "small" ? 12 : 16,
              borderRadius: 9999,
              border: active ? `1px solid ${COLORS.cobalt500}` : "1px solid transparent",
              background: active ? COLORS.cobalt100 : "transparent",
              color: active ? COLORS.cobalt500 : COLORS.gray900,
              fontSize,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 100ms, color 100ms",
              whiteSpace: "nowrap",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
