import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Certifications } from './Certifications'
import { certifications } from '../content/certifications'

describe('Certifications', () => {
  it('renders all six certifications with issuer links', () => {
    render(<Certifications />)
    expect(certifications).toHaveLength(6)
    for (const cert of certifications) {
      const link = screen.getByText(cert.name).closest('a')
      expect(link?.getAttribute('href')).toBe(cert.href)
      expect(screen.getByText(cert.issuer)).toBeTruthy()
    }
  })
})
