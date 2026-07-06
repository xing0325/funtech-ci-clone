// Decode Next.js App Router RSC flight payloads (self.__next_f.push) from saved HTML
// into readable text, so each slide's real component tree / props can be reverse-engineered.
import fs from "fs";
import path from "path";

const dir = process.argv[2];
const outDir = path.join(dir, "rsc");
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
const re = /self\.__next_f\.push\(\[\d+,"((?:[^"\\]|\\.)*)"\]\)/g;

for (const f of files) {
  const html = fs.readFileSync(path.join(dir, f), "utf8");
  let m, out = "";
  while ((m = re.exec(html))) {
    try {
      out += JSON.parse('"' + m[1] + '"');
    } catch {
      /* skip malformed chunk */
    }
  }
  fs.writeFileSync(path.join(outDir, f.replace(".html", ".txt")), out);
}
console.log("decoded", files.length, "pages");
