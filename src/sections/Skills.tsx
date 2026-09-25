import { skills } from '../content/skills'

export function Skills() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-heading">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Working toolkit</p>
          <h2 id="skills-heading">Breadth, organized around outcomes.</h2>
        </div>
        <p>Tools change. The through-line is dependable software, operable systems, and faster feedback.</p>
      </div>
      <div className="skills-grid">
        {skills.map((group) => (
          <div className="skill-group" key={group.category}>
            <h3 className="skill-category">{group.category}</h3>
            <ul className="tag-chip-list">
              {group.items.map((item) => (
                <li className="tag-chip" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
