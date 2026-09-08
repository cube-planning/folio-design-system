# Cube / Folio Design System — Project Instructions

You are producing design and front-end output for **Cube Software**, an FP&A / EPM platform, using the **Folio Design System**. Everything you generate — HTML, CSS, React, SVG, charts, slides, diagrams, images — must use **only** the colors defined in this document.

---

## 0. Absolute Rules

1. **No color may appear in your output unless its hex value is listed in this document.** No exceptions for "close enough" shades, no generic library defaults, no Tailwind stock colors, no `#3B82F6`, no `steelblue`, no `rebeccapurple`.
2. **Every chart, graph, bar, line, area, pie slice, donut segment, sparkline, heatmap cell, and legend swatch must use the Data Visualization palette in Section 2 — and nothing else.** Do not pull chart series colors from the brand, status, or gray ramps.
3. **Never invent, interpolate, or "brighten" a token.** If you need a lighter version, use a lighter stop that exists in the ramp.
4. Turn off default palettes explicitly. Chart libraries ship their own colors — always pass an explicit color array.
5. **DM Sans is the only typeface.** Never Inter, Roboto, Lato, Montserrat, Arial, or a monospace font — including for numbers and financial data.
6. If a request needs a color this document does not cover, **say so and ask** rather than substituting one.

---

## 1. Chart & Graph Color — read this before writing any chart code

### 1.1 The Data Visualization palette (the ONLY chart colors)

Assign series in this order. Series 1 gets `dataviz-1`, series 2 gets `dataviz-2`, and so on. Do not reorder for aesthetics.

| Slot | Hex | Ramp | Subtle / tint |
|---|---|---|---|
| `dataviz-1` | `#14B8A6` | Teal 500 | `#CCFBF1` |
| `dataviz-2` | `#06B6D4` | Cyan 500 | `#CFFAFE` |
| `dataviz-3` | `#10B981` | Emerald 500 | `#D1FAE5` |
| `dataviz-4` | `#6366F1` | Indigo 500 | `#E0E7FF` |
| `dataviz-5` | `#D946EF` | Fuchsia 500 | `#FAE8FF` |
| `dataviz-6` | `#F97316` | Orange 500 | `#FFEDD5` |

```css
--color-dataviz-1: #14B8A6;
--color-dataviz-2: #06B6D4;
--color-dataviz-3: #10B981;
--color-dataviz-4: #6366F1;
--color-dataviz-5: #D946EF;
--color-dataviz-6: #F97316;

--color-dataviz-1-subtle: #CCFBF1;
--color-dataviz-2-subtle: #CFFAFE;
--color-dataviz-3-subtle: #D1FAE5;
--color-dataviz-4-subtle: #E0E7FF;
--color-dataviz-5-subtle: #FAE8FF;
--color-dataviz-6-subtle: #FFEDD5;
```

Copy-paste series array:

```js
const CUBE_DATAVIZ = ['#14B8A6', '#06B6D4', '#10B981', '#6366F1', '#D946EF', '#F97316'];
```

### 1.2 What is banned from charts

| Color | Why it's banned from chart series |
|---|---|
| **Gray** (any stop) | Reads as "less important / deprecated data" in a categorical chart |
| **Purple** (any stop) | Reserved system-wide for Cube AI features only |
| **Yellow** | Carries a warning connotation in a financial tool |
| **Red / Green** | Reserved for semantic status (positive / negative variance) only — never as a category color |
| **Cobalt** | Brand/UI action color — keep chart series distinct from interactive UI |

### 1.3 The one allowed exception: variance

Red and green may color a **value** when the chart's entire purpose is favorable vs. unfavorable variance (e.g. a variance waterfall, a delta column). In that case:

- Positive / favorable: `#229E66` (Green 500)
- Negative / unfavorable: `#D92D20` (Red 500)

Never mix this with categorical series in the same chart, and never use red/green to distinguish two products, regions, or departments.

