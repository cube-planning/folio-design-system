// Avatar — Folio Design System (UI Refresh)
// Source of truth: CUBE Jira ticket + Figma "Folio Design System Beta" › Avatar (node 98:28411)
//
//   type    : "initials" (active user) | "placeholder" (unassigned / deactivated) | "system" (Cube)
//   size    : "xs" (24) | "sm" (32) | "md" (40) | "lg" (48) | "xl" (56) | "2xl" (64)
//   name    : full name → derives initials + deterministic pool color
//   initials: explicit override for the two-letter text
//   seed    : explicit key for the color hash (defaults to `name`)
//   colorIndex: explicit pool index (0–7) override
//   border  : white ring — turn ON when the avatar sits on a colored/image background
//
// initials ↔ placeholder ↔ system are mutually exclusive (single `type` prop).

const COLORS = {
  white:      "#FFFFFF",
  cobalt50:   "#E6EBF4",  // placeholder circle bg
  cobalt100:  "#C6D3EC",  // placeholder person icon
  cobalt500:  "#173D82",  // system (Cube) bg
};

// Deterministic initials color pool (UI Refresh) — 400 stop (cyan is 500), white text.
// Index order is fixed: the same seed always maps to the same color everywhere.
const POOL = [
  "#4E80EE", // 0 blue-400
  "#2357B8", // 1 cobalt-400
  "#22D3EE", // 2 cyan-500
  "#2DD4BF", // 3 teal-400
  "#34D399", // 4 emerald-400
  "#70CF98", // 5 green-400
  "#818CF8", // 6 indigo-400
  "#E879F9", // 7 fuchsia-400
];

const SIZE = {
  xs:    { px: 24, font: 10, icon: 12, border: 1 },
  sm:    { px: 32, font: 14, icon: 16, border: 1 },
  md:    { px: 40, font: 18, icon: 20, border: 1.5 },
  lg:    { px: 48, font: 20, icon: 24, border: 1.5 },
  xl:    { px: 56, font: 24, icon: 28, border: 1.5 },
  "2xl": { px: 64, font: 30, icon: 32, border: 2 },
};

// Stable string hash → pool index. Same input, same color across sessions/surfaces.
function hashIndex(str, mod) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % mod;
}

function deriveInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Cube logomark — rendered white on the system avatar.
function CubeMark({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 29 32" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <path d="M11.2464 5.30427L13.5369 4L13.5282 15.7556L11.229 17.0598L11.2464 5.30427Z" fill="currentColor" />
      <path d="M24.6057 21.23L14.8688 15.747V4L24.6057 9.5603V21.23Z" fill="currentColor" />
      <path d="M23.935 22.3624L14.2678 27.9999L4.68762 22.3109L14.1894 16.8622L23.935 22.3624Z" fill="currentColor" />
      <path d="M7.6318 9.67221L9.93103 8.35936L9.9136 17.8153L7.61438 19.1195L7.6318 9.67221Z" fill="currentColor" />
      <path d="M4.01742 14.4599L6.31665 13.1471L6.29923 19.8744L4 21.1786L4.01742 14.4599Z" fill="currentColor" />
    </svg>
  );
}

export function Avatar({
  type = "initials",
  size = "md",
  name,
  initials,
  seed,
  colorIndex,
  border = false,
  style,
  "aria-label": ariaLabel,
}) {
  const s = SIZE[size] ?? SIZE.md;

  const base = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: s.px,
    height: s.px,
    borderRadius: 9999,
    flexShrink: 0,
    overflow: "hidden",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: 1,
    // White ring drawn inside the edge — reads on colored / image backgrounds.
    boxShadow: border ? `inset 0 0 0 ${s.border}px ${COLORS.white}` : undefined,
    ...style,
  };

  if (type === "placeholder") {
    return (
      <span
        role="img"
        aria-label={ariaLabel ?? "No user"}
        style={{ ...base, background: COLORS.cobalt50 }}
      >
        <i
          className="fa-solid fa-user"
          aria-hidden="true"
          style={{ fontSize: s.icon, color: COLORS.cobalt100, lineHeight: 1 }}
        />
      </span>
    );
  }

  if (type === "system") {
    return (
      <span
        role="img"
        aria-label={ariaLabel ?? "Cube system"}
        style={{ ...base, background: COLORS.cobalt500, color: COLORS.white }}
      >
        <CubeMark size={s.icon} />
      </span>
    );
  }

  // initials
  const text = initials ?? deriveInitials(name);
  const idx = typeof colorIndex === "number"
    ? ((colorIndex % POOL.length) + POOL.length) % POOL.length
    : hashIndex(String(seed ?? name ?? text ?? ""), POOL.length);

  return (
    <span
      role="img"
      aria-label={ariaLabel ?? name ?? text}
      style={{ ...base, background: POOL[idx], color: COLORS.white }}
    >
      <span style={{ fontSize: s.font, fontWeight: 600, letterSpacing: 0 }}>{text}</span>
    </span>
  );
}
