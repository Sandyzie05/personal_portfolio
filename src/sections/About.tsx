import { about } from '../content/about'

export function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="section-heading">
        <p className="eyebrow">Operating philosophy</p>
        <h2 id="about-heading">Reliability is a product decision.</h2>
      </div>
      <div className="about-copy">
        <p className="about-lead">{about.intro}</p>
        <p>{about.detail}</p>
      </div>
    </section>
  )
}
