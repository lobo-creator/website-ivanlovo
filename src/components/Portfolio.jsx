import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { portfolio } from "../data";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const projectThemes = [
  {
    "--card-bg": "linear-gradient(135deg, rgba(255, 43, 214, 0.22), rgba(15, 10, 58, 0.95))",
    "--card-accent": "#ff2bd6",
    "--card-accent-2": "#36f7ee",
    "--card-glow": "rgba(255, 43, 214, 0.34)",
  },
  {
    "--card-bg": "linear-gradient(135deg, rgba(54, 247, 238, 0.2), rgba(5, 22, 54, 0.95))",
    "--card-accent": "#36f7ee",
    "--card-accent-2": "#29ffa4",
    "--card-glow": "rgba(54, 247, 238, 0.3)",
  },
  {
    "--card-bg": "linear-gradient(135deg, rgba(255, 122, 24, 0.26), rgba(46, 20, 3, 0.95))",
    "--card-accent": "#ff7a18",
    "--card-accent-2": "#ff2bd6",
    "--card-glow": "rgba(255, 122, 24, 0.32)",
  },
];

const renderAccentedTitle = (name, accentWord) => {
  if (!accentWord || !name.includes(accentWord)) return name;

  const [before, after] = name.split(accentWord);
  return (
    <>
      {before}
      <span>{accentWord}</span>
      {after}
    </>
  );
};

const ProjectImageCarousel = ({ slides, activeSlide, onManualSlideChange }) => {
  const slideCount = slides.length;

  const showPrevious = () => {
    onManualSlideChange((current) => (current - 1 + slideCount) % slideCount);
  };

  const showNext = () => {
    onManualSlideChange((current) => (current + 1) % slideCount);
  };

  return (
    <div className="portfolio-carousel" aria-label="Work image carousel">
      <div
        className="portfolio-carousel__track"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {slides.map((item, imageIndex) => (
          <img
            key={`${item.name}-carousel-${imageIndex}`}
            src={item.src}
            alt={item.alt}
            decoding="async"
            loading="lazy"
            className="portfolio-carousel__image"
          />
        ))}
      </div>

      {slideCount > 1 && (
        <>
          <button
            type="button"
            className="portfolio-carousel__button portfolio-carousel__button--prev"
            aria-label="Previous work image"
            onClick={showPrevious}
          />
          <button
            type="button"
            className="portfolio-carousel__button portfolio-carousel__button--next"
            aria-label="Next work image"
            onClick={showNext}
          />

          <div className="portfolio-carousel__dots" aria-label="Work image selector">
            {slides.map((item, dotIndex) => (
              <button
                key={`${item.name}-dot-${dotIndex}`}
                type="button"
                className={`portfolio-carousel__dot ${activeSlide === dotIndex ? "is-active" : ""}`}
                aria-label={`Show ${item.alt}`}
                onClick={() => onManualSlideChange(dotIndex)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectCard = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const slideCount = slides.length;
  const activeWork = slides[activeSlide] ?? slides[0];
  const activeTheme = projectThemes[activeSlide % projectThemes.length];

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (slideCount < 2 || isAutoplayPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [isAutoplayPaused, slideCount]);

  const handleManualSlideChange = (nextSlide) => {
    setIsAutoplayPaused(true);
    setActiveSlide(nextSlide);
  };

  const showNextProject = () => {
    handleManualSlideChange((current) => (current + 1) % slideCount);
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={fadeIn("up", "spring", 0, 0.75)}
      style={activeTheme}
      className="project-card portfolio-card"
    >
      <div className="portfolio-card__media">
        <ProjectImageCarousel
          slides={slides}
          activeSlide={activeSlide}
          onManualSlideChange={handleManualSlideChange}
        />

        <div className="portfolio-card__specs" aria-label={`${activeWork.name} technical specs`}>
          {activeWork.specs?.map((spec) => (
            <span key={spec.label}>
              <strong>{spec.label}</strong>
              {spec.value}
            </span>
          ))}
        </div>

        <div className="portfolio-card__caption">
          <span className="portfolio-card__caption-icon" aria-hidden="true" />
          <strong>{activeWork.category}</strong>
          <span aria-hidden="true">//</span>
          <em>{activeWork.type}</em>
        </div>
      </div>

      <div key={activeSlide} className="portfolio-card__content" aria-live="polite">
        <p className="portfolio-card__eyebrow">/// Featured project ///</p>
        <h3>{renderAccentedTitle(activeWork.name, activeWork.accentWord)}</h3>
        <span className="portfolio-card__rule" aria-hidden="true" />
        <p>{activeWork.description}</p>

        <div className="portfolio-card__tags">
          {activeWork.tags?.map((tag, index) => (
            <span key={tag} className="portfolio-card__tag">
              <span className={`portfolio-card__tag-icon portfolio-card__tag-icon--${index + 1}`} aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>

        <ul className="portfolio-card__stats">
          {activeWork.stats?.map((stat) => (
            <li key={`${activeWork.name}-${stat.value}`}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className="portfolio-card__actions">
          <a href="#contact" className="portfolio-card__primary-action">
            Start a project
            <span aria-hidden="true" />
          </a>
          <button
            type="button"
            className="portfolio-card__next-action"
            onClick={showNextProject}
          >
            Next project
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <div className="section-shell work-shell">
      <motion.div className="work-shell__heading" variants={textVariant()}>
        <h2 className="work-title">Work</h2>
        <p className="work-eyebrow">
          <span aria-hidden="true" />
          Selected projects
        </p>
      </motion.div>

      <div className="work-card-list">
        {portfolio.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Portfolio, "portfolio");
