import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../content";

const ITEMS = testimonials.items;
const ROTATE_MS = 6000;

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || ITEMS.length < 2) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % ITEMS.length),
      ROTATE_MS
    );
    return () => clearInterval(t);
  }, [paused]);

  if (ITEMS.length === 0) return null;

  const current = ITEMS[index];

  return (
    <section
      id="testimonials"
      className="section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Client feedback</span>
          <h2 className="display-2">What people say</h2>
        </div>

        <div className="testimonial">
          <Quote size={30} color="var(--accent)" aria-hidden="true" />

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4 }}
            >
              <p className="testimonial-quote">{current.quote}</p>
              <footer>
                <div className="testimonial-name">{current.name}</div>
                <div className="testimonial-role">{current.role}</div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          {ITEMS.length > 1 && (
            <div
              className="testimonial-dots"
              role="tablist"
              aria-label="Choose a testimonial"
            >
              {ITEMS.map((item, i) => (
                <button
                  key={item.quote}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1} of ${ITEMS.length}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
