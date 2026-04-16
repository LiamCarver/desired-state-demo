import { Navigate, Route, Routes } from 'react-router-dom'
import CanvasComponentRoute from './routes/CanvasComponentRoute'
import DesignRoute from './routes/DesignRoute'
import HomeRoute from './routes/HomeRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/design" element={<DesignRoute />} />
      <Route path="/design/components/canvas" element={<CanvasComponentRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
