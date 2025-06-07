import express from "express";
const routerPresidente = express.Router()

//Controllers
import { 
    removeEmployee,
    promotion,
    addLecionador,
    removeLecionador,
    addSetor,

} from "../controllers/PresidentController.mjs";


//Middlewares
import { roleGuard } from "../middlewares/roleGuard.mjs";
import { authGuard } from "../middlewares/authGuard.mjs";

//Rotas
routerPresidente.patch("/removeEmployee", authGuard, roleGuard("Presidente"), removeEmployee)

routerPresidente.patch("/promotionEmployee", authGuard, roleGuard("Presidente"), promotion)

routerPresidente.patch("/addSetor", authGuard, roleGuard("Presidente"), addSetor)


//Tanto admin quanto Presidente podem adicionar lecionadores
routerPresidente.patch("/addLecionador", authGuard, roleGuard(
    "Presidente", 
    "admin", 
    "Diretor de Projetos", 
    "Diretor de RH", 
    "Diretor de Marketing", 
    "Diretor de Comercial", 
    "Vice-Presidente")
, addLecionador)

routerPresidente.patch("/removeLecionador", authGuard, roleGuard("Presidente", "admin"), removeLecionador)

export default routerPresidente