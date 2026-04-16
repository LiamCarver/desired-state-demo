import BackgroundPreview from '../components/BackgroundPreview'
import ButtonShowcase from '../components/ButtonShowcase'
import PaletteGrid from '../components/PaletteGrid'
import ShapeGallery from '../components/ShapeGallery'

function DesignRoute() {
  return (
    <main className="design-page">
      <header className="hero-card">
        <p className="eyebrow">Design Sandbox</p>
        <h1>Desired State Visual Language</h1>
        <p className="hero-copy">
          Isolated component previews for the grid background, shape tokens,
          controls, and palette before building the final interaction flow.
        </p>
      </header>

      <section className="card">
        <h2>Background</h2>
        <p>Layered grid + radial glow inspired by process-mapping canvases.</p>
        <BackgroundPreview />
      </section>

      <section className="card">
        <h2>Shapes</h2>
        <ShapeGallery />
      </section>

      <section className="card">
        <h2>Buttons</h2>
        <ButtonShowcase />
      </section>

      <section className="card">
        <h2>Color Palette</h2>
        <PaletteGrid />
      </section>
    </main>
  )
}

export default DesignRoute
