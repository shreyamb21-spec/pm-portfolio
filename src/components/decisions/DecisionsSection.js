import { useState } from "react";
import { C, FONT } from "../../theme/tokens";
import FadeIn from "../layout/FadeIn";
import SectionLabel from "../layout/SectionLabel";
import SectionTitle from "../layout/SectionTitle";
import DecisionCard from "./DecisionCard";
import decisions from "../../data/decisions";

const PROJECTS = ["All", "CompetitorPulse", "Pantheon", "Poker AI"];

const DecisionsSection = () => {
  const [activeProject, setActiveProject] = useState("All");

  const filtered = activeProject === "All"
    ? decisions
    : decisions.filter((d) => d.project === activeProject);

  return (
    <section id="decisions" style={{ padding: "6rem 2rem", background: C.bg }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel text="Decision Log" />
          <SectionTitle>Every decision had a reason.</SectionTitle>
          <p style={{ fontFamily: FONT.body, fontSize: "0.95rem", color: C.muted, lineHeight: 1.7, marginBottom: "2rem", marginTop: "-1.5rem", maxWidth: 650 }}>
            Building AI products under real constraints means making fast, often irreversible calls. Here's what I chose, what I rejected, and why — across CompetitorPulse, Pantheon, and Poker AI.
          </p>
        </FadeIn>

        {/* Project filter tabs */}
        <FadeIn delay={0.06}>
          <div style={{ display: "flex", gap: "0.4rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {PROJECTS.map((p) => (
              <button
                key={p}
                onClick={() => setActiveProject(p)}
                style={{
                  fontFamily: FONT.mono,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  padding: "0.45rem 1rem",
                  borderRadius: 4,
                  border: `1px solid ${activeProject === p ? C.ink : C.border}`,
                  background: activeProject === p ? C.ink : "transparent",
                  color: activeProject === p ? C.bg : C.muted,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { if (activeProject !== p) { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.color = C.ink; } }}
                onMouseLeave={(e) => { if (activeProject !== p) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; } }}
              >
                {p === "All" ? `All (${decisions.length})` : `${p} (${decisions.filter(d => d.project === p).length})`}
              </button>
            ))}
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filtered.map((d, i) => (
            <FadeIn key={`${activeProject}-${d.id}`} delay={i * 0.04}>
              <DecisionCard d={d} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DecisionsSection;
