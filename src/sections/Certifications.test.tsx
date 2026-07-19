import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Certifications } from './Certifications'
import { certifications } from '../content/certifications'

describe('Certifications', () => {
  it('renders all 6 certification strings', () => {
    render(<Certifications />)
    expect(certifications).toHaveLength(6)
    for (const cert of certifications) {
      expect(screen.getByText(cert)).toBeTruthy()
    }
  })
})
