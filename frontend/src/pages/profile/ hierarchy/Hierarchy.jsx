import { useState, useEffect } from "react"
import styles from "./Hierarchy.module.css"
import { profileData } from "../../../contexts/profileContext"

export const Hierarchy = () => {
    const { Hierarchy, listHierarchy } = profileData()

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
                "Diretor de Marketing"
            ]
        },
    ]

    return (
        <div className={styles.container}>
            {cargos.map((cargo, idx) => (
                <div className={styles.localEmployee} key={idx}>
                    <h2>{cargo.titulo}</h2>
                    {Hierarchy.filter(user => cargo.role.includes(user.role)).map((employee, i) => (
                        <>
                        <span key={`${cargo.titulo}-${i}`}>
                            {employee.role} {" - "}
                            {employee.nome}
                        </span>
                        </>
                    ))}
                </div>
            ))}
        </div>
    )
}