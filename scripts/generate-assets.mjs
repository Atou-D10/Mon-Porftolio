/**
 * Génère les images statiques du site (à relancer si le logo ou le titre change) :
 *   npm run generate:assets
 * - favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png à partir de public/favicon.svg (sharp)
 * - og-image.png (1200×630) : capture d'une page HTML avec les vraies polices du site,
 *   via un navigateur Chromium headless (Edge ou Chrome). Chemin modifiable avec BROWSER_PATH.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");

// 1. Icônes
const svg = await readFile(path.join(pub, "favicon.svg"));
for (const [name, size] of [
  ["favicon-32.png", 32],
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
]) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(path.join(pub, name));
  console.log(`✓ ${name}`);
}

// 2. Image Open Graph
const candidates = [
  process.env.BROWSER_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));

if (!browser) {
  console.warn("⚠ Aucun navigateur Chromium trouvé : og-image.png non régénérée (définir BROWSER_PATH).");
  process.exit(0);
}

const font = (pkg, file) => pathToFileURL(path.join(root, "node_modules/@fontsource-variable", pkg, "files", file)).href;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Display;src:url(${font("bricolage-grotesque", "bricolage-grotesque-latin-wght-normal.woff2")})}
@font-face{font-family:Mono;src:url(${font("jetbrains-mono", "jetbrains-mono-latin-wght-normal.woff2")})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0B0D12;color:#E8EAF0;font-family:Display;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgb(232 234 240/.07) 1px,transparent 1px),linear-gradient(90deg,rgb(232 234 240/.07) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:radial-gradient(ellipse at 75% 40%,#000,transparent 75%)}
.glow{position:absolute;right:-120px;top:-160px;width:620px;height:620px;border-radius:50%;background:rgb(255 138 61/.16);filter:blur(110px)}
.wrap{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;justify-content:space-between;font-family:Mono;font-size:22px;color:#8C94A8}
.dot{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:10px;vertical-align:middle}
h1{font-size:150px;line-height:.86;letter-spacing:-.045em;font-weight:600}
h1 span{color:#FF8A3D}
.roles{font-family:Mono;font-size:28px;margin-top:28px}
.roles b{color:#FF8A3D;font-weight:400;margin-right:14px}
svg{position:absolute;right:80px;bottom:150px}
</style></head><body><div class="grid"></div><div class="glow"></div>
<svg width="360" height="200" viewBox="0 0 360 200"><polyline points="10,180 90,120 170,150 250,70 340,20" fill="none" stroke="#3DD9C1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
<g fill="#3DD9C1"><circle cx="10" cy="180" r="8"/><circle cx="90" cy="120" r="8"/><circle cx="170" cy="150" r="8"/><circle cx="250" cy="70" r="8"/></g><circle cx="340" cy="20" r="12" fill="#FF8A3D"/></svg>
<div class="wrap"><div class="top"><span><i class="dot" style="background:#3DD9C1"></i>Dakar, Sénégal</span><span>atou-diagne-portfolio.netlify.app</span></div>
<div><h1>Atou<br>Diagne<span>.</span></h1><p class="roles"><b>&gt;</b>Data Analyst · Data Scientist · Développeur Fullstack</p></div></div>
</body></html>`;

const tmp = await mkdtemp(path.join(root, "node_modules", ".og-"));
const htmlPath = path.join(tmp, "og.html");
const pngPath = path.join(tmp, "og.png");
await writeFile(htmlPath, html);

const args = [
  "--headless",
  // Profil dédié : sinon le navigateur déjà ouvert intercepte la commande
  `--user-data-dir=${path.join(tmp, "profile")}`,
  "--no-first-run",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--window-size=1200,630",
  "--virtual-time-budget=3000",
  `--screenshot=${pngPath}`,
  pathToFileURL(htmlPath).href,
];

// Sous Windows, le lanceur du navigateur rend la main avant que la capture soit écrite :
// on attend que le fichier apparaisse (jusqu'à 30 s).
try {
  execFileSync(browser, args, { stdio: "ignore", timeout: 60_000 });
} catch {
  /* le code de sortie du lanceur n'est pas fiable, seul le fichier compte */
}
for (let waited = 0; waited < 30_000 && !existsSync(pngPath); waited += 250) {
  await new Promise((resolve) => setTimeout(resolve, 250));
}
await new Promise((resolve) => setTimeout(resolve, 500)); // fin d'écriture

if (!existsSync(pngPath)) {
  console.warn("⚠ Capture impossible : og-image.png non régénérée.");
  process.exit(1);
}

await sharp(pngPath).resize(1200, 630).png({ compressionLevel: 9 }).toFile(path.join(pub, "og-image.png"));
await rm(tmp, { recursive: true, force: true });
console.log("✓ og-image.png");
