import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://ci.funtech.inc';
const dirs = ['public/fonts', 'public/thumbnails/en', 'public/noise-border', 'public/sound', 'public/stickers'];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

async function dl(url, dest, headers = {}) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/149', ...headers } });
    if (!res.ok) { console.log(`  ✗ ${res.status} ${url.slice(0,60)}`); return false; }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`  ✓ ${dest} (${(buf.length/1024).toFixed(1)}kb)`);
    return true;
  } catch (e) { console.log(`  ✗ ERR ${url.slice(0,60)}: ${e.message}`); return false; }
}

// 1) FONTS from typekit
console.log('== fonts (typekit) ==');
const css = fs.readFileSync('docs/research/typekit.css', 'utf8');
const blocks = css.match(/@font-face\s*{[^}]*}/g) || [];
const map = { 'proxima-nova|700': 'proxima-nova-700', 'proxima-nova|600': 'proxima-nova-600', 'elevon|800': 'elevon-800', 'elevon|400': 'elevon-400' };
const fontResults = {};
for (const b of blocks) {
  const fam = (b.match(/font-family:\s*"([^"]+)"/) || [])[1];
  const wt = (b.match(/font-weight:\s*(\d+)/) || [])[1];
  const url = (b.match(/url\("?([^")]+)"?\)\s*format\("woff2"\)/) || b.match(/url\("?([^")]+)"?\)/) || [])[1];
  const name = map[`${fam}|${wt}`];
  if (name && url) {
    const ok = await dl(url, `public/fonts/${name}.woff2`, { Referer: 'https://use.typekit.net/pfl7wcw.css', Origin: ORIGIN });
    fontResults[name] = ok;
  }
}

// 2) THUMBNAILS (14 sections)
console.log('== thumbnails ==');
const thumbs = ['home','brand-message','ci-update','vision-visual','funtech-way','megavolt-creative','breakers-of-victory','all-for-fun','logo-details','logo-variation','10th-special-item','ending-message','we-are-funtech','fin'];
for (const t of thumbs) await dl(`${ORIGIN}/thumbnails/en/${t}.webp`, `public/thumbnails/en/${t}.webp`, { Referer: ORIGIN + '/' });

// 3) NOISE BORDERS (fun theme)
console.log('== noise borders ==');
for (const n of ['fun-h','fun-v','volt-h','volt-v','breaker-h','breaker-v']) await dl(`${ORIGIN}/noise-border/${n}.png`, `public/noise-border/${n}.png`, { Referer: ORIGIN + '/' });

// 4) SOUND
console.log('== sound ==');
await dl(`${ORIGIN}/sound/bgm.mp3`, `public/sound/bgm.mp3`, { Referer: ORIGIN + '/' });

// 5) sticker
console.log('== sticker ==');
await dl(`${ORIGIN}/stickers/gif/zyan.gif`, `public/stickers/zyan.gif`, { Referer: ORIGIN + '/' });

console.log('\nFONT RESULTS:', JSON.stringify(fontResults));
console.log('done');
