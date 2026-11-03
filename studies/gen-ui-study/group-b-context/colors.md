# Folio Color Palette

> Complete color reference for the Folio Design System. Variable names match `tokens.css`.

---

## Color Rule

| Stop range | Usage |
|---|---|
| `500` | Interactive UI resting state: primary button fill, active and selected borders, toggle "on" |
| `600` | Hover state for anything at `500` (not the resting color) |
| `700` | Pressed state for anything at `500` or `600`; also colored text and icons |
| `700-800` | Text and icons: colored headings, labels, icons on light backgrounds |
| `50-200` | Surfaces and backgrounds: badge fills, banner backgrounds, tinted chips |
| `25-50` | Chip and page backgrounds: lightest tints for subtle surface differentiation |

The page canvas is `cobalt-25` (`#F5F7FA`).

---

## Primary Colors

### Base

```css
--color-white: #FFFFFF;
--color-black: #000000;
```

### Cobalt (primary)

Primary color. Drives buttons, key calls to action, focus and selected states.
Use `500` for primary buttons (`600` hover, `700` pressed), `700-800` for text and icons, `50-200` for tinted surfaces and selected states.

```css
--color-cobalt-25:  #F5F7FA;
--color-cobalt-50:  #E6EBF4;
--color-cobalt-100: #C6D3EC;
--color-cobalt-200: #8EA8E1;
--color-cobalt-300: #4B7CD8;
--color-cobalt-400: #2357B8;
--color-cobalt-500: #173D82;
--color-cobalt-600: #122E64;
--color-cobalt-700: #0E2349;
--color-cobalt-800: #0B1932;
--color-cobalt-900: #081121;
```

### Blue

Links and navigation only. Distinct from Cobalt to preserve action hierarchy.
Use `500-600` for links, `700-800` for text and icons, `50-200` for badge backgrounds.

```css
--color-blue-25:  #F7FBFF;
--color-blue-50:  #EFF6FF;
--color-blue-100: #DBEAFE;
--color-blue-200: #9DC4F8;
--color-blue-300: #7EADFF;
--color-blue-400: #4E80EE;
--color-blue-500: #2667D8;
--color-blue-600: #0C55C0;
--color-blue-700: #263FA9;
--color-blue-800: #163D83;
--color-blue-900: #1A2551;
```

---

## System Colors

### Green - Success

Communicates positive actions, confirmations, and successful outcomes.
Use `600-700` for success text and icons, `50-200` for success banner backgrounds.

```css
--color-green-50:  #ECFDF3;
--color-green-100: #DCFAE6;
--color-green-200: #ABEFC6;
--color-green-300: #75E0A7;
--color-green-400: #70CF98;
--color-green-500: #229E66;
--color-green-600: #079455;
--color-green-700: #067647;
--color-green-800: #085D3A;
--color-green-900: #08492E;
```

### Gray

Structural foundation of the UI - text hierarchy, borders, dividers, and neutral surfaces.
Use `900-700` for primary and secondary text, `400-600` for borders and icons, `50-200` for backgrounds and table surfaces.

```css
--color-gray-25:  #FEFEFF;
--color-gray-50:  #FCFCFD;
--color-gray-100: #F8FAFC;
--color-gray-200: #F2F5F9;
--color-gray-300: #E3E8EF;
--color-gray-400: #CDD5E0;
--color-gray-500: #97A3B6;
--color-gray-600: #677489;
--color-gray-700: #4A5567;
--color-gray-800: #353F4F;
--color-gray-900: #222B3A;
```

### Red - Error

Communicates errors and destructive actions - removing a user, deleting data.
Use `600-700` for error text and icons, `50-100` for error banner backgrounds.
Avoid decorative use to preserve semantic weight.

```css
--color-red-50:  #FEF3F2;
--color-red-100: #FFE6E5;
--color-red-200: #FECDCA;
--color-red-300: #E88179;
--color-red-400: #E1574D;
--color-red-500: #D92D20;
--color-red-600: #B42318;
--color-red-700: #912018;
--color-red-800: #871A12;
--color-red-900: #6E150E;
```

### Purple - AI

Reserved for AI-related UI. Not used on the Workflows screens.
Use `500-600` for AI component accents, `100-200` for AI surface tints.

