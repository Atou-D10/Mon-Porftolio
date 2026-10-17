import { useEffect, useState } from "react";

/**
 * Suit une media query. Renvoie `false` au premier rendu (identique au HTML prérendu),
 * puis la vraie valeur après hydratation.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Vrai si l'utilisateur demande moins d'animations. */
export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** Vrai pour une souris ou un trackpad (micro-interactions désactivées au tactile). */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

/** Les effets de survol avancés ne s'activent qu'avec une souris et sans préférence de mouvement réduit. */
export function useRichInteractions() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  return fine && !reduced;
}

/** Renvoie l'identifiant de la section actuellement visible. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;

    // État de chaque section : on recalcule la section active à partir de l'ensemble,
    // et pas seulement de la dernière entrée (sinon un décalage de mise en page
    // pouvait laisser le menu bloqué sur la section précédente).
    const visible = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
        const current = ids.find((id) => visible.get(id));
        if (current) setActive(current);
      },
      // Une section est « active » quand elle traverse le milieu de l'écran
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
