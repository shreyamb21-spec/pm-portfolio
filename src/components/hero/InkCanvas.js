import { useEffect, useRef } from "react";

const InkCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    canvas.parentElement.addEventListener("mousemove", onMove);
    canvas.parentElement.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x, y } = mouseRef.current;
      if (x > -9000) {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 72);
        grad.addColorStop(0, "rgba(26,24,21,0.14)");
        grad.addColorStop(1, "rgba(26,24,21,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const seed = Math.sin(Date.now() * 0.001) * 1000;
        for (let i = 0; i < 30; i++) {
          const angle = (i / 30) * Math.PI * 2 + seed;
          const r = Math.random() * 65;
          const px = x + Math.cos(angle) * r;
          const py = y + Math.sin(angle) * r;
          const alpha = (1 - r / 65) * 0.12 * Math.random();
          ctx.beginPath();
          ctx.arc(px, py, Math.random() * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(26,24,21,${alpha})`;
          ctx.fill();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 1,
      }}
    />
  );
};

export default InkCanvas;
