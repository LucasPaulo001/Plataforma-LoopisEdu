import { body } from "express-validator";

export const userCreateValidation = () => {
    return[
        body("nome")
        .isString()
        .withMessage("O nome é obrigatório!")
        .isLength({min: 3})
        .withMessage("O nome precisa ter no mínimo 3 caracteres"),

        body("email")
        .isString()
        .withMessage("O E-mail é obrigatório!")
        .isEmail()
        .withMessage("Insira um E-mail válido!"),

        body("password")
        .isString()
        .withMessage("A senha é obrigatória!")
        .isLength({min: 6})
        .withMessage("A senha precisa ter no mínimo 6 caracteres"),

        body("confirmPass")
        .isString()
        .withMessage("A confirmação de senha é obrigatória")
        .custom((value, {req}) => {
            if(value != req.body.password){
                throw new Error("As senhas não são iguais!")
            }

            return true
        })
    ]
}

export const userLoginValidation = () => {
    return[
        body("email")
        .isString()
        .withMessage("O E-mail é obrigatório!")
        .isEmail()
        .withMessage("Insira um E-mail válido!"),

        body("password")
        .isString()
        .withMessage("A senha é obrigatória")
    ]
}

export const userUpdateValidation = () => {
    return[
        body("nome")
        .optional()
        .isLength({min: 3})
        .withMessage("O nome precisa ter no mínimo 3 caracteres"),

        body("password")
        .optional()
        .isLength({min: 6})
        .withMessage("A senha precisa ter no mínimo 6 caracteres")

    ]
}