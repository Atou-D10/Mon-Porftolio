import { motion } from "framer-motion";

const projects = [
  {
    title: "Gestion Agence Immobilière",
    image: "/images/agence.jpeg",
    description: "Application de gestion complète pour agences immobilières. (Projet en cours)",
    technologies: ["React", "Laravel", "MySQL"],
    github: "https://github.com/Atou-D10/Gestion_Agence_Immo",
  },
  {
    title: "Site de Restaurant",
    image: "/images/restaurant.jpg",
    description: "Site interactif avec menu, réservation et espace admin.",
    technologies: ["Laravel", "Angular", "MySQL"],
    github: "https://github.com/Atou-D10/Gestion_restaurant_backend",
  },
  {
    title: "Système de Pointage des Employés",
    image: "/images/pointage.jpg",
    description: "Application de suivi des présences et rapports RH.",
    technologies: ["Laravel", "MySQL"],
    github: "https://github.com/Atou-D10/Systeme_pointage",
  },
  {
    title: "Site de Covoiturage",
    image: "/images/covoiturage.jpg",
    description: "Plateforme web de mise en relation pour covoiturage.",
    technologies: ["Java", "MySQL"],
    github: "https://github.com/Atou-D10/Covoiturage_java",
  },
  {
    title: "Gestion des Plaintes",
    image: "/images/police.jpg",
    description: "Application bureau pour suivi des réclamations clients.",
    technologies: ["C#", "SQL Server"],
    github: "https://github.com/Atou-D10/Gestion_plainte_C-",
  },
];

const Projets = () => {
  return (
    <section
      id="projets"
      className="min-h-screen px-6 py-16 bg-gradient-to-br from-black via-[#111] to-gray-900 text-white"
    >
      <motion.h2
        className="text-4xl font-bold text-center text-cyan-400 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mes Projets
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(({ title, image, description, technologies, github }, index) => (
<motion.div
  key={title}
  className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-400/20 transition transform hover:-translate-y-2"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
>
  {/* Image + Overlay dans un seul bloc */}
  <div className="relative">
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition duration-300 flex items-center justify-center p-4">
      <p className="text-gray-200 text-sm text-center">{description}</p>
    </div>
  </div>

  {/* Titre et contenu */}
  <div className="p-4">
    <h3 className="text-lg font-semibold text-cyan-400 text-center">
      {title}
    </h3>

    {/* Technologies utilisées */}
    <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs text-gray-300">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="bg-gray-800 px-2 py-1 rounded-full border border-cyan-500"
        >
          {tech}
        </span>
      ))}
    </div>

    {/* Bouton GitHub */}
    <div className="mt-4 text-center">
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-3 py-1 text-sm text-white bg-cyan-600 hover:bg-cyan-700 rounded transition"
      >
        Voir sur GitHub
      </a>
    </div>
  </div>
</motion.div>

        ))}
      </div>
    </section>
  );
};

export default Projets;
