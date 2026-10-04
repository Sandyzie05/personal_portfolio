import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'
import { hero } from '../content/hero'

vi.hoisted(() => {
  vi.stubEnv('BASE_URL', '/portfolio/')
})

describe('Hero', () => {
  it('renders the name and title', () => {
    render(<Hero />)
    expect(screen.getByText(hero.name)).toBeTruthy()
    expect(screen.getByText(hero.title)).toBeTruthy()
  })

  it('uses the deployment base for the hero image', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('.hero-visual img')?.getAttribute('src')).toBe(
      '/portfolio/assets/system-topology.jpg',
    )
  })

  it('uses the deployment base for the resume link', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Read résumé' }).getAttribute('href')).toBe(
      '/portfolio/resume.pdf',
    )
  })
})
