import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            onDone && onDone();
          }, 300);
        }
        return next;
      });
    }, 140);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader-screen"
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="loader-logo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Umer.
          </motion.div>
          <div className="loader-bar">
            <div
              className="loader-bar-fill"
              style={{ width: `${progress}%`, transition: "width 0.15s ease" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loader;