# Updating your portfolio without touching code

Everything on the site — projects, services, your resume, phone number,
testimonials, stat counters — lives in `src/content/`. Nothing is hardcoded
in a component any more.

There are two ways to edit it. **There is no backend and no database.** Your
content lives in this git repo; saving writes a commit, and Vercel rebuilds
the site automatically in about a minute.

---

## Option A — the admin panel (what you'll use day to day)

Go to **https://umer-badal-portfolio.vercel.app/admin/**, log in with GitHub,
and edit through forms. Add a project, upload a screenshot, swap your resume,
hit Save. Done.

This needs a one-time setup — about five minutes. See
[First-time setup](#first-time-setup-once-only) below.

### What you can edit there

| Section | What it controls |
|---|---|
| **Projects** | Add / edit / delete / reorder projects, upload screenshots, set Developer vs Designer |
| **Profile, resume & contact** | Your name, headline, photo, **resume PDF**, email, phone, social links, stat counters |
| **Services** | The numbered services list |
| **Toolkit** | Skill categories and chips |
| **Experience** | Your role timeline |
| **Testimonials** | Client quotes |
| **Process & reasons** | The 8 process steps and the "why work with me" grid |

### Adding a project

1. Open **Projects → New Project**.
2. Fill in the name, category line, description, tech stack and live URL.
3. Under **Show under**, pick Developer or Designer — that's which tab it appears in.
4. Upload a screenshot. **Any size is fine** — it gets compressed automatically
   when the site builds, so you can upload straight from your phone or a
   Retina screenshot without thinking about it.
5. Set **Sort order** — lower numbers appear first.
6. Publish. The site updates in about a minute.

### Swapping your resume

**Profile, resume & contact → Resume PDF → upload.** That single file feeds the
hero buttons, the About section, the preview modal and the command palette.

---

## Option B — edit the files directly

If you'd rather not set up the admin panel, or you want to change something
quickly, edit the JSON straight on GitHub:

1. Go to your repo → `src/content/`.
2. Click the file, then the pencil icon.
3. Edit, then **Commit changes**. Vercel redeploys automatically.

```
src/content/
├── site.json          Name, headline, photo, resume, contact, stats
├── services.json      The services list
├── skills.json        Toolkit categories
├── experience.json    Role timeline
├── testimonials.json  Client quotes
├── process.json       Process steps + "why work with me"
└── projects/          One file per project — add a file, add a project
    ├── medroute.json
    └── …
```

To add a project this way, copy any file in `projects/`, rename it, and change
the values. The site picks up new files automatically — no import to update.

---

## First-time setup (once only)

The admin panel signs you in with your GitHub account. GitHub requires a small
server-side step for that, which is already written (`api/auth.js` and
`api/callback.js`). You just need to create the GitHub app and paste two values
into Vercel.

### 1. Create a GitHub OAuth app

Go to **https://github.com/settings/developers → OAuth Apps → New OAuth App**.

| Field | Value |
|---|---|
| Application name | `Portfolio CMS` |
| Homepage URL | `https://umer-badal-portfolio.vercel.app` |
| Authorization callback URL | `https://umer-badal-portfolio.vercel.app/api/callback` |

Click **Register application**. Copy the **Client ID**, then click
**Generate a new client secret** and copy that too. The secret is shown once —
copy it before leaving the page.

### 2. Add them to Vercel

In your Vercel project → **Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `OAUTH_GITHUB_CLIENT_ID` | the Client ID |
| `OAUTH_GITHUB_CLIENT_SECRET` | the client secret |

Make sure both are enabled for **Production**.

### 3. Redeploy

Vercel → **Deployments → ⋯ → Redeploy** on the latest one. Environment
variables only reach a build that runs after they're added.

Then open `/admin/`, click **Login with GitHub**, authorise it once, and you're in.

> Keep the client secret out of the repo. It belongs only in Vercel's
> environment variables — that's why `api/callback.js` reads it from
> `process.env` and never sends it to the browser.

### If the domain changes

Update the callback URL in the GitHub OAuth app, and `base_url` in
`public/admin/config.yml`, to match the new domain.

---

## Editing locally

To use the admin panel on your own machine without logging in:

```bash
npm run cms
```

Then, in a second terminal:

```bash
npm start
```

Open http://localhost:3000/admin/ — it writes straight to your local files
(`local_backend: true` in the config enables this, and only on localhost).

---

## Things that still need code

Genuinely structural changes — adding a whole new section, changing the layout,
altering colours — are code edits:

- **Colours and theme** — the tokens at the top of `src/styles/base.css`.
  Both light and dark are defined there and nowhere else.
- **Section order** — the list inside `<main>` in `src/App.js`.
- **New icon options** — add the import to `src/components/icons.js` *and* the
  name to the matching `options` list in `public/admin/config.yml`. If the two
  drift apart the site falls back to a neutral icon rather than breaking.
