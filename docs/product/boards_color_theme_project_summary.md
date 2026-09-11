# Boards Color Theme — Project Summary
**Feature:** Color Theme Picker for Interactive Boards  
**Designer:** Nan  
**PM:** Liban, Shayan  
**Status:** Design exploration complete — ready for UI build

---

## Overview

A redesigned color theme system for Cube's Boards feature. Replaces the current free color picker (HSB wheel + hex input) with a curated, ramp-based palette system. The goal is to give users intentional, on-brand color choices that look professional in any financial context — without requiring design expertise.

---

## Problem Statement

The current production color picker allows users to select any color freely via an HSB wheel. This creates three problems:

1. **Inconsistent output** — users pick colors that look bad on projectors, in print, or at small chart sizes
2. **No design system alignment** — existing production colors (Jen's legacy palette) were added before the Cube ramp system existed and don't map to any token
3. **Cognitive overload** — the current panel shows 7 labeled hex inputs with no visual hierarchy or guidance

---

## Solution

Two-level color architecture:

**Level 1 — Board-level theme (global)**
Accessed via "Color Theme" button on the Boards index. Sets the default palette for all new charts on any board. One click applies a curated 7-slot preset.

**Level 2 — Widget-level override (per chart)**
Accessed via the pencil icon in edit mode → Preview modal → Style tab. Users select a series and pick a color from the ramp grid inline. Overridden series show a "custom" badge; a "Reset to theme colors" button restores the theme default.

---

## The Four Presets

### Board Room
**Use case:** C-suite presentations, investor decks, board-facing reports  
**Ramps:** Blue + Indigo  
**Mental model:** Authority and credibility. McKinsey uses exclusively Blue + Purple/Indigo for executive charts. Every series feels equally weighted — no color signals "less important."

| Slot | Color | Stop |
|------|-------|------|
| 1 | Blue | 800 |
| 2 | Blue | 600 |
| 3 | Indigo | 600 |
| 4 | Blue | 400 |
| 5 | Indigo | 400 |
| 6 | Blue | 200 |
| 7 | Cyan | 400 |

---

### Fiscal
**Use case:** General financial reporting, actuals vs budget, P&L views  
**Ramps:** Teal + Blue + Emerald + Cyan  
**Mental model:** Trustworthy and grounded. Blue, Teal, and Emerald are the "trust and money" trio in financial data visualization. Blue at slot 2 breaks green monotony and creates immediate separation.

| Slot | Color | Stop |
|------|-------|------|
| 1 | Teal | 600 |
| 2 | Blue | 600 |
| 3 | Emerald | 500 |
| 4 | Cyan | 500 |
| 5 | Blue | 400 |
| 6 | Teal | 400 |
| 7 | Blue | 200 |

---

### Growth
**Use case:** Revenue boards, ARR tracking, scale-stage company dashboards  
**Ramps:** Emerald + Fuchsia + Orange  
**Mental model:** Energetic and forward-moving. Emerald anchors the growth narrative. Fuchsia replaces Orange as the primary contrast because it holds vibrancy at lighter stops where Orange fades to peach.

| Slot | Color | Stop |
|------|-------|------|
| 1 | Emerald | 600 |
| 2 | Fuchsia | 600 |
| 3 | Emerald | 400 |
| 4 | Orange | 500 |
| 5 | Fuchsia | 400 |
| 6 | Emerald | 300 |
| 7 | Orange | 300 |

---

### Forecast
**Use case:** Planning cycles, scenario modeling, projections and variance  
**Ramps:** Indigo + Fuchsia + Teal + Cyan  
**Mental model:** Analytical and forward-looking. Lighter stops at slots 5–7 naturally encode the FP&A convention of showing projected series in softer colors vs actuals.

| Slot | Color | Stop |
|------|-------|------|
| 1 | Indigo | 600 |
| 2 | Fuchsia | 600 |
| 3 | Indigo | 400 |
| 4 | Teal | 500 |
| 5 | Fuchsia | 400 |
| 6 | Indigo | 300 |
| 7 | Cyan | 400 |

---

## Custom Section

The Custom section sits below the four presets in the panel.

**V1 scope:**
- Legacy colors (Jen's original production palette) appear as "Theme 1" — accessible but not promoted
- No + Custom button in V1
- Full custom palette creation flow deferred to V2

**Theme 1 (Legacy):**
Original production colors added before the ramp system. Not deprecated — preserved in Custom to avoid disrupting existing workflows. Not part of the token architecture.

---

## Semantic Color Rules

Three system-wide rules established during this project:

| Color | Reserved for |
|-------|-------------|
| Purple | Cube AI features only |
| Red / Green | Semantic status (positive/negative) only |
| Yellow | Excluded from chart palettes — carries warning connotation in financial tools |

---

## UX Patterns

### Color Theme Panel (Board index)
- Triggered by "Color Theme" button in top right of Boards index
- Slides in as a right side panel
- Structure: Chart preview → Presets → Color slots → Swap color ramp grid → Custom section
- Preset pills display slots 1, 3, 5, 7 (not 1–4) for better hue spread at small size
- Save triggers a toast: "Color theme saved — applies to new charts"
- Static board thumbnails on the index page are NOT affected by theme changes

### Widget Color Override (Edit mode → Preview modal)
- Triggered by pencil icon in widget hover toolbar in Edit Mode
- Opens existing Preview modal, defaulting to Style tab
- Series list shows each data series with colored dot, name, and "theme" or "custom" badge
- Click dot or "Format" to expand inline ramp grid below that series row
- Picking a color updates the chart preview live
- "Reset to theme color" button appears when a series has a custom override
- Update Widget saves changes

### Custom Palette (V2)
- + Custom button creates a new named palette using the ramp grid
- Palette saved as "Theme 2", "Theme 3" etc. — no renaming in V1
- Ramp grid is the only color selection tool — no free HSB picker

---

## Design System Notes

- All colors drawn exclusively from Cube ramp system (Blue, Teal, Emerald, Cyan, Indigo, Fuchsia, Orange)
- Gray excluded from chart palettes — signals "less important data" in categorical charts
- Purple reserved for AI features — not available in theme presets
- Folio Design System file key: `Q7G87Bmjx2aYNVDKYLlBaG`

---

## Files

- `prototype_color_theme.html` — Pattern 1 clickable prototype (v1, standalone panel)
- `prototype_v2_integrated.html` — Pattern 1 clickable prototype (v2, color picker integrated into Preview modal Style tab)

---

## Open Items for V2

- [ ] Full custom palette creation flow (+ Custom button)
- [ ] Pattern 2 and Pattern 3 prototypes for Maze user testing
- [ ] Maze test tasks and SEQ survey setup
- [ ] Final Figma spec with all 4 preset palettes
- [ ] Engineering handoff — confirm Legacy color deprecation scope with Rafa/Ash
- [ ] Confirm Forecast slot 5 final stop with Nan

