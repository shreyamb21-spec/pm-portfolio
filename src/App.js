import { useState, useEffect, useRef } from "react";

// ─── COLORS & DESIGN TOKENS ────────────────────────────────────
const C = {
  bg: "#0B0B0D",
  bgAlt: "#111114",
  card: "#161619",
  cardHover: "#1C1C20",
  accent: "#E06840",
  accentGlow: "rgba(224,104,64,0.15)",
  accentBorder: "rgba(224,104,64,0.35)",
  cream: "#EDE9E3",
  text: "#C8C4BE",
  muted: "#7A7874",
  dim: "#4A4844",
  border: "#252528",
  green: "#4ADE80",
  greenGlow: "rgba(74,222,128,0.12)",
  red: "#F87171",
  redGlow: "rgba(248,113,113,0.1)",
  blue: "#60A5FA",
  blueGlow: "rgba(96,165,250,0.1)",
};

const FONT = {
  display: "'Playfair Display', serif",
  body: "'Outfit', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// ─── DATA ───────────────────────────────────────────────────
const user = {
  name: "Shreyam Borah",
  title: "Product Manager",
  location: "New York City, NY",
  email: "shreyamb21@gmail.com",
  linkedin: "https://linkedin.com/in/shreyamborah/",
  resume: "https://drive.google.com/file/d/1fLnOrQAxfHkhOivJB-zpaPlJtjyYe7PF/view?usp=sharing",
  calendly: "https://calendly.com/sb10286-nyu/30min",
};

const experience = [
  {
    id: "cyjna",
    company: "CYJNA Research Foundation",
    role: "Product Analyst",
    period: "Sep 2025 – Dec 2025",
    brief: "Validated a language-learning PWA for 50K NYC delivery workers — from user interviews to shipped prototype.",
    bullets: [
      "Interviewed 15+ Chinese NYC delivery workers, linking language gaps to lower ratings/tips; sized SOM at 50K workers",
      "Selected QR-based PWA (no signup/download); hit 30-sec scan-to-first-use and 90% task completion targets",
      "Built adaptive micro-lessons + Gemini-powered chat assistant; validated 3-sec AI response time with offline caching",
      "Shipped demo-ready prototype on Vercel; rollout via WeChat groups + QR codes at restaurant pickup spots",
    ],
    tags: ["User Research", "MVP Scoping", "PWA", "AI/LLM", "Vercel"],
  },
  {
    id: "iitb",
    company: "IIT Bombay",
    role: "Technical Analyst",
    period: "Jan 2024 – Jun 2024",
    brief: "Led a Unity simulation for truckload optimization — cut testing cycles 40% with modular design.",
    bullets: [
      "Led ideation and development of Unity-based simulation enabling what-if analysis, cutting testing cycles by 40%",
      "Built interactive UI (shipment selectors, rotation tools, camera systems) improving simulation accuracy 30%",
      "Defined requirements with PhD researchers; documented in Confluence; delivered JSON-based prototype for pilot",
    ],
    tags: ["Unity", "C#", "Confluence", "Requirements Docs", "Simulation"],
  },
  {
    id: "caarya",
    company: "Caarya",
    role: "Product Intern",
    period: "Jun 2023 – Dec 2023",
    brief: "Ran user research, built KPI dashboards, launched targeted campaigns — 30% more qualified leads.",
    bullets: [
      "Conducted 30+ user interviews synthesizing pain points, JTBD, and willingness-to-pay into MVP requirements",
      "Built Excel KPI dashboards (pipeline health, conversion, turnaround time) — 15% reduction in project delays",
      "Designed and launched 3 targeted campaigns cross-functionally, increasing qualified leads by 30%",
    ],
    tags: ["User Research", "KPI Dashboards", "Campaigns", "Excel", "Agile"],
  },
];

const projects = [
  {
    id: "competitorpulse",
    name: "CompetitorPulse",
    subtitle: "Co-founder & Product Lead · AI Competitive Intelligence SaaS",
    description: "AI-native competitive intelligence for bootstrapped founders — multi-agent LLM pipeline, freemium monetization, underserved SMB positioning.",
    bullets: [
      "Defined requirements for 7-agent LLM pipeline (NVIDIA Nemotron 70B) with MD5 content diffing and 6-hour scrape cycles",
      "Designed freemium model with Stripe-integrated feature gating across $0 / $19 / $79 monthly plans",
      "Led 18-week agile roadmap for 4-person team across auth, ingestion, AI pipeline, and billing workstreams",
      "Benchmarked 6 CI tools (Crayon, Klue, Kompyte) to capture underserved SMB segment with no AI-native competitor",
    ],
    tags: ["SaaS", "AI/LLM", "Monetization", "Competitive Analysis"],
    featured: true,
  },
  {
    id: "medicare",
    name: "Medicare DHR & Triage",
    subtitle: "Project Management · AI Health Records",
    description: "AI symptom intake and patient triage system — $1.5M budget, PMBOK methodology, pilot-ready.",
    bullets: [
      "Planned product digitizing records + AI triage to route patients by urgency and reduce front-desk load",
      "Built 6-month roadmap ($1.5M) using PMBOK: Project Charter, WBS, MS Project schedule",
      "Defined pilot criteria: >85% triage accuracy, >40% faster onboarding, >90% staff adoption",
    ],
    tags: ["Healthcare", "PMBOK", "AI", "Budgeting"],
    featured: false,
  },
  {
    id: "homies",
    name: "Homies",
    subtitle: "Product Design & GTM · Fintech",
    description: "First-time homebuyer platform for NYC — gamified savings + seller-bank connections for affluent families.",
    bullets: [
      "Led product design addressing gaps in collaborative savings, credit building, and property financing",
      "Planned 2 MVP features: gamified savings tool + seller-bank connector covering broker fees",
      "Sized $119M/yr NYC metro TAM; developed GTM with referral programs and B2B2C partnerships",
    ],
    tags: ["Product Design", "GTM", "Market Sizing", "Fintech"],
    featured: false,
  },
];

// ─── PRODUCT TEARDOWNS DATA ─────────────────────────────────────
const teardowns = [
  {
    id: "loom",
    product: "Loom",
    tagline: "AI editing is brilliant. But who is it actually for?",
    verdict: "Strong feature, wrong framing",
    verdictColor: C.accent,
    context: "Loom (now Atlassian) rolled out AI-powered editing: edit-by-transcript, filler word removal, auto-titles, chapters, summaries, and multi-language transcription across 50+ languages. You can literally delete a word from a transcript and the video cuts itself.",
    thesis: "Loom's AI features solve a real pain — nobody wants to re-record a 5-minute walkthrough because they said \"um\" twelve times. Edit-by-transcript is genuinely magical: select a sentence in text, hit delete, and the video cuts itself. That's a workflow revolution for async teams.",
    critique: "But here's what Loom gets wrong: they're positioning these as \"AI features\" when they should be positioning them as \"editing for non-editors.\" The power user already has Descript or Premiere. The casual user — the PM recording a quick Loom for their team — doesn't think of themselves as someone who \"edits videos.\" Loom needs to make editing invisible, not featured. Auto-remove filler words by default. Auto-generate chapters without asking. The best AI feature is one users never have to think about.",
    opportunity: "The real unlock is turning every Loom into a structured artifact — auto-extract action items, auto-tag stakeholders, auto-create follow-up tasks in Jira/Asana. That's where the Atlassian acquisition makes Loom dangerous. Not as a video tool, but as an async communication engine.",
    rating: "B+",
  },
  {
    id: "cursor",
    product: "Cursor",
    tagline: "The IDE that makes developers question their job security.",
    verdict: "Category-defining, existential implications",
    verdictColor: C.green,
    context: "Cursor is an AI-native IDE built on VS Code that integrates with your full codebase via GitHub. It offers multi-model support (GPT-4o, Claude, custom models), deep codebase understanding, and can generate, refactor, and debug across multi-file projects — not just autocomplete.",
    thesis: "Cursor's GitHub integration isn't just a feature — it's the entire moat. By indexing your full codebase, Cursor doesn't just suggest the next line; it understands your architecture, your patterns, your dependencies. It's the difference between a copilot that knows English and one that knows YOUR language. This makes shipping new features absurdly fast.",
    critique: "The uncomfortable truth: Cursor is making a large chunk of traditional software development irrelevant. Not \"assisted\" — irrelevant. When a PM can describe a feature in natural language and get production-quality code, the value shifts from writing code to knowing what to build. The 10x engineer becomes the engineer with the best product instincts, not the best syntax recall.",
    opportunity: "Where Cursor hasn't fully cracked it yet: team-level context. Individual developers get supercharged, but shared architectural decisions, team conventions, and cross-repo dependencies still require human coordination. The company that solves collaborative AI-assisted development — where Cursor understands your whole org's codebase — wins the next decade of developer tools.",
    rating: "A",
  },
  {
    id: "spotify",
    product: "Spotify",
    tagline: "Built every social feature. Users ignored all of them.",
    verdict: "Social features exist but don't solve a real JTBD",
    verdictColor: C.red,
    context: "Spotify has built friends lists, direct messaging, listening activity sharing, collaborative playlists, Jam sessions (up to 32 users), podcast comments, and integrations with TikTok and Instagram for sharing. Jam daily active users have doubled YoY.",
    thesis: "Spotify keeps building social features because the data says social users retain better. And they're right — people who share music DO stick around. But correlation isn't causation. Users who share music are already power users. The social features aren't causing retention; they're a symptom of it.",
    critique: "The fundamental JTBD mismatch: nobody opens Spotify thinking \"I want to socialize.\" They open it thinking \"I want to listen.\" Adding DMs to Spotify is like adding a chat feature to your calculator app — technically possible, but violates the core mental model. Users already have iMessage, WhatsApp, and Instagram for sharing songs. Spotify's DMs compete with platforms that own the social graph, which is a fight they can't win.",
    opportunity: "What Spotify should do instead: lean into passive social — make discovery social without requiring active participation. Blend friends' listening data into your recommendations silently. Show \"3 friends listened to this\" as a discovery signal, not a notification. Think less \"social network\" and more \"social layer on a listening engine.\" The Jam feature actually gets this right — it's social AND listening-first.",
    rating: "C+",
  },
];

// ─── DECISION LOG DATA ──────────────────────────────────────────
const decisions = [
  {
    id: "nemotron",
    title: "Nemotron 70B over GPT-4 / Claude",
    category: "AI Architecture",
    decision: "NVIDIA Nemotron 70B",
    alternatives: ["GPT-4 / GPT-4o", "Claude (Anthropic)", "Open-source Llama"],
    reasoning: "Nemotron 70B offered a significantly better context window for competitor analysis tasks — we needed to ingest and compare entire website pages, press releases, and product changelogs simultaneously. GPT-4 and Claude had stronger general reasoning, but for our specific use case (structured extraction from long competitive documents), Nemotron's context handling was measurably better.",
    constraint: "As a bootstrapped startup, API costs were existential. Nemotron's pricing was dramatically cheaper per token than GPT-4, and our freemium model meant we needed to serve the $0 tier without bleeding cash. We needed a model that was economical enough that startup founders — who wouldn't spend much on competitive analysis — could actually use the product affordably.",
    outcome: "Lower per-query cost enabled viable free tier serving. Feature gating by plan tier ($0 / $19 / $79) created natural upgrade pressure without the AI costs making the free tier unsustainable.",
    icon: "🧠",
  },
  {
    id: "scrape-cycle",
    title: "6-hour scrape cycles (not real-time, not daily)",
    category: "Retention & Engagement",
    decision: "6-hour refresh cadence",
    alternatives: ["Real-time monitoring", "Daily digests", "On-demand scraping"],
    reasoning: "6-hour cycles were a deliberate retention mechanism: users had a reason to check back multiple times per day to see what changed. Real-time would overwhelm users with noise. Daily was too slow — by the time you see a competitor's pricing change 24 hours later, you've already lost.",
    constraint: "We also had to balance scrape frequency against infrastructure costs (5 data sources × multiple competitors per user) and rate-limiting from target sites. 6 hours was the sweet spot where we could deliver fresh intelligence without getting blocked or burning through Vercel compute.",
    outcome: "Created a natural check-in habit. Users opened the dashboard 2-3x/day, which drove engagement metrics for fundraising conversations and gave us a built-in retention loop at zero marketing cost.",
    icon: "⏱️",
  },
  {
    id: "supabase",
    title: "Supabase over Firebase",
    category: "Infrastructure",
    decision: "Supabase + Vercel",
    alternatives: ["Firebase + GCP", "AWS Amplify", "PlanetScale + Vercel"],
    reasoning: "Supabase was significantly easier to integrate with Vercel and our Next.js frontend — the Cursor + Vercel + Supabase stack let us ship features in hours instead of days. Row-Level Security (RLS) policies gave us team-based data isolation for free, which was critical for our multi-tenant SaaS.",
    constraint: "We were a 4-person team building across auth, ingestion, AI pipeline, and billing simultaneously. Any infrastructure decision that added configuration overhead was a non-starter. Supabase's Postgres foundation also meant we could write raw SQL for complex queries instead of being locked into Firebase's document model.",
    outcome: "Zero cross-team blockers across 18-week sprint execution. RLS policies directly enabled our feature gating: team data access was a Supabase policy toggle, not a custom auth layer.",
    icon: "🏗️",
  },
  {
    id: "md5-diffing",
    title: "MD5 content diffing for change detection",
    category: "Data Pipeline",
    decision: "MD5 hash comparison",
    alternatives: ["Semantic similarity (embeddings)", "Full-text diff", "Screenshot comparison"],
    reasoning: "MD5 hashing was the pragmatic choice for detecting content changes across 5 scraped data sources. Semantic similarity would catch paraphrases but was computationally expensive per scrape cycle and introduced false positives. We needed binary signal: did this page change or not? MD5 answered that in milliseconds.",
    constraint: "With 6-hour scrape cycles across multiple competitors per user, we needed change detection that was fast and cheap. Running embedding comparisons on every scraped page every 6 hours would have blown our compute budget. MD5 gave us O(1) comparison with zero ambiguity.",
    outcome: "Reduced signal-to-insight latency from days to hours. Only pages with confirmed changes were sent through the expensive LLM analysis pipeline, keeping per-user costs viable for the free tier.",
    icon: "🔍",
  },
  {
    id: "feature-gating",
    title: "Freemium with Stripe feature gating",
    category: "Monetization",
    decision: "$0 / $19 / $79 tiered model",
    alternatives: ["Usage-based pricing", "Flat enterprise pricing", "Freemium + credits"],
    reasoning: "We identified a gap between $0 and enterprise-level pricing ($50K+/yr) when benchmarking Crayon, Klue, and Kompyte. No AI-native tool targeted early-stage founders and SMBs who needed competitive intelligence but couldn't justify enterprise spend. Tiered feature gating (competitor limits, digest access, team RLS policies) created natural upgrade pressure.",
    constraint: "The free tier had to be genuinely useful — not a demo — so founders would actually adopt it, then hit the gate when they needed more competitors or team features. Stripe integration with Supabase RLS made tier enforcement automatic rather than requiring custom middleware.",
    outcome: "Clear tier separation targeting underserved SMB segment. Free tier drove adoption; $19 tier captured serious individual users; $79 tier served small teams with shared dashboards and multi-competitor tracking.",
    icon: "💰",
  },
];

// ─── CYJNA CASE STUDY DATA ──────────────────────────────────────
const caseStudySteps = [
  {
    phase: "01",
    title: "Problem Discovery",
    label: "The Insight",
    content: "50,000 Chinese delivery workers in NYC face a hidden barrier: limited English proficiency directly correlates with lower customer ratings, fewer tips, and job insecurity. Existing language apps don't address real delivery scenarios — they teach \"tourist English,\" not \"your order is at the door\" English.",
    evidence: "15+ in-depth interviews with delivery workers across NYC revealed the pattern: workers with better English earned 20-30% more in tips and had significantly higher ratings.",
    keyDecision: null,
  },
  {
    phase: "02",
    title: "Architecture Decision",
    label: "The Bet",
    content: "We chose a QR-based Progressive Web App — no signup, no app store download. Workers scan a code at a restaurant pickup spot and they're learning within 30 seconds. This was controversial: a native app would have better performance and push notifications.",
    evidence: null,
    keyDecision: "PWA over native app. Our users were time-poor, skeptical of new apps, and many had limited phone storage. The friction of an App Store download would have killed adoption. We bet that 30-second time-to-value would beat long-term native features — and prototype testing proved us right with 90% task completion.",
  },
  {
    phase: "03",
    title: "Core Experience",
    label: "The Build",
    content: "Three features made the cut: adaptive micro-lessons targeted at real delivery vocabulary, pronunciation support for high-stakes phrases, and a Gemini-powered AI chat assistant that simulated actual delivery conversations — \"customer says the address is wrong, what do you say?\"",
    evidence: "We validated 3-second AI response time as the threshold — anything slower broke the conversational flow. Built offline caching for dead zones (elevator shafts, subway-level restaurants) where workers lose signal during pickups.",
    keyDecision: "Cut gamification entirely. Early interviews showed workers wanted efficiency, not badges. Every screen had to answer: \"will this help me on my next delivery?\"",
  },
  {
    phase: "04",
    title: "Distribution Strategy",
    label: "The Rollout",
    content: "Traditional app marketing was irrelevant for this audience. We designed distribution around existing worker infrastructure: QR codes placed at restaurant pickup spots (where workers wait 5-10 minutes), and word-of-mouth through WeChat groups — the platform where this community already communicates.",
    evidence: null,
    keyDecision: "WeChat groups over paid acquisition. Zero CAC strategy: workers share useful tools within their community organically. Next validation step: 50+ worker pilot to measure real-world confidence improvement and rating changes.",
  },
];

// ─── WRITING / THINKING DATA ────────────────────────────────────
const essays = [
  {
    id: "ai-ci",
    title: "The $50K Blind Spot in Competitive Intelligence",
    subtitle: "Why bootstrapped founders deserve better than spreadsheets",
    preview: "Enterprise CI tools like Crayon and Klue charge $50K+/year. Founders with $0 in their CI budget use Google Alerts and shared docs. I built a product for the gap in between — and learned that the real competitive advantage isn't the data, it's how fast you can act on it.",
    tags: ["Competitive Intelligence", "SaaS", "Pricing Strategy"],
    status: "Draft",
  },
  {
    id: "ai-jobs",
    title: "AI Isn't Replacing PMs. It's Exposing Bad Ones.",
    subtitle: "How AI tools are reshaping what \"product skills\" actually means",
    preview: "When Cursor can ship a feature from a natural language description, the PM who only writes tickets becomes redundant. But the PM who understands user pain, makes hard tradeoffs, and defines what NOT to build becomes 10x more valuable. AI is a filter, not a replacement.",
    tags: ["AI", "Product Management", "Career"],
    status: "Draft",
  },
  {
    id: "non-english",
    title: "Building for Users Who Don't Look Like Your Personas",
    subtitle: "Lessons from designing a PWA for NYC delivery workers",
    preview: "My user wasn't a 28-year-old tech worker in San Francisco. He was a 45-year-old delivery driver who spoke Mandarin, had 2GB of free storage on his phone, and needed to learn \"your order is ready\" before his next pickup. Every design assumption I had was wrong.",
    tags: ["User Research", "Inclusion", "PWA"],
    status: "Draft",
  },
];

const skills = {
  product: ["Product Strategy", "User Research", "Market Research", "PRD Writing", "Agile/Scrum", "A/B Testing", "UX/UI Design", "Roadmapping"],
  technical: ["MySQL", "Python", "Tableau", "Power BI", "Excel", "Google Analytics", "Figma", "Jira", "Confluence"],
  building: ["Next.js/React", "Vercel", "C# (Unity)", "Supabase", "Stripe", "Google Workspace", "GitHub"],
};

const education = [
  { school: "New York University", degree: "Masters in Management of Technology", period: "Sep 2024 – May 2026", note: "Graduate Director – PM Club · Marketing Coordinator – Student Leadership" },
  { school: "Somaiya Vidyavihar University", degree: "B.Tech Computer Engineering · Minor in AR/VR", period: "Sep 2020 – Jun 2024", note: null },
];


// ─── UTILITY COMPONENTS ─────────────────────────────────────────

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s` }}>
      {children}
    </div>
  );
};

const SectionLabel = ({ text }) => (
  <p style={{ fontFamily: FONT.mono, fontSize: "0.7rem", fontWeight: 500, color: C.accent, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "0.75rem" }}>{text}</p>
);

const SectionTitle = ({ children }) => (
  <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.cream, fontWeight: 400, lineHeight: 1.15, marginBottom: "2.5rem", letterSpacing: "-0.02em", fontStyle: "italic" }}>{children}</h2>
);

const Tag = ({ children, color = C.accent, bg = C.accentGlow }) => (
  <span style={{ fontFamily: FONT.mono, fontSize: "0.65rem", fontWeight: 600, color, background: bg, padding: "0.3rem 0.7rem", borderRadius: 3, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>
);

const Divider = () => (
  <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`, margin: "0" }} />
);


