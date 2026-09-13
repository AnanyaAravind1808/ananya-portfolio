import { useState } from 'react';
import { navLinks, profile } from '../data/portfolioData.js';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <nav className="container navbar-inner" aria-label="Primary">
        <a href="#home" className="navbar-brand" onClick={closeMenu}>
          {profile.name}
          <span></span>
        </a>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
        </button>

        <ul id="primary-navigation" className={`navbar-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions navbar-desktop-actions">
          <a
            href={profile.githubUrl}
            className="btn btn-outline btn-small"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            My GitHub
          </a>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;
