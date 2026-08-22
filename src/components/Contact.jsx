import emailjs from "@emailjs/browser";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  return (
    <div
      className="section-shell contact-shell flex flex-col sm:flex-row gap-10 overflow-hidden"
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {
            opacity: 0,
            y: 100,
          },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              type: "tween",
              duration: 1,
              delay: 0.2,
            },
          },
        }}
        className='contact-panel'
      >
        <h3 className={`${styles.sectionText} section-heading`}>Contact</h3>

        <form
          action="https://getform.io/f/8b086558-47d4-49d0-852d-ec8c22da40f7"
          method="POST"
          className="contact-form mt-12 gap-4 flex flex-col"
        >
          <label className="contact-field-group">
            <span className='text-white font-medium'>Full Name</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="contact-field p-4 text-white font-medium"
            />
          </label>
          <label className="contact-field-group">
            <span className='text-white font-medium'>Email Address</span>
            <input
              type="text"
              name="email"
              placeholder="Enter your email address"
              className="contact-field p-4 text-white font-medium"
            />
          </label>
          <label className="contact-field-group contact-field-group--wide">
            <span className='text-white font-medium'>Message</span>
            <textarea
              name="message"
              placeholder="Tell me about your 3D print or CNC project"
              rows="10"
              className="contact-field p-4 text-white font-medium"
            />
          </label>
          <button
            type='submit'
            className='contact-button py-3 px-8 w-fit text-white font-bold'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
