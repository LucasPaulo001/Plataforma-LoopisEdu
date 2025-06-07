import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";

const ClasseContext = createContext()

export const ClasseProvider = ({ children }) => {
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState("")
    const { listHierarchy } = useAuth()

    //Listar aulas
    const listClasses = async () => {
        const apiListClasses = 'http://localhost:8080/api/lecionador/getClasses'

        try {
            const fetchData = await fetch(apiListClasses, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await fetchData.json()

            console.log(data)

            setClasses(data)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        listClasses()
    }, [])

    //Adicionar lecionador
    const addLecionador = async (id) => {
        const apiAdd = 'http://localhost:8080/api/presidente/addLecionador'

        try {

            const res = await fetch(apiAdd, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ id })

            })

            const data = await res.json()

            console.log(data)

        }
        catch (error) {
            console.log(error)
        }
    }

    //Retirar lecionador
    const removeLecionador = async (id) => {

        const apiRemove = 'http://localhost:8080/api/presidente/removeLecionador'

        try {
            const res = await fetch(apiRemove, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ id })
            })

            const data = await res.json()

            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    //Postar aulas (lecionador)
    const uploadClasses = async (title, description, youtubeLink, category) => {
        const uploadAPI = 'http://localhost:8080/api/lecionador/uploadClass'

        try {
            const categoryDefrag = category.split(",").map(cat => cat.trim()).filter(tag => tag !== "")
            console.log(categoryDefrag)

            //pegando thumb do video
            const url = new URL(youtubeLink)
            const videoId = url.searchParams.get("v")

            if (!videoId) {
                console.error("Link inválido do YouTube.");
                return;
            }

            //url de thumb
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

            const res = await fetch(uploadAPI, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ 
                    title, 
                    description, 
                    youtubeLink, 
                    thumbnailVideo: thumbnailUrl, 
                    category: categoryDefrag })
            })

            const data = await res.json()

            console.log(data)
            if (res.ok) {
                setClasses(data)
                setSuccess("Aula postada com sucesso!")
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <ClasseContext.Provider value={{
            classes,
            loading,
            addLecionador,
            listHierarchy,
            removeLecionador,
            uploadClasses,
            success
        }}>
            {children}
        </ClasseContext.Provider>
    )
}

export const useClass = () => {
    return useContext(ClasseContext)
}