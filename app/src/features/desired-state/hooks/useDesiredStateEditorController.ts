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

  function onAddShape() {
    dispatch({ type: 'desired/add-shape' })
  }

  function onRemoveShape(shapeId: string) {
    dispatch({ type: 'desired/remove-shape', shapeId })
  }

  function onChangeShapeType(shapeId: string, nextType: ShapeType) {
    dispatch({ type: 'desired/set-shape-type', shapeId, nextType })
  }

  function onChangeShapeColor(shapeId: string, nextColor: string) {
    dispatch({ type: 'desired/set-shape-color', shapeId, nextColor })
  }

  return {
    shapes: desiredState,
    colorOptions,
    onAddShape,
    onRemoveShape,
    onChangeShapeType,
    onChangeShapeColor,
  }
}
