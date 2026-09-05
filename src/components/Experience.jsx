import React from "react";
import { motion } from "framer-motion";
import { experience, skills } from "../content";

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Experience</span>
          <h2 className="display-2">Where I've been</h2>
        </div>

        <div className="exp-list">
          {experience.items.map((exp, i) => (
            <motion.div
              className="exp-row"
              key={`${exp.role}-${exp.org}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <span className="exp-period">{exp.period}</span>
              <div>
                <h3>{exp.role}</h3>
                <p className="exp-org">{exp.org}</p>
              </div>
              <p>{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Toolkit</span>
          <h2 className="display-2">What I work with</h2>
        </div>

        <div className="exp-list">
          {skills.categories.map((cat, i) => (
            <motion.div
              className="exp-row"
              key={cat.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{ gridTemplateColumns: "10rem minmax(0, 1fr)" }}
            >
              <span className="exp-period">{cat.title}</span>
              <div className="tag-row" style={{ marginBottom: 0 }}>
                {cat.skills.map((skill) => (
                  <span className="chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
