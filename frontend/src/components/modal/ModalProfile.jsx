import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext"
import "./ModalProfile.css"
import { BsBoxArrowRight, BsXLg, BsPencilSquare, BsInfoCircle, BsChatQuote } from "react-icons/bs";


export const ModalProfile = ({ stateModal, setStateModal }) => {
    const { logout, usuario } = useAuth()

    const handleLogout = () => {
        logout()
    }

    const handleClose = () => {
        setStateModal(!stateModal)
    }
    console.log(stateModal)

    return (
        <>
            {stateModal ?
                (<div className="modalProfile">
                    <div onClick={handleClose} className="closeProfile">
                        <BsXLg />
                    </div>
                    <h1>{usuario.nome}</h1>

                    <div className="content">
                        <ul>
                            <NavLink to={"/profile"} onClick={handleClose} className={({ isActive }) => isActive && ""}>
                                <li> <BsPencilSquare /> Meu perfil</li>
                            </NavLink>

                            <NavLink to={"/about"} onClick={handleClose} className={({ isActive }) => isActive && ""}>
                                <li> <BsInfoCircle /> Sobre</li>
                            </NavLink>

                            <NavLink to={"/feedback"} onClick={handleClose} className={({ isActive }) => isActive && ""}> 
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