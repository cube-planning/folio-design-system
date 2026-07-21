// Segmented — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Segmented button (node 179:39449)
//
//   options : Array<{ value, label?, icon?, "aria-label"? }>
//             label only → Text; icon only → Icon; both → Icon+Text
//   value / onChange : controlled selection
//   size    : "large" (32) | "small" (28)
//
// Container is gray-200; unselected segments blend into it; the selected
// segment is a cobalt-50 chip with a cobalt-500 border.

const COLORS = {
  gray200:   "#F2F5F9",   // track + unselected segment
  gray900:   "#222B3A",   // unselected text
  cobalt50:  "#E6EBF4",   // selected fill
  cobalt500: "#173D82",   // selected text + border
};

const SIZE = {
  large: { height: 32, fontSize: 14, icon: 16, iconWrap: 24, padX: 8, padIT: 4, padIcon: 4 },
  small: { height: 28, fontSize: 12, icon: 14, iconWrap: 22, padX: 8, padIT: 3, padIcon: 3 },
};

function IconSlot({ box, size, children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: box, height: box, fontSize: size, lineHeight: 1, flexShrink: 0,
    }} aria-hidden="true">
      {children}
    </span>
  );
}

export function Segmented({ options = [], value, onChange, size = "large" }) {
  const s = SIZE[size] ?? SIZE.large;

  return (
    <div
      role="radiogroup"
      style={{
        display: "inline-flex",
        gap: 4,
        background: COLORS.gray200,
        borderRadius: 4,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        const hasIcon = !!opt.icon;
        const hasLabel = opt.label != null && opt.label !== "";

        // padding by type
        let padding;
        if (hasIcon && !hasLabel) padding = { padding: s.padIcon };
        else if (hasIcon && hasLabel) padding = { paddingLeft: s.padIT, paddingRight: s.padX, paddingBlock: s.padIT };
        else padding = { paddingInline: s.padX };

        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={!hasLabel ? (opt["aria-label"] ?? opt.value) : undefined}
            onClick={() => onChange?.(opt.value)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              height: s.height,
              boxSizing: "border-box",
              borderRadius: active ? 8 : 4,
              border: `1px solid ${active ? COLORS.cobalt500 : "transparent"}`,
              background: active ? COLORS.cobalt50 : "transparent",
              color: active ? COLORS.cobalt500 : COLORS.gray900,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: s.fontSize,
              fontWeight: 500,
              lineHeight: 1,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background 100ms, color 100ms, border-color 100ms",
              ...padding,
            }}
          >
            {hasIcon && <IconSlot box={s.iconWrap} size={s.icon}>{opt.icon}</IconSlot>}
            {hasLabel && <span>{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
