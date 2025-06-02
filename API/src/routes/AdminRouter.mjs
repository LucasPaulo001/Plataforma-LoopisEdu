import express from "express";
const routerAdmin = express.Router();

//Importando funções do controller
import { block_Account, list_all_users, unlock_Account } from "../controllers/AdminController.mjs";

//Middlewares
import { authGuard } from "../middlewares/authGuard.mjs";
import { roleGuard } from "../middlewares/roleGuard.mjs";
import validate from "../middlewares/handleValidation.mjs";

//Rotas
routerAdmin.get('/listAll', authGuard, roleGuard("admin"), list_all_users)

routerAdmin.post('/blockAccount/user/:id', authGuard, validate, block_Account)

routerAdmin.post('/unlockAccount/user/:id', authGuard, validate, unlock_Account)


export default routerAdmin