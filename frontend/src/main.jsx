import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/authContext.jsx'
import { UpdateProvider } from './contexts/updateContext.jsx'
import { ProfileProvider } from './contexts/profileContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <UpdateProvider>
          <App />
        </UpdateProvider>
      </ProfileProvider>
    </AuthProvider>
  </StrictMode>
)
