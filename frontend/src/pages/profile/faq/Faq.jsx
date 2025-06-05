import { useState, useEffect } from "react"
import styles from "./Faq.module.css"
import { BsRobot, BsSend } from "react-icons/bs";

export const Faq = () => {
    const [question, setQuestion] = useState("")
    const [response, setResponse] = useState("")

    const handleFaq = async (e) => {
        e.preventDefault()
        if(!question.trim()) return

        const minQuestion = question.toLowerCase()

        const apiFaq = 'http://localhost:8080/api/users/faq'
        try{
            const res = await fetch(apiFaq, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ question: minQuestion })
            })

            if(res.ok){
                setQuestion("")
            }

            const data = await res.json()
            setResponse(data.answer)
            console.log(data.answer)
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>LoopBot <BsRobot /></h1>
            
            <div className={styles.contentFaq}>
                {response ? (
                    <div className={styles.RespChat}>
                        {response}
                    </div>
                ): (
                    <span>Tire suas dúvidas sobre a plataforma :]</span>
                )}


                <form onSubmit={handleFaq} className={styles.formFaq}>
                    <div className={styles.localQuestion}>
                        <input 
                        placeholder="Qual sua dúvida sobre o sistema?" 
                        type="text" 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>

                    <button type="submit"><BsSend /></button>
                </form>
            </div>
        </div>
    )
}