<!-- COPY — DO NOT EDIT HERE.
     Canonical source: repo-root glass-ui-style.md.
     This copy exists because the brand package uploads as a standalone
     skill and cannot read repo-root files. Re-sync with:
         npm run style-guide:sync      (copy root -> here)
         npm run style-guide:check     (fail if they differ)
-->

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

**Related:**

- `docs/CHART-RULES.md` — all chart rules, including § "Glass-surface charts"
  (series color slots, mark specs, data-point labelling for a chart inside a
  glass composition). Not restated here.
- `docs/BRAND-FOUNDATION.md` — the AI accent (gradient, glow, retired hexes),
  gradient direction, radius scale, typography, icons.

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

The low blur means whatever sits behind the panel reads through it. That is the
point — a mirror panel over a calm background has nothing to transmit and reads
as a milky rectangle. Put the saturated part of the background behind it. Pair
it with a specular streak (§3) — without one it reads as a plain low-opacity
rectangle rather than glass.

**Over a 50–70% background, body copy does not go directly on the mirror
fill** — at these fill values the background reads straight through the text.
Give the copy a matted surface (below): the mirror carries the transparency,
the mat carries the words. Over a calm 15–30% background there is not enough
contrast behind the panel to interfere, and copy directly on the fill is fine
— `templates/glass-dashboard-mock/` is the worked example of that case.

This is the trade the two background bands actually encode. A mirror panel
cannot both transmit a loud background *and* hold unaided body copy; pick
which job the panel is doing.

### Cobalt-tinted

Frosted matte, with the white fill swapped for the brand primary:

```css
background: linear-gradient(135deg, rgba(23,61,130,0.32), rgba(23,61,130,0.14));
```

`rgba(23,61,130,…)` is `--color-cobalt-500` (`#173D82`). Do not substitute a
brighter blue — a saturated `#335CFF`-style blue is not in Folio's cobalt ramp.

Everything else (blur, border, shadows) is unchanged from frosted. Text on a
cobalt-tinted panel goes white/`--color-cobalt-50`, not `gray-900`.

### Matted — a mirror frame around a dense content surface

The variant for **text over a loud background**. Two layers: the outer panel is
an ordinary clear mirror and does the transmitting; an inner near-opaque
surface holds the copy. The transparency reads at the frame, where there is
nothing to make legible, and the words sit on something solid.

Outer frame is the clear-mirror recipe verbatim, with padding so the frame is
visible as a mat — `16–24px`, never less than 16px or it reads as a thick
border rather than a layer:

```css
/* Inner surface — sits inside the mirror panel */
background: rgba(255,255,255,0.92);
backdrop-filter: blur(12px) saturate(150%);
border: 1px solid rgba(255,255,255,0.7);
border-radius: var(--radius-xl);          /* 12px — a nested tile, not a card */
```

Acceptable range on the fill: `0.88–0.95`. Below `0.88` the background starts
coming through the copy again, which is the problem this variant exists to
solve; at `1.0` it stops being glass and reads as a white box dropped on the
composition.

Radius steps **down** inside the panel — 16px outer, 12px inner — per the
radius scale (`docs/BRAND-FOUNDATION.md`): 12px is the nested-tile stop and is
never correct for the container itself.

No drop shadow on the inner surface. Only the outer panel casts one, same rule
as nested cards below.

Use it for any panel carrying a sentence or more **over a 50–70% background**.
Two cases don't need it: a panel with nothing but a short label (an eyebrow, a
badge), where there's too little text for the background to interfere with; and
any panel over a calm 15–30% background, where the contrast behind the glass is
too low to fight the copy.

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

### Dataviz, marks, and data point labels

See `docs/CHART-RULES.md` § "Glass-surface charts" — series color slots
(1 / 4 / 6), line weight, area fills, marker diameter/border/density, and the
decorative-vs-real-figure labelling rule including the over-glass label
constraints.

### AI accents

See `docs/BRAND-FOUNDATION.md` §§ "AI accent color" / "AI gradient" / "AI glow"
— the gradient, the `#7A5AF8` glow hex and its literal `box-shadow` fallback,
the retired hexes, and the `IconBadge` exception all live there.

The only glass-specific part: purple is reserved for AI-related moments and is
never decorative, so in a glass composition the AI insight panel is the *only*
purple in the frame. Use the real `<Badge color="ai" type="solid">` for the
pill (§ 5).

### Background

Soft multi-color blurred blobs behind the panels — never a hard-edged gradient,
and never a flat color (glass with nothing behind it isn't glass).

**Blob intensity is set by what sits in front of it**, over a light base
(`--color-cobalt-25` / `--color-gray-100`):

| Panel in front | Blobs | Blur | Why |
|---|---|---|---|
| Clear mirror, or matted | **50–70%** | `60–80px` | A mirror panel transmits whatever is behind it. At 15–30% there is nothing to transmit and the glass reads milky rather than transparent |
| Frosted matte carrying dense content — chart marks, table rows, body copy | **15–30%** | `60–120px` | Frosted is the content-dense variant; loud colour behind data marks fights the marks. Calm is correct here |

The 50–70% band was added 2026-09-11 — the whole background used to be capped
at 15–30%, which is why clear-mirror panels never looked transparent. The fill
values were never the problem. See `docs/DESIGN-DECISIONS.md`.

- A matted panel (§1) is what lets copy survive the louder band: the mirror
  frame transmits, the inner surface carries the words.
- Keep the busiest part of the background *behind* a panel, not bleeding past
  its edge into empty canvas — the contrast is what sells the glass, and it
  only does that where there's glass in front of it.
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
| Panel header | `PageHeader` — its icon-only `Button`s are the documented `fa-regular` exception (`CLAUDE.md` § 6) |
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
are Font Awesome, `fa-solid` by default — see `docs/BRAND-FOUNDATION.md`
§ Icons for the two weight exceptions (the AI sparkle stays solid; icon-only
`Button`s are regular).

---

## 6. Checklist

- [ ] Every panel shares one identical `rotateX/rotateY/rotateZ` triple
- [ ] Depth staggered via `translateZ` only, panels visibly overlap
- [ ] 16px radius on every panel
- [ ] Clear-mirror panels have a specular streak
- [ ] Over a 50–70% background, any panel carrying body copy uses the matted variant
- [ ] Blob intensity matches the panel in front — 50–70% behind mirror/matted, 15–30% behind a content-dense frosted panel
- [ ] Small/simple panels have an internal diagonal skew cue
- [ ] Nested cards use the lighter fill and cast no drop shadow
- [ ] Exactly one drop shadow per panel, from the panel itself
- [ ] Series, marks and data-point labels follow `docs/CHART-RULES.md` § "Glass-surface charts"
- [ ] Purple appears only on the AI element; no purple background blob
- [ ] No retired AI-purple hex — see `docs/BRAND-FOUNDATION.md` § "AI accent color"
- [ ] No `#335CFF` (not in the cobalt ramp)
- [ ] Background is blurred blobs, not a hard gradient
- [ ] Panel contents are real components, not hand-rolled markup
- [ ] DM Sans only; Font Awesome only, `fa-solid` unless it's a documented exception
