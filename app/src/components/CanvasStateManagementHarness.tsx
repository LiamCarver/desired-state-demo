import { useEffect } from 'react'
import ActualStateCanvas from './ActualStateCanvas'
import DesiredStateEditor from './DesiredStateEditor'
import { useCanvasController } from '../features/canvas/hooks/useCanvasController'
import { useDesiredStateEditorController } from '../features/desired-state/hooks/useDesiredStateEditorController'
import { useAppDispatch } from '../state/useAppStore'

const RECONCILE_INTERVAL_MS = 2000

type CanvasStateManagementHarnessProps = {
  showShapeIds?: boolean
  useGridLayout?: boolean
}

function CanvasStateManagementHarness({
  showShapeIds = true,
  useGridLayout = true,
}: CanvasStateManagementHarnessProps) {
  const dispatch = useAppDispatch()
  const desiredEditorController = useDesiredStateEditorController()
  const canvasController = useCanvasController()

  useEffect(() => {
    const timerId = window.setInterval(() => {
      dispatch({ type: 'actual/reconcile-step' })
    }, RECONCILE_INTERVAL_MS)

    return () => {
      window.clearInterval(timerId)
    }
  }, [dispatch])

  return (
    <section className="canvas-harness-grid" aria-label="Canvas state management harness">
      <DesiredStateEditor
        title="Desired State"
        subtitle="Create, update, and remove shapes via store actions."
        shapes={desiredEditorController.shapes}
        colorOptions={desiredEditorController.colorOptions}
        onCreateShape={desiredEditorController.onCreateShape}
        onRemoveShape={desiredEditorController.onRemoveShape}
        onUpdateShape={desiredEditorController.onUpdateShape}
      />
      <ActualStateCanvas
        title="Actual State Canvas"
        subtitle="Reconciler applies desired deltas on a 2-second timer."
        shapes={canvasController.shapes}
        selectedShapeId={canvasController.selectedShapeId}
        colorChangingShapeId={canvasController.colorChangingShapeId}
        showShapeIds={showShapeIds}
        useGridLayout={useGridLayout}
        colorOptions={canvasController.colorOptions}
        onSelectShape={canvasController.onSelectShape}
        onClearSelection={canvasController.onClearSelection}
        onDeleteSelected={canvasController.onDeleteSelected}
        onSelectColor={canvasController.onSelectColor}
      />
    </section>
  )
}

export default CanvasStateManagementHarness
