# Glass UI Style

Visual recipe for glassmorphism dashboard and product-marketing graphics — hero
product mocks, "dashboard as marketing asset" screenshots, floating-panel
composites.

**Scope:** Cube Software (marketing/graphic-design) persona only. **Not for
in-product UI chrome** — Folio product surfaces keep flat white/tinted cards per
`components/Card.md`. The only in-product `backdrop-filter` use is the existing
scrim pairing (`--color-overlay-blur` + `--blur-*`), which is a different job.

Read `docs/BRAND-FOUNDATION.md` first — this file inherits its rulings on the AI
accent, gradient direction, radius scale, and typography, and does not restate
them.

Working example: [`templates/glass-dashboard-mock/`](templates/glass-dashboard-mock/) —
copy the folder and edit the `.dc.html`.

---

## 1. Panel variants

All three sit on the same structure: a `--radius-2xl` (16px) container, a
translucent gradient fill, a `backdrop-filter`, a bright hairline border, a deep
ambient shadow, and an inset top highlight. Only the fill opacity, blur radius,
and border brightness change between them.

Radius is 16px on every glass panel regardless of size — it's a "large
container" in the radius scale (`docs/BRAND-FOUNDATION.md`), never
`--radius-full` and never the legacy 4px.

### Frosted matte — default, softest

```css
background: linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.28));
backdrop-filter: blur(22px) saturate(170%);        /* ≈ --blur-xl (24px) */
border: 1px solid rgba(255,255,255,0.65);
border-radius: var(--radius-2xl);
box-shadow: 0 40px 80px -20px rgba(40,50,90,0.28),
            inset 0 1px 0 rgba(255,255,255,0.8);
```

Acceptable ranges: blur `20–22px`, saturate `160–180%`, border alpha
`0.6–0.7`.

Use for the panel carrying the most content. It's the only variant where dense
text and table rows stay legible over a busy background.

### Clear mirror — crisper, more see-through

```css
background: linear-gradient(135deg, rgba(255,255,255,0.20), rgba(255,255,255,0.08));
backdrop-filter: blur(4px) saturate(210%) contrast(105%);   /* ≈ --blur-sm (4px) */
border: 1px solid rgba(255,255,255,0.88);
border-radius: var(--radius-2xl);
box-shadow: 0 40px 80px -20px rgba(40,50,90,0.30),
            inset 0 2px 0 rgba(255,255,255,0.92);
```

Acceptable ranges: fill `0.16–0.24` → `0.04–0.12`, blur `3–5px`, saturate
`200–220%`, border alpha `0.8–0.92`.

The low blur means whatever sits behind the panel reads through it, so keep the
background behind a mirror panel calm and keep the panel's own text short. Pair
it with a specular streak (§3) — without one it reads as a plain low-opacity
rectangle rather than glass.

### Cobalt-tinted

Frosted matte, with the white fill swapped for the brand primary:

```css
background: linear-gradient(135deg, rgba(23,61,130,0.32), rgba(23,61,130,0.14));
```

`rgba(23,61,130,…)` is `--color-cobalt-500` (`#173D82`). Do not substitute a
brighter blue — a saturated `#335CFF`-style blue is not in Folio's cobalt ramp.

Everything else (blur, border, shadows) is unchanged from frosted. Text on a
cobalt-tinted panel goes white/`--color-cobalt-50`, not `gray-900`.

### Nested cards inside a panel

Stat tiles, chart cards, and insight cards *inside* a glass panel use a lighter
version of the same recipe — roughly half the fill opacity and half the blur —
so they read as a layer within the glass rather than a second, separate surface:

```css
background: linear-gradient(135deg, rgba(255,255,255,0.34), rgba(255,255,255,0.16));
backdrop-filter: blur(10px) saturate(150%);
border: 1px solid rgba(255,255,255,0.55);
border-radius: var(--radius-2xl);
box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
```

No outer drop shadow on nested cards — only the outer panel casts one, or the
composition stops reading as a single sheet of glass.

Their *contents* still follow `components/Card.md` typography exactly: card
title `title-3` Medium, primary metric `display-2` Bold, secondary metric
`display-4` SemiBold, body `body` Regular, metadata `caption-1`. Glass changes
the container treatment, not the type hierarchy.

---

## 2. Isometric / 3D-angled layout

Wrap every panel in one shared perspective container so they sit on a single
tilted plane:

