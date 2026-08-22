import React, { useEffect, useState } from "react";
import { close, menu } from "../assets";
import { navLinks } from "../data";

const navThemes = {
  hero: {
    "--nav-accent": "#3feaff",
    "--nav-glow": "rgba(63, 234, 255, 0.42)",
  },
  portfolio: {
    "--nav-accent": "#ff2bd6",
    "--nav-glow": "rgba(255, 43, 214, 0.42)",
  },
  experience: {
    "--nav-accent": "#29ffa4",
    "--nav-glow": "rgba(41, 255, 164, 0.38)",
  },
  contact: {
    "--nav-accent": "#ff7a18",
    "--nav-glow": "rgba(255, 122, 24, 0.42)",
  },
};

const Navbar = ({ onNavigate, scrollContainer }) => {
  const [active, setActive] = useState("hero");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-scroll-target]");
    const container = scrollContainer?.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.dataset.scrollTarget);
          }
        });
      },
      {
        root: container,
        threshold: 0.2,
        rootMargin: "0px 0px -50% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [scrollContainer]);

  const handleNavClick = (sectionId) => (event) => {
    event.preventDefault();
    setActive(sectionId);
    setToggle(false);
    onNavigate?.(sectionId);
  };

  return (
    <nav
      style={navThemes[active] ?? navThemes.hero}
      className="w-full flex items-center bg-gradient-to-b from-black sm:bg-none p-8 sm:px-16 sm:py-10 fixed z-40 pointer-events-none"
    >
      <div className='w-full flex justify-between items-start mx-auto'>
        <button
          type="button"
          className='navbar-logo flex items-start pointer-events-auto'
          onClick={handleNavClick("hero")}
        >
          <p className='text-[26px] lg:text-[36px] font-bold pointer-events-auto cursor-pointer flex'>
            IL
          </p>
        </button>

        <ul className='list-none hidden sm:flex flex-col gap-5'>
          {navLinks.map((nav) => {
            const theme = navThemes[nav.id] ?? navThemes.hero;

            return (
            <li
              key={nav.id}
              style={theme}
              className={`nav-link relative flex items-center ${active === nav.id ? "is-active" : ""} text-[18px] lg:text-[24px] font-bold pointer-events-auto cursor-pointer`}
            >
              {active === nav.id && (
                <div className="nav-link__indicator"></div>
              )}
              <button
                type="button"
                className="bg-transparent border-0 p-0 text-inherit font-inherit cursor-pointer pointer-events-auto"
                onClick={handleNavClick(nav.id)}
              >
                {nav.title}
              </button>
            </li>
            );
          })}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain pointer-events-auto cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } nav-mobile-menu p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-30`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => {
                const theme = navThemes[nav.id] ?? navThemes.hero;

                return (
                <li
                  key={nav.id}
                  style={theme}
                  className={`nav-link font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "is-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="bg-transparent border-0 p-0 text-inherit font-inherit cursor-pointer pointer-events-auto"
                    onClick={handleNavClick(nav.id)}
                  >
                    {nav.title}
                  </button>
                </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
