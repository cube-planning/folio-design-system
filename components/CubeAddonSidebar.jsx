// CubeAddonSidebar — Folio Design System (Feature composite)
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) — confirmed intentional. This is the top-level
// addon reference composite, not a kit component.
// Built from: AddonSidebar, AddonTopNav, AccordionSection, BuildPanel,
// AnalyzePanel, PublishCard, TablesCard — the full Cube Sheets/Excel
// add-on panel, fully wired with real component state.
// (PublishCard/TablesCard renamed from PublishPanel/TablesPanel to match
// Figma "Add-Ons" (kmQDBYBQPuG9bt90qedB6A) vocabulary — see those files.)
//
// This is the reference wiring for the add-on shell: every toggle, tab, and
// selection below is genuine React state, not hardcoded per-screen markup.
// Consumers embedding the add-on for real should copy this state shape into
// their own data layer rather than importing this file directly — the
// individual panels (BuildPanel, AnalyzePanel, PublishCard, TablesCard)
// are the reusable, controlled building blocks.
//
// Accordion rule: the 4 sections open independently — opening Analyze does
// not close Build. Only Build's own internal sub-flow (picker → picked →
// fetched, range tree open/closed) is single-active, which is inherent to
// its stage machine rather than an accordion mutual-exclusion rule.

import { useEffect, useRef, useState } from "react";
import { AddonSidebar } from "./AddonSidebar.jsx";
import { AddonTopNav } from "./AddonTopNav.jsx";
import { AccordionSection } from "./AccordionSection.jsx";
import { BuildPanel } from "./BuildPanel.jsx";
import { AnalyzePanel } from "./AnalyzePanel.jsx";
import { PublishCard } from "./PublishCard.jsx";
import { TablesCard } from "./TablesCard.jsx";
import { DefaultMemberPicker, automaticMemberId } from "./DefaultMemberPicker.jsx";
import { DefaultMembersScreen } from "./DefaultMembersScreen.jsx";
import { AddonMenu } from "./AddonMenu.jsx";
import { RangeBuilder } from "./RangeBuilder.jsx";
import { RangeSelectorTrigger, RangeSelectorTree } from "./RangeSelector.jsx";
import { Badge } from "./Badge.jsx";
import { SegmentedButton } from "./SegmentedButton.jsx";
import { Toast } from "./Toast.jsx";

// Cube ranges, grouped by sheet tab, for the bulk-range tree. A host passes the
// real ones (one per Cube-managed tab) so the tree stays in step with the sheet.
// kind "drilldown" puts the sidebar in its drilldown mode while that range is active.
const DEFAULT_RANGES = [
  { id: "range1", sheetId: "sheet1", sheetName: "Sheet 1", label: "Range 1", meta: "A1:E14", kind: "range" },
  { id: "drilldown1", sheetId: "sheet2", sheetName: "Sheet 2", label: "Drilldown 1", triggerLabel: "Accounts Payable", kind: "drilldown" },
];

// All > sheet > range, with parents derived from their leaves.
function buildRangeNodes(ranges, checked) {
  const state = (ids) => {
    const on = ids.filter((id) => checked[id]).length;
    return on === 0 ? "unchecked" : on === ids.length ? "checked" : "mixed";
  };
  const sheets = [];
  ranges.forEach((r) => {
    let g = sheets.find((x) => x.id === r.sheetId);
    if (!g) { g = { id: r.sheetId, name: r.sheetName, ranges: [] }; sheets.push(g); }
    g.ranges.push(r);
  });
  const nodes = [{ id: "all", label: "All", level: 0, checked: state(ranges.map((r) => r.id)) }];
  sheets.forEach((g) => {
    nodes.push({ id: `sheet:${g.id}`, label: g.name, level: 1, checked: state(g.ranges.map((r) => r.id)) });
    g.ranges.forEach((r) => nodes.push({ id: r.id, label: r.meta ? `${r.label} (${r.meta})` : r.label, level: 2, checked: checked[r.id] ? "checked" : "unchecked" }));
  });
  return nodes;
}

