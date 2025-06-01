import { useContext, createContext, useState, useEffect } from "react";
import { AuthContext } from "./authContext";

const UpdateContext = createContext()

export const UpdateProvider = ({children}) => {
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState("")
    const { setUsuario } = useContext(AuthContext)


    //Função para modificação de dados
    const updateUser = async (nome, password) => {
        const apiUpdateUser = 'http://localhost:8080/api/users/updateUser'

        try{
            const res = await fetch(apiUpdateUser, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ nomeEdited: nome, passwordEdited: password })
            })

            const data = await res.json()

            if(!res.ok){
                setErrors([data.msg])
                return
            }
            setErrors([])
            setUsuario(data)
            setSuccess("Dados modificados com sucesso!")
            console.log(data)

        }
        catch(error){
            setErrors("Houve um erro ao tentar modificar os dados")
        }
    }


    return(
        <UpdateContext.Provider value={{updateUser, errors, setErrors, success, setSuccess}}>
            {children}
        </UpdateContext.Provider>
    )
}

export const useUpdate = () => {
    return useContext(UpdateContext)
}