// Dump a .glb's glTF JSON chunk: materials, textures, images, meshes — to diagnose
// why the model renders untextured/white.
import fs from "fs";
const file = process.argv[2];
const buf = fs.readFileSync(file);
// glb header: magic(4) version(4) length(4); then chunks: length(4) type(4) data
const jsonLen = buf.readUInt32LE(12);
const jsonType = buf.readUInt32LE(16); // 0x4E4F534A = "JSON"
const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString("utf8"));
const binPresent = 20 + jsonLen < buf.length;
console.log("jsonType JSON?", jsonType === 0x4e4f534a, "| has BIN chunk:", binPresent);
console.log("meshes:", (json.meshes || []).length, "| materials:", (json.materials || []).length,
  "| textures:", (json.textures || []).length, "| images:", (json.images || []).length);
console.log("extensionsUsed:", json.extensionsUsed || []);
console.log("\n--- materials ---");
(json.materials || []).forEach((m, i) => {
  const p = m.pbrMetallicRoughness || {};
  console.log(`  [${i}] ${m.name || "(unnamed)"}  baseColor=${JSON.stringify(p.baseColorFactor)} metal=${p.metallicFactor} rough=${p.roughnessFactor} tex=${p.baseColorTexture ? "yes" : "no"}`);
});
console.log("\n--- images ---");
(json.images || []).forEach((im, i) => console.log(`  [${i}] ${im.name || ""} mime=${im.mimeType || ""} uri=${im.uri || "(embedded)"} bufferView=${im.bufferView}`));
