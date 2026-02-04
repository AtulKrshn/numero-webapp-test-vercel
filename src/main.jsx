import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
if (PIXEL_ID && window.fbq) {
  window.fbq('init', PIXEL_ID);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
