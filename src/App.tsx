import { LazyMotion, MotionConfig } from "framer-motion";
import { Cursor } from "./components/Cursor";
import { Header } from "./components/Header";
import { ScrollProgress } from "./components/ScrollProgress";
import { ContentProvider, useContent } from "./content";
import { About } from "./sections/About";
import { Hero } from "./sections/Hero";
import { Skills } from "./sections/Skills";

// Les fonctionnalités d'animation sont chargées après le premier rendu
const loadMotionFeatures = () => import("./lib/motion-features").then((mod) => mod.default);

function Page() {
  const t = useContent();

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
      >
        {t.nav.skip}
      </a>
      <ScrollProgress />
      <Header />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skills />
      </main>
      <Cursor />
    </>
  );
}

export default function App() {
  return (
    <ContentProvider locale="fr">
      <LazyMotion features={loadMotionFeatures} strict>
        {/* reducedMotion="user" : Framer Motion respecte prefers-reduced-motion */}
        <MotionConfig reducedMotion="user">
          <Page />
        </MotionConfig>
      </LazyMotion>
    </ContentProvider>
  );
}
