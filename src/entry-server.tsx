import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/** Rendu HTML statique utilisé au build par scripts/prerender.mjs. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
