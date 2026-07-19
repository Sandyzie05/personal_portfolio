import { certifications } from '../content/certifications'

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-heading">
      <h2 id="certifications-heading">Certifications</h2>
      <ul className="certifications-list">
        {certifications.map((cert) => (
          <li className="certification-card" key={cert}>
            {cert}
          </li>
        ))}
      </ul>
    </section>
  )
}
