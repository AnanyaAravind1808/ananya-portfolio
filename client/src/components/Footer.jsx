import { profile } from '../data/portfolioData.js';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-copy">
          © {year} {profile.name}. Built with React, Node.js &amp; MongoDB.
        </p>
        <nav className="footer-links" aria-label="Social links">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
