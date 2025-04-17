# ✅ Checklist do Projeto Node.js + React

## 📦 Fase 0: Preparação

- [ X ] Clonar o repositório com estrutura `backend/` e `frontend/`
- [ X ] Copiar o código anterior do back-end para `backend/`

---

## 🧩 Fase I: Autenticação e Autorização

### 🧱 Configuração Inicial

- [ X ] Adicionar `email` e `password` ao schema de usuário
- [ X ] Validar `email` com `validator`
- [ X ] Tornar `name`, `about` e `avatar` opcionais com valores padrão

### 🔐 Cadastro e Login

- [ X ] Criar `createUser` com hash da senha (`bcrypt`)
- [ X ] Criar `login` que retorna JWT com expiração de 7 dias
- [ X ] Retornar erro 401 em dados inválidos

### 📡 Rotas de Autenticação

- [ X ] POST `/signin` → login
- [ X ] POST `/signup` → createUser
- [ X ] Remover criação de usuário do arquivo `routes/users.js`

### 🛡️ Middleware de Autorização

- [ X ] Criar middleware `auth.js`
- [ X ] Adicionar `req.user` após validar token
- [ X ] Proteger todas as rotas (exceto `/signin` e `/signup`)
- [ X ] Remover `req.user` fixo usado anteriormente

### 👤 Ações de Usuário

- [ X ] Criar rota `GET /users/me`
- [ X ] Impedir edição/exclusão de recursos de outros usuários

### 🔒 Segurança

- [ X ] Adicionar `select: false` ao campo `password`
- [ X ] Usar `.select('+password')` no login

### 🔄 Integração com Front-End

- [ X ] Salvar token no `localStorage`
- [ X ] Atualizar `useEffect` para checar token
- [ X ] Enviar token no header das requisições

---

## ⚙️ Fase II: Tratamento de Erros e Conexão Front-End

### 🚨 Tratamento de Erros

- [ X ] Criar middleware centralizado para erros
- [ X ] Usar `next(err)` nas funções
- [ X ] Retornar erro 500 por padrão
- [ X ] Atualizar `.eslintrc` para `next` não utilizado

### ✅ Validação com Celebrate/Joi

- [ X ] Validar inputs usando `celebrate` e `Joi`
- [ X ] Verificar URLs com `validator.isURL`

### 📄 Logs de Requisições

- [ X ] Criar `request.log` e `error.log`
- [ X ] Usar formato JSON
- [ X ] Adicionar ao `.gitignore`

### 🧩 Integração front-end e back-end

- [ ] Compilar React com `npm run build`
- [ ] Mover `build/` para o servidor
- [ ] Garantir `.git` apenas na raiz

---

## ☁️ Fase III: Deploy no Servidor

### 🚀 Subida do Backend

- [ X ] Subir o banco de dados para o Mongo Atlas
- [ X ] Deploy no Render

### 🌍 Subida do Frontend

- [ X ] Deploy na Vercel

### ✅ Funcionalidades completas

- [ X ] Cadastro e login
- [ X ] Edição de perfil
- [ X ] Criar, curtir e deletar cartões

### 🌐 CORS

- [ X ] Instalar e configurar `cors`

### 🔐 Variáveis de Ambiente

- [ X ] Criar `.env` com `JWT_SECRET` e `NODE_ENV=production`
- [ X ] Garantir funcionamento sem `.env` em dev

### 💥 Teste de Crash

- [ X ] Criar rota `/crash-test` que derruba o servidor
- [ X ] Usar PM2 para reiniciar automaticamente

---

## 📌 Finalização

- [ X ] Remover rota `/crash-test`
- [ X ] Atualizar `README.md` com URL do projeto
- [ X ] Testar todas as funcionalidades
- [ X ] Fazer o deploy final 🚀🎉
- [ X ] Atualizar `gitignore`