// Ids of the ranges under a tree node (itself for a range).
function rangeIdsFor(ranges, nodeId) {
  if (nodeId === "all") return ranges.map((r) => r.id);
  if (nodeId.startsWith("sheet:")) return ranges.filter((r) => `sheet:${r.sheetId}` === nodeId).map((r) => r.id);
  return [nodeId];
}

// Sample member trees for the six filter dimensions, as [id, parentId, name].
// Real consumers pass their own cube's members into DefaultMemberPicker.
const tree = (rows) => rows.map(([id, parentId, name]) => ({ id, parentId, name }));
const DIMENSIONS = {
  time: { label: "Time", members: tree([["fy", null, "FY2025"], ["q1", "fy", "Q1-25"], ["jan", "q1", "Jan-25"], ["feb", "q1", "Feb-25"], ["mar", "q1", "Mar-25"], ["q2", "fy", "Q2-25"], ["apr", "q2", "Apr-25"], ["may", "q2", "May-25"], ["jun", "q2", "Jun-25"], ["q3", "fy", "Q3-25"], ["jul", "q3", "Jul-25"], ["aug", "q3", "Aug-25"], ["sep", "q3", "Sep-25"], ["q4", "fy", "Q4-25"], ["oct", "q4", "Oct-25"], ["nov", "q4", "Nov-25"], ["dec", "q4", "Dec-25"]]) },
  dept: { label: "Department", members: tree([["all", null, "All Departments"], ["corp", "all", "Corporate"], ["ga", "corp", "G&A"], ["fin", "corp", "Finance"], ["ppl", "corp", "People"], ["gtm", "all", "Go-to-Market"], ["sal", "gtm", "Sales"], ["mkt", "gtm", "Marketing"], ["cs", "gtm", "Customer Success"], ["rd", "all", "R&D"], ["plat", "rd", "Platform"], ["data", "rd", "Data"], ["des", "rd", "Design"], ["ns", "all", "NetSuite Connection"], ["ns1", "ns", "NS - Operations"], ["ns2", "ns", "NS - Facilities"], ["ns3", "ns", "NS - Legal"], ["ns4", "ns", "NS - IT"], ["ns5", "ns", "NS - Procurement"], ["ns6", "ns", "NS - Support"]]) },
  scen: { label: "Scenario", members: tree([["allsc", null, "All Scenarios"], ["act", "allsc", "Actuals"], ["bud", "allsc", "Budget"], ["fc", "allsc", "Forecast"], ["fc3", "fc", "Q3 Forecast"], ["fc4", "fc", "Q4 Forecast"]]) },
  ent: { label: "Entity", members: tree([["glob", null, "Global Co"], ["us", "glob", "GCo US"], ["uk", "glob", "GCo UK"], ["au", "glob", "GCo Australia"], ["elim", "glob", "Elimco"], ["other", "glob", "Entity - Other"]]) },
  prod: { label: "Product", members: tree([["allp", null, "All Products"], ["pf", "allp", "Platform"], ["core", "pf", "Core"], ["ana", "pf", "Analytics"], ["ai", "pf", "AI"], ["svc", "allp", "Services"], ["impl", "svc", "Implementation"], ["sup", "svc", "Support"], ["add", "allp", "Add-ons"], ["conn", "add", "Connectors"], ["sheets", "add", "Sheets Add-in"]]) },
  mkt: { label: "Market", members: tree([["allm", null, "All Markets"], ["na", "allm", "North America"], ["mus", "na", "United States"], ["mca", "na", "Canada"], ["eu", "allm", "Europe"], ["muk", "eu", "United Kingdom"], ["mde", "eu", "Germany"], ["mfr", "eu", "France"], ["ap", "allm", "Asia Pacific"], ["mau", "ap", "Australia"], ["mjp", "ap", "Japan"]]) },
};
const DIM_KEYS = Object.keys(DIMENSIONS);

