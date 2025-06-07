import { Classes } from "../../components/classes/Classes";
import { useAuth } from "../../contexts/authContext";
import "./Home.css"
import { useEffect } from "react"
import { LoopBot } from "../../components/LoopBot/LoopBot";

export const Home = () => {

    const { usuario } = useAuth()

    useEffect(() => {
        console.log(usuario)
    }, [usuario])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);
            window.history.replaceState({}, document.title, "/loopisEdu");
            window.location.reload(); 
        }
    }, []);


    return (
        <>
            <div className="heroPage">
                <h1>Bem vindo(a), {usuario.nome}</h1>
            </div>
            <Classes />
            <div className="localSeparator">
                <span className="separator"></span>
            </div>
            <LoopBot />
        </>
    )
}
