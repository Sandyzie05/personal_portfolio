import { testimonials } from '../content/testimonials'

export function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="section-heading">
        <p className="eyebrow">From collaborators</p>
        <h2 id="testimonials-heading">Trust is part of the system.</h2>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <blockquote className="testimonial-card" key={testimonial.name}>
            <p className="testimonial-quote">{testimonial.quote}</p>
            <footer>
              <p className="testimonial-name">{testimonial.name}</p>
              <p className="testimonial-title">{testimonial.title}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
