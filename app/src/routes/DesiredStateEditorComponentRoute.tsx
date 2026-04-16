import { useState } from 'react'
import { Link } from 'react-router-dom'
import DesiredStateEditor from '../components/DesiredStateEditor'
import { palette } from '../design/designTokens'

const initialDesiredShapes = [
  { id: 'shape-a1', type: 'circle' as const, color: '#1992D4' },
  { id: 'shape-b2', type: 'triangle' as const, color: '#1CBFAA' },
  { id: 'shape-c3', type: 'square' as const, color: '#E9A322' },
]

const sampleColors = palette.map((swatch) => ({
  name: swatch.name,
  value: swatch.value,
}))

function DesiredStateEditorComponentRoute() {
  const [shapes, setShapes] = useState(initialDesiredShapes)

  function handleAddShape() {
    setShapes((current) => [
      ...current,
      {
        id: `shape-${current.length + 1}`,
        type: 'circle',
        color: sampleColors[0].value,
      },
    ])
  }

  function handleRemoveShape(shapeId: string) {
    setShapes((current) => current.filter((shape) => shape.id !== shapeId))
  }

  function handleChangeShapeType(shapeId: string, nextType: 'circle' | 'triangle' | 'square') {
    setShapes((current) =>
      current.map((shape) => (shape.id === shapeId ? { ...shape, type: nextType } : shape)),
    )
  }

  function handleChangeShapeColor(shapeId: string, nextColor: string) {
    setShapes((current) =>
      current.map((shape) => (shape.id === shapeId ? { ...shape, color: nextColor } : shape)),
    )
  }

  return (
    <main className="design-page">
      <header className="hero-card">
        <p className="eyebrow">Component Preview</p>
        <h1>DesiredStateEditor</h1>
        <p className="hero-copy">
          Props-only preview. Parent route provides the shape list, palette options, and callbacks.
        </p>
      </header>

      <DesiredStateEditor
        title="Desired State"
        subtitle="Edit target shapes by type and color."
        shapes={shapes}
        colorOptions={sampleColors}
        onAddShape={handleAddShape}
        onRemoveShape={handleRemoveShape}
        onChangeShapeType={handleChangeShapeType}
        onChangeShapeColor={handleChangeShapeColor}
      />

      <div className="inline-actions">
        <Link className="btn btn-ghost" to="/design">
          Back to Design Sandbox
        </Link>
      </div>
    </main>
  )
}

export default DesiredStateEditorComponentRoute
