import { useAuth } from "../../contexts/authContext"
import { useUpdate } from "../../contexts/updateContext"
import "./Profile.css"
import { useState, useEffect } from "react"
import { BsPerson, BsLock } from "react-icons/bs"

export const Profile = () => {
    const { usuario } = useAuth()
    const [select, setSelect] = useState("editar")
    const [nomeEdited, setNomeEdited] = useState("")
    const [passwordEdited, setPasswordEdited] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    const { updateUser, errors, setErrors, setSuccess, success } = useUpdate()

    //Atualizando dados ao modificar o usuário
    useEffect(() => {
        setNomeEdited(usuario.nome)
    }, [usuario])

    //Função de submit dos dados editados
    const handleSubmit = (e) => {
        e.preventDefault()

        //Validações
        if (passwordRepeat !== passwordEdited) {
            setErrors(["As senhas não são iguais!"])
            return
        }

        if (passwordEdited && passwordEdited.length < 6) {
            setErrors(["A senha tem que ter no mínimo 6 caracteres!"])
            return
        }

        if(nomeEdited.length < 3 || nomeEdited.length == 0){
            setErrors(["O nome tem que ter no mínimo 3 caracteres"])
            return
        }

        
        console.log(nomeEdited, passwordEdited)

        //Passando dados para o contexto
        updateUser(nomeEdited, passwordEdited)
    }

    //Limpando mensagem
    setTimeout(() => {
        setSuccess("")
    }, 7000)

    

    if (!usuario) return <p>Carregando...</p>

    return (
        <div className="containerProfile">
            {/*Janela lateral do perfil*/}
            {Array.isArray(errors) && errors.map((err, i) => (
                <span key={i} className="errorMsg">{err || errors}</span>
            ))}
            {success && <span className="successMsg">{success}</span>}
            <div className="contentProfile">
                <div className="contentDataUser">
                    <div className="dataUser">
                        <h1>{usuario.nome}</h1>
                        <h5>{usuario.role}</h5>
                    </div>
                    <div className="listOptions">
                        <ul>
                            <li className={select === "editar" && "selected"} onClick={() =>
                                setSelect("editar")}>Editar dados
                            </li>

                            <li className={select === "hierarquia" && "selected"} onClick={() =>
                                setSelect("hierarquia")}>
                                Dados (Hierarquia)
                            </li>

                            <li className={select === "faq" && "selected"} onClick={() =>
                                setSelect("faq")}>
                                FAQ
                            </li>

                        </ul>
                    </div>
                </div>
                {/*Janela central do perfil*/}

                {/*Editar dados */}
                {select == "editar" && (
                    <div className="menuProfile">
                        <div className="title">
                            <h1>Conta</h1>
                            <h5>Edite suas prefências e mais...</h5>
                        </div>
                        <div className="data">
                            {
                                usuario.googleId ? (
                                    <form onSubmit={handleSubmit}>
                                        <div className="localInput">
                                            <label htmlFor="nome">Nome:</label>
                                            <BsPerson />
                                            <input
                                                placeholder="Nome"
                                                type="text"
                                                value={nomeEdited}
                                                onChange={(e) => setNomeEdited(e.target.value)}
                                            />
                                        </div>

                                        <button type="submit" className="btnSubmit">Salvar</button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="localInput">
                                            <label htmlFor="nome">Nome:</label>
                                            <BsPerson />
                                            <input
                                                placeholder="Nome"
                                                type="text"
                                                value={nomeEdited}
                                                onChange={(e) => setNomeEdited(e.target.value)}
                                            />
                                        </div>
                                        <div className="localInput">
                                            <label htmlFor="password">Nova Senha:</label>
                                            <BsLock />
                                            <input
                                                placeholder="Nova senha..."
                                                type="password"
                                                onChange={(e) => setPasswordEdited(e.target.value)}
                                            />
                                        </div>

                                        <div className="localInput">
                                            <label htmlFor="password">Repita a Senha:</label>
                                            <BsLock />
                                            <input
                                                placeholder="Nova senha..."
                                                type="password"
                                                onChange={(e) => setPasswordRepeat(e.target.value)}
                                            />
                                        </div>

                                        <button type="submit" className="btnSubmit">Salvar</button>
                                    </form>
                                )
                            }
                        </div>
                    </div >
                )}

                {/*Tela de hierarquia */}
                {
                    select == "hierarquia" && (

                        <div className="menuProfile">
                            <h1>Tela de Hierarquia empresarial</h1>
                        </div>
                    )
                }

                {/*Tela de faq */}
                {
                    select == "faq" && (

                        <div className="menuProfile">
                            <h1>Tela de FAQ</h1>
                        </div>
                    )
                }
            </div >
        </div >
    )
}