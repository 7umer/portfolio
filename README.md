# Mohammed Talha Umer Badal — Portfolio

Personal portfolio and freelance shopfront. React SPA, deployed on Vercel.

**Live:** https://umer-badal-portfolio.vercel.app

> **Updating content?** You almost certainly want **[CONTENT.md](CONTENT.md)** —
> projects, resume, contact details and copy are all editable without touching
> code, through the admin panel at `/admin/`.

---

## Stack

| | |
|---|---|
| Framework | React 19 (Create React App) |
| Animation | Framer Motion, Lenis (smooth scroll), Typewriter Effect |
| Icons | Lucide |
| Content | JSON files in `src/content/`, edited via Decap CMS |
| Contact form | Web3Forms |
| Hosting | Vercel (static build + two serverless functions for CMS login) |

## Running locally

```bash
npm install
npm start
```

Create a `.env` in the project root with your Web3Forms access key:

```
REACT_APP_WEB3FORMS_KEY=your-key-here
```

To edit content locally through the admin UI, run `npm run cms` in a second
terminal and open http://localhost:3000/admin/.

## Scripts

| Script | What it does |
|---|---|
| `npm start` | Dev server |
| `npm run build` | Production build (runs `prebuild` first) |
| `npm run prebuild` | Compresses everything in `public/images` — runs automatically |
| `npm run optimize:images` | Same, on demand |
| `npm run generate:og` | Regenerates `public/og-image.jpg`, the social link preview |
| `npm run cms` | Decap local backend, for editing content offline |

## Project layout

```
api/                    Vercel functions — GitHub OAuth for the CMS only
public/
├── admin/              Decap CMS (index.html + config.yml)
├── images/             Photos and project screenshots (WebP)
└── resume.pdf
scripts/                Image optimizer + OG image generator
src/
├── content/            ← all editable copy lives here
├── components/         One file per section, plus overlays
├── hooks/useTheme.js   Light/dark, follows the OS until the visitor chooses
├── styles/
│   ├── base.css        Design tokens, reset, typography, layout
│   └── components.css  Everything else
└── App.js              Section order
```

## Design system

Both themes are defined entirely by custom properties at the top of
`src/styles/base.css` — `:root` for light, `[data-theme="dark"]` for dark.
No colour is hardcoded anywhere else, so retheming the whole site means
editing that one block.

The layout alternates full-bleed contrast blocks (`.panel`) against the base
background. In light mode a panel is near-black; in dark mode it lifts to a
raised charcoal so long sections don't become a glaring white slab.

Theme choice is stored in `localStorage` and applied by a small inline script
in `public/index.html` before first paint, so there's no flash on load.

## Images

Screenshots are served as WebP and compressed automatically at build time by
`scripts/optimize-images.js`. Anything wider than 1400px or heavier than
~220KB is resized and re-encoded in place, keeping its filename — so an
oversized upload from the CMS can never ship as-is. The step is deliberately
non-fatal: if `sharp` is unavailable it warns and the build continues.

## Contact form

`src/components/Contact.jsx` posts to Web3Forms. The access key is a
`REACT_APP_`-prefixed variable, so it is inlined into the client bundle —
that is how Web3Forms is designed to work, and the key is a public submission
key, not a secret. The GitHub OAuth *client secret* used by the CMS is a real
secret and lives only in Vercel's environment variables, never in this repo.
