import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
}

const LINK_DISTANCE = 110;
const MOUSE_RADIUS = 140;

/**
 * Fond du hero : un nuage de points qui dérive lentement et se relie
 * comme un graphe. Pensé pour rester léger :
 * - démarre quand le navigateur est inactif (ne bloque pas le premier rendu) ;
 * - se met en pause hors écran ou onglet masqué ;
 * - une seule image fixe avec prefers-reduced-motion ;
 * - les couleurs suivent le thème (variables CSS).
 */
export function DataField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let frame = 0;
    let onScreen = true;
    const mouse = { x: -9999, y: -9999 };

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        data: s.getPropertyValue("--data").trim(),
        signal: s.getPropertyValue("--signal").trim(),
        line: s.getPropertyValue("--fg-muted").trim(),
      };
    };
    let colors = readColors();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(90, (width * height) / 15000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.9,
        accent: Math.random() < 0.12,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        if (!reduced) {
          // Le curseur repousse doucement les points proches
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.6;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.line;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        ctx.globalAlpha = p.accent ? 0.95 : 0.6;
        ctx.fillStyle = p.accent ? colors.signal : colors.data;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.accent ? p.r + 0.8 : p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced) draw();
      else if (onScreen && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const stop = () => cancelAnimationFrame(frame);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    // Recolore le graphe quand le thème change
    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (reduced) draw();
    });

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const idleId = idle(() => {
      resize();
      resizeObserver.observe(canvas);
      visibilityObserver.observe(canvas);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      start();
    });

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
