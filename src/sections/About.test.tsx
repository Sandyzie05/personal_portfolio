import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { About } from './About'
import { about } from '../content/about'

describe('About', () => {
  it('renders the professional narrative', () => {
    render(<About />)
    expect(screen.getByText(about.intro)).toBeTruthy()
    expect(screen.getByText(about.detail)).toBeTruthy()
  })
})
