import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { ShapeType } from '../design/shapeTypes'
import ShapeButtonShell from './ShapeButtonShell'

export type DesiredShapeType = ShapeType

export type DesiredShape = {
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
  onCreateShape: (nextType: DesiredShapeType, nextColor: string) => void
  onRemoveShape: (shapeId: string) => void
  onUpdateShape: (shapeId: string, nextType: DesiredShapeType, nextColor: string) => void
}

const shapeOptions: Array<{ value: DesiredShapeType; label: string }> = [
  { value: 'circle', label: 'Circle' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'square', label: 'Square' },
  { value: 'x', label: 'X' },
]

function DesiredStateEditor({
  title,
  subtitle,
  shapes,
  colorOptions,
  onCreateShape,
  onRemoveShape,
  onUpdateShape,
}: DesiredStateEditorProps) {
  const [editingShapeId, setEditingShapeId] = useState<string | undefined>(undefined)
  const [draftType, setDraftType] = useState<DesiredShapeType>('circle')
  const [draftColor, setDraftColor] = useState<string>(colorOptions[0]?.value ?? '#1992D4')
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const priorFocusRef = useRef<HTMLElement | null>(null)

  const editingShape = shapes.find((shape) => shape.id === editingShapeId)
  const isModalOpen = editingShapeId !== undefined
  const isCreateMode = editingShapeId === 'new'

  function openCreateModal() {
    setEditingShapeId('new')
    setDraftType('circle')
    setDraftColor(colorOptions[0]?.value ?? '#1992D4')
  }

  function openEditModal(shape: DesiredShape) {
    setEditingShapeId(shape.id)
    setDraftType(shape.type)
    setDraftColor(shape.color)
  }

  function closeModal() {
    setEditingShapeId(undefined)
  }

  function handleSave() {
    if (isCreateMode) {
      onCreateShape(draftType, draftColor)
      closeModal()
      return
    }
    if (!editingShape) {
      closeModal()
      return
    }
    onUpdateShape(editingShape.id, draftType, draftColor)
    closeModal()
  }

  function trapTabKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab' || !dialogRef.current) {
      return
    }
    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute('disabled'))
    if (focusable.length === 0) {
      return
    }
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
      return
    }
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  useEffect(() => {
    if (!isModalOpen) {
      if (priorFocusRef.current) {
        priorFocusRef.current.focus()
        priorFocusRef.current = null
      }
      return
    }
    priorFocusRef.current = document.activeElement as HTMLElement | null
    const firstSelector = dialogRef.current?.querySelector<HTMLElement>('[data-modal-initial-focus]')
    firstSelector?.focus()
  }, [isModalOpen])

  return (
    <section className="editor-card" aria-label="Desired state editor component">
      <header className="editor-card-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>

      <button
        type="button"
        className="btn-shell-only"
        onClick={openCreateModal}
        aria-label="Add Shape"
        title="Add Shape"
      >
        <span className="action-shell" style={{ color: '#4FA7FF' }}>
          <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </span>
      </button>

      <div className="editor-list">
        {shapes.map((shape) => (
          <article key={shape.id} className="editor-row">
            <div className="editor-row-head">
              <p className="editor-id">{shape.id}</p>
            </div>

            <div className="editor-summary">
              <span className="editor-summary-item">
                <ShapeButtonShell type={shape.type} color={shape.color} size={30} />
                {shapeOptions.find((option) => option.value === shape.type)?.label ?? shape.type}
              </span>
            </div>

            <div className="editor-row-actions">
              <button
                type="button"
                className="btn-shell-only"
                onClick={() => openEditModal(shape)}
                aria-label={`Edit ${shape.id}`}
                title={`Edit ${shape.id}`}
              >
                <span className="action-shell" style={{ color: '#4FA7FF' }}>
                  <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 20h4l10-10-4-4L4 16v4z" />
                    <path d="M13 7l4 4" />
                  </svg>
                </span>
              </button>
              <button
                type="button"
                className="btn-shell-only"
                onClick={() => onRemoveShape(shape.id)}
                aria-label={`Remove ${shape.id}`}
                title={`Remove ${shape.id}`}
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
          </article>
        ))}
      </div>

      {isModalOpen ? (
        <div
          className="editor-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal()
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={isCreateMode ? 'Create shape details' : 'Edit shape details'}
            className="editor-modal"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                closeModal()
                return
              }
              trapTabKey(event)
            }}
          >
            <header className="editor-modal-header">
              <h3>{isCreateMode ? 'Add Shape' : `Edit ${editingShape?.id ?? 'Shape'}`}</h3>
              <p>Set type and color before saving.</p>
            </header>

            <div className="editor-modal-body">
              <section className="editor-modal-section" aria-label="Shape selector">
                <h4>Shape</h4>
                <div className="editor-shape-selector" role="listbox" aria-label="Shape options">
                  {shapeOptions.map((option, index) => {
                    const isSelected = draftType === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={`editor-shape-option${isSelected ? ' is-selected' : ''}`}
                        onClick={() => setDraftType(option.value)}
                        data-modal-initial-focus={index === 0 ? 'true' : undefined}
                      >
                        <ShapeButtonShell type={option.value} color={draftColor} size={34} />
                        <span>{option.label}</span>
                      </button>
                    )
                  })}
                </div>
              </section>

              <section className="editor-modal-section" aria-label="Color selector">
                <h4>Color</h4>
                <div className="editor-modal-color-list" aria-label="Color options">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`canvas-color-chip${draftColor === color.value ? ' is-selected' : ''}`}
                      aria-label={`Set shape color to ${color.name}`}
                      aria-pressed={draftColor === color.value}
                      onClick={() => setDraftColor(color.value)}
                      style={{ ['--chip-color' as string]: color.value }}
                    />
                  ))}
                </div>
              </section>
            </div>

            <footer className="editor-modal-actions">
              <button
                type="button"
                className="btn-shell-only"
                onClick={closeModal}
                aria-label="Cancel"
                title="Cancel"
              >
                <span className="action-shell" style={{ color: '#A6B7C6' }}>
                  <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </svg>
                </span>
              </button>
              <button
                type="button"
                className="btn-shell-only"
                onClick={handleSave}
                aria-label={isCreateMode ? 'Create Shape' : 'Save Shape'}
                title={isCreateMode ? 'Create Shape' : 'Save Shape'}
              >
                <span className="action-shell" style={{ color: '#52D39B' }}>
                  <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default DesiredStateEditor
