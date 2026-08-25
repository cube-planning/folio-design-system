import { useState, useRef } from "react";

// Button 3.0 — palette and interaction model sourced from the approved
// prototype (prototypes/button-3-prototype.html). A few stops (secondary/
// ghost hover, destructive pressed, focus outline color) are prototype-
// specific and intentionally don't match tokens.css 1:1.

const SHADOW = {
  sm: "0 1px 3px rgba(16,24,40,.10), 0 1px 2px rgba(16,24,40,.06)",
  md: "0 4px 8px rgba(16,24,40,.08), 0 2px 4px rgba(16,24,40,.04)",
};

const VARIANTS = {
  primary: {
    default: { background: "#173D82", color: "#FFFFFF", boxShadow: SHADOW.sm },
    hover: { background: "#122E64", boxShadow: SHADOW.md },
    pressed: { background: "#0E2349" },
    focusOutline: "#A6BEEB",
    ripple: "rgba(14,35,73,.10)",
    spinner: { border: "rgba(255,255,255,.3)", top: "#FFFFFF" },
  },
  secondary: {
    default: { background: "#FFFFFF", color: "#173D82", border: "1.5px solid #173D82", boxShadow: SHADOW.sm },
    hover: { background: "#EEF2FA", boxShadow: SHADOW.md },
    pressed: { background: "#D9E3F5" },
    focusOutline: "#A6BEEB",
    ripple: "rgba(14,35,73,.10)",
    spinner: { border: "rgba(23,61,130,.2)", top: "#173D82" },
  },
  "subtle-blue": {
    default: { background: "#E6EBF4", color: "#173D82", boxShadow: SHADOW.sm },
    hover: { background: "#C6D3EC", boxShadow: SHADOW.md },
    pressed: { background: "#C6D3EC" },
    focusOutline: "#A6BEEB",
    ripple: "rgba(14,35,73,.10)",
    spinner: { border: "rgba(23,61,130,.2)", top: "#173D82" },
  },
  "ghost-blue": {
    default: { background: "transparent", color: "#173D82" },
    hover: { background: "#EEF2FA" },
    pressed: { background: "#D9E3F5" },
    focusOutline: "#A6BEEB",
    ripple: "rgba(14,35,73,.10)",
    spinner: { border: "rgba(23,61,130,.2)", top: "#173D82" },
  },
  "ghost-gray": {
    default: { background: "transparent", color: "#4A5567" },
    hover: { background: "#F1F4F8" },
    pressed: { background: "#E3E8EF" },
    focusOutline: "#CDD5E0",
    ripple: "rgba(14,35,73,.10)",
    spinner: { border: "rgba(23,61,130,.2)", top: "#173D82" },
  },
  destructive: {
    default: { background: "#D92D20", color: "#FFFFFF", boxShadow: SHADOW.sm },
    hover: { background: "#B42318", boxShadow: SHADOW.md },
    pressed: { background: "#7A1A12" },
    focusOutline: "#FDA29B",
    ripple: "rgba(217,45,32,.10)",
    spinner: { border: "rgba(255,255,255,.3)", top: "#FFFFFF" },
  },
  "destructive-secondary": {
    default: { background: "#FFFFFF", color: "#B42318", border: "1.5px solid #D92D20", boxShadow: SHADOW.sm },
    hover: { background: "#FEF3F2", boxShadow: SHADOW.md },
    pressed: { background: "#FEE4E2" },
    focusOutline: "#FDA29B",
    ripple: "rgba(217,45,32,.10)",
    spinner: { border: "rgba(180,35,24,.2)", top: "#B42318" },
  },
  "destructive-subtle": {
    default: { background: "#FEF3F2", color: "#B42318", boxShadow: SHADOW.sm },
    hover: { background: "#FEE4E2", boxShadow: SHADOW.md },
    pressed: { background: "#FECDC9" },
    focusOutline: "#FDA29B",
    ripple: "rgba(217,45,32,.10)",
    spinner: { border: "rgba(180,35,24,.2)", top: "#B42318" },
  },
  "ghost-destructive": {
    default: { background: "transparent", color: "#D92D20" },
    hover: { background: "#FEF3F2" },
    pressed: { background: "#FEE4E2" },
    focusOutline: "#FDA29B",
    ripple: "rgba(217,45,32,.10)",
    spinner: { border: "rgba(180,35,24,.2)", top: "#B42318" },
  },
  "plain-blue": {
    plain: true,
    default: { background: "transparent", color: "#173D82" },
    hover: { textDecoration: "underline", textUnderlineOffset: "2px" },
    pressed: { opacity: 0.7 },
    focusOutline: "#A6BEEB",
    spinner: { border: "rgba(23,61,130,.2)", top: "#173D82" },
  },
  "plain-gray": {
    plain: true,
    default: { background: "transparent", color: "#4A5567" },
    hover: { textDecoration: "underline", textUnderlineOffset: "2px" },
    pressed: { opacity: 0.7 },
    focusOutline: "#CDD5E0",
    spinner: { border: "rgba(23,61,130,.2)", top: "#173D82" },
  },
  "plain-destructive": {
    plain: true,
    default: { background: "transparent", color: "#D92D20" },
    hover: { textDecoration: "underline", textUnderlineOffset: "2px" },
    pressed: { opacity: 0.7 },
    focusOutline: "#FDA29B",
    spinner: { border: "rgba(180,35,24,.2)", top: "#B42318" },
  },
};

