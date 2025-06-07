import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from "./ContentClasses.module.css"
import { BsBookmark, BsBookmarkFill, BsHeart, BsFillHeartFill } from "react-icons/bs";
import { useAuth } from "../../contexts/authContext";
import { BsThreeDots } from "react-icons/bs";
import { useClass } from "../../contexts/classesContext";

export const ContentClasses = () => {
    const { id } = useParams()
    const [classe, setClasse] = useState(null)
    const [loading, setLoading] = useState(null)
    const [hoverButtonSave, setHoverButtonSave] = useState(null)
    const [hoverButtonHeart, sethoverButtonHeart] = useState(null)
    const [author, setAuthor] = useState({})
    const { usuario } = useAuth()
    const [saved, setSaved] = useState(false)
    const { likeClass, saveClasses, savedClass } = useClass()

    useEffect(() => {
        const fetchAula = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/lecionador/getClasses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const data = await response.json()
                setClasse(data)
                setAuthor(data.author)
                setLoading(false)
            } catch (err) {
                console.error(err)
            }
        }
        fetchAula()
    }, [id])

    useEffect(() => {
        if (classe && usuario) {
            const isSaved = usuario.saved?.includes(classe._id)
            setSaved(isSaved)
        }
    }, [classe, usuario])


    //Função para dar like em aula
    const like = async () => {
        likeClass(classe._id)
        setClasse((prev) => {
            const alreadyLiked = prev.likes.includes(usuario._id)
            return {
                ...prev,
                likes: alreadyLiked
                    ? prev.likes.filter((id) => id !== usuario._id)
                    : [...prev.likes, usuario._id]
            }
        })
    }

    //Função para salvar aula
    const save = async () => {
        await saveClasses(classe._id)

        setSaved(prev => !prev)
    }


    if (loading) return <h2>Carregando aula...</h2>
    if (!classe) return <h2>Aula não encontrada</h2>

    return (
        <div>
            <div>
                <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${new URL(classe.youtubeLink).searchParams.get("v")}`}
                    title={classe.title}
                    allowFullScreen
                />

                <div className={styles.dataClass}>
                    <div className={styles.titleContent}>
                        <h1>{classe.title}</h1>

                        <button
                            onClick={save}
                            onMouseEnter={() => setHoverButtonSave(true)}
                            onMouseLeave={() => setHoverButtonSave(false)}>
                            {
                                hoverButtonSave || saved ? (
                                    <span className={styles.marked}>
                                        <BsBookmarkFill />
                                    </span>
                                ) : (
                                    <span>
                                        <BsBookmark />
                                    </span>
                                )
                            }
                           
                        </button>

                        <button
                            onClick={like}
                            onMouseEnter={() => sethoverButtonHeart(true)}
                            onMouseLeave={() => sethoverButtonHeart(false)}
                        >

                            {
                                hoverButtonHeart || classe.likes.includes(usuario._id) ? (
                                    <span className={styles.marked}>
                                        <BsFillHeartFill />
                                    </span>
                                ) : (
                                    <span>
                                        <BsHeart />
                                    </span>
                                )
                            }
                            {classe.likes?.length || 0}

                        </button>
                        {/* Menu para o author do video */}
                        {
                            usuario._id === author && (
                                <div className={styles.menu}>
                                    <BsThreeDots />
                                </div>
                            )
                        }

                    </div>
                    <p><strong>Descrição: </strong>{classe.description}</p>
                    <hr />

                    <div className={styles.categorys}>
                        <strong>tags:</strong>
                        {classe.category.map((cat) => (
                            <span> {cat} </span>
                        ))

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}