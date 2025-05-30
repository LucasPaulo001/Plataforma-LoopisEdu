import { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

//Endpoints de login e cadastro do backend
const apiLogin = 'http://localhost:8080/api/users/login'
const apiRegister = 'http://localhost:8080/api/users/register'


//Provider de autênticação
export const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState({})
    const [successMsg, setSuccessMsg] = useState("")
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(null)

    //Resgatando token do localStorage
    useEffect(() => {
        const usertoken = localStorage.getItem("token")
        if(usertoken){
            setToken(usertoken)
        }
    }, [])

    //Função de login
    const login = async (email, password) => {
        try{
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
            if(!res.ok){
                setLoading(false)
                return setErrors(data.errors || [])
            }
            console.log(data)
            

            setUsuario({ _id: data._id })
            setToken(data.token)
            localStorage.setItem("token", data.token)


        }
        catch(error){
            setErrors([{errors: ["Erro ao fazer login, tente novamente mais tarde!"]}])
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    //Função de registro de usuários
    const register = async (nome, email, password, confirmPass) => {
        try{
            setLoading(true)
            const res = await fetch(apiRegister, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ nome, email, password, confirmPass })
            })

            const data = await res.json()

            if(!res.ok){
                return setErrors(errors || [])
            }

            setSuccessMsg("Cadastro feito com sucesso!")
        }
        catch(error){
            setErrors([{errors: ["Erro ao fazer cadastro!"]}])
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    //Função de logout
    const logout = () => {
        setUsuario({})
        setToken(null)
        localStorage.removeItem("token")
    }


    return(
        <AuthContext.Provider value={{login, usuario, token, loading, register, successMsg, errors, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}