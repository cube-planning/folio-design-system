// CubeAddonSidebar — Folio Design System (Feature composite)
// Built from: AddonSidebar, AddonTopNav, AccordionSection, BuildPanel,
// AnalyzePanel, PublishPanel, TablesPanel — the full Cube Sheets/Excel
// add-on panel, fully wired with real component state.
//
// This is the reference wiring for the add-on shell: every toggle, tab, and
// selection below is genuine React state, not hardcoded per-screen markup.
// Consumers embedding the add-on for real should copy this state shape into
// their own data layer rather than importing this file directly — the
// individual panels (BuildPanel, AnalyzePanel, PublishPanel, TablesPanel)
// are the reusable, controlled building blocks.
//
// Accordion rule: the 4 sections open independently — opening Analyze does
// not close Build. Only Build's own internal sub-flow (picker → picked →
// fetched, range tree open/closed) is single-active, which is inherent to
// its stage machine rather than an accordion mutual-exclusion rule.

import { useState } from "react";
import { AddonSidebar } from "./AddonSidebar.jsx";
import { AddonTopNav } from "./AddonTopNav.jsx";
import { AccordionSection } from "./AccordionSection.jsx";
import { BuildPanel } from "./BuildPanel.jsx";
import { AnalyzePanel } from "./AnalyzePanel.jsx";
import { PublishPanel } from "./PublishPanel.jsx";
import { TablesPanel } from "./TablesPanel.jsx";

// Range tree: All > Sheet 1 > Range 1, Sheet 2 > Drilldown 1
const INITIAL_RANGE_NODES = [
  { id: "all", label: "All", level: 0, checked: "mixed" },
  { id: "sheet1", label: "Sheet 1", level: 1, checked: "checked" },
  { id: "range1", label: "Range 1", level: 2, checked: "checked" },
  { id: "sheet2", label: "Sheet 2", level: 1, checked: "unchecked" },
  { id: "drilldown1", label: "Drilldown 1", level: 2, checked: "unchecked" },
];

const LEAVES = ["range1", "drilldown1"];
const SHEET_LEAVES = { sheet1: ["range1"], sheet2: ["drilldown1"] };

function recomputeRangeNodes(nodes, toggledId) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, { ...n }]));

  if (toggledId === "all") {
    const next = byId.all.checked === "checked" ? "unchecked" : "checked";
    LEAVES.forEach((id) => { byId[id].checked = next; });
  } else if (toggledId === "sheet1" || toggledId === "sheet2") {
    const next = byId[toggledId].checked === "checked" ? "unchecked" : "checked";
    SHEET_LEAVES[toggledId].forEach((id) => { byId[id].checked = next; });
  } else {
    byId[toggledId].checked = byId[toggledId].checked === "checked" ? "unchecked" : "checked";
  }

  Object.entries(SHEET_LEAVES).forEach(([sheetId, leafIds]) => {
    const states = leafIds.map((id) => byId[id].checked);
    byId[sheetId].checked = states.every((s) => s === "checked") ? "checked"
      : states.every((s) => s === "unchecked") ? "unchecked" : "mixed";
  });

  const allStates = LEAVES.map((id) => byId[id].checked);
  byId.all.checked = allStates.every((s) => s === "checked") ? "checked"
    : allStates.every((s) => s === "unchecked") ? "unchecked" : "mixed";

  return nodes.map((n) => byId[n.id]);
}

