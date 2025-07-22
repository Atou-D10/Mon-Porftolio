import React, { useState } from "react";
import {
  FaHome,
  FaBook,
  FaAward,
  FaBriefcase,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaCode,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Accueil", href: "#accueil", icon: FaHome },
    { name: "Formation", href: "#formation", icon: FaBook },
    { name: "Compétences", href: "#competences", icon: FaAward },
    { name: "Projets", href: "#projets", icon: FaCode }, 
    { name: "Services", href: "#services", icon: FaBriefcase },
    { name: "Contact", href: "#contact", icon: FaEnvelope },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 bg-[#111827] shadow-md z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.div
          className="text-cyan-400 text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Atou Diagne
        </motion.div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8 text-white text-lg">
          {links.map(({ name, href, icon: Icon }, index) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <a
                href={href}
                className="group flex items-center space-x-2 transition duration-300 ease-in-out"
              >
                <Icon
                  size={22}
                  className="text-cyan-400 group-hover:text-[#8bc2fa] transition duration-300"
                />
                <span className="group-hover:text-[#97a9f884] transition duration-300">
                  {name}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-cyan-400 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            className="md:hidden bg-[#1f2937] text-white space-y-3 px-6 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map(({ name, href, icon: Icon }) => (
              <motion.li key={name} whileHover={{ scale: 1.05 }}>
                <a
                  href={href}
                  className="flex items-center space-x-2 py-2 text-cyan-300 hover:text-[#a78bfa] transition"
                  onClick={() => setOpen(false)}
                >
                  <Icon size={20} className="text-cyan-400" />
                  <span>{name}</span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
