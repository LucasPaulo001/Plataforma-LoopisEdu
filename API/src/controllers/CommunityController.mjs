import WishBox from "../models/WishBox.mjs";
import Messages from "../models/Messages.mjs";
import User from "../models/User.mjs";


//Fazer postagem na comunidade (Presidente, Vice, Diretores e Lecionadores)
export const postInCommunity = async (req, res) => {
    const { subject, content } = req.body

    try {

        const newPostInCommunity = Messages.create({
            subject,
            content,
            author: req.user._id
        })

        res.status(200).json({
            newPostInCommunity
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Listar postagens na comunidade
export const listPosts = async (req, res) => {
    try{

        const postsInCommunity = await Messages.find()
        .populate("author", "nome role")
        .populate("responses.author", "nome role")
        .sort({ createdAt: -1 })

        res.status(200).json(postsInCommunity)

    }
    catch(error){
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Like em postagem do feed
export const likeInPostCommunity = async (req, res) => {
    const { idUser, idPost } = req.body

    try {

        const postInCommunity = await Messages.findById(idPost)

        if (!postInCommunity) {
            return res.status(404).json({ errors: ["Postagem não encontrada!"] })
        }

        const hasLiked = postInCommunity.likes.includes(idUser)

        if (hasLiked) {
            postInCommunity.likes.pull(idUser)
        }
        else {
            postInCommunity.likes.push(idUser)
        }

        postInCommunity.save()

        res.status(200).json({
            liked: !hasLiked,
            quantLikes: postInCommunity.likes.length
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Fixar Postagem (Presidente, Vice e Diretores)
export const fixedPost = async (req, res) => {
    const idUser = req.user._id
    const { idPost } = req.body

    const acceptedRoles = [
        'Presidente',
        'Vice-Presidente',
        'Diretor de Projetos',
        'Diretor de RH',
        'Diretor de Comercial',
        'Diretor de Marketing',
    ]

    try {

        const user = await User.findById(idUser).select("-password")

        //Validações de usuário
        if (!user) {
            return res.status(404).json({ errors: ["Usuário não encontrado!"] })
        }

        if (!acceptedRoles.includes(user.role)) {
            return res.status(422).json({ errors: ["Você não tem permissão suficientes para fixar postagens!"] })
        }

        const postInCommunity = await Messages.findById(idPost)

        //Validações
        if (!postInCommunity) {
            return res.status(404).json({ errors: ["Postagem não encontrada!"] })
        }

        postInCommunity.fixed = !postInCommunity.fixed

        await postInCommunity.save()

        return res.status(200).json({
            msg: `Postagem ${postInCommunity.fixed ? "fixada" : "desfixada"} com sucesso!`,
            post: postInCommunity
        });

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Listando postagens fixadas
export const listFixedPosts = async (req, res) => {
    try{

        const postInCommunity_fixed = await Messages
        .find({ fixed: true })
        .sort({ createdAt: -1 })

        res.json(postInCommunity_fixed)

    }
    catch(error){
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Responder Postagens
export const responsePost = async (req, res) => {
    const { idPost, content } = req.body
    const user = req.user._id

    try{

        const postInCommunity = await Messages.findById(idPost)

        if(!content.trim()){
            return res.status(422).json({ errors: ["Campo obrigatório!"] })
        }

        if(!postInCommunity){
            return res.status(404).json({ errors: ["Postagem não encontrada!"] })
        }

        const newResponse = {
            author: user,
            content: content
        }

        postInCommunity.responses.push(newResponse)

        await postInCommunity.save()

        res.status(200).json({ msg: "Resposta adicionada!", response: newResponse })

    }
    catch(error){
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Excluir resposta da postagem
export const deleteResponse = async (req, res) => {
    const { idPost, responseId } = req.body

    try{

        await Messages.findByIdAndUpdate(idPost, {
            $pull: { responses: { _id: responseId } }
        })

        res.status(200).json({ msg: "Resposta deletada com sucesso!" })

    }
    catch(error){
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Editar resposta em postagem
export const editResponse = async (req, res) => {
    const { idPost, responseId, content } = req.body
    
    try{
        
        const postInCommunity = await Messages.findById(idPost)

        if(!content.trim()){
            return res.status(422).json({ errors: ["Campo obrigatório!"] })
        }

        if(!postInCommunity){
            return res.status(404).json({ msg: "Postagem não encontrada!" })
        }

        const responses = postInCommunity.responses.id(responseId)

        if(!responses){
            return res.status(404).json({ msg: "Comentário não encontrada!" })
        }

        if(responses.author.toString() !== req.user.id){
            return res.status(403).json({ msg: "Não autorizado" });
        }   

        responses.content = content

        await postInCommunity.save()

        res.json({ message: "Comentário editado com sucesso", responses })

    }
    catch(error){
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
} 

//Excluir postagem da comunidade
export const deletePost = async (req, res) => {
    const { idPost } = req.body

    try{

        const postInCommunity = await Messages.findByIdAndDelete(idPost)

        if(!postInCommunity){
            res.status(402).json({ msg: "Postagem não encontrada!" })
        }

        res.status(200).json({ msg: "Postagem deletada!" })

    }
    catch(error){
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Editar postagem
export const editPost = async (req, res) => {
    const { idPost, subject, content } = req.body

    try{

        const postInCommunity = await Messages.findById(idPost)

        if(!subject || !content){
            return res.status(422).json({ msg: "Preencha todos os campos!" })
        }

        if(!postInCommunity){
            return res.status(404).json({ msg: "Postagem não encontrada!" })
        }

        postInCommunity.subject = subject
        postInCommunity.content = content

        await postInCommunity.save()

        res.status(200).json({msg: "Postagem editada com sucesso!", editPost})

    }
    catch(error){
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Rota de pedido de capacitação
export const sendWish = async (req, res) => {

    const { nome, description, tags } = req.body;
    const userId = req.user._id;

    try{

        //Criando nova caixa de desejos
        const newWishBox = await WishBox.create({
            nome, 
            author: userId,
            description,
            tags
        });

        res.status(200).json({ 
            msg: "Desejo salvo!", newWishBox
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({ msg: "Erro interno do servidor!" });
    }

}

//Listando listas de desejos
export const listWish = async (req, res) => {
    try{

        //Listando em ordem de "mais curtidos"
        const listWish = await WishBox.find().sort({ UPs: -1 }).populate("author");

        res.status(200).json(listWish);

    }
    catch(error){
        console.log(error);
        res.status(500).json({ msg: "Erro interno do servidor!" });
    }
}

//Rota para o Presidente, Vice e diretores aprovarem os desejos
export const aproveWish = async (req, res) => {
    const { wishId } = req.body;
    const userRole = req.user.role;

    const acceptedRoles = [
        'Presidente',
        'Vice-Presidente',
        'Diretor de Projetos',
        'Diretor de RH',
        'Diretor de Comercial',
        'Diretor de Marketing',
    ]

    try{

        const wishBox = await WishBox.findById(wishId);

        if(!wishBox){
            return res.status(404).json({ errors: ["'Caixa de desejos' não encontrada!"] });
        }

        if(!acceptedRoles.includes(userRole)){
            return res.status(422).json({ errors: ["Acesso negado!"] });
        }

        //Validações e modificação de estado
        const hasAproved = wishBox.approved

        if(hasAproved === true){
            wishBox.approved = false;
        }

        else{
            wishBox.approved = true;
        }

        await wishBox.save()

        res.status(200).json({
            aproved: !hasAproved
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({ msg: "Erro interno do servidor!" });
    }
}

//Funcionalidade de Up nos desejos
export const UpWish = async (req, res) => {
    const { wishId } = req.body;
    const userId = req.user._id;

    try{

        const wishBox = await WishBox.findById(wishId)

        if(!wishBox){
            return res.status(404).json({ errors: ["'Caixa de desejos' não encontrada!"] });
        }

        const hasUp = wishBox.UPs.includes(userId);

        if(hasUp){
            wishBox.UPs.pull(userId);
        }
        else{
            wishBox.UPs.push(userId);
        }

        await wishBox.save();

        res.status(200).json({ 
            UP: !hasUp
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({ msg: "Erro interno do servidor!" });
    }
}

//Editando caixa de desejos
export const editWish = async (req, res) => {
    const { wishId, nome, description, tags } = req.body;

    try{

        const wishBox = await WishBox.findById(wishId);

        if(!wishBox){
            return res.status(404).json({ errors: ["Caixa de desejo não encontrada!"] });
        }

        //Salvando o que for editado

        if(nome){
            wishBox.nome = nome;
        }
        if(description){
            wishBox.description = description;
        }
        if(tags){
            wishBox.tags = tags;
        }

        await wishBox.save();

        res.status(200).json({ msg: "Desejo editado!" })
    }
    catch(error){
        console.log(error);
        res.status(500).json({ msg: "Erro interno do servidor!" });
    }
}

//Deletar caixa de desejos
export const wishDelete = async (req, res) => {
    const { wishId } = req.body;

    try{

        const wishBox = await WishBox.findByIdAndDelete(wishId);

        if(!wishBox){
            return res.status(404).json({ errors: ["Caixa de desejo não encontrada!"] });
        }

        res.status(200).json({ msg: "Solicitação de capacitação deletada!!" });

    }
    catch(error){
        console.log(error);
        res.status(500).json({ msg: "Erro interno do servidor!" });
    }
}

//Listar sugestões aceitas
export const acceptedWishes = async (req, res) => {
    try{

        const acceptedWishes = await WishBox.find({ approved: true }).populate("author");

        if(!acceptedWishes){
            return res.status(404).json({ errors: ["Caixa de desejo não encontrada!"] });
        }

        res.status(200).json(acceptedWishes);

    }
    catch(error){
        console.log(error);
        res.status(500).json({ msg: "Erro interno do servidor!" });
    }
}


