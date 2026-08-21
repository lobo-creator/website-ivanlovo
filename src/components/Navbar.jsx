import React, { useEffect, useState } from "react";
import { close, menu } from "../assets";
import { navLinks } from "../data";

const Navbar = ({ onNavigate, scrollContainer }) => {
  const [active, setActive] = useState("hero");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = scrollContainer?.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      setScrolled(scrollTop > 100);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainer]);

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
      className="w-full flex items-center bg-gradient-to-b from-black sm:bg-none p-8 sm:px-16 sm:py-10 fixed z-40 pointer-events-none"
    >
      <div className='w-full flex justify-between items-start mx-auto'>
        <button
          type="button"
          className='flex items-start pointer-events-auto'
          onClick={handleNavClick("hero")}
        >
          <p className='text-white text-[26px] lg:text-[36px] font-bold pointer-events-auto cursor-pointer flex'>
            IL
          </p>
        </button>

        <ul className='list-none hidden sm:flex flex-col gap-5'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`relative flex items-center ${
                active === nav.id ? "text-white" : "text-slate-500"
              } hover:text-white text-[18px] lg:text-[24px] font-bold pointer-events-auto cursor-pointer`}
            >
              {active === nav.id && (
                <div className="fixed right-10 w-2 h-6 lg:h-8 bg-quaternary"></div>
              )}
              <button
                type="button"
                className="bg-transparent border-0 p-0 text-inherit font-inherit cursor-pointer pointer-events-auto"
                onClick={handleNavClick(nav.id)}
              >
                {nav.title}
              </button>
            </li>
          ))}
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
            } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-30 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-quaternary" : "text-secondary"
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
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
