import { shapeSpecs } from '../design/designTokens'
import ShapeButtonShell from './ShapeButtonShell'

const shapePreviewColors = {
  circle: '#E8695C',
  triangle: '#52D39B',
  square: '#C77DFF',
  x: '#4FA7FF',
} as const

function ShapeGallery() {
  return (
    <div className="shape-grid">
      {shapeSpecs.map((shape) => (
        <article key={shape.id} className="shape-card">
          <ShapeButtonShell
            type={shape.id}
            color={shapePreviewColors[shape.id]}
            size={72}
            glyphStrokeWidth={2.5}
          />
        </article>
      ))}
    </div>
  )
}

export default ShapeGallery
