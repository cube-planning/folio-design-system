# Cube Color Palette

> Complete color token reference for the Cube Design System.
> Use these tokens in Tailwind as `bg-cube-{ramp}-{stop}`, `text-cube-{ramp}-{stop}`, `border-cube-{ramp}-{stop}`.

---

## Color Rule

| Stop range | Usage |
|---|---|
| `500` | Base hue — brand anchor, illustrations, decorative elements |
| `600` | Interactive UI — buttons, links, active states; minimum for AA with white text |
| `700–800` | Text & icons — colored headings, labels, icons on light backgrounds |
| `50–200` | Surfaces & backgrounds — tinted chips, badge fills, banner backgrounds |
| `50` | Chip & page backgrounds — lightest tint for subtle surface differentiation |

---

## Primary Colors

### Base

```css
--cube-white: #FFFFFF;
--cube-black: #000000;
```

### Cobalt `· Core Brand`

Primary brand color. Drives buttons, key CTAs, and brand expression.
Use `600` for primary buttons, `700–800` for text and icons, `50–200` for tinted surfaces and selected states.

```css
--cube-cobalt-25:  #F5F7FA;
--cube-cobalt-50:  #E6EBF4;
--cube-cobalt-100: #C6D3EC;
--cube-cobalt-200: #8EA8E1;
--cube-cobalt-300: #4B7CD8;
--cube-cobalt-400: #2357B8;
--cube-cobalt-500: #173D82;
--cube-cobalt-600: #122E64;
--cube-cobalt-700: #0E2349;
--cube-cobalt-800: #0B1932;
--cube-cobalt-900: #081121;
```

### Blue

Secondary interactive and informational UI — links, chips, badges, and indicators.
Distinct from Cobalt to preserve action hierarchy.
Use `500–600` for links, `700–800` for text and icons, `50–200` for badge and chip backgrounds.

```css
--cube-blue-25:  #F7FBFF;
--cube-blue-50:  #EFF6FF;
--cube-blue-100: #DBEAFE;
--cube-blue-200: #9DC4F8;
--cube-blue-300: #7EADFF;
--cube-blue-400: #4E80EE;
--cube-blue-500: #2667D8;
--cube-blue-600: #0C55C0;
--cube-blue-700: #263FA9;
--cube-blue-800: #163D83;
--cube-blue-900: #1A2551;
```

---

## System Colors

### Green – Success

Communicates positive actions, confirmations, and successful outcomes.
Use `600–700` for success text and icons, `50–200` for success banner backgrounds.

```css
--cube-green-50:  #ECFDF3;
--cube-green-100: #DCFAE6;
--cube-green-200: #ABEFC6;
--cube-green-300: #75E0A7;
--cube-green-400: #70CF98;
--cube-green-500: #229E66;
--cube-green-600: #079455;
--cube-green-700: #067647;
--cube-green-800: #085D3A;
--cube-green-900: #08492E;
```

### Gray

Structural foundation of the UI — text hierarchy, borders, dividers, and neutral surfaces.
Use `900–700` for primary and secondary text, `400–600` for borders and icons, `50–200` for backgrounds and table surfaces.

```css
--cube-gray-25:  #FEFEFF;
--cube-gray-50:  #FCFCFD;
--cube-gray-100: #F8FAFC;
--cube-gray-200: #F2F5F9;
--cube-gray-300: #E3E8EF;
--cube-gray-400: #CDD5E0;
--cube-gray-500: #97A3B6;
--cube-gray-600: #677489;
--cube-gray-700: #4A5567;
--cube-gray-800: #353F4F;
--cube-gray-900: #222B3A;
```

### Red – Error

Communicates errors and destructive actions — removing a user, deleting data.
Use `600–700` for error text and icons, `50–100` for error banner backgrounds.
Avoid decorative use to preserve semantic weight.

```css
--cube-red-50:  #FEF3F2;
--cube-red-100: #FFE6E5;
--cube-red-200: #FECDCA;
--cube-red-300: #E88179;
--cube-red-400: #E1574D;
--cube-red-500: #D92D20;
--cube-red-600: #B42318;
--cube-red-700: #912018;
--cube-red-800: #871A12;
--cube-red-900: #6E150E;
```

### Purple – AI

Reserved for AI-related UI — Cube AI Analyst features and interactions.
Use `500–600` for AI component accents, `100–200` for AI surface tints.

```css
--cube-purple-50:  #F4F3FF;
--cube-purple-100: #EBE9FE;
--cube-purple-200: #DBD0FE;
--cube-purple-300: #BDB4FE;
--cube-purple-400: #9B8AFB;
--cube-purple-500: #7A5AF8;
--cube-purple-600: #6938EF;
--cube-purple-700: #5925DC;
--cube-purple-800: #4A1FB8;
--cube-purple-900: #3E1C96;
```

