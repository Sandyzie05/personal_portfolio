import { projects } from '../content/projects'

export function Projects() {
  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-heading">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Selected builds</p>
          <h2 id="projects-heading">Ideas made operational.</h2>
        </div>
        <p>Personal projects are where I test product instincts, local AI, and end-to-end ownership.</p>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.name}>
            <div className="project-topline">
              <p>{project.kind}</p>
              <span>0{index + 1}</span>
            </div>
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
              View source <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
