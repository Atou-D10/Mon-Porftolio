import { useEffect, useRef, type ComponentPropsWithoutRef, type CSSProperties, type ElementType } from "react";

/**
 * Apparition douce au scroll, en CSS pur (voir [data-reveal] dans index.css).
 * Un seul IntersectionObserver est partagé par tous les éléments.
 */

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
  }
  return observer;
}

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Délai en millisecondes, pratique pour décaler les éléments d'une liste. */
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Reveal<T extends ElementType = "div">({ as, delay = 0, style, ...rest }: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  const revealStyle = { ...(style as CSSProperties), "--reveal-delay": `${delay}ms` } as CSSProperties;

  return <Tag ref={ref} data-reveal="" style={revealStyle} {...rest} />;
}
