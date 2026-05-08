# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# 🏦 Bank Management System

Full Stack Banking Web Application

## Tech Stack
| Layer    | Technology              |
|----------|------------------------|
| Backend  | Java 17, Spring Boot 3 |
| Security | JWT, Spring Security   |
| Database | MySQL 8                |
| Frontend | React.js, Axios        |

## Features
### Admin
- Manage all accounts (Create, Update, Delete)
- View all users
- View all transactions

### User
- View accounts
- Deposit / Withdraw / Transfer
- View transaction history

## API Endpoints
| Method | Endpoint                    | Access |
|--------|-----------------------------|--------|
| POST   | /api/user/register          | Public |
| POST   | /api/user/login             | Public |
| GET    | /api/account/all            | All    |
| POST   | /api/account/create         | Admin  |
| DELETE | /api/account/delete/{id}    | Admin  |
| POST   | /api/transaction/deposit    | All    |
| POST   | /api/transaction/withdraw   | All    |
| POST   | /api/transaction/transfer   | All    |

## Run Locally

### Backend
cd backend
mvn spring-boot:run

### Frontend
cd frontend
npm install
npm run dev

## Developer
Shridhar Dattatrya Borule
GitHub: github.com/shridharborule512