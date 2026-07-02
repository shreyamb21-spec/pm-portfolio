import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { C } from "./theme/tokens";
import Nav, { NAV_ITEMS } from "./components/layout/Nav";
import Divider from "./components/layout/Divider";
import Hero from "./components/hero/Hero";
import ExperienceSection from "./components/experience/ExperienceSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import DecisionsSection from "./components/decisions/DecisionsSection";
import LeadershipSection from "./components/leadership/LeadershipSection";
import SkillsSection from "./components/skills/SkillsSection";
import ContactSection from "./components/contact/ContactSection";

export default function Portfolio() {
  const [active, setActive] = useState("About");

  useEffect(() => {
    const h = () => {
      const ids = NAV_ITEMS.map((s) => s.toLowerCase().replace(/\s/g, "-"));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          const match = NAV_ITEMS.find((n) => n.toLowerCase().replace(/\s/g, "-") === id);
          if (match) setActive(match);
          break;
        }
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; color: ${C.text}; font-family: 'Outfit', sans-serif; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }
        ::selection { background: ${C.ink}; color: ${C.bg}; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 768px) {
          /* Reduce vertical section padding on all sections except hero */
          section:not(#about) { padding-top: 3rem !important; padding-bottom: 3rem !important; }
          /* Tighten horizontal padding on all sections */
          section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          /* Hide nav scrollbar on mobile */
          nav div::-webkit-scrollbar { display: none; }
        }
      `}</style>
      <Analytics />
      <Nav active={active} setActive={setActive} />
      <Hero />
      <Divider />
      <ExperienceSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <DecisionsSection />
      <Divider />
      <LeadershipSection />
      <Divider />
      <SkillsSection />
      <Divider />
      <ContactSection />
    </div>
  );
}
