import styles from "./ModalInfo.module.css"
import { BsXLg } from "react-icons/bs"
import { profileData } from "../../contexts/profileContext"
import { useAuth } from "../../contexts/authContext"


export const ModalInfo = ({ title, content, role, state, setState, userId, active }) => {

    const { blockUsers, unlockUser, listAllUser, errors, setErrors } = profileData()
    const { usuario } = useAuth()


    const handleBlock = async () => {
        const success = await blockUsers(userId)
        if (success) {
            listAllUser()
        }
    }

    const handleUnlock = async () => {
        const success = await unlockUser(userId)
        if (success) {
            listAllUser()
        }
    }

    const clear = setTimeout(() => {
        setErrors("")
    }, 8000)



    return (
        <>
            {state && (
                <div className={styles.container}>
                    <div className={styles.content}>
                        <BsXLg onClick={() => (setState(!state))} />
                        <h1>{title} - {role}</h1> <br /> {active ? <strong>Acesso ativo</strong> :
                            <strong>Acesso Bloquado</strong>}
                        {errors && <span className={styles.infoMsg}>{errors}</span>}
                        <div>
                            <h3><strong>Biografia</strong></h3>
                            <p>{content === undefined ? `${title} não tem Biografia :(` : content}

                            </p>
                        </div>
                        {userId.toString() === usuario._id.toString() ? (
                            <></>
                        ) : (
                            <div className={styles.btns}>
                                <button onClick={handleBlock}>Bloquear</button>
                                <button onClick={handleUnlock}>Desbloquear</button>
                            </div>
                        )}
                    </div>
                </div>)
            }
        </>
    )
}