// The New builder's tray: the six filter dimensions plus Account and Class.
const BUILDER_DIMENSIONS = [
  { key: "account", label: "Account" }, { key: "dept", label: "Department" }, { key: "scen", label: "Scenario" },
  { key: "time", label: "Time" }, { key: "ent", label: "Entity" }, { key: "prod", label: "Product" },
  { key: "mkt", label: "Market" }, { key: "class", label: "Class" },
];
// Account and Class only appear in the New builder, so their sample trees live here, not in DIMENSIONS.
const BUILDER_ONLY = {
  account: tree([["acct", null, "All Accounts"], ["liab", "acct", "Current Liabilities"], ["ap", "liab", "20000 \u2013 Accounts Payable"], ["accr", "liab", "20100 \u2013 Accrued Liabilities"], ["cc", "liab", "20200 \u2013 Credit Card Payable"], ["pay", "liab", "20300 \u2013 Payroll Liabilities"], ["def", "liab", "20400 \u2013 Deferred Revenue"], ["notes", "liab", "20500 \u2013 Notes Payable"]]),
  class: tree([["cls", null, "All Classes"], ["oh", "cls", "Overhead"], ["it", "cls", "IT"], ["fac", "cls", "Facilities"], ["sw", "cls", "Software"], ["log", "cls", "Logistics"], ["sm", "cls", "S&M"], ["te", "cls", "T&E"]]),
};
const membersFor = (key) => DIMENSIONS[key]?.members ?? BUILDER_ONLY[key];
const EMPTY_LAYOUT = { columns: [], rows: [], filters: [] };

// Sample integrations linked to the table. A real host passes the table's own.
const SAMPLE_SOURCES = [
  { id: "qb", name: "Green Plantations\u2026", app: "quickbooks", status: "failed", detail: "Last Import Failed" },
  { id: "sage", name: "Apple Plantations..", app: "sage", status: "ok", detail: "Jun 22, 9:00 am" },
  { id: "xero", name: "Peach Plantations\u2026", app: "xero", status: "cancelled", detail: "Last import cancelled" },
];
const memberById = (key, id) => DIMENSIONS[key].members.find((m) => m.id === id);

