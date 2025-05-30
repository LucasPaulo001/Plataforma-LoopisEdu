import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

//Gerando o token
const generateToken = (id) => {
    return jwt.sign(
        {id},
        jwtSecret,
        { expiresIn: "7d" }
    );
}

//Rota de cadastro
export const register = async (req, res) => {
    const { nome, email, password } = req.body

    try{

        const user = await User.findOne({email})

        //Validações
        if(user){
            return res.status(422).json({errors: ["Por favor, utilize outro E-mail"]})
        }
        
        //Criptografia de senha
        const salts = await bcrypt.genSalt()
        const hashPass = await bcrypt.hash(password, salts)

        //Criando o usuário
        const newUser = await User.create({
            nome,
            email,
            password: hashPass
        })

        if(!newUser){
            return res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde"]})
        }

        res.status(201).json({
            _id: newUser._id,
            token: generateToken(newUser._id)
        })
    }
    catch(error){
        return res.status(500).json({msg: "Erro interno do servidor"})
    }
}

//Rota de login
export const login = async (req, res) => {
    const { email, password } = req.body

    try{

        const user = await User.findOne({email})

        //Validações
        if(!user){
            return res.status(422).json({errors: ["Usuário não encontrado!"]})
        }

        if(!(await bcrypt.compare(password, user.password))){
            return res.status(422).json({errors: ["Senha incorreta!"]})
        }

        //Retornando usuário logado com o token
        res.status(201).json({
            _id: user._id,
            token: generateToken(user._id)
        })

    }
    catch(error){
        res.status(500).json({msg: "Erro interno do servidor!"})
    }
}

//Pegando usuários logados
export const getCurrentUser = async (req, res) => {
    const user = req.user
    console.log(user)
    res.status(200).json(user)
}