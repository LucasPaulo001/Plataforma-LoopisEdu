import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from "./ContentClasses.module.css"
import { BsBookmark, BsBookmarkFill, BsHeart, BsFillHeartFill } from "react-icons/bs";

export const ContentClasses = () => {
    const { id } = useParams()
    const [classes, setClasses] = useState(null)
    const [loading, setLoading] = useState(null)
    const [hoverButtonSave, setHoverButtonSave] = useState(null)
    const [hoverButtonHeart, sethoverButtonHeart] = useState(null)

    useEffect(() => {
        const fetchAula = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/lecionador/getClasses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const data = await response.json()
                setClasses(data)
                console.log(data)
                setLoading(false)
            } catch (err) {
                console.error(err)
            }
        }
        fetchAula()
    }, [id])

    if (loading) return <h2>Carregando aula...</h2>
    if (!classes) return <h2>Aula não encontrada</h2>

    return (
        <div>
            <div>
                <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${new URL(classes.youtubeLink).searchParams.get("v")}`}
                    title={classes.title}
                    allowFullScreen
                />

                <div className={styles.dataClass}>
                    <div className={styles.titleContent}>
                        <h1>{classes.title}</h1>

                        <button
                            onMouseEnter={() => setHoverButtonSave(true)}
                            onMouseLeave={() => setHoverButtonSave(false)}>
                            {
                                hoverButtonSave ? (
                                    <span className={styles.marked}>
                                        <BsBookmarkFill  />
                                    </span>
                                ) : (
                                    <span>
                                        <BsBookmark />
                                    </span>
                                )
                            }
                        </button>

                        <button
                            onMouseEnter={() => sethoverButtonHeart(true)}
                            onMouseLeave={() => sethoverButtonHeart(false)}
                        >
                            
                            {
                                hoverButtonHeart ? (
                                    <span className={styles.marked}>
                                        <BsFillHeartFill />
                                    </span>
                                ) : (
                                    <span>
                                        <BsHeart />
                                    </span>
                                )
                            }

                        </button>

                    </div>
                    <p><strong>Descrição: </strong>{classes.description}</p>
                    <hr />

                    <div className={styles.categorys}>
                        <strong>tags:</strong>
                        {classes.category.map((cat) => (
                            <span> {cat} </span>
                        ))

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}