//   showRoleToggle : shows a "view as Admin / Viewer" switch at the bottom, so
//                    the prototype can demo the permission-gated default flow.
//                    A real add-on drives `canManageDefaults` from the user's
//                    Manage Dimension Members, Formulas & Tags permission.
//   onDrilldown / onDrilldownBack / onCreatePivotTable : host callbacks, so a
//                    sheet can react (add the "Drill …" tab, add the pivot tab)
//   ranges         : Cube ranges by sheet tab, [{ id, sheetId, sheetName, label, meta?,
//                    triggerLabel?, kind: "range" | "drilldown" }]; builds the range tree
//   activeRangeId  : the range on the active tab; sets the trigger label and, for a
//                    "drilldown" range, the drilldown mode. null means the tab has no Cube
//                    range (a blank sheet): Build returns to Select / New / Open
//   onRangeApply   : (checkedRangeIds) => void when the tree's Apply is pressed
//   onFetchData    : ({ mode: "dimensions" | "transactions" }) => void
//   sources        : the integrations linked to the table, [{ id, name, app, status, detail }];
//                    they list under "N Sources" in the New builder. Empty or omitted
//                    for a table with no integration: the plain Fetch Data button shows
//   initialApplied : member ids this user's filters start on, by dimension key
//                    (time, dept, scen, ent, prod, mkt), e.g. { time: "oct" }
//   initialOpenSections : which accordion sections start open, e.g.
//                    { build: true, analyze: true }; defaults to Build only
export function CubeAddonSidebar({
  width = 300, showRoleToggle = true, initialRole = "admin",
  onDrilldown, onDrilldownBack, onCreatePivotTable, onFetchData, onRangeApply,
  ranges = DEFAULT_RANGES, activeRangeId,
  initialOpenSections = { build: true, analyze: false, publish: false, tables: false },
  initialApplied = {},
  sources = SAMPLE_SOURCES,
}) {
  // Top nav
  const [dataSource] = useState("Company");
  const [currency] = useState("USD");
  const [hasWarning, setHasWarning] = useState(true);

  // Accordion open state — independent per section
  const [openSections, setOpenSections] = useState({ build: true, analyze: false, publish: false, tables: false, ...initialOpenSections });
  const toggleSection = (key) => setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  // ---- Build ----
  const [buildStage, setBuildStage] = useState("picker"); // "picker" | "picked" | "fetched"
  const activeRange = ranges.find((r) => r.id === activeRangeId);
  const [drilldownState, setIsDrilldown] = useState(false);
  const isDrilldown = activeRange ? activeRange.kind === "drilldown" : drilldownState;
  const [rangeTreeOpen, setRangeTreeOpen] = useState(false);
  const [rangeChecked, setRangeChecked] = useState({});
  const rangeNodes = buildRangeNodes(ranges, rangeChecked);
  const toggleRangeNode = (nodeId) => setRangeChecked((c) => {
    const ids = rangeIdsFor(ranges, nodeId);
    const next = !ids.every((id) => c[id]);
    const out = { ...c };
    ids.forEach((id) => { out[id] = next; });
    return out;
  });
  // activeRangeId === null: the active sheet has no Cube range (a new blank sheet), so start over
  useEffect(() => {
    if (activeRangeId === null) {
      setBuildStage("picker");
      setIsDrilldown(false);
      setNewBuild(false);
      setRangeTreeOpen(false);
      setOpenSections((o) => ({ ...o, build: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRangeId]);
  // Clicking a drilldown tab in the sheet should land on its Build screen, not the start picker
  useEffect(() => {
    if (activeRange?.kind === "drilldown" && buildStage === "picker") setBuildStage("picked");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRangeId]);
  const [buildViewMode, setBuildViewMode] = useState("dimensions");
  // New flow: the drag-and-drop range builder
  const [newBuild, setNewBuild] = useState(false);
  const [rangeLayout, setRangeLayout] = useState(EMPTY_LAYOUT);
  const [buildExcludeZero, setBuildExcludeZero] = useState(false);
  const changeLayout = (next) => {
    const refs = { columns: "F9:Q10", rows: "C12:E85" };
    const lines = ["rows", "columns"].filter((z) => next[z].length && next[z][0] !== rangeLayout[z][0]).map((z) => `${z === "rows" ? "Rows" : "Columns"}: set to ${refs[z]}`);
    setRangeLayout(next);
    if (lines.length) showToast("Range Set", <>{lines.map((l) => <div key={l}>{l}</div>)}</>);
  };

  // ---- Default filter members ----
  // defaults: the company default per dimension (set by admins); applied: what
  // this user picked for their own range. A filter row shows applied, else the
  // default, else the automatic member (parent with the most children).
  const [role, setRole] = useState(initialRole);
  const canManageDefaults = role === "admin";
  const [defaults, setDefaults] = useState({});
  const [defaultMeta, setDefaultMeta] = useState({});
  const [applied, setApplied] = useState(initialApplied);
  const [screen, setScreen] = useState(null); // null | { type: "manage" } | { type: "filter", key, from, reset }
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const showToast = (title, body) => {
    setToast({ title, body });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 5000);
  };
  const automaticId = (key) => automaticMemberId(DIMENSIONS[key].members);
  const shownId = (key) => applied[key] ?? defaults[key] ?? automaticId(key);
  const changeDefault = (key, id) => {
    setDefaults((d) => {
      const next = { ...d };
      if (id) next[key] = id; else delete next[key];
      return next;
    });
    setDefaultMeta((m) => {
      const next = { ...m };
      if (id) next[key] = "Set by Nina Graham \u00b7 just now"; else delete next[key];
      return next;
    });
    showToast(
      id ? "Default member set" : "Default reset",
      id ? `${DIMENSIONS[key].label} now opens on ${memberById(key, id).name} for everyone.` : `${DIMENSIONS[key].label} opens on its automatic member.`,
    );
  };

  const buildFilters = DIM_KEYS.map((key) => ({
    label: DIMENSIONS[key].label,
    value: memberById(key, shownId(key)).name,
    isDefault: !!defaults[key] && shownId(key) === defaults[key],
    onClick: () => setScreen({ type: "filter", key, from: null }),
  }));
  const accountFilter = { label: "Account", value: "20000 \u2013 Accounts Payable", onClick: () => {} };
  if (isDrilldown) buildFilters.unshift(accountFilter);
  const filtersBy = (labels) => labels.map((l) => (l === "Account" ? accountFilter : buildFilters.find((f) => f.label === l)));
  // Dimensions: Time is a column and Account a row, so they leave the Filters group
  const dimensionFilters = filtersBy(["Department", "Scenario", "Entity", "Product", "Market"]);
  const transactionFilters = filtersBy(["Account", "Time", "Department", "Scenario", "Entity"]);
  const columnFields = [{ label: "Time", value: memberById("time", shownId("time")).name, onClick: () => {} }];
  const rowFields = [accountFilter];

  // ---- Analyze ----
  const [excludeZeroRow, setExcludeZeroRow] = useState(true);
  const [expandMode, setExpandMode] = useState(null);

  // ---- Publish ----
  const [publishTab, setPublishTab] = useState("data");
  const [webReportState, setWebReportState] = useState("empty"); // "empty" | "create" | "existing"
  const [reportName, setReportName] = useState("");
  const [reportArea, setReportArea] = useState(null);
  const [reportAreaKind, setReportAreaKind] = useState(null);
  const [description, setDescription] = useState("");
  const [sharing, setSharing] = useState("private");
  const [sharedUsers, setSharedUsers] = useState([{ id: 1, name: "Nan Osborne" }]);
  const [allowDataInput, setAllowDataInput] = useState(false);
  const [report, setReport] = useState(null);
  let userSeq = sharedUsers.length + 1;

  // ---- Tables ----
  const [tablesTab, setTablesTab] = useState("existing");
  const [tableName, setTableName] = useState("");
  const [dataSourceLabel, setDataSourceLabel] = useState(null);
  const [newScenario, setNewScenario] = useState("Actuals");
  const [newPermission, setNewPermission] = useState("View only");
  const [tables, setTables] = useState([
    { id: 1, name: "AP Aging", meta: "Updated Aug 24" },
    { id: 2, name: "Headcount Plan", meta: "Updated Aug 20" },
  ]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [detailTable, setDetailTable] = useState(null);
  const [detailStage, setDetailStage] = useState("setup"); // "setup" | "configured" | "settings"
  const [detailScenario, setDetailScenario] = useState("Actuals");
  const [detailPermission, setDetailPermission] = useState("View only");
  const [detailName, setDetailName] = useState("");
  const [detailRange, setDetailRange] = useState("A1:E14");
  const [settingsTab, setSettingsTab] = useState("settings");
  const [showLayoutBanner, setShowLayoutBanner] = useState(true);

  return (
    <AddonSidebar
      width={width}
      overlay={
        <>
          {menuOpen && (
            <AddonMenu
              items={[{ id: "defaults", label: "Default filter members", icon: <i className="fa-regular fa-star" /> }]}
              onSelect={() => { setMenuOpen(false); setScreen({ type: "manage" }); }}
              onClose={() => setMenuOpen(false)}
            />
          )}
          {toast && (
            <div style={{ position: "absolute", left: 16, right: 16, top: 52, zIndex: 30 }}>
              <Toast type="success" title={toast.title} button={false} onDismiss={() => setToast(null)} style={{ width: "100%", boxSizing: "border-box" }}>{toast.body}</Toast>
            </div>
          )}
        </>
      }
      topNav={
        <AddonTopNav
          dataSource={dataSource}
          currency={currency}
          hasWarning={hasWarning}
          onMenuClick={() => setMenuOpen((o) => !o)}
          onWarningClick={() => { setHasWarning(false); toggleSection("analyze"); }}
          onAssistantClick={() => {}}
        />
      }
    >
      {screen?.type === "manage" && (
        <DefaultMembersScreen
          canEdit={canManageDefaults}
          dimensions={DIM_KEYS.map((key) => ({
            key,
            label: DIMENSIONS[key].label,
            defaultName: defaults[key] ? memberById(key, defaults[key]).name : undefined,
            automaticName: memberById(key, automaticId(key)).name,
            meta: defaultMeta[key],
          }))}
          onSelect={(key) => setScreen({ type: "filter", key, from: "manage" })}
          onReset={(key) => setScreen({ type: "filter", key, from: "manage", reset: true })}
          onBack={() => setScreen(null)}
        />
      )}
      {screen?.type === "filter" && (
        <DefaultMemberPicker
          key={`${screen.key}-${screen.from}-${screen.reset ? "reset" : "open"}`}
          dimension={DIMENSIONS[screen.key].label}
          members={DIMENSIONS[screen.key].members}
          defaultId={defaults[screen.key] ?? null}
          appliedId={applied[screen.key] ?? null}
          canEdit={canManageDefaults}
          mode={screen.from === "manage" ? "default" : "filter"}
          startWithReset={!!screen.reset}
          onDefaultChange={(id) => changeDefault(screen.key, id)}
          onApply={(id) => {
            setApplied((a) => ({ ...a, [screen.key]: id }));
            setScreen(null);
            showToast("Filter applied", `${DIMENSIONS[screen.key].label}: ${memberById(screen.key, id).name}`);
          }}
          onCancel={() => setScreen(null)}
          onBack={() => setScreen(screen.from === "manage" ? { type: "manage" } : null)}
        />
      )}
      {!screen && (<>
      {buildStage !== "picker" && (
        <div style={{ position: "relative" }}>
          <RangeSelectorTrigger
            label={activeRange ? (activeRange.triggerLabel ?? activeRange.label) : isDrilldown ? "Accounts Payable" : "Range 1"}
            meta={isDrilldown ? "Drilldown" : activeRange ? activeRange.meta : "A1:E14"}
            open={rangeTreeOpen}
            onClick={() => setRangeTreeOpen((o) => !o)}
          />
          {rangeTreeOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 15, borderRadius: 12, boxShadow: "0px 12px 16px rgba(16, 24, 40, 0.08), 0px 4px 6px rgba(16, 24, 40, 0.03)" }}>
              <RangeSelectorTree
                nodes={rangeNodes}
                onToggle={toggleRangeNode}
                onApply={() => {
                  setRangeTreeOpen(false);
                  onRangeApply?.(ranges.filter((r) => rangeChecked[r.id]).map((r) => r.id));
                }}
              />
            </div>
          )}
        </div>
      )}
      <AccordionSection
        icon={<i className="fa-regular fa-grid-2-plus" />}
        title="Build"
        badge={isDrilldown ? <Badge color="gray" size="sm" icon={<i className="fa-regular fa-magnifying-glass-chart" />}>Drilldown</Badge> : undefined}
        theme="blue"
        open={openSections.build}
        onToggle={() => toggleSection("build")}
      >
        <BuildPanel
          stage={buildStage}
          onBuildWithAI={() => setBuildStage("picked")}
          onSelect={() => setBuildStage("picked")}
          onNew={() => { setBuildViewMode("dimensions"); setNewBuild(true); setRangeLayout(EMPTY_LAYOUT); setBuildStage("fetched"); }}
          onOpen={() => setBuildStage("picked")}
          isDrilldown={isDrilldown}
          rangeLabel={activeRange ? (activeRange.triggerLabel ?? activeRange.label) : isDrilldown ? "Accounts Payable" : "Range 1"}
          rangeMeta={activeRange ? activeRange.meta : isDrilldown ? "Drilldown" : "A1:E14"}
          showRangeTrigger={false}
          onFiltersSettings={() => setScreen({ type: "manage" })}
          rangeTreeOpen={rangeTreeOpen}
          rangeTreeNodes={rangeNodes}
          onRangeTriggerClick={() => setRangeTreeOpen((o) => !o)}
          onRangeToggleNode={toggleRangeNode}
          onRangeApply={() => {
            setRangeTreeOpen(false);
            onRangeApply?.(ranges.filter((r) => rangeChecked[r.id]).map((r) => r.id));
          }}
          onBack={() => { if (isDrilldown) onDrilldownBack?.(); setBuildStage("picker"); setIsDrilldown(false); setNewBuild(false); }}
          filters={buildFilters}
          dimensionsView={newBuild ? (
            <RangeBuilder
              dimensions={BUILDER_DIMENSIONS}
              layout={rangeLayout}
              onChange={changeLayout}
              membersFor={membersFor}
              excludeZeroRow={buildExcludeZero}
              onExcludeZeroRowChange={setBuildExcludeZero}
            />
          ) : undefined}
          sources={newBuild ? sources : undefined}
          fetchDisabled={newBuild && buildViewMode === "dimensions" && !(rangeLayout.columns.length && rangeLayout.rows.length)}
          dimensionFilters={dimensionFilters}
          transactionFilters={transactionFilters}
          onFetchData={() => {
            const refetch = buildStage === "fetched";
            setBuildStage("fetched");
            onFetchData?.({ mode: buildViewMode });
            if (refetch) showToast("Data fetched", buildViewMode === "transactions" ? "Transactions are in the sheet." : "The range is up to date.");
          }}
          onSources={() => {}}
          lastPublish="Aug 20, 2026, 9:12 AM by Nina Graham"
          onOpenLastPublish={() => {}}
          showPivotAction
          onCreatePivotTable={() => {
            onCreatePivotTable?.();
            showToast("Pivot table created", "Added a pivot table sheet from this drilldown.");
          }}
          viewMode={buildViewMode}
          onViewModeChange={setBuildViewMode}
          columnFields={columnFields}
          rowFields={rowFields}
        />
      </AccordionSection>

      <AccordionSection
        icon={<i className="fa-regular fa-magnifying-glass" />}
        title="Analyze"
        theme="purple"
        open={openSections.analyze}
        onToggle={() => toggleSection("analyze")}
      >
        <AnalyzePanel
          onAnalyzeForYou={() => {}}
          onDrilldown={() => { setIsDrilldown(true); setBuildStage("picked"); setOpenSections((s) => ({ ...s, build: true })); onDrilldown?.(); }}
          excludeZeroRow={excludeZeroRow}
          onExcludeZeroRowChange={setExcludeZeroRow}
          expandMode={expandMode}
          onExpand={() => setExpandMode("expand")}
          onExpandAll={() => setExpandMode("expandAll")}
          onCollapse={() => setExpandMode(null)}
          collapseDisabled={expandMode == null}
          onValidate={() => setHasWarning(false)}
        />
      </AccordionSection>

      <AccordionSection
        icon={<i className="fa-regular fa-arrow-up-from-bracket" />}
        title="Publish"
        theme="blue"
        open={openSections.publish}
        onToggle={() => toggleSection("publish")}
      >
        <PublishCard
          tab={publishTab}
          onTabChange={setPublishTab}
          blockingDimensions={isDrilldown ? [] : ["Entity"]}
          onPublishData={() => {}}
          webReportState={webReportState}
          onCreateReport={() => setWebReportState("create")}
          onOverwrite={() => setWebReportState("existing")}
          reportName={reportName}
          onReportNameChange={setReportName}
          reportArea={reportArea}
          reportAreaKind={reportAreaKind}
          onPickReportArea={() => { setReportArea("Range 1 (A1:E14)"); setReportAreaKind("range"); }}
          description={description}
          onDescriptionChange={setDescription}
          sharing={sharing}
          onSharingChange={setSharing}
          sharedUsers={sharedUsers}
          onRemoveUser={(id) => setSharedUsers((u) => u.filter((x) => x.id !== id))}
          onAddUser={() => setSharedUsers((u) => [...u, { id: userSeq, name: `User ${userSeq}` }])}
          allowDataInput={allowDataInput}
          onAllowDataInputChange={setAllowDataInput}
          onCreateWebReport={() => {
            setReport({ name: reportName || "Untitled Report", meta: reportArea ?? undefined });
            setWebReportState("existing");
          }}
          onCancelCreate={() => setWebReportState("empty")}
          report={report}
          onReportAction={(action) => {
            if (action === "edit") setWebReportState("create");
          }}
        />
      </AccordionSection>

      <AccordionSection
        icon={<i className="fa-regular fa-table" />}
        title="Tables"
        theme="blue"
        open={openSections.tables}
        onToggle={() => toggleSection("tables")}
      >
        {!detailTable ? (
          <TablesCard
            tab={tablesTab}
            onTabChange={setTablesTab}
            tableName={tableName}
            onTableNameChange={setTableName}
            dataSourceLabel={dataSourceLabel}
            onPickDataSource={() => setDataSourceLabel("Company")}
            newTableScenario={newScenario}
            onNewTableScenarioChange={setNewScenario}
            newTablePermission={newPermission}
            onNewTablePermissionChange={setNewPermission}
            onCreateTable={() => {
              const id = tables.length + 1;
              setTables((t) => [...t, { id, name: tableName || `Table ${id}`, meta: "Just created" }]);
              setTableName("");
              setTablesTab("existing");
            }}
            tables={tables}
            selectedId={selectedTableId}
            onSelectTable={setSelectedTableId}
            onOpenTable={(id) => {
              const t = tables.find((x) => x.id === id);
              setDetailTable(t);
              setDetailName(t.name);
              setDetailStage("configured");
            }}
          />
        ) : (
          <TablesCard
            detail={detailTable}
            stage={detailStage}
            onBack={() => setDetailTable(null)}
            onDelete={() => { setTables((t) => t.filter((x) => x.id !== detailTable.id)); setDetailTable(null); }}
            scenario={detailScenario}
            onScenarioChange={setDetailScenario}
            onFetchTable={() => setDetailStage("configured")}
            onEditPencil={() => setDetailStage("settings")}
            showLayoutBanner={showLayoutBanner}
            onReviewLayout={() => setShowLayoutBanner(false)}
            rangeValue={detailRange}
            onRangeChange={setDetailRange}
            onReSelectRange={() => {}}
            onUpdateData={() => setShowLayoutBanner(false)}
            settingsTab={settingsTab}
            onSettingsTabChange={setSettingsTab}
            detailName={detailName}
            onDetailNameChange={setDetailName}
            permission={detailPermission}
            onPermissionChange={setDetailPermission}
            onSaveSettings={() => setDetailStage("configured")}
            onEditTableLayout={() => setDetailStage("configured")}
          />
        )}
      </AccordionSection>
      </>)}
      {showRoleToggle && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 4px 0", fontSize: 11, color: "#677489", borderTop: "1px dashed #CDD5E0" }}>
          <span style={{ whiteSpace: "nowrap" }}>Prototype: view as</span>
          <SegmentedButton
            size="small"
            value={role}
            onChange={setRole}
            options={[{ value: "admin", label: "Admin" }, { value: "viewer", label: "Viewer" }]}
            fullWidth
          />
        </div>
      )}
    </AddonSidebar>
  );
}
