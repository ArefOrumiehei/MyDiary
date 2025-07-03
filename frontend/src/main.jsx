import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

// Contexts
import { ThemeProviderContext } from './contexts/ThemeProviderContext.jsx'

// Styles
import './index.css'

// Components
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProviderContext>
        <App />
        <ToastContainer position="bottom-left" autoClose={3000} theme='colored' toastClassName={"toast"}/>
      </ThemeProviderContext>
    </BrowserRouter>
  </StrictMode>,
)
