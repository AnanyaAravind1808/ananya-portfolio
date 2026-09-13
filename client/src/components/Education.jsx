import { education } from '../data/portfolioData.js';
import './Sections.css';

function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">My academic journey</p>
          <h2 id="education-heading" className="section-title">
            Education
          </h2>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <h3>
              {education.degree} — {education.branch}
            </h3>
            <p className="timeline-meta">
              {education.startYear}–{education.expectedGraduation} · {education.status}
            </p>
            <p className="section-subtitle" style={{ textAlign: 'left' }}>
              Relevant coursework:
            </p>
            <div className="timeline-coursework">
              {education.coursework.map((course) => (
                <span className="tag" key={course}>
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
