import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Globe } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

function FloatingField({ label, type, name, value, onChange, textarea }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="floating-field">
      <Tag
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        rows={textarea ? 5 : undefined}
      />
      <label>{label}</label>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      access_key: process.env.REACT_APP_WEB3FORMS_KEY,
      ...formData,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section contact-premium">
      <span className="section-eyebrow">Get In Touch</span>
      <h2 className="section-title">Let's Build Something Amazing Together</h2>

      <div className="contact-card contact-grid">
        <motion.div
          className="contact-info-premium"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a href="mailto:umerbadal@gmail.com" className="contact-link">
            <Mail size={18} /> umerbadal@gmail.com
          </a>
          <a href="tel:+919035477754" className="contact-link">
            <Phone size={18} /> +91 90354 77754
          </a>
          <a
            href="https://linkedin.com/in/mohammed-talha-umer-badal-9910b7242"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaLinkedin size={18} /> LinkedIn
          </a>
          <a
            href="https://github.com/7umer"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaGithub size={18} /> GitHub
          </a>
          <a
            href="https://www.instagram.com/um_web_solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaInstagram size={18} /> Instagram
          </a>
          <a
            href="https://umwebsolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <Globe size={18} /> umwebsolutions.com
          </a>
        </motion.div>

        <motion.form
          className="contact-form-premium"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FloatingField label="Your Name" type="text" name="name" value={formData.name} onChange={handleChange} />
          <FloatingField label="Your Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          <FloatingField label="Your Message" name="message" value={formData.message} onChange={handleChange} textarea />

          <motion.button
            type="submit"
            className="btn-gradient"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>

          {status === "success" && <p className="form-status success">Message sent successfully 🚀</p>}
          {status === "error" && <p className="form-status error">Something went wrong — try again.</p>}
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;