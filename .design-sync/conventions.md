# Folio Design System — Conventions for Claude Design

## No provider needed

Components require no wrapper context. Mount directly:

```jsx
const { CubeButton } = window.FolioDS;
ReactDOM.createRoot(root).render(<CubeButton type="primary">Save</CubeButton>);
```

## Styling idiom: inline styles, no CSS classes

All DS components are self-styled via React inline styles. **Do not apply Tailwind classes or custom CSS to DS components.** For layout glue around components, use inline `style={{}}` on wrapper divs or the CSS custom properties from `styles.css`.

Token names (from `styles.css` / `_ds_bundle.css`):

| Category | Examples |
|---|---|
| Colors | `--color-cobalt-500`, `--color-cobalt-100`, `--color-gray-900`, `--color-red-500` |
| Spacing | `--spacing-1` (4px) through `--spacing-10` (40px) |
| Radius | `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (12px), `--radius-xl` (16px), `--radius-full` (9999px) |
| Shadows | `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| Typography | `--font-base` (DM Sans), `--font-mono` (JetBrains Mono) |

## Fonts

DM Sans is shipped with this project (provisioned by the design-system's self-check into `fonts/`). Designs built with this DS will render DM Sans without any additional setup. JetBrains Mono is used only for `CubeText mono={true}` and `CubeInput` char-count; it falls back to a system monospace if not available.

## Font Awesome icons

Several components render Font Awesome icons (`CubeSelect` chevron, `CubeBanner` alert icon, `CubeDrawer` close, `CubeTable` sort, `CubeSourceCard` chevron, `CubeInput` error icon). Without FA loaded, icons show as empty boxes — the component is still fully functional, but icon slots will be blank.

Load in `<head>` if icon rendering matters:
```html
<script src="https://kit.fontawesome.com/YOUR_KIT_CODE.js" crossorigin="anonymous"></script>
```

## Where to look

- Per-component API and usage: `components/general/<Name>/<Name>.prompt.md`
- Token definitions: `styles.css` + `_ds_bundle.css`
- CubeButton variant names: `"primary" | "secondary" | "destructive" | "destructive-secondary" | "destructive-subtle" | "subtle-blue" | "ghost-blue" | "ghost-gray" | "ghost-destructive"`
- CubeText variant names: `"display-1" | "display-2" | "display-3" | "display-4" | "title-1" | "title-2" | "title-3" | "body" | "caption-1" | "caption-2"`

## Idiomatic build example

```jsx
const { CubeButton, CubeInput, CubeBanner, CubeBadge } = window.FolioDS;

function ScenarioForm() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400, padding: 24 }}>
      <CubeBanner variant="info">Fill in the details below to create a new forecast scenario.</CubeBanner>
      <CubeInput label="Scenario name" placeholder="e.g. Q3 Upside" state="default" />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-base)", fontSize: 14, color: "#101828" }}>Status</span>
        <CubeBadge variant="lifecycle">Draft</CubeBadge>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <CubeButton type="secondary">Cancel</CubeButton>
        <CubeButton type="primary">Create Scenario</CubeButton>
      </div>
    </div>
  );
}
```
