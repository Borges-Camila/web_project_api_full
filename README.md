# Web Project API Full - Projeto 18 🚀

Este repositório contém a versão final do projeto full-stack desenvolvido ao longo do curso, integrando front-end (React) e back-end (Node.js + Express + MongoDB). O objetivo principal é consolidar conhecimentos sobre autenticação, autorização, validação de dados, tratamento de erros, deployment e conexão entre cliente e servidor.

## 📁 Estrutura do Projeto

```
web_project_api_full/
├── backend/ # API com Node.js, Express, MongoDB, JWT, Joi, Celebrate
├── frontend/ # Aplicação React com autenticação e rotas protegidas
├── .gitignore
├── README.md
```

## 🌐 Funcionalidades da Aplicação

- Registro e login de usuários com autenticação JWT
- Armazenamento de senhas criptografadas (bcrypt)
- Validação de dados com Celebrate e Joi
- Edição de perfil do usuário
- Adição, exclusão e like de cartões
- Proteção de rotas com middleware de autorização
- Middleware centralizado de tratamento de erros
- Registro de logs de requisições e erros (request.log e error.log)
- Deploy completo com domínio.

## 🔐 Autenticação & Autorização

- Autenticação baseada em tokens JWT
- Dados armazenados de forma segura com bcrypt
- Senhas não retornadas em nenhuma resposta da API
- Usuários autenticados somente podem modificar seus próprios dados
- Rota protegida: /users/me retorna dados do usuário logado

## 📦 Tecnologias Utilizadas

**Back-end:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- Celebrate + Joi + Validator
- JSON Web Token (JWT)
- Winston + express-winston (logs)
- CORS

**Front-end:**

- React
- React Router
- Context API
- LocalStorage (para persistência do token)
- Fetch API com envio de token nos headers

## ⚙️ Instalação Local

### Pré-requisitos:

- Node.js
- MongoDB
- npm ou yarn

### Clone o repositório

```
git clone https://github.com/seu-usuario/web_project_api_full.git
cd web_project_api_full
```

### Back-end

```
cd backend
npm install
npm run start
```

### Front-end

```
cd ../frontend
npm install
npm run dev
```

## 🔗 Domínio do Projeto

Acesse o projeto em produção:

👉 https://web-project-api-full-eta.vercel.app/
**API**: https://web-project-api-full-58cc.onrender.com

## ✅ Checklist Final

[ X ] Registro e login com JWT

[ X ] Hash de senha com bcrypt

[ X ] Edição e visualização de perfil

[ X ] CRUD de cartões com validação

[ X ] Proteção de rotas com middleware

[ X ] Middleware central de erros

[ X ] Logs de requisição e erros

[ X ] Front-end e back-end integrados

[ X ] Deploy
