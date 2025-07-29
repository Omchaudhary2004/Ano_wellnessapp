# 🌿 Health & Wellness Tracker App

A full-stack wellness dashboard to help users build healthy habits and stay consistent. Features a GitHub-style streak calendar, daily task management, user authentication, and secure backend integration.

---

## 🧠 Features

- ✅ User Registration & Login (with JWT + Cookies)
- 📅 Daily Task Management
- 📈 GitHub-style Streak Visualization
- 🧾 Task Completion Tracking
- 🔒 Protected Routes (Backend Auth Middleware)
- 🌐 MongoDB Atlas Integration
- 🎯 Simple, responsive UI (React + CSS)

---

## 🛠️ Tech Stack

### Frontend:
- React (JSX)
- Context API (for Auth)
- Fetch API for HTTP
- Natural CSS (no frameworks)

### Backend:
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- cookie-parser for token handling
- dotenv for environment configs

---

## 🚀 Project Structure

```
root/
│
├── backend/
│   ├── index.js              # Express backend
│   └── .env                  # MongoDB URI & JWT Secret
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Task list, Login form, etc.
│   │   ├── App.jsx
│   │   └── index.js
│   └── .env                  # API base URL
│
└── README.md
```

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Ano_wellnessapp.git
cd health-tracker-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in `backend/` with:

```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```

- Start the server:

```bash
node index.js
```

Or for development:

```bash
npx nodemon index.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

- Create a `.env` file in `frontend/` with:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

- Run the React app:

```bash
npm start
```

---

## ✨ Demo (optional)

> Add screenshots or a link to a live demo here if hosted.

---

## 🧩 Future Enhancements

- Google OAuth login
- Push notifications for tasks
- Mobile responsive improvements
- Calendar-based habit tracker
- Dark mode toggle

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Fork this repo and submit a PR.

---

## 💡 Author

Made with ❤️ by [Your Name](https://github.com/Omchaudhary2004)
