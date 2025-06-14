import { createContext, useContext, useState } from "react";

const WishContext = createContext();

export const WishProvider = ({ children }) => {
    const [success, setSuccess] = useState("");
    const [wish, setWish] = useState([]);


    //Enviando desejo
    const sendWish = async (nome, description, tags) => {
        const sendAPI = 'http://localhost:8080/api/community/sendWish'

        //Separando cada tag por vírgula
        const tagDeffrag = tags.split(',');

        try {

            const res = await fetch(sendAPI, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ nome, description, tags: tagDeffrag })
            })

            const data = await res.json();

            if (res.ok) {
                console.log(data);
                setSuccess("Deseso salvo com sucesso!");
                listWish()
                setTimeout(() => {
                    setSuccess("");
                }, 6000)
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    //Listando desejos
    const listWish = async () => {
        const listAPI = 'http://localhost:8080/api/community/listWish'

        try {

            const res = await fetch(listAPI, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }

            });

            const data = await res.json()

            if (res.ok) {
                setWish(data)
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    //Dar UP em sugestões de outros usuários
    const UPwish = async (wishId) => {
        const upAPI = 'http://localhost:8080/api/community/Up';

        try {

            const res = await fetch(upAPI, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ wishId })
            })

            const data = await res.json();

            if (res.ok) {
                console.log(data);
                if (data.UP) {
                    setSuccess("UP aplicado!")
                }

                else {
                    setSuccess("UP removido!")
                }

                setTimeout(() => {
                    setSuccess("")
                }, 5000)
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    //Aceitar sugestão
    const aceptWish = async (wishId) => {
        const aceptAPI = 'http://localhost:8080/api/community/aproveWish';

        try {

            const res = await fetch(aceptAPI, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ wishId })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.aproved) {
                    setSuccess("Sugestão aprovada!");
                }
                else {
                    setSuccess("Sugestão desaprovada!");
                }
                setTimeout(() => {
                    setSuccess("")
                }, 5000);
                console.log(data);
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    //Deletando sugestões
    const deleteWish = async (wishId) => {
        const deleteAPI = 'http://localhost:8080/api/community/wishDelete';

        try {

            const res = await fetch(deleteAPI, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ wishId })
            })

            const data = await res.json()

            if (res.ok) {
                listWish()
                setSuccess(data.msg);
                setTimeout(() => {
                    setSuccess("")
                }, 5000)
                console.log(data);
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    //Editar sugestão
    const wishEdit = async (wishId, nome, description, tags) => {
        const editAPI = 'http://localhost:8080/api/community/editWish'

        try {

            const tagsArray = Array.isArray(tags)
                ? tags.map(tag => tag.trim())
                : tags.split(',').map(tag => tag.trim());

            const res = await fetch(editAPI, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ wishId, nome, description, tags: tagsArray })
            })

            const data = await res.json()

            if (res.ok) {
                listWish()
                console.log(data)
            }

        }
        catch (error) {
            console.log(error)
        }

    }


    return (
        <WishContext.Provider value={{
            sendWish,
            success,
            listWish,
            wish,
            UPwish,
            aceptWish,
            deleteWish,
            wishEdit
        }}>
            {children}
        </WishContext.Provider>
    )
}

export const useWish = () => {
    return useContext(WishContext);
}