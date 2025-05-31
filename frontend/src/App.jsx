import './App.css'
import { OauthRedirect } from './components/OauthRedirect'
import { useAuth } from './contexts/authContext'
import { Home } from './pages/home/Home'

//Componentes
import { Login } from './pages/login_register/login/Login'
import { Register } from './pages/login_register/register/Register'

//Bibliotecas
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
function App() {
  const { token } = useAuth()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to={'/loopisEdu'} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/oauth-redirect' element={<OauthRedirect />} />
          <Route path='/loopisEdu' element={!token ? <Navigate to={'/login'} /> : <Home />} />
          {!token && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