### Yellow – Warning

Communicates cautionary and non-fatal states — commonly used in confirmation dialogs.
Use `700–800` for warning text and icons, `50–100` for warning banner backgrounds.

```css
--cube-yellow-50:  #FFFAEB;
--cube-yellow-100: #FEF0C7;
--cube-yellow-200: #FECF89;
--cube-yellow-300: #FEC84B;
--cube-yellow-400: #FDB022;
--cube-yellow-500: #F79009;
--cube-yellow-600: #DC6803;
--cube-yellow-700: #B54708;
--cube-yellow-800: #93370D;
--cube-yellow-900: #7A2E0E;
```

### Gradient – AI & UI Refresh

Used for AI surfaces and UI Refresh contexts only. Not part of the standard semantic ramp system.

```css
--cube-gradient-ai:   linear-gradient(135deg, #7A5AF8 10%, #9B8AFB 50%, #6938EF 100%);
--cube-gradient-blue: linear-gradient(135deg, #2667D8 10%, #5024A7 50%, #4163B8 100%);
```

---

## Accent Colors

These colors support data visualization and accent UI elements.
Used across chart series, tags, and category indicators.

Each ramp follows the same contrast convention: `500` is the base hue, `600+` supports white text at AA,
and `700–800` is suitable for colored text on light backgrounds. Use `50–200` for background tints paired with `700–800` text.

### Teal
Interchangeable with the default success color.

```css
--cube-teal-50:  #F0FDFA;
--cube-teal-100: #CCFBF1;
--cube-teal-200: #99F6E4;
--cube-teal-300: #5EEAD4;
--cube-teal-400: #2DD4BF;
--cube-teal-500: #14B8A6;
--cube-teal-600: #0D9488;
--cube-teal-700: #0F766E;
--cube-teal-800: #115E59;
--cube-teal-900: #134E4A;
```

### Cyan
Interchangeable with the default brand color.

```css
--cube-cyan-50:  #ECFEFF;
--cube-cyan-100: #CFFAFE;
--cube-cyan-200: #A5F3FC;
--cube-cyan-300: #67E8F9;
--cube-cyan-400: #22D3EE;
--cube-cyan-500: #06B6D4;
--cube-cyan-600: #0891B2;
--cube-cyan-700: #0E7490;
--cube-cyan-800: #155E75;
--cube-cyan-900: #164E63;
```

### Emerald
Interchangeable with the default success color.

```css
--cube-emerald-50:  #ECFDF5;
--cube-emerald-100: #D1FAE5;
--cube-emerald-200: #A7F3D0;
--cube-emerald-300: #6EE7B7;
--cube-emerald-400: #34D399;
--cube-emerald-500: #10B981;
--cube-emerald-600: #059669;
--cube-emerald-700: #047857;
--cube-emerald-800: #065F46;
--cube-emerald-900: #064E3B;
```

### Indigo
Interchangeable with the default brand color.

```css
--cube-indigo-50:  #EEF2FF;
--cube-indigo-100: #E0E7FF;
--cube-indigo-200: #C7D2FE;
--cube-indigo-300: #A5B4FC;
--cube-indigo-400: #818CF8;
--cube-indigo-500: #6366F1;
--cube-indigo-600: #4F46E5;
--cube-indigo-700: #4338CA;
--cube-indigo-800: #3730A3;
--cube-indigo-900: #312E81;
```

### Fuchsia
Interchangeable with the default brand color.

```css
--cube-fuchsia-50:  #FDF4FF;
--cube-fuchsia-100: #FAE8FF;
--cube-fuchsia-200: #F5D0FE;
--cube-fuchsia-300: #F0ABFC;
--cube-fuchsia-400: #E879F9;
--cube-fuchsia-500: #D946EF;
--cube-fuchsia-600: #C026D3;
--cube-fuchsia-700: #A21CAF;
--cube-fuchsia-800: #86198F;
--cube-fuchsia-900: #701A75;
```

### Orange
Interchangeable with the default warning color.

```css
--cube-orange-50:  #FFF7ED;
--cube-orange-100: #FFEDD5;
--cube-orange-200: #FED7AA;
--cube-orange-300: #FDBA74;
--cube-orange-400: #FB923C;
--cube-orange-500: #F97316;
--cube-orange-600: #EA580C;
--cube-orange-700: #C2410C;
--cube-orange-800: #9A3412;
--cube-orange-900: #7C2D12;
```

---

## Avatar Color Pool

