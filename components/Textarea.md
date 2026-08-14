# Textarea

Multi-line text input for the Folio Design System. Use via `window.FolioDS.Textarea`.

## When to use

- Comment fields
- Modal contact / account manager fields
- Any free-text input longer than a single line

For single-line text, use `Input` instead.

## Props

- `size`: `"large"` (80px field, default) | `"small"` (60px field) — matches the Figma variant naming
- `label`, `placeholder`, `value`, `onChange` — same contract as `Input`
- `required` — appends a red asterisk after the label
- `autoResize` (default `true`) — grows with content up to `maxHeight`, then scrolls internally. Set `false` for a fixed-height field with a manual drag handle (bottom-right resize grip) instead — e.g. a form field inside a modal where the layout shouldn't shift as the user types.
- `rows` — overrides the size's default min-height (`rows * 20px + 16px`); leave unset to use `size`'s default (80px/60px)
- `maxHeight` (default `200`) — cap in px for `autoResize`; content beyond this scrolls instead of growing the field
- `charCount` + `maxChars` — shows a `n/max` counter in the header row, next to the label (or right-aligned alone if there's no label) — matches the Figma frame's placement, not bottom-right
- `state`: `"default" | "hover" | "focused" | "error" | "disabled"`
- `errorMessage` — shown below the field with a warning icon when `state="error"`
- `disabled`

## Anatomy

- Header row — label (`caption-1` medium, `gray-900`, with optional red asterisk) and char count (`caption-1` regular, `gray-600`), `justify-between` when both are present
- Field — 8px radius, `gray-400` border (default), `cobalt-500` border + `cobalt-200` ring on focus, `red-500` border on error, `shadow-sm` on all interactive states (omitted on disabled, to signal it's not interactive)
- Error message — below the field, red text with a warning icon, shown only when `state="error"`

## States

Default · Hover · Focused (cobalt ring) · Error (red border + message) · Disabled (gray-100 fill)

There's a green/success border variant in the Figma frame that isn't implemented here — it doesn't match how errors/success are handled elsewhere in the system (soft-fill, not colored borders), and isn't in active use in any Cube surface. Add it if a real use case comes up.

## Example

```jsx
const { Textarea } = window.FolioDS;

// Auto-growing comment field, caps at 200px then scrolls
<Textarea
  label="Comment"
  placeholder="Add a comment..."
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  charCount
  maxChars={280}
/>

// Fixed-height field for a modal (e.g. account manager notes)
<Textarea
  label="Notes"
  autoResize={false}
  rows={4}
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
/>
```
