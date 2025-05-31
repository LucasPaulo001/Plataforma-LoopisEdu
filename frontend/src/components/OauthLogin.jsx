import {BsGoogle, BsGithub} from "react-icons/bs"
import "./OauthLogin.css"

export const OauthLogin = () => {

    const handleLoginGoogle = () => {
        window.location.href = 'http://localhost:8080/api/users/google'
    }

    const handleLoginGitHub = () => {
        window.location.href = 'http://localhost:8080/api/users/github'
    }

    return(
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