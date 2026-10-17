import { LazyMotion, MotionConfig } from "framer-motion";
import { Suspense } from "react";
import { Cursor } from "./components/Cursor";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ScrollProgress } from "./components/ScrollProgress";
import { ContentProvider, useContent } from "./content";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Journey } from "./sections/Journey";
import { Projects } from "./sections/Projects";
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
        {/* Une frontière Suspense par section : React hydrate chaque bloc séparément
            et rend la main au navigateur entre deux (pas de tâche longue). */}
        <Suspense fallback={null}>
          <Hero />
        </Suspense>
        <Suspense fallback={null}>
          <About />
        </Suspense>
        <Suspense fallback={null}>
          <Skills />
        </Suspense>
        <Suspense fallback={null}>
          <Projects />
        </Suspense>
        <Suspense fallback={null}>
          <Journey />
        </Suspense>
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
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
