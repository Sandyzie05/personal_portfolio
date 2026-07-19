import { skills } from '../content/skills'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Skills</h2>
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
