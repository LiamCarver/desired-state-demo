import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routing', () => {
  it('renders the home route', () => {
    renderRoute('/')

    expect(screen.getByRole('heading', { name: 'Desired State Demo' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Open /design' })).toBeInTheDocument()
  })

  it('renders the design route sections', () => {
    renderRoute('/design')

    expect(screen.getByRole('heading', { name: 'Desired State Visual Language' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Background' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Shapes' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Buttons' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Color Palette' })).toBeInTheDocument()
  })

  it('redirects unknown routes to home', () => {
    renderRoute('/unknown')

    expect(screen.getByRole('heading', { name: 'Desired State Demo' })).toBeInTheDocument()
  })
})
