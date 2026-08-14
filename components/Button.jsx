const COLORS = {
  cobalt500: "#173D82",
  cobalt600: "#122E64",
  cobalt700: "#0E2349",
  cobalt100: "#C6D3EC",
  cobalt50:  "#E6EBF4",
  red500:    "#D92D20",
  red600:    "#B42318",
  red700:    "#912018",
  red100:    "#FFE6E5",
  red50:     "#FEF3F2",
  blue500:   "#2667D8",
  blue600:   "#1D4ED8",
  blue700:   "#1D40AF",
  blue100:   "#DBEAFE",
  blue50:    "#EFF6FF",
  gray900:   "#101828",
  gray700:   "#344054",
  gray200:   "#E4E7EC",
  gray400:   "#98A2B3",
  white:     "#FFFFFF",
};

const TYPE_STYLES = {
  primary: {
    default:  { background: COLORS.cobalt500, color: COLORS.white, border: "none" },
    hover:    { background: COLORS.cobalt600 },
    pressed:  { background: COLORS.cobalt700 },
    focused:  { background: COLORS.cobalt500, boxShadow: `0 0 0 3px ${COLORS.cobalt100}` },
    disabled: { background: COLORS.cobalt500, opacity: 0.38 },
    loading:  { background: COLORS.cobalt500 },
  },
  secondary: {
    default:  { background: COLORS.white, color: COLORS.cobalt500, border: `1.5px solid ${COLORS.cobalt500}` },
    hover:    { background: COLORS.cobalt50 },
    pressed:  { background: COLORS.cobalt100 },
    focused:  { background: "transparent", boxShadow: `0 0 0 3px ${COLORS.cobalt100}` },
    disabled: { opacity: 0.38 },
    loading:  { background: "transparent" },
  },
  destructive: {
    default:  { background: COLORS.red500, color: COLORS.white, border: "none" },
    hover:    { background: COLORS.red600 },
    pressed:  { background: COLORS.red700 },
    focused:  { background: COLORS.red500, boxShadow: `0 0 0 3px ${COLORS.red100}` },
    disabled: { background: COLORS.red500, opacity: 0.38 },
    loading:  { background: COLORS.red500 },
  },
  "destructive-secondary": {
    default:  { background: "transparent", color: COLORS.red500, border: `1.5px solid ${COLORS.red500}` },
    hover:    { background: COLORS.red50 },
    pressed:  { background: COLORS.red100 },
    focused:  { background: "transparent", boxShadow: `0 0 0 3px ${COLORS.red100}` },
    disabled: { opacity: 0.38 },
    loading:  { background: "transparent" },
  },
  "destructive-subtle": {
    default:  { background: COLORS.red100, color: COLORS.red600, border: "none" },
    hover:    { background: "#FECDCA" },
    pressed:  { background: "#FECDCA" },
    focused:  { background: COLORS.red100, boxShadow: `0 0 0 3px ${COLORS.red100}` },
    disabled: { opacity: 0.38 },
    loading:  { background: COLORS.red100 },
  },
  "subtle-blue": {
    default:  { background: COLORS.cobalt50, color: COLORS.cobalt500, border: "none" },
    hover:    { background: COLORS.cobalt100 },
    pressed:  { background: COLORS.cobalt100 },
    focused:  { background: COLORS.cobalt50, boxShadow: `0 0 0 3px ${COLORS.cobalt100}` },
    disabled: { opacity: 0.38 },
    loading:  { background: COLORS.cobalt50 },
  },
  "ghost-blue": {
    default:  { background: "transparent", color: COLORS.blue500, border: "none" },
    hover:    { background: COLORS.blue50 },
    pressed:  { background: COLORS.blue100 },
    focused:  { background: "transparent", boxShadow: `0 0 0 3px ${COLORS.blue100}` },
    disabled: { opacity: 0.38 },
    loading:  { background: "transparent" },
  },
  "ghost-gray": {
    default:  { background: "transparent", color: COLORS.gray700, border: "none" },
    hover:    { background: COLORS.gray200 },
    pressed:  { background: COLORS.gray200 },
    focused:  { background: "transparent", boxShadow: `0 0 0 3px ${COLORS.gray200}` },
    disabled: { opacity: 0.38 },
    loading:  { background: "transparent" },
  },
  "ghost-destructive": {
    default:  { background: "transparent", color: COLORS.red500, border: "none" },
    hover:    { background: COLORS.red50 },
    pressed:  { background: COLORS.red100 },
    focused:  { background: "transparent", boxShadow: `0 0 0 3px ${COLORS.red100}` },
    disabled: { opacity: 0.38 },
    loading:  { background: "transparent" },
  },
};

const SIZE = {
  large: { height: 32, paddingInline: 16, fontSize: 14, iconSize: 14, iconOnly: 32 },
  small: { height: 28, paddingInline: 12, fontSize: 12, iconSize: 12, iconOnly: 28 },
};

function Spinner({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      style={{ animation: "cube-spin 0.75s linear infinite", flexShrink: 0 }}
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <style>{`@keyframes cube-spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

export function Button({
  type = "primary",
  size = "large",
  state = "default",
  radius = 16,      // corner radius in px — 16 (default, pill-like) or 8 (squarer)
  stroke = false,   // add a 1px border in the variant's color (no-op on outlined variants)
  icon,          // icon-only button: pass a Font Awesome <i> element here, not as children
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled = false,
  children,
  onClick,
  style,
  "aria-label": ariaLabel,
}) {
  const resolvedState = disabled ? "disabled" : loading ? "loading" : state;
  const typeStyle = TYPE_STYLES[type]?.default ?? TYPE_STYLES.primary.default;
  const stateOverride = TYPE_STYLES[type]?.[resolvedState] ?? {};
  const s = SIZE[size] ?? SIZE.large;
  const isIconOnly = !!icon && !children;

  if (isIconOnly && !ariaLabel) {
    throw new Error("Button: icon-only buttons require an aria-label.");
  }

  // Optional stroke: add a 1px border in the variant's text color, unless the
  // variant is already outlined (secondary / *-secondary define their own border).
  const hasOwnBorder = typeStyle.border && typeStyle.border !== "none";
  const strokeStyle = stroke && !hasOwnBorder
    ? { border: `1px solid ${typeStyle.color ?? "currentColor"}` }
    : {};

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    height: s.height,
    width: isIconOnly ? s.iconOnly : undefined,
    paddingInline: isIconOnly ? 0 : s.paddingInline,
    borderRadius: radius,
    boxSizing: "border-box",
    fontSize: s.fontSize,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    lineHeight: 1,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    whiteSpace: "nowrap",
    transition: "background 100ms, box-shadow 100ms",
    ...typeStyle,
    ...stateOverride,
    ...strokeStyle,
    ...style,
  };

  return (
    <button
      style={baseStyle}
      disabled={disabled}
      onClick={onClick}
      aria-label={isIconOnly ? ariaLabel : undefined}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <Spinner size={s.iconSize} />
      ) : isIconOnly ? (
        <span style={{ fontSize: s.iconSize, display: "inline-flex" }}>{icon}</span>
      ) : (
        leadingIcon && <span style={{ fontSize: s.iconSize, display: "inline-flex" }}>{leadingIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && trailingIcon && (
        <span style={{ fontSize: s.iconSize, display: "inline-flex" }}>{trailingIcon}</span>
      )}
    </button>
  );
}
