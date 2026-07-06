import fs from "fs";
import path from "path";
const dir = process.argv[2]; // .../original/slides
const map = {
  "01-home": ["01","HOME"], "02": ["02","BRAND MESSAGE"], "03": ["03","CI UPDATE"],
  "04": ["04","VISION VISUAL"], "05": ["05","FUNTECH WAY"], "06": ["06","A MILLION-VOLT CREATIVE"],
  "07": ["07","BREAKERS OF VICTORY"], "08": ["08","ALL FOR FUN"], "09": ["09","LOGO DETAILS"],
  "10": ["10","LOGO VARIATION"], "11": ["11","10th SPECIAL ITEM"], "12": ["12","ENDING MESSAGE"],
  "13": ["13","WE ARE FUNTECH"], "14": ["14","FIN"],
};
const out = {};
for (const k of Object.keys(map)) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, k + ".json"), "utf8").replace(/^﻿/, ""));
  out[k] = { n: map[k][0], title: map[k][1], text: j.text.slice(0, 16), images: j.images };
}
fs.writeFileSync(path.join(dir, "..", "deck-content.json"), JSON.stringify(out, null, 2));
console.log("wrote deck-content.json —", Object.keys(out).length, "slides");
