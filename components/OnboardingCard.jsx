// OnboardingCard — Folio Design System
// "Get the most out of Cube" checklist tile: icon illustration on a tinted
// top half, title + description below, radio affordance top-right.
//
// States:
//   - default    — empty circle affordance, resting shadow
//   - hover      — shadow-sm -> shadow-md (only meaningful for clickable tiles)
//   - completed  — radio affordance is replaced by a dismiss "x" (band stays
//     tinted, not on-color); a green check badge moves next to the title and
//     the "Get Start" link drops out since there's no more action to take

import { useState } from "react";

const COLORS = {
  gray900: "#101828",
  gray600: "#475467",
  gray700: "#344054",
  gray300: "#D0D5DD",
  cobalt25: "#F2F5FB",
  cobalt600: "#122E64",
  blue600: "#1D5FD6",
  success500: "#12B76A",
};

export function OnboardingCard({
  illustration, // node — icon/graphic rendered on the tinted top half
  title,
  description,
  linkLabel = "Get Start",
  completed = false,
  onClick,
  onDismiss,
  style,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 280,
        display: "flex",
        flexDirection: "column",
        borderRadius: 16,
        border: `1px solid ${COLORS.gray300}`,
        overflow: "hidden",
        background: "#fff",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 4px 8px -2px rgba(16,24,40,0.10), 0 2px 4px -2px rgba(16,24,40,0.06)"
          : "0 1px 2px rgba(16,24,40,0.05)",
        transition: "box-shadow 120ms ease",
        fontFamily: "'DM Sans', sans-serif",
        ...style,
      }}
    >
      {/* Tinted illustration band */}
      <div
        style={{
          position: "relative",
          background: COLORS.cobalt25,
          padding: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 96,
        }}
      >
        {illustration}

        {completed ? (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 24,
              height: 24,
              border: "none",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <i className="fa-solid fa-xmark" style={{ fontSize: 16, color: COLORS.gray600 }} />
          </button>
        ) : (
          <span
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 20,
              height: 20,
              borderRadius: "9999px",
              background: "#fff",
              border: `1px solid ${COLORS.gray300}`,
            }}
          />
        )}
      </div>

      {/* Body */}
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: COLORS.gray900, lineHeight: "24px" }}>
            {title}
          </span>
          {completed && (
            <span
              style={{
                width: 28,
                height: 28,
                flexShrink: 0,
                borderRadius: "9999px",
                background: COLORS.success500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="fa-solid fa-check" style={{ fontSize: 13, color: "#fff" }} />
            </span>
          )}
        </div>
        <p style={{ fontSize: 14, fontWeight: 400, color: COLORS.gray700, lineHeight: "20px", margin: 0 }}>
          {description}{" "}
          {!completed && linkLabel && (
            <a
              href="#"
              onClick={(e) => e.stopPropagation()}
              style={{ color: COLORS.blue600, textDecoration: "underline" }}
            >
              {linkLabel}
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
