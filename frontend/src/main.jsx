import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/authContext.jsx'
import { UpdateProvider } from './contexts/updateContext.jsx'
import { ProfileProvider } from './contexts/profileContext.jsx'
import { ClasseProvider } from './contexts/classesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <ClasseProvider>
          <UpdateProvider>
            <App />
          </UpdateProvider>
        </ClasseProvider>
      </ProfileProvider>
    </AuthProvider>
  </StrictMode>
)
