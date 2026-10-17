// Fonctionnalités Framer Motion chargées à la demande (voir LazyMotion dans App.tsx)
// pour alléger le bundle initial. domAnimation suffit : le site n'utilise pas
// d'animations de « layout », plus coûteuses (mesure de toute la page).
import { domAnimation } from "framer-motion";

export default domAnimation;
