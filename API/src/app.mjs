import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import session from "express-session";
import passport from "passport";
import "./settings/passport/passport.mjs";

// Config. dependências
const app = express();
app.use(cors());

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Conexão com banco de dados (assegure-se que está correta)
import connectToDatabase from "./settings/database/dbConnection.mjs";
await connectToDatabase(); // se for async, aguarde a conexão

// Emular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a landing page e React build
const publicPath = path.join(__dirname, '../../landingPage');
const reactDistPath = path.join(__dirname, 'dist');

app.use('/app', express.static(reactDistPath));


app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, 'public')));

// Dados json e formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da aplicação
import router from "./routes/Router.mjs";
app.use(router);

// Porta com fallback
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Conectado ao servidor na porta", PORT);
});
