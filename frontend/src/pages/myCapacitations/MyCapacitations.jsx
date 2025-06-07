import { useState } from "react"
import { useClass } from "../../contexts/classesContext"
import { useEffect } from "react"
import styles from "./MyCapacitations.module.css"
import { useNavigate } from "react-router-dom"

export const MyCapacitations = () => {
    const [saves, setSaves] = useState([])
    const navigate = useNavigate()

    const { listSaves, savedClass } = useClass()

    useEffect(() => {
        listSaves()
    }, [])


    return (
        <div className={styles.container}>
            <h2>Aulas salvas</h2>
            <span className="separator"></span>
            <div className={styles.containerSaves}>
                {
                    savedClass.length == 0 ? (
                        <h3>Nenhum curso salvo...</h3>
                    ) : (

                        savedClass.map((classes) => (
                            <div className={styles.cardCap} key={classes._id}>
                                <img
                                    src={classes.thumbnailVideo}
                                    alt="video"
                                    onClick={() => navigate(`/aula/${classes._id}`)}
                                />
                            </div>
                        ))

                    )
                }

            </div>
        </div>
    )
}