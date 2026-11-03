// RangeBuilder — Folio Design System (Feature, Cube Add-on)
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) or "Add-Ons" (kmQDBYBQPuG9bt90qedB6A) — an add-on
// specific control, confirmed intentional. Built from: Badge, Toggle, ListItem.
//
// The "New" range builder in the add-on's Build section. Dimensions sit in a
// tray as draggable Badges; drag one into Columns, Rows or Filters to set the
// range. Every zone takes several dimensions, stacked in drop order.
//
// A placed dimension is a field: label, and a chevron that turns into an X on
// hover. Press the X, or drag the field back to the tray, to remove it. Fields
// can also be dragged between zones. Pressing a field opens its member selector:
// the label becomes a search box, and below it sit "Selection Type" and the
// dimension's member tree with checkboxes (parents show the mixed state).
//
// Pointer-free alternative (touch, keyboard): press a tray Badge to arm it, then
// press the zone to drop it there.
//
//   dimensions : [{ key, label }] — everything that can be dragged
//   layout     : { columns: string[], rows: string[], filters: string[] } of keys
//   onChange   : (layout) => void
//   membersFor : (key) => [{ id, parentId, name }] — the dimension's members, root
//                first; defaults to a lone root named by `rootNameFor`
//   rootNameFor: (key) => string — used only by the default `membersFor`
//   excludeZeroRow / onExcludeZeroRowChange : the toggle below the zones
//
// Selection Type ("Include all") is shown but not yet a menu, and the checked
// members are kept inside this component, not reported upward.

import { useState } from "react";
import { Badge } from "./Badge.jsx";
import { Toggle } from "./Toggle.jsx";
import { ListItem } from "./ListItem.jsx";

const COLORS = {
  gray900: "#222B3A",
  gray700: "#4A5567",
  gray600: "#677489",
  gray500: "#97A3B6",
  gray400: "#CDD5E0",
  gray300: "#E3E8EF",
  cobalt500: "#173D82",
  cobalt25: "#F5F7FA",
  white: "#FFFFFF",
};

const ZONES = [
  { id: "columns", label: "Columns" },
  { id: "rows", label: "Rows" },
  { id: "filters", label: "Filters" },
];

const EMPTY = { columns: [], rows: [], filters: [] };

// ids of the leaves at or under a member
function leavesUnder(members, id) {
  const kids = members.filter((m) => m.parentId === id);
  return kids.length ? kids.flatMap((k) => leavesUnder(members, k.id)) : [id];
}

