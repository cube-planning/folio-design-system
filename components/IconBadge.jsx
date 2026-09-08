// IconBadge — Folio Design System
// Decorative icon-with-background badge, shared visual style with the Cube
// Software (marketing/branding) IconBadge component — same structure, hue
// values, and size scale, kept in sync per docs/BRAND-FOUNDATION.md.
//
// Structure: soft-tint circle (offset) → rotated tinted chip (shadow) →
// white icon chip on top. Decorative only — see Rules in
// docs/BRAND-FOUNDATION.md for when to use this vs. a plain icon.
//
//   icon : Font Awesome class string, Regular weight only (e.g. "fa-regular fa-users")
//   hue  : accent/data-viz family — teal | cyan | emerald | indigo | fuchsia | orange
//          (never purple — purple is reserved for AI, see Foundation)
//   size : "xs" (24) | "sm" (32) | "md" (40) | "lg" (48, default) | "xl" (56) | "2xl" (64)

const HUE = {
  teal:    { c50: "#F0FDFA", c300: "#5EEAD4", c600: "#0D9488" },
  cyan:    { c50: "#ECFEFF", c300: "#67E8F9", c600: "#0891B2" },
  emerald: { c50: "#ECFDF5", c300: "#6EE7B7", c600: "#059669" },
  indigo:  { c50: "#EEF2FF", c300: "#A5B4FC", c600: "#4F46E5" },
  fuchsia: { c50: "#FDF4FF", c300: "#F0ABFC", c600: "#C026D3" },
  orange:  { c50: "#FFF7ED", c300: "#FDBA74", c600: "#EA580C" },
};

const SIZE = { xs: 24, sm: 32, md: 40, lg: 48, xl: 56, "2xl": 64 };

export function IconBadge({ icon, hue = "teal", size = "lg" }) {
  const h = HUE[hue] ?? HUE.teal;
  const px = SIZE[size] ?? SIZE.lg;
  const s = px / 48;

  return (
    <div style={{ position: "relative", width: px, height: px, flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          top: -2 * s,
          left: -2 * s,
          width: px,
          height: px,
          borderRadius: "50%",
          background: h.c50,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 13 * s,
          left: 9 * s,
          width: 26 * s,
          height: 26 * s,
          borderRadius: 4 * s,
          background: h.c300,
          transform: "rotate(-10deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 12 * s,
          left: 12 * s,
          width: 24 * s,
          height: 24 * s,
          borderRadius: 4 * s,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon && <i className={icon} style={{ fontSize: 16 * s, color: h.c600 }} />}
      </div>
    </div>
  );
}
