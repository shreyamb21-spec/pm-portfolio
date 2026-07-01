# Portfolio Revamp — Full Implementation Spec

**Read this entire file before writing any code.** This is the complete, final spec for revamping `pm-portfolio` (Create React App, single-page React app). Every decision here has already been made — do not re-litigate palette, structure, or content choices. Implement exactly as described.

---

## 0. Current State (Before This Spec)

- Single monolithic `src/App.js` (~1,252 lines), dark editorial theme (`#0B0B0D` bg, `#EDE9E3` cream text, `#E06840` orange accent).
- Fonts: Playfair Display (display/headings), Outfit (body), JetBrains Mono (labels/tags/mono).
- Sections in order: About/Hero, Experience, Projects, Teardowns, Decisions, Case Study, Thinking, Skills, Contact. Floating ChatBot widget bottom-right.
- Chatbot calls `api.anthropic.com/v1/messages` directly from the client with a hardcoded model string — this must change (see Section 4).
- No component split — everything lives in `App.js`.
- No git init, no deploy config in-repo.
- Title tag reads "Shreyam Borah | Aspiring PM" — outdated, must fix.
- CompetitorPulse listed as having beta testers, not paying customers, in the current site copy — see Section 6 for the correct framing to use everywhere.

---

## 1. Component Architecture — Split the Monolith

Break `App.js` into the following file structure. Do not leave any section's JSX inline in a parent file once split.

```
src/
  App.js                        — top-level shell, renders all sections in order, holds nav active-section state
  index.css / App.css           — global resets, font imports (unchanged from current, verify still needed)
  theme/
    tokens.js                   — exports C (color tokens) and FONT (font family tokens) — see Section 3 for values
  data/
    experience.js                — experience array (Section 6)
    projects.js                  — projects array (Section 6)
    decisions.js                 — unified decision log array (Section 7)
    skills.js                    — skills object
    education.js                 — education array
    leadership.js                — new leadership array (Section 6)
    essays.js                    — thinking/essays array (unchanged content, keep as Draft status)
    user.js                      — user contact/meta object (name, email, links, resume, calendly)
  components/
    layout/
      Nav.js                     — top nav, scroll-spy active section highlight
      Divider.js
      SectionLabel.js
      SectionTitle.js
      Tag.js
      FadeIn.js                  — IntersectionObserver fade-in wrapper (unchanged behavior)
    hero/
      Hero.js                    — now the chatbot-as-hero centerpiece (Section 8.4) with ink-cursor canvas layer (Section 8.1)
      InkCanvas.js                — the cursor-driven grain reveal canvas, extracted so Hero.js stays readable
    experience/
      ExperienceSection.js
      ExpCard.js
    projects/
      ProjectsSection.js
      ProjectCard.js
      ProjectTimeline.js          — scroll-scrubbed timeline strip (Section 8.3)
    decisions/
      DecisionsSection.js
      DecisionCard.js              — now interactive: click an alternative to reveal "why not" (Section 8.2)
    leadership/
      LeadershipSection.js         — new section (Section 6)
    thinking/
      ThinkingSection.js
    skills/
      SkillsSection.js
    contact/
      ContactSection.js
    chatbot/
      ChatBot.js                    — the Ask-Shreyam interaction, now embedded in Hero rather than a floating bubble (Section 4, Section 8.4)
  api/
    (only relevant if you scaffold a serverless function locally — see Section 4.2)
```

