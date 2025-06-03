import styles from "./AdminTools.module.css"
import { profileData } from "../../../contexts/profileContext"
import { useEffect, useState } from "react"
import { BsFillInfoCircleFill, BsFillShieldSlashFill } from "react-icons/bs";
import { ModalInfo } from "../../../components/modalInfo/ModalInfo";

export const AdminTools = () => {
    const { listAllUser, allUsers } = profileData()
    const [openInfo, setOpenInfo] = useState(null)

    useEffect(() => {
        listAllUser()
    }, [])

    const handleOpenInfo = (i) => {
        setOpenInfo(prev => (prev === i ? null : i))
    }


    return (
        <div className={styles.container}>
            <h2>AdminTools</h2>
            <div className={styles.list}>
                {allUsers.map((user, i) => (
                    <div className={styles.dataUser}>
                        <span className={user.active ? styles.unlock : styles.blocked}>
                            {user.nome} {!user.active && <><BsFillShieldSlashFill /></>}
                        </span>
                        {" - "}
                        <strong>{user.role}</strong>

                        <button onClick={() => handleOpenInfo(i)} className={styles.btnInfo}>
                            <BsFillInfoCircleFill />
                        </button>

                        <ModalInfo
                            title={user.nome}
                            content={user.bio}
                            role={user.role}
                            state={openInfo === i}
                            setState={setOpenInfo}
                            userId={user._id}
                            active={user.active}
                        />

                    </div>
                ))}
            </div>
        </div>
    )
}