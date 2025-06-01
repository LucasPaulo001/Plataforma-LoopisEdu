import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/authContext.jsx'
import { UpdateProvider } from './contexts/updateContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UpdateProvider>
        <App />
      </UpdateProvider>
    </AuthProvider>
  </StrictMode>,
)
