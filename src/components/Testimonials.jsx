import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

// Replace with real client quotes as they come in — structured so it's a
// one-line edit per testimonial.
const TESTIMONIALS = [
  {
    quote: "Umer took our idea and turned it into a working product faster than we expected, without sacrificing quality.",
    name: "Client",
    role: "Healthcare Startup",
  },
  {
    quote: "The design felt premium from day one — exactly the brand image we needed for our launch.",
    name: "Client",
    role: "Real Estate Brand",
  },
  {
    quote: "Clear communication, fast turnarounds, and a site that actually converts. Would work with him again.",
    name: "Client",
    role: "Local Business Owner",
  },
];

function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="testimonials" className="section testimonials-premium">
      <span className="section-eyebrow">Client Feedback</span>
      <h2 className="section-title">Testimonials</h2>

      <div className="testimonial-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="testimonial-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
          >
            <Quote size={26} color="var(--accent-purple)" />
            <p className="testimonial-quote">
              "{TESTIMONIALS[index].quote}"
            </p>
            <div className="testimonial-name">{TESTIMONIALS[index].name}</div>
            <div className="testimonial-role">{TESTIMONIALS[index].role}</div>
          </motion.div>
        </AnimatePresence>

        <div className="testimonial-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;