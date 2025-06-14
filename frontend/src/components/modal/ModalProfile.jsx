import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext"
import "./ModalProfile.css"
import { BsBoxArrowRight, BsXLg, BsBook, BsPencilSquare, BsChatDots, BsCollectionPlay, BsInfoCircle, BsChatQuote } from "react-icons/bs";


export const ModalProfile = ({ stateModal, setStateModal }) => {
    const { logout, usuario } = useAuth()

    //Função de logout
    const handleLogout = () => {
        logout()
    }

    //Função para fechar janela
    const handleClose = () => {
        setStateModal(!stateModal)
    }

    return (
        <>
            {stateModal ?
                (<div className="modalProfile">
                    <div onClick={handleClose} className="closeProfile">
                        <BsXLg />
                    </div>
                    <h1>{usuario.nome} - {usuario.role}</h1>

                    <div className="content">

                        <ul>
                            {/* links do navbar no mobile */}
                            <div className="linksToMobile">
                                {
                                    usuario.lecionador && (
                                        <NavLink 
                                        to={"/course"} 
                                        onClick={handleClose} 
                                        className={({ isActive }) =>
                                            isActive && ""}>
                                            <li> <BsBook /> Capacitações</li>
                                        </NavLink>
                                    )
                                }

                                <NavLink to={"/MyCapacitations"}
                                    onClick={handleClose} className={({ isActive }) =>
                                        isActive && ""}>
                                    <li> <BsCollectionPlay /> Meus Cursos</li>
                                </NavLink>

                                <NavLink to={"/comunity"} onClick={handleClose}
                                    className={({ isActive }) =>
                                        isActive && ""}>
                                    <li> <BsChatDots /> Comunidade</li>
                                </NavLink>
                            </div>

                            <NavLink to={"/profile"} onClick={handleClose} className={({ isActive }) =>
                                isActive && ""}>
                                <li> <BsPencilSquare /> Meu perfil</li>
                            </NavLink>

                            <NavLink to={"/about"} onClick={handleClose} className={({ isActive }) =>
                                isActive && ""}>
                                <li> <BsInfoCircle /> Sobre</li>
                            </NavLink>

                            <NavLink to={"/feedback"} onClick={handleClose} className={({ isActive }) =>
                                isActive && ""}>
                                <li> <BsChatQuote /> Feedback</li>
                            </NavLink>
                        </ul>

                        <button onClick={handleLogout} className="logoutBtn">
                            <BsBoxArrowRight /> Sair
                        </button>
                    </div>

                </div>) :
                (
                    ""
                )
            }
        </>


    )
}