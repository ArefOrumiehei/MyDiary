/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

// Contexts
import { ThemeProviderContext } from './contexts/ThemeProviderContext.jsx'
import LoadingProviderContext, { useLoading } from './contexts/LoadingProviderContext.jsx';

// Styles
import './index.css'

// Components
import App from './App.jsx'

// API
import { attachInterceptors } from './api/configuration.js';

function InterceptorInit() {
  const loading = useLoading();
  attachInterceptors(loading);
  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProviderContext>
        <LoadingProviderContext>
          <InterceptorInit />
          <App />
          <ToastContainer position="bottom-left" autoClose={3000} theme='colored' toastClassName={"toast"}/>
        </LoadingProviderContext>
      </ThemeProviderContext>
    </BrowserRouter>
  </StrictMode>,
)