export function RangeBuilder({
  dimensions = [],
  layout = EMPTY,
  onChange,
  membersFor,
  rootNameFor = (key) => `All ${key}`,
  excludeZeroRow = false,
  onExcludeZeroRowChange,
}) {
  const [armed, setArmed] = useState(null); // a tray key waiting for a zone press
  const [over, setOver] = useState(null); // zone id or "tray" under a drag
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null); // keyboard focus reveals the X too, on closed fields
  const [openKey, setOpenKey] = useState(null); // placed key whose selector is open
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState({}); // `${key}:${leafId}` -> true
  const [collapsed, setCollapsed] = useState({}); // `${key}:${memberId}` -> true

  const label = (key) => dimensions.find((d) => d.key === key)?.label ?? key;
  const membersOf = (key) => membersFor?.(key) ?? [{ id: `${key}-root`, parentId: null, name: rootNameFor(key) }];
  const placed = new Set([...layout.columns, ...layout.rows, ...layout.filters]);
  const tray = dimensions.filter((d) => !placed.has(d.key));

  const without = (key) => ({
    columns: layout.columns.filter((k) => k !== key),
    rows: layout.rows.filter((k) => k !== key),
    filters: layout.filters.filter((k) => k !== key),
  });
  const place = (zone, key) => {
    const next = without(key);
    next[zone.id] = [...next[zone.id], key];
    onChange?.(next);
    setArmed(null);
    setQuery("");
    setOpenKey(key);
  };
  const remove = (key) => {
    onChange?.(without(key));
    if (openKey === key) setOpenKey(null);
  };
  const toggleOpen = (key) => {
    setQuery("");
    setOpenKey(openKey === key ? null : key);
  };

  const dragStart = (e, key) => {
    e.dataTransfer.setData("text/plain", key);
    e.dataTransfer.effectAllowed = "move";
    setArmed(null);
  };
  const keyFrom = (e) => e.dataTransfer.getData("text/plain");

  // ---- member tree ----
  const checkedOf = (key, members, id) => {
    const leaves = leavesUnder(members, id);
    const on = leaves.filter((l) => picked[`${key}:${l}`]).length;
    return on === 0 ? "unchecked" : on === leaves.length ? "checked" : "mixed";
  };
  const toggleMember = (key, members, id) => {
    const leaves = leavesUnder(members, id);
    const next = checkedOf(key, members, id) !== "checked";
    setPicked((p) => {
      const out = { ...p };
      leaves.forEach((l) => { out[`${key}:${l}`] = next; });
      return out;
    });
  };
  const treeRows = (key) => {
    const members = membersOf(key);
    const q = query.trim().toLowerCase();
    const rows = [];
    if (q) {
      members.filter((m) => m.name.toLowerCase().includes(q)).forEach((m) => rows.push({ m, level: 0, hasKids: false }));
    } else {
      const walk = (m, level) => {
        const hasKids = members.some((x) => x.parentId === m.id);
        rows.push({ m, level, hasKids });
        if (hasKids && !collapsed[`${key}:${m.id}`]) members.filter((x) => x.parentId === m.id).forEach((k) => walk(k, level + 1));
      };
      walk(members[0], 0);
    }
    return { members, rows };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "'DM Sans', sans-serif", color: COLORS.gray900 }}>
      <div style={{ fontSize: 13, lineHeight: "20px", color: COLORS.gray700 }}>Drag &amp; drop dimensions to set range</div>

      <div
        onDragOver={(e) => { e.preventDefault(); setOver("tray"); }}
        onDragLeave={() => setOver(null)}
        onDrop={(e) => { e.preventDefault(); setOver(null); const k = keyFrom(e); if (k) remove(k); }}
        style={{
          display: "flex", flexWrap: "wrap", gap: 8, minHeight: 32, padding: 4, margin: -4, borderRadius: 8,
          outline: over === "tray" ? `2px dashed ${COLORS.gray400}` : "none",
        }}
      >
        {tray.map((d) => (
          <span
            key={d.key}
            role="button"
            tabIndex={0}
            draggable
            aria-pressed={armed === d.key}
            aria-label={`${d.label}, drag into Columns, Rows or Filters`}
            onDragStart={(e) => dragStart(e, d.key)}
            onClick={() => setArmed(armed === d.key ? null : d.key)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setArmed(armed === d.key ? null : d.key); } }}
            style={{ cursor: "grab", borderRadius: 9999, outline: armed === d.key ? `2px solid ${COLORS.cobalt500}` : "none", outlineOffset: 1 }}
          >
            <Badge color="cobalt" size="md">{d.label}</Badge>
          </span>
        ))}
        {tray.length === 0 && <span style={{ fontSize: 12, color: COLORS.gray500, alignSelf: "center" }}>All dimensions are placed. Drag one back here to remove it.</span>}
      </div>

      {ZONES.map((zone) => {
        const keys = layout[zone.id];
        const isOver = over === zone.id;
        return (
          <div key={zone.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{zone.label}</div>
            <div
              onDragOver={(e) => { e.preventDefault(); setOver(zone.id); }}
              onDragLeave={() => setOver(null)}
              onDrop={(e) => { e.preventDefault(); setOver(null); const k = keyFrom(e); if (k) place(zone, k); }}
              onClick={() => { if (armed) place(zone, armed); }}
              style={{
                display: "flex", flexDirection: "column", gap: 8, cursor: armed ? "copy" : "default", borderRadius: 8,
                ...(keys.length === 0
                  ? {
                      minHeight: 36, alignItems: "center", justifyContent: "center", boxSizing: "border-box",
                      border: `1px dashed ${isOver || armed ? COLORS.cobalt500 : COLORS.gray400}`,
                      background: isOver ? COLORS.cobalt25 : COLORS.white, fontSize: 12, color: COLORS.gray600,
                    }
                  : { outline: isOver ? `2px dashed ${COLORS.cobalt500}` : "none", outlineOffset: 2 }),
              }}
            >
              {keys.length === 0 && "Drag a dimension here"}
              {keys.map((key) => {
                const open = openKey === key;
                const showX = hovered === key || (focused === key && !open);
                const { members, rows } = open ? treeRows(key) : { members: [], rows: [] };
                return (
                  <div key={key} style={{ position: "relative" }}>
                    <div
                      role="button"
                      tabIndex={0}
                      draggable={!open}
                      aria-expanded={open}
                      onDragStart={(e) => dragStart(e, key)}
                      onMouseEnter={() => setHovered(key)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setFocused(key)}
                      onBlur={() => setFocused(null)}
                      onClick={(e) => { if (armed) return; e.stopPropagation(); if (!open) toggleOpen(key); }}
                      onKeyDown={(e) => { if (!open && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggleOpen(key); } if (e.key === "Escape") setOpenKey(null); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8, height: 32, padding: "0 8px", boxSizing: "border-box", borderRadius: 8, cursor: open ? "text" : "grab",
                        background: COLORS.white, border: `1px solid ${open ? COLORS.cobalt500 : COLORS.gray400}`,
                        boxShadow: open ? "0px 0px 0px 2px rgba(23, 61, 130, 0.24)" : "none",
                      }}
                    >
                      <i className="fa-regular fa-grip-dots-vertical" aria-hidden="true" style={{ fontSize: 12, color: COLORS.gray400, width: 10 }} />
                      {open ? (
                        <input
                          autoFocus
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder={label(key)}
                          aria-label={`Search ${label(key)} members`}
                          style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "none", font: "600 13px 'DM Sans', sans-serif", color: COLORS.gray600, padding: 0 }}
                        />
                      ) : (
                        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: COLORS.gray600 }}>{label(key)}</span>
                      )}
                      <span
                        onClick={(e) => { if (open) { e.stopPropagation(); toggleOpen(key); } }}
                        style={{ position: "relative", width: 20, height: 20, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <i
                          className={`fa-regular fa-chevron-${open ? "up" : "down"}`}
                          aria-hidden="true"
                          style={{ position: "absolute", fontSize: 12, color: COLORS.gray900, opacity: showX ? 0 : 1, transition: "opacity 150ms ease" }}
                        />
                        <button
                          type="button"
                          aria-label={`Remove ${label(key)}`}
                          title="Remove"
                          tabIndex={showX ? 0 : -1}
                          onClick={(e) => { e.stopPropagation(); remove(key); }}
                          style={{
                            position: "absolute", inset: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", padding: 0,
                            cursor: "pointer", color: COLORS.gray600, fontSize: 14, opacity: showX ? 1 : 0, pointerEvents: showX ? "auto" : "none", transition: "opacity 150ms ease",
                          }}
                        >
                          <i className="fa-regular fa-xmark" aria-hidden="true" />
                        </button>
                      </span>
                    </div>
                    {open && (
                      <div style={{
                        position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 15, background: COLORS.white, border: `1px solid ${COLORS.gray300}`, borderRadius: 8,
                        boxShadow: "0px 12px 16px rgba(16, 24, 40, 0.08), 0px 4px 6px rgba(16, 24, 40, 0.03)", overflow: "hidden",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 12px", fontSize: 13, color: COLORS.gray600, fontWeight: 600, borderBottom: `1px solid ${COLORS.gray300}` }}>
                          Selection Type:
                          <span style={{ color: COLORS.cobalt500, fontWeight: 500 }}>Include all</span>
                          <i className="fa-regular fa-chevron-down" aria-hidden="true" style={{ fontSize: 10, color: COLORS.cobalt500 }} />
                        </div>
                        <div style={{ maxHeight: 240, overflowY: "auto", padding: 4 }}>
                          {rows.map(({ m, level, hasKids }) => (
                            <ListItem
                              key={m.id}
                              label={m.name}
                              level={level}
                              multi
                              tree={hasKids}
                              expanded={!collapsed[`${key}:${m.id}`]}
                              checked={checkedOf(key, members, m.id)}
                              onClick={() => toggleMember(key, members, m.id)}
                              onToggleExpand={() => setCollapsed((c) => ({ ...c, [`${key}:${m.id}`]: !c[`${key}:${m.id}`] }))}
                            />
                          ))}
                          {rows.length === 0 && <div style={{ padding: 16, textAlign: "center", fontSize: 13, color: COLORS.gray600 }}>No members match "{query}"</div>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
        <span style={{ color: COLORS.cobalt500, fontWeight: 500 }}>Exclude zero row</span>
        <Toggle checked={excludeZeroRow} onChange={onExcludeZeroRowChange} id="range-builder-exclude-zero" />
      </div>
    </div>
  );
}
