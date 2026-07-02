import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { CheckoutProvider } from './context/CheckoutContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/rzv/">
      <CartProvider>
        <CheckoutProvider>
          <App />
        </CheckoutProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
