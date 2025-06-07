import styles from "./MenuTools.module.css"
import { TbSchool, TbSchoolOff } from "react-icons/tb";
import { BsTag } from "react-icons/bs";
import { useClass } from "../../../contexts/classesContext";
import { useAuth } from "../../../contexts/authContext";
import { profileData } from "../../../contexts/profileContext";
import { useState } from "react";

export const MenuTools = ({ data, onSuccess }) => {
    const { addLecionador, removeLecionador } = useClass()
    const { chooseEmployee, chooseSetor } = profileData()
    const [employee, setEmployee] = useState("")
    const [setor, setSetor] = useState("")

    const idUser = data._id

    //Função para adicionar Lecionador
    const handleLecionador = async () => {
        await addLecionador(idUser)
        if(onSuccess){
            onSuccess()
        }
    }

    //Função para remover Lecionador
    const handleRemoveLec = async () => {
        await removeLecionador(idUser)
        if(onSuccess){
            onSuccess()
        }
    }

    //Função para escolher a diretoria
    const handleChoose = async () => {
        console.log(employee)
        await chooseEmployee(employee, data._id)
        if(onSuccess){
            onSuccess()
        }

    }

    //Função para escolher o setor
    const handleChooseSetor = async () => {
        await chooseSetor(setor, data._id)
        if(onSuccess){
            onSuccess()
        }
    }



    return(
        <div className={styles.containerMenuTools}>
            <strong>{data.nome} - {data.role}</strong>
            <hr />
            {data.lecionador && <span className={styles.tagLEC}>Lecionador!!<BsTag /></span>}
            
            <h4>Opções de Lecionador</h4>
            <div className={styles.localBtns}>
                
                <button onClick={handleLecionador} className={styles.activeLec}>
                    {
                        data.lecionador ? (
                            <span className={styles.isLecionador}>
                                <TbSchool />
                            </span>
                        ) : (
                            <span className={styles.notLecionador}>
                                <TbSchool />
                            </span>
                        )
                    }
                </button>
                <button onClick={handleRemoveLec} className={styles.desactiveLec}>
                    <TbSchoolOff />
                </button>
            </div>
            <div className={styles.actions}>
                <div className={styles.modifyDirector}>
                    <h4>Modificação de Diretoria</h4>
                    <select onChange={(e) => setEmployee(e.target.value)} className={styles.select}>
                        <option selected>{data.role}</option>
                        <option disabled selected>Selecione a diretoria</option>
                        <option value="Diretor de Projetos">Diretor de Projetos</option>
                        <option value="Diretor de RH">Diretor de RH</option>
                        <option value="Diretor de Marketing">Diretor de Marketing</option>
                        <option value="Diretor de Comercial">Diretor de Comercial</option>
                    </select>
                    <button onClick={handleChoose}>Salvar diretoria</button>
                </div>

                <div className={styles.modifySetor}>
                    <h4>Modificação de Setor</h4>
                    <select onChange={(e) => setSetor(e.target.value)} className={styles.select} name="" 
                    id="">
                        <option selected>{data.role}</option>
                        <option value="Projetos">Projetos</option>
                        <option value="Recursos Humanos">RH</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Comercial">Comercial</option>
                    </select>
                    <button onClick={handleChooseSetor}>Salvar setor</button>
                </div>
            </div>
        </div>
    )
}