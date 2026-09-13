import { experience } from '../data/portfolioData.js';
import './Sections.css';

function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Where I&apos;ve worked and learned</p>
          <h2 id="experience-heading" className="section-title">
            Experience
          </h2>
        </div>

        <div className="grid grid-2 mt-lg">
          {experience.map((exp) => (
            <div className="card experience-card" key={exp.id}>
              <div className="experience-card-header">
                <h3>{exp.role}</h3>
                {(exp.startDate || exp.endDate) && (
                  <span className="experience-dates">
                    {exp.startDate} – {exp.endDate}
                  </span>
                )}
              </div>
              {exp.company && <span className="experience-company">{exp.company}</span>}
              <p>{exp.description}</p>
              {exp.technologies.length > 0 && (
                <div className="tech-row">
                  {exp.technologies.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Experience;
