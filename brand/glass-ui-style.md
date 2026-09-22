# Glass UI Style

Visual recipe for glassmorphism dashboard and product-marketing graphics — hero
product mocks, "dashboard as marketing asset" screenshots, floating-panel
composites.

**Scope:** Cube Software (marketing/graphic-design) persona only. **Not for
in-product UI chrome** — Folio product surfaces keep flat white/tinted cards per
`components/Card.md`. The only in-product `backdrop-filter` use is the existing
scrim pairing (`--color-overlay-blur` + `--blur-*`), which is a different job.

Read `docs/foundation/BRAND-FOUNDATION.md` first — this file inherits its rulings on the AI
accent, gradient direction, radius scale, and typography, and does not restate
them.

**Related:**

- `docs/foundation/CHART-RULES.md` — all chart rules, including § "Glass-surface charts"
  (series color slots, mark specs, data-point labelling for a chart inside a
  glass composition). Not restated here.
- `docs/foundation/BRAND-FOUNDATION.md` — the AI accent (gradient, glow, retired hexes),
  gradient direction, radius scale, typography, icons.

Working example: [`brand/graphics/glass-dashboard-mock/`](graphics/glass-dashboard-mock/) —
copy the folder and edit the `.dc.html`.

---

## 0. Two composition modes — pick one before anything else

Every glass graphic is one of two things, and the choice governs the panel
variant, the background band, and whether real product UI appears at all.

| | **Abstract** | **Framed product mock** |
|---|---|---|
| Shows | Suggested structure — planes, trends, a callout. No real screen | An actual product screen |
| Panel content | Sits *on* the glass fill | Sits on an **opaque white surface**, wrapped in a glass frame |
| Variants used | Frosted / clear mirror / cobalt-tinted (§1) | Glass frame + white product surface (§1, "Framed product mock") |
| Reads as | "We do finance analytics" | "Here is the product" |
| Use for | Hero images, section illustrations, deck covers | Feature launches, product tours, anything where the UI *is* the message |

**Do not mix them.** A composition that puts real UI directly on a translucent
fill gets the worst of both: the product looks unfinished because the
background bleeds through its chrome, and the glass stops reading as glass
because a dense screen leaves nothing to transmit. If you're showing the
product, frame it.

The two modes share the background treatment (§4) and the isometric layout
(§2) unchanged.

**Worked examples — copy the folder and edit the `.dc.html`:**

| Template | Mode |
|---|---|
| [`graphics/cube-abstract-graphic/`](graphics/cube-abstract-graphic/) | Abstract — four planes, a decorative trend, one AI moment, over a loud background |
| [`graphics/cube-product-frame/`](graphics/cube-product-frame/) | Framed product mock — a real screen on opaque white inside a glass frame |
| [`graphics/glass-dashboard-mock/`](graphics/glass-dashboard-mock/) | Abstract over a *calm* background — the case where copy may sit directly on a mirror fill |

All three live in `brand/graphics/`, not `templates/`: glass graphics are
brand-only and are never uploaded to the Folio design project.

---

## 1. Panel variants

The first three sit on the same structure: a `--radius-2xl` (16px) container, a
translucent gradient fill, a `backdrop-filter`, a bright hairline border, a deep
ambient shadow, and an inset top highlight. Only the fill opacity, blur radius,
and border brightness change between them.

Radius is 16px on every glass panel regardless of size — it's a "large
container" in the radius scale (`docs/foundation/BRAND-FOUNDATION.md`), never
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
— `brand/graphics/glass-dashboard-mock/` is the worked example of that case.

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

### Matted / framed product mock — a mirror frame around a dense surface

The variant for **text over a loud background**. Two layers: the outer panel is
an ordinary clear mirror and does the transmitting; an inner near-opaque
surface holds the copy. The transparency reads at the frame, where there is
nothing to make legible, and the words sit on something solid.

Outer frame is the clear-mirror recipe verbatim, with padding so the frame is
visible as a mat — `16–24px`, never less than 16px or it reads as a thick
border rather than a layer:

```css
/* Inner surface — sits inside the mirror panel */
background: rgba(255,255,255,0.92);       /* see the fill table below */
backdrop-filter: blur(12px) saturate(150%);
border: 1px solid rgba(255,255,255,0.7);
border-radius: var(--radius-xl);          /* 12px — a nested tile, not a card */
```

**The inner fill depends on which mode (§0) you're in:**

| Mode | Inner surface | Why |
|---|---|---|
| **Abstract** — marketing copy over a loud background | `rgba(255,255,255,0.88–0.95)` | Still glass. Below `0.88` the background comes through the copy again, which is the problem this solves; at `1.0` it reads as a white box dropped on the composition |
| **Framed product mock** — a real screen | **`#FFFFFF`, fully opaque** | Product UI has its own surface colour, borders and elevation, all designed against white. Any transparency here makes finished UI look unresolved — the chrome picks up whatever is behind it. The product does not become glass; the *frame* is the glass |

Both use the same structure; only the fill and the padding change.

**Frame padding.** `16–24px` for a matted copy panel. For a framed product mock
go to the top of that range or past it — `24–32px`. The frame has to read as a
distinct layer around the screenshot, and a product surface is visually heavier
than a paragraph, so a thin frame collapses into looking like a border on the
screenshot itself.

