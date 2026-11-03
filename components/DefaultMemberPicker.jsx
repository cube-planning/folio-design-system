// DefaultMemberPicker — Folio Design System (Feature, Cube Add-on)
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) or "Add-Ons" (kmQDBYBQPuG9bt90qedB6A) — an add-on
// specific screen, confirmed intentional. Built from: Button, Badge.
//
// The member-tree screen a dimension filter row opens in the add-on. It does
// two jobs:
//   mode="filter"  : pick the member a range filters on. Primary action
//                    "Apply filter" calls onApply(id).
//   mode="default" : the admin management flow. Same tree, primary action
//                    "Done" calls onBack().
// In both modes an admin can hover a member and "Set default". That opens a
// confirm sheet (it applies to everyone, in Excel and Google Sheets) and, on
// confirm, calls onDefaultChange(id). "Reset to automatic" calls
// onDefaultChange(null). Viewers see a lock and a permission tooltip instead.
//
// "Automatic" is the parent with the most children (first wins on a tie). The
// screen opens on, in order: the user's applied member, the default, automatic.
//
//   dimension       : "Scenario" — shown in the title
//   members         : flat [{ id, parentId, name }]; members[0] is the root
//   defaultId       : the company default member id, or null
//   appliedId       : the member this user already filtered on, or null
//   canEdit         : may change the default (Manage Dimension Members, Formulas & Tags)
//   startWithReset  : open with the "Reset to automatic?" sheet already showing
//   maxListHeight   : px cap for the tree; omit to let it fill its container

import { useMemo, useState } from "react";
import { Button } from "./Button.jsx";
import { Badge } from "./Badge.jsx";

const COLORS = {
  gray900: "#222B3A",
  gray800: "#353F4F",
  gray700: "#4A5567",
  gray600: "#677489",
  gray500: "#97A3B6",
  gray400: "#CDD5E0",
  gray300: "#E3E8EF",
  gray100: "#F8FAFC",
  cobalt500: "#173D82",
  blue500: "#2667D8",
  blue50: "#EFF6FF",
  blue200: "#BFD4F7",
  scrim: "rgba(16,24,40,.45)",
  white: "#FFFFFF",
};

// Parent with the most children; the first one wins a tie.
export function automaticMemberId(members) {
  const kids = {};
  members.forEach((m) => { if (m.parentId != null) kids[m.parentId] = (kids[m.parentId] || 0) + 1; });
  let best = members[0];
  members.forEach((m) => { if ((kids[m.id] || 0) > (kids[best.id] || 0)) best = m; });
  return best.id;
}

