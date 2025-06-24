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

## 🧑‍💻 Authors

**Andrew Aquafo Patawah**
**David Nii Darko**
**Micheal Dei Edem**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
