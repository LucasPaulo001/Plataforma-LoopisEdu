
// import { useState } from "react";
import { useEffect, useState } from "react";
import { usePublish } from "../../../contexts/communityContext";
import styles from "./ModalPost.module.css"
import { BsXLg } from "react-icons/bs";

export const ModalPost = ({ open, status, editingPost, setEditingPost }) => {
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const { postInCommunity, success, editPost } = usePublish()

    useEffect(() => {
        if (editingPost) {
            setSubject(editingPost.subject)
            setContent(editingPost.content)
        } 
        else {
            setSubject("")
            setContent("")
        }
    
    }, [editingPost])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editingPost) {
            await editPost(editingPost._id, subject, content)
            setEditingPost(null)
        } else {
            await postInCommunity(subject, content)
        }
        status(false)
    }

    return (
        <>
            {
                open && (
                    <div className={styles.containerPost}>
                        <div className={styles.content}>
                            {success && <span className={styles.successPostMSG}>{success}</span>}
                            <button>
                                <BsXLg
                                    onClick={() => {
                                        status(false)
                                        setEditingPost(null)
                                    }}
                                />
                            </button>
                            <form onSubmit={handleSubmit}>

                                <div className={styles.inputForm}>
                                    <input
                                        type="text"
                                        placeholder="Assunto"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>

                                <div className={`${styles.inputForm} inputTextarea`}>
                                    <textarea
                                        placeholder="Conteúdo da postagem..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    >
                                    </textarea>
                                </div>

                                <div className={styles.buttonPublish}>
                                    <button type="submit">{editingPost ? "Atualizar" : "Publicar"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}