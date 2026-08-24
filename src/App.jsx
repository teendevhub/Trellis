import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import ToolRoute from './components/ToolRoute'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tools/:toolId" element={<ToolRoute />} />
      </Route>
    </Routes>
  )
}
