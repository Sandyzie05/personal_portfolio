import { useState } from 'react'
import { ThemeToggle } from '../theme/ThemeToggle'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Toolkit' },
  { href: '#about', label: 'About' },
]

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <header className="top-nav">
        <nav aria-label="Primary">
          <a className="wordmark" href="#hero" aria-label="Sandeep Gupta, home">
            SG<span aria-hidden="true">/</span>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={isOpen}
            aria-controls="primary-nav-links"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <ul id="primary-nav-links" className={isOpen ? 'nav-links open' : 'nav-links'}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setIsOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="nav-contact" href="#contact">
              Let&apos;s talk
            </a>
          </div>
        </nav>
      </header>
    </>
  )
}
