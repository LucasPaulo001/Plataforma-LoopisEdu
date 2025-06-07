import './App.css'
import { OauthRedirect } from './components/oauth/OauthRedirect'
import { useAuth } from './contexts/authContext'
import { Home } from './pages/home/Home'
import { Navbar } from "./components/navbar/Navbar";
import { Profile } from './pages/profile/Profile';

//Componentes
import { Login } from './pages/login_register/login/Login'
import { Register } from './pages/login_register/register/Register'
import { Capacitations } from './pages/capacitations/Capacitations';
import { Feedback } from './pages/feedback/Feedback';
import { ModalInfo } from './components/modalInfo/ModalInfo';
import { ContentClasses } from './components/contentClasses/ContentClasses';

//Bibliotecas
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { MyCapacitations } from './pages/myCapacitations/MyCapacitations';




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
          <Route path='/aula/:id' element={!token ? <Navigate to={'/login'} /> : <ContentClasses />} />
          <Route path='/feedback' element={!token ? <Navigate to={'/login'} /> : <Feedback /> } />
          <Route path='/MyCapacitations' element={!token ? <Navigate to={'/login'} /> : <MyCapacitations />} />
          <Route path='/profile' element={!token ? <Navigate to={'/login'} /> : <Profile />} />
          <Route path='/admin/user/:id' element={<ModalInfo />} />
          <Route path='/loopisEdu' element={!token ? <Navigate to={'/login'} /> : <Home />} />
          {!token && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
