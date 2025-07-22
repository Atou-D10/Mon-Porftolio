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

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Développeur full-stack passionné, avec une expertise en React, Laravel et Angular. 
          Je crée des applications web innovantes, alliant performance, modernité et expérience utilisateur soignée.
        </p>

        <motion.a
          href="/cv.pdf"
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
