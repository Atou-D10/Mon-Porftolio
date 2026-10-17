import { useEffect, useRef, useState } from "react";

const DURATION = 1600;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Affiche une valeur et anime sa partie numérique (« 23 000+ ») quand elle devient visible.
 * Les valeurs non numériques (« M2 », « TB ») sont affichées telles quelles.
 * Le HTML prérendu contient la valeur finale (SEO, sans JavaScript, mouvement réduit).
 */
export function CountUp({ value, locale = "fr-FR" }: { value: string; locale?: string }) {
  const match = value.match(/^([\d\s]+)(.*)$/); // \s couvre aussi les espaces insécables
  const target = match ? Number(match[1].replace(/\D/g, "")) : NaN;
  const suffix = match?.[2] ?? "";

  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const format = (n: number) => n.toLocaleString(locale) + suffix;
    // La valeur est remise à zéro hors écran, puis comptée à l'apparition
    if (el.getBoundingClientRect().top > window.innerHeight) setDisplay(format(0));
    else return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION);
          setDisplay(progress < 1 ? format(Math.round(target * easeOutExpo(progress))) : value);
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, suffix, value, locale]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
