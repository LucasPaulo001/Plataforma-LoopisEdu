# Plataforma-LoopisEdu

## Créditos

Este projeto é baseado na landing page criada originalmente em [LoopisEdu](https://github.com/loopisjr/LoopisEdu), com colaboração de:

- 🧑‍💻 [Alexandre-Evangelista](https://github.com/Alexandre-Evangelista)
- 🧑‍💻 [aaFranks](https://github.com/aaFranks)
- 🧑‍💻 [JAndersonArruda](https://github.com/JAndersonArruda)

# 📚 Loopis Edu

Loopis Edu é uma plataforma educacional colaborativa voltada para gestão de times, compartilhamento de conteúdo e incentivo ao aprendizado coletivo. A aplicação oferece um espaço onde membros de uma organização podem publicar conhecimentos, responder perguntas, interagir com conteúdos e gerenciar permissões de forma estruturada com base em hierarquias.

## 🚀 Funcionalidades

- ✅ Autenticação com controle de acesso por cargo (admin, presidente, diretores, etc.)
- ✅ Sistema de publicações e respostas (estilo fórum)
- ✅ Edição e exclusão de respostas
- ✅ Upload e listagem de aulas
- ✅ Painel administrativo com bloqueio/desbloqueio de contas
- ✅ Promoção de usuários e organização por setores
- ✅ Sistema de permissões dinâmico baseado em papéis

## 🧑‍💻 Tecnologias Utilizadas

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (JWT) para autenticação
- Validação com Express Validator

### Frontend
- React.js
- Context API para gerenciamento de estado global
- CSS Modules para estilização isolada
- Ícones via React Icons

## 🛡️ Controle de Acesso

As rotas e ações são protegidas por authGuard e roleGuard, garantindo que apenas cargos autorizados possam acessar determinadas funcionalidades.

| Rota                 | Cargo Necessário             |
| -------------------- | ---------------------------- |
| `/promotionEmployee` | Presidente                   |
| `/addLecionador`     | Presidente, Admin, Diretores |
| `/blockAccount`      | Admin                        |
| `/uploadClass`       | Lecionador autorizado        |

---

## Para Colaboradores

### .env

Abaixo listo as variáveis de ambiente que você (colaborador) poderá utilizar para testes locais da aplicação:

|**Variável**|**Descrição**|
|------------|--------------|
|``PORT``|``Porta do servidor``|
|``JWT_SECRET``|``Chave secreta para o JWT``|
|``DB_URI``|``URL de conexão ao banco de dados``| 
|``USER_EMAIL``|``E-mail para envio de notificações``|
|``PASS_APP``|``Senha de aplicativo do E-mail de notificações``|
|``CLIENT_ID_GOOGLE``|``ID do cliente para login com o google``|
|``CLIENT_SECRET_GOOGLE``|``ID secreto para login com o google``|
|``CLIENT_ID_GITHUB``|``ID do cliente para login com o github``|
|``SECRET_SESSION``|``Chave secreta para a configuração do session``|

---

```
##Porta
PORT=8080

##JWT
JWT_SECRET=your_jwt_secret_key

##MongoDB
DB_URI=your_mongodb_uri

##E-mail 
USER_EMAIL=your_email@gmail.com
PASS_APP=your_email_app_password

##Autenticação Google
CLIENT_ID_GOOGLE=your_google_client_id
CLIENT_SECRET_GOOGLE=your_google_client_secret

##Autenticação GitHub
CLIENT_ID_GITHUB=your_github_client_id
CLIENT_SECRET_GITHUB=your_github_client_secret

##Sessão
SECRET_SESSION=your_session_secret
```

**OBS:**
- Ao clonar o repositório entre em **/API** e rode o **npm install** para baixar as dependências para o backend, faça o mesmo para o frontend
Você tem que ter o **mongoDB** instalado, **compass** ou **mongoBash**.
Crie um arquivo **.env** na pasta **/API**, cole as variáveis e utilize suas credenciais.
---
> *Feito por um dos "piores" alunos da faculdade!*

