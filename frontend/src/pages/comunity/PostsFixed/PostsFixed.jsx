import { useEffect, useState } from "react"
import styles from "./PostsFixed.module.css"
import { BsTrash, BsPencilSquare, BsPinAngle, BsHeart, BsHeartFill, BsChat, BsChatFill } from "react-icons/bs"
import { PostCard } from "../PostCard/PostCard"

export const PostsFixed = ({
    posts,
    listFixedPosts,
    usuario,
    handleDelete,
    setEditPost,
    setOpenPublish,
    fixedPosts,
    open
}) => {
    const [hover, setHover] = useState(null)
    const [hoverComment, setHoverComment] = useState(null)

    useEffect(() => {
        listFixedPosts()
    }, [])

    return (
        <div className={`${styles.containerFixed} ${open ? styles.open : ""} `}>
            <h2>Mensagens Fixadas</h2>
            {
                posts.filter(post => post.fixed).length === 0 ? (
                    <p>Nenhuma mensagem fixada.</p>
                ) : (
                    posts
                        .filter(post => post.fixed)
                        .map((post) => (

                            <PostCard
                                key={post._id}
                                post={post}
                                usuario={usuario}
                                setHover={setHover}
                                hover={hover}
                                setHoverComment={setHoverComment}
                                hoverComment={hoverComment}
                                handleDelete={handleDelete}
                                setEditPost={setEditPost}
                                setOpenPublish={setOpenPublish}
                                fixedPosts={fixedPosts}

                            />

                        ))
                )
            }
        </div>
    )
}
