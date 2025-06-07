import "./Navbar.css"
import logo from "../../assets/images/LogoPNG.png"
import { NavLink } from "react-router-dom"
import { BsPerson, BsHouseDoor, BsList, BsBook, BsCollectionPlay, BsChatDots, BsSearch } from "react-icons/bs"
import { ModalProfile } from "../modal/ModalProfile"
import { useState } from "react"
import { useAuth } from "../../contexts/authContext"

export const Navbar = () => {
    const [stateModal, setStateModal] = useState(false)
    const { usuario } = useAuth()

    return (
        <nav className="navbar">
            <div className="logo">
                <NavLink to={"/loopisEdu"} className={"ative" ? "ativeLogo" : ""}>
                    <img src={logo} alt="logo da loopis" /> <span id="destaq">Edu </span>
                </NavLink>
            </div>

            <div className="search">
                <form>
                    <div className="inputSearch">
                        <BsSearch />
                        <input type="text" placeholder="Buscar conteúdo..." />
                    </div>
                </form>
            </div>

            <div className="links">
                <ul>
                    <li>
                        <NavLink to={"/loopisEdu"} className={"profileLink"}>
                            <span className="link"> <BsHouseDoor /> Início</span>
                        </NavLink>
                    </li>
                </ul>
                <ul>
                    {
                        usuario.lecionador && (
                            <li>
                                <NavLink to={"/course"} className={"profileLink"}>
                                    <span className="link"><BsBook /> Capacitações</span>
                                </NavLink>
                            </li>
                        )
                    }
                </ul>
                <ul>
                    <li>
                        <NavLink to={"/MyCapacitations"} className={"profileLink"}>
                            <span className="link"><BsCollectionPlay /> Meus Cursos</span>
                        </NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to={"/comunity"} className={"profileLink"}>
                            <span className="link"><BsChatDots /> Comunidade</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="localProfile">
                <ul>
                    <li>
                        <span onClick={() => setStateModal(!stateModal)} className="link profile">
                            <BsPerson />
                        </span>

                        <span onClick={() => setStateModal(!stateModal)} className="link menuMob">
                            <BsList />
                        </span>
                    </li>
                </ul>

                <ModalProfile stateModal={stateModal} setStateModal={setStateModal} />
            </div>
        </nav>
    )
}