import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  "Discovery", "Research", "Wireframing", "UI Design",
  "Development", "Testing", "Deployment", "Support",
];

function Workflow() {
  return (
    <section className="section workflow-premium">
      <span className="section-eyebrow">How I Work</span>
      <h2 className="section-title">Workflow</h2>

      <div className="workflow-track">
        {STEPS.map((step, i) => (
          <motion.div
            className="workflow-step"
            key={step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="workflow-num">{String(i + 1).padStart(2, "0")}</div>
            <p>{step}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Workflow;