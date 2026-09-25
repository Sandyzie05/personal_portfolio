import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { enterpriseWork } from '../content/enterpriseWork'
import { EnterpriseWork } from './EnterpriseWork'

describe('EnterpriseWork', () => {
  it('renders generalized case studies without internal project names', () => {
    render(<EnterpriseWork />)
    for (const item of enterpriseWork) {
      expect(screen.getByText(item.title)).toBeTruthy()
    }
    expect(document.body.textContent).not.toMatch(/Workfront|Fusion|Cadence|devx-ai-agent-harness/i)
  })
})
