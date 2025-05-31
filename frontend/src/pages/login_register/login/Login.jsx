import "../Login_Register.css"
import logo from "../../../assets/images/LogoPNG.png"
import { BsEnvelope, BsLock } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../../../contexts/authContext"
import { OauthLogin } from "../../../components/OauthLogin"

const apiResend = 'http://localhost:8080/api/users/resend-validation'


export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, setShowResend, loading, setErrors, successMsg, showResend, emailResend, errors, usuario } = useAuth()
  const Navigate = useNavigate()

  //Funão de login (Envio de dados para o contexto)
  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
    setEmail("")
    setPassword("")
  }


  useEffect(() => {
    if (usuario && usuario.token) {
      Navigate("/loopisEdu")
    }
  }, [usuario])

  useEffect(() => {
    setErrors([])
    setShowResend(null)
  }, [])



  //Função de reenvio de email de validação
  const handleResendVerification = async () => {
    try {
      const res = await fetch(apiResend, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ email: emailResend })
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors([{ errors: data.errors }])
        return
      }

      alert("Email de validação enviado com sucesso!")

    }
    catch (error) {
      console.log(error)
    }
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
                value={email}
                type="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="localInput">
              <label htmlFor="pass">Senha:</label>
              <BsLock />
              <input
                value={password}
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="btns">
              <button type="submit">{loading ? "Carregando" : "Login"}</button>
            </div>
          </form>


          <div className="info">
            {successMsg && <span className="successMsg">{successMsg}</span>}
            {errors.length > 0 && (
              <div className="errorMsg">
                {errors.map((err, index) => (
                  <p key={index}>- {err.msg || errors}</p>
                ))}
              </div>
            )}
            {showResend && <button onClick={handleResendVerification}>Reenviar E-mail de validação?</button>}
          </div>

          <OauthLogin />
          
          <span>Não tem uma conta? faça seu <Link to="/register">Cadastro</Link></span>
        </div>
      </div>
    </>
  )

}