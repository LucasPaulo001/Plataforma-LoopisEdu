import { useState } from "react";
import styles from "./ModalEditResp.module.css"
import { BsXLg } from "react-icons/bs";
import { useEffect } from "react";
import { usePublish } from "../../../../contexts/communityContext";

export const ModalEditResp = ({ setContent, idPost, responseId, openEdit, setOpenEdit }) => {
    const [contentRes, setContentRes] = useState("")

    const { editResponse } = usePublish()
    
    useEffect(() => {
        if(openEdit){
            setContentRes(setContent || "")
        }
    }, [setContentRes, openEdit])


    //Função de submit para editar
    const handleSubmit = (e) => {
        e.preventDefault()
        editResponse(idPost, responseId, contentRes)
        setOpenEdit(null)
    }


    return (
        <>
            {
                openEdit && (
                    <div className={styles.conteinerEdit}>
                        <div className={styles.contentEdit}>
                            <BsXLg 
                            onClick={() => setOpenEdit(null)}
                            />
                            <form onSubmit={handleSubmit}>
                                <div className={styles.localTextEdit}>
                                    <textarea
                                        value={contentRes}
                                        onChange={(e) => setContentRes(e.target.value)}
                                        placeholder="Resposta..."
                                    ></textarea>
                                </div>

                                <div className={styles.btnSubmit}>
                                    <button type="submit">Atualizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

        </>

    )
}