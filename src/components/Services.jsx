import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getIcon } from "./icons";
import { services } from "../content";

const row = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function Services() {
  return (
    <section id="services" className="section panel">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow">Services</span>
            <h2 className="display-2">What I can build for you</h2>
          </div>
          <p className="lead">
            Whether you need a full partner to shape the roadmap or a specialist
            for one piece of it, the list below is where I do my best work.
          </p>
        </div>

        <motion.div
          className="service-list"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {services.items.map((service, i) => {
            const Icon = getIcon(service.icon);

            return (
              <motion.div className="service-row" key={service.title} variants={row}>
                <span className="service-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>
                  <Icon
                    size={18}
                    aria-hidden="true"
                    style={{ display: "inline", marginRight: 10, opacity: 0.6 }}
                  />
                  {service.title}
                </h3>
                <p>{service.desc}</p>
                <span className="service-arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
