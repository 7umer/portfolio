/**
 * Generates the site's favicon and app icons from the "Umer." wordmark.
 *
 * Replaces the Create React App defaults (which were still the React logo).
 * Re-run with `npm run generate:icons` if the branding changes.
 *
 * The artwork is deliberately full-bleed with the glyph inside a centre
 * safe zone: iOS and Android apply their own mask/rounding to home-screen
 * icons, so any corner radius baked in here would be clipped twice.
 */
const sharp = require("sharp");
const fs = require("fs");

const BG = "#080808";
const INK = "#ffffff";
const ACCENT = "#774dff";

/** Square mark: "U" with the wordmark's accent period. */
const icon = (size) => {
  const fontSize = size * 0.56;
  const dot = size * 0.075;
  return Buffer.from(`
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <text x="${size * 0.46}" y="${size * 0.5}"
        font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="${fontSize}" font-weight="700" fill="${INK}"
        text-anchor="middle" dominant-baseline="central">U</text>
  <circle cx="${size * 0.74}" cy="${size * 0.68}" r="${dot}" fill="${ACCENT}"/>
</svg>`);
};

/**
 * Builds a .ico containing PNG frames. ICO is a thin container: a 6-byte
 * header, one 16-byte directory entry per frame, then the payloads.
 */
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(frames.length, 4);

  let offset = 6 + frames.length * 16;
  const entries = [];

  for (const { size, data } of frames) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([
    header,
    ...entries,
    ...frames.map((f) => f.data),
  ]);
}

(async () => {
  const png = (size) => sharp(icon(size)).png().toBuffer();

  // Standalone PNGs referenced by the manifest and <head>.
  for (const [size, file] of [
    [192, "public/logo192.png"],
    [512, "public/logo512.png"],
    [180, "public/apple-touch-icon.png"],
  ]) {
    fs.writeFileSync(file, await png(size));
    console.log(`${file}  ${size}x${size}`);
  }

  // Multi-size .ico for the browser tab.
  const frames = [];
  for (const size of [16, 32, 48]) {
    frames.push({ size, data: await png(size) });
  }
  fs.writeFileSync("public/favicon.ico", buildIco(frames));
  console.log(
    `public/favicon.ico  16+32+48  ${(fs.statSync("public/favicon.ico").size / 1024).toFixed(1)}KB`
  );
})();
