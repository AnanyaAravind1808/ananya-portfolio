import './Projects.css';

const FALLBACK_IMAGE = '/images/placeholder-project.svg';

function ProjectCard({ project }) {
  const {
    title,
    description,
    technologies = [],
    category,
    image,
    github,
    demo,
  } = project;

  return (
    <article className="card project-card">
      <img
        className="project-card-image"
        src={image || FALLBACK_IMAGE}
        alt={`Screenshot or illustration for the project ${title}`}
        loading="lazy"
        onError={(event) => {
          // Guard against broken/missing image URLs without breaking layout.
          event.currentTarget.onerror = null;
          event.currentTarget.src = FALLBACK_IMAGE;
        }}
      />
      <div className="project-card-body">
        {category && <span className="project-card-category">{category}</span>}
        <h3>{title}</h3>
        <p>{description}</p>
        {technologies.length > 0 && (
          <div className="project-card-tech">
            {technologies.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="project-card-links">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-small"
              aria-label={`View source code for ${title} on GitHub`}
            >
              GitHub
            </a>
          ) : null}
          {demo ? (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-small"
              aria-label={`View live demo for ${title}`}
            >
              Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;