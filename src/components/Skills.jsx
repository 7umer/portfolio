// import React from "react";

// function Skills() {
//   return (
//     <section id="skills" className="section">
//       <h2>Skills</h2>
//       <div className="skills-grid">
//         <div>Python</div>
//         <div>Django</div>
//         <div>React</div>
//         <div>JavaScript</div>
//         <div>HTML</div>
//         <div>CSS</div>
//         <div>Bootstrap</div>
//         <div>Git</div>
//       </div>
//     </section>
//   );
// }

// export default Skills;


// ---------------------------------------------------
// import React from "react";
// // import "./Skills.css";

// function Skills() {
//   return (
//     <section id="skills" className="skills-section">
//       <h2>Skills</h2>

//       <div className="skills-grid">
        
//         <div className="skill-card">
//           <img src="/images/icons/python.png" alt="Python" />
//           <p>Python / Django / Flask</p>
//         </div>

//         <div className="skill-card">
//           <img src="/images/icons/react.png" alt="React" />
//           <p>JavaScript / React</p>
//         </div>

//         <div className="skill-card">
//           <img src="/images/icons/bootstrap.png" alt="Bootstrap" />
//           <p>Bootstrap / CSS</p>
//         </div>

//         <div className="skill-card">
//           <img src="/images/icons/git.png" alt="Git" />
//           <p>Git / GitHub</p>
//         </div>

//       </div>
//     </section>
//   );
// }

// export default Skills;
// -------------------------------------------------------





import React from "react";


const skills = [
  
  { name: "POSTMAN", icon: "/images/icons/POSTMAN.webp"},
  { name: "WordPress", icon: "/images/icons/Wordpress.png"},
  
  { name: "GitHub", icon: "/images/icons/GitHub.png" },
  { name: "Git", icon: "/images/icons/git.png" },
  
  { name: "SQLite", icon: "/images/icons/SQLite.png"},
  { name: "MySQL", icon: "/images/icons/MySQL.png"},
  { name: "PostgreSQL", icon: "/images/icons/PostgreSQL.png"},
  
  { name: "RestAPI", icon: "/images/icons/RestAPI.png"},
  { name: "Django", icon: "/images/icons/django.png" },
  { name: "Python", icon: "/images/icons/python.png" },
  
  { name: "React", icon: "/images/icons/react.png" },
  { name: "Bootstrap", icon: "/images/icons/bootstrap.png" },
  { name: "JavaScript", icon: "/images/icons/JavaScript.png" },
  { name: "CSS3", icon: "/images/icons/CSS.png" },
  { name: "HTML5", icon: "/images/icons/HTML5.svg" },
];

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <h2>My Skills</h2>

      <div className="marquee">
        <div className="marquee-content">
          {[...skills, ...skills].map((skill, index) => (
            <div className="skill-card" key={index}>
              <img src={skill.icon} alt={skill.name} />
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;