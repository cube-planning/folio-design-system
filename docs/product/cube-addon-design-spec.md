# Cube Add-on Sidebar — Design Spec

Source: Figma "Add-Ons" file (`kmQDBYBQPuG9bt90qedB6A`), nodes `6399:17463` and its corrected revision `6548:2928`. Verified against the built Folio components in `components/AddonTopNav.jsx`, `AccordionSection.jsx`, `Button.jsx`, `FilterField.jsx`, `RangeSelector.jsx`, `ExpandCollapseControl.jsx`, `Toggle.jsx`.

Typeface: **DM Sans only** (the Figma file still shows some legacy Lato on headers/nav — treat all of it as DM Sans; Lato is deprecated in Folio).

---

## 1. Shell

| Element | Spec |
|---|---|
| Sidebar width | 300px |
| Sidebar container | white/`#F7F9FC` background, 1px `#E4E7EC` border, 16px corner radius, clipped overflow |
| Top nav height | 40–44px, background **cobalt-500 `#173D82`**, top corners rounded 12–16px to match shell |
| Nav content padding | 8px |
| Body padding | 16px, content stacked with 16px gap |

### Top nav contents (left to right)
1. Menu icon — `fa-solid fa-bars`, white, 24×24 hit box, 16px glyph
2. Database icon — `fa-solid fa-database`, white
3. "Company" dropdown — DM Sans Medium 12px white + `fa-solid fa-chevron-down` 10–12px
4. "USD" dropdown — same style as above
5. Warning icon (conditional) — `fa-solid fa-triangle-exclamation`, color **`#F79009`** (System/Yellow/500)
6. AI assistant button — pushed to the far right, 28×28px circle, **"Folio AI Gradient"**: `linear-gradient(-18.86deg, #7A5AF8 33.1%, #9B8AFB 62.1%, #5925DC 98.4%)`, white `fa-solid fa-sparkles` icon at 16px

---

## 2. Color tokens used on this screen

These are the screen's own gray/brand ramp — **distinct from the `#101828`/`#98A2B3` ramp** used elsewhere in Folio (Badge, ListItem, Checkbox). Use these exact values for this surface.

| Token | Hex | Usage |
|---|---|---|
| Gray/900 | `#222B3A` | primary text, chevrons |
| Gray/600 | `#677489` | secondary text, icons |
| Gray/500 | `#97A3B6` | placeholder/meta text (e.g. "(A1:E14)"), tooltip-icon color |
| Gray/400 | `#CDD5E0` | input/field borders |
| Gray/200 | `#F2F5F9` | flat fills (Collapse idle state, dividers, segmented-control track) |
| Brand Blue/700 | `#263FA9` | "Build"/"Publish"/"Tables" header text |
| Brand Blue/100 | `#DBEAFE` | Build/Publish/Tables card border |
| Brand Blue/25 | `#F7FBFF` | Build/Publish/Tables card fill (open state only) |
| Purple 800 | `#4A1FB8` | "Analyze" header text |
| Purple 900 | `#3E1C96` | "Validate" link text |
| Purple 100 | `#EBE9FE` | Analyze card border, AI-button fill |
| Purple 25 | `#FBFAFE` | Analyze card fill (open state only) |
| Purple 500 | `#7A5AF8` | AI-button text/icon |
| Cobalt-500 | `#173D82` | top nav bg, primary buttons, secondary-button border/text, toggle "on" |
| Cobalt-600 | `#122E64` | checkbox fill (multi-select tree) |
| White | `#FFFFFF` | card/field backgrounds, primary-button text |
| Yellow/500 | `#F79009` | warning icon |

---

## 3. Typography

