// FlowCard — Folio Design System (Composite)
// Kit vocabulary: the "Connector card" in components/Card.md — one step in the
// Source -> Connection -> Destination overview on the Integrations and Tables
// pages. Figma "Folio DS — 2026 UI Refresh — Eng Handoff", node 186:27964.
//
// Compose three of them inside <FlowRow>, or use one on its own.
//
//   label        : small caption above the card ("Source", "Connection", "Destination")
//   icon         : a node, or { img } | { company } | { flow } | { fa } | { initial } — the 40px leading tile.
//                  `flow` is the Figma step artwork: "import" (Connection) or "cube" (Destination)
//   iconShape    : "rounded" (default, 8px) | "circle" — circle is for source logos; a circle
//                  `img` is shown whole on white with a gray-300 ring (the Figma logo mask)
//   title        : card title (single line; truncates with an ellipsis, and the
//                  full text shows in a Tooltip on hover only when it is clipped)
//   titleColor   : CSS color override. Default is link cobalt when `onTitleClick`
//                  is set, gray-900 otherwise
//   onTitleClick : makes the title a link
//   subtitle     : neutral 12px text under the title
//   status       : { tone: "red" | "orange" | "blue", icon?, text, onClick? } — a
//                  colored 12px line under the title ("Xero is Disconnected",
//                  "Set Mapping Rules", "Schedule Now"). `icon` is a Font Awesome
//                  name such as "fa-wrench", rendered Solid. Clickable if `onClick`
//   badge        : node shown under the title block (e.g. a red <Badge>)
//   actions      : [{ icon, label, tooltip?, onClick?, spinning? }] — icon-only
//                  plain-blue buttons (24x24) pinned to the card's top-right
//                  corner, 16px from the top and right edges. `icon` is a Font
//                  Awesome name such as "fa-arrows-rotate", rendered Regular.
//                  Also accepts a node as an escape hatch.
//   body         : node between the header and the button (e.g. Schedule rows)
//   button       : { label, onClick?, tone?: "default" | "danger" } — the
//                  full-width small pill at the bottom. "danger" is the
//                  red-tinted variant for Mapping when values are unmapped.
//
// The card is a fixed 300 x 164: that is the Figma frame, and it is what
// makes three cards line up in a FlowRow.

import { useEffect, useRef, useState } from "react";
import { Button } from "./Button.jsx";
import { Tooltip } from "./Tooltip.jsx";
import { COMPANY_LOGOS, COMPANY_AVATARS } from "./companyLogos.js";
import flowImport from "./assets/flowcard-import.svg";
import flowCube from "./assets/flowcard-cube.svg";

// Figma 186:30184 / 186:30203 — self-contained 40px circles (tile fill + glyph baked in).
const FLOW_ICONS = { import: flowImport, cube: flowCube };

// Token-valued hexes, matching how Badge.jsx and AgentCard.jsx inline theirs —
// DS components are self-styled and can't reach Tailwind classes.
const COLORS = {
  white: "#FFFFFF",
  border: "#E3E8EF",   // gray-300
  label: "#97A3B6",    // gray-500
  title: "#222B3A",    // gray-900
  muted: "#4A5567",    // gray-700
  link: "#173D82",     // cobalt-500 (links)
  tile: "#F2F5F9",     // gray-200
  tileInk: "#173D82",  // cobalt-500
};

const TONE = {
  red: "#912018",      // red-700
  orange: "#C2410C",   // orange-700
  blue: "#2667D8",     // blue-500
};

const FONT = "'DM Sans', sans-serif";

