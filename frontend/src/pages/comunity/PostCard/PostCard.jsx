import { BsTrash, BsPencilSquare, BsPinAngle, BsHeart, BsHeartFill, BsChat, BsChatFill } from "react-icons/bs"
import styles from "./PostCard.module.css"
import { usePublish } from "../../../contexts/communityContext";
import { Response } from "../Response/Response";
import { useState } from "react";

export const PostCard = ({ post, usuario, setHover, hover, setHoverComment, hoverComment, handleDelete, setEditPost, setOpenPublish, fixedPosts }) => {
    if (!post?.author) return null;

    const { likePost, likes } = usePublish()
    const [openResponse, setOpenResponse] = useState(null)

    //Função de like em postagem 
    const handleLike = async () => {
        await likePost(usuario._id, post._id)
    }

    return (
        <div className={`${styles.cardPost} ${post.fixed ? styles.fixed : ""}`} key={post._id}>
            <div className={styles.tools}>
                <span>
                    {post.author.nome} - <strong>{post.author.role}</strong>
                </span>
                {
                    usuario?._id === post.author._id && (
                        <div className={styles.btnsTools}>
                            <button onClick={() => handleDelete(post._id)} className={styles.deleteIcon}>
                                <BsTrash />
                            </button>
                            <button
                                className={styles.editIcon}
                                onClick={() => {
                                    setEditPost(post)
                                    setOpenPublish(true)
                                }}
                            >
                                <BsPencilSquare />
                            </button>
                            <button onClick={() => fixedPosts(post._id)} className={styles.fixePost}>
                                <BsPinAngle />
                            </button>
                        </div>
                    )
                }
            </div>
            <span className={`${styles.separatorPost} separator`}></span>
            <h3>Assunto: <i>{post.subject}</i></h3>
            <p>{post.content}</p>

            <div className={styles.btnsTools}>
                <button
                    onMouseEnter={() => setHover(post._id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={handleLike}
                    className={styles.icon}>
                    {hover === post._id || post.likes.includes(usuario._id) ? <BsHeartFill /> : <BsHeart />}
                    {likes[post._id] || 0}
                </button>
                <button
                    onMouseEnter={() => setHoverComment(post._id)}
                    onMouseLeave={() => setHoverComment(null)}
                    onClick={() => setOpenResponse(prev => !prev)}
                    className={styles.icon}>
                    {hoverComment === post._id ? <BsChatFill /> : <BsChat />}
                </button>
            </div>

            <Response 
            post={post} 
            state={openResponse} 
            />

        </div>
    )
}
