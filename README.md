# Portfolio d'Atou Diagne

Portfolio personnel : Data Analyst, Data Scientist et Développeur Fullstack, basé à Dakar.
En ligne : <https://atou-diagne-portfolio.netlify.app>

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS 4** : design system dans `src/index.css` (couleurs en variables CSS, thème clair et sombre)
- **Framer Motion** : animations interactives, chargées à la demande
- **Prérendu statique** au build (`scripts/prerender.mjs`) : le HTML contient tout le contenu, pour le SEO et pour que Netlify détecte le formulaire de contact
- **Netlify Forms** pour le formulaire de contact

## Scripts

```bash
npm install           # installer les dépendances
npm run dev           # serveur de développement (http://localhost:5173)
npm run build         # build de production + prérendu dans dist/
npm run preview       # prévisualiser le build (http://localhost:4173)
npm run lint          # vérification ESLint
npm run generate:assets  # régénérer les icônes et l'image Open Graph
```

## Modifier le contenu

Tous les textes sont dans **`src/content/fr.ts`**. Les données personnelles (e-mail, liens, CV) sont dans `src/content/profile.ts`.

- **Ajouter une photo** : déposer l'image dans `public/images/` (format 4:5, environ 800 × 1000 px, en WebP de préférence), puis renseigner `photo: { src: "/images/atou.webp", alt: "…" }` dans la section `about` de `fr.ts`. La section À propos passe alors en mise en page « portrait + texte ».
- **Ajouter une démo à un projet** : renseigner `demo: "https://…"` sur le projet dans `fr.ts`. Le bouton « Démo » apparaît automatiquement.
- **Changer de CV** : remplacer `public/CV_Atou_DIAGNE_IA.pdf` (ou modifier `cv.href` dans `profile.ts`).
- **Version anglaise** : créer `src/content/en.ts` en respectant le type `Content` (TypeScript signale chaque texte manquant), puis l'ajouter à `src/content/context.tsx`.

## Structure

```
src/
  content/      textes (fr.ts), profil, types
  sections/     Hero, About, Skills, Projects, Journey, Contact
  components/   en-tête, pied de page, boutons, cartes, animations réutilisables
  lib/          hooks (thème, mouvement réduit, section active…)
scripts/        prérendu et génération des images
public/         CV, favicon, image Open Graph, sitemap, robots.txt
```

## Déploiement sur Netlify

La configuration est dans `netlify.toml` (commande `npm run build`, dossier `dist`, Node 22, en-têtes de cache et de sécurité).

1. Sur Netlify, relier le site au dépôt GitHub (branche `main`).
2. Chaque push sur `main` déclenche un déploiement.
3. **Formulaire de contact** : après le premier déploiement, il apparaît dans *Forms* (nom : `contact`). Pour recevoir les messages par e-mail : *Site configuration → Forms → Form notifications → Add notification → Email notification*.

## Accessibilité et performance

- Respect de `prefers-reduced-motion` : animations coupées, contenu affiché d'emblée.
- Navigation au clavier, lien d'évitement, libellés de formulaire, contrastes AA.
- Lighthouse (mobile) : performance 94-96, accessibilité, bonnes pratiques et SEO à 100.
