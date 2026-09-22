// IconBadge — Folio Design System
// Decorative icon-with-background badge, shared visual style with the Cube
// Software (marketing/branding) IconBadge component — same structure, hue
// values, and size scale, kept in sync per docs/foundation/BRAND-FOUNDATION.md.
//
// Structure: soft-tint circle (offset) → rotated tinted chip (shadow) →
// white icon chip on top. Decorative only — see Rules in
// docs/foundation/BRAND-FOUNDATION.md for when to use this vs. a plain icon.
//
//   icon  : Font Awesome class string, Regular weight only (e.g. "fa-regular fa-users")
//   hue   : any Folio color ramp — teal | cyan | emerald | indigo | fuchsia |
//           orange (accent/data-viz), cobalt | blue (brand), green | red |
//           yellow | gray (system). NEVER purple — purple is reserved for AI,
//           and passing it throws. See docs/foundation/BRAND-FOUNDATION.md.
//   stops : optional [tint, chip, glyph] ramp stops, overriding the default
//           for that hue. Escape hatch — prefer the defaults.
//   size  : "xs" (24) | "sm" (32) | "md" (40) | "lg" (48, default) | "xl" (56) | "2xl" (64)
//
// 2026-09-16 — hues became dynamic. The three slots used to be a hardcoded
// hex table covering six accent families, so any other ramp silently fell
// back to teal. They now resolve to `var(--color-<hue>-<stop>)`, which means
// every ramp in tokens.css works and no value can drift off-ramp — the
// component stops carrying its own copy of the palette. Requires tokens.css
// to be loaded, which it always is via the bundle's cssEntry.
//
// Stop choice is per-ramp rather than universal. The accent ramps peak
// mid-scale, so 50/300/600 gives the circle → chip → glyph a readable
// contrast climb. The brand ramps run much darker at the same index
// (cobalt-600 is #122E64, near-black) so they step one stop lighter. Cobalt's
// 50/200/500 is not a guess: it is what the Boards chart-type picker binds in
// Figma (laazPiD6J57Wc91WJ4uRMM node 3455:116865).

// [tint circle, rotated chip, icon glyph]
const DEFAULT_STOPS = [50, 300, 600];

const STOPS = {
  cobalt: [50, 200, 500],
  blue:   [50, 200, 600],
  gray:   [50, 300, 700],
};

const SIZE = { xs: 24, sm: 32, md: 40, lg: 48, xl: 56, "2xl": 64 };

export function IconBadge({ icon, hue = "teal", size = "lg", stops }) {
  if (hue === "purple") {
    throw new Error(
      "IconBadge: purple is reserved for AI moments. Render the AI sparkle as a " +
      "plain fa-solid fa-sparkles over --color-gradient-ai instead. See BRAND-FOUNDATION.md."
    );
  }

  const [tintStop, chipStop, glyphStop] = stops ?? STOPS[hue] ?? DEFAULT_STOPS;
  const ramp = (stop) => `var(--color-${hue}-${stop})`;

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
          background: ramp(tintStop),
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
          background: ramp(chipStop),
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
        {icon && <i className={icon} style={{ fontSize: 16 * s, color: ramp(glyphStop) }} />}
      </div>
    </div>
  );
}