```css
.stage { perspective: 1800px; }   /* 1500–2200px */
```

Apply the **same** rotation to every panel — only `translateZ` differs:

```css
.panel { transform: rotateX(8deg) rotateY(-14deg) rotateZ(1.5deg) translateZ(var(--depth)); }
```

Ranges: `rotateX 6–10deg`, `rotateY -9 to -20deg`, `rotateZ 1–2deg`. Pick one
triple per composition and reuse it verbatim. Differing rotations between panels
breaks the shared-plane illusion immediately and is the most common way these
graphics go wrong.

Stagger depth back-to-front and offset position so panels visibly overlap — the
back panel sits top-left, each subsequent panel lower and further forward:

| Layer | `translateZ` | Position |
|---|---|---|
| Back (main dashboard) | `0` | top-left |
| Middle (chart) | `70px` | down and right of the back panel |
| Front (callout) | `160px` | lowest, overlapping the middle panel |

Because `translateZ` scales apparent size, a front panel at `160px` reads
noticeably larger than its CSS width — size it smaller than you think you need.

### Small panels need an internal skew cue

A small, simple panel (an AI insight callout that's just an icon, a title, and a
sentence) won't visibly read as tilted — there are no internal lines for the eye
to measure the skew against. Large panels get this for free from their own grid
and card borders. Add a faint diagonal highlight inside the small one:

```css
background: repeating-linear-gradient(115deg,
  transparent 0px, transparent 38px,
  rgba(255,255,255,0.35) 39px, transparent 40px);
opacity: 0.5;
```

Apply it as an absolutely-positioned overlay with `pointer-events: none`, under
the content.

### Optional float

Front-most panel only, and only where motion is appropriate (web hero, not a
static export):

```css
@keyframes glassFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-7px); }
}
```

Animate a **wrapper** element, not the panel itself — a `transform` on the panel
would overwrite its rotation. Respect `prefers-reduced-motion: reduce`.

---

## 3. Specular streak

The highlight that makes a panel read as glass rather than as a tinted
rectangle. Absolutely-positioned overlay, top-left, ~55% of panel width,
`pointer-events: none`:

```css
background: linear-gradient(115deg,
  rgba(255,255,255,0.55) 0%,
  rgba(255,255,255,0.05) 40%,
  transparent 60%);
```

Range: the leading stop is `0.5–0.6`. Required on clear-mirror panels, optional
on frosted (its higher fill opacity already carries the effect).

One direction per composition — `115deg`, matching the diagonal-highlight and
fill gradients above. Gradients run one consistent direction and are never
radial or reversed (`docs/BRAND-FOUNDATION.md`).

---

## 4. Color

### Dataviz series

Always **three distinct hues**, never monochrome shades of one color — a
monochrome ramp loses its series separation entirely once it's behind blur and
saturation shifts.

Use `--color-dataviz-*` from `tokens/tokens.css`:

| Token | Hex | Ramp |
|---|---|---|
| `--color-dataviz-1` | `#14B8A6` | Teal 500 |
| `--color-dataviz-2` | `#06B6D4` | Cyan 500 |
| `--color-dataviz-4` | `#6366F1` | Indigo 500 |

> **Unresolved conflict — read before shipping a chart.**
> `docs/BRAND-FOUNDATION.md` § "Chart series order" declares a *different*
> series sequence as FINAL and shared by both personas:
> `#12264D, #219E66, #173D82, #70CF98, #30886C, #97A3B6`. That sequence is
> mostly navy/cobalt plus greens, which is close to monochrome over glass and
> is what the teal/cyan/indigo choice above was made to avoid. Both cannot be
> true. Until it's resolved, glass marketing graphics use the
> `--color-dataviz-*` tokens above, and this file is the exception on record
> rather than a silent override — per that doc's own instruction, a persona
> rule contradicting it is a bug in one of the two, so one of them needs
> editing.

Line weight `2.5–3px` with `stroke-linecap: round`. No fills under the lines —
an area fill over a translucent panel muddies both.

Teal and cyan are adjacent on the wheel, and a glass panel's `saturate()`
pushes them closer still. Space the series **geometrically** as well as by hue —
at hero scale, two closely-tracking lines in adjacent hues read as one thick
line no matter what the legend says.

### AI accents

Purple is reserved for AI-related moments only, never decorative
(`docs/BRAND-FOUNDATION.md`). In a glass composition that means the AI insight
panel is the *only* purple in the frame.

