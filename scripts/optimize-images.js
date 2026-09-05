/**
 * Compresses everything under public/images in place.
 *
 * This runs automatically before every build (`prebuild` in package.json),
 * which matters because the CMS at /admin uploads whatever file you pick —
 * often a 3MB screenshot straight off a phone or a Retina display. This
 * step caps those before they ever reach a visitor.
 *
 * It deliberately keeps each file's name and extension so a path written
 * into content JSON by the CMS never breaks. It is also idempotent: images
 * already within the limits are skipped, so re-running is free.
 */
const fs = require("fs");
const path = require("path");

// This runs as a prebuild step on the deploy host. Image compression is a
// nice-to-have, never a reason to fail a deploy, so a missing or broken
// native sharp binary degrades to a warning.
let sharp;
try {
  sharp = require("sharp");
} catch (error) {
  console.warn("images: sharp unavailable, skipping optimization —", error.message);
  process.exit(0);
}

const ROOTS = ["public/images", "public"];
const MAX_WIDTH = 1400;
const QUALITY = 84;

// Files that must keep their exact bytes (icons, favicons, social preview).
const SKIP = new Set(["logo192.png", "logo512.png", "favicon.ico", "og-image.jpg"]);

function collect(dir, recurse = true) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return recurse ? collect(full) : [];
    if (SKIP.has(entry.name)) return [];
    return /\.(jpe?g|png|webp)$/i.test(entry.name) ? [full] : [];
  });
}

async function optimize(file) {
  const originalSize = fs.statSync(file).size;
  // Read to a buffer first — handing sharp a path keeps the file open and
  // the overwrite below fails with EBUSY on Windows.
  const input = fs.readFileSync(file);
  const meta = await sharp(input).metadata();

  const needsResize = meta.width > MAX_WIDTH;
  const needsRecompress = originalSize > 220 * 1024;

  if (!needsResize && !needsRecompress) return null;

  let pipeline = sharp(input).resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  const ext = path.extname(file).toLowerCase();
  if (ext === ".png") pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
  else if (ext === ".webp") pipeline = pipeline.webp({ quality: QUALITY });
  else pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });

  const output = await pipeline.toBuffer();

  // Never write a result that came out bigger than what we started with.
  if (output.length >= originalSize) return null;

  fs.writeFileSync(file, output);
  return { file, originalSize, newSize: output.length };
}

(async () => {
  const files = [
    ...collect(ROOTS[0]),
    ...collect(ROOTS[1], false), // top-level public/*.png, not the whole tree
  ];

  let before = 0;
  let after = 0;
  let touched = 0;

  for (const file of files) {
    const result = await optimize(file);
    if (!result) continue;

    touched += 1;
    before += result.originalSize;
    after += result.newSize;
    console.log(
      `  ${path.relative("public", result.file)}  ` +
        `${(result.originalSize / 1024).toFixed(0)}KB → ${(result.newSize / 1024).toFixed(0)}KB`
    );
  }

  if (touched === 0) {
    console.log(`images: ${files.length} checked, all already optimized`);
    return;
  }

  console.log(
    `images: ${touched} of ${files.length} optimized — ` +
      `${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024 / 1024).toFixed(2)}MB`
  );
})().catch((error) => {
  console.warn("images: optimization skipped —", error.message);
  process.exit(0);
});
