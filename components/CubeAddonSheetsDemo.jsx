// CubeAddonSheetsDemo — Folio Design System (Feature composite, prototype)
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) — confirmed intentional. Built from: GoogleSheetMock,
// CubeAddonSidebar. Flow taken from Figma "Add-Ons" (kmQDBYBQPuG9bt90qedB6A),
// page "Pivot Table".
//
// The add-on docked inside a mock Google Sheet, so the whole interaction shows
// up in the sheet as well as the sidebar:
//
//   start       : "2026 P&L" with the Q4 liabilities grid; Build and Analyze open
//   Drilldown   : adds the "Drill C20 (2026 P&L) 1" tab with the 12 transactions
//                 behind 20000 – Accounts Payable, and switches to it
//   Create Pivot Table : adds "Pivot Table 1" — Row Labels / Sum of Value, grouped
//                 by Class then Vendor, with a Grand Total — and switches to it
//   Back        : returns to the "2026 P&L" tab (the drill and pivot tabs stay)
//   New         : Build opens on the Range (Dimensions) view; the Transactions view
//                 lists Account, Time, Department, Scenario, Entity. Fetch Data in
//                 Transactions adds "Transactions 1" (the Account 20000 rows)
//   "+" (tab bar) : adds a blank sheet (Sheet2, Sheet3, ...). The sidebar returns to its
//                 start screen for it; New + Fetch Data then writes the range's data into
//                 that sheet (Dimensions: the P&L grid, Transactions: the transaction rows)
//                 and gives it a Cube range, instead of jumping to another tab
//   Range tree  : one sheet group per Cube-managed tab (the pivot tab is not a Cube
//                 range). Apply switches to the first checked range's tab, and the
//                 trigger label follows whichever tab is active
//
// The pivot is computed from the drill rows, so the Grand Total always equals
// the Accounts Payable figure in B2 of the P&L sheet (12,046.45).

import { useState } from "react";
import { GoogleSheetMock } from "./GoogleSheetMock.jsx";
import { CubeAddonSidebar } from "./CubeAddonSidebar.jsx";

const fmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const PL_SHEET = {
  id: "pl",
  name: "2026 P&L",
  header: ["", "Oct-25", "Nov-25", "Dec-25", "Q4-25"],
  aligns: ["left", "right", "right", "right", "right"],
  widths: [220, 160, 160, 160, 160],
  rows: [
    ["20000 – Accounts Payable", "12,046.45", "7,412.39", "7,538.49", "7,538.49"],
    ["20100 – Accrued Liabilities", "3,120.10", "3,340.55", "3,502.88", "3,502.88"],
    ["20200 – Credit Card Payable", "8,842.33", "9,210.14", "8,990.72", "8,990.72"],
    ["20300 – Payroll Liabilities", "15,420.00", "15,980.00", "16,210.00", "16,210.00"],
    ["20400 – Deferred Revenue", "44,210.55", "45,120.30", "46,880.15", "46,880.15"],
    ["20500 – Notes Payable", "12,000.00", "12,000.00", "12,000.00", "12,000.00"],
    ["Total Current Liabilities", "95,639.43", "97,063.38", "95,122.24", "95,122.24"],
  ],
  boldRows: [6],
};

// department, entity, vendor, class, value — the 12 transactions behind 20000 – Accounts Payable
const TRANSACTIONS = [
  ["Accounting", "GCo US", "Staples", "Overhead", 842.19],
  ["Accounting", "GCo US", "Amazon Business", "Overhead", 1204.55],
  ["IT", "GCo US", "Dell", "IT", 3310.0],
  ["Operations", "GCo US", "WeWork", "Facilities", 1650.0],
  ["IT", "GCo UK", "Adobe", "Software", 599.88],
  ["IT", "GCo UK", "Slack", "Software", 312.5],
  ["IT", "GCo US", "AWS", "Software", 1987.44],
  ["Operations", "GCo UK", "FedEx", "Logistics", 421.1],
  ["Marketing", "GCo US", "LinkedIn", "S&M", 799.0],
  ["Sales", "GCo Australia", "Uber", "T&E", 233.79],
  ["IT", "GCo US", "Verizon", "Overhead", 486.0],
  ["Operations", "GCo UK", "Grainger", "Facilities", 200.0],
];

const DRILL_SHEET = {
  id: "drill",
  name: "Drill C20 (2026 P&L) 1",
  header: ["Account", "Time", "Department", "Entity", "Vendor", "Class", "Value", "Source", "Memo"],
  aligns: ["left", "right", "right", "right", "right", "right", "right", "right", "left"],
  rows: TRANSACTIONS.map(([dept, entity, vendor, cls, value], i) => [
    "20000 – Accounts Payable", "Oct-25", dept, entity, vendor, cls, fmt(value), "Financial Historicals", `INV-${10230 + i}`,
  ]),
};

