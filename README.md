🚀 Hedamo Dashboard — MERN Stack Ecommerce Admin Panel

Hedamo Dashboard is a full-stack MERN application that provides a powerful and easy-to-use admin dashboard for managing an ecommerce store.
It includes user management, product CRUD, authentication, protected routes, order handling, and a responsive UI.

This project is built with MongoDB, Express, React, and Node.js, following clean folder structure and scalable patterns.


📌 Features

🛒 Product Management

Add new products

Edit product details
Delete products
View all products
Real-time updates on dashboard
File/image upload support (optional)


🌐 Frontend (React + Vite)

Context API for global state
ProtectedRoute for user/admin
Reusable components
Clean UI with TailwindCSS
API integration with backend

⚙️ Backend (Node.js + Express)

RESTful API
MongoDB using Mongoose
CRUD operations
Centralized error h📂 Tech Stack


Frontend

React.js
Vite
Context API
React Router
TailwindCSS
Recharts

Backend

Node.js
Express.js
MongoDB + Mongoose
ENV configuration
CORS enabled


⚡ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/yourusername/hedamo-dashboard.git
cd hedamo-dashboard


2️⃣ Install Dependencies
Frontend
cd client
npm install

Backend
cd server
npm install

3️⃣ Setup Environment Variables

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173


Run the Backend
npm start

5️⃣ Run the Frontend
npm start
