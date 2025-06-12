import { createContext, useContext, useState } from "react";

const WishContext = createContext();

export const WishProvider = ({ children }) => {
    const[success, setSuccess] = useState("");
    const[wish, setWish] = useState([]);


    //Enviando desejo
    const sendWish = async (nome, description, tags) => {
        const sendAPI = 'http://localhost:8080/api/community/sendWish'

        const tagDeffrag = tags.split(',');

        try{

            const res = await fetch(sendAPI, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ nome, description, tags: tagDeffrag })
            })

            const data = await res.json();

            if(res.ok){
                console.log(data);
                setSuccess("Deseso salvo com sucesso!");
                listWish()
                setTimeout(() => {
                    setSuccess("");
                }, 6000)
            }

        }
        catch(error){
            console.log(error)
        }
    }

    //Listando desejos
    const listWish = async () => {
        const listAPI = 'http://localhost:8080/api/community/listWish'

        try{

            const res = await fetch(listAPI, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
                
            });

            const data = await res.json()

            if(res.ok){
                setWish(data)
            }

        }
        catch(error){
            console.log(error);
        }
    }

    //Dar UP em sugestões de outros usuários
    const UPwish = async (wishId) => {
        const upAPI = 'http://localhost:8080/api/community/Up';

        try{

            const res = await fetch(upAPI, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ wishId })
            })

            const data = await res.json();

            if(res.ok){
                console.log(data);
            }

        }
        catch(error){
            console.log(error);
        }
    }


    return(
        <WishContext.Provider value={{
            sendWish, 
            success, 
            listWish, 
            wish,
            UPwish
        }}>
            {children}
        </WishContext.Provider>
    )
}

export const useWish = () => {
    return useContext(WishContext);
}