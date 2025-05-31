import { useAuth } from "../../contexts/authContext";
import "./Home.css"
import { useEffect } from "react"

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
        </>
    )
}
