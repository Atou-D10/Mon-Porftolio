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
    groups: [
      {
        id: "data",
        title: "Data & IA",
        description: "Préparer, explorer, modéliser et visualiser la donnée.",
        blocks: [
          { label: "Langages", items: ["Python", "SQL"] },
          {
            label: "Analyse",
            items: ["Pandas", "Nettoyage et préparation", "Analyse exploratoire (EDA)", "Analyse statistique"],
          },
          { label: "Visualisation", items: ["Power BI", "Matplotlib", "Seaborn"] },
          { label: "Machine & Deep Learning", items: ["Scikit-learn", "TensorFlow", "Keras"] },
        ],
      },
      {
        id: "dev",
        title: "Développement",
        description: "Concevoir des applications web complètes, du front à la base de données.",
        blocks: [
          { label: "Langages", items: ["JavaScript", "TypeScript", "PHP", "C#", "Java", "HTML", "CSS"] },
          { label: "Frameworks", items: ["React", "Angular", "Node.js", "Laravel", "Tailwind CSS"] },
          { label: "Bases de données", items: ["MySQL", "PostgreSQL", "SQL Server", "MongoDB", "Firebase"] },
        ],
      },
      {
        id: "tools",
        title: "Outils",
        description: "Collaborer, versionner, tester et documenter.",
        blocks: [
          { label: "Code & versionnement", items: ["Git", "GitHub", "VS Code", "Jupyter Notebook"] },
          { label: "API & conception", items: ["Postman", "Figma"] },
          { label: "Organisation", items: ["Jira", "Taskade"] },
        ],
      },
    ],
  },

  projects: {
    title: "Projets",
    lead: "Une sélection de projets data et fullstack. Le code de chacun est disponible sur GitHub.",
    filters: [
      { id: "all", label: "Tous" },
      { id: "data", label: "Data" },
      { id: "fullstack", label: "Fullstack" },
    ],
    categoryLabels: { data: "Data", fullstack: "Fullstack" },
    resultsLabel: (count) => `${count} projet${count > 1 ? "s" : ""} affiché${count > 1 ? "s" : ""}`,
    items: [
      {
        slug: "stack-overflow-survey",
        category: "data",
        title: "Analyse du marché des développeurs",
        subtitle: "Stack Overflow Developer Survey 2025",
        description:
          "Analyse de plus de 23 000 réponses pour identifier les facteurs qui influencent le salaire et la satisfaction des développeurs : langage, expérience, mode de travail, études et poste.",
        highlights: [
          "Nettoyage avec Pandas : valeurs manquantes, salaires aberrants, colonnes multi-valeurs",
          "Analyse exploratoire selon 6 angles, avec vérification de la fiabilité statistique",
          "Dashboard Power BI interactif de 7 pages",
        ],
        stack: ["Python", "Pandas", "Power BI"],
        links: [{ kind: "code", label: "Code", url: "https://github.com/Atou-D10/So-survey-analysis" }],
      },
      {
        slug: "meteo-dakar",
        category: "data",
        title: "Analyse météo de Dakar",
        subtitle: "Pipeline de données 2025",
        description:
          "Pipeline complet de traitement des données météo de Dakar pour 2025, de la collecte via l'API Open-Meteo jusqu'aux requêtes SQL analytiques.",
        highlights: [
          "Collecte via l'API Open-Meteo",
          "Nettoyage et transformation avec Pandas, stockage dans PostgreSQL hébergé sur Render",
          "Requêtes SQL analytiques et visualisations Matplotlib dans Jupyter",
        ],
        stack: ["Python", "Pandas", "PostgreSQL", "SQL", "Matplotlib"],
        links: [{ kind: "code", label: "Code", url: "https://github.com/Atou-D10/Projet_Meteo" }],
      },
      {
        slug: "reussite-etudiante",
        category: "data",
        title: "Prédiction de réussite étudiante",
        subtitle: "Machine learning",
        description:
          "Modèle de machine learning qui prédit la réussite d'étudiants à partir de données académiques : heures d'étude, présence, absences, devoirs et notes.",
        highlights: [
          "Exploration et préparation des données (EDA)",
          "Entraînement d'un modèle de régression logistique",
          "Évaluation des performances et visualisation des résultats",
        ],
        stack: ["Python", "Scikit-learn", "Jupyter"],
        links: [{ kind: "code", label: "Code", url: "https://github.com/Atou-D10/projet_ml_etudiant" }],
      },
      {
        slug: "gestion-immobiliere",
        category: "fullstack",
        title: "Plateforme de gestion immobilière",
        subtitle: "Application web complète",
        description:
          "Application web qui permet aux agences immobilières de gérer leurs activités, avec une API Laravel et une interface React.",
        highlights: [
          "Gestion des biens immobiliers",
          "Suivi des locations impayées",
          "Génération automatisée des quittances",
        ],
        stack: ["Laravel", "React", "MySQL", "Sanctum"],
        links: [
          { kind: "code", label: "Front", url: "https://github.com/Atou-D10/Gestion_Agence_Immo_front" },
          { kind: "code", label: "API", url: "https://github.com/Atou-D10/Gestion_Agence_Immo" },
        ],
      },
      {
        slug: "vnr-erp",
        category: "fullstack",
        title: "VNR ERP : gestion des clients",
        subtitle: "Test technique de recrutement",
        description:
          "Module de gestion des clients d'un ERP : API REST sécurisée par JWT et tableau de bord React de type ERP.",
        highlights: [
          "Authentification JWT (connexion, déconnexion, rafraîchissement)",
          "CRUD clients avec suppression douce, recherche et pagination",
          "Documentation API interactive avec Swagger",
        ],
        stack: ["Laravel 12", "PostgreSQL", "JWT", "React", "Tailwind CSS"],
        links: [{ kind: "code", label: "Code", url: "https://github.com/Atou-D10/vnr-clients-erp" }],
      },
      {
        slug: "ai-workspace",
        category: "fullstack",
        title: "AI Workspace",
        subtitle: "Plateforme de services d'IA",
        description:
          "Application web qui simule une plateforme de services d'IA : chat, résumé de texte, traduction et prédiction, connectés à l'API Groq.",
        highlights: [
          "Chat, résumé et traduction via un LLM (API Groq)",
          "Historique local des requêtes, avec recherche et suppression",
          "Tableau de bord avec statistiques et graphiques",
        ],
        stack: ["JavaScript", "HTML", "CSS", "API Groq"],
        links: [{ kind: "code", label: "Code", url: "https://github.com/Atou-D10/AI-Workspace-" }],
      },
      {
        slug: "restaurant-sushi",
        category: "fullstack",
        title: "Gestion de restaurant",
        subtitle: "Restaurant de sushi",
        description:
          "Application de gestion d'un restaurant de sushi : commande en ligne, réservation de tables, paiement en ligne et outils pour le gestionnaire.",
        highlights: [
          "Commande et paiement en ligne",
          "Réservation d'une ou plusieurs tables",
          "Optimisation des tâches du gestionnaire",
        ],
        stack: ["Angular", "Laravel", "MySQL"],
        links: [
          { kind: "code", label: "Front", url: "https://github.com/Atou-D10/Gestion_restaurant_frontend" },
          { kind: "code", label: "API", url: "https://github.com/Atou-D10/Gestion_restaurant_backend" },
        ],
      },
      {
        slug: "meme-creator",
        category: "fullstack",
        title: "Meme Creator",
        subtitle: "Application React",
        description: "Application React pour créer, sauvegarder, télécharger et partager des mèmes.",
        highlights: ["Création de mèmes", "Sauvegarde, téléchargement et partage", "Déployée sur GitHub Pages"],
        stack: ["React", "Vite", "Tailwind CSS"],
        links: [
          { kind: "demo", label: "Démo", url: "https://atou-d10.github.io/meme-creator" },
          { kind: "code", label: "Code", url: "https://github.com/Atou-D10/meme-creator" },
        ],
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
