import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { ArrowRight, Download, Eye } from "lucide-react";
import { site } from "../content";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Hero({ onViewResume }) {
  return (
    <section id="home" className="hero">
      <span className="hero-glow" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="hero-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div>
            <motion.div variants={item} className="hero-status">
              <i aria-hidden="true" />
              {site.availability}
            </motion.div>

            <motion.div variants={item} className="hero-role">
              <Typewriter
                options={{
                  strings: site.roles,
                  autoStart: true,
                  loop: true,
                  delay: 45,
                  deleteSpeed: 25,
                }}
              />
            </motion.div>

            <motion.h1 variants={item} className="display-1">
              {site.headline}
            </motion.h1>

            <motion.p variants={item} className="lead">
              I'm {site.name} — I design and build premium websites and SaaS
              products for startups, clinics, real estate brands and local
              businesses, as the founder of{" "}
              <a href={site.company.url} target="_blank" rel="noreferrer">
                {site.company.name}
              </a>
              .
            </motion.p>

            <motion.div variants={item} className="hero-cta">
              <a href="#work" className="btn btn--primary">
                View my work <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
                onClick={onViewResume}
              >
                <Eye size={16} aria-hidden="true" /> View resume
              </a>
              <a href={site.resume} download className="btn btn--ghost">
                <Download size={16} aria-hidden="true" /> Download
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hero-portrait"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={site.photo} alt={site.name} fetchPriority="high" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