- **Fills** (icon, headline, pill) — `--color-gradient-ai`:
  `linear-gradient(135deg, #7A5AF8 10%, #9B8AFB 50%, #5925DC 100%)`. For text,
  apply via `background-clip: text` + `color: transparent`.
- **Glow / box-shadow** — `#7A5AF8` (`--color-purple-500`), the only flat hex
  sanctioned for the AI accent, and only because `box-shadow` can't render a
  gradient. A soft diffuse glow is the marketing-persona way to signal AI
  without the gradient every time; the persona may use it liberally.
- **Pill / badge** — use the real component: `<Badge color="ai" type="solid">`.
  It already resolves to `#7A5AF8`.

Do **not** use:

- `#5547A5` ("Deep Purple") or `#6938EF` — both **retired** as the AI-purple
  reference. Old glass explorations that specify `#5547A5` with a `#8B7FD1`
  lighter tint predate that ruling; the gradient's own `#9B8AFB` mid-stop is
  the lighter tint now, and `#8B7FD1` has no token behind it.
- `IconBadge` for the AI icon — its `hue` axis has no purple by design
  ("never purple — purple is reserved for AI"). Render the AI icon as a plain
  `fa-regular` glyph over the AI gradient instead. `IconBadge` is still the
  right choice for non-AI decorative icons, in teal/cyan/emerald/indigo/
  fuchsia/orange.

There is no `--glow-ai` token yet — `docs/BRAND-FOUNDATION.md` calls for one and
notes neither `--focus-ring-ai` (hard 4px, focus only) nor Cube Software's
`--shadow-ring-ai` is diffuse enough. Until it lands, write the glow literally
and key it to `#7A5AF8`:

```css
box-shadow: 0 24px 64px -12px rgba(122,90,248,0.45),
            0 0 40px rgba(122,90,248,0.25);
```

### Background

Soft multi-color blurred blobs behind the panels — never a hard-edged gradient,
and never a flat color (glass with nothing behind it isn't glass).

- Blobs at 15–30% opacity, `filter: blur(60–120px)`, over a light base
  (`--color-cobalt-25` / `--color-gray-100`).
- Hues: cobalt, blue, teal, cyan. **No purple blob** — that would be
  decorative purple, which the AI accent rule forbids, and it would also
  compete with the one genuinely-AI element in the frame.

---

## 5. Component reuse

The glass panel is a custom marketing wrapper — `backdrop-filter` isn't a design
system component and shouldn't become one. Everything *inside* it is a real
component from `index.js`:

| Content | Use |
|---|---|
| Any text | `Text` (`variant` + `weight`) — never a raw styled `<span>` |
| Panel header | `PageHeader` (`icon` must be `fa-regular`) |
| Stat tile / chart card / insight card | Compose per `components/Card.md`, with the nested-glass container from §1 |
| Status pill | `Badge` (`color="ai"` for AI) |
| Row status | `StatusDot` |
| Tabular content | `Table` + `Cell` |
| Actions | `Button` (icon-only needs the `icon` prop and `aria-label`) |
| Decorative non-AI icon | `IconBadge` |

`DataCard`, `ChartCard`, and `TopNav` don't exist in this repo — earlier
explorations named them, but there is no such export. Their equivalents are
`Card.md`'s "Stat card" / "Chart card" variants, and `PageHeader` (in-product) or
`AddonTopNav` / `PortalSideBarNav` (their respective shells).

Font is DM Sans, everywhere, including numerics — Folio has one typeface. Icons
are Font Awesome `fa-regular` only.

---

## 6. Checklist

- [ ] Every panel shares one identical `rotateX/rotateY/rotateZ` triple
- [ ] Depth staggered via `translateZ` only, panels visibly overlap
- [ ] 16px radius on every panel
- [ ] Clear-mirror panels have a specular streak
- [ ] Small/simple panels have an internal diagonal skew cue
- [ ] Nested cards use the lighter fill and cast no drop shadow
- [ ] Exactly one drop shadow per panel, from the panel itself
- [ ] Three distinct dataviz hues, no area fills
- [ ] Purple appears only on the AI element; no purple background blob
- [ ] No `#5547A5`, `#6938EF`, `#8B7FD1`, or `#335CFF`
- [ ] Background is blurred blobs, not a hard gradient
- [ ] Panel contents are real components, not hand-rolled markup
- [ ] DM Sans only; `fa-regular` only