Rules for the split:
- No inline style objects duplicated across files — reuse `theme/tokens.js` everywhere.
- Every section component receives its data via import from `data/`, not via props drilled from `App.js`, unless the data needs to be shared across sections (it doesn't, in this design).
- Keep the `FadeIn` IntersectonObserver wrapper and stagger-delay pattern exactly as in the current code — do not change the animation timing or easing.
- Remove `App.test.js` boilerplate content if it no longer matches the component tree, or leave as a stub — not a priority for this pass.

---

## 2. Sections Removed

**Delete the entire Product Teardowns section.** Remove:
- `TeardownsSection.js` / any teardown component (don't create it)
- The `teardowns` data array
- The `Teardowns` nav item
- The `#teardowns` anchor and its `<Divider />` siblings in `App.js`

Do not preserve teardown content anywhere, including in comments.

---

## 3. Visual System — Light Mode, Monochrome

Replace the dark palette entirely. New `theme/tokens.js`:

```js
export const C = {
  bg: "#F5F1EA",          // page background (cream)
  bgAlt: "#EDE9DC",        // alternating section background, slightly deeper cream
  card: "#FFFFFF",         // card surfaces
  cardHover: "#FAF8F3",
  ink: "#1A1815",          // primary text / near-black — replaces old "cream" and "accent" roles
  text: "#4A453D",         // body text, secondary
  muted: "#6B6558",        // tertiary text
  dim: "#A39C8C",          // hints, timestamps, faint labels
  border: "rgba(26,24,21,0.15)",
  borderStrong: "rgba(26,24,21,0.35)",
  tagBg: "#EDE9DC",        // soft warm-gray fill for skill chips (the one non-binary tone allowed — see below)
};

export const FONT = {
  display: "'Playfair Display', serif",
  body: "'Outfit', sans-serif",
  mono: "'JetBrains Mono', monospace",
};
```

**Rules for the monochrome system:**
- There is **no accent color**. Every previous use of `C.accent` (buttons, active nav state, section labels, links, badges) becomes `C.ink` (near-black) instead.
- Hierarchy is created through **opacity, weight, and borders only** — not hue. Example: a muted label is `C.ink` at reduced opacity or `C.dim`, not a tinted color.
- CTAs (buttons like "Get in touch") are solid `C.ink` fill with `C.bg` text — i.e. inverted, not colored.
- Secondary buttons/links are `1px solid C.ink` border, transparent background, `C.ink` text.
- The **one exception**: skill/tag chips use `C.tagBg` (`#EDE9DC`, a soft warm-gray, not a hue) as a subtle textural fill — this was explicitly approved as the one non-pure-binary element. Do not introduce any other colored fills.
- Card borders: `1px solid C.border` default, `1px solid C.borderStrong` on hover/active/open states (this replaces the old `accentBorder` hover pattern).
- Border radius: reduce from the old rounded-corner-heavy dark theme to a tighter, more editorial radius — `4px` for buttons/tags, `4-8px` for cards (not the old 10-14px). This is a deliberate part of the minimal aesthetic.
- Remove the accent glow radial gradient from the old Hero background entirely (`accentGlow` radial at top-right) — the ink-canvas interactive layer replaces it (Section 8.1).
- Keep the subtle SVG grain/noise overlay from the old Hero if desired for paper texture, but at very low opacity (`0.02-0.03`) so it doesn't muddy the cream.

**Section background alternation:** keep the existing pattern of alternating `C.bg` / `C.bgAlt` between sections (Experience on `bg`, Projects on `bgAlt`, etc.) — same rhythm as before, just with the new light values.

---

## 4. Chatbot — Merge Gateway Rewire

### 4.1 What changes and why

The current `ChatBot.js` calls `https://api.anthropic.com/v1/messages` directly from client-side `fetch`, with no API key attached (it would need one to work, and hardcoding it client-side is insecure). Replace this entirely with Merge Gateway, and move the actual API call server-side.

**Merge Gateway endpoint and shape** (confirmed by user, do not deviate):

```
POST https://api-gateway.merge.dev/v1/responses
Headers:
  Content-Type: application/json
  Authorization: Bearer {MERGE_GATEWAY_API_KEY}
Body:
{
  "input": [
    { "type": "message", "role": "user", "content": "..." }
  ],
  "stream": true,
  "include_routing_metadata": true,
  "model": "anthropic/claude-sonnet-5"
}
```

This is a **different request and response shape** than the old `/v1/messages` Anthropic-direct format:
- `messages: [...]` → `input: [...]`, with each item shaped `{ type: "message", role, content }`
- Response is **streaming** (`stream: true`) via server-sent events, not a single JSON blob — the frontend needs an event-stream reader, not a single `await response.json()`.
- `model` string is `"anthropic/claude-sonnet-5"` (Merge Gateway's provider-prefixed naming), not `"claude-sonnet-4-20250514"` as in the old code.
- `include_routing_metadata: true` is present in the confirmed request — pass it through even if unused by the frontend, since it was explicitly given as part of the working call shape.

### 4.2 Server-side requirement

The API key must never reach the client. Since this is currently a plain CRA app (no built-in API routes), scaffold a minimal serverless function for Vercel:

```
api/
  chat.js   — Vercel serverless function (Node runtime)
```

`api/chat.js` responsibilities:
1. Accept a POST request from the frontend containing just the conversation `messages` (role/content pairs) — nothing sensitive.
2. Read `MERGE_GATEWAY_API_KEY` from `process.env.MERGE_GATEWAY_API_KEY` (never from the request body, never hardcoded).
3. Construct the Merge Gateway request body in the exact shape from Section 4.1, mapping the frontend's simple message history into the `input: [{ type: "message", role, content }]` array.
4. Forward the streamed response back to the client (pipe the SSE stream through, or buffer and return once complete — buffering is acceptable for a v1 given the "reliability over cleverness" pattern used elsewhere in this user's other projects, but streaming is preferred if time allows, matching the UX of the old bubble's typing-dots loading state).
5. Never log or echo the API key in responses or error messages.

`.env` (create at project root, add to `.gitignore` if not already ignored):
```
MERGE_GATEWAY_API_KEY=your_key_here
```

Verify `.gitignore` contains `.env` and `.env.local` — CRA's default `.gitignore` from `create-react-app` already includes these, confirm and do not remove.

### 4.3 Frontend `ChatBot.js` changes

- Replace the `fetch("https://api.anthropic.com/v1/messages", ...)` call with `fetch("/api/chat", { method: "POST", body: JSON.stringify({ messages: newMessages }) })`.
- Keep the existing UI shell: message bubbles, loading dots, suggested chips, input field, send button — none of that changes visually except recoloring to the new monochrome palette (Section 3).
- Update response parsing to handle whatever shape `api/chat.js` returns (either a simple `{ text: "..." }` JSON after buffering server-side, or an SSE stream if implementing full streaming — pick buffering for v1 simplicity unless you have a clear SSE client pattern ready).
- Keep the existing `SYSTEM_PROMPT` content and `SUGGESTED_CHIPS` array, but **update `SYSTEM_PROMPT`** to reflect all the resume-sync content additions in Section 6 (Louisa AI, PM Bootcamp, Leadership, updated CompetitorPulse framing) — the chatbot's knowledge must match what's now on the page, or it will contradict the site.
- Keep the "CURRENT STATUS" line in the system prompt but update it: remove "Finishing Master's... graduating May 2026" (he has graduated as of May 2026) and reflect that he's currently engaged with Louisa AI while exploring full-time opportunities — see Section 6 leverage-framing note.

---

## 5. Repo / Live Links

Wire these into the relevant `ProjectCard`s as external link buttons/icons (GitHub icon + "View code" or similar, opening in a new tab):

- **Pantheon** → `https://github.com/salonisaraf30/spacetime`
- **Phinite / Poker AI** → `https://github.com/swooshie/poker-ai`
- **CompetitorPulse** → `https://github.com/salonisaraf30/que`
- **Homies** — no link, text-only (coursework project, no repo)
- **Medicare DHR & Triage** — no link, text-only (coursework project, no repo)

If a project has no link, do not render an empty/disabled link element — simply omit the link row entirely for that card.

---

## 6. Content Sync — Resume Alignment

### 6.1 Experience section — add Louisa AI

Add as the **most recent** entry (top of the Experience list, above CYJNA):

```js
{
  id: "louisa-ai",
  company: "Louisa AI",
  role: "Product Strategy & Growth Associate",
  period: "Mar 2026 – Present",
  brief: "Series A Goldman Sachs spin-out — designed outbound system architecture, SEO audit tooling, and PLG trial flow.",
  bullets: [
    "Designed end-to-end automated outbound system architecture using Claude API with MCP connectors and Apollo API, defining the data flow from prospect enrichment through scoring to personalized sequencing for 200+ prospects",
    "Mapped 50+ keyword gaps across 10+ competitors and 3 product verticals by building a Python-based SEO audit framework; restructured site content architecture and defined information hierarchy for improved discoverability",
    "Benchmarked inbound GTM funnels across 10 companies and 4 acquisition channels, surfacing 15+ conversion gaps; 3 prioritized for immediate implementation in the PLG trial redesign",
    "Designed PLG trial flow with activation event tracking, conversion triggers, and segment-specific onboarding paths, defining the technical requirements for engineering handoff",
  ],
  tags: ["GTM Strategy", "System Design", "SEO", "PLG", "AI/LLM"],
},
```

### 6.2 CompetitorPulse — correct the framing everywhere

**Critical accuracy rule, applies to the entire site (Projects card, Decision Log, Chatbot system prompt):** CompetitorPulse has **active beta testers, not paying customers.** The resume draft language ("paying customers across 3 pricing tiers") is inaccurate per the user's own standing correction and must NOT be used on the site. Use this corrected project description instead:

```js
{
  id: "competitorpulse",
  name: "CompetitorPulse",
  subtitle: "Co-founder & Product Lead · AI Competitive Intelligence SaaS",
  description: "AI-native competitive intelligence for bootstrapped founders — multi-agent LLM pipeline, freemium monetization with active beta testers, underserved SMB positioning.",
  dateLabel: "2025 – Present",
  tagType: "Shipped Product",
  bullets: [
    "Designed the system architecture: 7-agent LLM pipeline on NVIDIA Nemotron 70B with orchestrated prompt chains, MD5 content diffing for deduplication, and 6-hour scheduled scrape cycles — chose Nemotron over GPT-4/Claude based on context window size, cost-per-token economics, and output quality for structured competitive analysis",
    "Designed freemium monetization model with Stripe-integrated feature gating across $0 / $19 / $79 monthly plans, with active beta testers validating the core product loop",
    "Led 18-week agile roadmap across auth (Supabase), ingestion, AI pipeline, and billing workstreams for a 4-person team, maintaining parallel sprint execution with zero cross-team blockers",
    "Identified $0-to-enterprise pricing gap by benchmarking 6 CI tools (Crayon, Klue, Kompyte), positioning product for early-stage founders and SMBs with no AI-native competitor",
  ],
  tags: ["SaaS", "AI/LLM", "Monetization", "Competitive Analysis"],
  repoUrl: "https://github.com/salonisaraf30/que",
},
```

### 6.3 Projects — add Pantheon and Phinite

```js
{
  id: "pantheon",
  name: "Pantheon",
  subtitle: "Real-Time Multiplayer AI God Game · SpacetimeDB Hackathon",
  description: "Browser-based strategy simulation — four AI civilizations with autonomous decision-making, players cast miracles from their phones while a live big screen renders the world.",
  dateLabel: "Jun 2026",
  tagType: "Shipped Product",
  bullets: [
    "Architected the game on SpacetimeDB — a relational database running WebAssembly modules — eliminating a traditional game server entirely; scheduled reducers drive autonomous world simulation even with no clients connected",
    "Designed a rule-based fast path for stable AI civilizations and reserved Claude Sonnet 4.6 tool-use calls for moments of drama (miracles, wars, crises), batching multiple civs into a single API call per tick",
    "Built three simultaneous connected surfaces (big screen, phone god panel, join flow) all subscribing to the same real-time SpacetimeDB tables with zero explicit sync layer",
    "Designed 8 secret player win-conditions that structurally conflict with each other, creating emergent multiplayer tension from a simple rule set",
  ],
  tags: ["Multi-Agent AI", "Real-Time", "SpacetimeDB", "Next.js", "Game Design"],
  repoUrl: "https://github.com/salonisaraf30/spacetime",
},
{
  id: "phinite",
  name: "Phinite — Sealed-State Multi-Agent Simulation",
  subtitle: "Poker AI Hackathon Project",
  description: "Four AI agents with distinct personalities play scripted poker hands under real information asymmetry — a proof-of-concept for environments where agents must reason privately and compete adversarially.",
  dateLabel: "Jun 2026",
  tagType: "Shipped Product",
  bullets: [
    "Enforced sealed-state information structurally in the generation pipeline — no agent's prompt ever includes another agent's private hole cards, mirroring real negotiation/litigation information constraints",
    "Chose pre-generated, offline LLM calls over live generation for demo reliability, curation control, and instant static playback — traded generative spontaneity for guaranteed narrative quality under pitch conditions",
    "Designed 4 distinct agent personalities (pure math, aggressive bluffer, strict range player, pattern-exploiter) via system prompts, each producing consistent, readable reasoning for a non-technical audience",
    "Built a full audit trail logging every agent decision with reasoning text, tags, and context — a concrete demo of the accountability layer high-stakes AI deployments require",
  ],
  tags: ["Multi-Agent AI", "Sealed-State Reasoning", "Next.js", "Python", "Tool Use"],
  repoUrl: "https://github.com/swooshie/poker-ai",
},
```

### 6.4 Homies and Medicare — keep, tag as Coursework

Keep both exactly as currently written on the site, no content changes needed, but add:
```js
tagType: "Coursework",
dateLabel: "2024",   // Homies
```
```js
tagType: "Coursework",
dateLabel: "2025",   // Medicare
```

### 6.5 New Leadership section

Add a new section (`LeadershipSection.js`) between Decisions and Thinking (or wherever fits the visual rhythm — Skills is also a reasonable neighbor). Content:

```js
export const leadership = [
  {
    id: "nyu-pm-club",
    role: "Graduate Director",
    org: "NYU Product Management Club",
    period: "Sep 2025 – May 2026",
    bullets: [
      "Increased student attendance 40% and event count 30% by launching a graduate-focused vertical; attracted 500+ students across 7 PM events",
      "Converted insights from 80+ student interviews into targeted event production, marketing strategy, and programming across campus",
      "Secured $2K+ in sponsorships and hosted 25+ industry PMs by leading growth execution, partner outreach, and operations across NYU Brooklyn",
    ],
  },
  {
    id: "pm-bootcamp",
    role: "Co-Founder",
    org: "NYU Product Management Bootcamp",
    period: "May 2025 – May 2026",
    bullets: [
      "Founded the first graduate-level PM bootcamp at NYU (100+ surveyed, 50+ applicants, 25+ interviews, 9 selected), converting user research directly into curriculum design with continuous iteration from 10+ PM mentors",
      "Delivered a 7-session industry-led program partnering with PMs from Google, Microsoft, Meta, Capital One, Salesforce, Datadog, and Uber, driving cohort outcomes through 10+ project reviews, office hours, and structured feedback loops",
    ],
  },
];
```

Style this section consistent with `ExperienceSection` (card-per-entry, expandable bullets) rather than inventing a new visual pattern.

### 6.6 Education — add GPA/coursework line

Update the education entry for NYU to include:
```js
{
  school: "New York University",
  degree: "Masters in Management of Technology",
  period: "Sep 2024 – May 2026",
  note: "GPA: 3.3 · Coursework: Design Strategy, Big Data, Project Management, Marketing, Global Innovation · Graduate Director – PM Club · Marketing Coordinator – Student Leadership",
}
```

### 6.7 Hero copy — reflect graduation

Update the Hero intro paragraph. Remove any "currently completing" framing (he graduated May 2026). Do not say "unemployed" or "searching" anywhere — use active/leverage framing per the user's standing preference: he is currently engaged with Louisa AI while exploring full-time opportunities. Example rewrite (adjust to fit the new chat-first hero layout in Section 8.4):

> "I ship products — from research to specs to prototypes to measurable outcomes. NYU Master's in Management of Technology, currently building GTM systems at Louisa AI while exploring full-time product roles."

---

## 7. Decision Log — Unify Across Three Projects

Rename the section from "Decision Log · CompetitorPulse" to simply **"Decision Log"**. Combine entries from CompetitorPulse, Pantheon, and Phinite into a single `data/decisions.js` array. Each entry keeps the existing schema (`id, title, category, decision, alternatives, reasoning, constraint, outcome, icon`) but add a `project` field so the UI can show which project each decision belongs to (small label or filter, your call on exact placement — a small mono-font tag next to the category label is consistent with the existing card design).

**Keep the 5 existing CompetitorPulse entries as-is** (Nemotron, scrape cycle, Supabase, MD5 diffing, feature gating).

**Add these Pantheon entries:**

```js
{
  id: "spacetimedb-server",
  project: "Pantheon",
  title: "SpacetimeDB over a traditional game server",
  category: "Architecture",
  decision: "SpacetimeDB (database-as-server)",
  alternatives: ["Node.js game server + Redis", "Firebase Realtime DB", "Colyseus"],
  reasoning: "SpacetimeDB is a relational database that runs WebAssembly modules — all game logic (tables, reducers, scheduled timers) compiles to WASM and runs inside the database itself. This eliminates a traditional game server layer entirely. Clients subscribe to SQL queries and get real-time push updates via WebSocket with no polling and no REST endpoint for game state.",
  constraint: "The game needed to run autonomously — civilizations making decisions every 15 seconds even when no browser tabs are open. A traditional server-plus-database split would require a separate always-on process for this; SpacetimeDB's scheduled reducers handle it natively as part of the database itself.",
  outcome: "The Next.js frontend became fully stateless, existing only to serve pages and proxy AI API calls. The database is the single source of truth and the communication channel simultaneously — no Redux store, no custom sync logic.",
  icon: "🗄️",
},
{
  id: "rule-based-fast-path",
  project: "Pantheon",
  title: "Rule-based fast path over AI-for-everything",
  category: "AI Architecture",
  decision: "Rule-based decisions for stable civs, Claude reserved for drama",
  alternatives: ["Claude call for every civ every tick", "Fully deterministic, no AI at all"],
  reasoning: "Invoking Claude for every civilization on every 15-second tick would be slow, expensive, and would make AI behavior feel noisy rather than purposeful. Stable civilizations (no recent intervention, not at war, high stability) get an instant deterministic ruleBasedDecision() — expand to unclaimed adjacent territory, consolidate if weak.",
  constraint: "A live multiplayer demo cannot tolerate API latency on every world tick — four civilizations ticking every 15 seconds would mean constant AI calls even when nothing dramatically interesting was happening.",
  outcome: "Claude is invoked only for moments of drama — a god's miracle, a war breaking out, a crisis population — which makes every AI-generated moment feel purposeful rather than routine, while keeping the world responsive in real time.",
  icon: "⚡",
},
{
  id: "batched-ai-calls",
  project: "Pantheon",
  title: "Batched AI calls over per-civ API calls",
  category: "AI Architecture",
  decision: "One Claude tool-use call per tick, batching all civs needing AI",
  alternatives: ["Separate API call per civilization", "Sequential calls with retries"],
  reasoning: "Multiple civilizations needing AI in the same tick are batched into a single Claude call using a structured submit_decisions tool with tool_choice: 'any'. Claude receives each civ's persona, stat block, territory context, and recent miracle context in one prompt and returns an array of decisions.",
  constraint: "A 4-civ tick needing individual API calls would mean up to 4 round trips per tick, each adding latency and cost. The game needed a decision to feel prompt on a live projected screen.",
  outcome: "A full tick's AI decisions cost one API call, not four, and return in a single round trip — meaningfully faster and cheaper at no cost to decision quality.",
  icon: "📦",
},
```

**Add these Phinite entries:**

```js
{
  id: "pregenerated-vs-live",
  project: "Phinite",
  title: "Pre-generated playback over live generation",
  category: "Demo Architecture",
  decision: "Run all LLM calls offline, play back a static JSON file",
  alternatives: ["Live LLM calls during the demo", "Hybrid: live for some hands, scripted for others"],
  reasoning: "Demo reliability matters more than technical impressiveness — a live LLM call that times out or hallucinates mid-pitch kills the demo. Running everything offline first also allows curation: re-running until the reasoning, dramatic moments, and outcomes are all correct, rather than leaving the story to runtime randomness.",
  constraint: "The three-hand narrative arc (aggression establishes → exploitation follows → tilt punishes) had to land precisely for the pitch to work. Random or live-generated cards could not reliably reproduce that arc on demand.",
  outcome: "Static JSON playback with pre-rendered audio loads instantly with zero runtime AI dependency during the actual demo. A separate 'Ask the Agents' live-LLM feature was added post-demo specifically to still give judges a genuine live-AI interaction without risking the scripted sequence.",
  icon: "🎬",
},
{
  id: "sealed-state-enforcement",
  project: "Phinite",
  title: "Structural sealed-state enforcement",
  category: "Multi-Agent Architecture",
  decision: "Enforce private information at the call site, not via prompt instruction",
  alternatives: ["Trust the prompt to withhold other agents' cards", "Single shared context with instructions not to peek"],
  reasoning: "The core technical invariant is that no agent ever receives another agent's private information. This is enforced structurally in code — the format_state function includes action history (who bet how much) but never any agent's hole cards except the one currently being prompted, the same information structure a human player would have at the table.",
  constraint: "The entire product thesis — sealed-state multi-agent reasoning for environments like M&A negotiation or litigation strategy — depends on the private-information boundary being real, not just prompted. A prompt-level instruction is a suggestion; a data-access boundary is a guarantee.",
  outcome: "The sealed-state constraint is provably enforced at the code level, not just asserted in a system prompt — which is the actual technical differentiator the product pitch rests on.",
  icon: "🔒",
},
```

Update the `DecisionsSection` header copy to drop the CompetitorPulse-only framing:
```
SectionLabel: "Decision Log"
SectionTitle: "Every decision had a reason."
Subtext: "Building AI products under real constraints means making fast, often irreversible calls. Here's what I chose, what I rejected, and why — across CompetitorPulse, Pantheon, and Phinite."
```

---

## 8. Interactive Features (All Four, As Demoed)

### 8.1 Ink-cursor grain reveal (Hero)

A `<canvas>` layer sits behind the Hero's text content. On `mousemove` within the hero bounds, render a soft radial gradient plus a scatter of small dark dots (grain particles) centered on the cursor position, fading to transparent with distance. On `mouseleave`, the effect fades out (cursor position reset far off-canvas so the gradient/particles stop rendering).

Implementation notes:
- Canvas resizes to match its container on mount and on window resize.
- Use `requestAnimationFrame` for the render loop, not a fixed interval.
- Colors: `rgba(26,24,21, alpha)` at low alpha values (0.03–0.10) — this must read as subtle ink/grain, not a bold spotlight.
- Radial gradient radius ~100-120px, particle scatter radius similar, particle size ~1-1.5px.
- Must not interfere with pointer events on actual interactive elements (links, buttons, the chat input) layered above it — canvas should be `pointer-events: none` and positioned absolutely behind the content layer (`z-index: 1` for canvas, `z-index: 2` for content).
- This should NOT run on mobile/touch devices (no meaningful mousemove) — either skip mounting the canvas listener when `matchMedia('(pointer: coarse)')` is true, or accept it simply does nothing on touch (harmless either way, but skipping the mount is cleaner).

### 8.2 Interactive Decision Log tree

Each `DecisionCard` currently shows the chosen option plus a row of struck-through alternative tags. Change this interaction model:

- Alternative tags become clickable buttons (not just static struck-through text).
- Clicking an alternative reveals a short "why it lost" explanation beneath the decision badge row, replacing/updating in place (not stacking multiple open explanations — one active alternative shown at a time per card).
- The clicked alternative gets a visually active state (inverted fill: `C.ink` background, `C.bg` text) while others stay in their default bordered/muted state.
- Each decision entry's data needs a per-alternative reason. Extend the data schema:

```js
alternatives: [
  { name: "GPT-4 / GPT-4o", reason: "Stronger general reasoning, but weaker context handling for ingesting full competitor pages and changelogs at once. Also far more expensive per token for a bootstrapped free tier." },
  { name: "Claude (Anthropic)", reason: "Excellent reasoning quality, but the same cost problem as GPT-4 for a freemium product where the $0 tier had to stay solvent." },
  { name: "Open-source Llama", reason: "Cheapest option, but context handling for long competitive documents was measurably worse in testing." },
],
```
Apply this pattern (`{name, reason}` objects instead of plain strings) to **every** alternative across all decision entries added in Section 7 and the existing five CompetitorPulse entries — write a plausible one-sentence "why not" for each based on the existing `reasoning`/`constraint` text already in those entries if a dedicated reason isn't explicit.

- The existing "+ Why this call?" expand/collapse toggle (which reveals Reasoning / Constraint / Outcome) stays as-is and is independent of the new alternative-click interaction — both can be open at once.

### 8.3 Scroll-scrubbed project timeline

Above the Projects grid, render a thin horizontal line spanning the section width. As the user scrolls through the Projects section, a marker dot moves along this line proportional to scroll progress through that section, and a year label (e.g. "2024", "2025", "2026") near the timeline updates to reflect whichever project is currently most in view.

Implementation notes:
- Drive this off actual scroll position, not a slider (the slider was only a demo proxy for the mockup). Use `IntersectionObserver` on each `ProjectCard` (or the whole grid's scroll position relative to the section's bounding rect) to compute a 0–1 progress value, then map that to marker `left: X%` and the current year label.
- Sort `projects` array reverse-chronologically before rendering (most recent first: Pantheon/Phinite → CompetitorPulse → Medicare → Homies, using each project's `dateLabel`/underlying date for sort order).
- Each `ProjectCard` displays its `dateLabel` (e.g. "Jun 2026", "2025", "2024") as a small mono-font tag in the card header, consistent with the mockup — this is simpler than a full visual timeline running through the grid itself, and is required regardless of whether the scroll-marker strip is fully implemented.
- The marker/timeline strip is an enhancement on top of the per-card date tags, not a replacement for them.

### 8.4 Chatbot as hero centerpiece

Restructure `Hero.js` so the **primary interaction is the chat input**, not static bio prose:

- Top of hero: existing small mono-font eyebrow label ("Product manager · NYC · Open to relocate").
- Large italic serif headline: replace "Shreyam Borah" as the giant display headline with something like "Ask me anything about Shreyam." (exact copy at your discretion, keep it in the same italic Playfair Display treatment as before).
- Below the headline: a single-line text input styled as a bordered pill/rectangle (`1px solid C.ink`, `4-6px` radius) with a placeholder like "What makes him different from other PMs?" and an "Ask →" button inline at the right edge (solid `C.ink` fill).
- Below the input: a row of suggested-question chips (bordered, `C.ink` at reduced opacity, full opacity on hover) — reuse the existing `SUGGESTED_CHIPS` content from the old floating ChatBot.
- Submitting a question (via input+enter, the Ask button, or clicking a chip) shows the answer inline in a bordered white card directly below the input — not in a separate floating panel. This uses the same `/api/chat` call described in Section 4.
- Below all of this, a small muted mono-font line: "or scroll to browse experience, projects, and decisions the usual way ↓" — this is the fallback affordance for people who don't want to interrogate the chatbot and just want to skim.
- The old floating bottom-right chat bubble is **removed entirely** — there is only one chat surface now, and it lives in the hero.
- The stat row (30+ User Interviews / 40% Avg Improvement / etc.) and the "Get in touch" / "Book a call" buttons from the old Hero should move below the chat interaction (still on the hero, just beneath the fold of the primary chat prompt) rather than being cut — they're still valuable, just secondary to the chat-first framing now.
- The ink-cursor canvas (Section 8.1) sits behind this entire restructured hero.

---

## 9. Title Tag and Meta

In `public/index.html`, update:
```html
<title>Shreyam Borah — Product Manager</title>
<meta name="description" content="Shreyam Borah — Product Manager building AI-native tools. NYU Master's in Management of Technology." />
```
Do not leave "Aspiring PM" anywhere in the codebase, including meta tags, comments, or fallback strings.

---

## 10. Nav Items — Final List

With Teardowns removed and Leadership added, the final nav order is:

```
About, Experience, Projects, Decisions, Case Study, Leadership, Thinking, Skills, Contact
```

(Case Study = the existing CYJNA 4-phase interactive walkthrough, unchanged in content — just carried forward as-is from the current build.)

---

## 11. What Explicitly Does NOT Change

To avoid scope creep during implementation:
- CYJNA Case Study section (4-phase interactive stepper) — carry forward unchanged, just restyle colors to the new light palette.
- CYJNA and IIT Bombay and Caarya experience entries — unchanged content, just recolor.
- Skills section content — unchanged, just recolor.
- Contact section content and links — unchanged, just recolor.
- Essays/Thinking section — unchanged content, all three remain status "Draft," just recolor. Do not write full essay bodies as part of this pass.
- FadeIn scroll animation behavior/timing — unchanged.
- Font choices (Playfair Display / Outfit / JetBrains Mono) — unchanged, only the color values around them change.

---

## 12. Implementation Order (Suggested)

1. Scaffold `theme/tokens.js` with new light-mode values.
2. Extract `data/` files from the current inline arrays, applying the content updates from Section 6 and 7.
3. Split components per Section 1's file structure, recoloring everything to the new tokens as you go.
4. Remove Teardowns entirely.
5. Build `api/chat.js` serverless function and rewire `ChatBot.js` to call it (Section 4).
6. Restructure `Hero.js` into the chat-centerpiece layout (Section 8.4), wiring in `InkCanvas.js` (Section 8.1).
7. Add interactivity to `DecisionCard.js` (Section 8.2).
8. Add `ProjectTimeline.js` and per-card date tags (Section 8.3).
9. Add `LeadershipSection.js` (Section 6.5) and wire into `App.js` + `Nav.js`.
10. Fix `public/index.html` title/meta (Section 9).
11. Full pass: verify every color reference in every component resolves through `theme/tokens.js`, nothing hardcoded from the old dark palette remains.
12. `git init` the repo if not already done, add `.env`/`.env.local` to `.gitignore`, confirm `.env` is not committed.

---

## 13. Definition of Done

- No dark-mode colors (`#0B0B0D`, `#E06840`, etc.) remain anywhere in the codebase.
- No Teardowns content, component, or nav item remains.
- Chatbot calls `/api/chat`, which calls Merge Gateway server-side with the key read from an environment variable — no key in client code, no key in git history.
- Louisa AI appears in Experience, Leadership section exists with both entries, CompetitorPulse copy says "beta testers" nowhere says "paying customers."
- Pantheon and Phinite appear in Projects with correct repo links, correct June 2026 date tags, and their Decision Log entries appear in the unified Decision Log.
- Homies and Medicare remain, tagged "Coursework," no repo link rendered.
- Decision Log alternatives are clickable and reveal per-alternative reasoning.
- Projects show date tags and are sorted reverse-chronologically; a scroll-driven timeline marker works across the section.
- Hero is chat-first: headline invites a question, input + chips are the primary interaction, old floating bubble is gone.
- Ink-cursor canvas responds to mouse movement behind the hero content, does nothing/doesn't error on touch devices.
- Title tag no longer says "Aspiring PM."
