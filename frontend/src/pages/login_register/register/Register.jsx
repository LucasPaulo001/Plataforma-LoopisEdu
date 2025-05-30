import "../Login_Register.css"
import logo from "../../../assets/images/LogoPNG.png"
import { BsEnvelope, BsLock, BsPerson } from "react-icons/bs"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../../../contexts/authContext"

export const Register = () => {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const navigate = useNavigate()

    const { register, errors, setErrors, loading, usuario } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const registerResp = await register(nome, email, password, confirmPass);
        if (registerResp){
            if (errors.length == 0) {
                navigate("/login")
            }
        }
        

    }
    useEffect(() => {
        setErrors([])
    }, [])


    return (
        <>
            <div className="container">
                <div className="content-image">
                    <img src={logo} alt="" />
                </div>
                <div className="login_register" id="login">
                    <form onSubmit={handleSubmit}>
                        <div className="localInput">
                            <label htmlFor="username">Nome:</label>
                            <BsPerson />
                            <input
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                type="text"
                                placeholder="Nome de usuário" />
                        </div>

                        <div className="localInput">
                            <label htmlFor="email">E-mail:</label>
                            <BsEnvelope />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="E-mail" />
                        </div>

                        <div className="localInput">
                            <label htmlFor="pass">Senha:</label>
                            <BsLock />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Senha" />
                        </div>

                        <div className="localInput">
                            <label htmlFor="pass">Repita a Senha:</label>
                            <BsLock />
                            <input
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                type="password"
                                placeholder="Repita a senha..." />
                        </div>

                        <div className="btns">
                            <button type="submit">Fazer cadastro</button>
                        </div>
                        {errors.length > 0 && (
                            <div className="errorMsg">
                                {errors.map((err, idx) => (
                                    <p key={idx}>- {err.msg || errors}</p>

                                ))}
                            </div>
                        )}

                    </form>

                    <span>Já tem uma conta? <Link to="/login">Fazer Login</Link></span>
                </div>
            </div>
        </>
    )
}