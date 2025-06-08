
// import { useState } from "react";
import styles from "./ModalPost.module.css"
import { BsXLg } from "react-icons/bs";

export const ModalPost = ({ open, status }) => {
    // const [publish, setPublish] = useState(open)

    return (
        <>
            {
               open && (
                    <div className={styles.containerPost}>
                        <div className={styles.content}>
                            <button>
                                <BsXLg onClick={() => status(false)}/>
                            </button>
                            <form>
                                <div className={styles.inputForm}>
                                    <input type="text" placeholder="Assunto" />
                                </div>
                                <div className={`${styles.inputForm} inputTextarea`}>
                                    <textarea
                                        placeholder="Conteúdo da postagem...">

                                    </textarea>
                                </div>

                                <div className={styles.buttonPublish}>
                                    <button>Publicar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}