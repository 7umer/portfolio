import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "../content";

const ITEMS = testimonials.items;
const ROTATE_MS = 6000;

/**
 * Horizontal carousel: all quotes sit side by side on one track, and the
 * track slides right-to-left one slide at a time. Auto-advances, pauses on
 * hover/focus, and can be driven by the arrows, the dots, or the keyboard.
 */
function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (delta) => setIndex((i) => (i + delta + ITEMS.length) % ITEMS.length),
    []
  );

  useEffect(() => {
    if (paused || ITEMS.length < 2) return;
    const timer = setInterval(() => go(1), ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, go]);

  if (ITEMS.length === 0) return null;

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Client feedback</span>
          <h2 className="display-2">What people say</h2>
        </div>

        <div
          className="carousel"
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="carousel-viewport">
            <motion.div
              className="carousel-track"
              animate={{ x: `-${index * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {ITEMS.map((item, i) => (
                <figure
                  className="carousel-slide"
                  key={item.quote}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${ITEMS.length}`}
                  // Keeps off-screen quotes out of the accessibility tree
                  // and out of the tab order.
                  aria-hidden={i !== index}
                  inert={i !== index}
                >
                  <Quote size={28} color="var(--accent)" aria-hidden="true" />
                  <blockquote className="testimonial-quote">
                    {item.quote}
                  </blockquote>
                  <figcaption>
                    <div className="testimonial-name">{item.name}</div>
                    <div className="testimonial-role">{item.role}</div>
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </div>

          {ITEMS.length > 1 && (
            <div className="carousel-controls">
              <div className="carousel-arrows">
                <button
                  type="button"
                  className="carousel-arrow"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="carousel-arrow"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="testimonial-dots" role="tablist" aria-label="Choose a testimonial">
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
