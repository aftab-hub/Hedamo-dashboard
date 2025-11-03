# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.








************* NOTE --->  Data will not show in live project because it is using json-server!

live link ------>  https://hedamo-dashboard-eight.vercel.app


# My Project

![App Screenshot](https://hedamo-dashboard-eight.vercel.app/Dashboard.png)



# 🛍️ Product Transparency Dashboard

A responsive **Product Management Dashboard** built with **React + Tailwind CSS**, featuring **user authentication**, **product management**, and **AI scoring integration (optional)**.  
It uses a **local JSON Server** as a mock backend for product data.

---

## 🚀 Features

- 🔐 User authentication (Login & Register)
- 📦 Add, edit, delete, and search products
- 📊 Dashboard overview with summary cards
- 📈 Interactive charts (Recharts)
- ⚡ Fast and responsive UI built with Tailwind CSS
- 🧠 AI Transparency Score integration-ready (optional)
- 🧩 Context API for global state management

---

## 🛠️ Tech Stack

| Category        | Technologies Used |
|-----------------|------------------|
| Frontend        | React, Vite, Tailwind CSS |
| State Management| React Context API |
| Charts          | Recharts |
| Mock Backend    | JSON Server |
| Deployment      | Vercel |

---

## 📂 Folder Structure


## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/aftab-hub/Hedamo-dashboard.git
cd product-dashboard

2️⃣ Install dependencies
npm install

3️⃣ Start JSON Server
npx json-server --watch db.json --port 3001

4️⃣ Run the frontend
npm start

