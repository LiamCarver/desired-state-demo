type DesiredShapeType = 'circle' | 'triangle' | 'square'

type DesiredShape = {
  id: string
  type: DesiredShapeType
  color: string
}

type ColorOption = {
  name: string
  value: string
}

type DesiredStateEditorProps = {
  title: string
  subtitle: string
  shapes: DesiredShape[]
  colorOptions: ColorOption[]
  onAddShape: () => void
  onRemoveShape: (shapeId: string) => void
  onChangeShapeType: (shapeId: string, nextType: DesiredShapeType) => void
  onChangeShapeColor: (shapeId: string, nextColor: string) => void
}

const shapeOptions: Array<{ value: DesiredShapeType; label: string }> = [
  { value: 'circle', label: 'Circle' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'square', label: 'Square' },
]

function DesiredStateEditor({
  title,
  subtitle,
  shapes,
  colorOptions,
  onAddShape,
  onRemoveShape,
  onChangeShapeType,
  onChangeShapeColor,
}: DesiredStateEditorProps) {
  return (
    <section className="editor-card" aria-label="Desired state editor component">
      <header className="editor-card-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>

      <button type="button" className="btn btn-primary" onClick={onAddShape}>
        Add Shape
      </button>

      <div className="editor-list">
        {shapes.map((shape) => (
          <article key={shape.id} className="editor-row">
            <div className="editor-row-head">
              <p className="editor-id">{shape.id}</p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => onRemoveShape(shape.id)}
              >
                Remove
              </button>
            </div>

            <div className="editor-controls">
              <label className="field">
                <span>Type</span>
                <details className="shape-dropdown">
                  <summary>
                    <span
                      className={`dropdown-shape-chip dropdown-shape-${shape.type}`}
                      aria-hidden="true"
                    />
                    <span>
                      {shapeOptions.find((option) => option.value === shape.type)?.label ??
                        shape.type}
                    </span>
                  </summary>
                  <div className="shape-dropdown-menu" role="listbox" aria-label="Shape options">
                    {shapeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className="shape-dropdown-option"
                        role="option"
                        aria-selected={option.value === shape.type}
                        onClick={(event) => {
                          onChangeShapeType(shape.id, option.value)
                          const details = event.currentTarget.closest('details')
                          details?.removeAttribute('open')
                        }}
                      >
                        <span
                          className={`dropdown-shape-chip dropdown-shape-${option.value}`}
                          aria-hidden="true"
                        />
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </details>
              </label>

              <label className="field">
                <span>Color</span>
                <details className="color-dropdown">
                  <summary>
                    <span
                      className="dropdown-color-chip"
                      style={{ backgroundColor: shape.color }}
                      aria-hidden="true"
                    />
                    <span>
                      {colorOptions.find((color) => color.value === shape.color)?.name ??
                        shape.color}
                    </span>
                  </summary>
                  <div className="color-dropdown-menu" role="listbox" aria-label="Color options">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        className="color-dropdown-option"
                        role="option"
                        aria-selected={color.value === shape.color}
                        onClick={(event) => {
                          onChangeShapeColor(shape.id, color.value)
                          const details = event.currentTarget.closest('details')
                          details?.removeAttribute('open')
                        }}
                      >
                        <span
                          className="dropdown-color-chip"
                          style={{ backgroundColor: color.value }}
                          aria-hidden="true"
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </details>
              </label>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DesiredStateEditor
