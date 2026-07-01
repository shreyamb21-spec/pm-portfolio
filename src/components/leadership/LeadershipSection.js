import { useState } from "react";
import { C, FONT } from "../../theme/tokens";
import FadeIn from "../layout/FadeIn";
import SectionLabel from "../layout/SectionLabel";
import SectionTitle from "../layout/SectionTitle";
import leadership from "../../data/leadership";

const LeadershipCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ background: C.card, border: `1px solid ${open ? C.borderStrong : C.border}`, borderRadius: 8, padding: "1.75rem 2rem", transition: "border-color 0.3s" }}
      onMouseEnter={(e) => { if (!open) e.currentTarget.style.borderColor = C.borderStrong; }}
      onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = C.border; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{item.period}</p>
          <h3 style={{ fontFamily: FONT.body, fontSize: "1.1rem", fontWeight: 600, color: C.ink, marginBottom: "0.15rem" }}>{item.role}</h3>
          <p style={{ fontFamily: FONT.body, fontSize: "0.9rem", color: C.muted, fontWeight: 500 }}>{item.org}</p>
        </div>
        <button onClick={() => setOpen(!open)} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, color: C.muted, width: 32, height: 32, borderRadius: 4, fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {open ? "−" : "+"}
        </button>
      </div>
      {open && (
        <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: `1px solid ${C.border}` }}>
          {item.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.6rem" }}>
              <span style={{ color: C.ink, fontSize: "0.7rem", marginTop: "0.35rem", flexShrink: 0, opacity: 0.4 }}>▸</span>
              <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.6 }}>{b}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const LeadershipSection = () => (
  <section id="leadership" style={{ padding: "6rem 2rem", background: C.bg }}>
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <FadeIn><SectionLabel text="Leadership" /><SectionTitle>Building communities, not just products</SectionTitle></FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {leadership.map((item, i) => (
          <FadeIn key={item.id} delay={i * 0.08}><LeadershipCard item={item} /></FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default LeadershipSection;
