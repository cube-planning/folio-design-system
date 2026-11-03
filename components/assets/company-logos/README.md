# company-logos

High-fidelity logos for third-party companies shown in Folio (data sources, destinations,
connection pickers). Pulled by `components/companyLogos.js`.

## Two sets
- **`avatar/`** — 40px circular avatars exported from Figma. The logo, circle mask and
  gray-300 ring are baked into the file, so components show them as is (no extra ring or
  padding). Used by `FlowCard`: `icon={{ company: "sage" }}`. Registry: `COMPANY_AVATARS`.
- **root** — a logo mark on its own, for tiles that supply their own shape (`AppIcon`).
  Registry: `COMPANY_LOGOS`.

## Rules
- **Real artwork only.** Export from Figma or the vendor's brand kit. Never redraw, trace,
  recolor or approximate a logo, and don't use a Font Awesome glyph once the real logo exists.
- **SVG.** Vector is preferred. A Figma export that wraps a high-res embedded image is
  accepted for avatars when the image is at least 5x the 40px display size (200px or more);
  below that, ask for a bigger export.
- **One file per company**, lowercase kebab-case (`sage.svg`, `xero.svg`). The file name is
  the registry key.
- Square, `viewBox="0 0 40 40"` for avatars, no `<script>`, no external `href`.
- Keep the vendor's own colors. Do not edit them to Folio tokens.

## Add a logo
1. Drop `<company>.svg` in `avatar/` (or the root for a bare mark).
2. In `components/companyLogos.js`, add the import and one entry.
3. Use it: `<FlowCard icon={{ company: "<company>" }} iconShape="circle" />`.

## Have
Avatars: quickbooks, sage, xero, salesforce, netsuite, paylocity.

## Still needed (previews exist, no files yet)
adp, bamboohr, gusto, workday, ukg, and the maroon "RRR" logo (company not named).
