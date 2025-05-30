import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer"
import crypto from "crypto"
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

//Gerando o token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        jwtSecret,
        { expiresIn: "7d" }
    );
}

//função de geração de token para validação de email
const generateTokenValidation = () => {
    return crypto.randomBytes(32).toString('hex')
}

//Rota de cadastro
export const register = async (req, res) => {
    const { nome, email, password } = req.body

    try {

        const user = await User.findOne({ email })

        //Validações
        if (user) {
            return res.status(422).json({ errors: ["Por favor, utilize outro E-mail"] })
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

        //Criando link de validação de E-mail
        const tokenValidation = generateTokenValidation()

        const link = `http://localhost:8080/api/users/verify-email/${tokenValidation}`

        newUser.emailVerificationToken = {
            token: tokenValidation,
            expires: Date.now() + 3600000
        }

        await newUser.save()

        //Enviando E-mail de verificação de conta

        //Configuração do nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_APP
            }
        })

        //Enviando email
        transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: newUser.email,
            subject: 'Verifique seu E-mail',
            html: ` 
                <h2>Olá, ${newUser.nome}!</h2>
                <p>Confirme seu e-mail clicando no link abaixo:</p>
                <a href="${link}">Verificar e-mail</a>
                <p>Este link expira em 1 hora.</p>
            `

        })


        if (!newUser) {
            return res.status(422).json({ errors: ["Houve um erro, por favor tente mais tarde"] })
        }

        res.status(201).json({
            _id: newUser._id,
            token: generateToken(newUser._id)
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Erro interno do servidor" })
        
    }
}

//Rota de login
export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })

        //Validações
        if (!user) {
            return res.status(422).json({ errors: ["Usuário não encontrado!"] })
        }

        //Verifica se o email está validado
        if(!user.isEmailVerified){
            return res.status(422).json({errors: ["Por favor valide seu E-mail, para fazer o login!"], resend: true})
        }

        //Verificando se a senha está correta
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(422).json({ errors: ["Senha incorreta!"] })
        }

        //Retornando usuário logado com o token
        res.status(201).json({
            _id: user._id,
            token: generateToken(user._id)
        })

    }
    catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Pegando usuários logados
export const getCurrentUser = async (req, res) => {
    const user = req.user
    console.log(user)
    res.status(200).json(user)
}


//Rota para atualizar usuário
export const updateUser = async (req, res) => {
    const { nome, bio, password } = req.body

    try {
        const reqUser = req.user
        const user = await User.findById(reqUser._id).select("-password")

        //Atualizando nome
        if (nome) {
            user.nome = nome
        }

        //Atualizando senha
        if (password) {
            const salt = await bcrypt.genSalt()
            const newHashPass = await bcrypt.hash(password, salt)
            user.password = newHashPass
        }

        if (bio) {
            user.bio = bio
        }

        await user.save()

        res.status(200).json(user)

    }
    catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor!" })
        console.log(error)
    }
}

//Rota para verificação de E-mail
export const verifyEmail = async (req, res) => {
    const { token } = req.params

    try{    
        const user = await User.findOne({
            'emailVerificationToken.token': token,
            'emailVerificationToken.expires': { $gt: Date.now() }
        })

        if(!user){
            return res.status(422).json({errors: ["Token inválido ou expirado!"]})
        }

        user.isEmailVerified = true
        user.emailVerificationToken = undefined

        await user.save()

        return res.status(200).json({msg: "E-mail verificado com sucesso!"})
    }
    catch(error){
        res.status(500).json({msg: "Erro interno do servidor!"})
        console.log(error)
    }
}

//Rota para reenvio de email de verificação
export const resendTokenValidation = async (req, res) => {
    const { email } = req.body

    try{
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({errors: ["Usuário não encontrado!"]})
        }

        if(user.isEmailVerified){
            return res.status(400).json({errors: ["E-mail já está verificado!"]})
        }

        const newToken = generateTokenValidation()

        const newLink = `http://localhost:8080/api/users/verify-email/${newToken}`

        user.emailVerificationToken = {
            token: newToken,
            expires: Date.now() + 3600000
        }

        await user.save()

        //Criando transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_APP
            }
        })

        //Reenviando E-mail
        transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: user.email,
            subject: 'Validação de E-mail',
            html: `
                <h2>Olá novamente, ${user.nome}!</h2>
                <p>Confirme seu e-mail clicando no link abaixo:</p>
                <a href="${newLink}">Verificar e-mail</a>
                <p>Este link expira em 1 hora.</p>
            `
        })

        return res.status(200).json({ msg: "E-mail de verificação reenviado com sucesso!" })

    }
    catch(error){
        return res.status(500).json({msg: "Erro interno do servidor!"})
    }
}

//Rota de resgate de usuário pelo ID
export const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id).select("-password")

        if (!user) {
            return res.status(404).json({ errors: ["Usuário não encontrado!"] })
        }

        res.status(200).json(user)

    }
    catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor!" })
        console.log(error)
    }
}
