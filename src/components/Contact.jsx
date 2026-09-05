import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Mail, Phone, ArrowUpRight } from "lucide-react";
import { site } from "../content";

function Field({ label, type = "text", name, value, onChange, textarea }) {
  const Tag = textarea ? "textarea" : "input";
  const id = `field-${name}`;

  return (
    <div className="field">
      <Tag
        id={id}
        type={textarea ? undefined : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        rows={textarea ? 5 : undefined}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.REACT_APP_WEB3FORMS_KEY,
          subject: `Portfolio enquiry from ${formData.name}`,
          ...formData,
        }),
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
    <section id="contact" className="section panel">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Contact</span>
          <h2 className="display-2">{site.cta.heading}</h2>
        </div>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="lead">{site.cta.body}</p>

            <div className="contact-links">
              <a href={`mailto:${site.email}`} className="contact-link">
                <Mail size={17} aria-hidden="true" /> {site.email}
              </a>
              <a href={site.phoneHref} className="contact-link">
                <Phone size={17} aria-hidden="true" /> {site.phone}
              </a>
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <ArrowUpRight size={17} aria-hidden="true" /> {social.label}
                </a>
              ))}
              <a
                href={site.company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Globe size={17} aria-hidden="true" />{" "}
                {site.company.url.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </motion.div>

          <motion.form
            className="form-grid"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Field
              label="Your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Field
              label="Your email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Field
              label="What are you building?"
              name="message"
              value={formData.message}
              onChange={handleChange}
              textarea
            />

            <button
              type="submit"
              className="btn btn--accent"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            <p className="form-status" role="status" aria-live="polite">
              {status === "success" && (
                <span className="is-ok">
                  Message sent — I'll reply within a day.
                </span>
              )}
              {status === "error" && (
                <span className="is-err">
                  Something went wrong. Email me directly at {site.email}.
                </span>
              )}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
