import React from "react";
import { motion } from "framer-motion";
import { FaDownload, FaEye } from "react-icons/fa";

const cardData = [
  {
    img: "/designer.png",
    title: "Designer",
    desc: "Skilled in UI/UX design, creating modern and visually appealing web interfaces.",
    track: "designer",
  },
  {
    img: "/developer.png",
    title: "Developer",
    desc: "Experienced in Python, Django, JavaScript, React and building scalable web applications.",
    track: "developer",
  },
  {
    img: "/freelancer.png",
    title: "Freelancer",
    desc: "Skilled in managing remote projects and delivering quality work on time.",
    track: null, // scrolls to contact instead
  },
];

const stats = [
  { label: "Projects Shipped", value: 15, suffix: "+" },
  { label: "Happy Clients", value: 10, suffix: "+" },
  { label: "Years Freelancing", value: 2, suffix: "+" },
];

function Counter({ value, suffix }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1200;
          const startTime = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            start = Math.floor(progress * value);
            setCount(start);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="stat-number">
      {count}
      {suffix}
    </span>
  );
}

function goToProjects(track) {
  if (track) {
    window.dispatchEvent(new CustomEvent("set-project-track", { detail: track }));
  }
  const el = document.getElementById("projects");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function About({ onViewResume }) {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <span className="section-eyebrow">Get To Know Me</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="about-flex">
          <motion.div
            className="about-photo"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/images/umer.jpg" alt="Mohammed Talha Umer Badal" />
          </motion.div>

          <motion.div
            className="about-text-block"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.p
              className="about-intro"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Hi, I'm Umer — I design beautiful digital experiences and build
              scalable web applications. As founder of UM Web Solutions, I
              help startups, clinics, real estate companies and local
              businesses transform their ideas into premium websites and
              SaaS products.
            </motion.p>

            <div className="role-pills">
              {["Python Developer", "Frontend Developer","Backend Developer", "UI UX Designer", "Founder", "Freelancer"].map(
                (role) => (
                  <span className="role-pill" key={role}>
                    {role}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Stat counters */}
        <div className="stats-row">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <Counter value={s.value} suffix={s.suffix} />
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        <motion.div
          className="card-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {cardData.map((card) => (
            <motion.div
              className="about-card"
              key={card.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -8 }}
            >
              <img src={card.img} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <button
                className="btn-primary"
                onClick={() =>
                  card.track
                    ? goToProjects(card.track)
                    : document
                        .getElementById("contact")
                        .scrollIntoView({ behavior: "smooth" })
                }
              >
                {card.track ? "View Projects" : "Contact Me"}
              </button>
            </motion.div>
          ))}
        </motion.div>

        <div className="resume-btn">
          <a href="/resume.pdf" download className="btn-outline">
            <FaDownload style={{ marginRight: 8 }} />
            Download Resume
          </a>
          <button onClick={onViewResume} className="btn-outline btn-outline-alt">
            <FaEye style={{ marginRight: 8 }} />
            View Resume
          </button>
        </div>
      </div>
    </section>
  );
}

export default About;