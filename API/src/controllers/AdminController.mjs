import User from "../models/User.mjs";

//Rotas

//Listar todos os usuários independente de função
export const list_all_users = async (req, res) => {
    try{

        const users = await User.find().select("-password")

        res.status(200).json({ users })

    }
    catch(error){
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Bloquear contas
export const block_Account = async (req, res) => {
    const { id }  = req.body
   
    try{    
        const idUser = req.user
        const user = await User.findById(id).select("-password")

        if(user._id.toString() === idUser._id.toString()){
            return res.status(422).json({ msg: "Você não poder bloquer o próprio acesso!" })
        }

        if(user.role === "admin"){
            return res.status(422).json({ msg: "Você não pode bloquear outro admin!" })
        }

        if(user.role === "Presidente"){
            return res.status(422).json({ msg: "Você não pode bloquear o Presidente!" })
        }

        if(!user){
            return res.status(404).json({ errors: ["Usuário não encontrado!"] })
        }

        user.active = false

        await user.save()

        res.status(200).json({ msg: "Usuário bloqueado com sucesso!" })

    }
    catch(error){
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Desbloquear usuários
export const unlock_Account = async (req, res) => {
    const { id } = req.body

    try{

        const user = await User.findById(id)

        if(!user){
            return res.status(404).json({ errors: ["Usuário não encontrado!"] })
        }

        user.active = true

        await user.save()

        res.status(200).json({ msg: "Usuário desbloqueado com sucesso!" })

    }
    catch(error){
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}