import { m, useScroll, useSpring } from "framer-motion";

/** Fine barre de progression de lecture en haut de la page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-data to-signal"
      style={{ scaleX }}
    />
  );
}
