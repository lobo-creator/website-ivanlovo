import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Contact, Experience, Hero, Navbar, Portfolio } from "./components";

const App = () => {
  const wrapperRef = useRef(null);
  const fadeTimeoutRef = useRef(null);
  const [isFading, setIsFading] = useState(false);

  const getSectionTarget = (sectionId) =>
    document.querySelector(`[data-scroll-target="${sectionId}"]`);

  const getSectionTop = (wrapper, target) => {
    const wrapperRect = wrapper.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    return Math.max(0, targetRect.top - wrapperRect.top + wrapper.scrollTop);
  };

  const scrollToSection = useCallback((sectionId) => {
    const wrapper = wrapperRef.current;
    const target = getSectionTarget(sectionId);

    if (!wrapper || !target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fadeDuration = reduceMotion ? 0 : 120;
    const scrollDuration = reduceMotion ? 0 : 650;
    const targetTop = getSectionTop(wrapper, target);

    window.clearTimeout(fadeTimeoutRef.current);
    setIsFading(true);
    window.history.pushState(null, "", `#${sectionId}`);

    window.setTimeout(() => {
      wrapper.scrollTo({
        top: targetTop,
        behavior: reduceMotion ? "auto" : "smooth",
      });

      fadeTimeoutRef.current = window.setTimeout(() => {
        wrapper.scrollTo({
          top: targetTop,
          behavior: "auto",
        });
        setIsFading(false);
      }, scrollDuration);
    }, fadeDuration);
  }, []);

  useEffect(() => {
    const sectionId = window.location.hash.replace("#", "");
    if (!sectionId) return;

    const wrapper = wrapperRef.current;
    const target = getSectionTarget(sectionId);
    if (!wrapper || !target) return;

    requestAnimationFrame(() => {
      wrapper.scrollTo({
        top: getSectionTop(wrapper, target),
        behavior: "auto",
      });
    });
  }, []);

  useEffect(() => () => window.clearTimeout(fadeTimeoutRef.current), []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <Navbar onNavigate={scrollToSection} scrollContainer={wrapperRef} />
        <div className={`wrapper ${isFading ? "section-fade-out" : ""}`} ref={wrapperRef}>
          <div id="hero" data-scroll-target="hero" className='z-10'>
            <Hero scrollContainer={wrapperRef} />
          </div>
          <div id="portfolio" data-scroll-target="portfolio" className='relative z-30 bg-primary mt-[-2px]'>
            <Portfolio />
          </div>
          <div id="experience" data-scroll-target="experience" className='relative z-30 bg-primary'>
            <Experience />
          </div>
          <div id="contact" data-scroll-target="contact" className='relative z-30 bg-primary'>
            <Contact />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
