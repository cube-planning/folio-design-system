const COLORS = {
  cobalt500: "#173D82",
  cobalt400: "#2357B8",
  cobalt300: "#4B7CD8",
  cobalt100: "#C6D3EC",
  gray900:   "#101828",
  gray400:   "#98A2B3",
  gray100:   "#F2F4F7",
  red500:    "#D92D20",
  white:     "#FFFFFF",
};

const STATE_STYLES = {
  default: {
    border: `1px solid ${COLORS.gray400}`,
    background: COLORS.white,
  },
  hover: {
    border: `1px solid ${COLORS.cobalt500}`,
    background: COLORS.white,
  },
  activated: {
    border: `1px solid ${COLORS.cobalt500}`,
    background: COLORS.white,
  },
  focused: {
    border: `1px solid ${COLORS.cobalt500}`,
    background: COLORS.white,
    boxShadow: `0 0 0 3px ${COLORS.cobalt100}`,
  },
  "populated-active": {
    border: `1px solid ${COLORS.cobalt500}`,
    background: COLORS.white,
    boxShadow: `0 0 0 3px ${COLORS.cobalt100}`,
  },
  "populated-inactive": {
    border: `1px solid ${COLORS.gray400}`,
    background: COLORS.white,
  },
  error: {
    border: `1px solid ${COLORS.red500}`,
    background: COLORS.white,
  },
  disabled: {
    border: `1px solid ${COLORS.gray400}`,
    background: COLORS.gray100,
  },
  completed: {
    border: `1px solid ${COLORS.gray400}`,
    background: COLORS.white,
  },
};

const SIZE = {
  large: { height: 32, fontSize: 14, labelSize: 12, px: 8, py: 5 },
  small: { height: 28, fontSize: 12, labelSize: 12, px: 8, py: 4 },
};

export function Input({
  size = "large",
  state = "default",
  label,
  placeholder = "Text",
  value,
  charCount,
  maxChars,
  leadingIcon,
  errorMessage,
  disabled = false,
  onChange,
  style,
}) {
  const resolvedState = disabled ? "disabled" : state;
  const s = SIZE[size] ?? SIZE.large;
  const stateStyle = STATE_STYLES[resolvedState] ?? STATE_STYLES.default;
  const isPopulated = value && value.length > 0;
  const textColor = resolvedState === "disabled" ? COLORS.gray400
    : isPopulated ? COLORS.gray900
    : COLORS.gray400;

  const inputWrapStyle = {
    display: "inline-flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    ...style,
  };

  const fieldStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: s.height,
    paddingInline: s.px,
    paddingBlock: s.py,
    borderRadius: 8,
    fontSize: s.fontSize,
    color: textColor,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    transition: "border 100ms, box-shadow 100ms",
    ...stateStyle,
  };

  return (
    <div style={inputWrapStyle}>
      {label && (
        <label style={{
          fontSize: 12,
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          color: COLORS.gray900,
          lineHeight: "18px",
        }}>
          {label}
        </label>
      )}

      <div style={{ position: "relative", width: "100%" }}>
        <div style={fieldStyle}>
          {leadingIcon && (
            <span style={{ color: COLORS.gray400, display: "inline-flex", flexShrink: 0 }}>
              {leadingIcon}
            </span>
          )}
          <input
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: s.fontSize,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              color: textColor,
              minWidth: 0,
            }}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onChange}
          />
          {charCount && maxChars && (
            <span style={{
              fontSize: 10,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              color: COLORS.gray400,
              flexShrink: 0,
            }}>
              {(value?.length ?? 0)}/{maxChars}
            </span>
          )}
        </div>
      </div>

      {resolvedState === "error" && errorMessage && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: COLORS.red500,
          fontSize: 12,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          lineHeight: "18px",
        }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 12 }} aria-hidden="true" />
          {errorMessage}
        </div>
      )}
    </div>
  );
}
