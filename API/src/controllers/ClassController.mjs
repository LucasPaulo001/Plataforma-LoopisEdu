import Class from "../models/Class.mjs";
import User from "../models/User.mjs";


//Função de envio de aulas
export const uploadClass = async (req, res) => {
    const { 
        title, 
        description, 
        youtubeLink, 
        thumbnailVideo,
        category
    } = req.body

    //Pegando usuário logado
    const userSend = req.user

    try{

        //Validação (se ele tem permição de lecionador)
        if (!userSend.lecionador){
            return res.status(422).json({ errors: ["Você não tem permissão de 'lecionador'!"] })
        }

        //Criando schema
        const newClass = await Class.create({
            title,
            description,
            youtubeLink,
            thumbnailVideo,
            category,
            author: userSend._id
        })

        res.status(200).json(newClass)

    }
    catch(error){
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Linstando todas as aulas
export const getClass = async (req, res) => {
    try{
        //Aulas em ordem de envio
        const classes = await Class.find().sort({ createDate: -1 }).populate("author", "id")

        res.status(200).json(classes)
    }
    catch(error){
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//listando aula única
export const getUniqueClass = async (req, res) => {
    const { id } = req.params

    try{

        const classes = await Class.findById(id)

        res.status(200).json(classes)

    }
    catch(error){
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

