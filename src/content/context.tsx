import { createContext, useContext, type ReactNode } from "react";
import { fr } from "./fr";
import type { Content, Locale } from "./types";

/**
 * Dictionnaires disponibles. Pour ajouter l'anglais :
 * créer `en.ts` (typé `Content`), l'ajouter ici, puis prérendre une page /en.
 */
const dictionaries: Partial<Record<Locale, Content>> & { fr: Content } = { fr };

const ContentContext = createContext<Content>(fr);

export function ContentProvider({ locale = "fr", children }: { locale?: Locale; children: ReactNode }) {
  return <ContentContext.Provider value={dictionaries[locale] ?? fr}>{children}</ContentContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => useContext(ContentContext);
