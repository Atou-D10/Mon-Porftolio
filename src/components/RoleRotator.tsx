import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../lib/hooks";

const GLYPHS = "01<>/{}[]#%&*+=_";
const HOLD_MS = 2600;
const SCRAMBLE_MS = 700;

/**
 * Fait défiler les rôles avec un effet de « décodage » des caractères.
 * Purement décoratif : le texte complet est fourni aux lecteurs d'écran à part.
 * Avec prefers-reduced-motion, le texte change simplement, sans effet.
 */
export function RoleRotator({ roles }: { roles: string[] }) {
  const [text, setText] = useState(roles[0]);
  const current = useRef(roles[0]);
  const reduced = useReducedMotion();

  useEffect(() => {
    let index = 0;
    let raf = 0;
    let timeout = 0;

    const next = () => {
      index = (index + 1) % roles.length;
      const from = current.current;
      const target = roles[index];
      current.current = target;

      if (reduced) {
        setText(target);
        timeout = window.setTimeout(next, HOLD_MS);
        return;
      }

      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / SCRAMBLE_MS);
        const length = Math.round(from.length + (target.length - from.length) * progress);
        const resolved = Math.floor(target.length * progress);
        let out = "";
        for (let i = 0; i < length; i++) {
          const char = target[i] ?? "";
          out += i < resolved || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setText(out);
        if (progress < 1) raf = requestAnimationFrame(step);
        else timeout = window.setTimeout(next, HOLD_MS);
      };
      raf = requestAnimationFrame(step);
    };

    timeout = window.setTimeout(next, HOLD_MS);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [roles, reduced]);

  return <>{text}</>;
}
