# 🏦 Bank Management System

Full Stack Web Application built with Spring Boot and React.

## Tech Stack
### Backend
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- MySQL
- Maven

### Frontend
- React.js
- Axios
- CSS-in-JS

## Project Structure
bank-management-system/
 ├── backend/   → Spring Boot REST APIs
 └── frontend/  → React Frontend

## How to Run

### Backend
cd backend
mvn spring-boot:run
Runs on: http://localhost:8081

### Frontend
cd frontend
npm install
npm start
Runs on: http://localhost:3000

## API Endpoints
| Method | URL                        | Description       |
|--------|----------------------------|-------------------|
| GET    | /api/account/all           | Get all accounts  |
| GET    | /api/account/{id}          | Get by ID         |
| POST   | /api/account/create        | Create account    |
| PUT    | /api/account/update/{id}   | Update account    |
| DELETE | /api/account/delete/{id}   | Delete account    |

## Developer
Shridhar Borule