// AppsIcon — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › "Apps icons" (node 52:1982, Navigation page)
//
// A small (24×24, 16×16 glyph) icon swap for third-party productivity/AI
// tools — used inline in nav/context UI (e.g. "opened from Excel", an AI
// plugin badge). NOT the same thing as `AppIcon` (a larger branded tile for
// CRM/ERP data-source connections like Salesforce/NetSuite/QuickBooks,
// used in SourceCard/ImportDrawer) — the two components solve different
// problems and happen to share a superficial "app icon" name. Confirmed via
// live Figma pull that "Apps icons" covers a fixed set of productivity/AI
// brands (PowerPoint, Google Slides, Excel, Google Sheets, Slack, Teams,
// Claude, ChatGPT) plus a generic "AI Plugin" glyph — none of which overlap
// AppIcon's data-source set.
//
// Real brand marks vendored from the Figma file (never hand-drawn) at
// components/assets/apps-icons/*.svg. "AI Plugin" alone uses a Font Awesome
// glyph (fa-solid fa-microchip-ai, per the component's own Figma description)
// since it's a generic mark, not a third-party brand.
//
//   type : which app the icon represents

import aiPlugin from "./assets/apps-icons/ai-plugin.svg";
import powerpoint from "./assets/apps-icons/powerpoint.svg";
import googleSlides from "./assets/apps-icons/google-slides.svg";
import excel from "./assets/apps-icons/excel.svg";
import googleSheets from "./assets/apps-icons/google-sheets.svg";
import slack from "./assets/apps-icons/slack.svg";
import teams from "./assets/apps-icons/teams.svg";
import claude from "./assets/apps-icons/claude.svg";
import chatgpt from "./assets/apps-icons/chatgpt.svg";

const ASSET = {
  "PowerPoint": powerpoint,
  "Google Slides": googleSlides,
  "Excel": excel,
  "Google Sheets": googleSheets,
  "Slack": slack,
  "Teams": teams,
  "Claude": claude,
  "ChatGPT": chatgpt,
};

export function AppsIcon({ type = "AI Plugin", size = 24 }) {
  const glyphSize = size === 24 ? 16 : Math.round(size * (16 / 24));

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      {type === "AI Plugin" ? (
        <i className="fa-solid fa-microchip-ai" style={{ fontSize: glyphSize, color: "#7A5AF8" }} aria-hidden="true" />
      ) : (
        <img
          src={ASSET[type]}
          alt=""
          style={{ width: glyphSize, height: glyphSize, display: "block" }}
        />
      )}
    </span>
  );
}
