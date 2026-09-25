import { certifications } from '../content/certifications'

export function Certifications() {
  return (
    <section id="certifications" className="certifications-section" aria-labelledby="certifications-heading">
      <p className="eyebrow">Continued learning</p>
      <h2 id="certifications-heading">Certifications</h2>
      <ul className="certifications-list">
        {certifications.map((cert) => (
          <li className="certification-card" key={cert.name}>
            <a href={cert.href} target="_blank" rel="noopener noreferrer">
              <span>{cert.name}</span>
              <small>{cert.issuer}</small>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
