# Cube User Personas

> Reference for design decisions. When designing a feature, specify which persona(s) it serves.
> Claude will use this context to make more accurate UX recommendations.

---

## User Segments — Quadrant Map

Cube users fall into two axes:

| | Past-oriented (Reporters) | Future-oriented (Planners) |
|---|---|---|
| **Multi-player** | Q1 — Collaborative Reporters | Q2 — FP&A Teams |
| **Single-player** | Q3 — Solo Reporters | Q4 — Solo FP&A |

### Reporters (Q1 + Q3)
- Not doing full FP&A — focused on Fetching, Drilling down, Mapping dimensions, Importing trial balances
- Mostly working with Actuals data
- Concerned with communication, sharing, and storytelling
- Want to use Cube outputs in other media (slide decks, etc.)
- Past-oriented: "What happened? Why?"

### Planners (Q2 + Q4)
- Do everything Reporters do, plus: Publish, Tags, Attributes for sophisticated analysis
- Optimizers — want efficiency improvements like "Fetch/Publish All"
- Future-oriented: forecasting, scenario planning, resource allocation
- Want to spend LESS time in spreadsheets and MORE time on strategy

---

## Personas

---

### Max
**Head of Finance, 35 FTE startup**
**Segment:** Solo FP&A (Q4)

**About**
Max does it all — managing accounting processes, reporting to the board, financial plans, investor relations, and fundraising. Often performs COO functions on top of CFO responsibilities. Eager to stabilize finance processes and start growing a team.

**Key activities:** Strategic Planning, Monthly Financial & Management Reporting, Periodic Forecasting, Scenario Planning & Analysis, Advising Execs

**Basic Info**
- Age: 40
- Education: BA, Economics, Dartmouth
- Background: Former investment banker

**Attitudes**
- Leans Trailblazing over Cautious
- Learns by Doing over Listening
- Tech Savvy

**Technology:** PC, Excel, PowerPoint, QBO, Xero

**Goals**
- Manage corporate performance: "Are we doing the things we said we wanted to do?"
- Manage cash more precisely
- Quickly share financial performance
- Find software with no steep learning curve he can leverage fast

**Pain Points**
- Live in fear of making mistakes
- Trapped in a request/response cycle
- Lack of real-time access to answers
- Lack of confidence in the data
- Lack of time to do good work
- Difficulty communicating insights
- Not appreciated nor understood by peers

**Thinking & Feeling**
- Always rushed
- Feelings of inadequacy & insecurity
- Not appreciated by others in the company

**Hopes / Fears**
- Hopes: Rise fast, have the answer always, have strategic impact, do important work
- Fears: Inaccuracy, insecurity, inadequacy
- Perceives: Distrust, blockers to budget owners

---

### Ava
**VP of Finance, 100 FTE startup**
**Segment:** Collaborative Reporter / FP&A (Q1–Q2)

**About**
Ava runs FP&A on a small finance team of three at a wellness startup. Currently uses QuickBooks, considering NetSuite. On annual planning cycle, eager to move to quarterly.

**Basic Info**
- Age: 30
- Education: BA, Finance
- Background: PwC for 4 years, then Corporate Finance

**Attitudes**
- Slightly Trailblazing
- Learns by Doing

**Technology:** PC, Excel, PowerPoint, QBO, Xero, NetSuite, Sage Intacct

**Goals**
- Craft and present compelling stories to the board and executives
- Streamline data consolidation across departments
- More efficiently manage models to devote more time to strategy
- Be known for delivering accurate, timely, reliable reports

**Pain Points**
- Feels like she's bothering people chasing down numbers every month
- Frustration with tedious manual tasks
- Chaos of closing periods
- Anxiety over models breaking
- Mapping data from various sources

**Motivations**
- Seeing results match expectations
- Budget and actuals aligning
- Determining answers to tough problems and causes of variance
- Becoming a strategic finance leader

---

### Tobias
**Director of Finance, 500 FTE company**
**Segment:** FP&A Team (Q2)

**About**
Tobias leads an FP&A team at a publicly-traded retail company. Has worked in the finance org for five years and knows the business very well. Extensive Hyperion experience; organization has been using NetSuite for four years.

**Basic Info**
- Age: 36
- Education: BA, Economics
- Background: IB → Analyst role at large company → promoted internally

**Attitudes**
- Slightly Trailblazing
- Learns by Doing

**Technology:** PC, Excel, SQL, Workday, Oracle, Enterprise-grade systems

**Goals**
- Present compelling stories to the board and executives
- Streamline data consolidation across departments
- Cultivate a nimble FP&A team that responds quickly to requests
- Determine the proper way to address variance
- Career advancement

**Pain Points**
- Sharing financial data with team members for ad hoc reports
- Feeling in the dark on version control
- Team devoting too much time to tedious manual tasks
- Chaos of closing periods
- Poor communication between departments
- Mapping data from various sources

**Motivations**
- Seeing results match expectations
- Being the 'hero' with visionary plans and actionable strategies
- Building trust within team and with other departments

---

### Chris
**Head of Marketing, 150 FTE startup**
**Segment:** Collaborative Reporter (Q1) — Budget Owner, non-finance

**About**
Chris is the Head of Marketing at a subscription gourmet snack box company. Recently took over managing the department budget. CEO known for unpredictable, urgent requests. Represents the non-finance budget owner who uses Cube outputs but doesn't live in the finance world.

**Basic Info**
- Age: 37
- Education: BA, Media Studies & Psychology
- Background: 6 years at current company, HoM for 1 year

**Attitudes**
- Knows their way around a budget (not totally lost)
- Working toward being aligned with finance team
- Slightly Trailblazing

**Technology:** Mac, Salesforce, Mixpanel, Drip, Mailchimp, FB Analytics

**Goals**
- Increase ROI of all marketing campaigns
- Plan and execute creative campaigns with tangible company impact
- Ensure org allocates resources to highest ROI campaigns
- Deliver great impressions to new and existing customers
- Cultivate professional relationships within the company and with vendors

**Pain Points**
- Feels constrained by time-consuming budget update process
- Relationship with finance team is more "adversarial" than "aligned"
- Caught between executive suite demands and finance org restrictions

**Motivations**
- Data-driven: seeing sales rise from a successful campaign
- Tracking real-time campaign results
- Working in a field that rewards quick strategic execution

---

## Design Reference

### When to use each persona

| Persona | Best for designing |
|---|---|
| **Max** | Solo workflows, speed-to-insight, low learning curve features, mobile-friendly views |
| **Ava** | Data consolidation, closing period workflows, board reporting, model management |
| **Tobias** | Team collaboration, version control, enterprise integrations, cross-department sharing |
| **Chris** | Budget owner views, simplified read-only experiences, non-finance user flows |

### Common pain points across all personas
- Manual, repetitive tasks that eat up time
- Mapping data from multiple sources
- Chaos of closing periods
- Communicating financial insights to non-finance stakeholders
- Lack of confidence in data accuracy

