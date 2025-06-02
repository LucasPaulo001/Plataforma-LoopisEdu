import express from "express";
const routerUser = express.Router();
import jwt from "jsonwebtoken"


//Controllers
import { 
    getCurrentUser, 
    register, 
    updateUser, 
    getMe, 
    verifyEmail,
    resendTokenValidation,
    listEmployee,
    feedback
} from "../controllers/UserController.mjs";

import { login } from "../controllers/UserController.mjs";

//Middlewares
import validate from "../middlewares/handleValidation.mjs";
import { userCreateValidation } from "../middlewares/userValidations.mjs";
import { userLoginValidation } from "../middlewares/userValidations.mjs";
import { authGuard } from "../middlewares/authGuard.mjs";
import { userUpdateValidation } from "../middlewares/userValidations.mjs";
import passport from "passport";

//Rotas comuns a usuários
routerUser.post('/register', userCreateValidation(), validate, register);

routerUser.post('/login', userLoginValidation(), validate, login);

routerUser.get('/profile', authGuard, getCurrentUser)

routerUser.put('/updateUser', authGuard, userUpdateValidation(), validate, updateUser)

routerUser.get('/verify-email/:token', verifyEmail)

routerUser.post('/resend-validation', resendTokenValidation)

routerUser.get('/me', authGuard, getMe)

routerUser.get('/listEmployee', authGuard, listEmployee)

routerUser.get('/feedback', authGuard, feedback)


//google

routerUser.get("/google", passport.authenticate("google", {scope: ["profile", "email"] }))

routerUser.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:5173/api/users/login" }),
    (req, res) => {
        const token = jwt.sign({id: req.user._id}, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.redirect(`http://localhost:5173/oauth-redirect?token=${token}`)
    }
)


//Github
routerUser.get("/github", passport.authenticate("github", {scope: ["user:email"]}) )

routerUser.get("/github/callback",
    passport.authenticate("github", { failureRedirect: "http://localhost:5173/api/users/login" }),
    (req, res) => {
        const token = jwt.sign({id: req.user._id}, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.redirect(`http://localhost:5173/oauth-redirect?token=${token}`)
    }
)


export default routerUser;