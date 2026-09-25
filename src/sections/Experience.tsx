import { experience } from '../content/experience'

export function Experience() {
  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-heading">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Career trace</p>
          <h2 id="experience-heading">From operating systems to designing platforms.</h2>
        </div>
        <p>Thirteen years across infrastructure, cloud, SRE, platform engineering, and AI-enabled developer tools.</p>
      </div>
      <ol className="timeline">
        {experience.map((role) => (
          <li className="timeline-entry" key={`${role.company}-${role.start}`}>
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-when">
              <p>{role.start} — {role.end}</p>
              <span>{role.location}</span>
            </div>
            <div className="timeline-content">
              <h3 className="timeline-role">{role.role}</h3>
              <p className="timeline-meta">{role.company}</p>
              <ul className="timeline-achievements">
                {role.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
