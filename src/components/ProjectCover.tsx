import type { CSSProperties } from "react";
import type { ProjectCover as CoverKind } from "../content";

/**
 * Visuels générés en SVG pour les projets phares (aucune photo, poids quasi nul).
 * Les couleurs suivent le thème via les classes Tailwind (fill-data, fill-signal…).
 * Au survol de la carte (classe `group`), les éléments s'animent légèrement ;
 * les transitions sont coupées avec prefers-reduced-motion (voir index.css).
 */
export function ProjectCover({ kind }: { kind: CoverKind }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]" />
      <svg viewBox="0 0 400 250" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
        {kind === "survey" && <SurveyArt />}
        {kind === "realestate" && <RealEstateArt />}
        {kind === "ai" && <AiArt />}
      </svg>
    </div>
  );
}

/** Origine des transformations sur la boîte de l'élément SVG lui-même. */
const box = (origin: string, delay = 0): CSSProperties => ({
  transformBox: "fill-box",
  transformOrigin: origin,
  transitionDelay: `${delay}ms`,
});

const grow = "transition-transform duration-700 ease-out-expo";

/** Barres horizontales : une étude de facteurs (salaire, satisfaction…). */
function SurveyArt() {
  const bars = [0.82, 0.64, 0.92, 0.48, 0.71, 0.38];
  return (
    <g>
      <path d="M70 34 V218 H360" className="stroke-line-strong" strokeWidth="1" fill="none" />
      {bars.map((w, i) => {
        const y = 46 + i * 28;
        const highlight = i === 2;
        return (
          <g key={i}>
            <rect x="34" y={y + 5} width="26" height="6" rx="3" className="fill-fg/15" />
            <rect
              x="72"
              y={y}
              width={w * 270}
              height="16"
              rx="4"
              className={`${highlight ? "fill-signal" : "fill-data/70"} ${grow} group-hover:scale-x-[1.06]`}
              style={box("left", i * 40)}
            />
          </g>
        );
      })}
      {/* Moyenne */}
      <path d="M262 30 V222" className="stroke-fg/40" strokeWidth="1" strokeDasharray="3 4" />
    </g>
  );
}

/** Fenêtre d'application : tableau de bord d'agence avec cartes de biens. */
function RealEstateArt() {
  const cards = [
    [128, 70],
    [248, 70],
    [128, 150],
    [248, 150],
  ];
  return (
    <g>
      <rect x="40" y="24" width="320" height="202" rx="12" className="fill-elev stroke-line-strong" strokeWidth="1" />
      <path d="M40 48 H360" className="stroke-line-strong" strokeWidth="1" />
      {[58, 70, 82].map((x) => (
        <circle key={x} cx={x} cy="36" r="3.5" className="fill-fg/20" />
      ))}
      {/* Menu latéral */}
      {[66, 84, 102, 120].map((y, i) => (
        <rect key={y} x="54" y={y} width={i === 0 ? 50 : 40} height="7" rx="3.5" className={i === 0 ? "fill-signal" : "fill-fg/15"} />
      ))}
      {/* Cartes de biens */}
      {cards.map(([x, y], i) => (
        <g key={i} className={`${grow} group-hover:-translate-y-1`} style={box("center", i * 60)}>
          <rect x={x} y={y} width="100" height="66" rx="8" className="fill-bg stroke-line" strokeWidth="1" />
          <path d={`M${x + 14} ${y + 30} L${x + 30} ${y + 16} L${x + 46} ${y + 30} V${y + 44} H${x + 14} Z`} className="fill-data/60" />
          <rect x={x + 56} y={y + 18} width="32" height="6" rx="3" className="fill-fg/25" />
          <rect x={x + 56} y={y + 30} width="22" height="6" rx="3" className="fill-fg/15" />
          {/* Statut : une location impayée signalée */}
          <rect x={x + 14} y={y + 52} width="40" height="6" rx="3" className={i === 1 ? "fill-signal" : "fill-fg/10"} />
        </g>
      ))}
    </g>
  );
}

/** Conversation avec un assistant : bulles et indicateur de saisie. */
function AiArt() {
  return (
    <g>
      {/* Message utilisateur */}
      <g className={`${grow} group-hover:-translate-x-1`} style={box("right")}>
        <rect x="190" y="38" width="170" height="40" rx="14" className="fill-signal" />
        <rect x="206" y="52" width="110" height="6" rx="3" className="fill-on-accent/70" />
        <rect x="206" y="63" width="70" height="6" rx="3" className="fill-on-accent/50" />
      </g>
      {/* Réponse du modèle */}
      <g className={`${grow} group-hover:translate-x-1`} style={box("left", 80)}>
        <circle cx="54" cy="112" r="12" className="fill-data/25 stroke-data" strokeWidth="1.5" />
        <path d="M54 105 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" className="fill-data" />
        <rect x="76" y="94" width="210" height="62" rx="14" className="fill-elev stroke-line-strong" strokeWidth="1" />
        <rect x="92" y="109" width="160" height="6" rx="3" className="fill-fg/30" />
        <rect x="92" y="121" width="178" height="6" rx="3" className="fill-fg/20" />
        <rect x="92" y="133" width="120" height="6" rx="3" className="fill-fg/20" />
      </g>
      {/* Saisie en cours */}
      <rect x="76" y="172" width="70" height="34" rx="14" className="fill-elev stroke-line-strong" strokeWidth="1" />
      {[96, 111, 126].map((x, i) => (
        <circle key={x} cx={x} cy="189" r="4" className="typing-dot fill-data" style={{ animationDelay: `${i * 160}ms` }} />
      ))}
    </g>
  );
}
