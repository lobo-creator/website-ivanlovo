import { motion } from "framer-motion";
import React, { useState } from "react";

import { experiences } from "../data";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const serviceThemes = [
  {
    "--service-bg": "linear-gradient(135deg, rgba(255, 43, 214, 0.28), rgba(19, 7, 52, 0.92))",
    "--service-accent": "#ff2bd6",
    "--service-accent-2": "#36f7ee",
    "--service-glow": "rgba(255, 43, 214, 0.38)",
  },
  {
    "--service-bg": "linear-gradient(135deg, rgba(54, 247, 238, 0.22), rgba(4, 35, 44, 0.94))",
    "--service-accent": "#36f7ee",
    "--service-accent-2": "#29ffa4",
    "--service-glow": "rgba(54, 247, 238, 0.32)",
  },
  {
    "--service-bg": "linear-gradient(135deg, rgba(255, 122, 24, 0.26), rgba(47, 19, 2, 0.94))",
    "--service-accent": "#ff7a18",
    "--service-accent-2": "#ff2bd6",
    "--service-glow": "rgba(255, 122, 24, 0.34)",
  },
  {
    "--service-bg": "linear-gradient(135deg, rgba(41, 255, 164, 0.22), rgba(5, 39, 31, 0.94))",
    "--service-accent": "#29ffa4",
    "--service-accent-2": "#36f7ee",
    "--service-glow": "rgba(41, 255, 164, 0.3)",
  },
];

const ExperienceCard = ({ experience, index, onClick, isActive }) => {
  const theme = serviceThemes[index % serviceThemes.length];

  return (
    <button
      type="button"
      onClick={onClick}
      style={theme}
      className={`service-card ${isActive ? "is-active" : ""}`}
      aria-pressed={isActive}
    >
      <span className={`service-card__icon service-card__icon--${experience.icon}`} aria-hidden="true" />
      <span className="service-card__content">
        <span className="service-card__title">{experience.title}</span>
        <span className="service-card__meta">{experience.company_name}</span>
      </span>
      <span className="service-card__arrow" aria-hidden="true" />
    </button>
  );
};

const ExperienceDetails = ({ experience, theme }) => {
  return (
    <motion.article
      key={experience.title}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="service-detail-panel"
      style={theme}
    >
      <div className="service-detail__copy">
        <p className="service-detail__eyebrow">/// {experience.label} ///</p>
        <h3>{experience.headline}</h3>
        <span className="service-detail__rule" aria-hidden="true" />
        <p className="service-detail__summary">{experience.summary}</p>

        <ul className="service-detail__features">
          {experience.highlights.map((highlight, index) => (
            <li key={`${experience.title}-highlight-${index}`}>
              <span className="service-detail__feature-icon" aria-hidden="true" />
              <span>
                <strong>{highlight.title}</strong>
                <span>{highlight.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="service-detail__visual" aria-hidden="true">
        <img src={experience.visual} alt={experience.visualAlt} decoding="async" loading="lazy" />
        <span className="service-detail__scanline" />
        <span className="service-detail__annotation service-detail__annotation--top">
          {experience.annotationTop}
        </span>
        <span className="service-detail__annotation service-detail__annotation--bottom">
          {experience.annotationBottom}
        </span>
      </div>
    </motion.article>
  );
};

const Experience = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedService = experiences[selectedIndex];
  const selectedTheme = serviceThemes[selectedIndex % serviceThemes.length];

  return (
    <div className="section-shell services-shell">
      <motion.div className="services-shell__heading" variants={textVariant()}>
        <p className="services-eyebrow">
          <span aria-hidden="true" />
          Services
          <span aria-hidden="true" />
        </p>
        <h2 className="services-title">
          Design. <span className="services-title__model">Model.</span>{" "}
          <span className="services-title__fabricate">Fabricate.</span>
        </h2>
        <p className="services-subtitle">
          End-to-end solutions from concept to precision.
        </p>
      </motion.div>

      <div className="services-layout">
        <div className="service-list" role="list" aria-label="Services">
          {experiences.map((experience, index) => (
            <div key={`experience-${index}`} role="listitem">
              <ExperienceCard
                experience={experience}
                index={index}
                onClick={() => setSelectedIndex(index)}
                isActive={selectedIndex === index}
              />
            </div>
          ))}
        </div>

        <ExperienceDetails experience={selectedService} theme={selectedTheme} />
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");
