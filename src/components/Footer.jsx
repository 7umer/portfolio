import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer-logo">
        <a href="#home">Umer.</a>
      </h2>

      <div className="socials">
        <a href="https://github.com/7umer" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/mohammed-talha-umer-badal-9910b7242">
          <FaLinkedin />
        </a>
        <a href="#home">
          <FaInstagram />
        </a>
      </div>

      <p>© 2026 Umer. All rights reserved.</p>
    </footer>
  );
}

export default Footer;