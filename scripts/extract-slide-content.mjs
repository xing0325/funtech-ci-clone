// Pull the real per-slide content out of each decoded RSC payload:
// text nodes, image srcs, and className strings → one JSON per slide, so the
// deck data layer can be authored from the actual source (not guesswork).
import fs from "fs";
import path from "path";

const dir = process.argv[2]; // .../original/rsc
const outDir = path.join(dir, "..", "slides");
fs.mkdirSync(outDir, { recursive: true });

const NAV = new Set([
  "HOME","BRAND MESSAGE","CI UPDATE","VISION VISUAL","FUNTECH WAY",
  "A MILLION-VOLT CREATIVE","BREAKERS OF VICTORY","ALL FOR FUN","LOGO DETAILS",
  "LOGO VARIATION","10th SPECIAL ITEM","ENDING MESSAGE","WE ARE FUNTECH","FIN",
  "JP","EN","PDF","MENU","Not Found","Could not find requested resource","Return Home",
  "FUNTECH BRAND IDENTITY",
]);

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".txt"));
for (const f of files) {
  const rsc = fs.readFileSync(path.join(dir, f), "utf8");

  const text = [...rsc.matchAll(/"children":"((?:[^"\\]|\\.)*)"/g)]
    .map((m) => {
      try { return JSON.parse('"' + m[1] + '"'); } catch { return m[1]; }
    })
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && !/^\$[A-Za-z@]/.test(s) && !NAV.has(s) && !/^\d+$/.test(s));

  const images = [...new Set([...rsc.matchAll(/"src":"([^"]+\.(?:png|jpe?g|gif|webp|svg))"/g)].map((m) => m[1]))];

  const classes = [...new Set([...rsc.matchAll(/"className":"([^"]{4,160})"/g)].map((m) => m[1]))];

  fs.writeFileSync(
    path.join(outDir, f.replace(".txt", ".json")),
    JSON.stringify({ text: [...new Set(text)], images, classSamples: classes.slice(0, 40) }, null, 2),
  );
}
console.log("extracted slide content for", files.length, "slides");
