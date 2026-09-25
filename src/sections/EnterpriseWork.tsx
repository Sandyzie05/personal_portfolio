import { enterpriseWork } from '../content/enterpriseWork'

export function EnterpriseWork() {
  return (
    <section id="work" className="work-section" aria-labelledby="work-heading">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Selected enterprise work</p>
          <h2 id="work-heading">Platforms that compound a team&apos;s capability.</h2>
        </div>
        <p>
          Details are intentionally generalized to protect confidential systems while preserving the
          engineering problem, approach, and outcome.
        </p>
      </div>
      <div className="work-list">
        {enterpriseWork.map((item, index) => (
          <article className="work-item" key={item.title}>
            <p className="work-number">0{index + 1}</p>
            <div className="work-copy">
              <p className="work-discipline">{item.discipline}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </div>
            <ul className="outcome-list" aria-label={`${item.title} outcomes`}>
              {item.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
