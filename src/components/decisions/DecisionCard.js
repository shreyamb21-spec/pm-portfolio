import { useState } from "react";
import { C, FONT } from "../../theme/tokens";

const DecisionCard = ({ d }) => {
  const [open, setOpen] = useState(false);
  const [activeAlt, setActiveAlt] = useState(null);

  const handleAltClick = (name) => {
    setActiveAlt(activeAlt === name ? null : name);
  };

  const activeAltObj = d.alternatives.find((a) => a.name === activeAlt);

  return (
    <div style={{ background: C.card, border: `1px solid ${open ? C.borderStrong : C.border}`, borderRadius: 8, padding: "1.75rem 2rem", transition: "border-color 0.3s" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>{d.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.dim, textTransform: "uppercase", letterSpacing: "0.12em" }}>{d.category}</p>
            <span style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.muted, background: C.tagBg, padding: "0.15rem 0.5rem", borderRadius: 3, letterSpacing: "0.06em" }}>{d.project}</span>
          </div>
          <h3 style={{ fontFamily: FONT.body, fontSize: "1.05rem", fontWeight: 600, color: C.ink }}>{d.title}</h3>
        </div>
      </div>

      {/* Decision badge + alternatives */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: activeAlt ? "0.75rem" : "0.75rem", flexWrap: "wrap" }}>
        <span style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Chose:</span>
        <span style={{ fontFamily: FONT.mono, fontSize: "0.7rem", fontWeight: 700, color: C.card, background: C.ink, padding: "0.25rem 0.65rem", borderRadius: 3 }}>{d.decision}</span>
        <span style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.muted, margin: "0 0.15rem" }}>over</span>
        {d.alternatives.map((a) => (
          <button
            key={a.name}
            onClick={() => handleAltClick(a.name)}
            style={{
              fontFamily: FONT.mono, fontSize: "0.65rem", cursor: "pointer",
              padding: "0.2rem 0.5rem", borderRadius: 3, border: `1px solid ${activeAlt === a.name ? C.ink : C.border}`,
              background: activeAlt === a.name ? C.ink : "transparent",
              color: activeAlt === a.name ? C.bg : C.muted,
              textDecoration: activeAlt === a.name ? "none" : "line-through",
              opacity: activeAlt !== null && activeAlt !== a.name ? 0.5 : 1,
              transition: "all 0.15s",
            }}
          >
            {a.name}
          </button>
        ))}
      </div>

      {/* Why-not explanation */}
      {activeAltObj && (
        <div style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 6, padding: "0.85rem 1rem", marginBottom: "0.75rem" }}>
          <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.35rem" }}>Why not {activeAltObj.name}?</p>
          <p style={{ fontFamily: FONT.body, fontSize: "0.82rem", color: C.text, lineHeight: 1.65 }}>{activeAltObj.reason}</p>
        </div>
      )}

      <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", fontFamily: FONT.mono, fontSize: "0.7rem", fontWeight: 600, color: C.ink, opacity: 0.7, cursor: "pointer", padding: 0 }}>
        {open ? "— Hide reasoning" : "+ Why this call?"}
      </button>

      {open && (
        <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.ink, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Reasoning</p>
            <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.7 }}>{d.reasoning}</p>
          </div>
          <div>
            <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.ink, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Constraint</p>
            <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.7 }}>{d.constraint}</p>
          </div>
          <div>
            <p style={{ fontFamily: FONT.mono, fontSize: "0.6rem", color: C.ink, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Outcome</p>
            <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.7 }}>{d.outcome}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionCard;
