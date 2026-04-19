import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  it('propagates add, update, and remove through store state', async () => {
    const user = userEvent.setup()
    renderHarnessRoute()

    await user.click(screen.getByRole('button', { name: 'Add Shape' }))
    await user.click(screen.getByRole('button', { name: 'Create Shape' }))
    expect(screen.getByRole('button', { name: 'Select shape-5' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Edit shape-1' }))
    await user.click(screen.getByRole('option', { name: 'Triangle' }))
    await user.click(screen.getByRole('button', { name: 'Save Shape' }))
    expect(screen.getByRole('button', { name: 'Select shape-1' })).toHaveClass('canvas-shape-triangle')

    await user.click(screen.getByRole('button', { name: 'Remove shape-2' }))
    expect(screen.queryByRole('button', { name: 'Select shape-2' })).not.toBeInTheDocument()
  })
})
