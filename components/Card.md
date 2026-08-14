# Card

Generic surface for grouping related content — metrics, status, media, or a call to action — inside a bordered or shadowed container. Cards are a shell pattern, not a single component: pick the variant that matches the content, then compose it from existing Folio primitives (`Badge`, `Button`, `Avatar`, `Stepper`, `Toggle`) rather than reinventing spacing per instance.

## When to use

- Grouping a self-contained unit of content (a task, a metric, an insight, a source connection) that needs its own boundary on a page or in a grid
- Surfacing status alongside content (progress, completion, error)
- A clickable entry point into more detail (promo card, board thumbnail)

Don't use a card when content is already inside a drawer, modal, or table row — those have their own container conventions. Don't nest a card inside a card.

## Variants

| Variant | Used for | Example |
|---|---|---|
| **Task / Progress card** | A running or completed process with a title, optional stepper, and footer (avatar + timestamp + action or status) | EMEA Entity sync, APAC NetSuite import |
| **Stat card** | A single metric: label, large number, trend delta | Ending ARR, 12 Mo Revenue |
| **Metric + ring card** | A metric paired with a circular progress/usage indicator | Credit Pool, Usage by Tier |
| **Insight card** | An icon header band over a colored tint, plus a title and body copy | Risk / Opportunity / Gap |
| **Connector card** | Source/destination integration with logo, title, action icons, and a pill sub-link | Source, Step, Destination cards |
| **Promo / CTA card** | Colored header band, body copy, and a button | "AI-Powered Collaboration" fireside chat |
| **Onboarding tile** | Icon illustration on a tinted top half, title + description below, radio affordance | "Add your company logo", "Create a board" |
| **Chart card** | Title + legend above a full chart | 2025 Budget v Actuals |
| **Log / timeline card** | Vertical list of timestamped entries connected by a rail | Action Log |
| **Prompt card** | Icon + title + description, used as a suggestion chip | Variance Insights |
| **Board thumbnail card** | Layout preview (mini chart/text blocks) + label, used for template pickers | 2026 Strategic Plan Scenarios |

All variants share the same container rules below — they differ in header, media, and footer composition.

## Anatomy

