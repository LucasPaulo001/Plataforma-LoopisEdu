import { useState } from "react"
import { useAuth } from "../../contexts/authContext"
import "./Cap.css"
import { useClass } from "../../contexts/classesContext"

export const Capacitations = () => {
    const { usuario } = useAuth()
    const { uploadClasses, success } = useClass()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [link, setLink] = useState("")
    const [tags, setTags] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await uploadClasses(title, description, link, tags)
    }

    return(
        <div className="containerCap">
            <section className="heroLecionador">
                <h2>Olá, {usuario.nome}! você é um "lecionador" e pode postar aulas aqui! :) </h2>
            </section>
            <div className="formUpload">
                {success && <span>{success}</span>}
                <form onSubmit={handleSubmit}>
                    <div className="uploadInput">
                        <input 
                        type="text" 
                        placeholder="Título" 
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="uploadInput">
                        <textarea 
                        type="text" 
                        placeholder="Descrição" 
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="uploadInput">
                        <input 
                        type="text" 
                        placeholder="Link do vídeo" 
                        onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                    <div className="uploadInput">
                        <input 
                        type="text" 
                        placeholder="Categorias: frontend, backend, design..." 
                        onChange={(e) => setTags(e.target.value)}
                        />
                    </div>

                    <div className="btnUp">
                        <button type="submit">Publicar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}