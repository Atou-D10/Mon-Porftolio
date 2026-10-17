/**
 * Schéma du contenu du site.
 * Chaque langue (fr.ts, puis en.ts plus tard) implémente ce type :
 * TypeScript signale ainsi toute traduction manquante.
 */

export type Locale = "fr" | "en";

export type SectionId = "accueil" | "a-propos" | "competences" | "projets" | "parcours" | "contact";

export type ProjectCategory = "data" | "web" | "desktop";

/** Visuel généré affiché sur les cartes des projets phares (aucune photo). */
export type ProjectCover = "survey" | "realestate" | "ai";

export interface Project {
  slug: string;
  /** Un projet peut apparaître dans plusieurs filtres (ex. AI Workspace : data + web). */
  categories: ProjectCategory[];
  /** Projet phare : grande carte avec visuel. Sinon, ligne compacte. */
  featured?: { cover: ProjectCover };
  title: string;
  subtitle?: string;
  description: string;
  /** Précision factuelle affichée à part (données simulées, module de démonstration…). */
  note?: string;
  highlights?: string[];
  stack: string[];
  /** Dépôts GitHub : un ou plusieurs (ex. front et API). */
  repos: { label: string; url: string }[];
  /** Lien de démo en ligne : le bouton n'apparaît que si ce champ est renseigné. */
  demo?: string;
}

export interface SkillGroup {
  id: "data" | "dev" | "tools";
  title: string;
  description: string;
  /** Sous-catégories : `core` = compétences principales (mises en avant), `items` = complémentaires. */
  blocks: { label: string; core: string[]; items: string[] }[];
}

export interface EducationItem {
  title: string;
  org: string;
  /** Période affichée dans la colonne de dates de la timeline. */
  period: string;
  /** Formation en cours : badge « En cours » et point pulsé. */
  current?: boolean;
  /** Mention obtenue (badge discret à côté de l'établissement). */
  mention?: string;
  /** Sous-éléments d'une entrée groupée (ex. certificats d'un même organisme). */
  items?: { title: string; period: string }[];
}

export interface ExperienceItem {
  title: string;
  org: string;
  period: string;
  missions: string[];
}

export interface Content {
  meta: {
    lang: string;
    title: string;
    description: string;
  };
  nav: {
    skip: string;
    links: { id: SectionId; label: string }[];
    cv: string;
    theme: string;
    openMenu: string;
    closeMenu: string;
    home: string;
  };
  hero: {
    location: string;
    rolesLabel: string;
    roles: string[];
    pitch: string;
    ctaProjects: string;
    ctaCv: string;
    ctaContact: string;
    tracks: { data: string; fullstack: string };
    now: { label: string; value: string }[];
    scroll: string;
  };
  about: {
    title: string;
    lead: string;
    paragraphs: string[];
    /** Les deux facettes du profil hybride. */
    tracks: { id: "fullstack" | "data"; title: string; description: string; tags: string[] }[];
    facts: { value: string; label: string }[];
    portrait: { figure: string; caption: string; legendData: string; legendDev: string };
    languagesTitle: string;
    languages: { name: string; level: string }[];
    softSkillsTitle: string;
    softSkills: string[];
    /** Photo optionnelle : renseigner { src, alt } pour l'afficher à la place du monogramme. */
    photo?: { src: string; alt: string };
  };
  skills: {
    title: string;
    lead: string;
    legend: { core: string; secondary: string };
    groups: SkillGroup[];
  };
  projects: {
    title: string;
    lead: string;
    filters: { id: "all" | ProjectCategory; label: string }[];
    filterLabel: string;
    categoryLabels: Record<ProjectCategory, string>;
    resultsLabel: (count: number) => string;
    repoLinkLabel: (project: string, repo: string) => string;
    demoLabel: string;
    demoLinkLabel: (project: string) => string;
    noteLabel: string;
    items: Project[];
  };
  journey: {
    title: string;
    lead: string;
    educationTitle: string;
    experienceTitle: string;
    currentLabel: string;
    education: EducationItem[];
    experience: ExperienceItem[];
  };
  contact: {
    title: string;
    lead: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      honeypot: string;
    };
    channelsTitle: string;
    labels: { email: string; phone: string; location: string; github: string; linkedin: string };
    location: string;
  };
  footer: {
    tagline: string;
    rights: string;
    backToTop: string;
    built: string;
  };
}