### 1.4 Chart chrome (axes, gridlines, labels)

Chart *structure* is gray — only the data marks use the dataviz palette.

| Element | Hex | Token |
|---|---|---|
| Chart background | `#FFFFFF` | White |
| Gridlines | `#E4E7EC` | Gray 200 |
| Axis line | `#D0D5DD` | Gray 300 |
| Axis tick labels | `#667085` | Gray 500 |
| Axis title | `#475467` | Gray 600 |
| Data labels / values | `#101828` | Gray 900 |
| Chart title | `#101828` | Gray 900 |
| Legend text | `#344054` | Gray 700 |
| Tooltip surface | `#FFFFFF` + `#E4E7EC` border | White / Gray 200 |
| Zero / reference line | `#98A2B3` | Gray 400 |

### 1.5 Chart form rules

- **Bar / column:** solid fill at the `500` stop, `4px` corner radius on the value end only, no gradients, no 3D, no drop shadows, no outlines.
- **Stacked bars:** consecutive dataviz slots (1, 2, 3…), never two stops of the same hue.
- **Line:** `2px` stroke, no shadow. Markers only when there are fewer than 12 points.
- **Area:** the `500` stop stroke over the matching `-subtle` fill at 100% opacity — never a semi-transparent `500`.
- **Pie / donut:** maximum 6 slices, dataviz order, `2px` white gap between slices. Prefer a bar chart over a pie whenever there are more than 4 categories.
- **Actuals vs. forecast:** same hue, actuals solid, forecast dashed (`4 4`) at the same `500` stop — do not switch hue for forecast.
- **More than 6 series:** group the tail into "Other" using Gray 400 `#98A2B3`. Do not extend the palette.
- Never apply gradients, transparency, textures, or glow to data marks.

### 1.6 Optional named chart themes

When the user asks for a specific mood, use one of these four board presets instead of the default dataviz order. Use it whole — do not mix slots between themes.

**Board Room** — C-suite, investor and board-facing. Authoritative.
`#1E3A8A` `#1D4ED8` `#4F46E5` `#60A5FA` `#818CF8` `#BFDBFE` `#22D3EE`

**Fiscal** — general financial reporting, actuals vs. budget, P&L. Trustworthy.
`#0D9488` `#1D4ED8` `#10B981` `#06B6D4` `#60A5FA` `#2DD4BF` `#BFDBFE`

**Growth** — revenue, ARR, scale-stage dashboards. Energetic.
`#059669` `#C026D3` `#34D399` `#F97316` `#E879F9` `#6EE7B7` `#FDBA74`

**Forecast** — planning cycles, scenario modeling, variance. Analytical. Lighter stops in slots 5–7 encode projections vs. actuals.
`#4F46E5` `#C026D3` `#818CF8` `#14B8A6` `#E879F9` `#A5B4FC` `#22D3EE`

---

## 2. UI Color Palette

Use these for interface chrome — **not** for chart series.

### Base

```css
--white: #FFFFFF;
--black: #000000;
```

### Cobalt — primary brand

`500` is the resting/interactive stop; `600` is hover; `700` is pressed. Primary buttons, CTAs, focus rings, active and selected states.

```css
--cobalt-25:  #F5F7FA;
--cobalt-50:  #E6EBF4;
--cobalt-100: #C6D3EC;
--cobalt-200: #8EA8E1;
--cobalt-300: #4B7CD8;
--cobalt-400: #2357B8;
--cobalt-500: #173D82;
--cobalt-600: #122E64;
--cobalt-700: #0E2349;
--cobalt-800: #0B1932;
--cobalt-900: #081121;
```

### Blue — links and navigation only

Never use Blue as the primary action color. Cobalt is primary.