// ─── NAVIGATION ─────────────────────────────────────────────────
const NAV_ITEMS = ["About", "Experience", "Projects", "Teardowns", "Decisions", "Case Study", "Thinking", "Skills", "Contact"];

const Nav = ({ active, setActive }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(11,11,13,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: FONT.display, fontSize: "1.3rem", color: C.cream, fontStyle: "italic" }}>SB</span>
        <div style={{ display: "flex", gap: "0.25rem", overflowX: "auto", maxWidth: "calc(100vw - 200px)" }}>
          {NAV_ITEMS.map((s) => (
            <button key={s} onClick={() => {
              setActive(s);
              document.getElementById(s.toLowerCase().replace(/\s/g, "-"))?.scrollIntoView({ behavior: "smooth" });
            }} style={{
              background: "none", border: "none", fontFamily: FONT.body, fontSize: "0.75rem", fontWeight: 500,
              color: active === s ? C.accent : C.muted, cursor: "pointer", padding: "0.5rem 0.65rem",
              transition: "color 0.2s", letterSpacing: "0.02em", whiteSpace: "nowrap",
            }}>
              {s}
            </button>
          ))}
        </div>
        <a href={user.resume} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: FONT.mono, fontSize: "0.7rem", fontWeight: 600, color: C.bg,
          background: C.cream, padding: "0.45rem 1rem", borderRadius: 4, letterSpacing: "0.04em", textDecoration: "none",
        }}>
          RESUME ↗
        </a>
      </div>
    </nav>
  );
};


