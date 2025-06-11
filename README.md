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
> *Feito por um dos "piores" alunos da faculdade!*

