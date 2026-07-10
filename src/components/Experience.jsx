import React from "react";
import { motion } from "framer-motion";

const EXPERIENCE = [
  {
    role: "Founder",
    org: "UM Web Solutions",
    period: "Present",
    desc: "Running an MSME-registered web agency building sites and SaaS products for local and international clients.",
  },
  {
    role: "Full Stack / Python Developer",
    org: "Freelance",
    period: "Present",
    desc: "Building Django + React web applications and SaaS products end to end — backend, frontend, and deployment.",
  },
  {
    role: "UI/UX Designer",
    org: "Freelance",
    period: "Present",
    desc: "Designing premium, conversion-focused interfaces for startups, clinics, and real estate brands.",
  },
  {
    role: "Freelancer",
    org: "Fiverr & Direct Outreach",
    period: "Ongoing",
    desc: "Delivering web design and development projects for clients across India and the US.",
  },
];

function Experience() {
  return (
    <section id="experience" className="section experience-premium">
      <span className="section-eyebrow">Where I've Been</span>
      <h2 className="section-title">Experience</h2>

      <div className="timeline">
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            className="timeline-row"
            key={exp.role + exp.org}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <span className="timeline-period">{exp.period}</span>
              <h3>{exp.role}</h3>
              <p className="timeline-org">{exp.org}</p>
              <p>{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Experience;