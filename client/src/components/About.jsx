import './About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">

        <div className="about-header">
          <p className="section-label">About Me</p>
          <h2>Who I Am</h2>
        </div>

        <div className="about-content">

          <div className="about-text">

            <p>
              I'm a 2nd-year Computer Science and Engineering student at
              Easwari Engineering College, interested in software development
              and building practical applications. I'm currently exploring
              full stack development and strengthening my foundation in
              programming, web technologies, and problem-solving.
            </p>

            <p>
              I enjoy turning ideas into working projects and learning by
              building. From developing an Automatic Night Light using an LDR
              sensor to working on web-based projects, I like exploring how
              different technologies come together to solve real problems.
            </p>

            <p>
              I'm continuously learning and experimenting with technologies
              such as React, Node.js, Express, and MongoDB. My goal is to
              become a well-rounded developer who can understand a problem,
              build a solution, and keep improving it along the way.
            </p>

            <div className="about-links">
              <a
                href="https://www.linkedin.com/in/ananya-aravind-3481b8383/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin-link"
              >
                LinkedIn
              </a>
            </div>

          </div>

          <div className="about-highlights">

            <div className="highlight-card">
              <h3> Education</h3>
              <p>
                2nd-year Computer Science and Engineering student at
                Easwari Engineering College.
              </p>
            </div>

            <div className="highlight-card">
              <h3> Interests</h3>
              <p>
                Software development, full stack development, web technologies
                and problem-solving.
              </p>
            </div>

            <div className="highlight-card">
              <h3> Learning</h3>
              <p>
                Building practical projects and continuously exploring new
                technologies.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;