import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const OauthRedirect = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        console.log(token)

        if (token) {
            localStorage.setItem("token", token);
            navigate("/loopisEdu"); 
        } else {
            navigate("/login");
        }
    }, []);
    return (
        <>
            <h2>Redirecionando...</h2>
        </>
    )
}