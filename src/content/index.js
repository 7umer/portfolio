/**
 * Single entry point for every piece of editable content on the site.
 *
 * Components must never hardcode copy — import from here instead. The JSON
 * files in this folder are what the CMS at /admin writes to, so anything
 * reachable from this module can be edited without touching code.
 */
import site from "./site.json";
import services from "./services.json";
import skills from "./skills.json";
import experience from "./experience.json";
import testimonials from "./testimonials.json";
import process from "./process.json";

// Projects live one-per-file so the CMS can list, reorder and delete them
// individually. require.context picks up new files automatically — adding
// a project is dropping a JSON file in ./projects, nothing else.
const projectContext = require.context("./projects", false, /\.json$/);

const projects = projectContext
  .keys()
  .map((key) => ({ id: key.replace(/^\.\/|\.json$/g, ""), ...projectContext(key) }))
  .filter((p) => p.title)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export const projectsByTrack = (track) =>
  projects.filter((p) => p.track === track);

export const tracks = [...new Set(projects.map((p) => p.track))];

export {
  site,
  projects,
  services,
  skills,
  experience,
  testimonials,
  process,
};