```css
--blue-25:  #F7FBFF;
--blue-50:  #EFF6FF;
--blue-100: #DBEAFE;
--blue-200: #BFDBFE;
--blue-300: #93C5FD;
--blue-400: #60A5FA;
--blue-500: #2667D8;
--blue-600: #1D4ED8;
--blue-700: #1D40AF;
--blue-800: #1E3A8A;
--blue-900: #1E2563;
```

### Gray — text, borders, surfaces

```css
--gray-25:  #FCFCFD;
--gray-50:  #F9FAFB;
--gray-100: #F2F4F7;
--gray-200: #E4E7EC;
--gray-300: #D0D5DD;
--gray-400: #98A2B3;
--gray-500: #667085;
--gray-600: #475467;
--gray-700: #344054;
--gray-800: #1D2939;
--gray-900: #101828;
```

### Green — success

```css
--green-50:  #ECFDF3;
--green-100: #DCFAE6;
--green-200: #ABEFC6;
--green-300: #75E0A7;
--green-400: #70CF98;
--green-500: #229E66;
--green-600: #079455;
--green-700: #067647;
--green-800: #085D3A;
--green-900: #08492E;
```

### Red — error and destructive

```css
--red-50:  #FEF3F2;
--red-100: #FFE6E5;
--red-200: #FECDCA;
--red-300: #E88179;
--red-400: #E1574D;
--red-500: #D92D20;
--red-600: #B42318;
--red-700: #912018;
--red-800: #871A12;
--red-900: #6E150E;
```

### Yellow — warning

```css
--yellow-50:  #FFFAEB;
--yellow-100: #FEF0C7;
--yellow-200: #FEDF89;
--yellow-300: #FEC84B;
--yellow-400: #FDB022;
--yellow-500: #F79009;
--yellow-600: #DC6803;
--yellow-700: #B54708;
--yellow-800: #93370D;
--yellow-900: #7A2E0E;
```

### Purple — Cube AI only

Reserved for AI-related UI. Never decorative, never a chart color.

```css
--purple-50:  #F4F3FF;
--purple-100: #EBE9FE;
--purple-200: #D9D6FE;
--purple-300: #BDB4FE;
--purple-400: #9B8AFB;
--purple-500: #7A5AF8;
--purple-600: #6938EF;
--purple-700: #5925DC;
--purple-800: #4A1FB8;
--purple-900: #3E1C96;
```

### Accent ramps — full stops for the dataviz hues

Available when you need a lighter or darker stop of a chart color (tinted chips, category badges, hover states, sequential scales).

```css
/* Teal */
--teal-50: #F0FDFA;  --teal-100: #CCFBF1; --teal-200: #99F6E4; --teal-300: #5EEAD4;
--teal-400: #2DD4BF; --teal-500: #14B8A6; --teal-600: #0D9488; --teal-700: #0F766E;
--teal-800: #115E59; --teal-900: #134E4A;

/* Cyan */
--cyan-50: #ECFEFF;  --cyan-100: #CFFAFE; --cyan-200: #A5F3FC; --cyan-300: #67E8F9;
--cyan-400: #22D3EE; --cyan-500: #06B6D4; --cyan-600: #0891B2; --cyan-700: #0E7490;
--cyan-800: #155E75; --cyan-900: #164E63;

/* Emerald */
--emerald-50: #ECFDF5;  --emerald-100: #D1FAE5; --emerald-200: #A7F3D0; --emerald-300: #6EE7B7;
--emerald-400: #34D399; --emerald-500: #10B981; --emerald-600: #059669; --emerald-700: #047857;
--emerald-800: #065F46; --emerald-900: #064E3B;

/* Indigo */
--indigo-50: #EEF2FF;  --indigo-100: #E0E7FF; --indigo-200: #C7D2FE; --indigo-300: #A5B4FC;
--indigo-400: #818CF8; --indigo-500: #6366F1; --indigo-600: #4F46E5; --indigo-700: #4338CA;
--indigo-800: #3730A3; --indigo-900: #312E81;

/* Fuchsia */
--fuchsia-50: #FDF4FF;  --fuchsia-100: #FAE8FF; --fuchsia-200: #F5D0FE; --fuchsia-300: #F0ABFC;
--fuchsia-400: #E879F9; --fuchsia-500: #D946EF; --fuchsia-600: #C026D3; --fuchsia-700: #A21CAF;
--fuchsia-800: #86198F; --fuchsia-900: #701A75;

/* Orange */
--orange-50: #FFF7ED;  --orange-100: #FFEDD5; --orange-200: #FED7AA; --orange-300: #FDBA74;
--orange-400: #FB923C; --orange-500: #F97316; --orange-600: #EA580C; --orange-700: #C2410C;
--orange-800: #9A3412; --orange-900: #7C2D12;
```

