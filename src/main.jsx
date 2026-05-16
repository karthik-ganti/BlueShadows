import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <ScrollToTop />
      <WhatsAppFloat />
    </HelmetProvider>
  </StrictMode>,
)
