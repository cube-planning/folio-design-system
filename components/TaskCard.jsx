// TaskCard — Folio Design System
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) — confirmed intentional, generic addition (likely
// traces to an external "Card" library not present in this kit file, same
// as SourceCard).
// Anatomy fix for the Background Tasks drawer: a bordered container (title +
// optional stepper + footer row) with real internal breathing room instead of
// uniform 8px spacing squeezing every piece together.
//
// Two variants, driven by whether `steps` is passed:
//   - In-progress row (Active/Queued sections): title, Stepper, footer w/ Avatar + Cancel/Stop
//   - History row: title, footer w/ Avatar + status Badge (no stepper)

import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Stepper } from "./Stepper";

const COLORS = {
  gray900: "#101828",
  gray600: "#475467",
  gray200: "#E4E7EC",
};

export function TaskCard({
  title,
  steps,           // Stepper `steps` array — omit for a completed/history row
  user,            // { name } — renders an Avatar + name
  automated = false, // renders an "Automated" dark badge instead of a user Avatar
  startedAt,        // e.g. "Started 4:23 pm" — plain text, already formatted
  status,           // { label, color } — e.g. { label: "Completed", color: "green" } — history rows only
  action,           // { label, onClick } — e.g. { label: "Stop", onClick } — active/queued rows only
  style,
}) {
  return (
    <div style={{
      border: `1px solid ${COLORS.gray200}`,
      borderRadius: 12,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 16, // space-container: this card is itself a bordered box — give its contents room, don't crowd the title against the stepper
      fontFamily: "'DM Sans', sans-serif",
      ...style,
    }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.gray900, lineHeight: "24px" }}>
        {title}
      </div>

      {steps && <Stepper steps={steps} size="sm" />}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {automated ? (
            <Badge type="dark" color="blue" size="sm" icon={<i className="fa-solid fa-clock" />}>
              Automated
            </Badge>
          ) : (
            user && <Avatar type="initials" size="xs" name={user.name} />
          )}
          {(startedAt || (user && !automated)) && (
            <span style={{ fontSize: 12, color: COLORS.gray600 }}>
              {!automated && user?.name}{!automated && user?.name && startedAt ? "  " : ""}{startedAt}
            </span>
          )}
        </div>

        {status && (
          <Badge type="solid" color={status.color} size="sm" icon={status.icon}>
            {status.label}
          </Badge>
        )}
        {action && (
          <Button variant="destructive-secondary" size="small" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
