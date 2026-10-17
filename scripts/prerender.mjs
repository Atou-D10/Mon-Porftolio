/**
 * Prérendu statique : injecte le HTML de l'application dans dist/index.html.
 * - le contenu est lisible par les moteurs de recherche sans JavaScript ;
 * - le formulaire de contact est présent dans le HTML, ce qui permet
 *   à Netlify Forms de le détecter au déploiement.
 * Ajoute aussi le préchargement des polices utilisées au-dessus de la ligne de flottaison.
 */
import { readFile, writeFile, readdir, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const appHtml = render();

// Polices latines du titre et du texte, préchargées pour limiter le décalage d'affichage
const assets = await readdir(path.join(dist, "assets"));
const preloadFonts = assets
  .filter((f) => /^(bricolage-grotesque|inter)-latin-wght-normal-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join("\n    ");

const indexPath = path.join(dist, "index.html");
const template = await readFile(indexPath, "utf8");

if (!template.includes("<!--app-html-->")) {
  throw new Error("Marqueur <!--app-html--> introuvable dans dist/index.html");
}

const html = template.replace("<!--app-html-->", appHtml).replace("<!--preload-fonts-->", preloadFonts);

await writeFile(indexPath, html);
await rm(ssrDir, { recursive: true, force: true });

console.log(`Prérendu OK : ${(html.length / 1024).toFixed(1)} kB, ${preloadFonts ? "polices préchargées" : "aucune police à précharger"}`);
