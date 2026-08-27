# Folio Design System — Conventions for Claude Design

## No provider needed

Components require no wrapper context. Mount directly:

```jsx
const { Button } = window.FolioDS;
ReactDOM.createRoot(root).render(<Button variant="primary">Save</Button>);
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
| Typography | `--font-base` (DM Sans). There is no `--font-mono` token — get JetBrains Mono via `<Text mono>`, which hardcodes `'JetBrains Mono', monospace` itself. |

## Fonts

DM Sans is shipped with this project (provisioned by the design-system's self-check into `fonts/`). Designs built with this DS will render DM Sans without any additional setup. JetBrains Mono is used only for `Text mono={true}` and `Input`/`Textarea` char-count; it falls back to a system monospace if not available.

## Icon-only buttons

`Button` icon-only usage goes through a dedicated `icon` prop, not `children`, `leadingIcon`, or `trailingIcon` — those leave the button unconstrained-width instead of the fixed 32×32 (28×28 at `size="small"`) square. `aria-label` is required and `Button` throws without it:

```jsx
<Button icon={<i className="fa-regular fa-bell" />} aria-label="Notifications" />
```

## Font Awesome icons

Font Awesome is self-hosted with this project (`fontawesome/css/all.min.css` + `fontawesome/webfonts/`) and loads automatically via `styles.css` — no extra script tag needed. Several components render `fa-*` icon classes directly (`Select` chevron, `Banner` alert icon, `Drawer` close, `Table` sort, `SourceCard` chevron, `Input` error icon, `Checkbox`/`Radio` glyphs); they render correctly out of the box as long as `styles.css` is linked.

## Where to look

- Per-component API and usage: `components/general/<Name>/<Name>.prompt.md`
- Token definitions: `styles.css` + `_ds_bundle.css`
- Button `variant` prop values: `"primary" | "secondary" | "destructive" | "destructive-secondary" | "destructive-subtle" | "subtle-blue" | "subtle-purple" | "ai" | "ghost-blue" | "ghost-gray" | "ghost-destructive" | "plain-blue" | "plain-gray" | "plain-destructive"`
- Text variant names: `"display-1" | "display-2" | "display-3" | "display-4" | "title-1" | "title-2" | "title-3" | "body" | "caption-1" | "caption-2"`

## Cancel button variant rule

A `Cancel` (or any dismiss/back-out) button's `variant` depends on whether its container already has a header `×` close control:

- **Container has a header `×`** (most modals) → `variant="ghost-gray"`. The `×` already owns dismissal; `Cancel` is a low-emphasis echo and shouldn't compete visually.
- **Container has no header `×`** (e.g. an inline edit-mode bar/panel) → `variant="secondary"`. `Cancel` is the only way to back out, so it needs enough visual weight to read as a real action.

Check for the header `×` and apply this automatically — don't default to one variant for every `Cancel`.

## Idiomatic build example

```jsx
const { Button, Input, Banner, Badge } = window.FolioDS;

function ScenarioForm() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400, padding: 24 }}>
      <Banner variant="info">Fill in the details below to create a new forecast scenario.</Banner>
      <Input label="Scenario name" placeholder="e.g. Q3 Upside" state="default" />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-base)", fontSize: 14, color: "#101828" }}>Status</span>
        <Badge variant="lifecycle">Draft</Badge>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Create Scenario</Button>
      </div>
    </div>
  );
}
```
