import "../Login_Register.css"
import logo from "../../../assets/images/LogoPNG.png"
import { BsEnvelope, BsLock } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import {useState, useEffect} from "react"
import { useAuth } from "../../../contexts/authContext"


export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, loading, errors, usuario } = useAuth()
  const Navigate = useNavigate()

  //Funão de login (Envio de dados para o contexto)
  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
    if(usuario){
      Navigate("/loopisEdu")
    }
    setEmail("")
    setPassword("")
  }



  return (
    <>
      <div className="container">
         <img className="imgBlob" src={logo} alt="" />
        <div className="content-txt">
         
          <div className="content-text-animate">
            <p>Loop <span id="is">is</span></p>
            <div className="txt-animado">
              <span></span>
            </div>
          </div>
         <img className="imgBlob" src={logo} alt="" />
        </div>
         
        <div className="login_register" id="login">
          <form onSubmit={handleSubmit}>
            <div className="localInput">
              <label htmlFor="email">E-mail:</label>
              <BsEnvelope />
              <input 
              type="email" 
              placeholder="E-mail" 
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="localInput">
              <label htmlFor="pass">Senha:</label>
              <BsLock />
              <input 
              type="password" 
              placeholder="Senha" 
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="btns">
              <button type="submit">Login</button>
            </div>
          </form>

          <span>Não tem uma conta? faça seu <Link to="/register">Cadastro</Link></span>
        </div>
      </div>
    </>
  )

}