import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        "service_ab2gfbs",
        "template_l0qtckh",
        form.current,
        "P9vDCffGWxqQSyv9c"
      )
      .then(() => {
        setSent(true);
        form.current?.reset();
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="flex justify-center items-center gap-3 text-4xl font-bold text-cyan-400 mb-4">
          <FaPaperPlane className="text-4xl" />
          Contactez-moi
        </h2>
        <p className="text-center text-gray-300 mb-10">
          Une idée de projet ou une collaboration ? Envoyez-moi un message.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="user_name"
              placeholder="Votre nom"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white border border-cyan-500 rounded"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Votre email"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white border border-cyan-500 rounded"
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Votre message"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white border border-cyan-500 rounded"
            />
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded"
            >
              Envoyer
            </button>
            {sent && (
              <p className="text-green-400 text-center">
                Message envoyé avec succès !
              </p>
            )}
          </form>

          {/* Infos personnelles */}
          <div className="space-y-6 text-gray-300 text-lg">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-cyan-400 text-2xl" />
              <span className="text-xl font-medium">
                atoudiagne01@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-cyan-400 text-2xl" />
              <span className="text-xl font-medium">+221 77 734 44 64</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-cyan-400 text-2xl" />
              <span className="text-xl font-medium">Dakar, Sénégal</span>
            </div>
            <div className="mt-6 flex gap-6 text-3xl text-cyan-400">
              <a
                href="https://github.com/Atou-D10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/atou-diagne-73700a268/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
