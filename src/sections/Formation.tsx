import { motion } from "framer-motion";
import { GiGraduateCap } from "react-icons/gi";

type FormationEntry = {
  title: string;
  institution: string;
  date: string;
  status?: string;
};

const formations: FormationEntry[] = [
  {
    title: "Licence Informatique Développement d’Application",
    institution: "Université Numérique Cheikh Hamidou Kane (UNCHK)",
    date: "2022 – 2025",
  },
  {
    title: "Licence Informatique Appliquée à la Gestion des Entreprises",
    institution: "Institut Supérieur d’Informatique (ISI)",
    date: "2021 – 2024",
  },
  {
    title: "Certificat en Developpement Front-End",
    institution: "Institut Professionnel de Formation",
    date: "Février 2025 – Mai 2025",
  },
  {
    title: "Certificat en Informatique et Internet",
    institution: "Force N",
    date: "Mars 2025",
  },
];

const Formation = () => {
  return (
    <section
      id="formation"
      className="min-h-screen px-6 py-16 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-black text-white mx-auto"
    >
      <div className="flex flex-col items-center mb-12">
        <GiGraduateCap size={75} className="mb-4" />
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-cyan-400">
          Formation académique & certifications
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Ligne verticale centrale */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full border-l-2 border-cyan-400"></div>

        {/* Items de la timeline */}
        {formations.map(({ title, institution, date, status }, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`mb-20 relative w-full flex ${
                isLeft ? "justify-start" : "justify-end"
              }`}
            >
              {/* Carte à gauche ou à droite */}
              <div
                className={`w-full sm:w-5/12 bg-gray-900 border border-cyan-500 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-cyan-600 transition-transform transform hover:scale-[1.03] cursor-default ${
                  isLeft ? "text-left" : "text-right"
                }`}
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-sky-400 mb-1">
                  {title}
                </h3>
                <p className="italic text-gray-300 mb-1">{institution}</p>
                <span className="text-sm text-gray-400">{date}</span>
                {status && (
                  <p className="text-sm text-cyan-400 mt-2 font-medium">{status}</p>
                )}
              </div>

              {/* Cercle centré sur la ligne avec animation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center">
                <motion.span
                  className="w-8 h-8 bg-cyan-500 rounded-full border-2 border-black shadow-lg"
                  aria-hidden="true"
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Formation;
