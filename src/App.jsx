import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/ui/Layout'
import { ToastProvider } from './context/ToastContext'
import { Home } from './pages/Home'
import { Success } from './pages/Success'
import { PaymentFailed } from './pages/PaymentFailed';
import { Checkout } from './pages/Checkout';
import { NotFound } from './pages/NotFound'

import { PixelRouteTracker } from './components/PixelRouteTracker'
import { CouponCapture } from './components/CouponCapture'

function App() {
  return (
    <Router>
      <PixelRouteTracker />
      <ToastProvider>
        <CouponCapture />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<Success />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <div className="mt-8 text-gray-600 text-center text-sm">
            {import.meta.env.DEV && <p>Environment: {import.meta.env.MODE}</p>}
          </div>
        </Layout>
      </ToastProvider>
    </Router>
  )
}

export default App
