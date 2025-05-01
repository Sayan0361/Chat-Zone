# 💬 Chat Application

🚧 **Work In Progress**  
A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js), featuring secure user authentication, encrypted passwords, and a sleek, responsive UI. Private messaging and WebSocket integration are in progress.

---

## ✅ Features Completed

- 🔐 **User Authentication**  
  - Secure Sign Up and Sign In system  
  - Passwords encrypted using bcrypt before storing in MongoDB  
  - JWT-based authentication

- 🖥️ **Frontend UI (React + Tailwind CSS)**  
  - Sign In and Sign Up pages  
  - Home Page with navigation  
  - Chat Page UI designed (basic layout)

- 📦 **Backend (Node.js + Express.js)**  
  - User registration and login routes  
  - Error handling using `express-async-handler`  
  - Protected routes with middleware

---

## 🧠 Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- bcrypt.js for password encryption  
- JSON Web Tokens (JWT) for authentication  

**Planned for Real-Time:**  
- Socket.io for WebSocket support (Coming Soon)

---

## 🔧 Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
Install dependencies for frontend & backend

bash
Copy
Edit
cd frontend
npm install
cd ../backend
npm install
Configure environment variables
Create a .env file in the backend/ directory and add:

env
Copy
Edit
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4000
Run the project

bash
Copy
Edit
# Run backend
cd backend
npm start

# Run frontend (in another terminal)
cd frontend
npm start
📸 Screenshots
Make sure to upload your screenshots and update these links accordingly.

Sign In Page

Sign Up Page

Home Page

Chats Page UI

📍 Current Progress
✅ Sign Up, Sign In with validation

✅ Password encryption using bcrypt

✅ JWT authentication flow

✅ Chat page layout

🛠️ Upcoming Features
🔄 Real-time messaging (Socket.io)

👥 User list with online/offline status

🔒 Private 1:1 chats

💾 Chat message persistence (MongoDB)

🎨 Theme switcher (dark/light mode)

📱 Fully responsive design

🤝 Contributing
This project is currently being built as a learning + passion project. Contributions, suggestions, and feedback are welcome!

📃 License
MIT License

💙 Made with Love & Code by Sayan Sen
yaml
Copy
Edit

---

Let me know if you'd like a matching `.gitignore` and `.env.example` file for this project as well.
