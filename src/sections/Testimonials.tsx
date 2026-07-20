import { testimonials } from '../content/testimonials'

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading">Testimonials</h2>
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