### Stop-usage rule

| Stop | Use for |
|---|---|
| `500` | Interactive resting state, chart series base hue |
| `600` | Hover state for anything at `500` |
| `700` | Pressed state; colored text and icons |
| `700–800` | Colored text and icons on light backgrounds |
| `50–200` | Surfaces — badge fills, banner backgrounds, tinted chips, area fills |
| `25–50` | Page and chip backgrounds |

### Semantic aliases

```css
--text-primary:    #101828;  /* Gray 900 */
--text-secondary:  #344054;  /* Gray 700 */
--text-tertiary:   #475467;  /* Gray 600 */
--text-disabled:   #667085;  /* Gray 500 */
--text-inverse:    #FFFFFF;
--text-link:       #2667D8;  /* Blue 500 */

--bg-page:         #FFFFFF;
--bg-subtle:       #F9FAFB;  /* Gray 50 */
--bg-muted:        #F2F4F7;  /* Gray 100 */
--bg-sidebar:      #F5F7FA;  /* Cobalt 25 */

--border-default:  #E4E7EC;  /* Gray 200 */
--border-strong:   #D0D5DD;  /* Gray 300 */
--border-focus:    #173D82;  /* Cobalt 500 */

--success:         #229E66;
--error:           #D92D20;
--warning:         #F79009;
--ai:              #7A5AF8;
```

### Gradients — AI surfaces only

```css
--gradient-ai:   linear-gradient(135deg, #7A5AF8 10%, #9B8AFB 50%, #5925DC 100%);
--gradient-blue: linear-gradient(135deg, #2A4DD0 10%, #2667D8 50%, #163D83 100%);
```

Never use a gradient on a chart mark, a button, or a card.

---

## 3. Typography

**DM Sans only.** Load it:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Weights: 400 regular, 500 medium, 600 semibold, 700 bold.

| Token | Size | Line height | Letter spacing |
|---|---|---|---|
| `display-1` | 48px | 60px | −2% |
| `display-2` | 36px | 48px | −1% |
| `display-3` | 30px | 40px | 0 |
| `display-4` | 24px | 32px | 0 |
| `title-1` | 20px | 28px | 0 |
| `title-2` | 18px | 28px | 0 |
| `title-3` | 16px | 24px | 0 |
| `body` | 14px | 20px | 0 |
| `caption-1` | 12px | 18px | 0 |
| `caption-2` | 10px | 16px | 0 |

| Context | Token | Weight |
|---|---|---|
| Page title | `display-4` | Bold |
| Panel / drawer header | `title-2` | SemiBold |
| Section heading / chart title | `title-3` | Bold |
| Default UI text | `body` | Regular |
| Table header | `body` | Bold |
| Form label | `caption-1` | SemiBold |
| Hint / helper text | `caption-1` | Regular |
| Axis tick label | `caption-1` | Regular |
| Metadata / micro label | `caption-2` | Regular or Medium |

---

## 4. Shape, Spacing, Elevation

### Border radius

| Element | Radius |
|---|---|
| Buttons, chips, badges, toggles, avatars | `9999px` (pill) |
| Inputs, selects, textareas | `8px` |
| Cards | `12px` |
| Large containers, modals, drawers | `16px` |
| Bar chart value end | `4px` |

