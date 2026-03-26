import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/ui/Layout'
import { ToastProvider } from './context/ToastContext'
import { Home } from './pages/Home'
import { Reports } from './pages/Reports'
import { ReportDetail } from './pages/ReportDetail'
import { ReportDetailV2 } from './pages/ReportDetailV2'
import { OrderForm } from './pages/OrderForm'
import { Success } from './pages/Success'
import { PaymentFailed } from './pages/PaymentFailed';
import { Checkout } from './pages/Checkout';
import { NotFound } from './pages/NotFound'

import { PixelRouteTracker } from './components/PixelRouteTracker'
import { CouponCapture } from './components/CouponCapture'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PixelRouteTracker />
      <ToastProvider>
        <CouponCapture />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/numerology-v2" element={<ReportDetailV2 />} />
            <Route path="/reports/:slug" element={<ReportDetail />} />
            <Route path="/order/:slug" element={<OrderForm />} />
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
