import { palette } from '../design/designTokens'

function PaletteGrid() {
  return (
    <div className="palette-grid">
      {palette.map((swatch) => (
        <article key={swatch.name} className="swatch-card">
          <div className="swatch-color" style={{ backgroundColor: swatch.value }} />
          <p>{swatch.name}</p>
          <code>{swatch.value}</code>
        </article>
      ))}
    </div>
  )
}

export default PaletteGrid
