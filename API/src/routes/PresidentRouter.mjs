import express from "express";
const routerPresidente = express.Router()

//Controllers
import { 
    removeEmployee,
    promotion,
    addLecionador,
    removeLecionador,
    addSetor,
    removeSetor

} from "../controllers/PresidentController.mjs";


//Middlewares
import { roleGuard } from "../middlewares/roleGuard.mjs";
import { authGuard } from "../middlewares/authGuard.mjs";

//Rotas
routerPresidente.patch("/removeEmployee", authGuard, roleGuard("Presidente"), removeEmployee)

routerPresidente.patch("/promotionEmployee", authGuard, roleGuard("Presidente"), promotion)

routerPresidente.patch("/addSetor", authGuard, roleGuard("Presidente"), addSetor)

routerPresidente.patch("/removeSetor", authGuard, roleGuard("Presidente"), removeSetor)


//Tanto admin quanto Presidente podem adicionar lecionadores
routerPresidente.patch("/addLecionador", authGuard, roleGuard("Presidente", "admin"), addLecionador)

routerPresidente.patch("/removeLecionador", authGuard, roleGuard("Presidente", "admin"), removeLecionador)

export default routerPresidente