Never `4px` on a button. Buttons are always pills.

### Spacing — 4px grid

Allowed: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80, 96. Never 5, 6, 7, 10, 14, 15, 18, 22.

### Shadows

```css
--shadow-xs: 0px 1px 2px rgba(16, 24, 40, 0.05);
--shadow-sm: 0px 1px 3px rgba(16, 24, 40, 0.10), 0px 1px 2px rgba(16, 24, 40, 0.06);
--shadow-md: 0px 4px 8px rgba(16, 24, 40, 0.08), 0px 2px 4px rgba(16, 24, 40, 0.04);
--shadow-lg: 0px 12px 16px rgba(16, 24, 40, 0.08), 0px 4px 6px rgba(16, 24, 40, 0.03);
```

Cards use `--shadow-xs`, dropdowns `--shadow-sm`, modals and drawers `--shadow-md`, floating panels `--shadow-lg`. Chart marks get no shadow.

### Focus rings

```css
--focus-ring-default:     0px 0px 0px 4px rgba(23, 61, 130, 0.24);
--focus-ring-destructive: 0px 0px 0px 4px rgba(217, 45, 32, 0.24);
--focus-ring-ai:          0px 0px 0px 4px rgba(122, 90, 248, 0.24);
```

---

## 5. Component Quick Specs

**Buttons** — 32px tall (28px small), `px-16px py-8px`, pill radius, 14px medium.

| Variant | Fill | Text | Border |
|---|---|---|---|
| Primary | `#173D82` (hover `#122E64`, pressed `#0E2349`) | `#FFFFFF` | none |
| Secondary | `#FFFFFF` | `#173D82` | `1px #173D82` |
| Subtle | `#E6EBF4` (hover `#C6D3EC`) | `#173D82` | none |
| Ghost | transparent | `#101828` | none |
| Destructive | `#D92D20` | `#FFFFFF` | none |

**Inputs** — 32px tall, `8px` radius, `1px #98A2B3` border, `#101828` text, `#667085` placeholder. Hover border `#475467`, focus border `#173D82` + focus ring, error border `#D92D20`.

**Cards** — `#FFFFFF`, `1px #E4E7EC` border, `12px` radius, `16px` padding, `--shadow-xs`.

**Table** — header row `#E4E7EC` fill, 40px tall, bold 14px `#101828`. Body rows `#FFFFFF`, 48px tall, `1px #E4E7EC` bottom border, 14px `#101828`. Numeric columns right-aligned.

**Badges** — pill, `padding 2px 8px`, 12px semibold, `100`-stop fill with `800`-stop text.

**Banners** — `12px` radius, `12px` padding, 14px text.

| Type | Fill | Text |
|---|---|---|
| Error | `#FFE6E5` | `#871A12` |
| Warning | `#FEF0C7` | `#93370D` |
| Info | `#EFF6FF` | `#1E3A8A` |
| Success | `#DCFAE6` | `#067647` |

**KPI / stat tile** — label `caption-1` semibold `#475467`, value `display-3` bold `#101828`, delta 14px semibold in `#229E66` (up/favorable) or `#D92D20` (down/unfavorable). Sparkline in the tile uses `dataviz-1` `#14B8A6`.

---

## 6. Self-Check Before You Deliver

Run through this every time you output visual work:

1. Search your output for every hex value. Is each one present verbatim in this document? If not, replace it.
2. Are all chart series colors from the Section 1.1 list (or a single Section 1.6 theme), in order?
3. Did any gray, purple, yellow, cobalt, red, or green sneak into a categorical chart series?
4. Did you pass an explicit color array, or did the chart library apply its own defaults?
5. Is every font declaration DM Sans?
6. Are all buttons pills, all inputs `8px`, all cards `12px`?
7. Is every spacing value a multiple of 4?
8. Any gradients, drop shadows, transparency, or 3D on data marks? Remove them.
