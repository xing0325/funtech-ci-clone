// Strip saved SSR HTML down to visible text so each slide's real copy can be
// reverse-engineered into the clone's data layer.
import fs from "fs";
import path from "path";

const dir = process.argv[2];
const outDir = path.join(dir, "text");
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
for (const f of files) {
  let html = fs.readFileSync(path.join(dir, f), "utf8");
  html = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&nbsp;/g, " ");
  const lines = html
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !/^[{}[\],:"]+$/.test(l));
  fs.writeFileSync(path.join(outDir, f.replace(".html", ".txt")), [...new Set(lines)].join("\n"));
}
console.log("extracted text for", files.length, "pages");
