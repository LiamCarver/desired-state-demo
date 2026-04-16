import { Link } from 'react-router-dom'
import ActualStateCanvas, { type CanvasColorOption, type CanvasShape } from '../components/ActualStateCanvas'
import { palette } from '../design/designTokens'

const sampleShapes: CanvasShape[] = [
  { id: 'shape-1', type: 'circle', color: '#FF6B6B', x: 18, y: 30, size: 64 },
  { id: 'shape-2', type: 'triangle', color: '#52D39B', x: 42, y: 58, size: 66 },
  { id: 'shape-3', type: 'square', color: '#C77DFF', x: 66, y: 34, size: 62 },
  { id: 'shape-4', type: 'x', color: '#4FA7FF', x: 84, y: 56, size: 62 },
]

const sampleColors: CanvasColorOption[] = palette.map((swatch) => ({
  name: swatch.name,
  value: swatch.value,
}))

function noop() {}

function CanvasComponentRoute() {
  return (
    <main className="design-page">
      <header className="hero-card">
        <p className="eyebrow">Component Preview</p>
        <h1>ActualStateCanvas</h1>
        <p className="hero-copy">
          Props-only preview. Parent route provides sample shapes, selected id, and callback props.
        </p>
      </header>

      <ActualStateCanvas
        title="Actual State Canvas"
        subtitle="Select a shape, pick a color, or delete."
        shapes={sampleShapes}
        selectedShapeId="shape-4"
        colorOptions={sampleColors}
        onSelectShape={noop}
        onDeleteSelected={noop}
        onSelectColor={noop}
      />

      <div className="inline-actions">
        <Link className="btn btn-ghost" to="/design">
          Back to Design Sandbox
        </Link>
      </div>
    </main>
  )
}

export default CanvasComponentRoute
