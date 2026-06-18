# My Design Process with Claude

A repeatable workflow I use to go from a feature brief to a testable prototype — covering UX pattern exploration, design decisions, and developer handoff.

---

## Two Starting Modes

Not every project starts the same way. The first thing to decide is which mode you're in:

| | Ongoing Project | From Scratch |
|---|---|---|
| **You have** | Slack threads, screenshots, Jira comments, prior decisions | Just a feature idea or brief |
| **Claude's job** | Catch up to where the project is, then extend | Explore the problem space, then recommend |
| **First ask** | "Here's where we are — what's the next step?" | "Give me 2–3 UX directions" |
| **Risk to watch** | Claude misreads existing context — correct early | Claude goes too generic — add more constraints |

---

## Mode 1: Ongoing Project

Use this when the feature already has history — a Slack thread, a screenshot of the current UI, feedback from a review, or decisions already made in a previous session.

Start by sharing the existing context before asking for anything:

```
You are my UX design partner working on [FEATURE NAME] for Cube.

Here's where we are:
- [Paste or describe the Slack thread / screenshot / feedback]
- Decisions already made: [list what's been locked]
- What changed: [new constraint, stakeholder feedback, edge case]

Based on this, [next question — e.g. "what should the next step be?" 
or "how do we handle this edge case?"]
```

*Example:* For Smart Mapping, sessions started with Slack screenshots from Rajat or Ash, then evolved from there — badge design → banner copy → mapping rules drawer, each session building on the last.

---

## Mode 2: From Scratch

Use this when there's no prior work. You're starting from a brief or a problem statement and need to explore before committing to anything.

```
You are my UX design partner working on [FEATURE NAME] for Cube — a financial analytics and FP&A platform. Cube is a data-heavy, dense product used by finance teams.

Here's the context:
- Feature: [describe what it does and why it exists]
- User: [who uses this and what they're trying to accomplish]
- Entry point: [where in the product this lives]
- Current state: [what's broken or missing today]
- Constraints: [design system, existing component patterns, V1 scope]

Start by giving me 2–3 UX pattern options for this interaction. For each pattern:
- Name it
- Describe how it works
- Note the tradeoff
- Recommend which one to develop first and why
```

*Example:* The Color Theme Picker started from scratch — no prior UI to reference, just a broken production pattern to replace.

---

## The Rest of the Workflow (both modes)

Once the starting context is set, the process is the same regardless of which mode you're in.

### 1. Pattern Exploration
I ask Claude to propose 2–3 UX directions before committing to anything. Each direction gets a name, a behavior description, and an honest tradeoff. Claude recommends one — I decide.

*Example:* For the Color Theme Picker, we explored a Preset Themes + Slot Editor (Pattern 1), an Inline Dot Row with Popover (Pattern 2), and a Split Panel layout (Pattern 3). I picked Pattern 1 to develop first.

---

### 2. Interactive HTML Prototype
Once I choose a direction, I ask Claude to build a clickable HTML prototype — not a static mockup. This lets me test flows, share with PMs and engineers, and run Maze tests without needing Figma to be complete.

```
Now build Pattern [X] as a fully interactive HTML prototype.
Include: [list the views or flows needed]
Use Cube's color system: [paste relevant tokens]
Make it standalone — one file, no external dependencies.
```

The prototype goes through multiple iterations as I clarify edge cases, correct wrong assumptions, and add new flows.

---

### 3. Design Decisions via Conversation
As I review the prototype, I use Claude to think through micro-decisions — things like:

- Should the label input stay or go?
- Does this color picker belong on the Board level or Widget level?
- What's the hierarchy between global theme and per-widget override?

Claude gives me a recommendation with rationale. I either accept it, push back, or redirect based on what I know about Cube's product direction.

---

### 4. Markdown Spec File
Once the pattern is stable, I ask Claude to produce a Markdown spec that captures the behavior rules for engineering handoff.

```
Write a behavior spec for [FEATURE] in Markdown.
Cover: entry points, interaction states, edge cases, 
what persists vs resets, and any design decisions that 
need to be called out explicitly for engineering.
```

This becomes the source of truth I attach to the Jira ticket or share in Slack.

---

### 5. Stakeholder Communication
When I need to align with Rajat (PM) or Ash (engineering), I ask Claude to help me draft Slack messages in my tone — casual, direct, no fluff. I paste the draft into Slack and adjust as needed.

---

## What Makes This Work

- **Context first** — I always tell Claude the product context, user type, and constraints before asking for anything. Better input = better output.
- **Options, not answers** — I ask for multiple patterns so I'm choosing, not just accepting.
- **Iterative prototyping** — The HTML prototype is the design artifact. I treat it like a live Figma file and iterate it in conversation.
- **Push back freely** — Claude often makes assumptions I need to correct. The best sessions come from me redirecting early rather than waiting until the end.
- **Spec at the end** — The Markdown file locks in the decisions so they don't get lost in chat history.

---

## Example Features Built This Way

| Feature | Output |
|---|---|
| Smart Mapping (AI auto-mapping) | Badge design, banner copy, mapping rules drawer, filter bar, Slack messages to Rajat and Ash |
| Color Theme Picker | 3 UX patterns explored, full HTML prototype with Board index + Board detail + Edit Mode, widget-level color override |
| Library Deletion/Archive | Soft delete flow, Recently Deleted page, checkbox patterns, toast copy |
| Insert Functions Panel | Section header treatments, color decision (Indigo 700), popup sizing |
| AI Message component | Markdown → CSS spec for engineering, HTML element mapping, LLM formatting instructions |
