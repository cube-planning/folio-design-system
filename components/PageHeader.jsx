// PageHeader — Folio Design System
// Source of truth: Figma "Folio DS — 2026 UI Refresh" › Portal Header (node 186:29002)
//
// Kit vocabulary: this is Figma "Folio Design System Beta"'s (Q7G87Bmjx2aYNVDKYLlBaG)
// "Portal Header"/"Library Portal Header" family (nodes 107:33641, 185:26201)
// — built earlier from an older sibling file, hence the different node id.
// Confirmed intentional rename (Portal Header → PageHeader, a more generic
// name since this is used beyond the "Portal" context) rather than a gap.
// Re-checked against the current kit (2026-08-27) — two drifts to fix on a
// future pass, not yet reconciled: (1) the kit's "secondary" hierarchy
// variant puts action buttons on the breadcrumb row, which maps to this
// component's `topActions` prop, not `actions` — not obvious from the JSDoc
// below; (2) the kit's "primary" hierarchy variant has a helper-text +
// "Last Sync" badge combo this component has no equivalent for (only
// owner/status).
//
// Two row layout, measured from Figma:
//   Row 1 — breadcrumb (left) + topActions (right), e.g. bell/Import icon buttons
//   Row 2 — title + inline badges (left) + actions (right), e.g. edit/Mark Complete
//   gap between rows: 8px · bottom padding after header: 16px · title: 24px semibold
//
// Two supported patterns:
//   - Integration Overview: badges inline next to title, topActions on breadcrumb row
//   - Workflow / secondary page level: owner + status stacked below title, actions on title row
//
//   breadcrumbs : [{ label, onClick?, icon? }] — last item renders as current (non-link).
//                 icon is a Font Awesome REGULAR <i className="fa-regular ..."/>, 14px glyph in
//                 a 24px placeholder — put it on the crumb that represents the current nav
//                 section (drilled-in / second-level pages). Colored cobalt-500 when the crumb
//                 is clickable, otherwise it follows the crumb's own (gray-900/gray-600) color.
//   icon        : node — Font Awesome REGULAR <i className="fa-regular ..."/>, 24px glyph in a
//                 32px placeholder, before the title — use on a top-level page (the page itself
//                 is the nav section, no drill-down crumb icon). Colored gray-900, matching the
//                 title text — it isn't a clickable element, so it doesn't take cobalt-500.
//   title       : string
//   badges      : node — Badge component(s) only, size "md" — inline next to title (e.g. "Update Mapping", "Mapping Assistant")
//   owner       : string — renders as "Owner: {owner}" below the title
//   status      : { label, color } — passed straight to <Badge color size="md">, below the title
//   topActions  : node — Button component(s) only — right-aligned slot on the breadcrumb row (e.g. bell, Import)
//   actions     : node — Button component(s) only — right-aligned slot on the title row (e.g. edit icon + Mark Complete)
//
// actions/topActions/badges are validated at render time: passing anything
// other than this design system's own Button (for actions/topActions) or
// Badge sized "md" (for badges) throws, so a prototype can't slip in an
// ad-hoc <button> or a mis-sized badge.

import { Children, Fragment, isValidElement } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";

function assertOnlySlotComponent(node, slotName, Component, componentName, extraCheck) {
  Children.forEach(node, (child) => {
    if (child == null || typeof child === "boolean") return;
    if (isValidElement(child) && child.type === Fragment) {
      assertOnlySlotComponent(child.props.children, slotName, Component, componentName, extraCheck);
      return;
    }
    if (!isValidElement(child) || child.type !== Component) {
      throw new Error(
        `PageHeader: \`${slotName}\` may only contain the Folio design system's ${componentName} component.`
      );
    }
    if (extraCheck) extraCheck(child);
  });
}

