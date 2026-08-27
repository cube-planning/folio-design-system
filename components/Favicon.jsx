// Favicon — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Logo & Favicon page, "Favicon" (node 226:7066)
//
// Axes from Figma:
//   background : "Dark" (cobalt tile, white mark) | "Light" (white tile, full-color mark)
//
// Real brand artwork exported from Figma (not hand-drawn) — see components/assets/favicon-dark.svg /
// favicon-light.svg. Downloaded and committed locally since Figma asset URLs expire in ~7 days.
// Same tile fill as Logo (#163D83 = tokens.css `--color-blue-800`).

import faviconDark from "./assets/favicon-dark.svg";
import faviconLight from "./assets/favicon-light.svg";

export function Favicon({ background = "Dark", style }) {
  const isDark = background === "Dark";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        boxSizing: "border-box",
        overflow: "hidden",
        background: isDark ? "var(--color-blue-800, #163D83)" : "#FFFFFF",
        ...style,
      }}
    >
      <img
        src={isDark ? faviconDark : faviconLight}
        alt="Cube"
        style={{ width: "66%", height: "75%", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}