export function DefaultMemberPicker({
  dimension,
  members,
  defaultId = null,
  appliedId = null,
  canEdit = true,
  mode = "filter",
  startWithReset = false,
  onDefaultChange,
  onApply,
  onCancel,
  onBack,
  maxListHeight,
}) {
  const byId = useMemo(() => Object.fromEntries(members.map((m) => [m.id, m])), [members]);
  const children = useMemo(() => {
    const c = {};
    members.forEach((m) => { if (m.parentId != null) (c[m.parentId] = c[m.parentId] || []).push(m); });
    return c;
  }, [members]);
  const autoId = useMemo(() => automaticMemberId(members), [members]);

  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState({});
  const [chosen, setChosen] = useState(null);
  const [hovered, setHovered] = useState(null);
  // undefined = sheet closed, null = reset to automatic, string = set this member
  const [pending, setPending] = useState(startWithReset ? null : undefined);

  const current = chosen ?? appliedId ?? defaultId ?? autoId;
  const q = query.trim().toLowerCase();
  const rows = [];
  if (q) {
    members.filter((m) => m.name.toLowerCase().includes(q)).forEach((m) => rows.push({ m, depth: 0, hasKids: false }));
  } else {
    const walk = (m, depth) => {
      const kids = children[m.id] || [];
      rows.push({ m, depth, hasKids: kids.length > 0 });
      if (kids.length && !collapsed[m.id]) kids.forEach((k) => walk(k, depth + 1));
    };
    walk(members[0], 0);
  }

  const name = (id) => (id ? byId[id].name : `Automatic (${byId[autoId].name})`);
  const fromManage = mode === "default";
  const permissionTip = "Requires the Manage Dimension Members, Formulas & Tags permission";

  return (
    <div style={{
      position: "relative", display: "flex", flexDirection: "column", minHeight: 0, background: COLORS.white,
      border: `1px solid ${COLORS.gray300}`, borderRadius: 12, overflow: "hidden", fontFamily: "'DM Sans', sans-serif", color: COLORS.gray900,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 12px 8px" }}>
        <Button icon={<i className="fa-regular fa-chevron-left" />} aria-label="Back" variant="ghost-gray" size="small" onClick={onBack} />
        <div style={{ flex: 1, fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>
          {fromManage ? `Default: ${dimension}` : `Filter: ${dimension}`}
        </div>
        {!canEdit && (
          <span title={permissionTip} style={{ display: "inline-flex", color: COLORS.gray600, fontSize: 12 }}>
            <i className="fa-regular fa-lock" aria-label="Locked" />
          </span>
        )}
      </div>

      <div style={{ margin: "0 12px 8px", padding: "10px 12px", borderRadius: 12, background: COLORS.gray100, fontSize: 12, lineHeight: "18px", color: COLORS.gray700 }}>
        {defaultId ? (
          <span>
            Opens on <b style={{ color: COLORS.cobalt500 }}>{byId[defaultId].name}</b>, set for everyone in the company.
            {canEdit && (
              <>
                {" "}
                <button type="button" onClick={() => setPending(null)} style={linkButton}>Reset to automatic</button>
              </>
            )}
          </span>
        ) : (
          <span>
            Opens on <b>{byId[autoId].name}</b>, the parent with the most children.{canEdit ? " Hover a member to set a default." : ""}
          </span>
        )}
      </div>

      <div style={{ margin: "0 12px 8px", position: "relative" }}>
        <i className="fa-regular fa-magnifying-glass" aria-hidden="true" style={{ position: "absolute", left: 12, top: 11, fontSize: 12, color: COLORS.gray600 }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search members"
          aria-label="Search members"
          style={{
            width: "100%", height: 34, border: `1px solid ${COLORS.gray400}`, borderRadius: 8, padding: "0 12px 0 32px",
            font: "13px 'DM Sans', sans-serif", outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 8px 8px", maxHeight: maxListHeight }}>
        {rows.map(({ m, depth, hasKids }) => {
          const isDefault = m.id === defaultId;
          const isCurrent = m.id === current;
          const showAction = !isDefault && (hovered === m.id || isCurrent);
          return (
            <div
              key={m.id}
              role="button"
              tabIndex={0}
              onClick={() => setChosen(m.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setChosen(m.id); } }}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(m.id)}
              onBlur={() => setHovered(null)}
              style={{
                display: "flex", alignItems: "center", gap: 6, minHeight: 36, padding: `0 8px 0 ${8 + depth * 20}px`, borderRadius: 8, cursor: "pointer",
                background: isCurrent ? COLORS.blue50 : hovered === m.id ? "#F1F5FB" : "transparent",
              }}
            >
              <span
                role={hasKids ? "button" : undefined}
                aria-label={hasKids ? (collapsed[m.id] ? "Expand" : "Collapse") : undefined}
                onClick={hasKids ? (e) => { e.stopPropagation(); setCollapsed((c) => ({ ...c, [m.id]: !c[m.id] })); } : undefined}
                style={{ width: 14, fontSize: 12, visibility: hasKids ? "visible" : "hidden", display: "inline-flex", justifyContent: "center" }}
              >
                <i className={`fa-regular fa-caret-${collapsed[m.id] ? "right" : "down"}`} aria-hidden="true" />
              </span>
              <span style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: isCurrent ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {m.name}
              </span>
              {isDefault && <Badge color="blue" size="sm" icon={<i className="fa-solid fa-star" />}>Default</Badge>}
              {showAction && (
                <button
                  type="button"
                  title={canEdit ? "Set as default filter member for everyone" : permissionTip}
                  onClick={(e) => { e.stopPropagation(); if (canEdit) setPending(m.id); }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4, height: 24, padding: "0 8px", borderRadius: 9999, background: COLORS.white,
                    font: "500 11px 'DM Sans', sans-serif", whiteSpace: "nowrap", cursor: canEdit ? "pointer" : "not-allowed",
                    color: canEdit ? COLORS.blue500 : COLORS.gray500, border: `1px solid ${canEdit ? COLORS.blue200 : COLORS.gray300}`,
                  }}
                >
                  <i className={`fa-regular ${canEdit ? "fa-star" : "fa-lock"}`} style={{ fontSize: 10 }} aria-hidden="true" />
                  Set default
                </button>
              )}
            </div>
          );
        })}
        {rows.length === 0 && (
          <div style={{ padding: 20, textAlign: "center", fontSize: 13, color: COLORS.gray600 }}>No members match "{query}"</div>
        )}
      </div>

      <div style={{ padding: 12, borderTop: `1px solid ${COLORS.gray300}`, display: "flex", gap: 8, justifyContent: "flex-end" }}>
        {!fromManage && <Button variant="ghost-gray" size="small" onClick={onCancel ?? onBack}>Cancel</Button>}
        <Button variant="primary" size="small" onClick={() => (fromManage ? onBack?.() : onApply?.(current))}>
          {fromManage ? "Done" : "Apply filter"}
        </Button>
      </div>

      {pending !== undefined && (
        <div style={{ position: "absolute", inset: 0, background: COLORS.scrim, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: COLORS.white, width: "100%", borderRadius: "16px 16px 0 0", padding: 16, display: "flex", flexDirection: "column", gap: 12, boxSizing: "border-box" }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{pending ? "Set as default for everyone?" : "Reset to automatic?"}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", background: COLORS.gray100, borderRadius: 12, padding: "10px 12px", fontSize: 13 }}>
              <span style={{ color: COLORS.gray600 }}>{dimension}</span>
              <i className="fa-regular fa-arrow-right" aria-hidden="true" style={{ fontSize: 10, color: COLORS.gray500 }} />
              <span style={{ color: COLORS.gray600, textDecoration: "line-through" }}>{name(defaultId)}</span>
              <i className="fa-regular fa-arrow-right" aria-hidden="true" style={{ fontSize: 10, color: COLORS.gray500 }} />
              <b style={{ color: COLORS.cobalt500 }}>{name(pending)}</b>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: "18px", color: COLORS.gray800, display: "flex", flexDirection: "column", gap: 4 }}>
              <li>Applies to everyone in the company, in Excel and Google Sheets.</li>
              <li>Applies to filters opened from now on. Saved ranges are not changed.</li>
              <li>The change is recorded in the audit trail.</li>
            </ul>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button variant="ghost-gray" onClick={() => setPending(undefined)}>Cancel</Button>
              <Button variant="primary" onClick={() => { onDefaultChange?.(pending); setPending(undefined); }}>
                {pending ? "Set default" : "Reset to automatic"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const linkButton = {
  background: "none", border: "none", padding: 0, color: COLORS.blue500, fontWeight: 500, cursor: "pointer", font: "500 12px 'DM Sans', sans-serif",
};
