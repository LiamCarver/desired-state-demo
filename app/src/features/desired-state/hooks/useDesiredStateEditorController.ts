import { palette } from '../../../design/designTokens'
import type { ShapeType } from '../../../design/shapeTypes'
import { useAppDispatch, useAppState } from '../../../state/useAppStore'

const colorOptions = palette.map((swatch) => ({
  name: swatch.name,
  value: swatch.value,
}))

export function useDesiredStateEditorController() {
  const { desiredState } = useAppState()
  const dispatch = useAppDispatch()

  function onCreateShape(nextType: ShapeType, nextColor: string) {
    dispatch({ type: 'desired/add-shape', nextType, nextColor })
  }

  function onRemoveShape(shapeId: string) {
    dispatch({ type: 'desired/remove-shape', shapeId })
  }

  function onUpdateShape(shapeId: string, nextType: ShapeType, nextColor: string) {
    dispatch({ type: 'desired/set-shape-type', shapeId, nextType })
    dispatch({ type: 'desired/set-shape-color', shapeId, nextColor })
  }

  return {
    shapes: desiredState,
    colorOptions,
    onCreateShape,
    onRemoveShape,
    onUpdateShape,
  }
}
