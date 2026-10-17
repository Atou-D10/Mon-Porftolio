import { m, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useContent, type EducationItem } from "../content";
import { useReducedMotion } from "../lib/hooks";

export function Journey() {
  const { journey } = useContent();

  return (
    <section id="parcours" aria-labelledby="journey-title" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index={4} title={journey.title} lead={journey.lead} id="journey-title" />

        <div className="flex flex-col gap-16 md:gap-20">
          {/* 1. Formations : timeline */}
          <div>
            <SubHeading dot="bg-data" title={journey.educationTitle} />
            <Timeline items={journey.education} currentLabel={journey.currentLabel} />
          </div>

          {/* 2. Expérience professionnelle : carte pleine largeur */}
          <div>
            <SubHeading dot="bg-signal" title={journey.experienceTitle} />
            <div className="flex flex-col gap-6">
              {journey.experience.map((job) => (
                <Reveal
                  as="article"
                  key={`${job.org}-${job.period}`}
                  className="relative overflow-hidden rounded-3xl border border-line bg-elev/50 transition-colors duration-500 hover:border-signal/50"
                >
                  {/* Filet d'accent orange */}
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-signal" />
                  <div className="grid gap-8 p-6 pl-8 md:grid-cols-12 md:gap-12 md:p-10 md:pl-12">
                    <header className="md:col-span-4">
                      <p className="font-mono text-xs text-signal">{job.period}</p>
                      <h4 className="mt-3 text-2xl font-semibold sm:text-3xl">{job.title}</h4>
                      <p className="mt-2 text-muted">{job.org}</p>
                    </header>
                    <ul className="grid gap-3 text-sm sm:text-base md:col-span-8">
                      {job.missions.map((mission) => (
                        <li key={mission} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-signal" />
                          <span>{mission}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubHeading({ dot, title }: { dot: string; title: string }) {
  return (
    <Reveal as="h3" className="mb-8 flex items-center gap-3 border-b border-line pb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
      <span aria-hidden="true" className={`size-2.5 rounded-full ${dot}`} />
      {title}
    </Reveal>
  );
}

/**
 * Timeline verticale des formations.
 * - Une ligne de fond, et une ligne turquoise qui se trace au fil du défilement.
 * - Chaque point « s'allume » quand son entrée atteint la zone de lecture (attribut data-lit).
 * - Formations en cours : point pulsé.
 * Avec prefers-reduced-motion : ligne entièrement tracée, points allumés, pas de pulsation.
 * Disposition : colonne de dates à gauche sur tablette et bureau ; date au-dessus du titre sur mobile.
 */
function Timeline({ items, currentLabel }: { items: EducationItem[]; currentLabel: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  // Allume chaque point quand son entrée passe au-dessus de 75 % de la hauteur d'écran
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const entries = list.querySelectorAll<HTMLElement>("[data-timeline-item]");
    const observer = new IntersectionObserver(
      (records) => {
        records.forEach((r) => {
          if (r.isIntersecting) r.target.setAttribute("data-lit", "");
        });
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    entries.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={listRef} className="timeline relative">
      {/* Ligne de fond + ligne de progression (même position que les points) */}
      <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-line-strong md:left-[calc(14rem+7px)]" />
      <m.span
        aria-hidden="true"
        className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-data md:left-[calc(14rem+7px)]"
        style={{ scaleY: reduced ? 1 : progress }}
      />

      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.title}
          delay={i * 60}
          data-timeline-item=""
          className="relative grid gap-1 pb-10 pl-9 last:pb-0 md:grid-cols-[14rem_1fr] md:gap-0 md:pl-0"
        >
          {/* Point */}
          <span aria-hidden="true" className="absolute left-0 top-1.5 grid size-[15px] place-items-center md:left-[14rem]">
            {item.current && <span className="timeline-pulse absolute inset-0 rounded-full bg-data/40" />}
            <span className="timeline-dot relative size-[15px] rounded-full border-2 border-data bg-bg transition-colors duration-500" />
          </span>

          {/* Période */}
          <p className="font-mono text-xs leading-6 text-muted md:pr-8 md:text-right md:text-sm">{item.period}</p>

          {/* Contenu */}
          <div className="md:pl-10">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h4 className="text-lg font-semibold leading-snug sm:text-xl">{item.title}</h4>
              {item.current && <Badge tone="data">{currentLabel}</Badge>}
            </div>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
              <span>{item.org}</span>
              {item.mention && <Badge tone="neutral">{item.mention}</Badge>}
            </p>

            {item.items && (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {item.items.map((sub) => (
                  <li key={sub.title} className="rounded-xl border border-line px-4 py-3">
                    <p className="text-sm font-medium">{sub.title}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted">{sub.period}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/** Petit badge : même gabarit pour « En cours » (turquoise) et la mention (neutre). */
function Badge({ tone, children }: { tone: "data" | "neutral"; children: string }) {
  const tones = {
    data: "border-data/40 bg-data/10 text-data",
    neutral: "border-line-strong bg-fg/[0.06] text-fg",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] ${tones[tone]}`}>
      {children}
    </span>
  );
}
