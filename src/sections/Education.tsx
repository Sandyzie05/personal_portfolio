import { education } from '../content/education'

export function Education() {
  return (
    <section id="education" className="education-section" aria-labelledby="education-heading">
      <p className="eyebrow">Foundations</p>
      <h2 id="education-heading">Education</h2>
      <ul className="education-list">
        {education.map((entry) => (
          <li className="education-entry" key={entry.institution}>
            <a className="education-institution" href={entry.href} target="_blank" rel="noopener noreferrer">
              {entry.institution} <span aria-hidden="true">↗</span>
            </a>
            <p className="education-degree">{entry.degree}</p>
            <p className="education-date">{entry.date}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
