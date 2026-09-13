import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard.jsx';
import { getProjects } from '../services/api.js';
import { projects as localProjects } from '../data/portfolioData.js';
import './Projects.css';

const featuredProjectTitle = 'Automatic Night Light';

function Projects() {
  const [projects, setProjects] = useState(localProjects);
  const [source, setSource] = useState('local'); // 'local' | 'api'
  const [loading, setLoading] = useState(true);

  return (
    <section id="projects" className="section section-alt" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">What I&apos;ve built</p>
          <h2 id="projects-heading" className="section-title">
            Projects
          </h2>
          <p className="section-subtitle">A selection of projects I&apos;ve worked on so far.</p>
        </div>

        {!loading && source === 'local' && (
          <p className="projects-status-note">
            Showing sample project data — connect the backend and database to manage these live.
          </p>
        )}

        {projects.length === 0 ? (
          <p className="projects-empty">No projects to show yet — check back soon.</p>
        ) : (
          <div className="grid grid-3">
            {projects.map((project) => (
              <ProjectCard key={project.id || project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
