import styles from "./Feedback.module.css"
import { useState, useEffect } from "react"
import { profileData } from "../../contexts/profileContext"

export const Feedback = () => {
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [content, setContent] = useState("")

    const { sendFeedBack, success, setSuccess } = profileData()

    const handleSubmit = (e) => {
        e.preventDefault()
        sendFeedBack(userName, userEmail, content)

        setUserName("")
        setUserEmail("")
        setContent("")
    }

    const clear = setTimeout(() => {
        setSuccess("")
    }, 8000)

    clearTimeout(clear)

    return (
        <div className={styles.container}>
            <h1>O que achou da nossa plataforma?</h1>
            {success && <span className={styles.success}>{success}</span>}
            <div className={styles.localForm}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputName}>
                        <input 
                        placeholder="Seu nome..." 
                        type="text" 
                        onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputName}>
                        <input 
                        placeholder="Seu E-mail" 
                        type="text" 
                        onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                    <textarea 
                    placeholder="Sua mensagem..." 
                    className={styles.content}
                    onChange={(e) => setContent(e.target.value)}
                    >
                    </textarea>

                    <div className={styles.btns}>
                        <button type="submit" className={styles.buttonSend}>Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}