Radius steps **down** inside the panel — 16px outer, 12px inner — per the
radius scale (`docs/foundation/BRAND-FOUNDATION.md`): 12px is the nested-tile
stop and is never correct for the container itself. A framed product mock may
step 24px outer → 16px inner instead, since the product surface *is* a card in
its own right; keep the outer larger than the inner either way.

No drop shadow on the inner surface. Only the outer panel casts one, same rule
as nested cards below.

**When the abstract mode needs a mat.** Any panel carrying a sentence or more
**over a 50–70% background**. Two cases don't: a panel with nothing but a short
label (an eyebrow, a badge), where there's too little text for the background
to interfere with; and any panel over a calm 15–30% background, where the
contrast behind the glass is too low to fight the copy.

**A framed product mock always needs one** — that framing *is* the mode. It
doesn't depend on the background band.

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
radial or reversed (`docs/foundation/BRAND-FOUNDATION.md`).

---

## 4. Color

### Dataviz, marks, and data point labels

See `docs/foundation/CHART-RULES.md` § "Glass-surface charts" — series color slots
(1 / 4 / 6), line weight, area fills, marker diameter/border/density, and the
decorative-vs-real-figure labelling rule including the over-glass label
constraints.

### AI accents

See `docs/foundation/BRAND-FOUNDATION.md` §§ "AI accent color" / "AI gradient" / "AI glow"
— the gradient, the `#7A5AF8` glow hex and its literal `box-shadow` fallback,
the retired hexes, and the `IconBadge` exception all live there.

The only glass-specific part: purple is reserved for AI-related moments and is
never decorative, so in a glass composition the AI insight panel is the *only*
purple in the frame. Use the real `<Badge color="ai" type="solid">` for the
pill (§ 5).

### Background

Soft multi-color blurred blobs behind the panels — never a hard-edged gradient,
and never a flat color (glass with nothing behind it isn't glass).

#### The base is transparent — the blobs are not

Two different layers, and only one of them belongs to the graphic:

| Layer | Ships with the graphic? |
|---|---|
| **Base fill** | **No.** `background: transparent`. A glass graphic is placed — a site section, a slide, a deck background — and the host surface is the base. Baking in a flat fill (`#F5F7FA` and the like) means the graphic carries a pale rectangle onto every surface it lands on |
| **Blobs** | **Yes.** They are what the glass transmits. Strip them and the panels have nothing to read through, which is the milky-glass failure all over again |

So a glass graphic has no background of its own and still satisfies "glass with
nothing behind it isn't glass" — the blobs are the something.

**The consequence is real: the graphic looks different depending on where you
put it.** Panel fills are white at low alpha, so a dark host darkens them.
Tested 2026-09-11 on warm (`#FDF6EC`), light and dark (`#0E1420`) hosts:

| Element | Survives a dark host? |
|---|---|
| Matted surfaces (`0.88–0.95` white) | ✅ Near-opaque, so the copy on them is unaffected |
| White text on a cobalt-tinted panel | ✅ Reverses correctly |
| Data marks (dataviz `500` stops) | ✅ Saturated enough to hold |
| **Gray label directly on a frosted or mirror fill** | ❌ **Fails.** `gray-700` `#4A5567` on a frosted panel over `#0E1420` loses almost all contrast — the panel darkens, the text doesn't |

So the matted variant is also what makes a graphic host-agnostic. A label sitting
directly on a glass fill inherits the host's luminance and only works on a light
one. Check the graphic on its actual destination surface, not the preview's own
canvas; on a dark host, move loose labels onto a mat or reverse them to white.

**Blob intensity is set by what sits in front of it**:

| Panel in front | Blobs | Blur | Why |
|---|---|---|---|
| Clear mirror, or matted | **50–70%** | `60–80px` | A mirror panel transmits whatever is behind it. At 15–30% there is nothing to transmit and the glass reads milky rather than transparent |
| Frosted matte carrying dense content — chart marks, table rows, body copy | **15–30%** | `60–120px` | Frosted is the content-dense variant; loud colour behind data marks fights the marks. Calm is correct here |

The 50–70% band was added 2026-09-11 — the whole background used to be capped
at 15–30%, which is why clear-mirror panels never looked transparent. The fill
values were never the problem. See `docs/process/DESIGN-DECISIONS.md`.

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
are Font Awesome, `fa-solid` by default — see `docs/foundation/BRAND-FOUNDATION.md`
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
- [ ] Base is `transparent` — no flat fill baked in; verified on the destination surface, not just the preview canvas
- [ ] Mode picked deliberately (§0) — abstract, or framed product mock; not a mix
- [ ] If it's a product mock: the screen sits on opaque `#FFFFFF` inside the glass frame, never directly on a translucent fill
- [ ] Small/simple panels have an internal diagonal skew cue
- [ ] Nested cards use the lighter fill and cast no drop shadow
- [ ] Exactly one drop shadow per panel, from the panel itself
- [ ] Series, marks and data-point labels follow `docs/foundation/CHART-RULES.md` § "Glass-surface charts"
- [ ] Purple appears only on the AI element; no purple background blob
- [ ] No retired AI-purple hex — see `docs/foundation/BRAND-FOUNDATION.md` § "AI accent color"
- [ ] No `#335CFF` (not in the cobalt ramp)
- [ ] Background is blurred blobs, not a hard gradient
- [ ] Panel contents are real components, not hand-rolled markup
- [ ] DM Sans only; Font Awesome only, `fa-solid` unless it's a documented exception
