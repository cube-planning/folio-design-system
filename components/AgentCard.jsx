// AgentCard — Folio Design System (Composite)
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) — a new card variant, not yet in the kit. Follows
// the container rules in components/Card.md.
//
// Shows one agent's response: identity row (avatar + name/role + status pill),
// the response body, and an optional trace-to-source reference.
//
//   initial : single letter for the default gradient-square avatar
//   icon    : Font Awesome class string, Regular weight only (e.g. "fa-regular fa-database").
//             When set, an IconBadge replaces the initial-letter avatar entirely.
//   hue     : IconBadge hue — teal | cyan | emerald | indigo | fuchsia | orange
//             (default "indigo"; never purple — purple is reserved for AI,
//             see docs/BRAND-FOUNDATION.md). Ignored unless `icon` is set.
//   name    : agent name
//   role    : short descriptor under the name
//   status  : "running" | "done"
//   message : response body copy
//   trace   : optional source reference rendered as a trace chip
//
// The avatar is an either/or: pass `icon` for an IconBadge, or `initial` for the
// gradient square. Passing neither renders an empty gradient square.

import { Badge } from "./Badge.jsx";
import { IconBadge } from "./IconBadge.jsx";
import { Text } from "./Text.jsx";

// Token-valued hexes, matching how Badge.jsx and IconBadge.jsx inline theirs —
// DS components are self-styled and can't reach Tailwind classes.
const COLORS = {
  white:     "#FFFFFF",
  gray200:   "#F2F5F9",
  gray300:   "#E3E8EF",
  gray600:   "#677489",
  gray800:   "#353F4F",
  cobalt600: "#122E64",
};

// AI gradient per docs/BRAND-FOUNDATION.md — the default way to render an
// AI-purple fill. Not a flat purple: both #6938EF and #5547A5 are retired.
const GRADIENT_AI = "linear-gradient(135deg, #7A5AF8 10%, #9B8AFB 50%, #5925DC 100%)";

// Status pill is a real Badge, per Card.md ("Do use Badge for status, not custom
// colored text"). `running` uses the AI purple — an agent at work is an AI
// moment; `done` uses the system success green.
const STATUS = {
  running: { color: "ai",    label: "Running" },
  done:    { color: "green", label: "Done" },
};

export function AgentCard({
  initial,
  icon,
  hue = "indigo",
  name,
  role,
  status = "running",
  message,
  trace,
}) {
  const s = STATUS[status] ?? STATUS.running;

  return (
    <div
      style={{
        background: COLORS.white,
        border: `1px solid ${COLORS.gray300}`,
        borderRadius: 16,
        padding: 20,
        maxWidth: 420,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {icon ? (
          <IconBadge icon={icon} hue={hue} size="sm" />
        ) : (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: GRADIENT_AI,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontFamily: "'DM Sans', sans-serif",
              color: COLORS.white,
              fontWeight: 700,
            }}
          >
            {initial}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <Text variant="title-3" weight="bold" color={COLORS.cobalt600}>
            {name}
          </Text>
          <Text variant="caption-1" as="div" color={COLORS.gray600}>
            {role}
          </Text>
        </div>

        <Badge type="solid" color={s.color} size="sm" dot>
          {s.label}
        </Badge>
      </div>

      <Text variant="body" color={COLORS.gray800} style={{ marginTop: 16 }}>
        {message}
      </Text>

      {trace && (
        <div
          style={{
            marginTop: 12,
            display: "inline-block",
            background: COLORS.gray200,
            borderRadius: 6,
            padding: "4px 8px",
          }}
        >
          <Text variant="caption-1" color={COLORS.gray600}>
            {`↳ Trace · ${trace}`}
          </Text>
        </div>
      )}
    </div>
  );
}
