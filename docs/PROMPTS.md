# Folio Design System — Prompt Library

> Approved prompts for generating Cube screens with Claude.
> All prompts follow the 4-layer context stack:
> Role → Brief → Template → Tokens + Components
>
> New prompts start in LEARNING.md before graduating here.

---

## Context Stack (always include all 4 layers)

```
1. User Role       ← who is using this feature
2. Feature Brief   ← what the feature does (reference /briefs)
3. Template        ← layout base (reference /templates)
4. System          ← tokens + components
```

---

## User Roles Reference

Always specify one of these roles in your prompt:

| Role | Permissions |
|------|-------------|
| **Admin** | Full access — AI credits, user management, billing, all settings |
| **Editor** | Can build and edit models, reports, scenarios — no admin settings |
| **Viewer** | Read only — can view reports and boards, no editing |

---

## 1. Session Start

Always run this at the start of every Claude Code session:

```
Read the following before doing anything:
- CLAUDE.md
- tokens.css
- /components folder
- /templates folder

Confirm you have loaded the Folio design system context.
```

---

## 2. Generate a New Screen

```
User role: [Admin / Editor / Viewer]
[Add role permissions from roles reference above]

Feature brief: Read briefs/[brief-filename].md

Layout reference: Use /templates/[template-filename].html as the base layout.
Only add content inside <main> — do not modify the shell.

Tokens: Use only hex values from tokens.css — never Tailwind defaults.
Components: Use only components from /components folder.

Generate a [screen name] screen based on the above context.
```

---

## 3. Generate by Screen Type

### Dashboard / Home
```
User role: [Admin / Editor / Viewer]
[Add role permissions]

Feature brief: Read briefs/[brief-filename].md
Layout reference: /templates/home.html

Generate a dashboard screen for [feature].
Show summary metrics, recent activity, and quick actions appropriate for the user role.
```

### List View
```
User role: [Admin / Editor / Viewer]
[Add role permissions]

Feature brief: Read briefs/[brief-filename].md
Layout reference: /templates/dimensions.html

Generate a list view for [feature].
Include table headers, row actions, filters, and empty state.
Show only actions the [role] is permitted to take.
```

### Detail / Settings View
```
User role: [Admin / Editor / Viewer]
[Add role permissions]

Feature brief: Read briefs/[brief-filename].md

Generate a detail view for [feature].
Include editable fields, save/cancel actions, and permission-gated sections.
Lock or hide sections the [role] cannot access.
```

### Empty State
```
User role: [Admin / Editor / Viewer]

Generate an empty state for [feature / screen name].
Include an illustration placeholder, headline, subtext, and CTA.
CTA should reflect what the [role] is allowed to do.
```

---

## 4. Role-Gated Screens

### Admin-only screen
```
User role: Admin
Permissions: AI credits visible, user management enabled, billing access, all settings unlocked.

Feature brief: Read briefs/[brief-filename].md

Generate [screen name] with full admin capabilities visible.
Include AI credit usage indicator in the header if relevant.
```

### Viewer-restricted screen
```
User role: Viewer
Permissions: Read only — hide all edit, delete, and create actions.
Show locked/disabled state for any actions Viewer cannot take.

Feature brief: Read briefs/[brief-filename].md

Generate [screen name] in read-only mode.
```

---

## 5. Component Prompts

### Create a new component
```
Create a [component name] component in /components.
Use tokens from tokens.css for all styles.
Show all states: default, hover, active, disabled, error.
Do not use Tailwind defaults — reference tokens.css only.
```

### Fix off-brand output
```
Review [filename] against tokens.css.
Replace any colors, spacing, or typography that does not match the tokens.
Primary blue is #2667D8 — not Tailwind blue-500.
Do not change layout or content — fix styles only.
```

---

## 6. Figma MCP Push

### Push generated screen to Figma
```
Push [filename] to Figma canvas in the [Figma file name] file.
Place it in the [frame / section name] area.
```

### Push component to Figma
```
Push /components/[component name] to Figma as a component in the [Figma file name] file.
```

---

## 7. Prompt Graduation Checklist

Before moving a prompt from LEARNING.md to here, confirm:

- [ ] Tested at least 3 times with consistent output
- [ ] Output matches Folio tokens and components
- [ ] Role permissions produce correct visibility
- [ ] No unexpected layout or color issues

---

*Last updated: May 2026*
