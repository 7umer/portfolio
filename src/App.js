import React, { useCallback, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About, { Stats } from "./components/About";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Process, { Reasons } from "./components/Process";
import Experience, { Skills } from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Loader from "./components/Loader";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import CommandPalette from "./components/CommandPalette";
import ResumeModal from "./components/ResumeModal";
import BackToTop from "./components/BackToTop";

import useTheme from "./hooks/useTheme";
import "./styles/base.css";
import "./styles/components.css";

function App() {
  const { theme, toggle } = useTheme();

  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // The "view resume" controls are real links to the PDF. On desktop we
  // swallow the click and show the inline preview instead; everywhere else
  // the link is left alone to navigate natively.
  //
  // This has to be a link rather than a button calling window.open: mobile
  // Safari treats a scripted window.open — especially one passing window
  // features — as a popup and blocks it, so the tap did nothing at all.
  // A genuine anchor navigation is never popup-blocked.
  const openResume = useCallback((event) => {
    const canPreviewInline =
      !window.matchMedia("(hover: none), (max-width: 900px)").matches &&
      navigator.pdfViewerEnabled !== false;

    if (!canPreviewInline) return;

    event.preventDefault();
    setResumeOpen(true);
  }, []);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SmoothScroll />
      <ScrollProgress />

      <Navbar
        theme={theme}
        onToggleTheme={toggle}
        onOpenSearch={openSearch}
      />

      <main id="main">
        <Hero onViewResume={openResume} />
        <Marquee />
        <Stats />
        <Projects />
        <Services />
        <About onViewResume={openResume} />
        <Process />
        <Skills />
        <Experience />
        <Reasons />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <BackToTop />
      <CommandPalette
        open={searchOpen}
        onOpen={openSearch}
        onClose={closeSearch}
      />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}

export default App;
