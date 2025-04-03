# 📝 To-Do List Web Application

A full-stack, mobile-responsive to-do list app built with React, Node.js, Express, and MongoDB. Users can sign up, log in, and manage their own tasks with priority tags, due dates, and completion toggles.

---

## 🚀 Live Demo
**Frontend:** [https://todo-app-theta-eight-40.vercel.app](https://todo-app-theta-eight-40.vercel.app)  
**Backend API:** [https://todo-app-f12q.onrender.com](https://todo-app-f12q.onrender.com)

---

## 🎯 Features & Functionality

### ✅ Authentication
- Sign up with username, email, and password
- Log in with email and password
- JWT-based authentication with protected routes

### ✅ Task Management
- Create, read, update, and delete tasks
- Each task has:
  - Title (required)
  - Description (optional)
  - Priority (Low / Medium / High)
  - Due date
  - Completion status toggle (circle icon)

### ✅ UI/UX & Design
- Built with **React** + **Material-UI** for clean, responsive design
- Mobile-first layout; task view adapts across screen sizes
- Validation and error messages shown directly in forms

### ✅ Error Handling
- Client-side form validation (empty fields, password length, email format)
- Server-side schema validation (using Mongoose)
- Friendly error messages (e.g. "Password must be at least 6 characters")
- Duplicate email/username prevention during registration

### ✅ Unit Tests
- Auth and task APIs tested with **Jest** and **Supertest**
- In-memory MongoDB used for isolated test environments

---

## ⚙️ Tech Stack

| Layer        | Technology               |
|--------------|---------------------------|
| Frontend     | React, Material-UI, Axios |
| Backend      | Node.js, Express          |
| Database     | MongoDB, Mongoose         |
| Auth         | JWT                       |
| Testing      | Jest, Supertest           |
| Deployment   | Vercel (frontend), Render (backend), MongoDB Atlas |

---

## 💻 Local Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/Yunzhuhuang/todo-app.git
cd todo-app
```

### 2. Setup the Backend (in `server/`)
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
MONGO_URI=mongodb+srv://todo_user:Hyzh990615@cluster0.t8mhpup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=y1f72db23e$fgT93lfj@2025superSecret!
```

Start the backend:
```bash
npm run dev
```

### 3. Setup the Frontend (in `client/`)
```bash
cd ../client
npm install
```

If you're using Vite or CRA, update the `.env` file:
```env
REACT_APP_API_URL=https://todo-app-f12q.onrender.com/api
```

Start the frontend:
```bash
npm start
```

Frontend runs at `http://localhost:3000`  
Backend runs at `http://localhost:5001`

---

## 🚢 Production Deployment

### ✅ Backend on Render
- Deploy `server/` folder
- Set Root Directory: `server`
- Add Environment Variables:
  - `MONGO_URI`
  - `JWT_SECRET`

### ✅ Frontend on Vercel
- Deploy `client/` folder
- Add `.env` with `REACT_APP_API_URL` set to your Render backend URL

### ✅ MongoDB Atlas
- Cluster hosted online and secured
- Whitelist IP or allow `0.0.0.0/0` for dev use

---

