import { useReducer, useState } from "react";
import styles from "./WishBox.module.css"
import { BsXLg } from "react-icons/bs";
import { useWish } from "../../../../contexts/wishContext";
import { useEffect } from "react";

export const WishBox = ({
    openWish,
    setOpenWish,
    isEditing,
    nomeToEdit,
    wishIdToEdit,
    descriptionToEdit,
    tagsToEdit
}) => {
    const [nome, setNome] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    const { sendWish, success, wishEdit } = useWish()

    // Função de submit dos dados do desejo
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing && wishIdToEdit) {
            wishEdit(wishIdToEdit, nome, description, tags);
        } else {
            sendWish(nome, description, tags);
        }

        setNome("");
        setDescription("");
        setTags("");
        setOpenWish(false);
    }

    useEffect(() => {
        if (isEditing) {
            setNome(nomeToEdit || "");
            setDescription(descriptionToEdit || "");
            setTags(tagsToEdit || "");
        }
    }, [isEditing, nomeToEdit, descriptionToEdit, tagsToEdit])

    //--> Componente de envio de sugestão <--

    return (
        <>
            {/* Formulário de envio de desejo (capacitação) */}
            {
                openWish && (
                    <div className={styles.contentBox}>
                        <div className={styles.content}>
                            <BsXLg onClick={() => setOpenWish(null)} className={styles.close} />
                            <h2 style={{ textAlign: "center" }}>
                                {
                                    isEditing ? 
                                    "Edite sua sugestão" : 
                                    "Aqui você pode pedir capacitações!!"
                                }
                                
                            </h2>
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
                                    <button
                                        type="submit"
                                    >
                                        {isEditing ? "Atualizar" : "Salvar"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

        </>
    )
}