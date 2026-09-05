import React, { useEffect, useRef } from "react";

// Lightweight custom cursor — dot + trailing ring, expands over
// links/buttons/cards. Disabled automatically on touch devices via CSS.
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    // Only hide the native cursor once we are actually drawing a replacement.
    // Hiding it from CSS alone leaves visitors with no cursor at all if this
    // effect never runs.
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onOver = (e) => {
      if (e.target.closest("a, button, input, textarea, .proj-card, .why-card, .service-row")) {
        ringRef.current?.classList.add("is-hovered");
      }
    };
    const onOut = (e) => {
      if (e.target.closest("a, button, input, textarea, .proj-card, .why-card, .service-row")) {
        ringRef.current?.classList.remove("is-hovered");
      }
    };

    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    animate();

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

export default Cursor;