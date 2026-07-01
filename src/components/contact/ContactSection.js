import { C, FONT } from "../../theme/tokens";
import FadeIn from "../layout/FadeIn";
import SectionLabel from "../layout/SectionLabel";
import user from "../../data/user";

const ContactSection = () => (
  <section id="contact" style={{ padding: "6rem 2rem 4rem", background: C.bgAlt, borderTop: `1px solid ${C.border}` }}>
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel text="Contact" />
        <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.ink, fontWeight: 400, fontStyle: "italic", lineHeight: 1.15, marginBottom: "1.25rem" }}>
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
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "0.9rem 1.4rem", textDecoration: "none", transition: "border-color 0.2s, transform 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <span style={{ width: 26, height: 26, borderRadius: 4, background: C.tagBg, color: C.ink, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>{link.icon}</span>
              <span style={{ fontFamily: FONT.body, fontSize: "0.85rem", color: C.ink, fontWeight: 500 }}>{link.label}</span>
            </a>
          ))}
        </div>
      </FadeIn>
      <div style={{ paddingTop: "1.5rem", borderTop: `1px solid ${C.border}` }}>
        <p style={{ fontFamily: FONT.mono, fontSize: "0.7rem", color: C.dim, letterSpacing: "0.04em" }}>© 2026 Shreyam Borah · Built with care in NYC</p>
      </div>
    </div>
  </section>
);

export default ContactSection;
