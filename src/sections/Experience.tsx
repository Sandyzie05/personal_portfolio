import { experience } from '../content/experience'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      <ol className="timeline">
        {experience.map((role) => (
          <li className="timeline-entry" key={`${role.company}-${role.start}`}>
            <h3 className="timeline-role">{role.role}</h3>
            <p className="timeline-meta">
              {role.company} · {role.location}
            </p>
            <p className="timeline-dates">
              {role.start} – {role.end}
            </p>
            <ul className="timeline-achievements">
              {role.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
