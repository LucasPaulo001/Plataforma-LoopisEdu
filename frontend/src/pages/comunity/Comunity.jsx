import { useEffect, useState } from "react";
import styles from "./Comunity.module.css"
import {
    BsPlusSquare,
    BsPlusSquareFill,
    BsPinFill

} from "react-icons/bs";
import { ModalPost } from "./modalPost/ModalPost";
import { useAuth } from "../../contexts/authContext"
import { usePublish } from "../../contexts/communityContext";
import { PostsFixed } from "./PostsFixed/PostsFixed";
import { PostCard } from "./PostCard/PostCard";


export const Comunity = () => {
    const [postHover, setPostHover] = useState(false)
    const [openPublish, setOpenPublish] = useState(false)
    const {
        listPostInCommunity,
        posts,
        deletePost,
        success,
        fixedPosts,
        listFixedPosts
    } = usePublish()
    const [editPost, setEditPost] = useState(null)
    const { usuario } = useAuth()
    const [openFixed, setOpenFixed] = useState(null)

    //Hover para os botões de curtir e comentar
    const [hover, setHover] = useState(null)
    const [hoverComment, setHoverComment] = useState(null)

    //Função de Hover para o botão de postagens
    const handleHover = () => {
        setPostHover(prev => !prev)
    }

    //Função para abrir modal de postagem
    const handleOpen = () => {
        setOpenPublish(prev => !prev)
    }

    useEffect(() => {
        listPostInCommunity()
        listFixedPosts()
    }, [])

    const acceptRoles = [
        'Presidente',
        'Vice-Presidente',
        'Diretor de Projetos',
        'Diretor de RH',
        'Diretor de Comercial',
        'Diretor de Marketing'
    ]

    const handleDelete = async (idPost) => {
        await deletePost(idPost)
    }


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.search_post}>
                    <input type="text" placeholder="Buscar" />
                    {
                        acceptRoles.includes(usuario.role) && (
                            <>
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
                                <ModalPost
                                    open={openPublish}
                                    status={setOpenPublish}
                                    editingPost={editPost}
                                    setEditingPost={setEditPost}
                                />
                                <button>
                                    <BsPinFill onClick={() => setOpenFixed(prev => !prev)} />
                                </button>
                            </>
                        )
                    }
                </div>
                {success && <span className="successMSGsystem">{success}</span>}


                {/* Mensagens fixadas */}
                <div>
                    <PostsFixed
                        posts={posts}
                        open={openFixed}
                        listFixedPosts={listFixedPosts}
                        usuario={usuario}
                        handleDelete={handleDelete}
                        setEditPost={setEditPost}
                        setOpenPublish={setOpenPublish}
                        fixedPosts={fixedPosts}
                        hover={hover}
                        setHover={setHover}
                        hoverComment={hoverComment}
                        setHoverComment={setHoverComment}
                    />
                </div>


                {/* Conteúdo de mensagens */}
                <div className={styles.messages}>
                    {
                        posts.map((post) => (
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
                    }
                </div>
            </div>
        </div>
    )
}