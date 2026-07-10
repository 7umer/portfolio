import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

const LINKS = [
  { label: "Home", target: "#home" },
  { label: "About", target: "#about" },
  { label: "Skills", target: "#skills" },
  { label: "Services", target: "#services" },
  { label: "Projects", target: "#projects" },
  { label: "Experience", target: "#experience" },
  { label: "Testimonials", target: "#testimonials" },
  { label: "Contact", target: "#contact" },
  { label: "Download Resume", target: "/resume.pdf", download: true },
  { label: "Email Me", target: "mailto:umerbadal@gmail.com" },
];

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = LINKS.filter((l) =>
    l.label.toLowerCase().includes(query.toLowerCase())
  );

  const go = (link) => {
    setOpen(false);
    setQuery("");
    if (link.download) {
      const a = document.createElement("a");
      a.href = link.target;
      a.download = "";
      a.click();
    } else if (link.target.startsWith("#")) {
      document.querySelector(link.target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = link.target;
    }
  };

  return (
    <>
      <button className="cmdk-hint" onClick={() => setOpen(true)}>
        <Search size={14} /> Search <span>Ctrl K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cmdk-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="cmdk-box"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                autoFocus
                className="cmdk-input"
                placeholder="Jump to a section..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="cmdk-list">
                {results.map((link) => (
                  <div
                    className="cmdk-item"
                    key={link.label}
                    onClick={() => go(link)}
                  >
                    <ArrowRight size={14} />
                    {link.label}
                  </div>
                ))}
                {results.length === 0 && (
                  <div className="cmdk-item">No matches</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CommandPalette;