# Folio Design System — Learning & Improvement Log

> This document serves two purposes:
> 1. Track unexpected Claude behavior and fixes
> 2. Collect pattern observations as we build prototypes
>
> Patterns that appear 3+ times across different screens graduate to PATTERNS.md

---

## How to Add an Entry

**For Claude issues:** Note what broke, how you fixed it, and if CLAUDE.md was updated.
**For pattern observations:** Note what pattern you used, on which screen, and why.

---

## Part 1 — Claude Behavior Log

### Entry Template — copy for each new issue

**Date:**
**Reported by:**

**What I prompted:**
```
[paste your prompt here]
```

**What Claude did:**
> Describe the unexpected output

**Why it happened:**
> Missing context, ambiguous prompt, token not referenced, etc.

**How I fixed it:**
```
[paste the corrected prompt or fix]
```

**CLAUDE.md updated?**
- [ ] Yes — added Rule #__: [describe rule]
- [ ] No — prompt fix was enough

---

### Prompts That Work

> Graduated to PROMPTS.md when tested 3+ times consistently

| Situation | Prompt That Works |
|-----------|-------------------|
| Restructuring an existing Figma component's variant/property API | "can you just fix existing?" — a plain go-ahead, once the plan (which variants get deleted, which become Booleans) was already laid out and risk-flagged. Skips re-litigating the plan; Claude proceeds straight to execution. |

---

### Entries — Claude Behavior Log

**Date:** 2026-08-19
**Reported by:** Nan

**What I prompted:**
```
can we build that into our Folio design system
[then, after scoping questions:]
can you just fix existing?
```

