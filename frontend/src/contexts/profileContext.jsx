import { useContext, createContext, useState, useEffect } from "react";

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
    const [Hierarchy, setHierarchy] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [success, setSuccess] = useState("")
    const [errors, setErrors] = useState("")

    //Listando hierarquia de usuários
    const listHierarchy = async () => {
        const apiListH = 'http://localhost:8080/api/users/listEmployee'

        try {

            const res = await fetch(apiListH, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                }
            })

            const data = await res.json()

            if (!res.ok) {
                console.log("Erro ao listar funcionários")
            }
            console.log(data.employee)
            setHierarchy(data.employee)
        }
        catch (error) {
            console.log(error)
        }
    }

    //Listar todos os usuários (incluindo membros) para admins
    const listAllUser = async () => {
        const apiList = 'http://localhost:8080/api/admin/listAll'
        
        try{
            const res = await fetch(apiList, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                }
            })

            const data = await res.json()

            console.log(data.users)
            setAllUsers(data.users)

        }
        catch(error){
            console.log(error)
        }
    }

    //Enviar feedback
    const sendFeedBack = async (userName, userEmail, content) => {

        const apiFeedback = 'http://localhost:8080/api/users/feedback'

        try{

            const res = await fetch(apiFeedback, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userName, userEmail, content })
            })

            const data = await res.json()

            console.log(data)
            setSuccess(data.msg)

        }
        catch(error){
            console.log(error)
        }
    }

    //Bloqueando usuários (admin)
    const blockUsers = async (idUser) => {
        const apiBlock = `http://localhost:8080/api/admin/blockAccount/user`

        try{
            const res = await fetch(apiBlock, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ id: idUser })
            })

            const data = await res.json()

            if(!res.ok){
                setErrors(data.msg)
                return false
            }
            console.log(data)
            return true
        }
        catch(error){
            console.log(error)
            return false
        }
    }

    //Desbloquear usuário
    const unlockUser = async (idUser) => {
        const apiUnlock = 'http://localhost:8080/api/admin/unlockAccount/user'

        try{
            const res = await fetch(apiUnlock, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ id: idUser })
            })

            const data = await res.json()
            console.log(data, idUser)
            return true
        }       
        catch(error){
            console.log(error)
            return false
        }
    }



    return (
        <ProfileContext.Provider value={{ Hierarchy, listHierarchy, errors, setErrors, blockUsers, success, setSuccess, 
            sendFeedBack, listAllUser, allUsers, unlockUser }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const profileData = () => {
    return useContext(ProfileContext)
}