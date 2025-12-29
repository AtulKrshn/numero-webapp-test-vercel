import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/ui/Layout'
import { ToastProvider } from './context/ToastContext'
import { Home } from './pages/Home'
import { Success } from './pages/Success'

function App() {
  return (
    <Router>
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<Success />} />
          </Routes>

          <div className="mt-8 text-gray-600 text-center text-sm">
            <p>Environment: {import.meta.env.MODE}</p>
          </div>
        </Layout>
      </ToastProvider>
    </Router>
  )
}

export default App
