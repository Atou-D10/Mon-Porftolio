import type { ReactNode } from "react";

interface MarqueeProps {
  items: string[];
  label: string;
  separator?: ReactNode;
}

/**
 * Bandeau qui défile en continu (CSS pur, voir .marquee dans index.css).
 * La liste est dupliquée pour une boucle sans à-coup ; la copie est masquée
 * aux lecteurs d'écran. Avec prefers-reduced-motion, la liste devient statique.
 */
export function Marquee({ items, label, separator = "✦" }: MarqueeProps) {
  const renderList = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} aria-label={hidden ? undefined : label} className={`marquee-list ${hidden ? "marquee-dup" : ""}`}>
      {items.map((item) => (
        <li key={item} className="flex shrink-0 items-center gap-6 sm:gap-10">
          <span>{item}</span>
          <span aria-hidden="true" className="text-signal text-[0.5em]">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee">
      <div className="marquee-track">
        {renderList(false)}
        {renderList(true)}
      </div>
    </div>
  );
}
