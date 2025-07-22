import { motion } from "framer-motion";
import {
  FaReact,
  FaLaravel,
  FaAngular,
  FaJs,
  FaPhp,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiSharp,SiC } from "react-icons/si";

const skills = [
  { name: "React", icon: <FaReact size={40} className="text-cyan-400" /> },
  { name: "Laravel", icon: <FaLaravel size={40} className="text-red-500" /> },
  { name: "Angular", icon: <FaAngular size={40} className="text-red-600" /> },
  { name: "JavaScript", icon: <FaJs size={40} className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript size={40} className="text-blue-400" /> },
  { name: "PHP", icon: <FaPhp size={40} className="text-indigo-300" /> },
  { name: "Python", icon: <FaPython size={40} className="text-yellow-300" /> },
  { name: "Java", icon: <FaJava size={40} className="text-orange-500" /> },
  { name: "C#", icon: <SiSharp size={40} className="text-purple-400" /> },
  { name: "C", icon: <SiC size={40} className="text-blue-300" /> },
  { name: "HTML5", icon: <FaHtml5 size={40} className="text-orange-400" /> },
  { name: "CSS3", icon: <FaCss3Alt size={40} className="text-blue-500" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={40} className="text-cyan-300" /> },
  { name: "Bootstrap", icon: <FaBootstrap size={40} className="text-purple-500" /> },
  { name: "Base de données", icon: <FaDatabase size={40} className="text-green-400" /> },
  { name: "Git", icon: <FaGitAlt size={40} className="text-orange-300" /> },
];

const Competences = () => {
  return (
    <section
      id="competences"
      className="min-h-screen px-6 py-16 bg-gradient-to-br from-black via-[#111] to-gray-900 text-white"
    >
      <motion.h2
        className="text-4xl font-bold text-center text-cyan-400 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Compétences techniques
      </motion.h2>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {skills.map(({ name, icon }, index) => (
          <motion.div
            key={name}
            className="flex flex-col items-center bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-cyan-400/20 transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {icon}
            <span className="mt-4 text-center text-sm font-medium">{name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Competences;
