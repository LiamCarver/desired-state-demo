import { useEffect, useRef, useState } from 'react'
import type { ShapeType } from '../design/shapeTypes'
import ShapeButtonShell from './ShapeButtonShell'

export type CanvasShapeType = ShapeType

export type CanvasShape = {
  id: string
  type: CanvasShapeType
  color: string
  x: number
  y: number
  size: number
}

export type CanvasColorOption = {
  name: string
  value: string
}

type ActualStateCanvasProps = {
  title: string
  subtitle: string
  shapes: CanvasShape[]
  selectedShapeId?: string
  colorChangingShapeId?: string
  showShapeIds?: boolean
  useGridLayout?: boolean
  colorOptions: CanvasColorOption[]
  onSelectShape: (shapeId: string) => void
  onClearSelection: () => void
  onDeleteSelected: () => void
  onSelectColor: (colorValue: string) => void
}

const SHAPE_ENTER_ANIMATION_MS = 260
const SHAPE_EXIT_ANIMATION_MS = 260

type RenderPhase = 'steady' | 'entering' | 'exiting'

type RenderedShape = CanvasShape & {
  phase: RenderPhase
}

function getGridPosition(index: number, total: number) {
  if (total <= 0) {
    return { x: 50, y: 50 }
  }
  const cols = Math.ceil(Math.sqrt(total))
  const rows = Math.ceil(total / cols)
  const col = index % cols
  const row = Math.floor(index / cols)
  const horizontalPadding = 14
  const verticalPadding = 18
  const stepX = cols === 1 ? 0 : (100 - horizontalPadding * 2) / (cols - 1)
  const stepY = rows === 1 ? 0 : (100 - verticalPadding * 2) / (rows - 1)
  return {
    x: cols === 1 ? 50 : horizontalPadding + col * stepX,
    y: rows === 1 ? 50 : verticalPadding + row * stepY,
  }
}

function withPosition(shape: CanvasShape, index: number, total: number, useGridLayout: boolean): CanvasShape {
  if (!useGridLayout) {
    return shape
  }

  const position = getGridPosition(index, total)
  return {
    ...shape,
    x: position.x,
    y: position.y,
  }
}

function ActualStateCanvas({
  title,
  subtitle,
  shapes,
  selectedShapeId,
  colorChangingShapeId,
  showShapeIds = true,
  useGridLayout = true,
  colorOptions,
  onSelectShape,
  onClearSelection,
  onDeleteSelected,
  onSelectColor,
}: ActualStateCanvasProps) {
  const hasSelection = Boolean(selectedShapeId)
  const [renderedShapes, setRenderedShapes] = useState<RenderedShape[]>(() =>
    shapes.map((shape, index) => ({
      ...withPosition(shape, index, shapes.length, useGridLayout),
      phase: 'steady',
    })),
  )
  const hasMountedRef = useRef(false)

  useEffect(() => {
    const positionedIncoming = shapes.map((shape, index) => withPosition(shape, index, shapes.length, useGridLayout))
    const incomingById = new Map(positionedIncoming.map((shape) => [shape.id, shape]))

    setRenderedShapes((previousShapes) => {
      const nextById = new Map<string, RenderedShape>()

      previousShapes.forEach((shape) => {
        const incomingShape = incomingById.get(shape.id)
        if (!incomingShape) {
          nextById.set(shape.id, { ...shape, phase: 'exiting' })
          return
        }

        nextById.set(shape.id, {
          ...incomingShape,
          phase: shape.phase === 'exiting' ? 'steady' : shape.phase,
        })
      })

      positionedIncoming.forEach((shape) => {
        if (!nextById.has(shape.id)) {
          nextById.set(shape.id, {
            ...shape,
            phase: hasMountedRef.current ? 'entering' : 'steady',
          })
        }
      })

      const inOrder = positionedIncoming
        .map((shape) => nextById.get(shape.id))
        .filter((shape): shape is RenderedShape => Boolean(shape))
      const exiting = previousShapes
        .map((shape) => nextById.get(shape.id))
        .filter((shape): shape is RenderedShape => Boolean(shape) && shape.phase === 'exiting')

      return [...inOrder, ...exiting]
    })

    hasMountedRef.current = true
  }, [shapes, useGridLayout])

  useEffect(() => {
    const hasEnteringShapes = renderedShapes.some((shape) => shape.phase === 'entering')
    if (!hasEnteringShapes) {
      return
    }

    const timeout = window.setTimeout(() => {
      setRenderedShapes((previousShapes) =>
        previousShapes.map((shape) => (shape.phase === 'entering' ? { ...shape, phase: 'steady' } : shape)),
      )
    }, 16)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [renderedShapes])

  useEffect(() => {
    const exitingShapeIds = renderedShapes.filter((shape) => shape.phase === 'exiting').map((shape) => shape.id)
    if (exitingShapeIds.length === 0) {
      return
    }

    const timeout = window.setTimeout(() => {
      setRenderedShapes((previousShapes) =>
        previousShapes.filter((shape) => !(shape.phase === 'exiting' && exitingShapeIds.includes(shape.id))),
      )
    }, SHAPE_EXIT_ANIMATION_MS)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [renderedShapes])

  return (
    <section className="canvas-card" aria-label="Actual state canvas component">
      <header className="canvas-card-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>

      <div
        className="canvas-surface"
        role="list"
        aria-label="Shapes on canvas"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClearSelection()
          }
        }}
      >
        {renderedShapes.map((shape) => {
          const shapeClass = `canvas-shape canvas-shape-${shape.type}`
          const isSelected = shape.id === selectedShapeId
          const isColorChanging = shape.id === colorChangingShapeId
          return (
            <button
              key={shape.id}
              type="button"
              role="listitem"
              aria-label={`Select ${shape.id}`}
              aria-pressed={isSelected}
              className={`${shapeClass}${isSelected ? ' is-selected' : ''}${isColorChanging ? ' is-color-changing' : ''}${shape.phase === 'entering' ? ' is-entering' : ''}${shape.phase === 'exiting' ? ' is-exiting' : ''}`}
              style={{
                left: `${shape.x}%`,
                top: `${shape.y}%`,
              }}
              onClick={() => onSelectShape(shape.id)}
            >
              <ShapeButtonShell type={shape.type} color={shape.color} size={shape.size} />
              {showShapeIds ? <span className="canvas-shape-id">{shape.id}</span> : null}
            </button>
          )
        })}
      </div>

      <div className="canvas-toolbar">
        <div
          className={`canvas-color-list-wrapper${hasSelection ? ' is-visible' : ''}`}
          aria-hidden={!hasSelection}
        >
          <div className="canvas-color-list" aria-label="Shape color options">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                className="canvas-color-chip"
                aria-label={`Set shape color to ${color.name}`}
                onClick={() => onSelectColor(color.value)}
                style={{ ['--chip-color' as string]: color.value }}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="btn-shell-only"
          aria-label="Delete Selected"
          title="Delete Selected"
          onClick={onDeleteSelected}
          disabled={!hasSelection}
        >
          <span className="action-shell" style={{ color: '#FF6B6B' }}>
            <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5h6" />
              <path d="M4.5 7h15" />
              <path d="M8 7v11a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 16 18V7" />
              <path d="M10 10v6" />
              <path d="M14 10v6" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  )
}

export default ActualStateCanvas