function IconTile({ icon, shape }) {
  const box = { width: 40, height: 40, borderRadius: shape === "circle" ? "50%" : 8, flexShrink: 0 };
  if (icon && icon.flow && FLOW_ICONS[icon.flow]) {
    return <img src={FLOW_ICONS[icon.flow]} alt="" style={{ ...box, borderRadius: "50%", display: "block" }} />;
  }
  if (icon && icon.company && COMPANY_AVATARS[icon.company]) {
    // Self-contained 40px circle (logo + mask + ring baked in): no extra ring or padding.
    return <img src={COMPANY_AVATARS[icon.company]} alt="" style={{ ...box, borderRadius: "50%", display: "block" }} />;
  }
  const logo = icon && (icon.company ? COMPANY_LOGOS[icon.company] : icon.img);
  if (logo) {
    if (shape === "circle") {
      return (
        <img
          src={logo}
          alt=""
          style={{ ...box, display: "block", objectFit: "contain", background: COLORS.white, border: `1px solid ${COLORS.border}`, boxSizing: "border-box", padding: 4 }}
        />
      );
    }
    return <img src={logo} alt="" style={{ ...box, display: "block", objectFit: "cover" }} />;
  }
  if (icon && (icon.fa || icon.initial)) {
    return (
      <span
        style={{
          ...box,
          borderRadius: "50%", // Figma 186:30184 / 186:30203: every step avatar is a 40px circle
          background: COLORS.tile,
          color: COLORS.tileInk,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 600,
          fontFamily: FONT,
        }}
      >
        {icon.fa ? <i className={`fa-solid ${icon.fa}`} aria-hidden="true" /> : icon.initial}
      </span>
    );
  }
  return icon || null;
}

function Actions({ actions }) {
  if (!actions) return null;
  const content = Array.isArray(actions)
    ? actions.map((a, i) => (
        <Tooltip key={i} content={a.tooltip}>
          <Button
            variant="plain-blue"
            size="small"
            onClick={a.onClick}
            aria-label={a.label || a.tooltip}
            style={{ width: 24, height: 24 }}
            icon={<i className={`fa-regular ${a.icon}${a.spinning ? " fa-spin" : ""}`} />}
          />
        </Tooltip>
      ))
    : actions;
  return (
    <div style={{ marginLeft: "auto", alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
      {content}
    </div>
  );
}

function Status({ status }) {
  if (!status) return null;
  const style = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    fontSize: 12,
    lineHeight: "18px",
    fontFamily: FONT,
    color: TONE[status.tone] || TONE.blue,
  };
  const inner = (
    <>
      {status.icon && <i className={`fa-solid ${status.icon}`} style={{ fontSize: 11 }} aria-hidden="true" />}
      {status.text}
    </>
  );
  return status.onClick ? (
    <button type="button" onClick={status.onClick} style={{ ...style, background: "none", border: "none", padding: 0, cursor: "pointer" }}>
      {inner}
    </button>
  ) : (
    <span style={style}>{inner}</span>
  );
}

// Single-line title. When the ellipsis clips the text, the full title appears in a
// Tooltip on hover/focus; otherwise no Tooltip is mounted.
function Title({ title, style, onClick }) {
  const ref = useRef(null);
  const [clipped, setClipped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => setClipped(el.scrollWidth > el.clientWidth);
    measure();
    if (typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [title]);

  const node = onClick ? (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      style={{ ...style, background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
    >
      {title}
    </button>
  ) : (
    <span ref={ref} style={style}>{title}</span>
  );
  return clipped ? <Tooltip content={title}>{node}</Tooltip> : node;
}

export function FlowCard({
  label,
  icon,
  iconShape = "rounded",
  title,
  titleColor,
  onTitleClick,
  subtitle,
  status,
  badge,
  actions,
  body,
  button,
}) {
  const titleStyle = {
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 500,
    fontFamily: FONT,
    color: titleColor || (onTitleClick ? COLORS.link : COLORS.title),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  };
  const danger = button && button.tone === "danger";

  return (
    <div>
      {label && (
        <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.label, marginBottom: 12, fontFamily: FONT }}>
          {label}
        </div>
      )}
      <div
        style={{
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 300,
          height: 164,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <IconTile icon={icon} shape={iconShape} />
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <Title title={title} style={titleStyle} onClick={onTitleClick} />
            {subtitle && (
              <span style={{ fontSize: 12, lineHeight: "18px", color: COLORS.muted, fontFamily: FONT }}>{subtitle}</span>
            )}
            <Status status={status} />
            {badge}
          </div>
          <Actions actions={actions} />
        </div>
        {body}
        {button && (
          <Button
            variant={danger ? "destructive-subtle" : "subtle-blue"}
            size="small"
            fullWidth
            onClick={button.onClick}
            style={{ marginTop: "auto", flexShrink: 0 }}
          >
            {button.label}
          </Button>
        )}
      </div>
    </div>
  );
}
