# Scoring guide

For scorers only. Do not share this folder with the facilitation teams (Team A and Team B).

## What you are measuring

How closely the final prototype looks like it belongs in the existing product. You compare each screenshot with the starting Product Screen. You are scoring the output, not the person, and you will not know which group made it.

Participants also rated their own design in the follow-up questions (question A5). That rating is a separate measure. Do not look at it while scoring.

## Who scores

- At least two scorers who did not run any session. No one on Team A or Team B scores.
- Scorers work from screenshots only, never the chat, and never the group key.

## What you receive

- `[participant ID]_final.png`: one screenshot per participant, in shuffled order. File names carry the ID only.
- `product-screen.png`: the starting screen. **This is the visual standard for style.**
- `benchmark-screen.png`: one example of a complete solution. Use it only to see what a complete result could look like. Do not penalize a different layout.

## How to score

Score each screenshot independently, in this order.

### Part 1: Looks like the product (1 to 4)

Compare the style of every element with the starting Product Screen. For the new element, compare it with how the starting screen styles similar elements (filters, status labels, links).

| Dimension | What to look at | 1 (weak) | 2 | 3 | 4 (strong) |
|---|---|---|---|---|---|
| **Visual style** | Colors, type, spacing, corner shapes, shadows | Clearly a different look (other palette, other fonts) | Some match, several visible differences | Mostly matches, a few small differences | Indistinguishable from the starting screen |
| **Components** | Buttons, inputs, filter controls, pills, tags, table, icons | New or generic controls | A mix of product controls and new ones | Product controls with minor differences | Reuses the product's own controls and states |
| **Fit on the page** | Placement, spacing and hierarchy of the new element | Looks pasted on | Placed sensibly but spacing or hierarchy is off | Sits well with small issues | Looks like it was always part of the page |
| **Overall** | Would you believe it is part of the product? | Clearly a different product | Looks like a similar product | Looks like the same product with small flaws | Could ship next to the real page |

### Part 2: Clarity (1 to 4, secondary)

Can you tell what the new feature does and what state it shows? 1 = unclear, 4 = clear at a glance.

### Part 3: Checklist (yes or no)

**Product style**
1. Uses only colors that appear in the starting screen
2. The typeface matches the starting screen
3. Buttons and badges have the same pill shape as the starting screen
4. Inputs and filter controls have the same rounded style
5. Icons match the starting screen's icon style
6. The side navigation and top bar are unchanged from the starting screen

**The new feature** *(these items depend on the final task wording and will be updated if it changes)*
7. Each applied filter is shown with its field and its value
8. Each applied filter can be removed individually
9. There is a way to clear all filters
10. The applied filters sit near the filter bar
11. The table results reflect the applied filters

## Rules

- **Score the output you see.** Do not guess the group from the look. If you think you know, score as if you do not.
- **Do not penalize a different layout** or extra ideas. Penalize only differences from the product's style and components.
- **One score per dimension.** If you hesitate between two scores, pick the lower one.
- **Write a note** for any 1 or 4, so a disagreement can be resolved later.

## Calibration (before real scoring)

1. Score the two pilot screenshots and at least two more sample screens together.
2. Compare scores and discuss every difference until the anchors mean the same thing to both scorers.
3. Tighten any anchor that was read two ways, and write the change here.
4. Only then score the real screenshots, independently.

## Agreement check

After independent scoring, compute for each dimension how often the two scorers are within one point of each other, and for the checklist the percentage of items on which they agree. Report both. Then resolve disagreements by discussion, and record the final scores and who resolved them.

## Linking to the follow-up questions

After scoring is finished, an analyst (not a scorer) adds the group key and the follow-up responses. For each participant, compare:
- the independent scores (Parts 1 to 3), and
- the participant's own rating (A5, "looks like it belongs in the same product").

Report whether participants can tell when their output differs from the product.

## Score sheet

Use `score-sheet.csv`: one row per screenshot per scorer.
