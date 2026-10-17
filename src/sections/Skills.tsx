import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useContent, type SkillGroup } from "../content";

/**
 * Accent et grille de chaque groupe. Le nombre de colonnes est choisi pour que
 * chaque ligne soit complète (4 sous-catégories → 2 colonnes, 6 → 2 ou 3,
 * 3 → 3) : aucune case vide, en bureau comme en mobile.
 */
const groupStyles: Record<SkillGroup["id"], { dot: string; core: string; grid: string; letter: string }> = {
  data: {
    dot: "bg-data",
    core: "border-data/35 bg-data/10 text-data hover:bg-data/20",
    grid: "sm:grid-cols-2",
    letter: "A",
  },
  dev: {
    dot: "bg-signal",
    core: "border-signal/35 bg-signal/10 text-signal hover:bg-signal/20",
    grid: "sm:grid-cols-2 lg:grid-cols-3",
    letter: "B",
  },
  tools: {
    dot: "bg-fg",
    core: "border-line-strong bg-fg/[0.06] text-fg hover:bg-fg/[0.12]",
    grid: "md:grid-cols-3",
    letter: "C",
  },
};

const countSkills = (group: SkillGroup) => group.blocks.reduce((n, b) => n + b.core.length + b.items.length, 0);

export function Skills() {
  const { skills } = useContent();
  const total = skills.groups.reduce((n, g) => n + countSkills(g), 0);

  return (
    <section id="competences" aria-labelledby="skills-title" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index={2} title={skills.title} lead={skills.lead} id="skills-title" />

        {/* Légende : principales / complémentaires */}
        <Reveal className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 font-mono text-xs text-muted">
          <p>{skills.countLabel(total)}</p>
          <p aria-hidden="true" className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-fg" />
              {skills.legend.core}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full border border-muted" />
              {skills.legend.secondary}
            </span>
          </p>
        </Reveal>

        <div className="flex flex-col gap-6 md:gap-8">
          {skills.groups.map((group) => (
            <SkillPanel key={group.id} group={group} legend={skills.legend} countLabel={skills.countLabel} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillPanel({
  group,
  legend,
  countLabel,
}: {
  group: SkillGroup;
  legend: { core: string; secondary: string };
  countLabel: (n: number) => string;
}) {
  const style = groupStyles[group.id];
  const titleId = `skills-${group.id}`;

  return (
    <Reveal as="article" aria-labelledby={titleId} className="overflow-hidden rounded-3xl border border-line bg-elev/40">
      {/* En-tête du groupe */}
      <header className="flex flex-col gap-2 border-b border-line px-6 py-5 md:flex-row md:items-center md:gap-8 md:px-7">
        <h3 id={titleId} className="flex shrink-0 items-center gap-3 text-2xl font-semibold md:w-64">
          <span aria-hidden="true" className={`size-2.5 rounded-full ${style.dot}`} />
          <span aria-hidden="true" className="font-mono text-xs font-normal text-muted">
            {style.letter}
          </span>
          {group.title}
        </h3>
        <p className="text-sm text-muted md:flex-1">{group.description}</p>
        <p className="shrink-0 font-mono text-xs text-muted">{countLabel(countSkills(group))}</p>
      </header>

      {/* Sous-catégories : lignes de 1 px dessinées par l'espacement sur fond « line » */}
      <div className={`grid gap-px bg-line ${style.grid}`}>
        {group.blocks.map((block, i) => (
          <Reveal key={block.label} delay={60 * i} className="flex flex-col gap-4 bg-bg p-6 md:p-7">
            <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">{block.label}</h4>

            {block.core.length > 0 && (
              <ul aria-label={`${block.label}, ${legend.core.toLowerCase()}`} className="flex flex-wrap gap-2">
                {block.core.map((name) => (
                  <li
                    key={name}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-[background-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 ${style.core}`}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}

            {block.items.length > 0 && (
              <ul aria-label={`${block.label}, ${legend.secondary.toLowerCase()}`} className="flex flex-wrap gap-1.5">
                {block.items.map((name) => (
                  <li
                    key={name}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}
