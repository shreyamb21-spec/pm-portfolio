import { C, FONT } from "../../theme/tokens";
import FadeIn from "../layout/FadeIn";
import InkCanvas from "./InkCanvas";
import ChatBot from "../chatbot/ChatBot";
import useIsMobile from "../../hooks/useIsMobile";
import user from "../../data/user";

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section
      id="about"
      style={{
        position: "relative",
        overflow: "hidden",
        background: C.bg,
        paddingTop: "5rem",
      }}
    >
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      }} />
      <InkCanvas />

      {/* ── Two-column row (stacks on mobile) ── */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "flex-start",
        maxWidth: 1440,
        margin: "0 auto",
        padding: isMobile ? "0" : "0 1rem",
        position: "relative",
        zIndex: 2,
      }}>

        {/* LEFT: photo + CTAs */}
        <div style={{
          flex: isMobile ? "none" : "0 0 44%",
          width: isMobile ? "100%" : undefined,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}>
          <FadeIn>
            <img
              src="/shreyam-cutout.png"
              alt="Shreyam Borah"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                filter: "grayscale(1) contrast(1.1) brightness(1.02)",
                maxHeight: isMobile ? "65vw" : undefined,
                objectFit: isMobile ? "cover" : undefined,
                objectPosition: isMobile ? "top center" : undefined,
              }}
            />
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.22}>
            <div style={{
              display: "flex",
              gap: "0.65rem",
              flexWrap: "wrap",
              justifyContent: isMobile ? "center" : "center",
              padding: isMobile ? "1.25rem 1.25rem 0" : "1.5rem 1rem 0",
            }}>
              <a href={`mailto:${user.email}`} style={{ fontFamily: FONT.body, fontSize: "0.875rem", fontWeight: 600, color: C.bg, background: C.ink, padding: "0.75rem 1.5rem", borderRadius: 4, textDecoration: "none" }}>
                Get in touch
              </a>
              <a href={user.resume} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT.body, fontSize: "0.875rem", fontWeight: 500, color: C.ink, border: `1px solid ${C.ink}`, padding: "0.75rem 1.5rem", borderRadius: 4, textDecoration: "none" }}>
                Resume ↗
              </a>
              <a href={user.calendly} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT.body, fontSize: "0.875rem", fontWeight: 500, color: C.ink, border: `1px solid ${C.border}`, padding: "0.75rem 1.5rem", borderRadius: 4, textDecoration: "none" }}>
                Book a call ↗
              </a>
            </div>
          </FadeIn>
        </div>

        {/* RIGHT: name → pill → chatbot → bio */}
        <div style={{
          flex: 1,
          padding: isMobile ? "2rem 1.25rem 0" : "2.5rem 2.5rem 0 3.5rem",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          position: "relative",
        }}>
          <FadeIn>
            <h1 style={{
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: isMobile ? "clamp(2.8rem, 12vw, 4rem)" : "clamp(3rem, 5.5vw, 5.5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: C.ink,
              marginBottom: "1.25rem",
              userSelect: "none",
            }}>
              SHREYAM<br />BORAH
            </h1>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div style={{ display: "inline-flex", background: C.ink, padding: "0.35rem 0.9rem", borderRadius: 2, marginBottom: "1.75rem", alignSelf: "flex-start" }}>
              <span style={{ fontFamily: FONT.mono, fontSize: "0.68rem", fontWeight: 600, color: C.bg, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Product Manager · NYC
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p style={{ fontFamily: FONT.display, fontSize: "1.1rem", fontStyle: "italic", color: C.ink, lineHeight: 1.3, marginBottom: "1rem" }}>
              Hi, I'm Vera — ask me anything about Shreyam.
            </p>
            <ChatBot />
          </FadeIn>

          <FadeIn delay={0.14}>
            <p style={{ fontFamily: FONT.body, fontSize: "1rem", lineHeight: 1.8, color: C.text, marginTop: "2rem" }}>
              I take products from "someone should build this" to shipped — owning research, specs,
              and execution end-to-end. NYU Management of Technology. Currently building GTM systems
              at Louisa AI, and actively looking for my next full-time PM role.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ── Full-width: metrics + scroll hint ── */}
      <div style={{
        maxWidth: 1440,
        margin: "0 auto",
        padding: isMobile ? "2rem 1.25rem 2.5rem" : "2.5rem 1rem 3rem",
        position: "relative",
        zIndex: 2,
      }}>
        <FadeIn delay={0.18}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? "1.5rem 2.5rem" : "4rem",
            flexWrap: "wrap",
            marginBottom: "1.75rem",
          }}>
            {[
              { v: "3",     l: "AI Products Shipped" },
              { v: "500+",  l: "Students Led" },
              { v: "50K",   l: "Users Researched" },
              { v: "$1.5M", l: "Budget Managed" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontFamily: FONT.display, fontSize: isMobile ? "2rem" : "2.5rem", color: C.ink, fontStyle: "italic", lineHeight: 1 }}>{s.v}</span>
                <span style={{ fontFamily: FONT.mono, fontSize: "0.57rem", color: C.dim, textTransform: "uppercase", letterSpacing: "0.12em", marginTop: "0.35rem" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.22}>
          <button
            onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            style={{ fontFamily: FONT.mono, fontSize: "0.7rem", color: C.muted, letterSpacing: "0.1em", textAlign: "center", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.2s", display: "block", margin: "0 auto" }}
            onMouseEnter={(e) => e.currentTarget.style.color = C.ink}
            onMouseLeave={(e) => e.currentTarget.style.color = C.muted}
          >
            scroll to see my work ↓
          </button>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
