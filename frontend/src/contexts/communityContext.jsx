import { createContext, useState, useContext } from "react";

const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
    const [success, setSuccess] = useState("")
    const [posts, setPosts] = useState([])
    const [likes, setLikes] = useState({})
  

    //Postar na comunidade
    const postInCommunity = async (subject, content) => {
        const publishAPI = 'http://localhost:8080/api/community/addPublish'

        try{

            const res = await fetch(publishAPI, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'                    
                },
                body: JSON.stringify({ subject, content })
            })

            const data = await res.json()

            if(res.ok){
                console.log(data)
                setSuccess("Postagem feita com sucesso!")
                setInterval(() =>{
                    setSuccess("")
                }, 5000)
                await listPostInCommunity()
            }

        }
        catch(error){
            console.log(error)
        }
    }

    //Listando postagens da comunidade
    const listPostInCommunity = async () => {
        const listAPI = 'http://localhost:8080/api/community/posts'

        try{

            const res = await fetch(listAPI, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await res.json()

            if(res.ok){
                console.log(data)
                setPosts(data)
            }

        }
        catch(error){
            console.log(error)
        }
    }

    //Deletando postagem
    const deletePost = async (idPost) => {
        const deleteAPI = 'http://localhost:8080/api/community/deletePost'

        try{

            const res = await fetch(deleteAPI, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idPost })
            })

            const data = await res.json()

            if(res.ok){
                console.log(data)
                 setSuccess("Postagem deletata!")

                setTimeout(() =>{
                    setSuccess("")
                }, 8000)

                await listPostInCommunity()
            }

        }
        catch(error){
            console.log(error)
        }
    }


    //Editar postagem 
    const editPost = async (idPost, subject, content) => {
        const editAPI = 'http://localhost:8080/api/community/editPost'

        try{

            const res = await fetch(editAPI, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idPost, subject, content })
            })

            const data = await res.json()

            if(res.ok){
                console.log(data)
                await listPostInCommunity()
            }

        }
        catch(error){
            console.log(error)
        }
    }

    //Fixar Publicação
    const fixedPosts = async (idPost) => {
        const fixedAPI = 'http://localhost:8080/api/community/fixedPost'

        try{

            const res = await fetch(fixedAPI, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idPost })
            })

            const data = await res.json()

            if(res.ok){
                console.log(data)
                await listPostInCommunity()
            }

        }
        catch(error){
            console.log(error)
        }
    }

    //Listar publicações fixadas
    const listFixedPosts = async () => {
        const listAPI = 'http://localhost:8080/api/community/listFixed'

        try{

            const res = await fetch(listAPI, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = res.json()

            if(res.ok){
                console.log(data)
            }

        }
        catch(error){
            console.log(error)
        }
    }

    //Curtir publicações da comunidade
    const likePost = async ( idUser, idPost ) => {
        const likeAPI = 'http://localhost:8080/api/community/like'

        try{

            const res = await fetch(likeAPI, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser, idPost })
            })

            const data = await res.json()

            if(res.ok){
                setLikes(prev => ({
                ...prev,
                [idPost]: data.quantLikes
            }))
                await listPostInCommunity()
                
            }
        }
        catch(error){
            console.log(error)
        }
    }

    //Responder postagem em comunidade
    const responsePost = async (idPost, content) => {
        const repAPI = 'http://localhost:8080/api/community/response'

        try{

            const res = await fetch(repAPI, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idPost, content })
            })

            const data = await res.json()

            if(res.ok){
                console.log(data)
                await listPostInCommunity()
            }

        }   
        catch(error){
            console.log(error)
        }
    }

    //Deletar resposta em postagem
    const deleteResponse = async (idPost, responseId) => {
        const deleteResponseAPI = 'http://localhost:8080/api/community/response/delete'

        try{

            const res = await fetch(deleteResponseAPI, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idPost, responseId })
            })

            const data = await res.json()

            if(res.ok){
                console.log(data)
                await listPostInCommunity()
            }

        }
        catch(error){
            console.log(error)
        }

    }

    //Editar resposta 
    const editResponse = async (idPost, responseId, content) => {
        const editResponseAPI = 'http://localhost:8080/api/community/response/edit'

        try{

            const res = await fetch(editResponseAPI, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idPost, responseId, content })
            })

            const data = await res.json()

            if(res.ok){
                console.log(data)
                await listPostInCommunity()
            }

        }
        catch(error){
            console.log(error)
        }
    }


    return(
        <CommunityContext.Provider value={{ 
            postInCommunity, 
            success, 
            listPostInCommunity, 
            posts,
            deletePost,
            editPost,
            fixedPosts,
            listFixedPosts,
            likePost,
            likes,
            responsePost,
            deleteResponse,
            editResponse
        }}>
            {children}
        </CommunityContext.Provider>
    )
}

export const usePublish = () => {
    return useContext(CommunityContext)
}