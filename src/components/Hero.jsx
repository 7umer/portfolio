// import React from "react";

// function Hero() {
//   return (
//     <section className="hero">
//       <h1>Hi, I'm Mohammed Talha Umer Badal</h1>
//       <h3>Python + React Full Stack Developer</h3>
//       <p>I build modern web applications using Django and React.</p>
//       <a href="#projects" className="btn">View My Work</a>
//     </section>
//   );
// }

// export default Hero;


// import React from "react";


// function Hero() {
//   return (
//     <section className="hero">
//       <div className="overlay"></div>

//       <div className="hero-content">
//         <h1>Hi, I'm Mohammed Talha Umer Badal</h1>
//         <h3>Python + React Full Stack Developer</h3>
//         <p>I build modern web applications using Django and React.</p>

//         <div className="hero-buttons">
//           <a href="#projects" className="btn-primary">
//             View My Work
//           </a>
//           <a href="#contact" className="btn-secondary">
//             Hire Me
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;

// ----------------------------------------------
// import React from "react";

// function Hero() {
//   return (
//     <section
//       id="home"
//       className="hero"
//       style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL}/hero-bg1.jpg)`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="overlay"></div>

//       <div className="hero-content">

//         {/* LEFT SIDE CONTENT */}
//         <div className="hero-left">

//           {/* Passport Image */}
//           <div className="hero-image">
//             <img
//               src={`${process.env.PUBLIC_URL}/images/umer.jpg`}
//               alt="Mohammed Talha Umer Badal"
//             />
//           </div>

//           {/* Text */}
//           <div className="hero-text">
//             <h1>Hi, I'm Mohammed Talha Umer Badal</h1>
//             <h3>Python + React Full Stack Developer</h3>
//             <p>I build modern web applications using Django and React.</p>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

// export default Hero;
// -----------------------------------
import React from "react";
// import Typewriter from "typewriter-effect";

function Hero() {
  return (
    <section
      id="home"
      className="hero"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/hero-bg1.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="overlay"></div>

      <div className="hero-content">

        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="hero-text">
          <h4 className="intro-line">
            Python + React Full Stack Developer
          </h4>

          <h1>
            Hi, I'm <span className="highlight">
              Mohammed Talha Umer Badal
            </span>
          </h1>

          <p>
            I build scalable and modern web applications using Django, React and WordPress.
            Passionate about writing clean code and solving real-world problems.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="hero-image">
          <img
            src={`${process.env.PUBLIC_URL}/images/umer.jpg`}
            alt="Mohammed Talha Umer Badal"
          />
        </div>

      </div>

      
    </section>
  );
}

export default Hero;