export function CubeAddonSidebar({ width = 300 }) {
  // Top nav
  const [dataSource] = useState("Company");
  const [currency] = useState("USD");
  const [hasWarning, setHasWarning] = useState(true);

  // Accordion open state — independent per section
  const [openSections, setOpenSections] = useState({ build: true, analyze: false, publish: false, tables: false });
  const toggleSection = (key) => setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  // ---- Build ----
  const [buildStage, setBuildStage] = useState("picker"); // "picker" | "picked" | "fetched"
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [rangeTreeOpen, setRangeTreeOpen] = useState(false);
  const [rangeNodes, setRangeNodes] = useState(INITIAL_RANGE_NODES);
  const [buildViewMode, setBuildViewMode] = useState("dimensions");
  const [filterValues, setFilterValues] = useState({
    Time: "Oct-25", Department: "All", Scenario: "Actuals", Entity: "Consolidated", Product: "All", Market: "All", Account: "All",
  });
  const setFilter = (label, value) => setFilterValues((v) => ({ ...v, [label]: value }));

  const filterLabels = isDrilldown
    ? ["Time", "Department", "Scenario", "Entity", "Product", "Market", "Account"]
    : ["Time", "Department", "Scenario", "Entity", "Product", "Market"];
  const buildFilters = filterLabels.map((label) => ({
    label, value: filterValues[label], onClick: () => setFilter(label, filterValues[label]),
  }));
  const columnFields = [{ label: "Time", value: filterValues.Time, onClick: () => {} }];
  const rowFields = [{ label: "Account", value: filterValues.Account ?? "All", onClick: () => {} }];

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
      topNav={
        <AddonTopNav
          dataSource={dataSource}
          currency={currency}
          hasWarning={hasWarning}
          onWarningClick={() => { setHasWarning(false); toggleSection("analyze"); }}
          onAssistantClick={() => {}}
        />
      }
    >
      <AccordionSection
        icon={<i className="fa-solid fa-grid-2-plus" />}
        title="Build"
        theme="blue"
        open={openSections.build}
        onToggle={() => toggleSection("build")}
      >
        <BuildPanel
          stage={buildStage}
          onBuildWithAI={() => setBuildStage("picked")}
          onSelect={() => setBuildStage("picked")}
          onNew={() => setBuildStage("picked")}
          onOpen={() => setBuildStage("picked")}
          isDrilldown={isDrilldown}
          rangeLabel={isDrilldown ? "Accounts Payable" : "Range 1"}
          rangeMeta="A1:E14"
          rangeTreeOpen={rangeTreeOpen}
          rangeTreeNodes={rangeNodes}
          onRangeTriggerClick={() => setRangeTreeOpen((o) => !o)}
          onRangeToggleNode={(id) => setRangeNodes((nodes) => recomputeRangeNodes(nodes, id))}
          onRangeApply={() => setRangeTreeOpen(false)}
          onBack={() => { setBuildStage("picker"); setIsDrilldown(false); }}
          filters={buildFilters}
          onFetchData={() => setBuildStage("fetched")}
          onSources={() => {}}
          lastPublish="Aug 20, 2026"
          onOpenLastPublish={() => {}}
          showPivotAction
          onCreatePivotTable={() => {}}
          viewMode={buildViewMode}
          onViewModeChange={setBuildViewMode}
          columnFields={columnFields}
          rowFields={rowFields}
        />
      </AccordionSection>

      <AccordionSection
        icon={<i className="fa-solid fa-magnifying-glass" />}
        title="Analyze"
        theme="purple"
        open={openSections.analyze}
        onToggle={() => toggleSection("analyze")}
      >
        <AnalyzePanel
          onAnalyzeForYou={() => {}}
          onDrilldown={() => { setIsDrilldown(true); setBuildStage("picked"); setOpenSections((s) => ({ ...s, build: true })); }}
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
        icon={<i className="fa-solid fa-arrow-up-from-bracket" />}
        title="Publish"
        theme="blue"
        open={openSections.publish}
        onToggle={() => toggleSection("publish")}
      >
        <PublishPanel
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
        icon={<i className="fa-solid fa-table" />}
        title="Tables"
        theme="blue"
        open={openSections.tables}
        onToggle={() => toggleSection("tables")}
      >
        {!detailTable ? (
          <TablesPanel
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
          <TablesPanel
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
    </AddonSidebar>
  );
}
