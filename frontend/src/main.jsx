import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Contexts
import { ThemeProviderContext } from './contexts/ThemeProviderContext.jsx'

// Styles
import './index.css'

// Components
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProviderContext>
      <App />
    </ThemeProviderContext>
  </StrictMode>,
)
