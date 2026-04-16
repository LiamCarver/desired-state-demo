type ShapeSpec = {
  id: string
  label: string
  className: string
}

const shapeSpecs: ShapeSpec[] = [
  { id: 'circle', label: 'Circle', className: 'shape shape-circle' },
  { id: 'triangle', label: 'Triangle', className: 'shape shape-triangle' },
  { id: 'square', label: 'Square', className: 'shape shape-square' },
]

const palette = [
  { name: 'Ocean', value: '#1992D4' },
  { name: 'Mint', value: '#1CBFAA' },
  { name: 'Amber', value: '#E9A322' },
  { name: 'Coral', value: '#E8695C' },
  { name: 'Slate', value: '#2A3440' },
]

function HomeRoute() {
  return (
    <main className="home-shell">
      <h1>Desired State Demo</h1>
      <p>Open the design sandbox to shape the visual language first.</p>
      <a className="btn btn-primary" href="/design">
        Open /design
      </a>
    </main>
  )
}

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
        <div className="background-preview" aria-hidden="true" />
      </section>

      <section className="card">
        <h2>Shapes</h2>
        <div className="shape-grid">
          {shapeSpecs.map((shape) => (
            <article key={shape.id} className="shape-card">
              <div className={shape.className} />
              <p>{shape.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Buttons</h2>
        <div className="button-row">
          <button type="button" className="btn btn-primary">
            Reconcile
          </button>
          <button type="button" className="btn btn-secondary">
            Pause
          </button>
          <button type="button" className="btn btn-ghost">
            Step
          </button>
          <button type="button" className="btn btn-danger">
            Delete Shape
          </button>
        </div>
      </section>

      <section className="card">
        <h2>Color Palette</h2>
        <div className="palette-grid">
          {palette.map((swatch) => (
            <article key={swatch.name} className="swatch-card">
              <div
                className="swatch-color"
                style={{ backgroundColor: swatch.value }}
              />
              <p>{swatch.name}</p>
              <code>{swatch.value}</code>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  return path === '/design' ? <DesignRoute /> : <HomeRoute />
}

export default App
