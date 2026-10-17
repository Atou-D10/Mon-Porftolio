import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { GitHubIcon } from "../components/BrandIcons";
import { ProjectCover } from "../components/ProjectCover";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { TiltCard } from "../components/TiltCard";
import { useContent, type Content, type Project, type ProjectCategory } from "../content";

type Filter = "all" | ProjectCategory;
type ProjectsContent = Content["projects"];

/** Couleur associée à chaque catégorie (pastilles, étiquettes). */
const categoryDot: Record<ProjectCategory, string> = {
  data: "bg-data",
  web: "bg-signal",
  desktop: "bg-fg",
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Animation d'entrée / sortie des cartes au changement de filtre.
 * Fondu simple, sans animation de « layout » : moins coûteux (pas de mesure de toute la page).
 */
const itemMotion = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.45, ease },
} as const;

/**
 * Grille des projets phares selon leur nombre, pour qu'aucune case ne reste vide :
 * - 3 cartes : 3 colonnes sur grand écran ; sur tablette, la première occupe toute la largeur ;
 * - 2 cartes : 2 colonnes ;
 * - 1 carte : pleine largeur, visuel à gauche et texte à droite.
 */
const featuredGrid: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

export function Projects() {
  const { projects } = useContent();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => projects.items.filter((p) => filter === "all" || p.categories.includes(filter)),
    [projects.items, filter],
  );
  const featured = visible.filter((p) => p.featured);
  const others = visible.filter((p) => !p.featured);

  return (
    <section id="projets" aria-labelledby="projects-title" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index={3} title={projects.title} lead={projects.lead} id="projects-title" />

        {/* Filtres */}
        <Reveal className="mb-10">
          {/* Grille 2 × 2 sur mobile (pas de filtre isolé sur une ligne), pilule sur écran plus large */}
          <div
            role="group"
            aria-label={projects.filterLabel}
            className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-elev/50 p-1 sm:inline-flex sm:rounded-full"
          >
            {projects.filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300 sm:rounded-full sm:px-5 sm:py-2 ${
                    active ? "bg-fg text-bg" : "text-muted hover:text-fg"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          {/* Annonce du résultat pour les lecteurs d'écran */}
          <p className="sr-only" aria-live="polite">
            {projects.resultsLabel(visible.length)}
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-10">
          {/* Projets phares */}
          {featured.length > 0 && (
            <ul className={`grid gap-6 ${featuredGrid[featured.length] ?? featuredGrid[3]}`}>
              <AnimatePresence mode="popLayout" initial={false}>
                {featured.map((project, i) => (
                  <m.li
                    key={project.slug}
                    {...itemMotion}
                    className={featured.length === 3 && i === 0 ? "md:col-span-2 lg:col-span-1" : undefined}
                  >
                    <FeaturedCard
                      project={project}
                      content={projects}
                      layout={featured.length === 1 ? "wide" : featured.length === 3 && i === 0 ? "wide-tablet" : "stacked"}
                    />
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
          )}

          {/* Autres projets, en lignes pleine largeur */}
          {others.length > 0 && (
            <ul className="border-t border-line">
              <AnimatePresence mode="popLayout" initial={false}>
                {others.map((project) => (
                  <m.li key={project.slug} {...itemMotion} className="border-b border-line">
                    <ProjectRow project={project} content={projects} />
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Classes de la disposition « visuel à gauche, texte à droite ». */
const wideLayouts = {
  wide: { article: "md:grid md:grid-cols-2", cover: "md:aspect-auto md:h-full md:border-b-0 md:border-r" },
  "wide-tablet": {
    article: "md:max-lg:grid md:max-lg:grid-cols-2",
    cover: "md:max-lg:aspect-auto md:max-lg:h-full md:max-lg:border-b-0 md:max-lg:border-r",
  },
  stacked: { article: "", cover: "" },
} as const;

function FeaturedCard({
  project,
  content,
  layout,
}: {
  project: Project;
  content: ProjectsContent;
  layout: keyof typeof wideLayouts;
}) {
  const classes = wideLayouts[layout];

  return (
    <TiltCard max={3} className="h-full rounded-3xl">
      <article
        className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-elev/60 transition-colors duration-500 hover:border-line-strong ${classes.article}`}
      >
        <div className={`relative aspect-[16/10] overflow-hidden border-b border-line bg-bg ${classes.cover}`}>
          {project.featured && <ProjectCover kind={project.featured.cover} />}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
          <CategoryTags categories={project.categories} labels={content.categoryLabels} />

          <div>
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            {project.subtitle && <p className="mt-1 font-mono text-xs text-muted">{project.subtitle}</p>}
          </div>

          <p className="text-sm text-muted">{project.description}</p>

          {project.highlights && (
            <ul className="space-y-1.5 text-sm">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-signal" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          {project.note && <Note text={project.note} label={content.noteLabel} />}

          <div className="mt-auto flex flex-col gap-5 pt-2">
            <StackList stack={project.stack} />
            <ProjectLinks project={project} content={content} />
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

function ProjectRow({ project, content }: { project: Project; content: ProjectsContent }) {
  return (
    <article className="group relative grid gap-4 px-1 py-7 transition-colors duration-300 hover:bg-elev/40 sm:px-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-10">
      {/* Repère coloré au survol */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-4 left-0 w-0.5 origin-top scale-y-0 rounded-full transition-transform duration-500 ease-out-expo group-hover:scale-y-100 ${
          categoryDot[project.categories[0]]
        }`}
      />

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <CategoryTags categories={project.categories} labels={content.categoryLabels} />
        </div>
        {project.subtitle && <p className="font-mono text-xs text-muted">{project.subtitle}</p>}
        <p className="text-sm text-muted">{project.description}</p>
        {project.note && <Note text={project.note} label={content.noteLabel} />}
      </div>

      <StackList stack={project.stack} />

      <ProjectLinks project={project} content={content} />
    </article>
  );
}

/* ------------------------------------------------------------------ */

function CategoryTags({ categories, labels }: { categories: ProjectCategory[]; labels: Record<ProjectCategory, string> }) {
  return (
    <ul className="flex flex-wrap gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
      {categories.map((c) => (
        <li key={c} className="inline-flex items-center gap-2">
          <span aria-hidden="true" className={`size-2 rounded-full ${categoryDot[c]}`} />
          {labels[c]}
        </li>
      ))}
    </ul>
  );
}

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
      {stack.map((tech) => (
        <li key={tech} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-muted">
          {tech}
        </li>
      ))}
    </ul>
  );
}

/** Précision factuelle, présentée sobrement : une ligne de texte discrète. */
function Note({ text, label }: { text: string; label: string }) {
  return (
    <p className="text-xs italic text-muted">
      <span className="sr-only">{label} : </span>
      {text}
    </p>
  );
}

function ProjectLinks({ project, content }: { project: Project; content: ProjectsContent }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Bouton de démo : affiché uniquement si `demo` est renseigné dans le contenu */}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={content.demoLinkLabel(project.title)}
          className="inline-flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 text-sm font-semibold text-on-accent transition-shadow hover:shadow-[0_8px_24px_-8px_var(--signal)]"
        >
          {content.demoLabel}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      )}
      {project.repos.map((repo) => (
        <a
          key={repo.url}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={content.repoLinkLabel(project.title, repo.label)}
          className="group/link inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium transition-colors hover:border-fg hover:bg-fg hover:text-bg"
        >
          <GitHubIcon width={15} height={15} />
          {repo.label}
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </a>
      ))}
    </div>
  );
}
