import React from "react";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "HTML", "CSS", "JavaScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    title: "Backend",
    skills: ["Python", "Django", "REST APIs", "PostgreSQL", "Supabase", "Database Design"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Vercel", "Figma", "VS Code", "Hostinger"],
  },
  {
    title: "Soft Skills",
    skills: ["Problem Solving", "Communication", "UI Thinking", "Business Thinking", "Freelancing"],
  },
];

function Skills() {
  return (
    <section id="skills" className="section skills-premium">
      <span className="section-eyebrow">What I Work With</span>
      <h2 className="section-title">Skills &amp; Tools</h2>

      <motion.div
        className="skills-cat-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        {CATEGORIES.map((cat, i) => (
          <motion.div
            className="skill-block"
            key={cat.title}
            variants={{
              hidden: { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
              show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
          >
            <h3>{cat.title}</h3>
            <div className="skill-chip-row">
              {cat.skills.map((s) => (
                <motion.span
                  className="skill-chip"
                  key={s}
                  whileHover={{ scale: 1.08, y: -3 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;