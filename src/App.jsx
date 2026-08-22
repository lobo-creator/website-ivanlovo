import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Contact, Experience, Hero, Navbar, Portfolio, SiteLoader } from "./components";
import { preloadSiteAssets, waitForFonts, waitForWindowLoad } from "./utils/preloadAssets";

const App = () => {
  const wrapperRef = useRef(null);
  const fadeTimeoutRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [isSiteReady, setIsSiteReady] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const getSectionTarget = (sectionId) =>
    document.querySelector(`[data-scroll-target="${sectionId}"]`);

  const getSectionTop = (wrapper, target) => {
    const wrapperRect = wrapper.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    return Math.max(0, targetRect.top - wrapperRect.top + wrapper.scrollTop);
  };

  const easeInOutCubic = (progress) =>
    progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

  const animateScroll = (wrapper, targetTop, duration, onComplete) => {
    const startTop = wrapper.scrollTop;
    const distance = targetTop - startTop;
    const startTime = performance.now();

    window.cancelAnimationFrame(scrollAnimationRef.current);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      wrapper.scrollTop = startTop + distance * easeInOutCubic(progress);

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(step);
        return;
      }

      wrapper.scrollTop = targetTop;
      onComplete();
    };

    scrollAnimationRef.current = window.requestAnimationFrame(step);
  };

  const scrollToSection = useCallback((sectionId) => {
    const wrapper = wrapperRef.current;
    const target = getSectionTarget(sectionId);

    if (!wrapper || !target || !isSiteReady) return;

    const scrollDuration = 850;
    const targetTop = getSectionTop(wrapper, target);

    window.clearTimeout(fadeTimeoutRef.current);
    setIsFading(true);
    window.history.pushState(null, "", `#${sectionId}`);

    animateScroll(wrapper, targetTop, scrollDuration, () => {
      setIsFading(false);
    });
  }, [isSiteReady]);

  useEffect(() => {
    let isMounted = true;

    const minLoaderTime = new Promise((resolve) => {
      window.setTimeout(resolve, 750);
    });

    Promise.all([
      preloadSiteAssets({
        onProgress: (progress) => {
          if (isMounted) setLoaderProgress(progress);
        },
      }),
      waitForFonts(),
      waitForWindowLoad(),
      minLoaderTime,
    ]).then(() => {
      if (!isMounted) return;

      setLoaderProgress(100);
      window.requestAnimationFrame(() => setIsSiteReady(true));
    });

    return () => {
      isMounted = false;
    };
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

  useEffect(
    () => () => {
      window.clearTimeout(fadeTimeoutRef.current);
      window.cancelAnimationFrame(scrollAnimationRef.current);
    },
    []
  );

  return (
    <BrowserRouter>
      <div className={`site-shell relative z-0 bg-primary ${isSiteReady ? "is-ready" : "is-loading"}`}>
        <SiteLoader isVisible={!isSiteReady} progress={loaderProgress} />
        <Navbar onNavigate={scrollToSection} scrollContainer={wrapperRef} />
        <div
          className={`wrapper ${isFading ? "section-fade-out" : ""}`}
          ref={wrapperRef}
          aria-hidden={!isSiteReady}
        >
          <div data-scroll-target="hero" className='z-10'>
            <Hero scrollContainer={wrapperRef} />
          </div>
          <div data-scroll-target="portfolio" className='relative z-30 bg-primary mt-[-2px]'>
            <Portfolio />
          </div>
          <div data-scroll-target="experience" className='relative z-30 bg-primary'>
            <Experience />
          </div>
          <div data-scroll-target="contact" className='relative z-30 bg-primary'>
            <Contact />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
