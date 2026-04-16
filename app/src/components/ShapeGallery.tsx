import { shapeSpecs } from '../design/designTokens'
import ShapeGlyph from './ShapeGlyph'

function ShapeGallery() {
  return (
    <div className="shape-grid">
      {shapeSpecs.map((shape) => (
        <article key={shape.id} className="shape-card">
          <ShapeGlyph type={shape.id} className="shape-glyph-preview" strokeWidth={2.6} />
          <p>{shape.label}</p>
        </article>
      ))}
    </div>
  )
}

export default ShapeGallery
