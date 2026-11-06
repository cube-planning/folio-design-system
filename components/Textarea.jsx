import { useEffect, useRef } from "react";

const COLORS = {
  cobalt500: "#173D82",
  cobalt200: "#8EA8E1",
  gray900:   "#101828",
  gray600:   "#677489",
  gray400:   "#98A2B3",
  gray100:   "#F2F4F7",
  red500:    "#D92D20",
  white:     "#FFFFFF",
};

const SHADOW_SM = "0px 1px 3px rgba(16, 24, 40, 0.10), 0px 1px 2px rgba(16, 24, 40, 0.06)";

const STATE_STYLES = {
  default: {
    border: `1px solid ${COLORS.gray400}`,
    background: COLORS.white,
    boxShadow: SHADOW_SM,
  },
  hover: {
    border: `1px solid ${COLORS.cobalt500}`,
    background: COLORS.white,
    boxShadow: SHADOW_SM,
  },
  focused: {
    border: `1px solid ${COLORS.cobalt500}`,
    background: COLORS.white,
    boxShadow: `${SHADOW_SM}, 0 0 0 2px ${COLORS.cobalt200}`,
  },
  error: {
    border: `1px solid ${COLORS.red500}`,
    background: COLORS.white,
    boxShadow: SHADOW_SM,
  },
  disabled: {
    border: `1px solid ${COLORS.gray400}`,
    background: COLORS.gray100,
  },
};

const LINE_HEIGHT = 20;
const FONT_SIZE = 14;
const PADDING_BLOCK = 8;
const PADDING_INLINE = 12;

const SIZE = {
  large: { minHeight: 80 },
  small: { minHeight: 60 },
};

export function Textarea({
  size = "large",
  label,
  required = false,
  placeholder = "Add a comment...",
  value,
  charCount,
  maxChars,
  state = "default",
  errorMessage,
  disabled = false,
  autoResize = true,
  rows,
  maxHeight = 200,
  onChange,
  style,
}) {
  const textareaRef = useRef(null);
  const resolvedState = disabled ? "disabled" : state;
  const stateStyle = STATE_STYLES[resolvedState] ?? STATE_STYLES.default;
  const minHeight = rows ? rows * LINE_HEIGHT + PADDING_BLOCK * 2 : (SIZE[size] ?? SIZE.large).minHeight;

  useEffect(() => {
    if (!autoResize || !textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${Math.max(next, minHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [value, autoResize, maxHeight, minHeight]);

  const wrapStyle = {
    display: "inline-flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    ...style,
  };

  const fieldStyle = {
    display: "block",
    width: "100%",
    minHeight,
    maxHeight: autoResize ? maxHeight : undefined,
    paddingInline: PADDING_INLINE,
    paddingBlock: PADDING_BLOCK,
    borderRadius: 8,
    fontSize: FONT_SIZE,
    lineHeight: `${LINE_HEIGHT}px`,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    color: COLORS.gray900,
    boxSizing: "border-box",
    outline: "none",
    resize: autoResize ? "none" : "vertical",
    overflowY: autoResize ? "hidden" : "auto",
    transition: "border 100ms, box-shadow 100ms",
    ...stateStyle,
  };

  const showHeaderRow = label || (charCount && maxChars);

  return (
    <div style={wrapStyle}>
      {showHeaderRow && (
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: label ? "space-between" : "flex-end", gap: 8 }}>
          {label && (
            <label style={{
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              color: COLORS.gray900,
              lineHeight: "18px",
            }}>
              {label}
              {required && <span style={{ color: COLORS.red500, marginLeft: 2 }}>*</span>}
            </label>
          )}
          {charCount && maxChars && (
            <span style={{
              fontSize: 12,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              color: COLORS.gray600,
              flexShrink: 0,
            }}>
              {(value?.length ?? 0)}/{maxChars}
            </span>
          )}
        </div>
      )}

      <textarea
        ref={textareaRef}
        style={fieldStyle}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        rows={autoResize ? undefined : rows}
      />

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
