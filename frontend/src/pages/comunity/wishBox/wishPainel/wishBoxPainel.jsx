import styles from "./WishBoxPainel.module.css"
import { useWish } from "../../../../contexts/wishContext";
import { useEffect } from "react";
import { useAuth } from "../../../../contexts/authContext";
import { WishCard } from "../wishCard/WishCard";

export const WishBoxPainel = () => {
    const { 
        listWish, 
        wish, 
        UPwish, 
        aceptWish, 
        success,
    } = useWish();
    const { usuario } = useAuth();

    useEffect(() => {
        listWish();
    }, []);

    //Painel principal com os cards

    return (
        <div className={styles.containerPainel}>
            <div className={styles.msg}>
                {success && <h4>{success}</h4>}
            </div>

            {wish.map((wishItem) => (
                <WishCard
                    key={wishItem._id}
                    wish={wishItem}
                    usuario={usuario}
                    UPwish={UPwish}
                    aceptWish={aceptWish}
                />
            ))}
        </div>
    );
};
