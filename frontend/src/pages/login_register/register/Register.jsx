import "../Login_Register.css"
import logo from "../../../assets/images/LogoPNG.png"
import { BsEnvelope, BsLock, BsPerson } from "react-icons/bs"
import { Link } from "react-router-dom"

export const Register = () => {
    return(
        <>
            <div className="container">
                <div className="content-image"> 
                    <img src={logo} alt="" />
                </div>
                <div className="login_register" id="login">
                    <form>
                        <div className="localInput">
                            <label htmlFor="username">E-mail:</label>
                            <BsPerson />
                            <input type="text" placeholder="Nome de usuário"/>
                        </div>

                        <div className="localInput">
                            <label htmlFor="email">E-mail:</label>
                            <BsEnvelope />
                            <input type="email" placeholder="E-mail"/>
                        </div>

                        <div className="localInput">
                            <label htmlFor="pass">Senha:</label>
                            <BsLock />
                            <input type="password" placeholder="Senha"/>
                        </div>

                        <div className="localInput">
                            <label htmlFor="pass">Repita a Senha:</label>
                            <BsLock />
                            <input type="password" placeholder="Repita a senha..."/>
                        </div>

                        <div className="btns">
                        <button type="submit">Fazer cadastro</button>
                        </div>
                    </form>

                    <span>Já tem uma conta? <Link to="/login">Fazer Login</Link></span>
                </div>
            </div>
        </>
    )
}