import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();

//Rotas de usuário
import routerUser from "./UserRouters.mjs";

//Rotas de Admin
import routerAdmin from "./AdminRouter.mjs";

//Rotas de Presidente
import routerPresidente from "./PresidentRouter.mjs";

//Rotas de uploads de aulas
import classRouter from "./ClassRouter.mjs";

//Rotas de comunidade
import communityRouter from "./CommunityRouter.mjs";

// Emular __dirname para este arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho até o index.html
const htmlPath = path.join(__dirname, '../../../landingPage/index.html');

//Configurando prefixo das rotas
router.use('/api/users', routerUser);
router.use('/api/admin', routerAdmin);
router.use('/api/presidente', routerPresidente)
router.use('/api/lecionador', classRouter)
router.use('/api/community', communityRouter)


router.get('/', (req, res) => {
  res.sendFile(htmlPath);
})




export default router;
