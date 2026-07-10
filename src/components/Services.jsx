import React from "react";
import { motion } from "framer-motion";
import {
  Palette, Code2, LayoutTemplate, Building2, Stethoscope,
  Home, Rocket, Server, Gauge, Smartphone, LayoutDashboard,
} from "lucide-react";

const SERVICES = [
  { icon: Palette, title: "UI/UX Design", desc: "Interfaces that look premium and convert." },
  { icon: Code2, title: "Website Development", desc: "Fast, scalable builds on modern stacks." },
  { icon: LayoutTemplate, title: "Landing Pages", desc: "High-converting pages for campaigns & launches." },
  { icon: Building2, title: "Business Websites", desc: "Professional sites that build trust fast." },
  { icon: Stethoscope, title: "Clinic Websites", desc: "Patient-friendly sites for healthcare providers." },
  { icon: Home, title: "Real Estate Websites", desc: "Immersive listing and showcase experiences." },
  { icon: Rocket, title: "Startup MVP", desc: "Ship a working product fast, without cutting corners." },
  { icon: Server, title: "SaaS Development", desc: "Full-stack SaaS from idea to production." },
  { icon: LayoutDashboard, title: "Dashboard Design", desc: "Clear, data-dense interfaces that stay usable." },
  { icon: Smartphone, title: "Responsive Design", desc: "Every screen size, pixel-perfect." },
  { icon: Gauge, title: "Performance Optimization", desc: "Faster loads, better Core Web Vitals, happier users." },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardV = (i) => ({
  hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 10 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
});

function Services() {
  return (
    <section id="services" className="section services-premium">
      <span className="section-eyebrow">What I Offer</span>
      <h2 className="section-title">Services</h2>

      <motion.div
        className="services-grid"
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {SERVICES.map(({ icon: Icon, title, desc }, i) => (
          <motion.div className="service-card" key={title} variants={cardV(i)} whileHover={{ y: -6 }}>
            <div className="service-icon">
              <Icon size={22} />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Services;