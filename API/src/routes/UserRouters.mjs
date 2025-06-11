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
    feedback,
    faq,
    likeClass,
    saveClasses,
    listSavedClasses,
    postInCommunity,
    listPosts,
    likeInPostCommunity,
    fixedPost,
    responsePost,
    deletePost,
    editPost,
    listFixedPosts,
    deleteResponse,
    editResponse
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

routerUser.post('/feedback', authGuard, feedback)

routerUser.post('/faq', authGuard, faq)

routerUser.patch('/class/:idClass/like', authGuard, likeClass)

routerUser.patch('/class/:idClass/save', authGuard, saveClasses)

routerUser.get('/listClassSaved', authGuard, listSavedClasses)

routerUser.post('/community/addPublish', authGuard, validate, postInCommunity)

routerUser.get('/community/posts', authGuard, listPosts)

routerUser.patch('/community/like', authGuard, validate, likeInPostCommunity)

routerUser.patch('/community/fixedPost', authGuard, validate, fixedPost)

routerUser.post('/community/response', authGuard, validate, responsePost)

routerUser.delete('/community/deletePost', authGuard, deletePost)

routerUser.put('/community/editPost', authGuard, editPost)

routerUser.get('/community/listFixed', authGuard, listFixedPosts)

routerUser.delete('/community/response/delete', authGuard, deleteResponse)

routerUser.put('/community/response/edit', authGuard, editResponse)

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