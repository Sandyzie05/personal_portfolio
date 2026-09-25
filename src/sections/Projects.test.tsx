import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Projects } from './Projects'
import { projects } from '../content/projects'

describe('Projects', () => {
  it('renders exactly 6 project names in authored order', () => {
    render(<Projects />)
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(6)
    expect(headings.map((heading) => heading.textContent)).toEqual(
      projects.map((project) => project.name),
    )
  })

  it('renders every GitHub link as target=_blank rel=noopener noreferrer', () => {
    render(<Projects />)
    for (const project of projects) {
      const link = document.querySelector(`a[href="${project.repoUrl}"]`)
      expect(link).toBeInstanceOf(HTMLAnchorElement)
      if (!(link instanceof HTMLAnchorElement)) throw new Error('Project link not found')
      expect(link.textContent).toContain('View source')
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toBe('noopener noreferrer')
    }
  })

  it('renders a non-empty description and at least one tag for every project', () => {
    render(<Projects />)
    for (const project of projects) {
      expect(project.description.length).toBeGreaterThan(0)
      expect(screen.getByText(project.description)).toBeTruthy()
      expect(project.tags.length).toBeGreaterThan(0)
      for (const tag of project.tags) {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0)
      }
    }
  })
})
