import { useEffect, useRef, useState } from 'react'
import { palette } from '../../../design/designTokens'
import { useAppDispatch, useAppState } from '../../../state/useAppStore'
import type { CanvasColorOption } from '../../../components/ActualStateCanvas'

const colorOptions: CanvasColorOption[] = palette.map((swatch) => ({
  name: swatch.name,
  value: swatch.value,
}))

export function useCanvasController() {
  const { actualState, selectedActualShapeId } = useAppState()
  const dispatch = useAppDispatch()
  const [colorChangingShapeId, setColorChangingShapeId] = useState<string | undefined>(undefined)
  const clearAnimationTimeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (clearAnimationTimeoutRef.current) {
        window.clearTimeout(clearAnimationTimeoutRef.current)
      }
    }
  }, [])

  function onSelectShape(shapeId: string) {
    dispatch({ type: 'actual/select-shape', shapeId })
  }

  function onClearSelection() {
    dispatch({ type: 'actual/select-shape', shapeId: undefined })
  }

  function onDeleteSelected() {
    dispatch({ type: 'actual/delete-selected' })
  }

  function onSelectColor(colorValue: string) {
    if (!selectedActualShapeId) {
      return
    }

    dispatch({ type: 'actual/set-selected-color', color: colorValue })
    setColorChangingShapeId(selectedActualShapeId)

    if (clearAnimationTimeoutRef.current) {
      window.clearTimeout(clearAnimationTimeoutRef.current)
    }

    clearAnimationTimeoutRef.current = window.setTimeout(() => {
      setColorChangingShapeId(undefined)
    }, 560)
  }

  return {
    shapes: actualState,
    selectedShapeId: selectedActualShapeId,
    colorChangingShapeId,
    colorOptions,
    onSelectShape,
    onClearSelection,
    onDeleteSelected,
    onSelectColor,
  }
}
