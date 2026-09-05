import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "../content";

const LINKS = [
  { label: "Home", target: "#home" },
  { label: "Work", target: "#work" },
  { label: "Services", target: "#services" },
  { label: "About", target: "#about" },
  { label: "Process", target: "#process" },
  { label: "Toolkit", target: "#skills" },
  { label: "Experience", target: "#experience" },
  { label: "Testimonials", target: "#testimonials" },
  { label: "Contact", target: "#contact" },
  { label: "Download resume", target: site.resume, download: true },
  { label: "Email me", target: `mailto:${site.email}` },
];

/**
 * Ctrl/Cmd+K palette. Open state is owned by App so the navbar's search
 * button and the keyboard shortcut drive the same instance.
 */
function CommandPalette({ open, onOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const listRef = useRef(null);
  const restoreFocusTo = useRef(null);

  const results = LINKS.filter((l) =>
    l.label.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setQuery("");
    setCursor(0);
    onClose();
  }, [onClose]);

  const go = useCallback(
    (link) => {
      if (!link) return;
      close();

      if (link.download) {
        const a = document.createElement("a");
        a.href = link.target;
        a.download = "";
        a.click();
      } else if (link.target.startsWith("#")) {
        document
          .querySelector(link.target)
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = link.target;
      }
    },
    [close]
  );

  // Global Ctrl/Cmd+K toggle.
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open ? close() : onOpen();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpen, close]);

  // Remember/restore focus and lock background scroll while open.
  useEffect(() => {
    if (open) {
      restoreFocusTo.current = document.activeElement;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      restoreFocusTo.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Clamp the highlighted row whenever the result set shrinks.
  useEffect(() => {
    setCursor((c) => Math.min(c, Math.max(results.length - 1, 0)));
  }, [results.length]);

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) =>
        results.length ? (c - 1 + results.length) % results.length : 0
      );
    } else if (e.key === "Home") {
      e.preventDefault();
      setCursor(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setCursor(Math.max(results.length - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[cursor]);
    } else if (e.key === "Tab") {
      // The input is the only focusable element here, so trap by staying put.
      e.preventDefault();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdk-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="cmdk-box"
            role="dialog"
            aria-modal="true"
            aria-label="Jump to a section"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <input
              autoFocus
              className="cmdk-input"
              placeholder="Jump to a section…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
              }}
              role="combobox"
              aria-expanded="true"
              aria-controls="cmdk-listbox"
              aria-autocomplete="list"
              aria-activedescendant={
                results[cursor] ? `cmdk-opt-${cursor}` : undefined
              }
            />

            <div
              className="cmdk-list"
              id="cmdk-listbox"
              role="listbox"
              ref={listRef}
            >
              {results.map((link, i) => (
                <div
                  className={i === cursor ? "cmdk-item is-active" : "cmdk-item"}
                  id={`cmdk-opt-${i}`}
                  key={link.label}
                  role="option"
                  aria-selected={i === cursor}
                  data-active={i === cursor}
                  onClick={() => go(link)}
                  onMouseEnter={() => setCursor(i)}
                >
                  <ArrowRight size={14} aria-hidden="true" />
                  {link.label}
                </div>
              ))}

              {results.length === 0 && (
                <div className="cmdk-item is-empty">No matches</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
