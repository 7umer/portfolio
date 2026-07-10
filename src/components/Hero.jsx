import React, { useRef } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { ArrowRight, Download, Eye } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Hero({ onViewResume }) {
  const heroRef = useRef(null);

  // Mouse-reactive glow behind the hero content
  const handleMouseMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <section
      id="home"
      className="hero-premium"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      <div className="blob-field">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
      </div>
      <div className="hero-mouse-glow" />

      <motion.div
        className="hero-premium-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="status-badge">
          <span className="status-dot" />
          Open for Freelance Work
        </motion.div>

        <motion.h4 variants={item} className="hero-role">
          <Typewriter
            options={{
              strings: [
                "Full Stack Developer",
                "UI/UX Designer",
                "SaaS Builder",
                "Frontend Developer",
                "Backend Developer",
                "Python Developer",
                "Founder",
              ],
              autoStart: true,
              loop: true,
              delay: 45,
              deleteSpeed: 25,
            }}
          />
        </motion.h4>

        <motion.h1 variants={item} className="hero-headline">
          Designing Beautiful Experiences.
          <br />
          <span className="highlight">Building Powerful Digital Products.</span>
        </motion.h1>

        <motion.p variants={item} className="hero-sub">
          I'm Mohammed Talha Umer Badal — I design and build premium websites
          and SaaS products for startups, clinics, real estate brands and
          local businesses, as the founder of{" "}
          <a href="https://umwebsolutions.com" target="_blank" rel="noreferrer">
            UM Web Solutions
          </a>
          .
        </motion.p>

        <motion.div variants={item} className="hero-cta-row">
          <motion.button
            className="btn-gradient hero-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onViewResume}
          >
            <Eye size={16} /> View Resume
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            className="btn-outline hero-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} /> Download Resume
          </motion.a>

          <motion.a
            href="#contact"
            className="btn-outline hero-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Hire Me
          </motion.a>

          <motion.a
            href="#projects"
            className="btn-gradient hero-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Let's Build Together <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-floating-image"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.img
          src={`${process.env.PUBLIC_URL}/images/umer.jpg`}
          alt="Mohammed Talha Umer Badal"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span />
      </motion.div>
    </section>
  );
}

export default Hero;