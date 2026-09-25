const practices = [
  {
    label: 'Software Engineering',
    text: 'Products and platforms with clear domain models, useful interfaces, and maintainable seams.',
  },
  {
    label: 'SRE & DevOps',
    text: 'Reliable delivery systems built around observability, safe change, automation, and feedback.',
  },
  {
    label: 'Applied AI',
    text: 'Agentic and retrieval systems designed with evaluation, privacy, cost, and failure modes in view.',
  },
]

export function Practice() {
  return (
    <section id="practice" className="practice" aria-labelledby="practice-heading">
      <div className="section-heading">
        <p className="eyebrow">Engineering focus</p>
        <h2 id="practice-heading">Build it. Run it. Learn from it.</h2>
      </div>
      <ol className="practice-list">
        {practices.map((practice, index) => (
          <li key={practice.label}>
            <span className="practice-index">0{index + 1}</span>
            <h3>{practice.label}</h3>
            <p>{practice.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
