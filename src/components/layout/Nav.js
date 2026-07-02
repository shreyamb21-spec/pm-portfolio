import { useState, useEffect } from "react";
import { C, FONT } from "../../theme/tokens";
import useIsMobile from "../../hooks/useIsMobile";
import user from "../../data/user";

export const NAV_ITEMS = ["About", "Experience", "Projects", "Decisions", "Leadership", "Skills", "Contact"];

const Nav = ({ active, setActive }) => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(245,241,234,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: isMobile ? "0 1rem" : "0 2rem",
        height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: FONT.display, fontSize: "1.3rem", color: C.ink, fontStyle: "italic", flexShrink: 0 }}>SB</span>

        <div style={{
          display: "flex", gap: "0.25rem",
          overflowX: "auto", maxWidth: isMobile ? "calc(100vw - 80px)" : "calc(100vw - 200px)",
          msOverflowStyle: "none", scrollbarWidth: "none",
        }}>
          {NAV_ITEMS.map((s) => (
            <button key={s} onClick={() => {
              setActive(s);
              document.getElementById(s.toLowerCase().replace(/\s/g, "-"))?.scrollIntoView({ behavior: "smooth" });
            }} style={{
              background: "none", border: "none", fontFamily: FONT.body,
              fontSize: isMobile ? "0.7rem" : "0.75rem",
              fontWeight: 500,
              color: active === s ? C.ink : C.muted,
              borderBottom: active === s ? `2px solid ${C.ink}` : "2px solid transparent",
              cursor: "pointer", padding: isMobile ? "0.5rem 0.5rem" : "0.5rem 0.65rem",
              transition: "color 0.2s, border-color 0.2s", letterSpacing: "0.02em", whiteSpace: "nowrap",
            }}>
              {s}
            </button>
          ))}
        </div>

        {!isMobile && (
          <a href={user.resume} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: FONT.mono, fontSize: "0.7rem", fontWeight: 600, color: C.bg,
            background: C.ink, padding: "0.45rem 1rem", borderRadius: 4,
            letterSpacing: "0.04em", textDecoration: "none", flexShrink: 0,
          }}>
            RESUME ↗
          </a>
        )}
      </div>
    </nav>
  );
};

export default Nav;
