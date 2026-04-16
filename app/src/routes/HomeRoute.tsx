import { Link } from 'react-router-dom'

function HomeRoute() {
  return (
    <main className="home-shell">
      <h1>Desired State Demo</h1>
      <p>Open the design sandbox to shape the visual language first.</p>
      <Link className="btn btn-primary" to="/design">
        Open /design
      </Link>
    </main>
  )
}

export default HomeRoute
