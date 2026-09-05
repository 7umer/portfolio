import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../content";

function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 22, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            onDone?.();
          }, 250);
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          role="status"
          aria-label="Loading"
        >
          <motion.div
            className="loader-word"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {site.logo}
          </motion.div>

          <div className="loader-bar">
            <i style={{ width: `${progress}%`, transition: "width 0.15s ease" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loader;
