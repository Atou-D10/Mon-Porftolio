import { FaCode, FaCogs, FaDesktop, FaDatabase, FaFileExcel, FaTabletAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { SiLinux } from "react-icons/si";


const services = [
  {
    title: "Développement web full-stack",
    description: "Création d’applications performantes avec React, Laravel, Angular…",
    icon: <FaCode size={28} />,
  },
  {
    title: "Création d’API REST sécurisées",
    description: "Mise en place d’API robustes avec authentification et gestion des rôles.",
    icon: <FaCogs size={28} />,
  },
  {
    title: "Applications desktop",
    description: "Conception d’applications Windows multiplateformes en Java et C#.",
    icon: <FaDesktop size={28} />,
  },
  {
    title: "Administration système Linux",
    description: "Gestion des serveurs, déploiement, scripts shell et surveillance système.",
    icon: <SiLinux size={28} />,
  },
  {
    title: "Bases de données relationnelles",
    description: "Intégration et modélisation avec MySQL, PostgreSQL, SQL Server.",
    icon: <FaDatabase size={28} />,
  },
  {
    title: "UI responsive",
    description: "Interfaces modernes et adaptatives avec Tailwind CSS et Bootstrap.",
    icon: <FaTabletAlt size={28} />,
  },
  {
    title: "Traitement avancé de données Excel",
    description: "Automatisation, analyse et export avec Excel (niveau avancé).",
    icon: <FaFileExcel size={28} />,
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="min-h-screen bg-gradient-to-br from-black via-[#111] to-gray-900 px-6 py-16 text-white"
    >
      <motion.h2
        className="text-4xl font-bold text-center text-cyan-400 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Services
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-cyan-400/20 transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-center text-cyan-400 mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-center text-cyan-300 mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-gray-300 text-center">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
