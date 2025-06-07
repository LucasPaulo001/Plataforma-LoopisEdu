import loopbot from "../../assets/images/loopbot.png"
import styles from "./LoopBot.module.css"
import { BsRobot } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export const LoopBot = () => {


    return (
        <div className={styles.container}>
            <div className={styles.imgLB}>
                <span className={styles.nuvem}></span>
                <img src={loopbot} alt="" />
            </div>
            <div className={styles.apresentation}>
                <h2>Conheça o LoopBot, o seu assistente pessoal da plataforma!</h2>
                <p>LoopBot é o chatbot oficial da plataforma Loopis Edu, projetado para oferecer suporte
                    inteligente, ágil e acessível aos usuários da plataforma. vá em 'FAQ' </p>
                <div className={styles.btnBoot}>

                    <NavLink to={'/profile'}>
                        <button>
                            <BsRobot />
                        </button>
                    </NavLink>

                </div>
            </div>
        </div >
    )
}