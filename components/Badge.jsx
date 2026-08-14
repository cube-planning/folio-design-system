// Badge — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Badge (node 179:23253)
//
// Axes from Figma:
//   type   : "solid" (tinted) | "dark" (strong fill) | "outlined" (neutral chip)
//   color  : green | yellow | red | blue | gray | purple
//            (semantic aliases: success | warning | error | info | neutral | ai)
//   size   : "lg" (32) | "md" (28) | "sm" (20)
//   icon   : leading node (Font Awesome <i/>) — optional
//   dot    : colored indicator dot — optional (carries the color on outlined chips)
//   removable / onRemove : trailing × button — optional
//   selectable           : trailing chevron (filter/select chip) — optional
//
// Legacy variants "lifecycle" and "active" are preserved for existing screens.

const COLORS = {
  white:   "#FFFFFF",
  gray900: "#222B3A",
  gray700: "#4A5567",
  gray500: "#97A3B6",
  gray300: "#E3E8EF",
  gray200: "#F2F5F9",
  gray100: "#F8FAFC",
  gray50:  "#FCFCFD",
  // legacy tokens for lifecycle/active
  cobalt100: "#C6D3EC",
  cobalt800: "#0B1932",
  green500:  "#229E66",
};

// Per-color chrome. `base` is the pure hue used for outlined indicator dots.
const PALETTE = {
  green:  { base: "#229E66", solidBg: "#ECFDF3", solidBorder: "#DCFAE6", solidFg: "#229E66", darkBg: "#229E66", darkFg: "#FFFFFF" },
  yellow: { base: "#F79009", solidBg: "#FFFAEB", solidBorder: "#FEF0C7", solidFg: "#DC6803", darkBg: "#FEC84B", darkFg: "#222B3A" },
  red:    { base: "#D92D20", solidBg: "#FEF3F2", solidBorder: "#FFE6E5", solidFg: "#D92D20", darkBg: "#D92D20", darkFg: "#FFFFFF" },
  blue:   { base: "#2667D8", solidBg: "#EFF6FF", solidBorder: "#DBEAFE", solidFg: "#2667D8", darkBg: "#2667D8", darkFg: "#FFFFFF" },
  purple: { base: "#7A5AF8", solidBg: "#F4F3FF", solidBorder: "#EBE9FE", solidFg: "#7A5AF8", darkBg: "#7A5AF8", darkFg: "#FFFFFF" },
  gray:   { base: "#97A3B6", solidBg: "#F2F5F9", solidBorder: "#E3E8EF", solidFg: "#4A5567", darkBg: "#4A5567", darkFg: "#FFFFFF" },
};

const COLOR_ALIASES = {
  success: "green",
  warning: "yellow",
  error:   "red",
  info:    "blue",
  neutral: "gray",
  ai:      "purple",
};

// `icon` is the glyph size; `iconWrapper` is the centered hit-box around it (Figma "IconWrapper").
const SIZE = {
  lg: { height: 32, fontSize: 14, lineHeight: 20, icon: 16, iconWrapper: 24, dot: 8, padX: 8, gap: 4 },
  md: { height: 28, fontSize: 12, lineHeight: 18, icon: 14, iconWrapper: 22, dot: 6, padX: 6, gap: 4 },
  sm: { height: 20, fontSize: 12, lineHeight: 18, icon: 12, iconWrapper: 20, dot: 6, padX: 6, gap: 4 },
};

// Resolves bg / border / fg for the requested type + color.
function resolveChrome(type, color) {
  const p = PALETTE[color] ?? PALETTE.gray;
  if (type === "dark") {
    return { bg: p.darkBg, border: p.darkBg, fg: p.darkFg, dot: p.darkFg };
  }
  if (type === "outlined") {
    return { bg: COLORS.gray50, border: COLORS.gray200, fg: COLORS.gray700, dot: p.base };
  }
  // solid (tinted)
  return { bg: p.solidBg, border: p.solidBorder, fg: p.solidFg, dot: p.solidFg };
}

// Icon glyph centered inside a larger square hit-box, matching Figma's "IconWrapper".
function IconSlot({ size, wrapperSize, children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size,
        width: wrapperSize ?? size,
        height: wrapperSize ?? size,
        lineHeight: 1,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function Badge({
  color = "gray",
  type = "solid",
  size = "md",
  icon,
  dot = false,
  removable = false,
  onRemove,
  selectable = false,
  variant,
  children,
  style,
  "aria-label": ariaLabel,
}) {
  // ---- Legacy variants (kept for existing screens) --------------------------
  if (variant === "lifecycle") {
    return (
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        paddingInline: 8,
        paddingBlock: 2,
        borderRadius: 9999,
        background: COLORS.cobalt100,
        color: COLORS.cobalt800,
        fontSize: 12,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        lineHeight: "18px",
        whiteSpace: "nowrap",
        ...style,
      }}>
        {children}
      </span>
    );
  }

  if (variant === "active") {
    return (
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        paddingLeft: 4,
        paddingRight: 8,
        paddingBlock: 3,
        borderRadius: 9999,
        background: COLORS.gray50,
        border: `1px solid ${COLORS.gray300}`,
        color: COLORS.gray700,
        fontSize: 12,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        lineHeight: "18px",
        whiteSpace: "nowrap",
        ...style,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 9999, background: COLORS.green500, flexShrink: 0 }} aria-hidden="true" />
        {children}
      </span>
    );
  }

  // ---- Figma badge ----------------------------------------------------------
  const resolvedColor = COLOR_ALIASES[color] ?? color;
  const s = SIZE[size] ?? SIZE.md;
  const chrome = resolveChrome(type, resolvedColor);

  // Figma pads the side with no leading/trailing accessory 2px wider — the
  // icon/dot/chevron/remove wrapper's own inset otherwise makes that side look tight.
  const hasLeading = Boolean(dot || icon);
  const hasTrailing = Boolean(selectable || removable);
  const padLeft = hasLeading ? s.padX : s.padX + 2;
  const padRight = hasTrailing ? s.padX : s.padX + 2;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        paddingLeft: padLeft,
        paddingRight: padRight,
        borderRadius: 9999,
        background: chrome.bg,
        border: `1px solid ${chrome.border}`,
        color: chrome.fg,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: s.fontSize,
        fontWeight: 500,
        lineHeight: `${s.lineHeight}px`,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...style,
      }}
      aria-label={ariaLabel}
    >
      {dot && (
        <span
          style={{ width: s.dot, height: s.dot, borderRadius: 9999, background: chrome.dot, flexShrink: 0 }}
          aria-hidden="true"
        />
      )}
      {icon && <IconSlot size={s.icon} wrapperSize={s.iconWrapper}>{icon}</IconSlot>}
      {children != null && <span>{children}</span>}
      {selectable && (
        <IconSlot size={s.icon} wrapperSize={s.iconWrapper}>
          <i className="fa-regular fa-chevron-down" />
        </IconSlot>
      )}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: s.iconWrapper,
            height: s.iconWrapper,
            padding: 0,
            margin: 0,
            border: "none",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
            fontSize: s.icon,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          <i className="fa-regular fa-xmark" aria-hidden="true" />
        </button>
      )}
    </span>
  );
}
