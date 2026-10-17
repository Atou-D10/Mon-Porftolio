import { m, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { useRichInteractions } from "../lib/hooks";

interface MagneticProps {
  children: ReactNode;
  /** Intensité de l'attraction (0 à 1). */
  strength?: number;
  className?: string;
}

/**
 * Attire légèrement son contenu vers le curseur (boutons « magnétiques »).
 * Inactif au tactile et avec prefers-reduced-motion.
 */
export function Magnetic({ children, strength = 0.35, className = "inline-flex" }: MagneticProps) {
  const enabled = useRichInteractions();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span className={className} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </m.span>
  );
}
