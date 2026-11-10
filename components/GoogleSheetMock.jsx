// GoogleSheetMock — Folio Design System (Mock, Cube Add-on host)
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) — a throwaway host for prototypes, confirmed
// intentional. Built from Figma "Add-Ons" (kmQDBYBQPuG9bt90qedB6A) page
// "Pivot Table", where the add-on is docked inside Google Sheets.
//
// A lightweight Google Sheets stand-in: title row, menu, toolbar, formula bar,
// column letters, row numbers, the sheet's cells, and a tab bar. It exists so
// add-on interactions (Drilldown, Create Pivot Table, range selection) have a
// sheet to act on. It is not a spreadsheet: cells are static text.
//
//   title         : document title, e.g. "2026 P&L"
//   sheets        : [{ id, name, header, rows, aligns?, widths?, style?, boldRows?, indentRows? }]
//                   header / rows are arrays of strings; `style: "pivot"` paints the
//                   header row cobalt; boldRows / indentRows are row indexes into `rows`
//   activeSheetId : which sheet shows
//   onSelectSheet : (id) => void — a tab was clicked
//   onAddSheet    : () => void — the "+" in the tab bar was pressed; the host adds the sheet
//   selectedCell  : A1-style ref shown in the name box and outlined, e.g. "B2"
//   sidePanel     : the add-on, docked on the right (usually <CubeAddonSidebar />)

const COLORS = {
  gray900: "#202124",
  gray700: "#3C4043",
  gray600: "#5F6368",
  grid: "#E1E3E1",
  header: "#F8F9FA",
  tabActiveBg: "#E1EAFD",
  tabActive: "#174EA6",
  sheetsGreen: "#0F9D58",
  share: "#1E6B34",
  cobalt500: "#173D82",
  selected: "#1A73E8",
  white: "#FFFFFF",
};

const FONT = "Arial, sans-serif";
const MENU = ["File", "Edit", "View", "Insert", "Format", "Data", "Tools", "Add-ons", "Help"];
const COLS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const ROW_H = 26;

function parseRef(ref) {
  const m = /^([A-Z]+)(\d+)$/.exec(ref || "");
  return m ? { col: COLS.indexOf(m[1]), row: Number(m[2]) } : { col: -1, row: -1 };
}

function ToolbarIcon({ name, active }) {
  return <i className={`fa-solid ${name}`} aria-hidden="true" style={{ fontSize: 13, color: active ? COLORS.gray900 : COLORS.gray600, width: 28, textAlign: "center" }} />;
}

