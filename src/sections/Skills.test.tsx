import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skills } from './Skills'
import { skills } from '../content/skills'

describe('Skills', () => {
  it('renders all 10 category labels', () => {
    render(<Skills />)
    for (const group of skills) {
      expect(screen.getByText(group.category)).toBeTruthy()
    }
  })

  it('never renders a percentage or proficiency score', () => {
    render(<Skills />)
    const body = document.body.textContent ?? ''
    expect(body).not.toMatch(/%/)
    expect(body.toLowerCase()).not.toMatch(/proficiency/)
  })
})
