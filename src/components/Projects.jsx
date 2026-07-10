import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

// ============================================================
// PROJECT DATA
// Drop screenshots into /public/images/projects/ using the
// filenames below. Until an image exists, a styled gradient
// placeholder with the project name is shown automatically.
// ============================================================

const DEVELOPER_PROJECTS = [
  {
    title: "MedRoute",
    tag: "SaaS · Pharma CRM",
    desc: "Smart visit management platform for medical representatives — doctor routing, visit logs, sampling, and analytics. Full production deployment with mobile app.",
    stack: ["React", "Django", "PostgreSQL", "Supabase", "Razorpay"],
    url: "https://med-route-snowy.vercel.app",
    image: "/images/projects/medroute.jpg",
  },
];

const DESIGNER_PROJECTS = [
  {
    title: "QuickMart",
    tag: "Startup · Hyperlocal Delivery",
    desc: "10–15 minute grocery delivery platform connecting customers with trusted local stores in Gulbarga. WhatsApp-based ordering, rider recruitment, zero hidden fees.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://quikmart.vercel.app",
    image: "/images/projects/quickmart.jpg",
  },
  {
    title: "Hardline Gym",
    tag: "Client Website · Fitness",
    desc: "Premium gym website with membership plans, trainer profiles, class schedules, and a bold editorial aesthetic built to convert walk-in visitors.",
    stack: ["React", "Tailwind CSS"],
    url: "https://hardline-phi.vercel.app",
    image: "/images/projects/hardline.jpg",
  },
  {
    title: "Meridian Estates",
    tag: "Demo · Luxury Real Estate",
    desc: "Ultra-prime real estate website with animated property showcases, a 3D tower explorer, interactive market map, mortgage calculator, and cinematic scroll effects.",
    stack: ["Next.js", "Three.js", "GSAP", "Tailwind CSS"],
    url: "https://real-estate-psi-mauve.vercel.app",
    image: "/images/projects/meridian.jpg",
  },
  {
    title: "Aanya Kapoor Makeup Artistry",
    tag: "Client Website · Beauty",
    desc: "Elegant portfolio site for a luxury bridal and editorial makeup artist — service listings, portfolio gallery, testimonials, pricing, and booking flow.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://makeup-artists-self.vercel.app",
    image: "/images/projects/makeup.jpg",
  },
  {
    title: "Dental Clinic Demo",
    tag: "Demo · Healthcare",
    desc: "Clean, trust-led dental clinic website showcasing services, doctor profiles, appointment booking CTA, and patient testimonials. Ready to white-label.",
    stack: ["React", "Tailwind CSS"],
    url: "https://demo-dental-web.vercel.app",
    image: "/images/projects/dental.jpg",
  },
  {
    title: "Skin Clinic Demo",
    tag: "Demo · Healthcare",
    desc: "Dermatology clinic website with a premium light aesthetic — treatment listings, before/after showcase section, and WhatsApp-integrated contact form.",
    stack: ["React", "Tailwind CSS"],
    url: "https://skin-clinic-demo.vercel.app",
    image: "/images/projects/skin.jpg",
  },
  {
    title: "General Clinic Demo",
    tag: "Demo · Healthcare",
    desc: "General practice clinic template with doctor availability display, service categories, patient FAQ, and a fully responsive mobile layout.",
    stack: ["React", "Tailwind CSS"],
    url: "https://gen-clinic-demo.vercel.app",
    image: "/images/projects/general.jpg",
  },
];

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ProjectImage({ image, title }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="project-thumb placeholder">
        <span>{title}</span>
      </div>
    );
  }

  return (
    <div className="project-thumb">
      <img src={image} alt={title} onError={() => setErrored(true)} />
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.div
      className="proj-card"
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <ProjectImage image={project.image} title={project.title} />

      <div className="proj-body">
        <span className="proj-tag">{project.tag}</span>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>

        <div className="proj-stack">
          {project.stack.map((tech) => (
            <span key={tech} className="stack-chip">
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-link"
        >
          View Live <FaExternalLinkAlt size={12} />
        </a>
      </div>
    </motion.div>
  );
}

function Projects() {
  const [track, setTrack] = useState("developer");

  // Lets the About.jsx "Designer" / "Developer" cards jump here and
  // switch the active tab automatically.
  React.useEffect(() => {
    const handler = (e) => setTrack(e.detail);
    window.addEventListener("set-project-track", handler);
    return () => window.removeEventListener("set-project-track", handler);
  }, []);

  const activeProjects =
    track === "developer" ? DEVELOPER_PROJECTS : DESIGNER_PROJECTS;

  return (
    <section id="projects" className="section projects-section">
      <span className="section-eyebrow">Featured Work</span>
      <h2 className="section-title">Projects</h2>
      <p className="projects-sub">
        A split view of what I build — full-stack web applications and
        design-led websites.
      </p>

      {/* Tab Switcher */}
      <div className="track-switch">
        <button
          className={track === "developer" ? "active" : ""}
          onClick={() => setTrack("developer")}
        >
          Developer
        </button>
        <button
          className={track === "designer" ? "active" : ""}
          onClick={() => setTrack("designer")}
        >
          Designer
        </button>
        <motion.div
          className="track-pill"
          animate={{ x: track === "developer" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={track}
          className="proj-grid"
          variants={gridVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {activeProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default Projects;