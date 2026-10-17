import { ArrowRight, Download } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "../components/Button";
import { DataField } from "../components/DataField";
import { RoleRotator } from "../components/RoleRotator";
import { profile, useContent } from "../content";

/** Découpe un mot en lettres animées une à une (voir .hero-letter dans index.css). */
function AnimatedWord({ word, offset = 0 }: { word: string; offset?: number }) {
  return (
    <>
      {[...word].map((letter, i) => (
        <span key={i} className="hero-letter" style={{ "--i": offset + i } as CSSProperties}>
          {letter}
        </span>
      ))}
    </>
  );
}

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const t = useContent();
  const { firstName, lastName } = profile;

  return (
    <section id="accueil" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16">
      {/* Décor : grille, halo et nuage de points */}
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_40%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-20 -z-20 size-[36rem] rounded-full bg-signal/15 blur-[120px] dark:bg-signal/10"
      />
      <div aria-hidden="true" className="absolute -bottom-40 left-1/4 -z-20 size-[30rem] rounded-full bg-data/10 blur-[120px]" />
      <DataField className="absolute inset-0 -z-10 size-full opacity-60 [mask-image:linear-gradient(to_right,transparent_5%,black_55%)] sm:opacity-100" />

      <div className="container-page flex flex-1 flex-col justify-center py-14">
        {/* Ligne d'en-tête : localisation + légende façon graphique */}
        <div className="fade-up mb-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted" style={delay(0)}>
          <p className="inline-flex items-center gap-2.5">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-data opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-data" />
            </span>
            {t.hero.location}
          </p>
          <p aria-hidden="true" className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-data" />
              {t.hero.tracks.data}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-signal" />
              {t.hero.tracks.fullstack}
            </span>
          </p>
        </div>

        <h1 id="hero-title" className="font-display text-[clamp(3.6rem,18vw,11rem)] font-semibold leading-[0.88] tracking-[-0.045em]">
          <span className="sr-only">
            {firstName} {lastName}
          </span>
          <span aria-hidden="true" className="block">
            <AnimatedWord word={firstName} />
          </span>
          <span aria-hidden="true" className="block">
            <AnimatedWord word={lastName} offset={firstName.length} />
            <span className="hero-letter text-signal" style={{ "--i": firstName.length + lastName.length } as CSSProperties}>
              .
            </span>
          </span>
        </h1>

        <p className="fade-up mt-8 flex min-h-[1.75rem] items-center font-mono text-base sm:text-xl" style={delay(550)}>
          <span className="sr-only">{t.hero.rolesLabel}</span>
          <span aria-hidden="true" className="mr-3 text-signal">
            &gt;
          </span>
          <span aria-hidden="true">
            <RoleRotator roles={t.hero.roles} />
          </span>
          <span aria-hidden="true" className="caret ml-1 inline-block h-[1.1em] w-[0.5em] bg-signal" />
        </p>

        <p className="fade-up mt-6 max-w-2xl text-lg text-muted sm:text-xl" style={delay(700)}>
          {t.hero.pitch}
        </p>

        <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={delay(850)}>
          <ButtonLink href="#projets" icon={<ArrowRight size={16} />}>
            {t.hero.ctaProjects}
          </ButtonLink>
          <ButtonLink variant="secondary" href={profile.cv.href} download={profile.cv.downloadName} icon={<Download size={16} />}>
            {t.hero.ctaCv}
          </ButtonLink>
          <ButtonLink variant="ghost" href="#contact" magnetic={false}>
            {t.hero.ctaContact}
          </ButtonLink>
        </div>
      </div>

      {/* Bandeau « en ce moment » */}
      <div className="fade-up border-t border-line bg-bg/40 backdrop-blur-sm" style={delay(1000)}>
        <div className="container-page grid gap-4 py-5 sm:grid-cols-3 sm:gap-8">
          {t.hero.now.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">{item.label}</span>
              <span className="text-sm text-fg">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
