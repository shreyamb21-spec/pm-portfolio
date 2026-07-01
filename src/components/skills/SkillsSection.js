import { C, FONT } from "../../theme/tokens";
import FadeIn from "../layout/FadeIn";
import SectionLabel from "../layout/SectionLabel";
import SectionTitle from "../layout/SectionTitle";
import skills from "../../data/skills";
import education from "../../data/education";

const SkillsSection = () => (
  <section id="skills" style={{ padding: "6rem 2rem", background: C.bg }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <FadeIn><SectionLabel text="Skills & Education" /><SectionTitle>What I work with</SectionTitle></FadeIn>
      <FadeIn delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "1.5rem" }}>
              <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.ink, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>
                {cat === "product" ? "Product" : cat === "technical" ? "Technical & Analytics" : "Building & Shipping"}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {items.map((s) => (
                  <span key={s} style={{ fontFamily: FONT.body, fontSize: "0.8rem", color: C.text, background: C.tagBg, border: `1px solid ${C.border}`, padding: "0.35rem 0.8rem", borderRadius: 4, fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "1.5rem" }}>
          <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.ink, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>Education</p>
          {education.map((ed, i) => (
            <div key={i} style={{ paddingBottom: i < education.length - 1 ? "1rem" : 0, marginBottom: i < education.length - 1 ? "1rem" : 0, borderBottom: i < education.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{ fontFamily: FONT.body, fontSize: "1rem", fontWeight: 600, color: C.ink }}>{ed.school}</span>
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

export default SkillsSection;
