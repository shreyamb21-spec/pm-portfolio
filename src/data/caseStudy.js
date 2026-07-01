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

export default caseStudySteps;
