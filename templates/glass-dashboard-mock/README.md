# Glass Dashboard Mock

Marketing hero graphic — three isometric glass panels built from real Folio
components. Implements the recipe in [`glass-ui-style.md`](../../glass-ui-style.md).

```
GlassDashboardMock.dc.html   the template — this is the file you edit
ds-base.js                   DS loader (copied from templates/audit-trail-demo)
support.js                   dc-runtime (generated; do not edit)
preview-local.sh             regenerates the local-only preview copy
```

## Layers

| Panel | Variant | `translateZ` | Contents |
|---|---|---|---|
| Back | Frosted matte | `0` | `PageHeader`, `Badge`, three nested-glass stat tiles (`Text` + `IconBadge`), `Table` + `StatusDot` + `Cell.Link` |
| Middle | Clear mirror + streak | `70px` | Chart card — `Text` title, legend, 3-series inline SVG (slots 1/4/6, 2px strokes, forecast dashed, no value labels) |
| Front | Clear mirror + streak + AI glow | `160px` | AI insight callout — AI-gradient icon, `Badge color="ai"`, gradient-clipped `Text`, internal skew lines |

Every panel shares one `rotateX(8deg) rotateY(-14deg) rotateZ(1.5deg)`. If you
add a fourth panel, reuse that triple verbatim and give it a new `--depth` —
varying the rotation per panel is what breaks the shared-plane illusion.

## Copying this

Change content, not chrome. The `.glass-*`, `.streak`, `.skew-lines`,
`.glow-ai`, and `.panel` rules are the documented recipe — edit `STATS`,
`SERIES`, `ROWS`, and the panel copy instead. If you need a new panel variant,
add it to `glass-ui-style.md` first.

## Previewing locally

The `.dc.html` templates expect the host to have put React on the page before
`_ds_bundle.js` runs — that's how the synced design project loads them, and why
neither this template nor `templates/audit-trail-demo/` includes a React script
tag. Serving the repo directly (`npx serve .`) has no React, so the bundle
throws `Cannot set properties of undefined (setting 'jsx')` and the panels
render empty.

Run `./preview-local.sh` to write a throwaway copy with the vendored React
inserted ahead of `support.js`, then serve the repo root and open
`/templates/glass-dashboard-mock/_verify.local.html`. Don't add the React
script tag to the committed template — the host page would end up with two
React copies and hooks would break. `_verify.local.html` is gitignored here.

```bash
./preview-local.sh && npx serve -l 3458 ../..
```

The `ds-base.js` 404s in the console are expected and not worth fixing. Its
`base = '../..'` is authored for the *deployed* layout, where the bundle sits
at the design project's root; locally that resolves to the repo root, where it
doesn't. `.design-sync/NOTES.md` records this explicitly — repointing `base`
at `ds-bundle` would fix a local preview and break every template in the
project, and here it would also make the bundle execute twice, since this
template's `<helmet>` already loads it directly. `templates/audit-trail-demo/`
behaves identically.
