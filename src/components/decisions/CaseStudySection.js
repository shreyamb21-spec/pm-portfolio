import { useState } from "react";
import { C, FONT } from "../../theme/tokens";
import FadeIn from "../layout/FadeIn";
import SectionLabel from "../layout/SectionLabel";
import SectionTitle from "../layout/SectionTitle";
import caseStudySteps from "../../data/caseStudy";

const CaseStudySection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const step = caseStudySteps[activeStep];

  return (
    <section id="case-study" style={{ padding: "6rem 2rem", background: C.bgAlt }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel text="Interactive Case Study · CYJNA" />
          <SectionTitle>From problem to shipped prototype.</SectionTitle>
          <p style={{ fontFamily: FONT.body, fontSize: "0.95rem", color: C.muted, lineHeight: 1.7, marginBottom: "3rem", marginTop: "-1.5rem", maxWidth: 650 }}>
            How I validated a language-learning PWA for NYC delivery workers — the full thinking process, not just the outcomes.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            {caseStudySteps.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)} style={{
                background: i === activeStep ? C.ink : C.card,
                border: `1px solid ${i === activeStep ? C.ink : C.border}`,
                color: i === activeStep ? C.bg : C.muted,
                fontFamily: FONT.mono, fontSize: "0.7rem", fontWeight: 600,
                padding: "0.6rem 1.2rem", borderRadius: 4, cursor: "pointer",
                transition: "all 0.2s", letterSpacing: "0.04em",
              }}>
                {s.phase} — {s.title}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn key={activeStep}>
          <div style={{ background: C.card, border: `1px solid ${C.borderStrong}`, borderRadius: 8, padding: "2.5rem", position: "relative" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "1.5rem" }}>
              <span style={{ fontFamily: FONT.display, fontSize: "3rem", color: C.ink, fontStyle: "italic", lineHeight: 1, opacity: 0.15 }}>{step.phase}</span>
              <div>
                <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.ink, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.25rem" }}>{step.label}</p>
                <h3 style={{ fontFamily: FONT.display, fontSize: "1.5rem", color: C.ink, fontWeight: 400, fontStyle: "italic" }}>{step.title}</h3>
              </div>
            </div>

            <p style={{ fontFamily: FONT.body, fontSize: "0.95rem", color: C.text, lineHeight: 1.75, marginBottom: "1.5rem" }}>{step.content}</p>

            {step.evidence && (
              <div style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 6, padding: "1.25rem", marginBottom: "1.25rem" }}>
                <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.ink, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Evidence</p>
                <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.65 }}>{step.evidence}</p>
              </div>
            )}

            {step.keyDecision && (
              <div style={{ background: C.bgAlt, border: `1px solid ${C.borderStrong}`, borderRadius: 6, padding: "1.25rem" }}>
                <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.ink, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Key Decision</p>
                <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.ink, lineHeight: 1.65 }}>{step.keyDecision}</p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.25rem", borderTop: `1px solid ${C.border}` }}>
              <button disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)} style={{
                background: "none", border: `1px solid ${activeStep === 0 ? C.border : C.borderStrong}`, borderRadius: 4,
                padding: "0.5rem 1.25rem", fontFamily: FONT.mono, fontSize: "0.7rem", color: activeStep === 0 ? C.dim : C.muted,
                cursor: activeStep === 0 ? "default" : "pointer", opacity: activeStep === 0 ? 0.4 : 1,
              }}>
                ← Previous
              </button>
              <button disabled={activeStep === caseStudySteps.length - 1} onClick={() => setActiveStep(activeStep + 1)} style={{
                background: activeStep === caseStudySteps.length - 1 ? "none" : C.ink,
                border: activeStep === caseStudySteps.length - 1 ? `1px solid ${C.border}` : "none", borderRadius: 4,
                padding: "0.5rem 1.25rem", fontFamily: FONT.mono, fontSize: "0.7rem",
                color: activeStep === caseStudySteps.length - 1 ? C.dim : C.bg,
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

export default CaseStudySection;
