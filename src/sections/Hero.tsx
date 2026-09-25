import { contact } from '../content/contact'
import { hero } from '../content/hero'

export function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="hero-visual" aria-hidden="true">
        <img src="/assets/system-topology.jpg" alt="" />
      </div>
      <div className="hero-content">
        <p className="eyebrow">{hero.title}</p>
        <h1 id="hero-heading">{hero.name}</h1>
        <p className="hero-positioning">{hero.positioning}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            Explore my work
          </a>
          <a className="button button-secondary" href={contact.resumeHref} target="_blank" rel="noopener noreferrer">
            Read résumé
          </a>
        </div>
        <p className="hero-meta">{hero.availability}</p>
      </div>
      <a className="hero-scroll" href="#practice" aria-label="Continue to engineering focus">
        <span>Scroll to trace the systems</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}