Predefined set for user avatars. Assigned deterministically via `hash(userId) % 6`.
All use the `500` stop with white initials for AA contrast compliance.

| Index | Ramp | 500 value |
|---|---|---|
| 0 | Teal | `#14B8A6` |
| 1 | Cyan | `#06B6D4` |
| 2 | Indigo | `#6366F1` |
| 3 | Fuchsia | `#D946EF` |
| 4 | Orange | `#F97316` |
| 5 | Cobalt | `#173D82` |

---

## Tailwind Registration

Add to `globals.css` inside `@theme inline`:

```css
@theme inline {
  /* Cobalt */
  --color-cube-cobalt-25:  var(--cube-cobalt-25);
  --color-cube-cobalt-50:  var(--cube-cobalt-50);
  --color-cube-cobalt-100: var(--cube-cobalt-100);
  --color-cube-cobalt-200: var(--cube-cobalt-200);
  --color-cube-cobalt-300: var(--cube-cobalt-300);
  --color-cube-cobalt-400: var(--cube-cobalt-400);
  --color-cube-cobalt-500: var(--cube-cobalt-500);
  --color-cube-cobalt-600: var(--cube-cobalt-600);
  --color-cube-cobalt-700: var(--cube-cobalt-700);
  --color-cube-cobalt-800: var(--cube-cobalt-800);
  --color-cube-cobalt-900: var(--cube-cobalt-900);

  /* Blue */
  --color-cube-blue-25:  var(--cube-blue-25);
  --color-cube-blue-50:  var(--cube-blue-50);
  --color-cube-blue-100: var(--cube-blue-100);
  --color-cube-blue-200: var(--cube-blue-200);
  --color-cube-blue-300: var(--cube-blue-300);
  --color-cube-blue-400: var(--cube-blue-400);
  --color-cube-blue-500: var(--cube-blue-500);
  --color-cube-blue-600: var(--cube-blue-600);
  --color-cube-blue-700: var(--cube-blue-700);
  --color-cube-blue-800: var(--cube-blue-800);
  --color-cube-blue-900: var(--cube-blue-900);

  /* Green */
  --color-cube-green-50:  var(--cube-green-50);
  --color-cube-green-100: var(--cube-green-100);
  --color-cube-green-200: var(--cube-green-200);
  --color-cube-green-300: var(--cube-green-300);
  --color-cube-green-400: var(--cube-green-400);
  --color-cube-green-500: var(--cube-green-500);
  --color-cube-green-600: var(--cube-green-600);
  --color-cube-green-700: var(--cube-green-700);
  --color-cube-green-800: var(--cube-green-800);
  --color-cube-green-900: var(--cube-green-900);

  /* Gray */
  --color-cube-gray-25:  var(--cube-gray-25);
  --color-cube-gray-50:  var(--cube-gray-50);
  --color-cube-gray-100: var(--cube-gray-100);
  --color-cube-gray-200: var(--cube-gray-200);
  --color-cube-gray-300: var(--cube-gray-300);
  --color-cube-gray-400: var(--cube-gray-400);
  --color-cube-gray-500: var(--cube-gray-500);
  --color-cube-gray-600: var(--cube-gray-600);
  --color-cube-gray-700: var(--cube-gray-700);
  --color-cube-gray-800: var(--cube-gray-800);
  --color-cube-gray-900: var(--cube-gray-900);

  /* Red */
  --color-cube-red-50:  var(--cube-red-50);
  --color-cube-red-100: var(--cube-red-100);
  --color-cube-red-200: var(--cube-red-200);
  --color-cube-red-300: var(--cube-red-300);
  --color-cube-red-400: var(--cube-red-400);
  --color-cube-red-500: var(--cube-red-500);
  --color-cube-red-600: var(--cube-red-600);
  --color-cube-red-700: var(--cube-red-700);
  --color-cube-red-800: var(--cube-red-800);
  --color-cube-red-900: var(--cube-red-900);

  /* Purple */
  --color-cube-purple-50:  var(--cube-purple-50);
  --color-cube-purple-100: var(--cube-purple-100);
  --color-cube-purple-200: var(--cube-purple-200);
  --color-cube-purple-300: var(--cube-purple-300);
  --color-cube-purple-400: var(--cube-purple-400);
  --color-cube-purple-500: var(--cube-purple-500);
  --color-cube-purple-600: var(--cube-purple-600);
  --color-cube-purple-700: var(--cube-purple-700);
  --color-cube-purple-800: var(--cube-purple-800);
  --color-cube-purple-900: var(--cube-purple-900);

  /* Yellow */
  --color-cube-yellow-50:  var(--cube-yellow-50);
  --color-cube-yellow-100: var(--cube-yellow-100);
  --color-cube-yellow-200: var(--cube-yellow-200);
  --color-cube-yellow-300: var(--cube-yellow-300);
  --color-cube-yellow-400: var(--cube-yellow-400);
  --color-cube-yellow-500: var(--cube-yellow-500);
  --color-cube-yellow-600: var(--cube-yellow-600);
  --color-cube-yellow-700: var(--cube-yellow-700);
  --color-cube-yellow-800: var(--cube-yellow-800);
  --color-cube-yellow-900: var(--cube-yellow-900);

  /* Teal */
  --color-cube-teal-50:  var(--cube-teal-50);
  --color-cube-teal-100: var(--cube-teal-100);
  --color-cube-teal-200: var(--cube-teal-200);
  --color-cube-teal-300: var(--cube-teal-300);
  --color-cube-teal-400: var(--cube-teal-400);
  --color-cube-teal-500: var(--cube-teal-500);
  --color-cube-teal-600: var(--cube-teal-600);
  --color-cube-teal-700: var(--cube-teal-700);
  --color-cube-teal-800: var(--cube-teal-800);
  --color-cube-teal-900: var(--cube-teal-900);

  /* Cyan */
  --color-cube-cyan-50:  var(--cube-cyan-50);
  --color-cube-cyan-100: var(--cube-cyan-100);
  --color-cube-cyan-200: var(--cube-cyan-200);
  --color-cube-cyan-300: var(--cube-cyan-300);
  --color-cube-cyan-400: var(--cube-cyan-400);
  --color-cube-cyan-500: var(--cube-cyan-500);
  --color-cube-cyan-600: var(--cube-cyan-600);
  --color-cube-cyan-700: var(--cube-cyan-700);
  --color-cube-cyan-800: var(--cube-cyan-800);
  --color-cube-cyan-900: var(--cube-cyan-900);

  /* Emerald */
  --color-cube-emerald-50:  var(--cube-emerald-50);
  --color-cube-emerald-100: var(--cube-emerald-100);
  --color-cube-emerald-200: var(--cube-emerald-200);
  --color-cube-emerald-300: var(--cube-emerald-300);
  --color-cube-emerald-400: var(--cube-emerald-400);
  --color-cube-emerald-500: var(--cube-emerald-500);
  --color-cube-emerald-600: var(--cube-emerald-600);
  --color-cube-emerald-700: var(--cube-emerald-700);
  --color-cube-emerald-800: var(--cube-emerald-800);
  --color-cube-emerald-900: var(--cube-emerald-900);

  /* Indigo */
  --color-cube-indigo-50:  var(--cube-indigo-50);
  --color-cube-indigo-100: var(--cube-indigo-100);
  --color-cube-indigo-200: var(--cube-indigo-200);
  --color-cube-indigo-300: var(--cube-indigo-300);
  --color-cube-indigo-400: var(--cube-indigo-400);
  --color-cube-indigo-500: var(--cube-indigo-500);
  --color-cube-indigo-600: var(--cube-indigo-600);
  --color-cube-indigo-700: var(--cube-indigo-700);
  --color-cube-indigo-800: var(--cube-indigo-800);
  --color-cube-indigo-900: var(--cube-indigo-900);

  /* Fuchsia */
  --color-cube-fuchsia-50:  var(--cube-fuchsia-50);
  --color-cube-fuchsia-100: var(--cube-fuchsia-100);
  --color-cube-fuchsia-200: var(--cube-fuchsia-200);
  --color-cube-fuchsia-300: var(--cube-fuchsia-300);
  --color-cube-fuchsia-400: var(--cube-fuchsia-400);
  --color-cube-fuchsia-500: var(--cube-fuchsia-500);
  --color-cube-fuchsia-600: var(--cube-fuchsia-600);
  --color-cube-fuchsia-700: var(--cube-fuchsia-700);
  --color-cube-fuchsia-800: var(--cube-fuchsia-800);
  --color-cube-fuchsia-900: var(--cube-fuchsia-900);

  /* Orange */
  --color-cube-orange-50:  var(--cube-orange-50);
  --color-cube-orange-100: var(--cube-orange-100);
  --color-cube-orange-200: var(--cube-orange-200);
  --color-cube-orange-300: var(--cube-orange-300);
  --color-cube-orange-400: var(--cube-orange-400);
  --color-cube-orange-500: var(--cube-orange-500);
  --color-cube-orange-600: var(--cube-orange-600);
  --color-cube-orange-700: var(--cube-orange-700);
  --color-cube-orange-800: var(--cube-orange-800);
  --color-cube-orange-900: var(--cube-orange-900);
}
```
