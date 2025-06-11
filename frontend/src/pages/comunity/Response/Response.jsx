import { useState } from "react";
import { usePublish } from "../../../contexts/communityContext";
import styles from "./Response.module.css"
import { TbSend2 } from "react-icons/tb";

import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { ModalEditResp } from "./ModalEdit/ModalEditResp";
import { useAuth } from "../../../contexts/authContext";

export const Response = ({ post, state }) => {
    const [content, setContent] = useState("")
    const [openEdit, setOpenEdit] = useState(null)
    const { responsePost, deleteResponse } = usePublish()
    const { usuario } = useAuth()

    //Função de resposta de postagem
    const handleSubmit = (e) => {
        e.preventDefault()
        responsePost(post._id, content)
        setContent("")
    }


    return (
        <>
            {
                state && (
                    <div className={styles.containerResp}>
                        <div className={styles.localInputResp}>
                            <form onSubmit={handleSubmit}>
                                <input
                                    onChange={(e) => setContent(e.target.value)}
                                    className={styles.inputResp}
                                    type="text"
                                    value={content}
                                    placeholder={`Responda à ${post.author.nome} - ${post.author.role}`} />
                                <button type="submit">
                                    <TbSend2 />
                                </button>
                            </form>
                        </div>

                        {/* Local com as respostas */}
                        <div className={styles.containerResps}>
                            <h5>Respostas:</h5>
                            {post.responses.length ? (
                                post.responses.map((resp) => (
                                    <>
                                        <div className={styles.cardResp} key={resp._id}>
                                            <div className={styles.toolsResps}>
                                                <h4>{resp.author.nome} - {resp.author.role} {resp.author._id === post.author._id && ("-> (Author)")}
                                                    </h4>

                                                {/* Botões de excluir e editar respostas */}

                                                {
                                                    resp.author._id === usuario._id && (
                                                        <div className={styles.btnsToolsResp}>
                                                            <button
                                                                onClick={() => {
                                                                    setOpenEdit(true)

                                                                }}
                                                            >
                                                                <BsPencilSquare />
                                                            </button>
                                                            <button

                                                            onClick={() => deleteResponse(post._id, resp._id)}>
                                                            <BsTrash />
                                                            </button>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                            <span className={`${styles.sepResp} separator`}></span>
                                            <p>{resp.content}</p>
                                        </div>

                                        {/* Janela de edição de resposta */}
                                        <ModalEditResp
                                            setContent={resp.content}
                                            openEdit={openEdit}
                                            setOpenEdit={setOpenEdit}
                                            idPost={post._id}
                                            responseId={resp._id}
                                        />
                                    </>

                                ))
                            ) : (
                                <span className={styles.nothing}>Nenhuma resposta por aqui...</span>
                            )}
                        </div>
                    </div>
                )
            }
        </>
    )
}