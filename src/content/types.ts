/**
 * Schéma du contenu du site.
 * Chaque langue (fr.ts, puis en.ts plus tard) implémente ce type :
 * TypeScript signale ainsi toute traduction manquante.
 */

export type Locale = "fr" | "en";

export type SectionId = "accueil" | "a-propos" | "competences" | "projets" | "parcours" | "contact";

export type ProjectCategory = "data" | "fullstack";

export interface ProjectLink {
  kind: "code" | "demo";
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  category: ProjectCategory;
  title: string;
  subtitle?: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
}

export interface SkillGroup {
  id: "data" | "dev" | "tools";
  title: string;
  description: string;
  blocks: { label: string; items: string[] }[];
}

export interface JourneyItem {
  type: "experience" | "education";
  title: string;
  org: string;
  period: string;
  current?: boolean;
  note?: string;
  details?: string[];
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
    facts: { value: string; label: string }[];
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
    groups: SkillGroup[];
  };
  projects: {
    title: string;
    lead: string;
    filters: { id: "all" | ProjectCategory; label: string }[];
    categoryLabels: Record<ProjectCategory, string>;
    resultsLabel: (count: number) => string;
    items: Project[];
  };
  journey: {
    title: string;
    lead: string;
    typeLabels: Record<JourneyItem["type"], string>;
    currentLabel: string;
    items: JourneyItem[];
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
