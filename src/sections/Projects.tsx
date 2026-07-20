import { projects } from '../content/projects'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.name}>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <ul className="tag-chip-list">
              {project.tags.map((tag) => (
                <li className="tag-chip" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
