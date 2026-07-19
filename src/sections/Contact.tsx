import { contact } from '../content/contact'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href={contact.github} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      <a href={contact.resumeHref} download={contact.resumeDownloadName}>
        Download Résumé
      </a>
    </section>
  )
}
