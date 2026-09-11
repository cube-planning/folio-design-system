# docs/ — map

Grouped by *what governs what*, not by file type.

## `foundation/` — rules that apply to every surface

Read these before anything persona- or surface-specific.

| File | Purpose |
|---|---|
| [`BRAND-FOUNDATION.md`](foundation/BRAND-FOUNDATION.md) | Facts shared by every persona: type, icons, chart series, radius, voice, the one shared palette |
| [`CHART-RULES.md`](foundation/CHART-RULES.md) | Every chart, app or marketing, including charts over glass surfaces |
| [`cube-personas.md`](foundation/cube-personas.md) | User personas: Max, Ava, Tobias, Chris |

## `product/` — Folio app specifics

| File | Purpose |
|---|---|
| [`PATTERNS.md`](product/PATTERNS.md) | UX patterns |
| [`cube-addon-design-spec.md`](product/cube-addon-design-spec.md) | Add-on sidebar spec |
| [`boards_color_theme_project_summary.md`](product/boards_color_theme_project_summary.md) | Named board color themes |

## `process/` — how we work, and why rules changed

| File | Purpose |
|---|---|
| [`DESIGN-PLAYBOOK.md`](process/DESIGN-PLAYBOOK.md) | How to structure prompts and run design sessions |
| [`DESIGN-DECISIONS.md`](process/DESIGN-DECISIONS.md) | Dated log of *why* a rule changed. Explains the specs; never overrides them |
| [`PROMPTS.md`](process/PROMPTS.md) | Approved prompt library |
| [`LEARNING.md`](process/LEARNING.md) | Improvement log + pattern observations |
| [`RESEARCH.md`](process/RESEARCH.md) | Tool decisions, comparisons, open questions |
| [`COMPONENT-DOC-TEMPLATE.md`](process/COMPONENT-DOC-TEMPLATE.md) | Template for documenting a component |
| [`nan-design-prompt-process.md`](process/nan-design-prompt-process.md) | Prompt process writeup |

## Not in this folder

| Topic | Home |
|---|---|
| Folio app design system rules | [`../CLAUDE.md`](../CLAUDE.md) |
| Marketing & brand rules | [`../brand/BRAND.md`](../brand/BRAND.md) |
| Glass/isometric graphic recipe | [`../brand/glass-ui-style.md`](../brand/glass-ui-style.md) |
| Superseded / legacy material | [`../archive/`](../archive/) |

## Sync note

`guidelinesGlob` in `.design-sync/config.json` is `docs/**/*.md` — recursive, so files in
these subfolders do reach the claude.ai/design project, at `guidelines/docs/<group>/`.
It was `docs/*.md` before 2026-09-11; that pattern is one segment deep and would have
silently dropped every file here.
