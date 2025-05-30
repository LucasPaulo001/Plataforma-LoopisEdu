import express from "express";
const routerUser = express.Router();


//Controllers
import { 
    getCurrentUser, 
    register, 
    updateUser, 
    getUserById, 
    verifyEmail,
    resendTokenValidation
} from "../controllers/UserController.mjs";

import { login } from "../controllers/UserController.mjs";

//Middlewares
import validate from "../middlewares/handleValidation.mjs";
import { userCreateValidation } from "../middlewares/userValidations.mjs";
import { userLoginValidation } from "../middlewares/userValidations.mjs";
import { authGuard } from "../middlewares/authGuard.mjs";
import { userUpdateValidation } from "../middlewares/userValidations.mjs";

//Rotas
routerUser.post('/register', userCreateValidation(), validate, register);

routerUser.post('/login', userLoginValidation(), validate, login);

routerUser.get('/profile', authGuard, getCurrentUser)

routerUser.put('/updateUser', authGuard, userUpdateValidation(), validate, updateUser)

routerUser.get('/verify-email/:token', verifyEmail)

routerUser.post('/resend-validation', resendTokenValidation)

routerUser.get('/getUser/:id', getUserById)



export default routerUser;