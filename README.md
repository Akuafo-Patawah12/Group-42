# 🚛 Logistics & Marketing Web App

A modern web application designed to streamline logistics operations and enhance marketing processes. Built with a **React frontend**, **Node.js backend**, and **real-time communication using Socket.IO**.

---

## ✨ Features

- 📦 Real-time logistics tracking and updates
- 📊 Marketing dashboard for campaign insights
- 🧑‍💼 Role-based access control (Admin, Client)
- 💬 Instant notifications with Socket.IO
- 🗺️ Live map view for shipment tracking.
- 📈 Performance analytics and reporting

---

## 🔧 Tech Stack

**Frontend:**
- React
- Axios
- CSS / Tailwind CSS / Ant Design / Mui

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO

**Authentication:**
- JWT (JSON Web Tokens)
- Cookies for refresh tokens


---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB installed and running locally or via cloud (e.g., Atlas)
- npm 

---

### 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs the frontend on: [http://localhost:3000](http://localhost:3000)

---

### 🛠 Backend Setup

```bash
cd server
npm install
npm start
```

Runs the backend on: [http://localhost:5000](http://localhost:5000)

---


## 📬 Real-time Events (Socket.IO)

| Event Name         | Purpose                         |
|--------------------|----------------------------------|
| `orderCreated`     | Broadcast new order to admins    |
| `shipmentUpdated`  | Real-time shipment progress      |
| `notify`     | Trigger alerts for key events    |
| `marketingEvent`   | Live updates on campaign status  |

---

## 🔒 Authentication

- Access token (JWT) stored in localStorage or HttpOnly cookies
- Protected routes via backend middleware
- Auto-logout and token refresh mechanisms supported

---

## ✅ Future Enhancements

- Push notifications (web & mobile)
- AI-based delivery route suggestions
- Integration with third-party shipping APIs
- Marketing automation via SMS/Email

---

# 👥 Project Authors

Meet the talented individuals behind this logistics and marketing web application.

---

## 🧑‍💻 Andrew Aquafo Patawah

- 💼 **Role**: Full-Stack Developer
- 🔗 **GitHub**: [@Akuafo-Patawah12](https://github.com/Akuafo-Patawah12)

> Andrew is a dedicated developer passionate about building scalable web solutions and real-time systems using JavaScript technologies.

---

## 🧑‍💻 David Nii Darko

- 💼 **Role**: Backend Developer
- ⚙️ **Expertise**: Node.js, Express, API Security, JWT, Database Design


> David specializes in backend architecture, crafting efficient APIs, and ensuring robust security and data management in web applications.

---

## 🧑‍💻 Micheal Dei Edem

- 💼 **Role**: UI/UX & Frontend Developer
- ⚙️ **Expertise**: React, UI Design, CSS, Ant Design


> Micheal focuses on creating intuitive user interfaces and seamless frontend experiences with a keen eye for design and accessibility.

---

## 🤝 Collaboration

Together, we combined our strengths to deliver a modern, real-time logistics and marketing platform that’s scalable, user-friendly, and performance-driven.

---


## 📄 License

This project is licensed under the [MIT License](LICENSE).
