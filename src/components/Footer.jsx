import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Footer() {
  return (
    <footer className="footer footer-premium">
      <motion.h2
        className="footer-logo"
        whileHover={{ scale: 1.05 }}
      >
        <a href="#home">Umer.</a>
      </motion.h2>

      <ul className="footer-links">
        {QUICK_LINKS.map((l) => (
          <li key={l.label}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div className="socials">
        <a href="https://github.com/7umer" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/mohammed-talha-umer-badal-9910b7242"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://instagram.com/um_web_solutions"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
      </div>

      <p>© 2026 Umer. All rights reserved.</p>
    </footer>
  );
}

export default Footer;