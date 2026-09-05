import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";
import { site } from "../content";

/** Counts up from zero the first time it scrolls into view. */
function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const duration = 1200;
        const startTime = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="stat-value">
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="section panel" aria-label="By the numbers">
      <div className="container">
        <div className="stats-grid">
          {site.stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ onViewResume }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">About</span>
          <h2 className="display-2">Who you'd be working with</h2>
        </div>

        <div className="about-grid">
          <motion.div
            className="about-photo"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={site.photo}
              alt={site.name}
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div
            className="about-body"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{site.about}</p>

            <div className="tag-row">
              {site.roleTags.map((role) => (
                <span className="chip" key={role}>
                  {role}
                </span>
              ))}
            </div>

            <div className="hero-cta">
              <button
                type="button"
                className="btn btn--primary"
                onClick={onViewResume}
              >
                <Eye size={16} aria-hidden="true" /> View resume
              </button>
              <a href={site.resume} download className="btn btn--ghost">
                <Download size={16} aria-hidden="true" /> Download resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
