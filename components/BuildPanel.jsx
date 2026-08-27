// BuildPanel — Folio Design System (Feature)
// Checked against Figma "Add-Ons" (kmQDBYBQPuG9bt90qedB6A, node 6399:17463)
// — the actual source file for the addon. The "Build" section's open-state
// body is inline, unfactored markup there (no named component/instance to
// adopt), unlike its Publish/Tables siblings which collapse into named
// `PublishCard`/`TablesCard` instances. Confirmed intentional, addon-specific
// screen.
// Built from: Button, SegmentedButton, FilterField, RangeSelectorTrigger,
// RangeSelectorTree — the Cube Add-on's "Build" section.
//
// Presentational and fully controlled — all state (which stage, which range,
// filter values) lives with the caller so this can be wired to the actual
// add-on data layer without touching the component.
//
// Three stages:
//   picker  : nothing picked yet — "Build with AI" + Select / New / Open
//   picked  : a range or drilldown is set — range trigger, "← Back", the
//             flat Filters list, Fetch Data + Sources (and, in drilldown
//             mode, Last Publish + Create Pivot Table)
//   fetched : data has been fetched — Dimensions/Transactions segmented
//             control replaces the flat filter list: Dimensions shows
//             Columns/Rows/Filters field groups, Transactions shows a flat
//             filter list; a full-width Fetch Data re-fetches.
//
//   isDrilldown              : true once the range represents an account/cell
//                               drilldown rather than a plain range
//   rangeLabel / rangeMeta   : the range/drilldown trigger text, e.g.
//                               "Range 1" / "A1:E14", or "Accounts Payable" / "Drilldown"
//   rangeTreeOpen/-Nodes     : controls the bulk-range picker under the trigger
//   filters                  : [{ label, value, onClick }] — picked stage flat
//                               list, and the fetched-stage Transactions tab list
//   columnFields / rowFields : [{ label, value, onClick }] — fetched-stage
//                               Dimensions tab field groups (Filters reuses `filters`)
//   lastPublish / showPivotAction : only present in the drilldown "picked" state

import { Button } from "./Button.jsx";
import { SegmentedButton } from "./SegmentedButton.jsx";
import { FilterField } from "./FilterField.jsx";
import { RangeSelectorTrigger, RangeSelectorTree } from "./RangeSelector.jsx";

const COLORS = {
  gray600:   "#677489",
  gray900:   "#222B3A",
  cobalt500: "#173D82",
};

function FilterGroup({ title, fields }) {
  if (!fields || fields.length === 0) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {fields.map((f) => (
          <FilterField
            key={f.label}
            icon={<i className="fa-solid fa-table-cells" />}
            label={f.label}
            value={f.value}
            onClick={f.onClick}
          />
        ))}
      </div>
    </div>
  );
}

export function BuildPanel({
  stage = "picker",
  onBuildWithAI,
  onSelect,
  onNew,
  onOpen,
  isDrilldown = false,
  rangeLabel = "Range 1",
  rangeMeta = "A1:E14",
  rangeTreeOpen = false,
  rangeTreeNodes = [],
  onRangeTriggerClick,
  onRangeToggleNode,
  onRangeApply,
  onBack,
  filters = [],
  onFetchData,
  onSources,
  lastPublish,
  onOpenLastPublish,
  showPivotAction = false,
  onCreatePivotTable,
  viewMode = "dimensions",
  onViewModeChange,
  columnFields = [],
  rowFields = [],
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "'DM Sans', sans-serif" }}>
      <Button
        variant="subtle-purple"
        size="small"
        style={{ width: "100%" }}
        leadingIcon={<i className="fa-solid fa-sparkles" />}
        onClick={onBuildWithAI}
      >
        Build with AI
      </Button>

      {stage === "picker" && (
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" size="small" style={{ flex: 1 }} onClick={onSelect}>Select</Button>
          <Button variant="secondary" size="small" style={{ flex: 1 }} onClick={onNew}>New</Button>
          <Button variant="secondary" size="small" style={{ flex: 1 }} onClick={onOpen}>Open</Button>
        </div>
      )}

      {stage !== "picker" && (
        <>
          <RangeSelectorTrigger
            label={rangeLabel}
            meta={isDrilldown ? "Drilldown" : rangeMeta}
            open={rangeTreeOpen}
            onClick={onRangeTriggerClick}
          />

          {rangeTreeOpen && (
            <RangeSelectorTree nodes={rangeTreeNodes} onToggle={onRangeToggleNode} onApply={onRangeApply} />
          )}
        </>
      )}

      {stage === "picked" && (
        <>
          <button
            type="button"
            onClick={onBack}
            style={{
              display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
              padding: 0, cursor: "pointer", color: COLORS.cobalt500, fontSize: 12, fontWeight: 500,
              alignSelf: "flex-start",
            }}
          >
            <i className="fa-solid fa-arrow-left" style={{ fontSize: 12 }} aria-hidden="true" />
            Back
          </button>

          {filters.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filters.map((f) => (
                <FilterField
                  key={f.label}
                  icon={<i className="fa-solid fa-table-cells" />}
                  label={f.label}
                  value={f.value}
                  onClick={f.onClick}
                />
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="primary" style={{ flex: 1 }} onClick={onFetchData}>
              Fetch Data
            </Button>
            {onSources && (
              <Button variant="secondary" trailingIcon={<i className="fa-solid fa-chevron-down" />} onClick={onSources}>
                Sources
              </Button>
            )}
          </div>

          {isDrilldown && lastPublish && (
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, fontSize: 12, color: COLORS.gray600 }}>
              <span>Last Publish:<br />{lastPublish}</span>
              <button
                type="button"
                onClick={onOpenLastPublish}
                aria-label="Open last publish"
                style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.gray600, padding: 0, flexShrink: 0 }}
              >
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
              </button>
            </div>
          )}

          {isDrilldown && showPivotAction && (
            <Button
              variant="secondary"
              style={{ width: "100%" }}
              leadingIcon={<i className="fa-solid fa-table" />}
              onClick={onCreatePivotTable}
            >
              Create Pivot Table
            </Button>
          )}
        </>
      )}

      {stage === "fetched" && (
        <>
          <SegmentedButton
            fullWidth
            options={[
              { value: "dimensions", label: "Dimensions" },
              { value: "transactions", label: "Transactions" },
            ]}
            value={viewMode}
            onChange={onViewModeChange}
          />

          {viewMode === "dimensions" ? (
            <>
              <FilterGroup title="Columns" fields={columnFields} />
              <FilterGroup title="Rows" fields={rowFields} />
              <FilterGroup title="Filters" fields={filters} />
            </>
          ) : (
            <FilterGroup title="Filters" fields={filters} />
          )}

          <Button variant="primary" style={{ width: "100%" }} onClick={onFetchData}>
            Fetch Data
          </Button>
        </>
      )}
    </div>
  );
}
