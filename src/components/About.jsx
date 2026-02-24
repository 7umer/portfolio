// import React from "react";

// function About() {
//   return (
//     <section id="about" className="about-section">
//       <div className="container">
//         <h2 className="section-title">About Me</h2>

//         <p className="about-intro">
//           Hi, I’m Umer, a passionate Python & Django developer. I build
//           full-stack web applications and help clients turn ideas into
//           reality.
//         </p>

//         <div className="card-grid">
//           <div className="about-card">
//             <img src="/designer.png" alt="Designer" />
//             <h3>Designer</h3>
//             <p>Modern UI/UX and clean web interface design.</p>
//             <a href="#projects" className="btn-primary">
//               View Projects
//             </a>
//           </div>

//           <div className="about-card">
//             <img src="/developer.png" alt="Developer" />
//             <h3>Developer</h3>
//             <p>Python, Django, React & scalable web apps.</p>
//             <a href="#projects" className="btn-primary">
//               View Projects
//             </a>
//           </div>

//           <div className="about-card">
//             <img src="/freelancer.png" alt="Freelancer" />
//             <h3>Freelancer</h3>
//             <p>Remote projects with timely delivery.</p>
//             <a href="#contact" className="btn-primary">
//               Contact Me
//             </a>
//           </div>
//         </div>

//         {/* Resume Button */}
//         <div className="resume-btn">
//           <a href="/resume.pdf" download className="btn-outline">
//             Download Resume
//           </a>
//         </div>

//       </div>
//     </section>
//   );
// }

// export default About;





import React from "react";

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <p className="about-intro">
          Hi, I’m Umer, a passionate Python & Django developer. I build
          full-stack web applications and help clients turn ideas into
          reality. Here are some of my key roles and skills.
        </p>

        <div className="card-grid">
          {/* Designer */}
          <div className="about-card">
            <img src="/designer.png" alt="Designer" />
            <h3>Designer</h3>
            <p>
              Skilled in UI/UX design, creating modern and visually appealing
              web interfaces.
            </p>
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
          </div>

          {/* Developer */}
          <div className="about-card">
            <img src="/developer.png" alt="Developer" />
            <h3>Developer</h3>
            <p>
              Experienced in Python, Django, JavaScript, and building
              scalable web applications.
            </p>
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
          </div>

          {/* Freelancer */}
          <div className="about-card">
            <img src="/freelancer.png" alt="Freelancer" />
            <h3>Freelancer</h3>
            <p>
              Skilled in managing remote projects and delivering quality
              work on time.
            </p>
            <a href="#contact" className="btn-primary">
              Contact Me
            </a>
          </div>
        </div>
        

        <div className="resume-btn">
          <a href="/resume.pdf" download className="btn-outline">
             Download Resume
          </a>
        </div>


      </div>
    </section>
  );
}

export default About;
