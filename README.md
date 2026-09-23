# MERN Lease Management System

MERN project with user login and separate admin login. Authorization/JWT is intentionally not included.

## Requirements
- Node.js
- MongoDB Community Server running locally
- MongoDB Compass (optional)

## Backend
cd backend
npm install
npm run dev

API: http://localhost:5000

Create first admin:
POST /admin/create
{
  "username":"admin",
  "password":"admin123"
}


## Frontend
cd frontend
npm install
npm start

Frontend: http://localhost:3000

## Main flow
User Register -> Login -> View properties -> Request lease -> Waiting
Admin Login -> Dashboard -> Accept/Deny request
Accepted -> User Payment -> Paid

Payment is a demo status update, not a real payment gateway.
