# Gen UI study: team notes

Team only. **Not for participants.** Only the contents of `group-b-context/` go in Group B's "Study files" folder.

## Masters

| Folder | Files | Who gets it |
|---|---|---|
| `group-a-context/` | `product-screen.png` (1 file) | Team A copies it to the desktop as "Study files" |
| `group-b-context/` | 10 files: `README.md`, `design.md`, `WorkflowListTemplate.jsx`, `folio-components.jsx`, `Table.md`, `tokens.css`, `typography.css`, `colors.md`, `persona.md`, `product-screen.png` | Team B copies it to the desktop as "Study files" |
| `scorer-materials/` | `SCORING-GUIDE.md`, `score-sheet.csv`, `product-screen.png`, `benchmark-screen.png` | Scorers only. Never shared with Team A or Team B. |

`product-screen.png` is the same file in both masters. The files inside `group-b-context/` say nothing about the study. They only carry the design rules: start from the template, reuse the components, use tokens only, never create from scratch.

## Notes on the component file

- 37 components plus inline SVG icons (nav icons, app logos, 110 Font Awesome icon names) in one file of about 300 KB. Builds with esbuild and every component renders with sample props.
- Brand removed (no matches for the product name). Navigation labels read "Accu BI" and "Accu AI".
- Font Awesome Pro glyphs are embedded for this study. Do not publish the component file.

## Before the pilot

- Attach all 10 files to Claude in one go and check it lists every name.
- The page template is `WorkflowListTemplate.jsx`, built from the components and checked against the Product Screen in a browser (the multi-select Status filter works, and the marked SLOT sits between the filter bar and the table). The old HTML template was removed so two templates cannot disagree. `workflow-task.html` is also gone.
- Values follow the screenshots: filter control height 32px, "Not Started" yellow, progress bar light green. The nav has no Tables item, to match the screen.
- The benchmark screen is an older capture that still shows the product logo. Re-capture it from the same version as the Product Screen.
- Re-run a search for the product name after any edit.
- Script file counts: Group A = 1, Group B = 10.

## Scoring (decided: independent scoring plus participant rating)

- Two or more scorers who ran no session score the screenshots blind, using `scorer-materials/SCORING-GUIDE.md` (4 rubric dimensions, a clarity score, and an 11-item checklist).
- Participants' own rating (follow-up question A5) is kept as a separate measure and compared with the independent scores afterwards.
- Still to do: name the scorers, and calibrate the anchors on the pilot screenshots. Checklist items 7 to 11 depend on the final task sheet wording.
