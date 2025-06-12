import { useState } from "react";
import styles from "./WishBox.module.css"
import { BsXLg } from "react-icons/bs";
import { useWish } from "../../../contexts/wishContext";
import { useEffect } from "react";

export const WishBox = ({ openWish, setOpenWish }) => {
    const [nome, setNome] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    const { sendWish, success } = useWish()

    // Função de submit dos dados do desejo
    const handleSubmit = (e) => {
        e.preventDefault();
        sendWish(nome, description, tags);
        setNome("");
        setDescription("");
        setTags("");
    }

    return (
        <>
        {/* Formulário de envio de desejo (capacitação) */}
            {
                openWish && (
                    <div className={styles.contentBox}>
                        <div className={styles.content}>
                            <BsXLg onClick={() => setOpenWish(null)} className={styles.close} />
                            <h2 style={{ textAlign: "center" }}>Aqui você pode pedir capacitações!!</h2>
                            {success && <span className="successMSGsystem">{success}</span>}
                            <form 
                            onSubmit={handleSubmit}
                            className={styles.formBox}
                            >
                                <div className={styles.localInputBox}>
                                    <input 
                                    value={nome}
                                    type="text" 
                                    placeholder="Nome da capacitação desejada..." 
                                    onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>
                                <div className={styles.localInputBox}>
                                    <textarea 
                                    value={description}
                                    placeholder="Descrição..."
                                    onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className={styles.localInputBox}>
                                    <input 
                                    value={tags}
                                    type="text" 
                                    placeholder="Categoria: frontend, backend, design..." 
                                    onChange={(e) => setTags(e.target.value)}
                                    />
                                </div>

                                <div className={styles.btnSave}>
                                    <button type="submit">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

        </>
    )
}