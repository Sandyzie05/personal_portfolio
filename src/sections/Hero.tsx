import { hero } from '../content/hero'

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading">{hero.name}</h1>
      <p>{hero.title}</p>
      <p>{hero.positioning}</p>
    </section>
  )
}
