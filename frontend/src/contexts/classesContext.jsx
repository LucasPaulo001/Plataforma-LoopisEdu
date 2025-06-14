import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";

const ClasseContext = createContext()

export const ClasseProvider = ({ children }) => {
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState("")
    const [likes, setLikes] = useState([])
    const { listHierarchy, usuario } = useAuth()
    const [savedClass, setSavedClass] = useState([])


    //URL de produção
    const BASE_URL =
        import.meta.env.MODE === "development"
            ? "http://localhost:8080"
            : import.meta.env.VITE_API_URL_PRODUCTION;

    //Listar aulas
    const listClasses = async () => {
        //const apiListClasses = 'http://localhost:8080/api/lecionador/getClasses'

        try {
            const fetchData = await fetch(`${BASE_URL}/api/lecionador/getClasses`, {
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
        //const apiAdd = 'http://localhost:8080/api/presidente/addLecionador'

        try {

            const res = await fetch(`${BASE_URL}/api/presidente/addLecionador`, {
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

        //const apiRemove = 'http://localhost:8080/api/presidente/removeLecionador'

        try {
            const res = await fetch(`${BASE_URL}/api/presidente/removeLecionador`, {
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
       // const uploadAPI = 'http://localhost:8080/api/lecionador/uploadClass'

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

            const res = await fetch(`${BASE_URL}/api/lecionador/uploadClass`, {
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
                    category: categoryDefrag
                })
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

    //Curtir aula
    const likeClass = async (idClass) => {
        //const likeAPI = `http://localhost:8080/api/users/class/${idClass}/like`

        try {

            const res = await fetch(`${BASE_URL}/api/users/class/${idClass}/like`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await res.json()

            if (res.ok) {
                setLikes(data.totalLikes)
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    const saveClasses = async (idClass) => {
        //const saveAPI = `http://localhost:8080/api/users/class/${idClass}/save`

        try {

            const res = await fetch(`${BASE_URL}/api/users/class/${idClass}/save`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
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

    //Listar cursos salvos
    const listSaves = async () => {
        //const listAPI = 'http://localhost:8080/api/users/listClassSaved'

        try {

            const res = await fetch(`${BASE_URL}/api/users/listClassSaved`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await res.json()

            if (res.ok) {
                console.log(data)
                setSavedClass(data)
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
            success,
            likeClass,
            likes,
            saveClasses,
            listSaves,
            setSavedClass,
            savedClass
        }}>
            {children}
        </ClasseContext.Provider>
    )
}

export const useClass = () => {
    return useContext(ClasseContext)
}