// ─── HERO ───────────────────────────────────────────────────────
const Hero = () => (
  <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "7rem 2rem 4rem", position: "relative", overflow: "hidden" }}>
    {/* Subtle grain overlay */}
    <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", pointerEvents: "none" }} />
    {/* Accent glow */}
    <div style={{ position: "absolute", top: "10%", right: "-10%", width: 500, height: 500, background: `radial-gradient(circle, ${C.accentGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />

    <div style={{ maxWidth: 840, margin: "0 auto", width: "100%", position: "relative" }}>
      <FadeIn>
        <p style={{ fontFamily: FONT.mono, fontSize: "0.75rem", color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Product Manager · NYC · Open to Relocate
        </p>
      </FadeIn>
      <FadeIn delay={0.08}>
        <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(3.5rem, 7vw, 6rem)", fontWeight: 400, lineHeight: 1.0, color: C.cream, marginBottom: "1.75rem", letterSpacing: "-0.03em" }}>
          Shreyam<br /><span style={{ fontStyle: "italic" }}>Borah</span>
        </h1>
      </FadeIn>
      <FadeIn delay={0.16}>
        <p style={{ fontFamily: FONT.body, fontSize: "1.15rem", lineHeight: 1.75, color: C.text, maxWidth: 600, marginBottom: "3rem" }}>
          I ship products — from research to specs to prototypes to measurable outcomes. NYU Master's in Management of Technology,
          with experience building AI-powered SaaS, running user research with non-English-speaking gig workers, and leading
          agile teams from zero to launch.
        </p>
      </FadeIn>
      <FadeIn delay={0.24}>
        <div style={{ display: "flex", gap: "3.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          {[
            { v: "30+", l: "User Interviews" },
            { v: "40%", l: "Avg. Improvement" },
            { v: "18wk", l: "Longest Roadmap" },
            { v: "$1.5M", l: "Largest Budget" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: FONT.display, fontSize: "2.25rem", color: C.cream, fontStyle: "italic" }}>{s.v}</span>
              <span style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.dim, textTransform: "uppercase", letterSpacing: "0.12em", marginTop: "0.3rem" }}>{s.l}</span>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.32}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href={`mailto:${user.email}`} style={{ fontFamily: FONT.body, fontSize: "0.9rem", fontWeight: 600, color: "white", background: C.accent, padding: "0.85rem 2rem", borderRadius: 6, textDecoration: "none", transition: "transform 0.2s", display: "inline-block" }}>Get in touch</a>
          <a href={user.calendly} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT.body, fontSize: "0.9rem", fontWeight: 500, color: C.cream, border: `1px solid ${C.border}`, padding: "0.85rem 2rem", borderRadius: 6, textDecoration: "none" }}>Book a call ↗</a>
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── EXPERIENCE ─────────────────────────────────────────────────
const ExpCard = ({ exp }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.card, border: `1px solid ${open ? C.accentBorder : C.border}`, borderRadius: 10, padding: "1.75rem 2rem", transition: "border-color 0.3s, transform 0.2s", cursor: "default" }}
      onMouseEnter={(e) => { if (!open) e.currentTarget.style.borderColor = C.accentBorder; }}
      onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = C.border; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{exp.period}</p>
          <h3 style={{ fontFamily: FONT.body, fontSize: "1.15rem", fontWeight: 600, color: C.cream, marginBottom: "0.15rem" }}>{exp.role}</h3>
          <p style={{ fontFamily: FONT.body, fontSize: "0.9rem", color: C.accent, fontWeight: 500 }}>{exp.company}</p>
        </div>
        <button onClick={() => setOpen(!open)} style={{ background: C.cardHover, border: `1px solid ${C.border}`, color: C.muted, width: 32, height: 32, borderRadius: 6, fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {open ? "−" : "+"}
        </button>
      </div>
      <p style={{ fontFamily: FONT.body, fontSize: "0.9rem", color: C.text, lineHeight: 1.6, marginTop: "0.75rem" }}>{exp.brief}</p>
      {open && (
        <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: `1px solid ${C.border}` }}>
          {exp.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.6rem" }}>
              <span style={{ color: C.accent, fontSize: "0.7rem", marginTop: "0.35rem", flexShrink: 0 }}>▸</span>
              <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.6 }}>{b}</p>
            </div>
          ))}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1rem" }}>
            {exp.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
      )}
    </div>
  );
};

const ExperienceSection = () => (
  <section id="experience" style={{ padding: "6rem 2rem", background: C.bg }}>
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <FadeIn><SectionLabel text="Experience" /><SectionTitle>Where I've built things</SectionTitle></FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {experience.map((exp, i) => (
          <FadeIn key={exp.id} delay={i * 0.08}><ExpCard exp={exp} /></FadeIn>
        ))}
      </div>
    </div>
  </section>
);


// ─── PROJECTS ───────────────────────────────────────────────────
const ProjectCard = ({ p, featured }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: featured ? C.bg : C.card,
      border: `1px solid ${featured ? C.accentBorder : C.border}`,
      borderRadius: 12, padding: featured ? "2.5rem" : "2rem",
      position: "relative",
      ...(featured ? { gridColumn: "1 / -1" } : {}),
    }}>
      {featured && <span style={{ fontFamily: FONT.mono, fontSize: "0.6rem", fontWeight: 700, color: C.bg, background: C.accent, padding: "0.25rem 0.7rem", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem", display: "inline-block" }}>Featured Project</span>}
      <h3 style={{ fontFamily: FONT.display, fontSize: featured ? "1.8rem" : "1.35rem", color: C.cream, fontWeight: 400, fontStyle: "italic", marginBottom: "0.3rem" }}>{p.name}</h3>
      <p style={{ fontFamily: FONT.mono, fontSize: "0.7rem", color: C.accent, marginBottom: "0.75rem", letterSpacing: "0.04em" }}>{p.subtitle}</p>
      <p style={{ fontFamily: FONT.body, fontSize: "0.9rem", color: C.text, lineHeight: 1.65, marginBottom: "1rem", maxWidth: featured ? 700 : "100%" }}>{p.description}</p>
      <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", fontFamily: FONT.mono, fontSize: "0.75rem", color: C.accent, fontWeight: 600, cursor: "pointer", padding: 0, marginBottom: "0.75rem" }}>
        {open ? "— Hide details" : "+ View details"}
      </button>
      {open && (
        <div style={{ marginBottom: "1rem", paddingTop: "1rem", borderTop: `1px solid ${C.border}` }}>
          {p.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.6rem" }}>
              <span style={{ color: C.accent, fontSize: "0.7rem", marginTop: "0.35rem", flexShrink: 0 }}>▸</span>
              <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.6 }}>{b}</p>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
    </div>
  );
};

const ProjectsSection = () => (
  <section id="projects" style={{ padding: "6rem 2rem", background: C.bgAlt }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <FadeIn><SectionLabel text="Projects" /><SectionTitle>Things I've launched</SectionTitle></FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "1.25rem" }}>
        {projects.filter(p => p.featured).map(p => <FadeIn key={p.id}><ProjectCard p={p} featured /></FadeIn>)}
        {projects.filter(p => !p.featured).map((p, i) => <FadeIn key={p.id} delay={i * 0.08}><ProjectCard p={p} /></FadeIn>)}
      </div>
    </div>
  </section>
);


// ─── PRODUCT TEARDOWNS ──────────────────────────────────────────
const TeardownCard = ({ t }) => {
  const [open, setOpen] = useState(false);
  const ratingColor = t.rating.startsWith("A") ? C.green : t.rating.startsWith("B") ? C.accent : C.red;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.3s" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.accentBorder)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}>

      {/* Header */}
      <div style={{ padding: "2rem 2rem 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
          <div>
            <h3 style={{ fontFamily: FONT.display, fontSize: "1.6rem", color: C.cream, fontWeight: 400, fontStyle: "italic" }}>{t.product}</h3>
            <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.muted, marginTop: "0.25rem" }}>{t.tagline}</p>
          </div>
          <span style={{ fontFamily: FONT.display, fontSize: "2rem", fontWeight: 400, color: ratingColor, fontStyle: "italic", lineHeight: 1 }}>{t.rating}</span>
        </div>
        <div style={{ display: "inline-block", background: `${t.verdictColor}15`, border: `1px solid ${t.verdictColor}30`, borderRadius: 4, padding: "0.35rem 0.75rem", marginBottom: "1.25rem" }}>
          <span style={{ fontFamily: FONT.mono, fontSize: "0.65rem", fontWeight: 600, color: t.verdictColor, textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.verdict}</span>
        </div>
      </div>

      {/* Context */}
      <div style={{ padding: "0 2rem 1.5rem" }}>
        <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.65 }}>{t.context}</p>
      </div>

      {/* Expand */}
      <div style={{ padding: "0 2rem 1.5rem" }}>
        <button onClick={() => setOpen(!open)} style={{
          background: "none", border: "none", fontFamily: FONT.mono, fontSize: "0.75rem", fontWeight: 600,
          color: C.accent, cursor: "pointer", padding: 0,
        }}>
          {open ? "— Collapse analysis" : "+ Read full analysis"}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: "1.5rem 2rem 2rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.green, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>What's Working</p>
            <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.7 }}>{t.thesis}</p>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.red, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>What's Not</p>
            <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.7 }}>{t.critique}</p>
          </div>
          <div>
            <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.blue, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>The Opportunity</p>
            <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.7 }}>{t.opportunity}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const TeardownsSection = () => (
  <section id="teardowns" style={{ padding: "6rem 2rem", background: C.bg }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel text="Product Teardowns" />
        <SectionTitle>I have opinions about products.</SectionTitle>
        <p style={{ fontFamily: FONT.body, fontSize: "0.95rem", color: C.muted, lineHeight: 1.7, marginBottom: "2.5rem", marginTop: "-1.5rem", maxWidth: 650 }}>
          Not academic frameworks — real analysis of what's working, what's not, and what I'd do differently. 
          These are products I've used, studied, and formed strong views on.
        </p>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {teardowns.map((t, i) => (
          <FadeIn key={t.id} delay={i * 0.08}><TeardownCard t={t} /></FadeIn>
        ))}
      </div>
    </div>
  </section>
);


// ─── DECISION LOG ───────────────────────────────────────────────
const DecisionCard = ({ d, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.card, border: `1px solid ${open ? C.accentBorder : C.border}`, borderRadius: 10, padding: "1.75rem 2rem", transition: "border-color 0.3s" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>{d.icon}</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.dim, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.35rem" }}>{d.category}</p>
          <h3 style={{ fontFamily: FONT.body, fontSize: "1.05rem", fontWeight: 600, color: C.cream }}>{d.title}</h3>
        </div>
      </div>

      {/* Decision badge */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        <span style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Chose:</span>
        <span style={{ fontFamily: FONT.mono, fontSize: "0.7rem", fontWeight: 700, color: C.green, background: C.greenGlow, padding: "0.25rem 0.65rem", borderRadius: 3 }}>{d.decision}</span>
        <span style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.muted, margin: "0 0.15rem" }}>over</span>
        {d.alternatives.map((a, i) => (
          <span key={i} style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.dim, background: C.cardHover, padding: "0.2rem 0.5rem", borderRadius: 3, textDecoration: "line-through", opacity: 0.7 }}>{a}</span>
        ))}
      </div>

      <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", fontFamily: FONT.mono, fontSize: "0.7rem", fontWeight: 600, color: C.accent, cursor: "pointer", padding: 0 }}>
        {open ? "— Hide reasoning" : "+ Why this call?"}
      </button>

      {open && (
        <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Reasoning</p>
            <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.7 }}>{d.reasoning}</p>
          </div>
          <div>
            <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Constraint</p>
            <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.7 }}>{d.constraint}</p>
          </div>
          <div>
            <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.green, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Outcome</p>
            <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.7 }}>{d.outcome}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const DecisionsSection = () => (
  <section id="decisions" style={{ padding: "6rem 2rem", background: C.bgAlt }}>
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel text="Decision Log · CompetitorPulse" />
        <SectionTitle>Every decision had a reason.</SectionTitle>
        <p style={{ fontFamily: FONT.body, fontSize: "0.95rem", color: C.muted, lineHeight: 1.7, marginBottom: "2.5rem", marginTop: "-1.5rem", maxWidth: 650 }}>
          Building CompetitorPulse meant making fast, irreversible calls under constraints. 
          Here's what I chose, what I rejected, and why.
        </p>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {decisions.map((d, i) => (
          <FadeIn key={d.id} delay={i * 0.06}><DecisionCard d={d} index={i} /></FadeIn>
        ))}
      </div>
    </div>
  </section>
);


// ─── CASE STUDY (CYJNA) ─────────────────────────────────────────
const CaseStudySection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const step = caseStudySteps[activeStep];

  return (
    <section id="case-study" style={{ padding: "6rem 2rem", background: C.bg }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel text="Interactive Case Study · CYJNA" />
          <SectionTitle>From problem to shipped prototype.</SectionTitle>
          <p style={{ fontFamily: FONT.body, fontSize: "0.95rem", color: C.muted, lineHeight: 1.7, marginBottom: "3rem", marginTop: "-1.5rem", maxWidth: 650 }}>
            How I validated a language-learning PWA for NYC delivery workers — the full thinking process, not just the outcomes.
          </p>
        </FadeIn>

        {/* Step selector */}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            {caseStudySteps.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)} style={{
                background: i === activeStep ? C.accent : C.card,
                border: `1px solid ${i === activeStep ? C.accent : C.border}`,
                color: i === activeStep ? "white" : C.muted,
                fontFamily: FONT.mono, fontSize: "0.7rem", fontWeight: 600,
                padding: "0.6rem 1.2rem", borderRadius: 6, cursor: "pointer",
                transition: "all 0.2s", letterSpacing: "0.04em",
              }}>
                {s.phase} — {s.title}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Active step content */}
        <FadeIn key={activeStep}>
          <div style={{ background: C.card, border: `1px solid ${C.accentBorder}`, borderRadius: 14, padding: "2.5rem", position: "relative" }}>
            {/* Phase indicator */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "1.5rem" }}>
              <span style={{ fontFamily: FONT.display, fontSize: "3rem", color: C.accent, fontStyle: "italic", lineHeight: 1, opacity: 0.4 }}>{step.phase}</span>
              <div>
                <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.25rem" }}>{step.label}</p>
                <h3 style={{ fontFamily: FONT.display, fontSize: "1.5rem", color: C.cream, fontWeight: 400, fontStyle: "italic" }}>{step.title}</h3>
              </div>
            </div>

            <p style={{ fontFamily: FONT.body, fontSize: "0.95rem", color: C.text, lineHeight: 1.75, marginBottom: "1.5rem" }}>{step.content}</p>

            {step.evidence && (
              <div style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 8, padding: "1.25rem", marginBottom: "1.25rem" }}>
                <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.green, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Evidence</p>
                <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.65 }}>{step.evidence}</p>
              </div>
            )}

            {step.keyDecision && (
              <div style={{ background: C.accentGlow, border: `1px solid ${C.accentBorder}`, borderRadius: 8, padding: "1.25rem" }}>
                <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Key Decision</p>
                <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.cream, lineHeight: 1.65 }}>{step.keyDecision}</p>
              </div>
            )}

            {/* Nav arrows */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.25rem", borderTop: `1px solid ${C.border}` }}>
              <button disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)} style={{
                background: "none", border: `1px solid ${activeStep === 0 ? C.border : C.muted}`, borderRadius: 6,
                padding: "0.5rem 1.25rem", fontFamily: FONT.mono, fontSize: "0.7rem", color: activeStep === 0 ? C.dim : C.muted,
                cursor: activeStep === 0 ? "default" : "pointer", opacity: activeStep === 0 ? 0.4 : 1,
              }}>
                ← Previous
              </button>
              <button disabled={activeStep === caseStudySteps.length - 1} onClick={() => setActiveStep(activeStep + 1)} style={{
                background: activeStep === caseStudySteps.length - 1 ? "none" : C.accent,
                border: activeStep === caseStudySteps.length - 1 ? `1px solid ${C.border}` : "none", borderRadius: 6,
                padding: "0.5rem 1.25rem", fontFamily: FONT.mono, fontSize: "0.7rem",
                color: activeStep === caseStudySteps.length - 1 ? C.dim : "white",
                cursor: activeStep === caseStudySteps.length - 1 ? "default" : "pointer",
                opacity: activeStep === caseStudySteps.length - 1 ? 0.4 : 1,
              }}>
                Next →
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};


// ─── THINKING / WRITING ─────────────────────────────────────────
const ThinkingSection = () => (
  <section id="thinking" style={{ padding: "6rem 2rem", background: C.bgAlt }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel text="Thinking" />
        <SectionTitle>What I'm writing about.</SectionTitle>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {essays.map((e, i) => (
          <FadeIn key={e.id} delay={i * 0.08}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "2rem", transition: "border-color 0.3s" }}
              onMouseEnter={(ev) => (ev.currentTarget.style.borderColor = C.accentBorder)}
              onMouseLeave={(ev) => (ev.currentTarget.style.borderColor = C.border)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <h3 style={{ fontFamily: FONT.display, fontSize: "1.35rem", color: C.cream, fontWeight: 400, fontStyle: "italic", lineHeight: 1.3, maxWidth: "80%" }}>{e.title}</h3>
                <span style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.dim, border: `1px solid ${C.border}`, padding: "0.2rem 0.5rem", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0 }}>{e.status}</span>
              </div>
              <p style={{ fontFamily: FONT.body, fontSize: "0.8rem", color: C.accent, fontWeight: 500, marginBottom: "0.75rem" }}>{e.subtitle}</p>
              <p style={{ fontFamily: FONT.body, fontSize: "0.9rem", color: C.text, lineHeight: 1.7, marginBottom: "1rem" }}>{e.preview}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {e.tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);


// ─── SKILLS ─────────────────────────────────────────────────────
const SkillsSection = () => (
  <section id="skills" style={{ padding: "6rem 2rem", background: C.bg }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <FadeIn><SectionLabel text="Skills & Education" /><SectionTitle>What I work with</SectionTitle></FadeIn>
      <FadeIn delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "1.5rem" }}>
              <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>
                {cat === "product" ? "Product" : cat === "technical" ? "Technical & Analytics" : "Building & Shipping"}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {items.map((s) => (
                  <span key={s} style={{ fontFamily: FONT.body, fontSize: "0.8rem", color: C.text, background: C.cardHover, border: `1px solid ${C.border}`, padding: "0.35rem 0.8rem", borderRadius: 4, fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "1.5rem" }}>
          <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>Education</p>
          {education.map((ed, i) => (
            <div key={i} style={{ paddingBottom: i < education.length - 1 ? "1rem" : 0, marginBottom: i < education.length - 1 ? "1rem" : 0, borderBottom: i < education.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{ fontFamily: FONT.body, fontSize: "1rem", fontWeight: 600, color: C.cream }}>{ed.school}</span>
                <span style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.dim, letterSpacing: "0.06em" }}>{ed.period}</span>
              </div>
              <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, marginTop: "0.15rem" }}>{ed.degree}</p>
              {ed.note && <p style={{ fontFamily: FONT.body, fontSize: "0.75rem", color: C.dim, fontStyle: "italic", marginTop: "0.35rem" }}>{ed.note}</p>}
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);


// ─── CONTACT ────────────────────────────────────────────────────
const ContactSection = () => (
  <section id="contact" style={{ padding: "6rem 2rem 4rem", background: C.bgAlt, borderTop: `1px solid ${C.border}` }}>
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel text="Contact" />
        <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.cream, fontWeight: 400, fontStyle: "italic", lineHeight: 1.15, marginBottom: "1.25rem" }}>
          Let's build something together.
        </h2>
        <p style={{ fontFamily: FONT.body, fontSize: "1.05rem", color: C.text, lineHeight: 1.7, maxWidth: 550, marginBottom: "2.5rem" }}>
          Looking for full-time Product Manager roles where I can ship products that matter. Based in NYC, happy to relocate.
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "4rem" }}>
          {[
            { href: `mailto:${user.email}`, icon: "✉", label: user.email },
            { href: user.linkedin, icon: "in", label: "LinkedIn", ext: true },
            { href: user.resume, icon: "↗", label: "Resume", ext: true },
            { href: user.calendly, icon: "◷", label: "Book a Call", ext: true },
          ].map((link, i) => (
            <a key={i} href={link.href} target={link.ext ? "_blank" : undefined} rel={link.ext ? "noopener noreferrer" : undefined}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0.9rem 1.4rem", textDecoration: "none", transition: "border-color 0.2s, transform 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <span style={{ width: 26, height: 26, borderRadius: 4, background: C.accentGlow, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>{link.icon}</span>
              <span style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.cream, fontWeight: 500 }}>{link.label}</span>
            </a>
          ))}
        </div>
      </FadeIn>
      <div style={{ paddingTop: "1.5rem", borderTop: `1px solid ${C.border}` }}>
        <p style={{ fontFamily: FONT.mono, fontSize: "0.7rem", color: C.dim, letterSpacing: "0.04em" }}>© 2025 Shreyam Borah · Built with care in NYC</p>
      </div>
    </div>
  </section>
);


// ─── CHATBOT ────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an AI assistant embedded on Shreyam Borah's portfolio website. You represent Shreyam to recruiters, hiring managers, and anyone visiting his site. Answer questions about his background concisely and confidently — like a sharp, well-briefed version of Shreyam, not a generic AI.

RULES:
- Keep answers to 2-4 sentences max. Be specific with numbers, project names, and outcomes.
- Never make things up. If you don't know, say "I'd recommend reaching out to Shreyam directly for that."
- Don't speculate about salary, personal life, or anything outside professional context.
- When relevant, mention which section of the portfolio has more detail.
- Tone: direct, warm, confident. Not corporate. Not sycophantic.

SHREYAM'S BACKGROUND:

CURRENT STATUS: Finishing Master's in Management of Technology at NYU (graduating May 2026). Actively seeking full-time Product Manager roles. Based in NYC, open to relocate. Email: shreyamb21@gmail.com. Calendly: calendly.com/sb10286-nyu/30min.

EDUCATION:
- NYU Masters in Management of Technology (Sep 2024 - May 2026). Graduate Director of PM Club, Marketing Coordinator for Student Leadership.
- B.Tech Computer Engineering with Minor in AR/VR from Somaiya Vidyavihar University (Sep 2020 - Jun 2024).

EXPERIENCE:
1. CYJNA Research Foundation — Product Analyst (Sep-Dec 2025): Validated a language-learning PWA for 50K Chinese delivery workers in NYC. Interviewed 15+ workers, chose QR-based PWA architecture (no signup/download), hit 30-sec scan-to-first-use and 90% task completion targets. Built adaptive micro-lessons + Gemini-powered AI chat assistant with 3-sec response time and offline caching. Shipped demo-ready prototype on Vercel.

2. IIT Bombay — Technical Analyst (Jan-Jun 2024): Led Unity-based simulation for truckload optimization. Cut testing cycles 40% with modular design. Built interactive UI improving simulation accuracy 30%. Defined requirements with PhD researchers, documented in Confluence.

3. Caarya — Product Intern (Jun-Dec 2023): Conducted 30+ user interviews. Built Excel KPI dashboards reducing project delays 15%. Launched 3 targeted campaigns increasing qualified leads 30%.

KEY PROJECTS:
1. CompetitorPulse (Co-founder & Product Lead): AI competitive intelligence SaaS. Built 7-agent LLM pipeline using NVIDIA Nemotron 70B with MD5 content diffing and 6-hour scrape cycles. Designed freemium model ($0/$19/$79) with Stripe feature gating. Led 18-week agile roadmap for 4-person team. Benchmarked 6 CI tools to position for underserved SMB founders.

2. Medicare DHR & Triage Assistant: AI-integrated digital health record system. $1.5M budget, 6-month PMBOK roadmap. Defined pilot criteria: >85% triage accuracy, >40% faster onboarding, >90% staff adoption.

3. Homies: First-time homebuyer platform for NYC. $119M/yr TAM. Gamified savings + seller-bank connector. GTM with referral programs and B2B2C partnerships.

WHAT MAKES HIM DIFFERENT:
- He's shipped real products, not just case studies. CompetitorPulse is an actual SaaS with a multi-agent AI pipeline and paying tiers.
- He's done user research with non-obvious populations (Chinese delivery workers, not just tech users).
- He makes and documents product decisions with reasoning (see the Decision Log on his site).
- He writes product teardowns with real opinions (Loom, Cursor, Spotify).
- Technical depth: can spec LLM pipelines, Unity simulations, PWA architectures — not just write PRDs.

SKILLS:
- Product: Strategy, User Research, Market Research, PRD Writing, Agile/Scrum, A/B Testing, UX/UI, Roadmapping
- Technical: MySQL, Python, Tableau, Power BI, Excel, Google Analytics, Figma, Jira, Confluence
- Building: Next.js/React, Vercel, C# (Unity), Supabase, Stripe, GitHub`;

const SUGGESTED_CHIPS = [
  "What makes him different?",
  "Tell me about CompetitorPulse",
  "Has he shipped real products?",
  "What's his AI experience?",
  "What are his key projects?",
  "What sets him apart from other PMs?",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setShowChips(false);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const assistantText = data.content
        ?.filter(b => b.type === "text")
        .map(b => b.text)
        .join("\n") || "I couldn't process that. Try asking something else about Shreyam's experience.";

      setMessages(prev => [...prev, { role: "assistant", content: assistantText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. You can reach Shreyam directly at shreyamb21@gmail.com." }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Bubble styles
  const bubbleBtn = {
    position: "fixed", bottom: 24, right: 24, zIndex: 9999,
    width: 56, height: 56, borderRadius: "50%",
    background: C.accent, border: "none", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: `0 4px 24px rgba(224,104,64,0.35)`,
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const panelStyle = {
    position: "fixed", bottom: 92, right: 24, zIndex: 9999,
    width: 380, maxHeight: "70vh", borderRadius: 14, overflow: "hidden",
    background: C.card, border: `1px solid ${C.border}`,
    boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
    display: "flex", flexDirection: "column",
    animation: "chatSlideUp 0.3s cubic-bezier(.22,1,.36,1)",
  };

  return (
    <>
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        .chat-bubble-btn:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(224,104,64,0.45); }
        .chat-chip:hover { border-color: ${C.accentBorder} !important; color: ${C.cream} !important; }
        .chat-send:hover:not(:disabled) { background: ${C.accent} !important; }
        @media (max-width: 480px) {
          .chat-panel { width: calc(100vw - 32px) !important; right: 16px !important; bottom: 80px !important; max-height: 65vh !important; }
          .chat-bubble { bottom: 16px !important; right: 16px !important; }
        }
      `}</style>

      {/* Floating bubble */}
      <button
        className="chat-bubble-btn chat-bubble"
        style={bubbleBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Shreyam's AI assistant"
      >
        {isOpen ? (
          <span style={{ color: "white", fontSize: "1.4rem", lineHeight: 1 }}>✕</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="chat-panel" style={panelStyle}>
          {/* Header */}
          <div style={{
            padding: "1rem 1.25rem", borderBottom: `1px solid ${C.border}`,
            background: C.bgAlt, display: "flex", alignItems: "center", gap: "0.75rem",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: C.accentGlow,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: FONT.display, fontSize: "0.9rem", color: C.accent, fontStyle: "italic",
            }}>S</div>
            <div>
              <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", fontWeight: 600, color: C.cream, lineHeight: 1.2 }}>Ask about Shreyam</p>
              <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.muted, letterSpacing: "0.04em" }}>Powered by Claude · Answers in seconds</p>
            </div>
          </div>

          {/* Messages area */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "1rem 1.25rem",
            display: "flex", flexDirection: "column", gap: "0.75rem",
            minHeight: 200, maxHeight: "calc(70vh - 160px)",
          }}>
            {/* Welcome message */}
            {messages.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{
                  background: C.bgAlt, borderRadius: "12px 12px 12px 4px", padding: "0.85rem 1rem",
                  border: `1px solid ${C.border}`,
                }}>
                  <p style={{ fontFamily: FONT.body, fontSize: "0.8rem", color: C.text, lineHeight: 1.6 }}>
                    Hey! I'm an AI assistant trained on Shreyam's full background. Ask me anything about his experience, projects, or skills — I'll give you a quick, specific answer.
                  </p>
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "85%",
                  background: msg.role === "user" ? C.accent : C.bgAlt,
                  color: msg.role === "user" ? "white" : C.text,
                  borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                  padding: "0.75rem 1rem",
                  border: msg.role === "user" ? "none" : `1px solid ${C.border}`,
                }}>
                  <p style={{
                    fontFamily: FONT.body, fontSize: "0.8rem", lineHeight: 1.6,
                    whiteSpace: "pre-wrap", wordBreak: "break-word",
                  }}>{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  background: C.bgAlt, borderRadius: "12px 12px 12px 4px", padding: "0.85rem 1.25rem",
                  border: `1px solid ${C.border}`, display: "flex", gap: "0.35rem", alignItems: "center",
                }}>
                  {[0, 1, 2].map(n => (
                    <div key={n} style={{
                      width: 6, height: 6, borderRadius: "50%", background: C.accent,
                      animation: `dotPulse 1.2s infinite`, animationDelay: `${n * 0.15}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested chips */}
          {showChips && messages.length === 0 && (
            <div style={{
              padding: "0 1.25rem 0.75rem", display: "flex", flexWrap: "wrap", gap: "0.4rem",
            }}>
              {SUGGESTED_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  className="chat-chip"
                  onClick={() => sendMessage(chip)}
                  style={{
                    background: "none", border: `1px solid ${C.border}`, borderRadius: 20,
                    padding: "0.4rem 0.75rem", fontFamily: FONT.body, fontSize: "0.7rem",
                    color: C.muted, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div style={{
            padding: "0.75rem 1.25rem", borderTop: `1px solid ${C.border}`,
            background: C.bgAlt, display: "flex", gap: "0.5rem", alignItems: "flex-end",
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Shreyam..."
              disabled={loading}
              style={{
                flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
                padding: "0.65rem 0.85rem", fontFamily: FONT.body, fontSize: "0.8rem",
                color: C.cream, outline: "none", resize: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = C.accentBorder)}
              onBlur={(e) => (e.target.style.borderColor = C.border)}
            />
            <button
              className="chat-send"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              style={{
                width: 36, height: 36, borderRadius: 8, border: "none",
                background: input.trim() && !loading ? C.accent : C.cardHover,
                cursor: input.trim() && !loading ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s", flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? "white" : C.dim} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};


// ─── MAIN APP ───────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("About");

  useEffect(() => {
    const h = () => {
      const ids = NAV_ITEMS.map(s => s.toLowerCase().replace(/\s/g, "-"));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          const match = NAV_ITEMS.find(n => n.toLowerCase().replace(/\s/g, "-") === id);
          if (match) setActive(match);
          break;
        }
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; color: ${C.text}; font-family: 'Outfit', sans-serif; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }
        ::selection { background: ${C.accent}; color: white; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @media (max-width: 640px) {
          section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
        }
      `}</style>
      <Nav active={active} setActive={setActive} />
      <Hero />
      <Divider />
      <ExperienceSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <TeardownsSection />
      <Divider />
      <DecisionsSection />
      <Divider />
      <CaseStudySection />
      <Divider />
      <ThinkingSection />
      <Divider />
      <SkillsSection />
      <Divider />
      <ContactSection />
      <ChatBot />
    </div>
  );
}