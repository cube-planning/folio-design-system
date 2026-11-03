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
//                               drilldown rather than a plain range; "Build with AI" is not
//                               offered in drilldown
//   rangeLabel / rangeMeta   : the range/drilldown trigger text, e.g.
//                               "Range 1" / "A1:E14", or "Accounts Payable" / "Drilldown"
//   showRangeTrigger         : render the range trigger and tree inside the card (default). A host
//                               that docks them above the cards, as the add-on does, passes false
//   rangeTreeOpen/-Nodes     : controls the bulk-range picker under the trigger
//   filters                  : [{ label, value, onClick, isDefault? }] — picked stage flat
//                               list, and the fetched-stage Transactions tab list;
//                               isDefault stars a row whose value is the company default
//   dimensionFilters / transactionFilters : fetched-stage Filters group per view
//                               (Dimensions omits the Time and Account already shown as
//                               Columns / Rows; Transactions lists Account, Time, Department,
//                               Scenario, Entity); each falls back to `filters`
//   onFiltersSettings        : adds a gear beside each "Filters" heading (Filter settings), where the
//                               add-on opens Default filter members. Kept apart from the rows so
//                               changing company defaults is never a side effect of filtering
//   dimensionsView           : a node (usually <RangeBuilder />) that replaces the Columns / Rows /
//                               Filters groups on the Dimensions view, for the "New" flow
//   sources                  : [{ id, name, app, status: "ok" | "failed" | "cancelled", detail }];
//                               with `dimensionsView`, swaps the full-width Fetch Data for a
//                               "N Sources" row with Fetch Data inline, Last Publish and one card per source.
//                               These are the integrations linked to the table; with none, the plain button stays
//   fetchDisabled            : disables Fetch Data (e.g. until Columns and Rows are set)
//   columnFields / rowFields : [{ label, value, onClick }] — fetched-stage
//                               Dimensions tab field groups (Filters reuses `filters`)
//   lastPublish / showPivotAction : only present in the drilldown "picked" state

import { useState } from "react";
import { Button } from "./Button.jsx";
import { SegmentedButton } from "./SegmentedButton.jsx";
import { FilterField } from "./FilterField.jsx";
import { RangeSelectorTrigger, RangeSelectorTree } from "./RangeSelector.jsx";
import { AppIcon } from "./AppIcon.jsx";

const COLORS = {
  gray600:   "#677489",
  gray900:   "#222B3A",
  cobalt500: "#173D82",
};

function BackLink({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
        padding: 0, cursor: "pointer", color: COLORS.cobalt500, fontSize: 12, fontWeight: 500,
        alignSelf: "flex-start",
      }}
    >
      <i className="fa-regular fa-arrow-left" style={{ fontSize: 12 }} aria-hidden="true" />
      Back
    </button>
  );
}

const STATUS_COLOR = { failed: "#D92D20", ok: "#677489", cancelled: "#97A3B6" };

// "3 Sources" row with Fetch Data inline, Last Publish, and one card per source.
function SourcesBlock({ sources, fetchDisabled, onFetchData, lastPublish, onOpenLastPublish }) {
  const [open, setOpen] = useState(true);
  const warn = sources.some((s) => s.status === "failed");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", padding: 0, cursor: "pointer", color: COLORS.gray900, fontSize: 13, fontFamily: "inherit" }}
        >
          <i className={`fa-regular fa-caret-${open ? "down" : "right"}`} style={{ fontSize: 12, width: 12 }} aria-hidden="true" />
          {sources.length} Sources
          {warn && <i className="fa-regular fa-triangle-exclamation" style={{ color: "#F79009", fontSize: 13 }} aria-label="A source needs attention" />}
        </button>
        <span style={{ flex: 1 }} />
        <Button variant="primary" size="small" disabled={fetchDisabled} leadingIcon={<i className="fa-regular fa-arrows-rotate" />} onClick={onFetchData}>
          Fetch Data
        </Button>
      </div>
      {lastPublish && (
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, fontSize: 13, lineHeight: "20px" }}>
          <div>
            <div style={{ color: COLORS.gray900 }}>Last Publish:</div>
            <div style={{ color: COLORS.cobalt500 }}>{lastPublish}</div>
          </div>
          <button
            type="button"
            aria-label="Open last publish"
            onClick={onOpenLastPublish}
            style={{ background: "none", border: "none", padding: 4, cursor: "pointer", color: COLORS.cobalt500, fontSize: 13 }}
          >
            <i className="fa-regular fa-arrow-up-right-from-square" aria-hidden="true" />
          </button>
        </div>
      )}
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sources.map((s) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 8 }}>
              <AppIcon app={s.app} size="large" style={{ borderRadius: 9999 }} />
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.cobalt500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</span>
                <span style={{ fontSize: 12, color: STATUS_COLOR[s.status] ?? COLORS.gray600 }}>{s.detail}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// A group heading; `onSettings` adds a gear at the right (used on "Filters").
