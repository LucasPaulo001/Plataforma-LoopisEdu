import { BsGoogle, BsGithub } from "react-icons/bs"
import "./OauthLogin.css"

export const OauthLogin = () => {

    //URL de produção
        const BASE_URL =
            import.meta.env.MODE === "development"
                ? "http://localhost:8080"
                : import.meta.env.VITE_API_URL_PRODUCTION;

    const handleLoginGoogle = () => {

        window.location.href = `${BASE_URL}/api/users/google`
    }

    const handleLoginGitHub = () => {

        window.location.href = `${BASE_URL}/api/users/github`
    }

    return (

        //Botões de login (Google e GitHub)
        <div className="btnGG">
            <button onClick={handleLoginGoogle}>
                <BsGoogle />
            </button>
            <button onClick={handleLoginGitHub}>
                <BsGithub />
            </button>
        </div>
    )
}