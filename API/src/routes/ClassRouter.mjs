import express from "express";
const classRouter = express.Router();

//Controllers
import { 
    uploadClass,
    getClass,
    getUniqueClass
 } from "../controllers/ClassController.mjs";

//Middlewares
import { authGuard } from "../middlewares/authGuard.mjs";
import { classValidations } from "../middlewares/userValidations.mjs";
import validate from "../middlewares/handleValidation.mjs";


//Rotas
classRouter.post("/uploadClass", authGuard, classValidations(), validate, uploadClass)

classRouter.get("/getClasses", authGuard, getClass)

classRouter.get("/getClasses/:id", authGuard, getUniqueClass)



export default classRouter