import { m, useSpring } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { useRichInteractions } from "../lib/hooks";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Inclinaison maximale en degrés. */
  max?: number;
}

const spring = { stiffness: 260, damping: 22, mass: 0.6 };

/**
 * Carte qui s'incline en 3D selon la position du curseur, avec un reflet lumineux.
 * Réutilisée pour le portrait et les cartes projets.
 * Inactive au tactile et avec prefers-reduced-motion (la carte reste à plat).
 */
export function TiltCard({ children, className = "", max = 6 }: TiltCardProps) {
  const enabled = useRichInteractions();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateY.set((x / rect.width - 0.5) * max * 2);
    rotateX.set(-(y / rect.height - 0.5) * max * 2);
    ref.current.style.setProperty("--glare-x", `${x}px`);
    ref.current.style.setProperty("--glare-y", `${y}px`);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <m.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group/tilt relative ${className}`}
    >
      {children}
      {enabled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--glare-x, 50%) var(--glare-y, 50%), color-mix(in srgb, var(--fg) 9%, transparent), transparent 45%)",
          }}
        />
      )}
    </m.div>
  );
}
