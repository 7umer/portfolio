import React from "react";
import { motion } from "framer-motion";
import {
  Zap, Sparkles, Search, Smartphone, Target, Gem, Layers, Wallet,
} from "lucide-react";

const REASONS = [
  { icon: Zap, title: "Fast Delivery" },
  { icon: Sparkles, title: "Modern UI" },
  { icon: Search, title: "SEO Friendly" },
  { icon: Smartphone, title: "Responsive" },
  { icon: Target, title: "Business Focused" },
  { icon: Gem, title: "Premium Design" },
  { icon: Layers, title: "Scalable Code" },
  { icon: Wallet, title: "Affordable" },
];

function WhyWorkWithMe() {
  return (
    <section className="section why-premium">
      <span className="section-eyebrow">Why Work With Me</span>
      <h2 className="section-title">Built to Win You Clients</h2>

      <motion.div
        className="why-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        {REASONS.map(({ icon: Icon, title }) => (
          <motion.div
            className="why-card"
            key={title}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
            }}
            whileHover={{ y: -6 }}
          >
            <Icon size={20} color="var(--accent-cyan)" />
            <p>{title}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default WhyWorkWithMe;