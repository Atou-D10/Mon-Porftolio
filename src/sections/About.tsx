import { CountUp } from "../components/CountUp";
import { Marquee } from "../components/Marquee";
import { Portrait } from "../components/Portrait";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useContent } from "../content";

/** Couleur d'accent de chaque facette du profil. */
const trackStyles = {
  fullstack: { dot: "bg-signal", text: "text-signal", border: "hover:border-signal/60" },
  data: { dot: "bg-data", text: "text-data", border: "hover:border-data/60" },
} as const;

export function About() {
  const { about } = useContent();
  const [intro, ...paragraphs] = about.paragraphs;

  return (
    <section id="a-propos" aria-labelledby="about-title" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index={1} title={about.title} lead={about.lead} id="about-title" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait (photo ou illustration), fixe pendant la lecture sur grand écran */}
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-sm lg:sticky lg:top-24 lg:max-w-none">
              <Reveal>
                <Portrait />
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col gap-14 lg:col-span-7">
            {/* Texte de présentation (CV) */}
            <div className="space-y-5">
              <Reveal as="p" className="font-display text-2xl font-medium leading-snug text-fg sm:text-3xl">
                {intro}
              </Reveal>
              {paragraphs.map((p, i) => (
                <Reveal as="p" key={i} delay={80 * (i + 1)} className="text-base text-muted sm:text-lg">
                  {p}
                </Reveal>
              ))}
            </div>

            {/* Les deux facettes du profil hybride */}
            <ul className="grid gap-4 sm:grid-cols-2">
              {about.tracks.map((track, i) => {
                const style = trackStyles[track.id];
                return (
                  <Reveal
                    as="li"
                    key={track.id}
                    delay={100 * i}
                    className={`group flex flex-col rounded-2xl border border-line bg-elev/60 p-6 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 ${style.border}`}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span aria-hidden="true" className={`size-2.5 rounded-full ${style.dot}`} />
                      <h3 className="text-xl font-semibold">{track.title}</h3>
                    </div>
                    <p className="text-sm text-muted">{track.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${track.title} : technologies principales`}>
                      {track.tags.map((tag) => (
                        <li key={tag} className={`rounded-full border border-line px-3 py-1 font-mono text-xs ${style.text}`}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                );
              })}
            </ul>

            {/* Repères chiffrés, tous issus du CV */}
            <dl className="grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {about.facts.map((fact, i) => (
                <Reveal key={fact.label} delay={100 * i} className="flex flex-col-reverse justify-end gap-2 py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                    <CountUp value={fact.value} />
                  </dd>
                </Reveal>
              ))}
            </dl>

            {/* Langues */}
            <Reveal>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">{about.languagesTitle}</h3>
              <dl className="grid gap-3 sm:grid-cols-2">
                {about.languages.map((lang) => (
                  <div key={lang.name} className="flex items-baseline justify-between gap-4 rounded-xl border border-line px-5 py-4">
                    <dt className="font-semibold">{lang.name}</dt>
                    <dd className="text-sm text-muted">{lang.level}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Qualités personnelles en bandeau défilant */}
      <Reveal className="mt-20 border-y border-line py-6 md:mt-28">
        <h3 className="sr-only">{about.softSkillsTitle}</h3>
        <div className="font-display text-2xl font-medium text-fg/80 sm:text-4xl">
          <Marquee items={about.softSkills} label={about.softSkillsTitle} />
        </div>
      </Reveal>
    </section>
  );
}
