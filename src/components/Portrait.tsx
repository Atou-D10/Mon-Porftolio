import type { CSSProperties } from "react";
import { useContent } from "../content";
import { TiltCard } from "./TiltCard";

/**
 * Carte portrait de la section À propos.
 * - Si `about.photo` est renseigné dans le contenu, la photo est affichée.
 * - Sinon, une illustration « fig. 01 » : deux courbes (data et fullstack)
 *   qui convergent, sur fond de monogramme. Elle se trace à l'apparition.
 *
 * Pour ajouter une photo : déposer par ex. public/images/atou.webp (format 4:5,
 * environ 800×1000 px) puis renseigner `photo: { src: "/images/atou.webp", alt: "…" }`
 * dans src/content/fr.ts.
 */
export function Portrait() {
  const { about } = useContent();
  const { portrait, photo } = about;

  return (
    <TiltCard className="rounded-3xl">
      <figure className="grain relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-elev">
        {photo ? (
          <img
            src={photo.src}
            alt={photo.alt}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        ) : (
          <PortraitArt />
        )}

        {/* Légende commune, façon figure de rapport */}
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-elev via-elev/80 to-transparent p-6 pt-16">
          <div>
            <p className="font-display text-2xl font-semibold leading-tight">Atou Diagne</p>
            <p className="mt-1 font-mono text-xs text-muted">{portrait.caption}</p>
          </div>
          <div aria-hidden="true" className="flex flex-col items-end gap-1.5 font-mono text-[0.7rem] text-muted">
            <span className="inline-flex items-center gap-2">
              {portrait.legendData}
              <span className="h-0.5 w-5 rounded bg-data" />
            </span>
            <span className="inline-flex items-center gap-2">
              {portrait.legendDev}
              <span className="h-0.5 w-5 rounded bg-signal" />
            </span>
          </div>
        </figcaption>

        <p aria-hidden="true" className="absolute left-6 top-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
          {portrait.figure}
        </p>
      </figure>
    </TiltCard>
  );
}

/** Illustration utilisée en l'absence de photo. */
function PortraitArt() {
  // Points partagés par les deux courbes : départs distincts, arrivée commune
  const dataPoints: [number, number][] = [
    [40, 330],
    [110, 300],
    [170, 318],
    [230, 236],
    [300, 150],
  ];
  const devPoints: [number, number][] = [
    [40, 210],
    [100, 250],
    [160, 196],
    [230, 214],
    [300, 150],
  ];
  const toPath = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      {/* Monogramme en filigrane */}
      <span className="text-outline absolute -right-6 top-10 select-none font-display text-[13rem] font-bold leading-none opacity-[0.12]">
        AD
      </span>

      <svg viewBox="0 0 340 420" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
        {/* Axes */}
        <path d="M30 360 H320 M30 360 V90" className="stroke-line-strong" strokeWidth="1" fill="none" />
        {[90, 150, 210, 270, 330].map((y) => (
          <path key={y} d={`M26 ${y} H30`} className="stroke-line-strong" strokeWidth="1" />
        ))}

        <path
          d={toPath(devPoints)}
          pathLength={1}
          className="draw stroke-signal"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d={toPath(dataPoints)}
          pathLength={1}
          className="draw stroke-data"
          style={{ "--draw-delay": "500ms" } as CSSProperties}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {devPoints.slice(0, -1).map(([x, y]) => (
          <circle key={`d${x}`} cx={x} cy={y} r="4" className="fill-signal" />
        ))}
        {dataPoints.slice(0, -1).map(([x, y]) => (
          <circle key={`a${x}`} cx={x} cy={y} r="4" className="fill-data" />
        ))}

        {/* Point de convergence */}
        <circle cx="300" cy="150" r="16" className="fill-signal/15" />
        <circle cx="300" cy="150" r="7" className="fill-fg" />
      </svg>
    </div>
  );
}
