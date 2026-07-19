import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Contact } from './Contact'
import { contact } from '../content/contact'

describe('Contact', () => {
  it('renders a mailto link', () => {
    render(<Contact />)
    const link = screen.getByText(contact.email)
    expect(link.getAttribute('href')?.startsWith(`mailto:${contact.email}`)).toBe(true)
  })

  it('renders a safe LinkedIn link', () => {
    render(<Contact />)
    const link = screen.getByText('LinkedIn')
    expect(link.getAttribute('href')).toBe(contact.linkedin)
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('renders a safe GitHub link', () => {
    render(<Contact />)
    const link = screen.getByText('GitHub')
    expect(link.getAttribute('href')).toBe(contact.github)
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('renders a same-origin resume download link', () => {
    render(<Contact />)
    const link = screen.getByText('Download Résumé')
    expect(link.getAttribute('href')).toBe('/resume.pdf')
    expect(link.getAttribute('download')).toBe(contact.resumeDownloadName)
  })
})
