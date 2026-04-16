import { Navigate, Route, Routes } from 'react-router-dom'
import DesignRoute from './routes/DesignRoute'
import HomeRoute from './routes/HomeRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/design" element={<DesignRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