All DM Sans. Sizes below are the ones actually used on this screen (note: this screen runs almost entirely on the 12px "Caption 1" scale, not Folio's 14px "body" default).

| Style | Size / weight / line-height | Used for |
|---|---|---|
| Section header | 14px / SemiBold(600) / 1.43 | "Build", "Analyze", "Publish", "Tables" |
| Caption 1 – SemiBold | 12px / 600 / 1.5 | "Range 1" (bold half of range label) |
| Caption 1 – Medium | 12px / 500 / 1.5 | button labels, field labels, "Data Drilldown & Expand", "Validate" header/link |
| Caption 1 – Regular | 12px / 400 / 1.5 | "(A1:E14)" meta text, "Check unrecognized dimensions" |

---

## 4. Components

### 4.1 AccordionSection
Collapsible row: leading icon + title + trailing chevron, expands to reveal panel content.

- Corner radius: **12px**
- Collapsed: white background, border colored by theme (`#DBEAFE` blue / `#EBE9FE` purple)
- Open: tinted background (`#F7FBFF` blue / `#FBFAFE` purple) + same border
- Header height: 48px, 16px horizontal padding
- Header text: theme color (`#263FA9` blue / `#4A1FB8` purple), 14px SemiBold
- Chevron: `#222B3A`, 12px, `fa-chevron-up` when open / `fa-chevron-down` closed
- Icons used: Build = `fa-grid-2-plus`, Analyze = `fa-magnifying-glass`, Publish = `fa-upload`, Tables = `fa-table`
- Only one section open at a time (single-open accordion)

### 4.2 Buttons
Existing Folio `Button` component, all at **size="small" (28px height)** on this screen — not the 32px default.

| Variant | Visual | Used for |
|---|---|---|
| `subtle-purple` (new) | bg `#EBE9FE`, text `#7A5AF8`, pill | "Build with AI", "Let Cube Analyze for You" |
| `primary` | bg `#173D82`, white text, pill | "Fetch Data", "Expand" (active) |
| `secondary` | white bg, `#173D82` border+text, pill | "Select"/"New"/"Open", "Sources", "Drilldown", "Expand All", "Create Pivot Table" |
| Collapse idle/disabled | flat `#F2F5F9` fill, **no border**, `#222B3A` text — not a faded `secondary` | "Collapse" when nothing is expanded |

Icons: leading icon + label, 12px glyphs, `fa-solid` style throughout.

### 4.3 Range selector
- **Trigger** (closed): 32px input-style row, border `#CDD5E0`, 8px radius. Label in 12px SemiBold `#222B3A` ("Range 1"), meta in 12px Regular `#97A3B6` (" (A1:E14)"), trailing chevron `#677489`
- Drilldown state relabels to `"Accounts Payable (Drilldown)"` and adds a "← Back" link (`#173D82`, 12px Medium) above the filter list, replacing the Dimensions/Transactions toggle
- **Multi-range tree** (open state): bordered panel (`#F2F5F9`), helper text "Select multiple ranges for bulk actions", nested checkbox rows (14/28/48px indent per level) using cobalt-600 (`#122E64`) checked fill, footer "Apply" primary button full width

### 4.4 Filter field
Full-width dropdown row used for Time/Department/Scenario/Entity/Product/Market/Account: 32px height, border `#CDD5E0`, 8px radius, leading grid icon (`fa-table-cells`, `#677489`), label "Field: value" in 12px Regular `#222B3A`, trailing chevron.

### 4.5 Toggle ("Exclude zero row")
Existing Folio `Toggle`: 28×14px pill track, **solid cobalt-500 `#173D82`** when on (confirmed correct — an earlier Figma revision showed a gradient fill; that was a design error since fixed), gray-400 when off, white knob.

### 4.6 Expand/Collapse control
Label row with a `fa-circle-question` info icon (tooltip: "Expand opens one level, Expand All shows all levels, and Collapse closes them"), then Expand + Expand All side by side (each `flex:1`, 28px), then Collapse full width below (flat gray fill when disabled, `secondary` style when enabled).

### 4.7 Validate row
"Validate" section header (12px Medium `#222B3A`) + a body row: "Check unrecognized dimensions" (12px Regular `#222B3A`) with a "Validate" text-link button (12px Medium, **`#3E1C96`** — Purple 900, not cobalt) right-aligned.

---

## 5. States to model

1. **Default / collapsed** — all four accordion rows closed, white with theme-colored borders.
2. **Build open — Range mode** — Dimensions/Transactions segmented control, 6 filter rows (Time/Department/Scenario/Entity/Product/Market), Fetch Data + Sources.
3. **Build open — Range picker open** — trigger expands into the multi-select tree, replacing the segmented control + filters until Apply is pressed.
4. **Build open — Drilldown mode** — trigger relabels, Back link replaces the segmented control, adds an Account filter row, adds Last Publish metadata + "Create Pivot Table" below Fetch Data/Sources.
5. **Analyze open** — AI button, Drilldown button, Exclude-zero-row toggle, Expand/Expand All/Collapse, divider, Validate row.

---

## 6. Known deviations from the raw Figma file (intentional)

- Typeface forced to DM Sans everywhere; the Figma frame's Lato on headers/nav/Expand/Collapse is legacy and superseded by Folio's system rule.
- Everything else (color, size, radius, spacing) matches the Figma spec exactly as verified.
