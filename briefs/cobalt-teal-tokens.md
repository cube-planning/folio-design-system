# Cobalt → Cobalt Teal — CSS to copy in

Reference: [Folio Color Palette (Figma)](https://www.figma.com/design/i3ssqW43ac6LB0Tl5fZ8Yb/2026-UI-Refresh-Folio-Design-System?node-id=6-13206). Value swap only — token names stay the same, only hex values change.

⚠️ `cobalt-25` has no direct Teal equivalent (Teal ramp starts at 50). Placeholder value marked below — confirm with design before shipping.

---

## 1. `tokens.css`

Replace the existing Cobalt block:

```css
/* BEFORE */
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

```css
/* AFTER */
--color-cobalt-25:  #F0FDFA; /* ⚠️ TBD — reused Teal-50, confirm with design */
--color-cobalt-50:  #F0FDFA;
--color-cobalt-100: #CCFBF1;
--color-cobalt-200: #99F6E4;
--color-cobalt-300: #5EEAD4;
--color-cobalt-400: #2DD4BF;
--color-cobalt-500: #14B8A6;
--color-cobalt-600: #0D9488;
--color-cobalt-700: #0F766E;
--color-cobalt-800: #115E59;
--color-cobalt-900: #134E4A;
```

Also update the focus ring (currently pointing at the *old* cobalt-500 — was already fixed once this session, needs a second pass for the rebrand):

```css
/* BEFORE */
--focus-ring-default:        0px 0px 0px 4px rgba(23, 61, 130, 0.24);
--focus-ring-default-sm:     0px 0px 0px 2px rgba(23, 61, 130, 0.24);
```

```css
/* AFTER */
--focus-ring-default:        0px 0px 0px 4px rgba(20, 184, 166, 0.24);
--focus-ring-default-sm:     0px 0px 0px 2px rgba(20, 184, 166, 0.24);
```

---

## 2. `cube-colors.md`

Replace the existing Cobalt ramp:

```css
/* BEFORE */
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

```css
/* AFTER */
--cube-cobalt-25:  #F0FDFA; /* ⚠️ TBD — reused Teal-50, confirm with design */
--cube-cobalt-50:  #F0FDFA;
--cube-cobalt-100: #CCFBF1;
--cube-cobalt-200: #99F6E4;
--cube-cobalt-300: #5EEAD4;
--cube-cobalt-400: #2DD4BF;
--cube-cobalt-500: #14B8A6;
--cube-cobalt-600: #0D9488;
--cube-cobalt-700: #0F766E;
--cube-cobalt-800: #115E59;
--cube-cobalt-900: #134E4A;
```

Also fix the Avatar Color Pool table entry, which currently contradicts the ramp above:

```md
<!-- BEFORE -->
| 5 | Cobalt | `#4A73CD` |
```

```md
<!-- AFTER -->
| 5 | Cobalt | `#14B8A6` |
```

And resync these unrelated stale entries found during the audit (not part of the rebrand, but already known-wrong):

```css
/* Gray ramp — entirely different scale, replace all 11 stops with tokens.css's values */
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

/* Red — add missing 25 stop */
--cube-red-25:  #FEF7F6;

/* Yellow — fix 200 */
--cube-yellow-200: #FECF89;   /* was #FEDF89 */

/* Purple — fix 200 */
--cube-purple-200: #DBD0FE;   /* was #D9D6FE */
```

---

## 3. `CLAUDE.md`

```md
<!-- BEFORE (line 94) -->
**Cobalt 500** (`#4A73CD`) is the primary interactive color — replaces the old Blue 500. Use `cube-cobalt-*` for all primary actions, focus states, and active indicators. Use `cube-blue-*` for links and navigation only.
```

```md
<!-- AFTER -->
**Cobalt 500** (`#14B8A6`) is the primary interactive color. Use `cube-cobalt-*` for all primary actions, focus states, and active indicators. Use `cube-blue-*` for links and navigation only.
```

---

## 4. Hardcoded hex — find and replace

These bypass the token system entirely and won't update with the CSS variable changes above. Replace `#173D82` with `var(--color-cobalt-500)` (or `var(--cube-cobalt-500)` depending on which system the file uses):

- `templates/usage.html` (7 occurrences)
- `templates/library.html` (3 occurrences)
- `templates/shell.html:396`
- `components/_topnav.html:52`
- `templates/homepage.html` (2 occurrences)
- `.design-sync/previews/Drawer.tsx:37`

```bash
grep -rn "#173D82" templates/ components/ .design-sync/
```
