import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { About } from './About'
import { about } from '../content/about'

describe('About', () => {
  it('renders the professional summary', () => {
    render(<About />)
    expect(screen.getByText(about.summary)).toBeTruthy()
  })
})
