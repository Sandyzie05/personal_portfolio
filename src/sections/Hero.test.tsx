import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'
import { hero } from '../content/hero'

describe('Hero', () => {
  it('renders the name and title', () => {
    render(<Hero />)
    expect(screen.getByText(hero.name)).toBeTruthy()
    expect(screen.getByText(hero.title)).toBeTruthy()
  })
})
