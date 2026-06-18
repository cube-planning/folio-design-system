# Folio Design System — Research & Decision Log

> This document tracks the research, tool comparisons, and design decisions behind the Folio design system.
> Updated as we learn. Built by the design team.
> People are referenced by role: Lead Designer, Designer, Marketer, Product Manager.

---

## 1. Why We Built This

**Problem:**
The design team was spending too much time recreating UI from scratch for ideation and early-stage concepts. There was no shared starting point that Claude could use to generate consistent, on-brand screens. When team members (including non-designers like Product Managers) asked Claude directly to generate UI, they got generic results that didn't match the Cube brand — wasting time and credits.

**Goal:**
Build a design system that acts as a source of truth — so Claude can generate ideation screens using the exact brand tokens, components, and templates. The system should scale beyond designers to Product Managers and eventually the Marketer for brand-consistent content.

---

## 2. Tool Landscape

### Claude Code
- **Best for:** Generating UI from structured context, reading Figma, pushing to Figma canvas, maintaining the design system
- **How we use it:** Feed tokens + component templates → generate screens → push to Figma via MCP
- **Limitations:** Needs explicit context (tokens, rules) to stay on-brand. Figma push is structural — icons render as placeholders

### Figma + Figma MCP
- **Best for:** Designer polish and iteration after Claude generates the initial screen
- **Figma MCP write:** ✅ Confirmed working — pushes frames, text, colors, gradients to canvas
- **Figma MCP limitations:**
  - Cannot inject SVGs from `_sidebar-icons.js` (no JS runtime in Figma)
  - Cannot load local image files (`../assets/icons/`) — Figma can't read from disk
  - Icons push as placeholder rectangles — must be swapped manually for real Figma components
  - `appendChild` returns void — cannot chain `.x` on it
  - No `strokeDashes` on `COMPONENT_SET` nodes
- **MCP setup:** Must use personal Figma account, desktop app open, Claude plugin running in the file

### Cursor
- **Best for:** Nit-picky CSS/HTML edits — spacing, colors, sizing — with Live Server preview
- **How we use it:** Lead Designer edits in Cursor with Live Server, Claude Code pushes to Figma
- **Context:** `.cursorrules` file in project root gives Cursor full design system context automatically
- **Limitation:** Cannot push to Figma directly unless Figma MCP is also configured in Cursor

### Lovable / v0 / Figma AI
- **Problem:** All generate generic UI with no knowledge of the Cube design system
- **Tested:** Designer tried using Claude directly without Folio context → generic output, burned credits
- **Conclusion:** These tools require Folio context to produce on-brand output. Without `tokens.css` and `shell.html` as reference, results are random.

---

## 3. Confirmed Workflow

```
Figma (design source of truth for components)
        ↓
Lead Designer builds HTML to match exactly
(tokens.css + shell.html + components/)
        ↓
Claude reads HTML → generates new screens
        ↓
Test in browser via Live Server (Cursor)
        ↓
Push to Figma canvas (Claude Code + MCP)
        ↓
Designer polishes in Figma
        ↓
Sync decisions back to HTML if needed
```

**Source of truth by phase:**
| Phase | Source of truth |
|-------|----------------|
| Building components | Figma — measure exact values, match in HTML |
| Generating screens | HTML — Claude reads components and generates |
| Testing | Browser — HTML is the live preview |
| Designer iteration | Figma — polish on canvas |
| After polish | HTML — sync Figma decisions back to tokens/CSS |

---

## 4. Figma MCP Setup (Confirmed)

1. Open **Figma Desktop** (not browser)
2. Log in with **personal account** (not company account)
3. Open the target file
4. Run the **Claude plugin** inside the file: Plugins → Claude
5. Keep plugin panel open while pushing
6. Provide file URL to Claude Code — file key is extracted automatically

**File keys used:**
- `KVIJcGcdafDRxCZ7RGxKie` — Untitled (test file, confirmed working)
- `VkkdojgtsMFHkRuVwJXqGp` — Folio-New-Design-System (requires personal account login)

---

## 5. Component Architecture Decisions

### Reusable sources confirmed
- `components/_sidebar-icons.js` — SVG registry, auto-injects via `data-icon`. Copied from Cube prototype.
- `components/_topnav.html` — correct button SVGs, AI button with gradient border. Source of truth for top nav icons.

### File structure
```
folio/
├── tokens.css                    ← global design tokens
├── components/
│   ├── _sidebar-icons.js        ← SVG icon registry
│   └── _topnav.html             ← top nav reference
├── assets/
│   ├── icons/                   ← SVG icon files (AI Button.svg, background task.svg, help center.svg)
│   └── logos/                   ← integration logos
└── templates/
    ├── shell.html               ← base shell (sidebar + topnav)
    └── homepage.html            ← homepage screen
```

### Planned components (next)
- `components/button.css`
- `components/badge.css`
- `components/table.css`
- `components/card.css`

---

## 6. Open Questions — Answered

| Question | Answer |
|----------|--------|
| How reliable is Figma MCP for writing? | ✅ Reliable for structure/color/text. Icons are placeholders — swap manually. |
| Atomic vs page-level components? | Both — atomic CSS components + page-level HTML templates |
| Should tokens mirror Figma variables? | Long-term yes. Short-term: CSS variables are source of truth, Figma adjusts to match. |
| How does workflow differ for Marketer? | Same system, different token palette (`--color-marketing-*`) and templates (LinkedIn, banners) |

---

## 7. Open Questions — Still Exploring

- When is the right time to move from local files to GitHub for team access?
- How do Product Managers run the system without terminal knowledge?
- Should marketing templates live in a separate folder (`marketing/templates/`)?
- How do we version the design system as it evolves?

---

## 8. Decisions Made

| Date | Decision | Reason |
|------|----------|--------|
| 2026-05 | Start with tokens layer first | Everything else depends on tokens being stable |
| 2026-05 | Build locally before GitHub | Avoid version conflicts while system is still changing fast |
| 2026-05 | Claude Code over Cursor for Figma push | Figma MCP only configured in Claude Code |
| 2026-05 | Cursor for CSS editing + Live Server | Fastest feedback loop for spacing/styling tweaks |
| 2026-05 | Use personal Figma account for MCP | Company account blocked MCP plugin access |
| 2026-05 | Copy `_sidebar-icons.js` from Cube prototype | Icons already built and tested — no need to rebuild |
| 2026-05 | Reference roles not names in docs | Keeps docs role-neutral and team-scalable |
| 2026-05 | Folio as brand operating system | Scope expanded: product design → PMs → marketing |

---

*Last updated: May 2026*
