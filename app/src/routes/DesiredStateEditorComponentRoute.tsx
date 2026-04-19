import { Link } from 'react-router-dom'
import DesiredStateEditor from '../components/DesiredStateEditor'
import { useDesiredStateEditorController } from '../features/desired-state/hooks/useDesiredStateEditorController'

function DesiredStateEditorComponentRoute() {
  const editorController = useDesiredStateEditorController()

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
        shapes={editorController.shapes}
        colorOptions={editorController.colorOptions}
        onCreateShape={editorController.onCreateShape}
        onRemoveShape={editorController.onRemoveShape}
        onUpdateShape={editorController.onUpdateShape}
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
