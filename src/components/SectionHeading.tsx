import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  /** Position de la section, affichée comme une graduation d'axe : « 01 / 05 ». */
  index: number;
  total?: number;
  title: string;
  lead?: string;
  id?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** En-tête commun à toutes les sections. */
export function SectionHeading({ index, total = 5, title, lead, id }: SectionHeadingProps) {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
      <Reveal className="md:col-span-7">
        <p aria-hidden="true" className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted">
          <span className="text-signal">{pad(index)}</span>
          <span className="h-px w-10 bg-line-strong" />
          <span>{pad(total)}</span>
        </p>
        <h2 id={id} className="text-4xl font-semibold sm:text-5xl lg:text-6xl">
          {title}
          <span className="text-signal">.</span>
        </h2>
      </Reveal>
      {lead && (
        <Reveal as="p" delay={120} className="max-w-md text-base text-muted md:col-span-5 md:justify-self-end md:text-lg">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