// Group by Class, then Vendor, in order of first appearance (matches Google Sheets' default pivot).
function buildPivot() {
  const groups = [];
  const byClass = {};
  TRANSACTIONS.forEach(([, , vendor, cls, value]) => {
    if (!byClass[cls]) { byClass[cls] = { cls, total: 0, vendors: [], byVendor: {} }; groups.push(byClass[cls]); }
    const g = byClass[cls];
    g.total += value;
    if (!g.byVendor[vendor]) { g.byVendor[vendor] = { vendor, total: 0 }; g.vendors.push(g.byVendor[vendor]); }
    g.byVendor[vendor].total += value;
  });
  const rows = [];
  const boldRows = [];
  const indentRows = [];
  groups.forEach((g) => {
    boldRows.push(rows.length);
    rows.push([g.cls, fmt(g.total)]);
    g.vendors.forEach((v) => { indentRows.push(rows.length); rows.push([v.vendor, fmt(v.total)]); });
  });
  boldRows.push(rows.length);
  rows.push(["Grand Total", fmt(TRANSACTIONS.reduce((sum, t) => sum + t[4], 0))]);
  return {
    id: "pivot", name: "Pivot Table 1", style: "pivot", header: ["Row Labels", "Sum of Value"], aligns: ["left", "right"], widths: [200, 160], rows, boldRows, indentRows,
  };
}

const TX_SHEET = { ...DRILL_SHEET, id: "tx", name: "Transactions 1" };

// One Cube range per Cube-managed tab, in tab order. The pivot tab is plain Sheets output.
const RANGE_BY_SHEET = {
  pl: { id: "range-pl", sheetId: "pl", sheetName: PL_SHEET.name, label: "Range 1", meta: "A1:E14", kind: "range" },
  drill: { id: "range-drill", sheetId: "drill", sheetName: DRILL_SHEET.name, label: "Drilldown 1", triggerLabel: "Accounts Payable", kind: "drilldown" },
  tx: { id: "range-tx", sheetId: "tx", sheetName: TX_SHEET.name, label: "Transaction Build 1", meta: "A1:I13", kind: "range" },
};

// The Cube range a fetch creates in a blank sheet.
const rangeFor = (sheet, label, meta) => ({ id: `range-${sheet.id}`, sheetId: sheet.id, sheetName: sheet.name, label, meta, kind: "range" });

export function CubeAddonSheetsDemo() {
  const [sheets, setSheets] = useState([PL_SHEET]);
  const [activeId, setActiveId] = useState("pl");
  const [nextSheet, setNextSheet] = useState(2);

  const addSheet = (sheet) => {
    setSheets((list) => (list.some((s) => s.id === sheet.id) ? list : [...list, sheet]));
    setActiveId(sheet.id);
  };
  // "+" in the tab bar: a blank sheet named like Google Sheets does (Sheet2, Sheet3, ...)
  const addBlankSheet = () => {
    addSheet({ id: `sheet-${nextSheet}`, name: `Sheet${nextSheet}`, header: [], rows: [], blank: true });
    setNextSheet((n) => n + 1);
  };
  // Fetching with a blank sheet active writes into that sheet and gives it a Cube range
  const fetchInto = (blank, mode) => {
    const filled = mode === "transactions"
      ? { ...DRILL_SHEET, id: blank.id, name: blank.name, range: rangeFor(blank, "Transaction Build 1", "A1:I13") }
      : { ...PL_SHEET, id: blank.id, name: blank.name, range: rangeFor(blank, "Range 1", "A1:E14") };
    setSheets((list) => list.map((s) => (s.id === blank.id ? filled : s)));
  };

  const rangeOf = (sh) => sh.range ?? RANGE_BY_SHEET[sh.id];
  const ranges = sheets.map(rangeOf).filter(Boolean);
  const active = sheets.find((s) => s.id === activeId);
  // null: this sheet has no Cube range (blank), so the sidebar returns to its start screen.
  // undefined: not a Cube range either (the pivot), so the sidebar keeps what it shows.
  const activeRangeId = active ? rangeOf(active)?.id ?? (active.blank ? null : undefined) : undefined;

  return (
    <GoogleSheetMock
      title="2026 P&L"
      sheets={sheets}
      activeSheetId={activeId}
      onSelectSheet={setActiveId}
      onAddSheet={addBlankSheet}
      selectedCell={activeId === "pl" ? "B2" : "A1"}
      sidePanel={
        <CubeAddonSidebar
          initialOpenSections={{ build: true, analyze: true }}
          initialApplied={{ time: "oct", dept: "all", scen: "act", ent: "glob", prod: "allp", mkt: "allm" }}
          onDrilldown={() => addSheet(DRILL_SHEET)}
          onDrilldownBack={() => setActiveId("pl")}
          onCreatePivotTable={() => addSheet(buildPivot())}
          ranges={ranges}
          activeRangeId={activeRangeId}
          onRangeApply={(ids) => {
            const first = ranges.find((r) => ids.includes(r.id));
            if (first) setActiveId(first.sheetId);
          }}
          onFetchData={({ mode }) => {
            if (active?.blank) fetchInto(active, mode);
            else if (mode === "transactions") addSheet(TX_SHEET);
            else setActiveId("pl");
          }}
        />
      }
    />
  );
}
