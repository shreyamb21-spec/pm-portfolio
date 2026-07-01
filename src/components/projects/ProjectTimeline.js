import { useEffect, useRef, useState, useCallback } from "react";
import { C, FONT } from "../../theme/tokens";

const ProjectTimeline = ({ projects, cardRefs }) => {
  const containerRef = useRef(null);
  const [dotTops, setDotTops] = useState([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [lineTop, setLineTop] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const recalc = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const containerScrollTop = container.getBoundingClientRect().top + window.scrollY;

    const tops = cardRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      // center of the card relative to the container
      return r.top + window.scrollY - containerScrollTop + r.height / 2;
    });

    if (tops.length > 0) {
      const firstCard = cardRefs.current[0];
      const lastCard = cardRefs.current[cardRefs.current.length - 1];
      if (firstCard && lastCard) {
        const firstRect = firstCard.getBoundingClientRect();
        const lastRect = lastCard.getBoundingClientRect();
        const top = firstRect.top + window.scrollY - containerScrollTop + firstRect.height / 2;
        const bottom = lastRect.top + window.scrollY - containerScrollTop + lastRect.height / 2;
        setLineTop(top);
        setLineHeight(bottom - top);
      }
    }
    setDotTops(tops);
  }, [cardRefs]);

  useEffect(() => {
    // Recalculate after FadeIn animations settle
    const t1 = setTimeout(recalc, 100);
    const t2 = setTimeout(recalc, 900);
    window.addEventListener("resize", recalc);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", recalc);
    };
  }, [recalc]);

  useEffect(() => {
    const onScroll = () => {
      let closest = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - window.innerHeight * 0.45);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveIdx(closest);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [cardRefs]);

  return (
    <div
      ref={containerRef}
      style={{ width: 80, flexShrink: 0, position: "relative", alignSelf: "stretch" }}
    >
      {/* Vertical line — spans exactly first dot to last dot */}
      {lineHeight > 0 && (
        <div style={{
          position: "absolute",
          left: "50%",
          top: lineTop,
          height: lineHeight,
          width: 1,
          background: C.border,
          transform: "translateX(-50%)",
        }} />
      )}

      {/* Dots + labels */}
      {dotTops.map((top, i) => (
        <div
          key={projects[i]?.id ?? i}
          style={{
            position: "absolute",
            left: "50%",
            top,
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          <div style={{
            width: activeIdx === i ? 10 : 7,
            height: activeIdx === i ? 10 : 7,
            borderRadius: "50%",
            background: activeIdx === i ? C.ink : C.bgAlt,
            border: `1.5px solid ${activeIdx === i ? C.ink : C.dim}`,
            transition: "all 0.2s",
            zIndex: 1,
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: FONT.mono,
            fontSize: "0.58rem",
            color: activeIdx === i ? C.ink : C.dim,
            fontWeight: activeIdx === i ? 600 : 400,
            letterSpacing: "0.04em",
            textAlign: "center",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            transition: "color 0.2s",
          }}>
            {projects[i]?.dateLabel}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProjectTimeline;
