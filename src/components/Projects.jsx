import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../content";

const TRACKS = [
  { id: "developer", label: "Developer" },
  { id: "designer", label: "Designer" },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const card = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function Thumb({ image, title }) {
  const [errored, setErrored] = useState(false);

  if (!image || errored) {
    return (
      <div className="proj-thumb is-placeholder">
        <span>{title}</span>
      </div>
    );
  }

  return (
    <div className="proj-thumb">
      <img
        src={image}
        alt={`${title} — project screenshot`}
        loading="lazy"
        decoding="async"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.article className="proj-card" variants={card}>
      <Thumb image={project.image} title={project.title} />

      <div className="proj-body">
        <div className="proj-meta">
          <span>{project.tag}</span>
          {project.year && <span>{project.year}</span>}
        </div>

        <h3>{project.title}</h3>
        <p>{project.desc}</p>

        <div className="proj-stack">
          {(project.stack || []).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-link"
          >
            View live site
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}

function Projects() {
  const [track, setTrack] = useState("developer");

  // Lets other sections jump here and switch the active tab.
  useEffect(() => {
    const handler = (e) => setTrack(e.detail);
    window.addEventListener("set-project-track", handler);
    return () => window.removeEventListener("set-project-track", handler);
  }, []);

  const visible = projects.filter((p) => p.track === track);

  const onTabKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = TRACKS.findIndex((t) => t.id === track);
    const next = e.key === "ArrowRight" ? i + 1 : i - 1;
    setTrack(TRACKS[(next + TRACKS.length) % TRACKS.length].id);
  };

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className="display-2">Things I've shipped</h2>
          </div>
          <p className="lead">
            A split view of what I build — full-stack web applications on one
            side, design-led websites on the other.
          </p>
        </div>

        <div
          className="track-switch"
          role="tablist"
          aria-label="Filter projects"
          onKeyDown={onTabKeyDown}
        >
          {TRACKS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={track === t.id}
              aria-controls="project-panel"
              tabIndex={track === t.id ? 0 : -1}
              onClick={() => setTrack(t.id)}
            >
              {t.label}
            </button>
          ))}
          <motion.span
            className="track-pill"
            aria-hidden="true"
            animate={{
              x: track === "developer" ? 0 : "100%",
            }}
            style={{ width: `calc((100% - 0.64rem) / ${TRACKS.length})` }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          />
        </div>

        <div
          id="project-panel"
          role="tabpanel"
          aria-labelledby={`tab-${track}`}
          tabIndex={-1}
        >
          <motion.div
            key={track}
            className="proj-grid"
            variants={grid}
            initial="hidden"
            animate="show"
          >
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

          {visible.length === 0 && (
            <p className="lead">No projects in this track yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