// PageHeader's icon/breadcrumb-icon slots are Font Awesome only, and REGULAR
// weight only (not solid/light/duotone) — matches the icon style used
// throughout this header pattern in Figma.
function assertRegularFontAwesomeIcon(el, slotName) {
  if (el == null) return;
  const className = isValidElement(el) ? el.props?.className : undefined;
  if (typeof className !== "string" || !/\bfa-regular\b/.test(className)) {
    throw new Error(`PageHeader: \`${slotName}\` icon must be a Font Awesome "regular" icon (className including "fa-regular").`);
  }
}

const COLORS = {
  gray900: "#101828",
  gray600: "#475467",
  gray400: "#98A2B3",
  gray200: "#E4E7EC",
  cobalt500: "#173D82",
};

// Icon glyph centered inside a larger square hit-box — 24px icon in a 32px
// box for the title-level icon, 14px icon in a 24px box for the breadcrumb-
// level icon (matches the Button/Badge IconSlot convention). Color follows
// whatever it sits next to: cobalt-500 next to a clickable crumb, gray-900
// next to the (non-clickable) title.
function HeaderIconSlot({ size, wrapperSize, color, children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: wrapperSize,
        height: wrapperSize,
        fontSize: size,
        color,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function Breadcrumbs({ items }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      color: COLORS.gray400,
    }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const isClickable = item.onClick && !isLast;
        return (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {item.icon && (
              <HeaderIconSlot
                size={14}
                wrapperSize={24}
                color={isClickable ? COLORS.cobalt500 : isLast ? COLORS.gray900 : COLORS.gray600}
              >
                {item.icon}
              </HeaderIconSlot>
            )}
            {item.onClick && !isLast ? (
              <a
                onClick={item.onClick}
                style={{ color: COLORS.cobalt500, cursor: "pointer", textDecoration: "none" }}
              >
                {item.label}
              </a>
            ) : (
              <span style={{ color: isLast ? COLORS.gray900 : COLORS.gray600 }}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <HeaderIconSlot size={16} wrapperSize={24} color={COLORS.gray600}>
                <i className="fa-regular fa-chevron-right" />
              </HeaderIconSlot>
            )}
          </span>
        );
      })}
    </div>
  );
}

export function PageHeader({
  breadcrumbs,
  icon,
  title,
  badges,
  owner,
  status,
  topActions,
  actions,
  style,
}) {
  assertOnlySlotComponent(badges, "badges", Badge, "Badge", (el) => {
    const size = el.props.size ?? "md";
    if (size !== "md") {
      throw new Error(`PageHeader: \`badges\` Badge components must use size="md" (got "${size}").`);
    }
  });
  assertOnlySlotComponent(topActions, "topActions", Button, "Button");
  assertOnlySlotComponent(actions, "actions", Button, "Button");
  assertRegularFontAwesomeIcon(icon, "icon");
  (breadcrumbs ?? []).forEach((item) => assertRegularFontAwesomeIcon(item.icon, "breadcrumbs[].icon"));

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 8,
      paddingBottom: 16,
      borderBottom: `1px solid ${COLORS.gray200}`,
      fontFamily: "'DM Sans', sans-serif",
      ...style,
    }}>
      {(breadcrumbs || topActions) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, height: 32 }}>
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : <span />}
          {topActions && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              {topActions}
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {icon && <HeaderIconSlot size={24} wrapperSize={32} color={COLORS.gray900}>{icon}</HeaderIconSlot>}
            <div style={{ fontSize: 24, fontWeight: 600, lineHeight: "32px", color: COLORS.gray900 }}>
              {title}
            </div>
            {badges}
          </div>
          {(owner || status) && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {owner && (
                <span style={{ fontSize: 14, color: COLORS.gray900 }}>
                  <span style={{ fontWeight: 500 }}>Owner:</span>{" "}
                  <span style={{ fontWeight: 400 }}>{owner}</span>
                </span>
              )}
              {status && <Badge color={status.color} size="md">{status.label}</Badge>}
            </div>
          )}
        </div>

        {actions && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
