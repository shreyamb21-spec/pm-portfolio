import { C, FONT } from "../../theme/tokens";
import FadeIn from "../layout/FadeIn";
import SectionLabel from "../layout/SectionLabel";
import SectionTitle from "../layout/SectionTitle";
import Tag from "../layout/Tag";
import essays from "../../data/essays";

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
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "2rem", transition: "border-color 0.3s" }}
              onMouseEnter={(ev) => (ev.currentTarget.style.borderColor = C.borderStrong)}
              onMouseLeave={(ev) => (ev.currentTarget.style.borderColor = C.border)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <h3 style={{ fontFamily: FONT.display, fontSize: "1.35rem", color: C.ink, fontWeight: 400, fontStyle: "italic", lineHeight: 1.3, maxWidth: "80%" }}>{e.title}</h3>
                <span style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.dim, border: `1px solid ${C.border}`, padding: "0.2rem 0.5rem", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0 }}>{e.status}</span>
              </div>
              <p style={{ fontFamily: FONT.body, fontSize: "0.8rem", color: C.muted, fontWeight: 500, marginBottom: "0.75rem" }}>{e.subtitle}</p>
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

export default ThinkingSection;
