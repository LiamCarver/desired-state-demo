import { Link } from 'react-router-dom'
import CanvasStateManagementHarness from '../components/CanvasStateManagementHarness'

function CanvasStateManagementHarnessRoute() {
  return (
    <main className="design-page">
      <header className="hero-card">
        <p className="eyebrow">Integration Preview</p>
        <h1>Canvas State Management Harness</h1>
        <p className="hero-copy">
          Desired and actual components are isolated and connected only through shared store actions
          and state.
        </p>
      </header>

      <CanvasStateManagementHarness />

      <div className="inline-actions">
        <Link className="btn btn-ghost" to="/design">
          Back to Design Sandbox
        </Link>
      </div>
    </main>
  )
}

export default CanvasStateManagementHarnessRoute
