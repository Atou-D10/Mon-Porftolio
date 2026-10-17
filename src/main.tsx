import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import App from "./App";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En production, le HTML est prérendu au build (scripts/prerender.mjs) : on l'hydrate.
// L'hydratation est lancée en transition : React la découpe en petites tâches
// (avec les frontières <Suspense> de App.tsx), sans bloquer le thread principal.
// En développement, le conteneur est vide : rendu classique côté client.
if (container.firstElementChild) {
  startTransition(() => {
    hydrateRoot(container, app);
  });
} else {
  createRoot(container).render(app);
}
