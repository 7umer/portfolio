import React from "react";
import { site } from "../content";

const QUICK_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href="#home" className="footer-word">
            {site.logo}
          </a>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            <nav aria-label="Footer">
              <ul className="footer-nav">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-socials">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.shortName}. All rights reserved.
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
