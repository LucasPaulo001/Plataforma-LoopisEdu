import styles from "./wishAcepted.module.css"
import { WishCard } from "../../comunity/wishBox/wishCard/WishCard"
import { useWish } from "../../../contexts/wishContext"
import { useEffect } from "react";
import { useAuth } from "../../../contexts/authContext";

export const WishAcepted = () => {

    const {
        listWishAccepted,
        accepted,
        UPwish,
        aceptWish,
        success
    } = useWish();
    const { usuario } = useAuth();

    useEffect(() => {
        listWishAccepted();
    }, []);

    return (
        <div className={styles.containerAcepted}>
            <div className={styles.title}>
                <h2>Capacitações aceitas</h2>
            </div>
            <div className={styles.msg}>
                {success && <h4>{success}</h4>}
            </div>

            <div className={styles.localAccepteds}>
                {
                    accepted.length > 0 ?
                        accepted.map((wish) => (
                            <WishCard
                                key={wish._id}
                                wish={wish}
                                usuario={usuario}
                                UPwish={UPwish}
                                aceptWish={aceptWish}
                            />
                        )) : (
                            <h3>Nenhuma sugestão de capacitação aceita...</h3>
                        )
                }
            </div>
        </div>
    )
}