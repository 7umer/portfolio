import React from "react";
import { motion } from "framer-motion";
import { getIcon } from "./icons";
import { process } from "../content";

const step = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function Process() {
  return (
    <section id="process" className="section panel">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow">How I work</span>
            <h2 className="display-2">A process you can follow</h2>
          </div>
          <p className="lead">
            No black boxes. You know what stage we're at, what's next, and what
            I need from you — from first call to post-launch support.
          </p>
        </div>

        <motion.div
          className="process-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {process.steps.map((s, i) => (
            <motion.div className="process-step" key={s.title} variants={step}>
              <span className="process-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function Reasons() {
  return (
    <section className="section" aria-label="Why work with me">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why me</span>
          <h2 className="display-2">Built to win you clients</h2>
        </div>

        <motion.div
          className="why-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {process.reasons.map((reason) => {
            const Icon = getIcon(reason.icon);
            return (
              <motion.div
                className="why-card"
                key={reason.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <Icon size={18} aria-hidden="true" />
                {reason.title}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Process;
