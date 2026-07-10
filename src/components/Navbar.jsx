import React, { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["home", "about", "skills", "services", "projects", "contact"];

function Navbar() {
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

        // Pick whichever observed section currently has the highest
        // visible ratio, instead of activating on the first intersection
        // event we happen to receive (which was locking onto "home").
        const [topId] = Object.entries(ratios.current).sort(
          (a, b) => b[1] - a[1]
        )[0] || [];

        if (topId && ratios.current[topId] > 0) {
          setActive(topId);
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <nav className="navbar">
      <a href="#home" className="logo">
        Umer.
      </a>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        {NAV_ITEMS.map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              className={active === item ? "active" : ""}
              onClick={() => {
                setActive(item);
                setMenuOpen(false);
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;