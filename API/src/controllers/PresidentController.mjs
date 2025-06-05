import User from "../models/User.mjs";

//Rota de rebaixamento de cargo para membror
export const removeEmployee = async (req, res) => {
    const { id } = req.body

    try {
        const user = await User.findById(id).select("-password")

        if (!user) {
            return res.status(404).json({ errors: ["Usuário não encontrado!"] })
        }

        user.role = "Membro"

        await user.save()

        res.status(200).json({ msg: "Usuário rebaixado a 'Membro'!" })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Rota para promoção
export const promotion = async (req, res) => {
    const { employee, id } = req.body

    const employeeSelection = [
        'Presidente',
        'Vice-Presidente',
        'Diretor de Projetos',
        'Diretor de RH',
        'Diretor de Comercial',
        'Diretor de Marketing',
        'Trainee',
        'admin'
    ]

    try {
        const user = await User.findById(id).select("-password")
        const userLogged = req.user

        if (!user) {
            return res.status(404).json({ errors: ["Usuário não encontrado!"] })
        }

        if (!employeeSelection.includes(employee)) {
            return res.status(422).json({ errors: ["Cargo não existe!"] })
        }

        if (user.role === employee) {
            return res.status(422).json({ errors: [`O usuário '${user.nome}' já é um '${user.role}'`] })
        }

        if (userLogged.role !== "Presidente") {
            return res.status(422).json({ errors: ["Acesso negado, Permissões insuficientes!"] })
        }

        user.role = employee

        await user.save()

        res.status(200).json({ msg: `Usuário promovido a ${employee}` })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Rota para atribuição de lecionador
export const addLecionador = async (req, res) => {
    const { id } = req.body

    try {
        const user = await User.findById(id).select("-password")

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" })
        }

        if (user.lecionador) {
            return res.status(422).json({ errors: [`O usuário '${user.nome}' já é um lecionador!!`] })
        }

        user.lecionador = true

        await user.save()

        res.status(200).json({ msg: `Usuário '${user.nome}' é agora um lecionador!!` })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Remover lecionador
export const removeLecionador = async (req, res) => {
    const { id } = req.body

    try {
        const user = await User.findById(id).select("-password")

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" })
        }

        user.lecionador = false

        await user.save()

        res.status(200).json({ msg: `Usuário '${user.nome}' não é mais lecionador!!` })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

//Mudar setor de usuários
export const addSetor = async (req, res) => {
    const { setor, id } = req.body

    const setoresSelect = [
        'Projetos',
        'Comercial',
        'Marketing',
        'Recursos Humanos',
    ]

    try {
        const user = await User.findById(id).select("-password")

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" })
        }

        if (!setoresSelect.includes(setor)) {
            return res.status(422).json({ errors: ["Setor inválido!"] })
        }

        user.setores = setor

        await user.save()

        res.status(200).json({ msg: `Usuário, '${user.nome}' agora é do setor de ${setor}!` })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}


//Remover setor do usuário
export const removeSetor = async (req, res) => {
    const { id } = req.body

    try {
        const user = await User.findById(id).select("-password")

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" })
        }

        if(user.setores.length == 0){
            return res.status(404).json({ msg: "Usuário não está em nenhum setor!" })
        }

        const setorUser = user.setores[user.setores.length - 1]

        user.setores.pop()

        await user.save()

        res.status(200).json({ msg: `Usuário não é mais do setor de ${setorUser}`})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Erro interno do servidor!" })
    }
}