function GroupHeading({ title, onSettings }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 28 }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.gray900 }}>{title}</div>
      {onSettings && (
        <Button
          variant="ghost-gray"
          size="small"
          icon={<i className="fa-regular fa-gear" />}
          aria-label="Filter settings"
          onClick={onSettings}
        />
      )}
    </div>
  );
}

function FilterGroup({ title, fields, onSettings }) {
  if (!fields || fields.length === 0) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <GroupHeading title={title} onSettings={onSettings} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {fields.map((f) => (
          <FilterField
            key={f.label}
            icon={<i className="fa-regular fa-grip-dots-vertical" />}
            label={f.label}
            value={f.value}
            onClick={f.onClick}
            isDefault={f.isDefault}
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
  showRangeTrigger = true,
  rangeTreeOpen = false,
  rangeTreeNodes = [],
  onRangeTriggerClick,
  onRangeToggleNode,
  onRangeApply,
  onBack,
  filters = [],
  dimensionFilters,
  transactionFilters,
  onFiltersSettings,
  dimensionsView,
  sources,
  fetchDisabled = false,
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
      {!isDrilldown && (
        <Button
          variant="subtle-purple"
          size="small"
          style={{ width: "100%" }}
          leadingIcon={<i className="fa-solid fa-sparkles" />}
          onClick={onBuildWithAI}
        >
          Build with AI
        </Button>
      )}

      {stage === "picker" && (
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" size="small" style={{ flex: 1 }} onClick={onSelect}>Select</Button>
          <Button variant="secondary" size="small" style={{ flex: 1 }} onClick={onNew}>New</Button>
          <Button variant="secondary" size="small" style={{ flex: 1 }} onClick={onOpen}>Open</Button>
        </div>
      )}

      {stage !== "picker" && showRangeTrigger && (
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
          <BackLink onClick={onBack} />

          {filters.length > 0 && <GroupHeading title="Filters" onSettings={onFiltersSettings} />}
          {filters.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filters.map((f) => (
                <FilterField
                  key={f.label}
                  icon={<i className="fa-regular fa-grip-dots-vertical" />}
                  label={f.label}
                  value={f.value}
                  onClick={f.onClick}
                  isDefault={f.isDefault}
                />
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="primary" style={{ flex: 1 }} onClick={onFetchData}>
              Fetch Data
            </Button>
            {onSources && (
              <Button variant="secondary" trailingIcon={<i className="fa-regular fa-chevron-down" />} onClick={onSources}>
                Sources
              </Button>
            )}
          </div>

          {isDrilldown && lastPublish && (
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, fontSize: 14, lineHeight: "20px" }}>
              <div>
                <div style={{ color: COLORS.gray900 }}>Last Publish:</div>
                <div style={{ color: COLORS.cobalt500 }}>{lastPublish}</div>
              </div>
              <button
                type="button"
                onClick={onOpenLastPublish}
                aria-label="Open last publish"
                style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.cobalt500, padding: 4, flexShrink: 0, fontSize: 14 }}
              >
                <i className="fa-regular fa-arrow-up-right-from-square" aria-hidden="true" />
              </button>
            </div>
          )}

          {isDrilldown && showPivotAction && (
            <Button
              variant="subtle-gray"
              style={{ width: "100%" }}
              leadingIcon={<i className="fa-regular fa-table-pivot" />}
              onClick={onCreatePivotTable}
            >
              Create Pivot Table
            </Button>
          )}
        </>
      )}

      {stage === "fetched" && (
        <>
          <BackLink onClick={onBack} />
          <SegmentedButton
            fullWidth
            size="small"
            options={[
              { value: "dimensions", label: "Dimensions" },
              { value: "transactions", label: "Transactions" },
            ]}
            value={viewMode}
            onChange={onViewModeChange}
          />

          {viewMode === "dimensions" ? (
            dimensionsView ?? (
              <>
                <FilterGroup title="Columns" fields={columnFields} />
                <FilterGroup title="Rows" fields={rowFields} />
                <FilterGroup title="Filters" fields={dimensionFilters ?? filters} onSettings={onFiltersSettings} />
              </>
            )
          ) : (
            <FilterGroup title="Filters" fields={transactionFilters ?? filters} onSettings={onFiltersSettings} />
          )}

          {viewMode === "dimensions" && dimensionsView && sources?.length ? (
            <SourcesBlock sources={sources} fetchDisabled={fetchDisabled} onFetchData={onFetchData} lastPublish={lastPublish} onOpenLastPublish={onOpenLastPublish} />
          ) : (
            <Button variant="primary" style={{ width: "100%" }} disabled={fetchDisabled} onClick={onFetchData}>
              Fetch Data
            </Button>
          )}
        </>
      )}
    </div>
  );
}