```css
--color-purple-50:  #F4F3FF;
--color-purple-100: #EBE9FE;
--color-purple-200: #DBD0FE;
--color-purple-300: #BDB4FE;
--color-purple-400: #9B8AFB;
--color-purple-500: #7A5AF8;
--color-purple-600: #6938EF;
--color-purple-700: #5925DC;
--color-purple-800: #4A1FB8;
--color-purple-900: #3E1C96;
```

### Yellow - Warning

Communicates cautionary and non-fatal states - commonly used in confirmation dialogs.
Use `700-800` for warning text and icons, `50-100` for warning banner backgrounds.

```css
--color-yellow-50:  #FFFAEB;
--color-yellow-100: #FEF0C7;
--color-yellow-200: #FECF89;
--color-yellow-300: #FEC84B;
--color-yellow-400: #FDB022;
--color-yellow-500: #F79009;
--color-yellow-600: #DC6803;
--color-yellow-700: #B54708;
--color-yellow-800: #93370D;
--color-yellow-900: #7A2E0E;
```

### Gradient - AI & UI Refresh

Used for AI surfaces and UI Refresh contexts only. Not part of the standard semantic ramp system.

```css
--color-gradient-ai:   linear-gradient(135deg, #7A5AF8 10%, #9B8AFB 50%, #6938EF 100%);
--color-gradient-blue: linear-gradient(135deg, #2667D8 10%, #5024A7 50%, #4163B8 100%);
```

---

## Accent Colors

These colors support data visualization and accent UI elements.
Used across chart series, tags, and category indicators.

Each ramp follows the same contrast convention: `500` is the base hue, `600+` supports white text at AA,
and `700-800` is suitable for colored text on light backgrounds. Use `50-200` for background tints paired with `700-800` text.

### Teal
Interchangeable with the default success color.

```css
--color-teal-50:  #F0FDFA;
--color-teal-100: #CCFBF1;
--color-teal-200: #99F6E4;
--color-teal-300: #5EEAD4;
--color-teal-400: #2DD4BF;
--color-teal-500: #14B8A6;
--color-teal-600: #0D9488;
--color-teal-700: #0F766E;
--color-teal-800: #115E59;
--color-teal-900: #134E4A;
```

### Cyan
Interchangeable with the default brand color.

```css
--color-cyan-50:  #ECFEFF;
--color-cyan-100: #CFFAFE;
--color-cyan-200: #A5F3FC;
--color-cyan-300: #67E8F9;
--color-cyan-400: #22D3EE;
--color-cyan-500: #06B6D4;
--color-cyan-600: #0891B2;
--color-cyan-700: #0E7490;
--color-cyan-800: #155E75;
--color-cyan-900: #164E63;
```

### Emerald
Interchangeable with the default success color.

```css
--color-emerald-50:  #ECFDF5;
--color-emerald-100: #D1FAE5;
--color-emerald-200: #A7F3D0;
--color-emerald-300: #6EE7B7;
--color-emerald-400: #34D399;
--color-emerald-500: #10B981;
--color-emerald-600: #059669;
--color-emerald-700: #047857;
--color-emerald-800: #065F46;
--color-emerald-900: #064E3B;
```

### Indigo
Interchangeable with the default brand color.

```css
--color-indigo-50:  #EEF2FF;
--color-indigo-100: #E0E7FF;
--color-indigo-200: #C7D2FE;
--color-indigo-300: #A5B4FC;
--color-indigo-400: #818CF8;
--color-indigo-500: #6366F1;
--color-indigo-600: #4F46E5;
--color-indigo-700: #4338CA;
--color-indigo-800: #3730A3;
--color-indigo-900: #312E81;
```

### Fuchsia
Interchangeable with the default brand color.

```css
--color-fuchsia-50:  #FDF4FF;
--color-fuchsia-100: #FAE8FF;
--color-fuchsia-200: #F5D0FE;
--color-fuchsia-300: #F0ABFC;
--color-fuchsia-400: #E879F9;
--color-fuchsia-500: #D946EF;
--color-fuchsia-600: #C026D3;
--color-fuchsia-700: #A21CAF;
--color-fuchsia-800: #86198F;
--color-fuchsia-900: #701A75;
```

### Orange
Interchangeable with the default warning color.

```css
--color-orange-50:  #FFF7ED;
--color-orange-100: #FFEDD5;
--color-orange-200: #FED7AA;
--color-orange-300: #FDBA74;
--color-orange-400: #FB923C;
--color-orange-500: #F97316;
--color-orange-600: #EA580C;
--color-orange-700: #C2410C;
--color-orange-800: #9A3412;
--color-orange-900: #7C2D12;
```

---
