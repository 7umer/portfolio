import React, { useEffect, useRef, useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { site } from "../content";

const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

function Navbar({ theme, onToggleTheme, onOpenSearch }) {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const ratios = useRef({});

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        // Activate whichever observed section is currently most visible,
        // rather than the first intersection event we happen to receive.
        const [topId] =
          Object.entries(ratios.current).sort((a, b) => b[1] - a[1])[0] || [];

        if (topId && ratios.current[topId] > 0) setActive(topId);
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav className="nav" aria-label="Primary">
      <a href="#home" className="nav-logo">
        {site.logo}
      </a>

      <ul
        id="primary-navigation"
        className={menuOpen ? "nav-links is-open" : "nav-links"}
      >
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="nav-link"
              aria-current={active === item.id ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-link-roll">
                <span>{item.label}</span>
                <span aria-hidden="true">{item.label}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-cluster">
        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onOpenSearch}
            aria-label="Open search (Ctrl K)"
          >
            <Search size={17} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="icon-btn theme-toggle"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            {theme === "dark" ? (
              <Sun size={17} aria-hidden="true" />
            ) : (
              <Moon size={17} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            className="icon-btn nav-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>

        <a href="#contact" className="btn btn--accent btn--sm">
          Let's talk
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
