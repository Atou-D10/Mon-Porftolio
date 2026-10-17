import { m, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useRichInteractions } from "../lib/hooks";

const INTERACTIVE = "a, button, input, textarea, label, select, [data-cursor]";

/**
 * Curseur personnalisé discret : un anneau qui suit la souris avec un léger retard
 * et grossit au survol des éléments interactifs. Le curseur natif reste visible.
 * Uniquement avec une souris, et désactivé avec prefers-reduced-motion.
 */
export function Cursor() {
  const enabled = useRichInteractions();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 });
  const [state, setState] = useState<"hidden" | "idle" | "hover">("hidden");

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setState(target?.closest(INTERACTIVE) ? "hover" : "idle");
    };
    const onLeave = () => setState("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x: ringX, y: ringY }}>
      <div
        className={`-ml-4 -mt-4 size-8 rounded-full border transition-[transform,opacity,background-color,border-color] duration-300 ease-out-expo ${
          state === "hover" ? "scale-150 border-signal bg-signal/10" : "border-fg/35"
        } ${state === "hidden" ? "opacity-0" : "opacity-100"}`}
      />
    </m.div>
  );
}