**What Claude did:**
> Proposed converting all four of `Tree`, `Selected`, `Expand`, `Mixed` on the Figma "List item" component (Single Select_List item / MultiSelect_List item, Input-Tab page) into independent Boolean properties. On inspecting the real layer structure, two of those assumptions broke: (1) `Selected` and `Mixed` aren't independent — they swap the *entire* checkbox sub-component (Type=Checkbox Default/Selected/Mixed), so they became one `Checked` Instance-Swap property (tri-state, matching native `<input indeterminate>` semantics) instead of two Booleans. (2) `Expand` drives a nested icon's own variant swap (Type=Tree / Tree Expanded), and the Plugin API's `componentPropertyReferences` only supports binding `visible`, `characters`, or `mainComponent` — there's no way to expose a child's own variant swap as a parent-level property via script. `Expand` was left unexposed, documented as a known limitation in the component's Figma description, and must be set manually per-instance until someone does it by hand in the Figma UI (which supports "expose nested properties" as a manual action the API can't reach).

**Why it happened:**
> The original property-structure recommendation (see Pattern Observations below) was made from variant *names* alone, before inspecting actual layer structure. Names suggested independent orthogonal concerns; the real nested-instance wiring didn't support that 1:1.

**How I fixed it:**
```
Inspected real component internals via use_figma (dump layer tree, check
componentProperties/mainComponent on nested instances) before writing any
property, instead of trusting the variant-name analysis alone.
```

**CLAUDE.md updated?**
- [x] No — prompt fix was enough, but this file (LEARNING.md) got the rule instead: **always inspect actual nested layer/instance structure before proposing a Figma property restructure — variant names can imply independence that the underlying instance-swap wiring doesn't support.**

---

**Date:** 2026-08-19
**Reported by:** Nan

**What I prompted:**
```
have you build checkbox, radio component in the Folio design system?
[then:]
build Radio and Checkbox stand alone component in figma
```

**What Claude did:**
> First pass said "no standalone Checkbox or Radio exists" based on scanning Table, Search & Filter, Input-Tab, Popover, Navigation, Drawer, Modal, Steppers, and Icons pages for component names matching `/check|radio/i`. That was wrong: a full 60-variant Checkbox component set *did* exist, just misfiled on the **Button** page — a page my scan never checked because nothing about "Button" suggested "Checkbox." Found it only by accident, tracing a nested instance's `mainComponent` from inside the List item work. On top of being mislocated, it had two real defects: `Default` was used as the State axis name, and 4 of 60 variants (Focused/Pressed × Large/Small, Checked=No, Label=No) were literal placeholder rectangles with no icon at all — a silent, invisible-until-you-toggle-that-exact-combination bug.

**Why it happened:**
> Component discovery by page-name pattern-matching is unreliable — components get built on whatever page was open at the time, not necessarily the page named after them. Should search by component *name* across ALL pages (fan-out), not assume page names are a reliable filter.

**How I fixed it:**
```
Traced the real component via nested-instance.mainComponent.parent instead of
trusting page-name-based search. Moved it to a dedicated "Checkbox" page,
renamed State axis, replaced the 4 broken placeholder variants by cloning a
working sibling's icon, and linked the label as a real TEXT property.
```

**CLAUDE.md updated?**
- [ ] No, but flagging for next time: when asked "does X exist," search by component/variant *name* across all pages before answering "no" — don't rely on page names as a proxy for content.

---

---

### Prompts That Don't Work

| Situation | What to Avoid | Why |
|-----------|---------------|-----|
| | | |

---

### CLAUDE.md Rule Updates

| Date | Rule Added | Triggered By |
|------|------------|--------------|
| | | |

---

### Open Issues

| Issue | Status | Notes |
|-------|--------|-------|
| CLAUDE.md describes Tailwind v4 + shadcn/ui + `src/components/cube/` structure, but the actual codebase (`components/*.jsx`) uses plain React with inline `style={{}}` objects and a per-file hardcoded `COLORS` constant — no Tailwind installed. | Open | Discovered while scoping the List item (tree/select row) component from Figma node 397:39264. New components should follow the *actual* pattern (`components/Select.jsx`) until CLAUDE.md is reconciled with reality or the codebase is migrated. |

---

## Part 2 — Pattern Observations

> Log every time you use a pattern while building a screen.
> When a pattern appears 3+ times — flag it for PATTERNS.md.

### Observation Template — copy for each new observation

**Date:**
**Screen built:**
**Pattern used:**
> Describe the pattern — what it is and how it behaves

**Why you used it:**
> What problem it solved

**Role context:**
> Which user role(s) this applies to

**Times used so far:** 1

---

### Entries

**Date:** 2026-08-19
**Screen built:** N/A — component spec review (Figma node 397:39264, "Inputs" page)
**Pattern used:**
> Existing Figma "List item" component (used inside Single Select and Multi Select dropdowns) bakes five overlapping concerns into one variant name: `State` (Default/Hover/Disabled), `Level` (0–3, indentation depth), `Tree` (Yes/No, has expand/collapse), `Selected` (Yes/No), `Expand` (Yes/No), plus `Mixed` (Yes/No) on the multi-select version only. Recommended split: `State` stays a Variant (interaction, not content); `Level` becomes a Text/number prop for indentation depth rather than 4 separate variants; `Tree`, `Selected`, `Expand`, `Mixed` become independent Booleans since they combine freely and aren't mutually exclusive.

**Why you used it:**
> Reviewed before building the React version so the component API (props) maps cleanly to the Figma property panel — avoids designers and engineers drifting into separate mental models for the same component.

**Role context:**
> Applies to any screen using hierarchical/tree select inputs (dimension pickers, nested category selectors).

**Times used so far:** 1

**Outcome (2026-08-19):** Executed in Figma via `use_figma`. `Single Select_List item` went from 42 variants to 12 (`State`×`Level`) + 2 Booleans (`Tree`, `Selected`). `MultiSelect_List item` went from 87 variants to 12 + 1 Boolean (`Tree`) + 1 Instance-Swap (`Checked`, replacing the `Selected`+`Mixed` axes — see Claude Behavior Log entry above for why it's not two Booleans). Verified by binding-test instances + screenshots before deleting them. Then built `components/ListItem.jsx` (React, matches the repo's plain-inline-style pattern from `Select.jsx`, not the Tailwind pattern CLAUDE.md describes) with props `level`, `tree`, `expanded`, `selected`, `checked` ('unchecked'|'checked'|'mixed'), `multi`, `disabled` — mapping 1:1 to the new Figma property API except `expanded`, which stays a plain prop in React (no such constraint in code) despite being unexposed in Figma. Verified interactively in the browser preview (`prototypes/list-item-demo.html`).

---

### Pattern Tally

> Track how many times each pattern has been observed across screens.
> Flag (🎓) when count reaches 3 — ready to graduate to PATTERNS.md.

| Pattern | Screens Used On | Count | Status |
|---------|----------------|-------|--------|
| | | | |

---

### Graduated to PATTERNS.md

> Patterns that have been moved to PATTERNS.md

| Pattern | Date Graduated | Notes |
|---------|---------------|-------|
| | | |

---

*Last updated: May 2026*
