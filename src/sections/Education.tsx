import { education } from '../content/education'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      <ul className="education-list">
        {education.map((entry) => (
          <li className="education-entry" key={entry.institution}>
            <p className="education-institution">{entry.institution}</p>
            <p className="education-degree">{entry.degree}</p>
            <p className="education-date">{entry.date}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
