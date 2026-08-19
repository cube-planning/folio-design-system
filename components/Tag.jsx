// Tag — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Tag (node 397:40165 / 397:40181)
//
//   size        : "large" (14px text) | "small" (12px text)
//   canBeCleared: shows a trailing remove affordance
//   onRemove    : () => void — fires when the clear icon is clicked

const COLORS = {
  cobalt500: "#173D82",
  cobalt50:  "#E6EBF4",
};

const SIZE = {
  large: { fontSize: 14, height: 24 },
  small: { fontSize: 12, height: 20 },
};

export function Tag({ children, size = "large", canBeCleared = false, onRemove }) {
  const s = SIZE[size] ?? SIZE.large;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        height: s.height,
        paddingInline: canBeCleared ? "4px 4px" : 4,
        borderRadius: 3,
        background: COLORS.cobalt50,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: s.fontSize,
        color: COLORS.cobalt500,
        whiteSpace: "nowrap",
      }}
    >
      {children}
      {canBeCleared && (
        <button
          onClick={e => { e.stopPropagation(); onRemove?.(); }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 0, display: "inline-flex", alignItems: "center",
            color: COLORS.cobalt500, flexShrink: 0,
          }}
          aria-label="Remove"
        >
          <i className="fa-solid fa-xmark" style={{ fontSize: 10 }} aria-hidden="true" />
        </button>
      )}
    </span>
  );
}
