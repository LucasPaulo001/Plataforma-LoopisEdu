import styles from "../wishPainel/WishBoxPainel.module.css"
import { FaArrowAltCircleUp } from "react-icons/fa";
import { BsPencilSquare, BsTrash, BsCheckCircleFill } from "react-icons/bs";
import { useWish } from "../../../../contexts/wishContext";
import { WishBox } from "../wishForm/WishBox";
import { useState } from "react";

export const WishCard = ({ wish, usuario, UPwish, aceptWish }) => {
    const alreadyLiked = wish.UPs.includes(usuario._id);

    const rolesAceptWish = [
        'Presidente',
        'Vice-Presidente',
        'Diretor de Projetos',
        'Diretor de RH',
        'Diretor de Marketing',
        'Diretor de Comercial'
    ];

    const [isEditing, setIsEditing] = useState(null);
    const [openWish, setOpenWish] = useState(null)

    const { deleteWish } = useWish();

    //Componente de Card de sugestão

    return (
        <div className={styles.cardWish}>
            {/* Botões superiores */}
            <div className={styles.toolCardWish}>
                <div
                    className={`${styles.upIcon} ${alreadyLiked ? styles.up : ""}`}
                    onClick={() => UPwish(wish._id)}
                >
                    <button>
                        <FaArrowAltCircleUp />
                        <span>{wish.UPs.length}</span>
                    </button>
                </div>

                {wish.author._id === usuario._id && (
                    <>
                        <button
                            onClick={() => {
                                setIsEditing(true)
                                setOpenWish(true)
                            }}
                        >
                            <BsPencilSquare />
                        </button>
                        <button
                            onClick={() => {
                                deleteWish(wish._id)
                            }}
                        >
                            <BsTrash />
                        </button>


                        {/* Editar sugestão */}
                        <WishBox
                            nomeToEdit={wish.nome}
                            descriptionToEdit={wish.description}
                            tagsToEdit={wish.tags}
                            wishIdToEdit={wish._id}
                            isEditing={isEditing}
                            openWish={openWish}
                            setOpenWish={setOpenWish}
                        />

                    </>
                )}
            </div>

            <h4>
                Proposto por: <i>{wish.author.nome} - {wish.author.role}</i>
            </h4>
            <h3>Capacitação em:</h3>
            <span className="separator"></span>

            {/* Conteúdo principal */}
            <div className={styles.contentWish}>
                <span>
                    <i><h3>{wish.nome}</h3></i>
                </span>
                <p>{wish.description}</p>
            </div>

            <span className="separator"></span>
            <div>
                <span className={styles.localTags}>{
                    wish.tags.map((tag, i) => (
                        <span  
                        className={styles.tag}
                        key={i}>{tag}</span>
                    ))
                }
                </span>
            </div>

            {rolesAceptWish.includes(usuario.role) && usuario._id !== wish.author._id && (
                <div className={styles.btnAcept}>
                    <button onClick={() => aceptWish(wish._id)}>
                        <BsCheckCircleFill />
                    </button>
                </div>
            )}
        </div>
    );
};
