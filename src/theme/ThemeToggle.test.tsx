import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  it('changes theme and exposes the next action', () => {
    window.localStorage.setItem('portfolio-theme', 'dark')
    render(<ThemeToggle />)

    const toggle = screen.getByRole('button', { name: 'Switch to light theme' })
    fireEvent.click(toggle)

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeTruthy()
  })
})
