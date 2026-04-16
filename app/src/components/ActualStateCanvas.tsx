export type CanvasShapeType = 'circle' | 'triangle' | 'square'

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
  colorOptions: CanvasColorOption[]
  onSelectShape: (shapeId: string) => void
  onDeleteSelected: () => void
  onSelectColor: (colorValue: string) => void
}

function ActualStateCanvas({
  title,
  subtitle,
  shapes,
  selectedShapeId,
  colorOptions,
  onSelectShape,
  onDeleteSelected,
  onSelectColor,
}: ActualStateCanvasProps) {
  return (
    <section className="canvas-card" aria-label="Actual state canvas component">
      <header className="canvas-card-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>

      <div className="canvas-surface" role="list" aria-label="Shapes on canvas">
        {shapes.map((shape) => {
          const shapeClass = `canvas-shape canvas-shape-${shape.type}`
          const isSelected = shape.id === selectedShapeId
          return (
            <button
              key={shape.id}
              type="button"
              role="listitem"
              aria-label={`Select ${shape.id}`}
              aria-pressed={isSelected}
              className={`${shapeClass}${isSelected ? ' is-selected' : ''}`}
              style={{
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                width: `${shape.size}px`,
                height: `${shape.size}px`,
                backgroundColor: shape.color,
              }}
              onClick={() => onSelectShape(shape.id)}
            />
          )
        })}
      </div>

      <div className="canvas-toolbar">
        <div className="canvas-color-list" aria-label="Shape color options">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              className="canvas-color-chip"
              aria-label={`Set shape color to ${color.name}`}
              onClick={() => onSelectColor(color.value)}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
        <button type="button" className="btn btn-danger" onClick={onDeleteSelected}>
          Delete Selected
        </button>
      </div>
    </section>
  )
}

export default ActualStateCanvas
