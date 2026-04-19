import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

function renderHarnessRoute() {
  return render(
    <MemoryRouter initialEntries={['/design/components/canvas-state-management-harness']}>
      <App />
    </MemoryRouter>,
  )
}

describe('Canvas state management harness', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('reconciles desired and actual state on timer ticks', () => {
    renderHarnessRoute()

    fireEvent.click(screen.getByRole('button', { name: 'Add Shape' }))
    fireEvent.click(screen.getByRole('button', { name: 'Create Shape' }))
    expect(screen.queryByRole('listitem', { name: 'Select shape-5' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Edit shape-1' }))
    fireEvent.click(screen.getByRole('option', { name: 'Triangle' }))
    fireEvent.click(screen.getByRole('button', { name: 'Save Shape' }))
    expect(screen.getByRole('listitem', { name: 'Select shape-1' })).toHaveClass('canvas-shape-circle')

    fireEvent.click(screen.getByRole('button', { name: 'Remove shape-2' }))
    expect(screen.getByRole('listitem', { name: 'Select shape-2' })).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(10_000)
    })

    expect(screen.getByRole('listitem', { name: 'Select shape-5' })).toBeInTheDocument()
    expect(screen.getByRole('listitem', { name: 'Select shape-1' })).toHaveClass('canvas-shape-triangle')
    expect(screen.queryByRole('listitem', { name: 'Select shape-2' })).not.toBeInTheDocument()
  })
})
