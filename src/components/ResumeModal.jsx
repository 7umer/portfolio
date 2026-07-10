import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download } from "lucide-react";

function ResumeModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="resume-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="resume-modal-box"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="resume-modal-header">
              <span>Resume — Mohammed Talha Umer Badal</span>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <a href="/resume.pdf" download title="Download">
                  <Download size={18} color="#f8fafc" />
                </a>
                <button onClick={onClose} aria-label="Close">
                  <X size={20} />
                </button>
              </div>
            </div>
            <iframe src="/resume.pdf" title="Resume preview" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ResumeModal;