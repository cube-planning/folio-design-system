// TablesCard — Folio Design System (Feature)
// Renamed from TablesPanel: Figma "Add-Ons" (kmQDBYBQPuG9bt90qedB6A, node
// 6399:17463, "Analyze" frame) factors the collapsed Tables section into its
// own named component, and its own generated reference code names it
// `TablesCard` (data-name="Tables Card", node 5167:16310) — renamed to match
// exactly. PublishCard.jsx follows the same vocabulary for its sibling.
// Built from: Button, SegmentedButton, Input, Select, Tag, Banner — the Cube
// Add-on's "Tables" section: create a new live table, or manage an existing
// one through Setup → Configured → Settings.
//
// Presentational and fully controlled, same pattern as BuildPanel.
//
//   tab           : "new" | "existing"
//   tables        : [{ id, name, meta }] — Existing tab's row list
//   selectedId    : the row currently selected (border + checkmark + "Open")
//   detail        : { name } | null — when set, replaces the section body
//                    with the table detail screen (breadcrumb + stages)
//   detailStage   : "setup" | "configured" | "settings"
//   settingsTab   : "settings" | "layout" — only used at the "settings" stage

import { useState } from "react";
import { Button } from "./Button.jsx";
import { SegmentedButton } from "./SegmentedButton.jsx";
import { Input } from "./Input.jsx";
import { Select } from "./Select.jsx";
import { Tag } from "./Tag.jsx";
import { Banner } from "./Banner.jsx";

const COLORS = {
  gray900:   "#222B3A",
  gray600:   "#677489",
  gray500:   "#97A3B6",
  gray400:   "#CDD5E0",
  gray200:   "#F2F5F9",
  cobalt500: "#173D82",
  cobalt50:  "#E6EBF4",
  white:     "#FFFFFF",
};

function DataSourceButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 8, width: "100%", height: 32, padding: "0 12px",
        borderRadius: 8, border: `1px solid ${COLORS.gray400}`, background: COLORS.white, cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif", textAlign: "left", boxSizing: "border-box",
      }}
    >
      <i className="fa-solid fa-database" style={{ fontSize: 12, color: COLORS.gray600 }} aria-hidden="true" />
      <span style={{ flex: 1, fontSize: 12, color: label ? COLORS.gray900 : COLORS.gray500 }}>
        {label ?? "Select a data source"}
      </span>
      <i className="fa-solid fa-chevron-down" style={{ fontSize: 12, color: COLORS.gray600 }} aria-hidden="true" />
    </button>
  );
}

function TableRow({ name, meta, selected, onSelect, onOpen }) {
  return (
    <div
      onClick={onSelect}
      role="option"
      aria-selected={selected}
      style={{
        display: "flex", alignItems: "center", gap: 8, height: 40, padding: "0 12px",
        borderRadius: 8, border: `1px solid ${selected ? COLORS.cobalt500 : COLORS.gray400}`,
        background: selected ? COLORS.cobalt50 : COLORS.white, cursor: "pointer", boxSizing: "border-box",
      }}
    >
      <i className="fa-solid fa-table" style={{ fontSize: 14, color: COLORS.gray600, flexShrink: 0 }} aria-hidden="true" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {name}
        </div>
        {meta && <div style={{ fontSize: 12, color: COLORS.gray500 }}>{meta}</div>}
      </div>
      {selected && (
        <>
          <i className="fa-solid fa-check" style={{ fontSize: 12, color: COLORS.cobalt500 }} aria-hidden="true" />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onOpen?.(); }}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: COLORS.cobalt500, fontSize: 12, fontWeight: 500 }}
          >
            Open
          </button>
        </>
      )}
    </div>
  );
}

