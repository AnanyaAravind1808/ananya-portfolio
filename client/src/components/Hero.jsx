import { profile } from '../data/portfolioData.js';
import profileImage from '../assets/profile.jpg';
import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div>
          <p className="hero-eyebrow">Welcome to my portfolio</p>
          <h1 className="hero-title">Hi, I&apos;m {profile.name}</h1>
          <p className="hero-subtitle">{profile.title}</p>
          <p className="hero-description">{profile.tagline}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View My Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-visual">
         <div className="hero-visual-card">
          <img
            src={profileImage}
            alt={`${profile.name} profile`}
            className="hero-profile-image"
        />
        </div>
       </div>
      </div>
    </section>
  );
}

export default Hero;
