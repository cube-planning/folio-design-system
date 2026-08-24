// Tab — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Tab (node 215:27623)
//
//   type   : "primary" (card-style, rounded top + gray-300 border) | "secondary" (underline)
//   active : boolean
//   icon   : optional leading Font Awesome icon element, e.g. <i className="fa-regular fa-bell" />
//            — rendered at 16px inside a centered 24x24 icon slot, per Figma's IconWrapper spec
//   onClick

const COLORS = {
  cobalt500: "#173D82",
  gray300:   "#E3E8EF",
  gray600:   "#677489",
  white:     "#FFFFFF",
};

function IconWrapper({ children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        fontSize: 16,
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}

export function Tab({ children, type = "primary", active = false, icon, onClick }) {
  const textColor = active ? COLORS.cobalt500 : COLORS.gray600;
  const fontWeight = active ? 600 : 400;

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 40,
    paddingInline: 16,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight,
    color: textColor,
    cursor: "pointer",
    background: "none",
    border: "none",
    whiteSpace: "nowrap",
  };

  const typeStyle = type === "primary"
    ? {
        borderRadius: "8px 8px 0 0",
        border: active ? `1px solid ${COLORS.gray300}` : "none",
        borderBottom: active ? "none" : `1px solid ${COLORS.gray300}`,
        background: active ? COLORS.white : "transparent",
      }
    : {
        borderBottom: active ? `2px solid ${COLORS.cobalt500}` : "2px solid transparent",
      };

  return (
    <button onClick={onClick} style={{ ...baseStyle, ...typeStyle }}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </button>
  );
}
