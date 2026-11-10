// Logo — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Logo & Favicon page, "Logo" (node 226:7032)
//
// Axes from Figma:
//   background : "Dark" (cobalt tile, white wordmark) | "Light" (white tile, full-color wordmark)
//
// The wordmark is real brand artwork exported straight from Figma (not hand-drawn) — see
// components/assets/logo-dark.svg / logo-light.svg. Asset URLs from Figma expire in ~7 days,
// so the SVG bytes were downloaded and committed locally rather than referencing the live URL.
// Tile fill (#163D83) matches tokens.css `--color-blue-800` exactly, so that token is used
// instead of a raw hex even though Logo/Favicon aren't primary-action UI.

import logoDark from "./assets/logo-dark.svg";
import logoLight from "./assets/logo-light.svg";

export function Logo({ background = "Dark", style }) {
  const isDark = background === "Dark";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 82,
        height: 32,
        boxSizing: "border-box",
        overflow: "hidden",
        background: isDark ? "var(--color-blue-800, #163D83)" : "#FFFFFF",
        ...style,
      }}
    >
      <img
        src={isDark ? logoDark : logoLight}
        alt="Cube"
        style={{ width: "76%", height: "75%", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}
