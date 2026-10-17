import type { Content } from "./types";

/**
 * Contenu français du site.
 * Source de vérité : CV_Atou_DIAGNE_IA.pdf et README des dépôts GitHub.
 */
export const fr: Content = {
  meta: {
    lang: "fr",
    title: "Atou Diagne | Data Analyst, Data Scientist et Développeur Fullstack",
    description:
      "Portfolio d'Atou Diagne, basé à Dakar : Data Analyst et Data Scientist en formation, avec une base solide en développement fullstack. Projets data, machine learning et applications web.",
  },

  nav: {
    skip: "Aller au contenu",
    links: [
      { id: "a-propos", label: "À propos" },
      { id: "competences", label: "Compétences" },
      { id: "projets", label: "Projets" },
      { id: "parcours", label: "Parcours" },
      { id: "contact", label: "Contact" },
    ],
    cv: "CV",
    theme: "Basculer entre thème clair et sombre",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    home: "Atou Diagne, retour à l'accueil",
  },

  hero: {
    location: "Dakar, Sénégal",
    rolesLabel: "Data Analyst, Data Scientist, Machine Learning et Développeur Fullstack",
    roles: ["Data Analyst", "Data Scientist", "Machine Learning", "Développeur Fullstack"],
    pitch:
      "Je combine développement logiciel fullstack et traitement de la donnée (nettoyage, analyse exploratoire, machine learning, visualisation) pour construire des solutions basées sur la donnée et l'IA.",
    ctaProjects: "Voir mes projets",
    ctaCv: "Télécharger le CV",
    ctaContact: "Me contacter",
    tracks: { data: "Data / IA", fullstack: "Fullstack" },
    now: [
      { label: "En formation", value: "Intelligence Artificielle · Orange Digital Center" },
      { label: "Master 2", value: "IA & Data Science · Swiss UMEF University" },
      { label: "Dernière expérience", value: "Développeur Full Stack · Keops Technologies" },
    ],
    scroll: "Défiler",
  },

  about: {
    title: "À propos",
    lead: "Un profil hybride, entre le code et la donnée.",
    paragraphs: [
      "Data Analyst et Data Scientist en formation, j'ai d'abord construit une base solide en développement logiciel fullstack : sites web, API, bases de données et déploiement.",
      "En formation continue à l'Orange Digital Center (Intelligence Artificielle) et en Master 2 IA & Data Science à Swiss UMEF University, je développe aujourd'hui mes compétences en traitement, analyse et valorisation des données : nettoyage, analyse exploratoire, machine learning et visualisation.",
      "Mon objectif : relier ces deux mondes pour concevoir des solutions basées sur la donnée et l'IA, de l'analyse jusqu'à l'application.",
    ],
    tracks: [
      {
        id: "fullstack",
        title: "Développement fullstack",
        description:
          "Sites web et applications : interfaces modernes et responsives, API, bases de données, optimisation des performances et déploiement.",
        tags: ["React", "Angular", "Laravel", "Node.js"],
      },
      {
        id: "data",
        title: "Data & IA",
        description:
          "Traitement et valorisation des données : nettoyage, analyse exploratoire, machine learning et visualisation.",
        tags: ["Python", "Pandas", "Scikit-learn", "Power BI"],
      },
    ],
    portrait: {
      figure: "fig. 01 · profil",
      caption: "Dakar, Sénégal",
      legendData: "Data / IA",
      legendDev: "Fullstack",
    },
    facts: [
      { value: "23 000+", label: "réponses analysées dans mon étude Stack Overflow Survey 2025" },
      { value: "M2", label: "IA & Data Science à Swiss UMEF University, en cours" },
      { value: "TB", label: "mention Très Bien en Licence à l'ISI" },
    ],
    languagesTitle: "Langues",
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Intermédiaire" },
    ],
    softSkillsTitle: "Qualités",
    softSkills: [
      "Rigueur et sens du détail",
      "Esprit d'analyse et de synthèse",
      "Travail en équipe",
      "Autonomie",
      "Gestion du temps",
      "Bonne communication",
      "Curiosité technologique",
      "Capacité d'adaptation",
      "Résolution de problèmes",
    ],
  },

  skills: {
    title: "Compétences",
    lead: "Des outils pour analyser la donnée, et d'autres pour construire les applications qui l'utilisent.",
    legend: { core: "Principales", secondary: "Complémentaires" },
    groups: [
      {
        id: "data",
        title: "Data & IA",
        description: "Préparer, explorer, modéliser et visualiser la donnée, jusqu'aux modèles de langage.",
        blocks: [
          {
            label: "Analyse de données",
            core: ["Pandas", "SQL"],
            items: ["NumPy", "Analyse exploratoire (EDA)", "Analyse statistique"],
          },
          { label: "Visualisation", core: ["Power BI"], items: ["Matplotlib", "Seaborn"] },
          { label: "Machine & Deep Learning", core: ["Scikit-learn", "PyTorch"], items: ["TensorFlow", "Keras"] },
          {
            label: "IA générative & API",
            core: ["LLM", "RAG"],
            items: ["Intégration d'un LLM par API (Groq)", "Requests (API REST)"],
          },
        ],
      },
      {
        id: "dev",
        title: "Développement",
        description: "Concevoir des applications complètes : interfaces, API, bases de données et logiciels desktop.",
        blocks: [
          {
            label: "Langages",
            core: ["Python", "JavaScript", "TypeScript", "PHP"],
            items: ["C#", "Java", "HTML", "CSS"],
          },
          {
            label: "Frontend",
            core: ["React", "Angular", "Tailwind CSS"],
            items: ["React Router", "Vite", "Recharts", "Alpine.js", "Bootstrap"],
          },
          {
            label: "Backend & API",
            core: ["Laravel", "Node.js", "Conception d'API REST"],
            items: ["Laravel Breeze", "Laravel Sanctum"],
          },
          {
            label: "Applications desktop",
            core: [],
            items: ["JavaFX", "Hibernate / JPA", "Lombok", ".NET Framework (WPF)", "Entity Framework", "LiveCharts"],
          },
          {
            label: "Bases de données",
            core: ["MySQL", "PostgreSQL"],
            items: ["SQL Server", "MongoDB", "Firebase"],
          },
          {
            label: "Documents & paiement",
            core: [],
            items: ["Paiement en ligne (PayDunya)", "Génération de PDF (DomPDF, iTextSharp)", "Génération de QR codes"],
          },
        ],
      },
      {
        id: "tools",
        title: "Outils",
        description: "Collaborer, versionner, tester, documenter et déployer.",
        blocks: [
          { label: "Code & versionnement", core: ["Git", "GitHub"], items: ["VS Code", "Jupyter Notebook"] },
          { label: "API, design & organisation", core: ["Postman"], items: ["Figma", "Jira", "Taskade"] },
          { label: "Build, tests & déploiement", core: [], items: ["Maven", "JUnit", "Netlify", "Render"] },
        ],
      },
    ],
  },

  projects: {
    title: "Projets",
    lead: "Une sélection de projets data, web et desktop. Le code de chacun est disponible sur GitHub.",
    filters: [
      { id: "all", label: "Tous" },
      { id: "data", label: "Data & IA" },
      { id: "web", label: "Fullstack web" },
      { id: "desktop", label: "Desktop" },
    ],
    filterLabel: "Filtrer les projets par catégorie",
    categoryLabels: { data: "Data & IA", web: "Fullstack web", desktop: "Desktop" },
    resultsLabel: (count) => `${count} projet${count > 1 ? "s" : ""} affiché${count > 1 ? "s" : ""}`,
    repoLinkLabel: (project, repo) => `${project} : code ${repo === "Code" ? "" : `(${repo}) `}sur GitHub, nouvel onglet`,
    demoLabel: "Démo",
    demoLinkLabel: (project) => `${project} : démo en ligne, nouvel onglet`,
    noteLabel: "Précision",
    items: [
      // ---------- Projets phares ----------
      {
        slug: "stack-overflow-survey",
        categories: ["data"],
        featured: { cover: "survey" },
        title: "Analyse du marché des développeurs",
        subtitle: "Stack Overflow Developer Survey 2025",
        description:
          "Analyse de plus de 23 000 réponses pour identifier les facteurs qui influencent le salaire et la satisfaction des développeurs : langage, expérience, mode de travail, études et poste.",
        highlights: [
          "Nettoyage avec Pandas : valeurs manquantes, salaires aberrants, colonnes multi-valeurs",
          "Analyse exploratoire selon 6 angles, avec vérification de la fiabilité statistique",
          "Dashboard Power BI interactif de 7 pages",
        ],
        stack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Jupyter"],
        repos: [{ label: "Code", url: "https://github.com/Atou-D10/So-survey-analysis" }],
      },
      {
        slug: "gestion-immobiliere",
        categories: ["web"],
        featured: { cover: "realestate" },
        title: "Plateforme de gestion immobilière",
        subtitle: "Application web complète",
        description:
          "Application web qui permet aux agences immobilières de gérer leurs activités, avec une API REST Laravel sécurisée par Sanctum et une interface React.",
        highlights: [
          "Gestion des biens immobiliers",
          "Suivi des locations impayées",
          "Génération automatisée des quittances",
        ],
        stack: ["Laravel", "React", "MySQL", "Sanctum", "Bootstrap", "Vite"],
        repos: [
          { label: "Front", url: "https://github.com/Atou-D10/Gestion_Agence_Immo_front" },
          { label: "API", url: "https://github.com/Atou-D10/Gestion_Agence_Immo" },
        ],
      },
      {
        slug: "ai-workspace",
        categories: ["data", "web"],
        featured: { cover: "ai" },
        title: "AI Workspace",
        subtitle: "Plateforme de services d'IA",
        description:
          "Prototype d'une plateforme de services d'IA, développé sans framework. Le chat, le résumé de texte et la traduction sont connectés à un LLM via l'API Groq, avec un historique des requêtes enregistré localement, consultable et supprimable.",
        highlights: [
          "Chat, résumé et traduction via l'API Groq",
          "Historique local des requêtes, avec recherche et suppression",
        ],
        stack: ["JavaScript", "HTML", "CSS", "API Groq (LLM)"],
        repos: [{ label: "Code", url: "https://github.com/Atou-D10/AI-Workspace-" }],
      },

      // ---------- Autres projets (lignes compactes) ----------
      {
        slug: "meteo-dakar",
        categories: ["data"],
        title: "Analyse météo de Dakar",
        subtitle: "Pipeline de données 2025",
        description:
          "Collecte des données météo de Dakar via l'API Open-Meteo, nettoyage avec Pandas, stockage dans PostgreSQL hébergé sur Render, puis requêtes SQL analytiques et graphiques Matplotlib dans Jupyter.",
        stack: ["Python", "Requests", "Pandas", "PostgreSQL", "SQL", "Matplotlib", "Jupyter"],
        repos: [{ label: "Code", url: "https://github.com/Atou-D10/Projet_Meteo" }],
      },
      {
        slug: "reussite-etudiante",
        categories: ["data"],
        title: "Prédiction de réussite étudiante",
        subtitle: "Machine learning",
        description:
          "Régression logistique qui prédit la réussite d'un étudiant à partir des heures d'étude, de la présence, des absences, des devoirs et de la note de contrôle, avec analyse exploratoire, évaluation du modèle et visualisation des résultats.",
        note: "Jeu de données généré pour l'exercice.",
        stack: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "Jupyter"],
        repos: [{ label: "Code", url: "https://github.com/Atou-D10/projet_ml_etudiant" }],
      },
      {
        slug: "systeme-pointage",
        categories: ["web"],
        title: "Système de pointage des employés",
        subtitle: "Application web Laravel",
        description:
          "Deux espaces authentifiés, RH et employés : gestion des employés, code QR généré pour chaque employé et utilisé pour le pointage, lancement des paiements mensuels et téléchargement des factures en PDF.",
        stack: ["Laravel", "Laravel Breeze", "Tailwind CSS", "Alpine.js", "MySQL", "DomPDF", "Bacon QR Code"],
        repos: [{ label: "Code", url: "https://github.com/Atou-D10/Systeme_pointage" }],
      },
      {
        slug: "covoiturage",
        categories: ["desktop"],
        title: "Covoiturage",
        subtitle: "Application desktop JavaFX",
        description:
          "Application desktop de covoiturage : inscription et connexion avec mots de passe hachés (BCrypt), espaces conducteur et passager, gestion des véhicules, des trajets et des réservations, administration des utilisateurs et envoi d'e-mails.",
        stack: ["Java", "JavaFX", "Hibernate / JPA", "MySQL", "Maven", "Lombok", "JavaMail"],
        repos: [{ label: "Code", url: "https://github.com/Atou-D10/Covoiturage_java" }],
      },
      {
        slug: "gestion-plaintes",
        categories: ["desktop"],
        title: "Gestion des plaintes",
        subtitle: "Application desktop WPF",
        description:
          "Application desktop de suivi des plaintes : dépôt par les usagers, administration des commissariats et des enquêteurs, affectation des plaintes et suivi de leur état avec graphiques, génération de rapports PDF.",
        stack: ["C#", ".NET Framework (WPF)", "Entity Framework", "SQL Server", "LiveCharts", "iTextSharp"],
        repos: [{ label: "Code", url: "https://github.com/Atou-D10/Gestion_plainte_C-" }],
      },
    ],
  },

  journey: {
    title: "Parcours",
    lead: "Formations et expérience professionnelle, de la plus récente à la plus ancienne.",
    typeLabels: { experience: "Expérience", education: "Formation" },
    currentLabel: "En cours",
    items: [
      {
        type: "education",
        title: "Formation en Intelligence Artificielle",
        org: "Orange Digital Center, Dakar",
        period: "Juillet 2026 à aujourd'hui",
        current: true,
      },
      {
        type: "experience",
        title: "Développeur Full Stack",
        org: "Keops Technologies",
        period: "Août à octobre 2025",
        details: [
          "Développement et maintenance de sites web pour l'entreprise et ses clients",
          "Optimisation des fonctionnalités et amélioration des performances applicatives",
          "Gestion de la base de données et participation au déploiement",
          "Intégration d'interfaces web modernes et responsives",
          "Participation ponctuelle à l'analyse de données internes pour soutenir l'optimisation de fonctionnalités",
        ],
      },
      {
        type: "education",
        title: "Master 2 IA et Data Science",
        org: "Swiss UMEF University, Dakar",
        period: "2025 à aujourd'hui",
        current: true,
      },
      {
        type: "education",
        title: "Certificat en développement Front-End",
        org: "FORCE-N",
        period: "Mai à septembre 2025",
      },
      {
        type: "education",
        title: "Certificat en Informatique et Internet",
        org: "FORCE-N",
        period: "Février à mars 2025",
      },
      {
        type: "education",
        title: "Licence Informatique, Développement d'application",
        org: "Université Numérique Cheikh Hamidou Kane (UNCHK)",
        period: "2022 à 2025",
      },
      {
        type: "education",
        title: "Licence Informatique appliquée à la gestion des entreprises",
        org: "Institut Supérieur d'Informatique (ISI)",
        period: "2021 à 2024",
        note: "Mention Très Bien",
      },
    ],
  },

  contact: {
    title: "Contact",
    lead: "Un projet, un poste ou une collaboration en data ou en développement ? Écrivez-moi, je vous réponds rapidement.",
    form: {
      name: "Nom",
      email: "Email",
      message: "Message",
      submit: "Envoyer le message",
      sending: "Envoi en cours…",
      success: "Merci, votre message a bien été envoyé. Je vous réponds au plus vite.",
      error: "L'envoi a échoué. Réessayez, ou écrivez-moi directement par email.",
      honeypot: "Ne remplissez pas ce champ",
    },
    channelsTitle: "Coordonnées",
    labels: { email: "Email", phone: "Téléphone", location: "Localisation", github: "GitHub", linkedin: "LinkedIn" },
    location: "Dakar, Sénégal",
  },

  footer: {
    tagline: "Data Analyst, Data Scientist et Développeur Fullstack, basé à Dakar.",
    rights: "Tous droits réservés.",
    backToTop: "Retour en haut",
    built: "Conçu et développé avec React, Tailwind CSS et Framer Motion.",
  },
};
