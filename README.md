# Folio Design System

A design system built in HTML/CSS that acts as a source of truth for Claude to generate on-brand UI screens for the Cube platform.

---

## The Problem

Designers spend too much time recreating UI from scratch for ideation and early-stage concepts. There's no shared starting point that Claude can use to generate consistent, on-brand screens quickly.

---

## Why HTML/CSS (not Figma-first)?

- Claude reads and understands HTML/CSS natively — it uses tokens and components as context to generate new screens accurately
- HTML components are version-controllable, shareable via GitHub, and not credit-limited like Figma AI
- It creates a **generative middle layer** — Claude generates, Figma is where designers refine

---

## The Workflow

```
Folio tokens + components (HTML/CSS)
        ↓
Claude generates ideation screens
using role + brief + template + system context
        ↓
Figma MCP pushes screens to Figma canvas
        ↓
Designers adjust and refine in Figma
```

---

## Who It's For

| Designer | Role | Uses |
|----------|------|------|
| Product designers | Ideation, screen generation | Product token palette + templates |
| Marketing designer | Marketing assets | Marketing token palette |

---

## Folder Structure

Organized by *audience*, not by file type (reorganized 2026-09-11).

```
Folio-Design-System/
├── README.md                ← you are here
├── CLAUDE.md                ← Folio APP design system rules
│
├── tokens/                  ← shared foundations
│   ├── tokens.css              spacing, radius, shadows, focus rings, color aliases
│   ├── typography.css          type scale
│   └── cube-colors.md          full palette + Tailwind registration
├── components/              ← the app's React components (58, no prefix, PascalCase)
│
├── brand/                   ← MARKETING & BRAND  →  start at brand/BRAND.md
│   ├── BRAND.md                authoritative brand/marketing rules
│   ├── glass-ui-style.md       glass/isometric graphic recipe
│   ├── tokens/                 marketing-only primitives + semantic layer
│   ├── landing-page/           reference marketing site build
│   ├── graphics/               standalone marketing graphics
│   └── slides/                 company slide template
│
├── docs/                    ← rules & process  →  start at docs/README.md
│   ├── foundation/             applies to EVERY surface (brand facts, charts, personas)
│   ├── product/                Folio app specifics (patterns, add-on spec, board themes)
│   └── process/               how we work + why rules changed (playbook, decisions log)
│
├── templates/               ← two kinds  →  read templates/README.md first
│   ├── shell.html              app page shells
│   └── *-demo/ *-mock/         specimens that run UPLOADED (don't move these)
├── prototypes/              ← one-off component prototypes, local only
├── briefs/
│   └── _brief-template.md      copy this for each new feature brief
└── archive/                 ← superseded & legacy — never a source of current rules
```

**Which file governs?**

| Building… | Read |
|---|---|
| Product app UI | `CLAUDE.md` |
| Marketing site, brand graphics, slides | `brand/BRAND.md` |
| Anything — shared facts (type, icons, charts, radius, voice, palette) | `docs/foundation/BRAND-FOUNDATION.md` |

---

## How to Start

**1. Open the project in Claude Code**
```bash
cd ~/folio
claude
```

**2. Load project context**
```
Read CLAUDE.md, tokens.css, and the components folder before doing anything.
Confirm you have loaded the Folio design system context.
```

**3. Generate a screen**

See `PROMPTS.md` for the full prompt library. Every prompt follows the 4-layer context stack:

```
Role → Brief → Template → Tokens + Components
```

**4. Push to Figma**
```
Push [filename] to Figma canvas in the [file name] file.
```

**5. Adjust in Figma**

Swap components, refine layout, apply screen-specific decisions.

---

## Key Rules (from CLAUDE.md)

1. Always show state
2. Always show actor
3. Always offer exit
4. Never auto-act

---

## Documentation Guide

| File | When to update |
|------|---------------|
| `RESEARCH.md` | New tool decisions, open questions answered |
| `LEARNING.md` | Claude produced unexpected output, new pattern observed |
| `PROMPTS.md` | Prompt tested 3+ times and consistently works |
| `PATTERNS.md` | Pattern observed 3+ times across different screens |

---

## Status

| Area | Status |
|------|--------|
| Tokens | ✅ Complete — adjust marked values against Figma |
| Components | 🔨 In progress |
| Templates | 🔨 In progress |
| Figma MCP push | 🔬 Testing |
| GitHub | ⏳ When workflow is proven |


---

*Started: May 2026*
*Designer: Nan Osborne*
