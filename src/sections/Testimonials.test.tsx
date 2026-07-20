import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Testimonials } from './Testimonials'
import { testimonials } from '../content/testimonials'

describe('Testimonials', () => {
  it('renders all 3 quotes and name+title attributions', () => {
    render(<Testimonials />)
    expect(testimonials).toHaveLength(3)
    for (const testimonial of testimonials) {
      expect(screen.getByText(testimonial.quote)).toBeTruthy()
      expect(screen.getByText(testimonial.name)).toBeTruthy()
      expect(screen.getByText(testimonial.title)).toBeTruthy()
    }
  })

  it('renders quotes and attributions in the array\'s authored order', () => {
    render(<Testimonials />)
    const allText = document.body.textContent ?? ''
    const indices = testimonials.map((t) => allText.indexOf(t.name))
    expect(indices.every((i) => i >= 0)).toBe(true)
    expect(indices).toEqual([...indices].sort((a, b) => a - b))
  })
})
