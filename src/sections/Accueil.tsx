import { motion } from "framer-motion";
import { Download } from "lucide-react";

const Accueil = () => {
  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-black text-white"
    >
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Bonjour, je suis{" "}
          <span className="text-cyan-400">Atou Diagne</span>
        </h1>

          <h2 className="text-xl md:text-2xl text-cyan-300 font-medium mb-6">
             Data Analyst & Développeur Full-Stack
          </h2>
          
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Spécialisé en Data (analyse, Machine Learning, visualisation) avec une solide expertise
          en développement web full-stack (React, Laravel, Angular).
          Je transforme la donnée en solutions concrètes et en applications performantes.
        </p>

        <motion.a
          href="/CV_ATOU_DIAGNE.pdf"
          download
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
            backgroundColor: "#06b6d4",
            color: "#000",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-cyan-400 text-black font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          <Download size={20} />
          Télécharger mon CV
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Accueil;