const SIZE = {
  large: { height: 32, paddingInline: 16, fontSize: 14, iconSize: 14, iconWrapper: 24, iconOnly: 32 },
  small: { height: 28, paddingInline: 12, fontSize: 12, iconSize: 12, iconWrapper: 22, iconOnly: 28 },
};

let keyframesInjected = false;
function ensureKeyframes() {
  if (keyframesInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent =
    "@keyframes cube-spin { to { transform: rotate(360deg); } } " +
    "@keyframes cube-ripple { to { transform: scale(4); opacity: 0; } }";
  document.head.appendChild(style);
  keyframesInjected = true;
}

// Icon glyph centered inside a larger square hit-box, matching Figma's "IconWrapper".
function IconSlot({ size, wrapperSize, children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: wrapperSize,
        height: wrapperSize,
        fontSize: size,
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}

function Spinner({ size, border, top }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      style={{ animation: "cube-spin 600ms linear infinite", flexShrink: 0 }}
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5.5" stroke={border} strokeWidth="1.5" />
      <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke={top} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "large",
  state, // force a pseudo-state ("hover" | "focused" | "pressed") for docs/preview screenshots
  icon, // icon-only button: pass a Font Awesome <i> element here, not as children
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled = false,
  children,
  onClick,
  style,
  "aria-label": ariaLabel,
}) {
  ensureKeyframes();

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);

  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZE[size] ?? SIZE.large;
  const isIconOnly = !!icon && !children;

  if (isIconOnly && !ariaLabel) {
    throw new Error("Button: icon-only buttons require an aria-label.");
  }

  const interactive = !disabled && !loading;

  const handleClick = (e) => {
    if (!disabled && !loading && !v.plain) {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const rippleSize = Math.max(rect.width, rect.height) * 2;
      const id = ++rippleId.current;
      setRipples((prev) => [
        ...prev,
        { id, x: e.clientX - rect.left - rippleSize / 2, y: e.clientY - rect.top - rippleSize / 2, size: rippleSize },
      ]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 450);
    }
    onClick?.(e);
  };

  const isPressed = pressed || state === "pressed";
  const isHovered = hovered || state === "hover";
  const isFocused = focused || state === "focused";

  let visualStyle = { ...v.default };
  if (interactive && isPressed) visualStyle = { ...visualStyle, ...v.pressed };
  else if (interactive && isHovered) visualStyle = { ...visualStyle, ...v.hover };

  const focusStyle = interactive && isFocused
    ? { outline: `2px solid ${v.focusOutline}`, outlineOffset: 2, boxShadow: "none" }
    : { outline: "none" };

  const disabledStyle = disabled ? { opacity: 0.7, boxShadow: "none" } : {};

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    position: "relative",
    overflow: v.plain ? "visible" : "hidden",
    height: v.plain ? "auto" : s.height,
    width: isIconOnly ? s.iconOnly : undefined,
    paddingInline: v.plain ? 0 : isIconOnly ? 0 : s.paddingInline,
    borderRadius: v.plain ? 4 : 9999,
    boxSizing: "border-box",
    fontSize: s.fontSize,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    lineHeight: 1,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    whiteSpace: "nowrap",
    transition: "background 80ms ease, box-shadow 80ms ease, transform 60ms ease",
    transform: interactive && pressed ? "scale(0.97)" : "none",
    ...visualStyle,
    ...focusStyle,
    ...disabledStyle,
    ...style,
  };

  const contentStyle = loading ? { color: "transparent" } : undefined;

  return (
    <button
      type="button"
      style={baseStyle}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label={isIconOnly ? ariaLabel : undefined}
      aria-busy={loading || undefined}
    >
      {isIconOnly ? (
        <IconSlot size={s.iconSize} wrapperSize={s.iconWrapper}>{loading ? null : icon}</IconSlot>
      ) : (
        !loading && leadingIcon && <IconSlot size={s.iconSize} wrapperSize={s.iconWrapper}>{leadingIcon}</IconSlot>
      )}
      {children && <span style={contentStyle}>{children}</span>}
      {!loading && !isIconOnly && trailingIcon && (
        <IconSlot size={s.iconSize} wrapperSize={s.iconWrapper}>{trailingIcon}</IconSlot>
      )}
      {loading && (
        <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Spinner size={s.iconSize} border={v.spinner.border} top={v.spinner.top} />
        </span>
      )}
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            borderRadius: "50%",
            background: v.ripple,
            transform: "scale(0)",
            pointerEvents: "none",
            animation: "cube-ripple 400ms ease-out forwards",
          }}
        />
      ))}
    </button>
  );
}
