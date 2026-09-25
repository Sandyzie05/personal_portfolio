import { contact } from '../content/contact'

export function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <p className="eyebrow">Open channel</p>
      <h2 id="contact-heading">Let&apos;s make complex systems feel simple.</h2>
      <p className="contact-copy">
        Interested in platform engineering, reliability, developer experience, or practical AI? I&apos;d like to hear what you are building.
      </p>
      <div className="contact-actions">
        <a className="button button-primary" href={`mailto:${contact.email}`}>Email me</a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        <a href={contact.resumeHref} download={contact.resumeDownloadName}>Download résumé <span aria-hidden="true">↓</span></a>
      </div>
      <p className="contact-email">{contact.email}</p>
    </section>
  )
}
