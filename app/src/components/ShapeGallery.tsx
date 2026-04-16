import { shapeSpecs } from '../design/designTokens'

function ShapeGallery() {
  return (
    <div className="shape-grid">
      {shapeSpecs.map((shape) => (
        <article key={shape.id} className="shape-card">
          <div className={shape.className} />
          <p>{shape.label}</p>
        </article>
      ))}
    </div>
  )
}

export default ShapeGallery
