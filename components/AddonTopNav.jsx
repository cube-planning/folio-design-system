// AddonTopNav — Folio Design System (Feature)
// Checked against Figma "Add-Ons" (kmQDBYBQPuG9bt90qedB6A, node 6399:17463)
// — the actual source file for the addon. The top bar there is inline,
// unfactored markup (an unnamed auto-generated frame, not a named component
// or instance) — there is no real component name to adopt. Confirmed
// intentional. Distinct from the kit's "Portal Header"/`PageHeader` and
// "Portal/Navigation/Top" families: this is specifically the Cube
// Sheets/Excel add-on's own cobalt top bar.
// Built from: Button, Icon — the top bar of the Cube Sheets/Excel Add-on:
// menu, active data source, currency, an unresolved-issue warning, and the
// Cube AI assistant trigger. Domain-specific to the add-on shell, unlike the
// generic composites/foundations it's built from.
//
//   dataSource : active connection label, e.g. "Company"
//   currency   : active reporting currency, e.g. "USD"
//   hasWarning : shows the amber triangle when something needs attention

import { Button } from "./Button.jsx";

// bg and the AI button gradient verified against Figma "Add-Ons"
// (node 6548:2928, a corrected revision of 6399:17463 — that earlier frame's
// #000087 nav bg and gradient toggle were both design errors since fixed):
// nav bg is cobalt-500, the AI trigger is the "Folio AI Gradient"
// (-18.86deg, purple-500 → purple-400 → purple-700).
const COLORS = {
  bg:    "#173D82",
  white: "#FFFFFF",
  warn:  "#F79009",
};

export function AddonTopNav({
  dataSource = "Company",
  currency = "USD",
  hasWarning = false,
  onMenuClick,
  onDataSourceClick,
  onCurrencyClick,
  onWarningClick,
  onAssistantClick,
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 4,
      height: 44,
      padding: "0 8px",
      background: COLORS.bg,
      borderRadius: "16px 16px 0 0",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Button
        icon={<i className="fa-regular fa-bars" />}
        aria-label="Menu"
        variant="ghost-gray"
        onClick={onMenuClick}
        style={{ color: COLORS.white }}
      />

      <button
        type="button"
        onClick={onDataSourceClick}
        style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          color: COLORS.white, fontSize: 13, fontWeight: 500, cursor: "pointer", padding: "4px 6px",
        }}
      >
        <i className="fa-regular fa-database" aria-hidden="true" />
        {dataSource}
        <i className="fa-regular fa-chevron-down" style={{ fontSize: 10 }} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={onCurrencyClick}
        style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          color: COLORS.white, fontSize: 13, fontWeight: 500, cursor: "pointer", padding: "4px 6px",
        }}
      >
        {currency}
        <i className="fa-regular fa-chevron-down" style={{ fontSize: 10 }} aria-hidden="true" />
      </button>

      {hasWarning && (
        <button
          type="button"
          onClick={onWarningClick}
          aria-label="Unrecognized dimensions warning"
          style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.warn, fontSize: 16, padding: "4px 6px" }}
        >
          <i className="fa-regular fa-triangle-exclamation" aria-hidden="true" />
        </button>
      )}

      <button
        type="button"
        onClick={onAssistantClick}
        aria-label="Cube AI assistant"
        style={{
          marginLeft: "auto", width: 28, height: 28, borderRadius: 9999, border: "none", cursor: "pointer",
          background: "linear-gradient(-18.86deg, #7A5AF8 33.1%, #9B8AFB 62.1%, #6938EF 98.4%)", color: COLORS.white,
          display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0,
        }}
      >
        <i className="fa-solid fa-sparkles" aria-hidden="true" />
      </button>
    </div>
  );
}
