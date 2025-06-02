
//Middleware para tratar de roles no geral
export const roleGuard = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user

        if(!user || !allowedRoles.includes(user.role)){
            return res.status(403).json({ msg: "Acesso negado, Permissões insuficientes!" })
        }

        next()
    }
}

