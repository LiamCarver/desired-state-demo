import { Link } from 'react-router-dom'
import ActualStateCanvas from '../components/ActualStateCanvas'
import { useCanvasController } from '../features/canvas/hooks/useCanvasController'

function CanvasComponentRoute() {
  const canvasController = useCanvasController()

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
        shapes={canvasController.shapes}
        selectedShapeId={canvasController.selectedShapeId}
        colorChangingShapeId={canvasController.colorChangingShapeId}
        colorOptions={canvasController.colorOptions}
        onSelectShape={canvasController.onSelectShape}
        onClearSelection={canvasController.onClearSelection}
        onDeleteSelected={canvasController.onDeleteSelected}
        onSelectColor={canvasController.onSelectColor}
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
