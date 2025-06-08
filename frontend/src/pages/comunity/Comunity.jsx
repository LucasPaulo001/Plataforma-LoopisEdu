import { useState } from "react";
import styles from "./Comunity.module.css"
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import { ModalPost } from "./modalPost/ModalPost";

export const Comunity = () => {
    const [postHover, setPostHover] = useState(false)
    const [openPublish, setOpenPublish] = useState(false)

    //Função de Hover para o botão de postagens
    const handleHover = () => {
        setPostHover(prev => !prev)
    }

    //Função para abrir modal de postagem
    const handleOpen = () => {
        setOpenPublish(prev => !prev)
    }

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.search_post}>
                    <input type="text" placeholder="Buscar" />
                    <button 
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                    onClick={handleOpen}
                    >
                        {
                            postHover ? (
                                <BsPlusSquareFill />
                            ) : (
                                <BsPlusSquare />
                            )
                        }
                        
                    </button>
                    <ModalPost open={openPublish} status={setOpenPublish} />
                </div>
                <div>
                    fixados
                </div>

                <div className={styles.messages}>
                    ...
                </div>
            </div>
        </div>
    )
}