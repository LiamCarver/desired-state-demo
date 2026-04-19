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
  colorOptions: CanvasColorOption[]
  onSelectShape: (shapeId: string) => void
  onClearSelection: () => void
  onDeleteSelected: () => void
  onSelectColor: (colorValue: string) => void
}

function ActualStateCanvas({
  title,
  subtitle,
  shapes,
  selectedShapeId,
  colorChangingShapeId,
  colorOptions,
  onSelectShape,
  onClearSelection,
  onDeleteSelected,
  onSelectColor,
}: ActualStateCanvasProps) {
  const hasSelection = Boolean(selectedShapeId)

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
        {shapes.map((shape) => {
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
              className={`${shapeClass}${isSelected ? ' is-selected' : ''}${isColorChanging ? ' is-color-changing' : ''}`}
              style={{
                left: `${shape.x}%`,
                top: `${shape.y}%`,
              }}
              onClick={() => onSelectShape(shape.id)}
            >
              <ShapeButtonShell type={shape.type} color={shape.color} size={shape.size} />
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
