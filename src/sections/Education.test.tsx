import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Education } from './Education'
import { education } from '../content/education'

describe('Education', () => {
  it('renders both education entries', () => {
    render(<Education />)
    expect(education).toHaveLength(2)
    for (const entry of education) {
      expect(screen.getByText(entry.institution)).toBeTruthy()
    }
  })

  it("renders the Master's entry before the Bachelor's entry in DOM order", () => {
    render(<Education />)
    const items = screen.getAllByRole('listitem')
    const mastersIndex = items.findIndex((item) => item.textContent?.includes('University of Utah'))
    const bachelorsIndex = items.findIndex((item) =>
      item.textContent?.includes('Uttar Pradesh Technical University'),
    )
    expect(mastersIndex).toBeGreaterThanOrEqual(0)
    expect(bachelorsIndex).toBeGreaterThanOrEqual(0)
    expect(mastersIndex).toBeLessThan(bachelorsIndex)
  })
})
