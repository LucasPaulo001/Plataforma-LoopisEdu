import { useContext, createContext, useState, useEffect } from "react";

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
    const [Hierarchy, setHierarchy] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [success, setSuccess] = useState("")
    const [errors, setErrors] = useState("")


    //URL de produção
    const BASE_URL =
        import.meta.env.MODE === "development"
            ? "http://localhost:8080"
            : import.meta.env.VITE_API_URL_PRODUCTION;

    //Listando hierarquia de usuários
    const listHierarchy = async () => {
        //const apiListH = 'http://localhost:8080/api/users/listEmployee'

        try {

            const res = await fetch(`${BASE_URL}/api/users/listEmployee`, {
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
        //const apiList = 'http://localhost:8080/api/admin/listAll'

        try {
            const res = await fetch(`${BASE_URL}/api/admin/listAll`, {
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
        catch (error) {
            console.log(error)
        }
    }

    //Enviar feedback
    const sendFeedBack = async (userName, userEmail, content) => {

        //const apiFeedback = 'http://localhost:8080/api/users/feedback'

        try {

            const res = await fetch(`${BASE_URL}/api/users/feedback`, {
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
        catch (error) {
            console.log(error)
        }
    }

    //Bloqueando usuários (admin)
    const blockUsers = async (idUser) => {
        //const apiBlock = `http://localhost:8080/api/admin/blockAccount/user`

        try {
            const res = await fetch(`${BASE_URL}/api/admin/blockAccount/user`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ id: idUser })
            })

            const data = await res.json()

            if (!res.ok) {
                setErrors(data.msg)
                return false
            }
            console.log(data)
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    }

    //Desbloquear usuário
    const unlockUser = async (idUser) => {
        //const apiUnlock = 'http://localhost:8080/api/admin/unlockAccount/user'

        try {
            const res = await fetch(`${BASE_URL}/api/admin/unlockAccount/user`, {
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
        catch (error) {
            console.log(error)
            return false
        }
    }

    //Mudar setor do usuário (mudança de diretoria)
    const chooseEmployee = async (employee, id) => {
        //const apiChoose = 'http://localhost:8080/api/presidente/promotionEmployee'

        try {
            const res = await fetch(`${BASE_URL}/api/presidente/promotionEmployee`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ employee, id })
            })

            const data = await res.json()

            if (res.ok) {
                console.log(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    //Mudar setor do usuário
    const chooseSetor = async (setor, id) => {
        //const apiChoose = 'http://localhost:8080/api/presidente/addSetor'

        try {
            const res = await fetch(`${BASE_URL}/api/presidente/addSetor`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ setor, id })
            })

            const data = await res.json()

            if (res.ok) {
                console.log(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }



    return (
        <ProfileContext.Provider value={{
            Hierarchy,
            listHierarchy,
            errors,
            setErrors,
            blockUsers,
            success,
            setSuccess,
            sendFeedBack,
            listAllUser,
            allUsers,
            unlockUser,
            chooseEmployee,
            chooseSetor
        }}
        >
            {children}
        </ProfileContext.Provider>
    )
}

export const profileData = () => {
    return useContext(ProfileContext)
}