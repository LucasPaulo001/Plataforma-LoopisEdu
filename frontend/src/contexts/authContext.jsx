import { createContext, useState, useEffect, useContext } from "react"
import { Navigate } from "react-router-dom"

const AuthContext = createContext()

//Endpoints de login e cadastro do backend
const apiLogin = 'http://localhost:8080/api/users/login'
const apiRegister = 'http://localhost:8080/api/users/register'


//Provider de autênticação
export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState({})
    const [successMsg, setSuccessMsg] = useState("")
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(null)
    const [showResend, setShowResend] = useState(null)
    const [emailResend, setEmailResend] = useState(null)

    //Resgatando token do localStorage
    useEffect(() => {
        const usertoken = localStorage.getItem("token")
        if (usertoken) {
            setToken(usertoken)
            fetchUserFromToken(usertoken) //Resgatando no caso de login com google ou github
        }
    }, [])

    //Função de login
    const login = async (email, password) => {
        try {
            setErrors([])
            setLoading(true)

            const res = await fetch(apiLogin, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()
            console.log(data._id)

            if (!res.ok) {
                console.log(data)
                if (data.resend) {
                    setShowResend(true)
                    setEmailResend(email)
                }
                return setErrors(data.errors || [])
            }
            console.log(data.errors)


            setUsuario({ _id: data._id })
            setToken(data.token)
            localStorage.setItem("token", data.token)
            await fetchUserFromToken(data.token)


        }
        catch (error) {
            setErrors([{ msg: "Erro ao fazer cadastro!" }])
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    //Função de registro de usuários
    const register = async (nome, email, password, confirmPass) => {
        try {
            setErrors([])
            setLoading(true)
            const res = await fetch(apiRegister, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ nome, email, password, confirmPass })
            })

            const data = await res.json()

            if (!res.ok) {
                return setErrors(data.errors || [])
            }


            setSuccessMsg(`Cadastro feito com sucesso! enviamos um E-mail de validação!`)
            return true
        }
        catch (error) {
            setErrors([{ msg: "Erro ao fazer cadastro!" }])
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    
    //Funão para resgatar usuário
    const fetchUserFromToken = async (token) => {

        try {
            const apiGetUser = `http://localhost:8080/api/users/me`

            const res = await fetch(apiGetUser, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                }
            })

            const data = await res.json()

            if (res.ok) {
                setUsuario(data)
            }
        }
        catch (error) {
            setErrors([{ msg: "Erro ao buscar dados de usuário!" }])
        }
    }

    //Função de logout
    const logout = () => {
        setUsuario({})
        setToken(null)
        localStorage.removeItem("token")
    }


    return (
        <AuthContext.Provider
            value={{
                login,
                usuario,
                setErrors,
                token,
                loading,
                register,
                setSuccessMsg,
                successMsg,
                errors,
                logout,
                setShowResend,
                showResend,
                emailResend,
            }}>

            {children}

        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}