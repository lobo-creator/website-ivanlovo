import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Contact, Experience, Hero, Navbar, Portfolio } from "./components";

const App = () => {
  const wrapperRef = useRef(null);
  const [isFading, setIsFading] = useState(false);

  const scrollToSection = useCallback((sectionId) => {
    const wrapper = wrapperRef.current;
    const target = document.getElementById(sectionId);

    if (!wrapper || !target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fadeDuration = reduceMotion ? 0 : 180;
    const scrollDuration = reduceMotion ? 0 : 420;

    setIsFading(true);
    window.history.pushState(null, "", `#${sectionId}`);

    window.setTimeout(() => {
      wrapper.scrollTo({
        top: target.offsetTop,
        behavior: reduceMotion ? "auto" : "smooth",
      });

      window.setTimeout(() => {
        setIsFading(false);
      }, scrollDuration);
    }, fadeDuration);
  }, []);

  useEffect(() => {
    const sectionId = window.location.hash.replace("#", "");
    if (!sectionId) return;

    const wrapper = wrapperRef.current;
    const target = document.getElementById(sectionId);
    if (!wrapper || !target) return;

    wrapper.scrollTo({
      top: target.offsetTop,
      behavior: "auto",
    });
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <Navbar onNavigate={scrollToSection} scrollContainer={wrapperRef} />
        <div className={`wrapper ${isFading ? "section-fade-out" : ""}`} ref={wrapperRef}>
          <div id="hero" className='z-10'>
            <Hero scrollContainer={wrapperRef} />
          </div>
          <div id="portfolio" className='relative z-30 bg-primary mt-[-2px]'>
            <Portfolio />
          </div>
          <div id="experience" className='relative z-30 bg-primary'>
            <Experience />
          </div>
          <div id="contact" className='relative z-30 bg-primary'>
            <Contact />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
