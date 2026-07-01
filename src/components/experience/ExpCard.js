import { useState } from "react";
import { C, FONT } from "../../theme/tokens";
import Tag from "../layout/Tag";

const ExpCard = ({ exp }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ background: C.card, border: `1px solid ${open ? C.borderStrong : C.border}`, borderRadius: 8, padding: "1.75rem 2rem", transition: "border-color 0.3s", cursor: "default" }}
      onMouseEnter={(e) => { if (!open) e.currentTarget.style.borderColor = C.borderStrong; }}
      onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = C.border; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: FONT.mono, fontSize: "0.65rem", color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{exp.period}</p>
          <h3 style={{ fontFamily: FONT.body, fontSize: "1.15rem", fontWeight: 600, color: C.ink, marginBottom: "0.15rem" }}>{exp.role}</h3>
          <p style={{ fontFamily: FONT.body, fontSize: "0.9rem", color: C.muted, fontWeight: 500 }}>
            {exp.company}{exp.location ? ` · ${exp.location}` : ""}
          </p>
        </div>
        <button onClick={() => setOpen(!open)} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, color: C.muted, width: 32, height: 32, borderRadius: 4, fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {open ? "−" : "+"}
        </button>
      </div>
      <p style={{ fontFamily: FONT.body, fontSize: "0.9rem", color: C.text, lineHeight: 1.6, marginTop: "0.75rem" }}>{exp.brief}</p>
      {open && (
        <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: `1px solid ${C.border}` }}>
          {exp.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.6rem" }}>
              <span style={{ color: C.ink, fontSize: "0.7rem", marginTop: "0.35rem", flexShrink: 0, opacity: 0.4 }}>▸</span>
              <p style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.text, lineHeight: 1.6 }}>{b}</p>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {exp.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
            {exp.repoUrl && (
              <a href={exp.repoUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: FONT.mono, fontSize: "0.7rem", fontWeight: 600, color: C.ink, border: `1px solid ${C.border}`, borderRadius: 4, padding: "0.3rem 0.75rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem", transition: "border-color 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = C.borderStrong}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = C.border}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                View code
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpCard;
