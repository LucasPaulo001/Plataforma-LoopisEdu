import "../Login_Register.css"
import logo from "../../../assets/images/LogoPNG.png"
import { BsEnvelope, BsLock } from "react-icons/bs"
import { Link } from "react-router-dom"


export const Login = () => {
  return (
    <>
      <div className="container">
         <img className="imgBlob" src={logo} alt="" />
        <div className="content-txt">
         
          <div className="content-text-animate">
            <p>Loop <span id="is">is</span></p>
            <div class="txt-animado">
              <span></span>
            </div>
          </div>
         <img className="imgBlob" src={logo} alt="" />
        </div>
         
        <div className="login_register" id="login">
          <form>
            <div className="localInput">
              <label htmlFor="email">E-mail:</label>
              <BsEnvelope />
              <input type="email" placeholder="E-mail" />
            </div>

            <div className="localInput">
              <label htmlFor="pass">Senha:</label>
              <BsLock />
              <input type="password" placeholder="Senha" />
            </div>

            <div className="btns">
              <button type="submit">Login</button>
            </div>
          </form>

          <span>Não tem uma conta? faça seu <Link to="/register">Cadastro</Link></span>
        </div>

        <div className="register">

        </div>
      </div>
    </>
  )

}