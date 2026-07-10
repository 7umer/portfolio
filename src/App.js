import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Workflow from "./components/Workflow";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import WhyWorkWithMe from "./components/WhyWorkWithMe";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import CommandPalette from "./components/CommandPalette";
import ResumeModal from "./components/ResumeModal";
import BackToTop from "./components/BackToTop";

function App() {
  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}

      <Cursor />
      <SmoothScroll />
      <ScrollProgress />

      <div className="cmdk-hint-wrapper">
        <CommandPalette />
      </div>

      <Navbar />
      <Hero onViewResume={() => setResumeOpen(true)} />
      <About onViewResume={() => setResumeOpen(true)} />
      <Skills />
      <Services />
      <Projects />
      <Workflow />
      <Experience />
      <Testimonials />
      <WhyWorkWithMe />
      <Contact />
      <Footer />

      <BackToTop />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}

export default App;