import './App.css'
import { OauthRedirect } from './components/oauth/OauthRedirect'
import { useAuth } from './contexts/authContext'
import { Home } from './pages/home/Home'
import { Navbar } from "./components/navbar/Navbar";

//Componentes
import { Login } from './pages/login_register/login/Login'
import { Register } from './pages/login_register/register/Register'
import { Capacitations } from './pages/capacitations/Capacitations';

//Bibliotecas
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

function App() {
  const { token } = useAuth()

  return (
    <>
      <BrowserRouter>
        {token ? <Navbar /> : ""}
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to={'/loopisEdu'} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/course' element={!token ? <Navigate to={'/login'} /> : <Capacitations />} />
          <Route path='/oauth-redirect' element={<OauthRedirect />} />
          <Route path='/loopisEdu' element={!token ? <Navigate to={'/login'} /> : <Home />} />
          {!token && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
