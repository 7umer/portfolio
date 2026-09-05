import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import { site } from "../content";

function ResumeModal({ open, onClose }) {
  const boxRef = useRef(null);
  const closeRef = useRef(null);
  const restoreFocusTo = useRef(null);

  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // Keep Tab cycling inside the dialog.
      const focusable = boxRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      restoreFocusTo.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-box"
            ref={boxRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Resume — ${site.name}`}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <span>Resume — {site.name}</span>
              <div className="modal-head-actions">
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open resume in a new tab"
                  title="Open in new tab"
                >
                  <ExternalLink size={17} aria-hidden="true" />
                </a>
                <a href={site.resume} download aria-label="Download resume" title="Download">
                  <Download size={18} aria-hidden="true" />
                </a>
                <button ref={closeRef} onClick={onClose} aria-label="Close resume preview">
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
            <iframe src={site.resume} title="Resume preview" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ResumeModal;
