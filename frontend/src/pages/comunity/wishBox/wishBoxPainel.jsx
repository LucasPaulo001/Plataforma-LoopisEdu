import styles from "./WishBoxPainel.module.css"
import { useWish } from "../../../contexts/wishContext"
import { useEffect } from "react"
import { FaArrowAltCircleUp } from "react-icons/fa"
import { useAuth } from "../../../contexts/authContext"

export const WishBoxPainel = () => {
    const { listWish, wish, UPwish } = useWish()
    const { usuario } = useAuth()

    useEffect(() => {
        listWish();
    }, [])

    return (
        <div className={styles.containerPainel}>
            {
                wish.map((wish) => {
                    const alreadyLiked = wish.UPs.includes(usuario._id);
                    console.log(alreadyLiked)

                    return (
                        <div className={styles.cardWish} key={wish._id}>
                            {/* Botão de UP */}
                            <div
                                className={`${styles.upIcon} ${alreadyLiked ? styles.up : ""}`}
                                onClick={() => UPwish(wish._id)}
                            >
                                <FaArrowAltCircleUp />
                                <span>{wish.UPs.length}</span>
                            </div>

                            <h4>Proposto por: <i>{wish.author.nome} - {wish.author.role}</i></h4>
                            <h3>Capacitação em:</h3>
                            <span className="separator"></span>

                            <div className={styles.contentWish}>
                                <span>
                                    <i><h3>{wish.nome}</h3></i>
                                </span>
                                <p>{wish.description}</p>
                            </div>
                            <span className="separator"></span>
                            <div>
                                <span className={styles.tag}>{wish.tags}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
