// import React, { useState } from "react";

// function Navbar() {
//   const [active, setActive] = useState("home");

//   const handleClick = (section) => {
//     setActive(section);
//   };

//   return (
//     <nav className="navbar">
//       {/* <h2 className="logo">Umer.</h2> */}
//       <a
//         href="#home"
//         className="logo"
//         onClick={() => handleClick("home")}
//       >
//       Umer. 
//       </a>
//       <ul>
//         <li>
//           <a
//             href="#about"
//             className={active === "about" ? "active" : ""}
//             onClick={() => handleClick("about")}
//           >
//             About
//           </a>
//         </li>

//         <li>
//           <a
//             href="#skills"
//             className={active === "skills" ? "active" : ""}
//             onClick={() => handleClick("skills")}
//           >
//             Skills
//           </a>
//         </li>

//         <li>
//           <a
//             href="#projects"
//             className={active === "projects" ? "active" : ""}
//             onClick={() => handleClick("projects")}
//           >
//             Projects
//           </a>
//         </li>

//         <li>
//           <a
//             href="#contact"
//             className={active === "contact" ? "active" : ""}
//             onClick={() => handleClick("contact")}
//           >
//             Contact
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
// ----------------------------------------

import React, { useState, useEffect } from "react";

function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
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
        {["home", "about", "skills", "projects", "contact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              className={active === item ? "active" : ""}
              onClick={() => setMenuOpen(false)}
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