function TableDetail({
  name,
  onBack,
  stage = "setup",
  onDelete,
  scenario,
  onScenarioChange,
  scenarioOptions = ["Actuals", "Budget", "Forecast"],
  onFetchTable,
  onEditPencil,
  showLayoutBanner = false,
  onReviewLayout,
  rangeValue = "",
  onRangeChange,
  onReSelectRange,
  onUpdateData,
  settingsTab = "settings",
  onSettingsTabChange,
  detailName = "",
  onDetailNameChange,
  permission,
  onPermissionChange,
  onSaveSettings,
  onEditTableLayout,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.gray600, minWidth: 0 }}>
          <button
            type="button"
            onClick={onBack}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: COLORS.cobalt500, fontWeight: 500 }}
          >
            Tables
          </button>
          <i className="fa-solid fa-chevron-right" style={{ fontSize: 10 }} aria-hidden="true" />
          <span style={{ color: COLORS.gray900, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {name}
          </span>
        </div>
        {stage === "settings" && (
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete table"
            style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.gray600, padding: 4 }}
          >
            <i className="fa-solid fa-trash" aria-hidden="true" />
          </button>
        )}
      </div>

      {stage === "setup" && (
        <>
          <Tag size="small">All Users</Tag>
          <Select label="Save to Scenario" options={scenarioOptions} value={scenario} onChange={onScenarioChange} />
          <Button variant="primary" style={{ width: "100%" }} onClick={onFetchTable}>Fetch Table</Button>
        </>
      )}

      {stage === "configured" && (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900 }}>Layout</span>
            <button
              type="button"
              onClick={onEditPencil}
              aria-label="Edit table"
              style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.gray600, padding: 4 }}
            >
              <i className="fa-solid fa-pencil" aria-hidden="true" />
            </button>
          </div>

          {showLayoutBanner && (
            <Banner variant="info" button="Review" onButtonClick={onReviewLayout}>
              Cube updated your table layout.
            </Banner>
          )}

          <Input label="Range" placeholder="e.g. A1:E14" value={rangeValue} onChange={(e) => onRangeChange?.(e.target.value)} />
          <Button variant="secondary" size="small" style={{ width: "100%" }} onClick={onReSelectRange}>Re-Select Range</Button>
          <Select label="Save to Scenario" options={scenarioOptions} value={scenario} onChange={onScenarioChange} />

          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="primary" style={{ flex: 1 }} onClick={onFetchTable}>Fetch Table</Button>
            <Button variant="secondary" style={{ flex: 1 }} onClick={onUpdateData}>Update Data</Button>
          </div>
        </>
      )}

      {stage === "settings" && (
        <>
          <SegmentedButton
            fullWidth
            options={[
              { value: "settings", label: "Settings" },
              { value: "layout", label: "Layout" },
            ]}
            value={settingsTab}
            onChange={onSettingsTabChange}
          />

          {settingsTab === "settings" ? (
            <>
              <Input label="Name" value={detailName} onChange={(e) => onDetailNameChange?.(e.target.value)} />
              <Select label="Permissions" options={["View only", "Edit", "Admin"]} value={permission} onChange={onPermissionChange} />
              <Button variant="primary" style={{ width: "100%" }} onClick={onSaveSettings}>Save</Button>
            </>
          ) : (
            <>
              <Banner variant="neutral">This table's layout is fetched from its source range and can't be edited here directly.</Banner>
              <Button variant="secondary" style={{ width: "100%" }} onClick={onEditTableLayout}>Edit Table Layout</Button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export function TablesCard({
  tab = "new",
  onTabChange,

  // New Table (named distinctly from the detail screen's `scenario`/`permission`
  // props below, which arrive via the `...detailProps` rest spread — a shared
  // name here would shadow them and silently drop the detail screen's values)
  tableName = "",
  onTableNameChange,
  dataSourceLabel,
  onPickDataSource,
  newTableScenario,
  onNewTableScenarioChange,
  scenarioOptions = ["Actuals", "Budget", "Forecast"],
  newTablePermission,
  onNewTablePermissionChange,
  permissionOptions = ["View only", "Edit", "Admin"],
  onCreateTable,

  // Existing
  tables = [],
  selectedId,
  onSelectTable,
  onOpenTable,

  // Detail
  detail,
  ...detailProps
}) {
  if (detail) {
    return <TableDetail name={detail.name} {...detailProps} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "'DM Sans', sans-serif" }}>
      <SegmentedButton
        fullWidth
        options={[
          { value: "new", label: "New Table" },
          { value: "existing", label: "Existing" },
        ]}
        value={tab}
        onChange={onTabChange}
      />

      {tab === "new" && (
        <>
          <Input
            label="Name"
            placeholder="Table name"
            value={tableName}
            charCount
            maxChars={150}
            onChange={(e) => onTableNameChange?.(e.target.value)}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900 }}>Data Source</label>
            <DataSourceButton label={dataSourceLabel} onClick={onPickDataSource} />
          </div>
          <Select label="Save to Scenario" options={scenarioOptions} value={newTableScenario} onChange={onNewTableScenarioChange} />
          <Select label="Permission" options={permissionOptions} value={newTablePermission} onChange={onNewTablePermissionChange} />
          <Button variant="primary" style={{ width: "100%" }} onClick={onCreateTable}>Create Table</Button>
        </>
      )}

      {tab === "existing" && (
        <>
          <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900 }}>{tables.length} Tables</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tables.map((t) => (
              <TableRow
                key={t.id}
                name={t.name}
                meta={t.meta}
                selected={t.id === selectedId}
                onSelect={() => onSelectTable?.(t.id)}
                onOpen={() => onOpenTable?.(t.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
