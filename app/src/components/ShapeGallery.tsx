import { paletteValues, shapeSpecs } from '../design/designTokens'
import ShapeButtonShell from './ShapeButtonShell'

const shapePreviewColors = {
  circle: paletteValues.coral,
  triangle: paletteValues.mint,
  square: paletteValues.purple,
  x: paletteValues.ocean,
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
