// AiPromptBar — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › AI Prompt Bar (node 102:30888, Input-Tab page)
//
//   size          : "large" | "small" — drives field font size (14px / 12px), matching Input.jsx's SIZE map
//   state         : "default" | "hover" | "focused" | "error" | "disabled" — explicit, controlled state,
//                   same pattern as Input.jsx's `state` prop rather than relying on CSS :hover/:focus
//   expanded      : collapsed single-line pill (48px, rounded-full) vs the multi-line "textarea" mode
//                   (fixed 200px box, rounded-2xl) — Figma modeled these as two full variant trees;
//                   here they're one component switched by a boolean, since the only real difference
//                   is `<input>` vs `<textarea>` and border-radius/height
//   splitButton   : adds a secondary chevron affordance next to the AI submit icon (Figma's
//                   "Split Button" — e.g. for a "more AI actions" menu). Judgment call: rendered as a
//                   divider + small chevron-down inside the same pill rather than a fully separate
//                   button, since Figma's two icons share one gradient/border shape.
//   value / onChange / onSubmit / onSplitAction / placeholder / disabled
//   helperText    : the small print under the field (Figma default: Cube's AI disclaimer copy)
//   errorMessage  : shown instead of helperText when state === "error"
//
// Icons verified against fontawesome-pro-7.3.1-web/svgs: arrow-up (regular), chevron-down (solid),
// circle-xmark (solid) — matching the doc links Figma attached to this node's icon instances.

const COLORS = {
  purple600: "#6938EF",
  purple500: "#7A5AF8",
  purple400: "#9B8AFB",
  purple300: "#BDB4FE",
  gray900:   "#222B3A",
  gray700:   "#4A5567",
  gray500:   "#97A3B6",
  gray400:   "#CDD5E0",
  gray200:   "#F2F5F9",
  red500:    "#D92D20",
  white:     "#FFFFFF",
};

const SIZE = {
  large: { fontSize: 14 },
  small: { fontSize: 12 },
};

const STATE_STYLES = {
  default:  { border: `1px solid ${COLORS.gray400}`, background: COLORS.white },
  hover:    { border: `1px solid ${COLORS.purple500}`, background: COLORS.white },
  focused:  { border: `1px solid ${COLORS.purple500}`, background: COLORS.white, boxShadow: "0px 0px 0px 4px rgba(122, 90, 248, 0.24)" },
  error:    { border: `1px solid ${COLORS.red500}`, background: COLORS.white },
  disabled: { border: `1px solid ${COLORS.purple300}`, background: COLORS.gray200 },
};

function AiActionButton({ size = "large", split = false, disabled = false, onSubmit, onSplitAction }) {
  const iconPx = size === "small" ? 12 : 14;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 32,
        padding: 4,
        borderRadius: 9999,
        border: `1px solid ${disabled ? COLORS.purple300 : COLORS.purple500}`,
        background: disabled
          ? COLORS.purple300
          : `linear-gradient(135deg, ${COLORS.purple600} 0%, ${COLORS.purple500} 55%, ${COLORS.purple400} 100%)`,
        opacity: disabled ? 0.6 : 1,
        flexShrink: 0,
      }}
    >
      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled}
        aria-label="Submit AI prompt"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
          background: "none",
          border: "none",
          padding: 0,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <i className="fa-regular fa-arrow-up" style={{ fontSize: iconPx, color: COLORS.white }} aria-hidden="true" />
      </button>
      {split && (
        <>
          <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.4)", margin: "0 2px" }} aria-hidden="true" />
          <button
            type="button"
            onClick={onSplitAction}
            disabled={disabled}
            aria-label="More AI actions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              background: "none",
              border: "none",
              padding: 0,
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            <i className="fa-solid fa-chevron-down" style={{ fontSize: 10, color: COLORS.white }} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}

export function AiPromptBar({
  size = "large",
  state = "default",
  expanded = false,
  splitButton = false,
  disabled = false,
  value = "",
  placeholder = "What can we help you with today?",
  helperText = "Cube uses AI to summarize your analysis by extracting key data points. Review all generated content before use – AI may make mistakes.",
  showHelperText = true,
  errorMessage = "Error Message",
  onChange,
  onSubmit,
  onSplitAction,
  style,
}) {
  const resolvedState = disabled ? "disabled" : state;
  const s = SIZE[size] ?? SIZE.large;
  const fieldStateStyle = STATE_STYLES[resolvedState] ?? STATE_STYLES.default;
  const textColor = resolvedState === "disabled" ? COLORS.gray500 : COLORS.gray900;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    boxSizing: "border-box",
    ...style,
  };

  const fieldWrapStyle = {
    display: "flex",
    alignItems: expanded ? "stretch" : "center",
    flexDirection: expanded ? "column" : "row",
    justifyContent: expanded ? "space-between" : "flex-start",
    gap: 8,
    width: "100%",
    minHeight: expanded ? 200 : 48,
    maxHeight: expanded ? 200 : undefined,
    boxSizing: "border-box",
    padding: expanded ? 16 : "0 8px 0 16px",
    borderRadius: expanded ? 16 : 9999,
    transition: "border 100ms, box-shadow 100ms",
    ...fieldStateStyle,
  };

  const fieldFont = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: s.fontSize,
    color: textColor,
    width: "100%",
    minWidth: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={fieldWrapStyle}>
        {expanded ? (
          <textarea
            value={value}
            placeholder={disabled ? "Ask for changes" : placeholder}
            disabled={disabled}
            onChange={onChange}
            style={{ ...fieldFont, resize: "none" }}
          />
        ) : (
          <input
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
          style={fieldFont}
          />
        )}

        <div style={{ display: "flex", justifyContent: expanded ? "flex-end" : "flex-start", width: expanded ? "100%" : undefined }}>
          <AiActionButton size={size} split={splitButton} disabled={disabled} onSubmit={onSubmit} onSplitAction={onSplitAction} />
        </div>
      </div>

      {resolvedState === "error" ? (
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: COLORS.red500, fontSize: 12, fontWeight: 500 }}>
          <i className="fa-solid fa-circle-xmark" style={{ fontSize: 12 }} aria-hidden="true" />
          {errorMessage}
        </div>
      ) : (
        showHelperText && (
          <p style={{ margin: 0, fontSize: 12, color: COLORS.gray700, lineHeight: "18px" }}>
            {helperText}
          </p>
        )
      )}
    </div>
  );
}
