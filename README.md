# 🏦 Banco Modular — Frontend Angular

Aplicação frontend desenvolvida em **Angular (v19+)**, integrada a uma **API modular bancária** construída em **NestJS**.  
O sistema permite gerenciar **clientes, contas, depósitos, saques e transações**, simulando o funcionamento de um ambiente bancário real, com autenticação JWT e controle de sessão.

---

## 🚀 Tecnologias Utilizadas

- ⚡ **Angular 19+**
- 🎨 **Angular Material**
- 💻 **TypeScript**
- 🔄 **RxJS / Observables**
- 🧩 **API RESTful (NestJS)**
- 💅 **SCSS (estilo Itaú)**

---

## ⚙️ Funcionalidades Principais

### 🔐 Autenticação
- Login e registro de usuários via `AuthController`
- Armazenamento de `accessToken` e `user` no `localStorage`
- Headers automáticos (`x-client-id` e `x-client-secret`) em todas as requisições

### 👥 Gestão de Clientes
- Listagem completa (`GET /api/v1/clientes`)
- Criação de novo cliente via modal
- Edição de cliente existente (nome e e-mail)
- Desativação de clientes (`DELETE /api/v1/clientes/:id`)
- Atualização automática da tabela após qualquer operação

### 💸 Transações
- Depósito (`POST /api/v1/clientes/:id/depositar`)
- Saque (`POST /api/v1/clientes/:id/sacar`)
- Listagem de transações com paginação e filtros (`GET /api/v1/clientes/:id/transacoes`)

### 🧭 Interface
- Layout fixo com **Header + Sidebar**
- Navegação por rotas protegidas (AuthGuard)
- Responsividade e design inspirado no **Banco Itaú**
- Feedback visual com **SnackBars** de sucesso/erro

---

## 📂 Estrutura do Projeto