export function GoogleSheetMock({ title = "2026 P&L", sheets = [], activeSheetId, onSelectSheet, onAddSheet, selectedCell = "A1", sidePanel }) {
  const sheet = sheets.find((s) => s.id === activeSheetId) ?? sheets[0];
  if (!sheet) return null;
  const sel = parseRef(selectedCell);
  const widths = COLS.map((_, i) => sheet.widths?.[i] ?? 160);
  const aligns = sheet.aligns ?? [];
  const bold = new Set(sheet.boldRows ?? []);
  const indent = new Set(sheet.indentRows ?? []);
  const isPivot = sheet.style === "pivot";
  const gridRows = Math.max(sheet.rows.length + 2, 30);
  const header = sheet.header ?? [];

  const cell = (text, ci, ri, extra) => {
    const isSel = sel.col === ci && sel.row === ri + 1;
    return (
      <div
        key={ci}
        style={{
          width: widths[ci], flexShrink: 0, height: ROW_H, boxSizing: "border-box", padding: "0 8px", display: "flex", alignItems: "center",
          justifyContent: aligns[ci] === "right" ? "flex-end" : "flex-start", borderRight: `1px solid ${COLORS.grid}`, borderBottom: `1px solid ${COLORS.grid}`,
          fontSize: 12, color: COLORS.gray900, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          outline: isSel ? `2px solid ${COLORS.selected}` : "none", outlineOffset: -2, position: "relative", zIndex: isSel ? 1 : 0, ...extra,
        }}
      >
        {text}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", minHeight: 0, background: COLORS.white, fontFamily: FONT, color: COLORS.gray900 }}>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px 0" }}>
          <div style={{ width: 36, height: 36, borderRadius: 4, background: COLORS.sheetsGreen, color: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="fa-solid fa-table-cells" aria-hidden="true" style={{ fontSize: 16 }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18, color: COLORS.gray900 }}>{title}</span>
              <i className="fa-regular fa-star" aria-hidden="true" style={{ fontSize: 13, color: COLORS.gray600 }} />
              <i className="fa-regular fa-folder" aria-hidden="true" style={{ fontSize: 13, color: COLORS.gray600 }} />
              <i className="fa-regular fa-cloud" aria-hidden="true" style={{ fontSize: 13, color: COLORS.gray600 }} />
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 2, fontSize: 13, color: COLORS.gray700 }}>
              {MENU.map((m) => (
                <span key={m} style={m === "Add-ons" ? { fontWeight: 500, color: COLORS.gray900 } : undefined}>{m}</span>
              ))}
              <span style={{ textDecoration: "underline", color: COLORS.gray600 }}>Last edit was seconds ago</span>
            </div>
          </div>
          <span style={{ background: COLORS.share, color: COLORS.white, fontSize: 13, fontWeight: 500, borderRadius: 9999, padding: "8px 18px" }}>
            <i className="fa-solid fa-lock" aria-hidden="true" style={{ fontSize: 11, marginRight: 8 }} />Share
          </span>
          <span style={{ width: 32, height: 32, borderRadius: 9999, background: "#1F3A6E", color: COLORS.white, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>J</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", height: 40, padding: "0 8px", marginTop: 4, borderTop: `1px solid ${COLORS.grid}`, fontSize: 12, color: COLORS.gray700 }}>
          <ToolbarIcon name="fa-rotate-left" /><ToolbarIcon name="fa-rotate-right" /><ToolbarIcon name="fa-print" /><ToolbarIcon name="fa-paint-roller" />
          <span style={{ padding: "0 10px" }}>100%</span><ToolbarIcon name="fa-dollar-sign" /><ToolbarIcon name="fa-percent" /><span style={{ padding: "0 10px" }}>123</span>
          <span style={{ padding: "0 10px" }}>Default (Ari…</span><span style={{ padding: "0 10px" }}>10</span>
          <ToolbarIcon name="fa-bold" active /><ToolbarIcon name="fa-italic" active /><ToolbarIcon name="fa-strikethrough" active /><ToolbarIcon name="fa-underline" active />
          <ToolbarIcon name="fa-fill-drip" /><ToolbarIcon name="fa-border-all" /><ToolbarIcon name="fa-align-left" /><ToolbarIcon name="fa-filter" /><ToolbarIcon name="fa-sigma" />
        </div>

        <div style={{ display: "flex", alignItems: "center", height: 28, borderTop: `1px solid ${COLORS.grid}`, borderBottom: `1px solid ${COLORS.grid}`, fontSize: 12, color: COLORS.gray600 }}>
          <span style={{ width: 70, padding: "0 12px" }}>{selectedCell}</span>
          <i style={{ fontStyle: "italic", padding: "0 12px", borderLeft: `1px solid ${COLORS.grid}` }}>fx</i>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflow: "auto", background: COLORS.white }}>
          <div style={{ width: "max-content", minWidth: "100%" }}>
            <div style={{ display: "flex", position: "sticky", top: 0, zIndex: 2, background: COLORS.header }}>
              <div style={{ width: 36, flexShrink: 0, height: 22, borderRight: `1px solid ${COLORS.grid}`, borderBottom: `1px solid ${COLORS.grid}`, boxSizing: "border-box" }} />
              {COLS.map((c, i) => (
                <div key={c} style={{
                  width: widths[i], flexShrink: 0, height: 22, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center",
                  borderRight: `1px solid ${COLORS.grid}`, borderBottom: `1px solid ${COLORS.grid}`, fontSize: 11, color: COLORS.gray600,
                  background: sel.col === i ? "#E8EAED" : COLORS.header,
                }}>{c}</div>
              ))}
            </div>
            {Array.from({ length: gridRows }, (_, ri) => {
              const isHeader = ri === 0;
              const data = isHeader ? sheet.header : sheet.rows[ri - 1];
              const rowNum = ri + 1;
              return (
                <div key={ri} style={{ display: "flex" }}>
                  <div style={{
                    width: 36, flexShrink: 0, height: ROW_H, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center",
                    background: sel.row === rowNum ? "#E8EAED" : COLORS.header, borderRight: `1px solid ${COLORS.grid}`, borderBottom: `1px solid ${COLORS.grid}`,
                    fontSize: 11, color: COLORS.gray600,
                  }}>{rowNum}</div>
                  {COLS.map((_, ci) => {
                    const text = data ? data[ci] ?? "" : "";
                    if (isHeader && data && data.length) {
                      return cell(text, ci, ri, isPivot && ci < header.length
                        ? { background: COLORS.cobalt500, color: COLORS.white, fontWeight: 700 }
                        : { fontWeight: 700 });
                    }
                    const rowIdx = ri - 1;
                    return cell(text, ci, ri, {
                      fontWeight: bold.has(rowIdx) ? 700 : 400,
                      paddingLeft: ci === 0 && indent.has(rowIdx) ? 20 : 8,
                    });
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", height: 40, borderTop: `1px solid ${COLORS.grid}`, background: COLORS.header, padding: "0 8px", gap: 4, fontSize: 13 }}>
          <button
            type="button"
            aria-label="Add sheet"
            title="Add sheet"
            onClick={onAddSheet}
            style={{ width: 32, height: 32, border: "none", borderRadius: 9999, background: "none", color: COLORS.gray600, fontSize: 13, cursor: onAddSheet ? "pointer" : "default" }}
          >
            <i className="fa-solid fa-plus" aria-hidden="true" />
          </button>
          <i className="fa-solid fa-bars" aria-hidden="true" style={{ width: 32, textAlign: "center", color: COLORS.gray600, fontSize: 13 }} />
          {sheets.map((s) => {
            const on = s.id === sheet.id;
            return (
              <div
                key={s.id}
                role="tab"
                aria-selected={on}
                tabIndex={0}
                onClick={() => onSelectSheet?.(s.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelectSheet?.(s.id); } }}
                style={{
                  display: "flex", alignItems: "center", gap: 8, height: 32, padding: "0 12px", cursor: "pointer", whiteSpace: "nowrap",
                  background: on ? COLORS.tabActiveBg : "transparent", color: on ? COLORS.tabActive : COLORS.gray700, fontWeight: on ? 500 : 400,
                }}
              >
                {s.name}
                <i className="fa-solid fa-caret-down" aria-hidden="true" style={{ fontSize: 10 }} />
              </div>
            );
          })}
        </div>
      </div>

      {sidePanel && (
        <div style={{ width: 332, flexShrink: 0, overflowY: "auto", padding: 8, boxSizing: "border-box", borderLeft: `1px solid ${COLORS.grid}`, background: COLORS.white }}>
          {sidePanel}
        </div>
      )}
    </div>
  );
}
