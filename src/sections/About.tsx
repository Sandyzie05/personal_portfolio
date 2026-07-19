import { about } from '../content/about'

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <h2 id="about-heading">About</h2>
      <p>{about.summary}</p>
    </section>
  )
}
