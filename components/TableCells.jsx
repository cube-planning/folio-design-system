// Table cell variants — Folio Design System
// Kit vocabulary: exported as `Cell` — a generic renderer toolkit inspired by
// but not 1:1 with Figma "Folio Design System Beta" (Q7G87Bmjx2aYNVDKYLlBaG)
// Table page's "Cell Icon"/"Table cell lead action" families (Cell.Icon and
// Cell.Actions cover the same idea); confirmed intentional as a code-side
// abstraction rather than a rename target.
// Reusable renderers for Table `column.render`, mirroring Figma's "Table Cell" variants.
// Usage: { key: "owner", label: "Owner", render: (v, row) => <Cell.AvatarText name={v} /> }

import { Badge } from "./Badge.jsx";
import { Avatar } from "./Avatar.jsx";

const C = {
  blue:   "#2667D8",  // link / dataviz blue-500
  purple: "#7A5AF8",  // MCP / AI
  gray900:"#222B3A",
  gray500:"#97A3B6",
  gray200:"#F2F5F9",
  green:  "#079455",
};
const FONT = "'DM Sans', sans-serif";

function Text({ children }) {
  return <span style={{ fontFamily: FONT, fontSize: 14, color: C.gray900 }}>{children}</span>;
}

function Link({ children, href, onClick, icon }) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 14, color: C.blue, textDecoration: "none", cursor: "pointer" }}
    >
      {icon && (
        <span style={{ display: "inline-flex", width: 14, height: 14, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {icon}
        </span>
      )}
      {children}
    </a>
  );
}

// Same red/yellow/green mapping as the Workflow template's Status column (Todo/Draft/Done).
const STATUS_COLOR = {
  "todo":       "red",
  "to do":      "red",
  "draft":      "yellow",
  "in review":  "yellow",
  "done":       "green",
  "active":     "blue",
};
function statusColor(status) {
  return STATUS_COLOR[String(status ?? "").toLowerCase()] ?? "gray";
}

const TONES = { blue: C.blue, purple: C.purple, default: C.gray900 };
function Metric({ children, tone = "blue", bold = false, weight }) {
  if (children == null || children === "") return null;
  const fontWeight = weight === "medium" ? 500 : bold ? 700 : 400;
  return (
    <span style={{ fontFamily: FONT, fontSize: 14, color: TONES[tone] ?? C.blue, fontWeight }}>
      {children}
    </span>
  );
}

function Icon({ icon, children, tone }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 14, color: tone === "link" ? C.blue : C.gray900 }}>
      {icon && (
        <span style={{ display: "inline-flex", width: 16, height: 16, alignItems: "center", justifyContent: "center", color: C.gray500, fontSize: 16, flexShrink: 0 }}>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}

function User({ name, children, size = "xs", colorIndex, border, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 14, color: C.gray900 }}>
      <Avatar size={size} name={name} colorIndex={colorIndex} border={border} {...rest} />
      <span>{children ?? name}</span>
    </span>
  );
}

function Progress({ value, max, color = C.green }) {
  const pct = max ? Math.min(100, Math.max(0, Math.round((value / max) * 100))) : 0;
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", gap: 4, minWidth: 72 }}>
      <span style={{ fontFamily: FONT, fontSize: 14, color: C.gray900 }}>{value}/{max}</span>
      <span style={{ display: "block", height: 6, borderRadius: 9999, background: C.gray200, overflow: "hidden", width: "100%" }}>
        <span style={{ display: "block", height: "100%", width: `${pct}%`, background: color, borderRadius: 9999 }} />
      </span>
    </span>
  );
}

function Actions({ children }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: 2, width: "100%" }}>
      {children}
    </span>
  );
}

function ActionButton({ icon, onClick, "aria-label": ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 24, height: 24, padding: 0, border: "none", background: "transparent",
        color: C.gray500, cursor: "pointer", fontSize: 16, borderRadius: 9999,
      }}
    >
      {icon}
    </button>
  );
}

export const Cell = {
  // Spoken vocabulary — say "make Owner a User cell" → Cell.User
  Text,          // plain value (default)
  Link,          // blue clickable record/name link; pass `icon` to prefix a leading icon
  Metric,        // right-aligned number; tone "blue" | "purple" | "default"; weight "medium" for totals; blank when value is null/empty
  Icon,          // leading icon + text
  User,          // Avatar + name
  Status: Badge, // status badge (the Badge component)
  Progress,      // x/y + bar
  Actions,       // trailing icon-button group
  ActionButton,  // one icon button inside Actions
  statusColor,   // maps a status string to the shared red/yellow/green (Todo/Draft/Done) Badge color

  // Aliases (older/explicit names) — kept so existing usage keeps working
  Badge,
  NumericLink: Metric,
  IconText: Icon,
  AvatarText: User,
};
