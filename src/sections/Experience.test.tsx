import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Experience } from './Experience'
import { experience } from '../content/experience'

describe('Experience', () => {
  it('renders all 7 role/company pairs in authored (most-recent-first) order', () => {
    render(<Experience />)
    const roleHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(roleHeadings).toHaveLength(experience.length)
    roleHeadings.forEach((heading, index) => {
      expect(heading.textContent).toContain(experience[index].role)
    })

    for (const role of experience) {
      expect(screen.getByText(role.company)).toBeTruthy()
    }
  })

  it('renders a role with a single achievement without error (e.g. Intermountain)', () => {
    render(<Experience />)
    const intermountain = experience.find((role) => role.company === 'Intermountain')
    expect(intermountain).toBeDefined()
    expect(intermountain!.achievements).toHaveLength(1)
    expect(screen.getByText(intermountain!.achievements[0])).toBeTruthy()
  })
})
