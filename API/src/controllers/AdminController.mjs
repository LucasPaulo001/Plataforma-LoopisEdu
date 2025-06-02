import express from "express";
import User from "../models/User.mjs";
const adminRouter = express.Router();

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
    const { id }  = req.params
   
    try{    

        const user = await User.findByIdAndUpdate(id)

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
    const { id } = req.params

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