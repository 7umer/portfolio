/**
 * Renders public/og-image.jpg — the 1200x630 preview card that LinkedIn,
 * WhatsApp, X and Slack show when the portfolio link is shared.
 * Re-run with `npm run generate:og` if the headline or photo changes.
 */
const sharp = require("sharp");
const fs = require("fs");

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070b14"/>
      <stop offset="55%" stop-color="#0d1220"/>
      <stop offset="100%" stop-color="#131a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="45%" stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#2dd4bf"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.3" r="0.55">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="6" fill="url(#accent)"/>

  <text x="80" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="26"
        font-weight="600" fill="#2dd4bf" letter-spacing="4">UMER.</text>

  <text x="80" y="270" font-family="Segoe UI, Arial, sans-serif" font-size="62"
        font-weight="700" fill="#f1f5f9">Mohammed Talha</text>
  <text x="80" y="344" font-family="Segoe UI, Arial, sans-serif" font-size="62"
        font-weight="700" fill="#f1f5f9">Umer Badal</text>

  <text x="80" y="418" font-family="Segoe UI, Arial, sans-serif" font-size="30"
        font-weight="500" fill="#8b94a7">Full Stack Developer · UI/UX Designer</text>

  <rect x="80" y="470" width="330" height="52" rx="26"
        fill="none" stroke="#6366f1" stroke-opacity="0.5" stroke-width="1.5"/>
  <text x="110" y="503" font-family="Segoe UI, Arial, sans-serif" font-size="21"
        font-weight="500" fill="#c7cdda">Founder, UM Web Solutions</text>
</svg>`;

(async () => {
  const photo = await sharp(fs.readFileSync("public/images/umer.webp"))
    .resize(300, 300, { fit: "cover", position: "top" })
    .composite([
      {
        input: Buffer.from(
          `<svg><circle cx="150" cy="150" r="150" fill="#fff"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  await sharp(Buffer.from(svg))
    .composite([{ input: photo, top: 165, left: 800 }])
    .jpeg({ quality: 90 })
    .toFile("public/og-image.jpg");

  console.log(
    "public/og-image.jpg written —",
    (fs.statSync("public/og-image.jpg").size / 1024).toFixed(0) + "KB"
  );
})();