- **Container** — `rounded-2xl` (16px), `border border-cube-gray-300`, `bg-white`, `p-4` (Credit Pool–style cards with more breathing room use `px-6 py-4`). Chart cards are the one exception: `border-cube-gray-100` + `shadow-sm` (drop shadow) instead of a gray-300 border — verified against Figma, don't "fix" this to match the rest.
- **Header band** (optional) — full-bleed colored or tinted region at the top of the card (Insight icon band, Promo dark-cobalt band, Onboarding illustration tile); sits flush against the container edges, content below keeps the standard `p-4`
- **Title** — `title-3` Medium (16px, weight 500, `gray-900`) — one token, used consistently across every standalone card variant (Task card, Chart card, Credit Pool card label). Don't substitute Bold or SemiBold here.
- **Trailing header element** (optional) — `Badge`, icon button, or timestamp, right-aligned against the title
- **Media/visual slot** (optional) — chart, ring, or icon graphic; sits between header and body
- **Body** — description text (`body`, `gray-700`) or metric value in `display-2` Bold 36px (primary number, e.g. Credit Pool's "55,000") or `display-4` SemiBold 24px (secondary/ring metric, e.g. "58%"), both `gray-900`, with a trend delta in `caption-1` (green-700/red-700 + arrow icon)
- **Footer** (optional) — `pt-4`, `flex items-center justify-between`; left side is `Avatar` + name + timestamp (or an "Automated" dark badge), right side is a `Button` (action) or `Badge` (status) — never both on the same side
- **Gap** — `gap-4` (16px) between header/media/body/footer sections; don't compress a bordered card's internal sections to `gap-2`, that's for the header's own inline row (e.g. label + status pill)

## Typography

Verified from Figma — one title token for every standalone card, not a per-variant choice:

| Element | Token | Used by |
|---|---|---|
| Card title | `title-3` Medium — 16px, weight 500, `gray-900` (or `gray-600` when the title reads as a label, e.g. "CREDIT POOL") | Every standalone card: Task/Progress, Chart, Credit Pool, Insight, Promo |
| Nested sub-tile label | `caption-1` Regular — 12px, `gray-700` | Small stat tiles grouped inside a card row (e.g. "Total Workflows") — these are sub-components, not standalone cards, so they drop out of the title tier entirely |
| Primary metric value | `display-2` Bold — 36px, weight 700, `-1% letter-spacing`, `gray-900` | The large number in a Credit Pool–style card (e.g. "55,000") |
| Secondary/ring metric value | `display-4` SemiBold — 24px, weight 600, `gray-900` | Ring-chart percentage, nested sub-tile value (e.g. "58%", "5" workflows) |
| Body/description copy | `body` — 14px Regular, `gray-700` | Card body text |
| Metadata / footer text | `caption-1` — 12px Regular, `gray-600`/`gray-700` | Avatar name, timestamp, "50,000 base credits" |
| Micro label | `caption-2` — 10px Regular, `gray-600` | "across all statuses", axis labels |

Numeric values inside charts and data-dense areas use JetBrains Mono per the type system; titles, labels, and body copy stay DM Sans.

## States

- Default
- Hover — only for clickable cards (promo, board thumbnail, onboarding tile): `shadow-sm` → `shadow-md`, no border color change
- Loading — skeleton blocks in place of title/body/media at the same proportions, `bg-cube-gray-100`
- Empty — for cards backed by data (chart, log) that show a centered `caption-1 text-cube-gray-500` message instead of the media slot when there's nothing to show
- Error — connector cards only: swap the timestamp for red `caption-1` text (e.g. "Last Import Failed"), no red border on the container itself (matches the system-wide rule of soft-fill over red borders)

## Content guidelines

- Titles are sentence case, one line, truncate with ellipsis rather than wrap
- Trend deltas always pair a direction arrow icon with the percentage — never color alone
- Numeric values (metric card numbers, percentages, timestamps) use JetBrains Mono per the type system; labels and titles stay in DM Sans
- Footer status is either a `Badge` or an action `Button`, never plain text — keeps status scannable across a list of cards

## Do / Don't

- Do use `rounded-2xl` (16px) for all card containers — never `rounded-full`, `rounded-[4px]`, or `rounded-xl`
- Do use `Badge` for status, not custom colored text
- Don't put more than one primary action (`Button`) in a card footer — secondary actions become icon buttons in the header instead
- Don't invent a new border/shadow combo per card — reuse `border-cube-gray-300` for standard cards or `border-cube-gray-100` + `shadow-sm` for chart cards; there are only two container treatments in the system

## Example

```jsx
const { Badge, Button, Avatar, Stepper } = window.FolioDS;

// Task/Progress card — title-3 Medium (16px/500)
<TaskCard
  title="EMEA Entity – Intacct Sync Dimensions"
  steps={[
    { label: "Authenticating..", state: "active" },
    { label: "Sync", state: "pending" },
    { label: "Validate", state: "pending" },
    { label: "Save to Cube", state: "pending" },
  ]}
  user={{ name: "Jessica Smith" }}
  startedAt="Started 4:23 pm"
  action={{ label: "Stop", onClick: handleStop }}
/>

// Stat card — title-3 Medium label + display-2 Bold metric value
<div className="rounded-2xl border border-cube-gray-300 p-4 flex flex-col gap-2">
  <span className="title-3 font-medium text-cube-gray-600">Ending ARR</span>
  <div className="flex items-center gap-2">
    <span className="display-2 font-bold text-cube-gray-900">$17.5M</span>
    <span className="caption-1 text-cube-success-700">
      <i className="fa-solid fa-arrow-trend-up" /> 16.9%
    </span>
  </div>
  <span className="caption-2 text-cube-gray-500">vs Last Year from $12.1M</span>
</div>

// Metric + ring card — primary value + secondary value inside a ring
<div className="rounded-2xl border border-cube-gray-300 px-6 py-4 flex flex-col gap-2">
  <span className="title-3 font-medium text-cube-gray-600">CREDIT POOL</span>
  <div className="flex items-center justify-between">
    <div className="flex flex-col gap-1">
      <span className="display-2 font-bold text-cube-gray-900">55,000</span>
      <span className="caption-1 text-cube-gray-600">50,000 base credits</span>
      <span className="title-1 font-semibold text-cube-success-600">+ 5,000 purchased</span>
    </div>
    {/* Ring built from an SVG/conic-gradient in the actual component — see prototypes/card-3-prototype.html */}
    <div className="relative w-24 h-24 rounded-full" style={{ background: "conic-gradient(var(--cube-blue-600) 0% 58%, var(--cube-gray-200) 58% 100%)" }}>
      <div className="absolute inset-[8px] rounded-full bg-white flex items-center justify-center display-4 font-semibold text-cube-gray-900">
        58%
      </div>
    </div>
  </div>
</div>

// Insight card — colored icon band + title + body
<div className="rounded-2xl border border-cube-gray-300 overflow-hidden flex flex-col">
  <div className="bg-cube-warn-bg p-5 flex justify-end">
    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
      <i className="fa-solid fa-triangle-exclamation text-cube-warn-text text-sm" />
    </span>
  </div>
  <div className="p-4 flex flex-col gap-2">
    <span className="title-3 font-medium text-cube-gray-900">Risk</span>
    <p className="body text-cube-gray-700">
      Churn assumption of $150K/mo is 17% below your trailing 6-month average of $180K — consider stress-testing at actuals.
    </p>
  </div>
</div>

// Connector card — logo + linked title + action icons + pill sub-link
<div className="rounded-2xl border border-cube-gray-300 p-4 flex flex-col gap-8">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <img src={sageLogo} alt="" className="w-6 h-6 rounded-full" />
      <a href="#" className="title-3 font-medium text-cube-blue-600">Teal Plantations</a>
    </div>
    <div className="flex items-center gap-2">
      <i className="fa-solid fa-arrows-rotate text-cube-blue-600 text-sm" />
      <i className="fa-solid fa-pen text-cube-blue-600 text-sm" />
    </div>
  </div>
  <Button type="ghost-full-width" size="small">Source Dimensions</Button>
</div>

// Promo/CTA card — dark header band + eyebrow + title + body + button
<div className="rounded-2xl border border-cube-gray-300 overflow-hidden flex flex-col">
  <div className="bg-cube-cobalt-600 p-5 flex flex-col gap-3">
    <Badge type="dark" color="lime" size="sm">Fireside Chat</Badge>
    <span className="title-2 font-bold text-white leading-snug">
      AI-Powered Collaboration: How Finance Plays a Key Role in Driving Growth
    </span>
  </div>
  <div className="p-4 flex flex-col gap-3">
    <p className="body text-cube-gray-700">
      Finance plays a key role — not just in operations, but in driving growth.
    </p>
    <Button type="primary" size="small">Learn More</Button>
  </div>
</div>

// Chart card — gray-100 border + shadow-sm exception, no gray-300 border
<div className="rounded-2xl border border-cube-gray-100 shadow-sm p-5 flex flex-col gap-4">
  <span className="title-3 font-medium text-cube-gray-900">2025 Budget v Actuals</span>
  <div className="flex gap-4">
    <span className="caption-1 text-cube-gray-600 flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-cube-blue-200" /> Budget
    </span>
    <span className="caption-1 text-cube-gray-600 flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-cube-blue-600" /> Actuals
    </span>
  </div>
  {/* Chart component renders here */}
  <BarChart data={budgetVsActuals} />
</div>

// Log/Timeline card — vertical rail of timestamped entries
<div className="rounded-2xl border border-cube-gray-300 p-4 flex flex-col gap-3">
  <span className="title-3 font-medium text-cube-gray-900">Action Log</span>
  <ol className="flex flex-col gap-3 border-l border-cube-gray-200 pl-3">
    {logEntries.map((entry) => (
      <li key={entry.id} className="flex flex-col gap-0.5">
        <span className="body text-cube-gray-900">{entry.text}</span>
        <span className="caption-2 text-cube-gray-500 font-mono">{entry.timestamp}</span>
      </li>
    ))}
  </ol>
</div>

// Board thumbnail card — layout preview + label, used in template pickers
<button className="rounded-2xl border border-cube-gray-300 p-3 flex flex-col gap-3 text-left hover:shadow-md transition-shadow">
  <div className="rounded-lg bg-cube-cobalt-25 h-24 flex items-center justify-center">
    <i className="fa-solid fa-chart-line text-cube-cobalt-600 text-xl" />
  </div>
  <span className="caption-1 text-cube-gray-700">2026 Strategic Plan Scenarios</span>
</button>
```
