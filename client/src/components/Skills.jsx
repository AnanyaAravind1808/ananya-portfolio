import { skillCategories } from '../data/portfolioData.js';
import './Sections.css';

function Skills() {
  return (
    <section id="skills" className="section section-alt" aria-labelledby="skills-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">What I work with</p>
          <h2 id="skills-heading" className="section-title">
            Technical Skills
          </h2>
          <p className="section-subtitle">
            Technologies and concepts I&apos;m currently learning and building with.
          </p>
        </div>

        <div className="card">
          {skillCategories.map((cat) => (
            <div className="skills-category" key={cat.category}>
              <h3>{cat.category}</h3>
              <div className="skills-chip-row">
                {cat.skills.map((skill) => (
                  <span className="skill-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
