import { useState, useEffect } from "react"
import styles from "./Hierarchy.module.css"
import { profileData } from "../../../contexts/profileContext"
import { useAuth } from "../../../contexts/authContext"
import { BsThreeDotsVertical } from "react-icons/bs";
import { MenuTools } from "./MenuTools";

export const Hierarchy = () => {
    const { Hierarchy, listHierarchy } = profileData()
    const { usuario } = useAuth()
    const [menuOpenId, setMenuOpenId] = useState(false)

    useEffect(() => {
        listHierarchy()
    }, [])

    const cargos = [
        { titulo: "Presidente", role: ["Presidente"] },
        {
            titulo: "Diretores",
            role: [
                "Diretor de Projetos",
                "Diretor de RH",
                "Diretor de Comercial",
                "Diretor de Marketing",
            ]
        },
        { titulo: "Setor de Projetos", role: ["Projetos"] },
        { titulo: "Setor de Comercial", role: ["Comercial"] },
        { titulo: "Setor de Marketing", role: ["Marketing"] },
        { titulo: "Setor de RH", role: ["Recursos Humanos"] },
        { titulo: "Trainee", role: ["Trainee"] }
    ]

    return (
        <div className={styles.container}>
            {cargos.map((cargo, idx) => {
                const membros = Hierarchy.filter(user => cargo.role.includes(user.role));
                return (
                    <div className={styles.localEmployee} key={idx}>
                        <h2>{cargo.titulo}</h2>
                        <div className={styles.localItem}>
                            {membros.length === 0 ? (
                                <p>Ninguém por aqui...</p>
                            ) : (
                                membros.map((employee) => (
                                    <span className={styles.item} key={employee._id}>
                                        <strong>{employee.role}</strong>
                                        {employee.nome}
                                        <div className={styles.localTools}>
                                            {(
                                                (usuario.role === "Presidente" && usuario._id !== employee._id) 
                                                ||
                                                usuario.role === "admin"
                                            ) && (
                                                    <>
                                                        <button
                                                            className={styles.tools}
                                                            onClick={() => setMenuOpenId(prev =>
                                                                prev === employee._id ? null : employee._id
                                                            )}
                                                        >
                                                            <BsThreeDotsVertical />
                                                        </button>
                                                        {menuOpenId === employee._id && (
                                                            <MenuTools
                                                                data={employee}
                                                                onSuccess={() => {
                                                                    listHierarchy();
                                                                    setMenuOpenId(null);
                                                                }}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                        </div>
                                    </span>
                                ))
                            )}
                        </div>
                    </div>
                );
            })}

        </div>
    )
}