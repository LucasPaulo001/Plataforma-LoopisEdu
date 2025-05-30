import './App.css'

//Componentes
import { Login } from './pages/login_register/login/Login'
import { Register } from './pages/login_register/register/Register'

//Bibliotecas
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {} from ""
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
