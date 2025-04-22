import React,{useState,useMemo,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {motion } from "framer-motion"
import { jwtDecode } from 'jwt-decode'
import io from "socket.io-client"
const Settings = () => {
  const socket = useMemo(() =>io("http://localhost:4000",{
    transports: ['websocket'],
  }),[])
  const navigate= useNavigate()

  const accesstoken = localStorage.getItem('accesstoken');
    const decode = jwtDecode(accesstoken);
  useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });
   
    socket.on('disconnect',(reasons)=>{
        console.log(reasons)
      })
      socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
        localStorage.removeItem('accesstoken');
        navigate('/Login');
    });
    
    return()=>{
        socket.off('connect');
        socket.off('disconnect');
              
    }
},[socket,navigate])


const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [username, setUsername] = useState("JohnDoe");
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [email, setEmail] = useState("john@example.com");
  const [newEmail, setNewEmail] = useState("");

  const [sessions, setSessions] = useState([
    { id: 1, device: "Chrome on Windows", location: "Accra, Ghana", active: true },
    { id: 2, device: "Safari on iPhone", location: "Kumasi, Ghana", active: true },
  ]);

  const handleUsernameUpdate = (e) => {
    e.preventDefault();
    if (newUsername.trim()) {
      setUsername(newUsername);
      setNewUsername("");
      alert("Username updated successfully!");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
  
    if (password && newPassword) {
      try {
        await fetch("/api/user/password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: decode.id, // Adjust based on auth
            password,
            newPassword,
          }),
        });
  
        setPassword("");
        setNewPassword("");
        alert("Password updated successfully!");
      } catch (error) {
        console.error("Password update error:", error);
        alert("Failed to update password.");
      }
    }
  };
  

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    if (newEmail.trim()) {
      try {
        await fetch("/api/user/update_email", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: decode.id, // Adjust based on your auth logic
            newEmail,
          }),
        });
  
        setEmail(newEmail);
        setNewEmail("");
        alert("Email updated. A confirmation has been sent.");
      } catch (err) {
        console.error(err);
        alert("Failed to update email.");
      }
    }
  };
  

  const handleLogoutAllSessions = () => {
    // Replace with backend API logic in real app
    alert("Logged out from all devices!");
    setSessions([]);
  };

  const handleRemoveAccount = () => {
  if (confirm("Are you sure you want to delete your account? This action is irreversible.")) {
    // Make API call or socket emit here
    // Example: socket.emit("deleteAccount", { userId: decodedToken.id });
    console.log("Account deletion triggered");
  }
};

  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  style={{ minHeight: "100vh", paddingTop: "70px" }}
  className="layout-shift w-full lg:w-[80%] px-6 bg-stone-100"
>
  <h2 style={{marginBlock:"16px"}} className="text-xl font-bold text-purple-700 mb-8">Settings</h2>

  {/* Notifications Toggle */}
  <div className="mb-10 flex items-center justify-between bg-white p-4 rounded-xl shadow">
    <span className="text-lg font-semibold text-gray-800">Receive Notifications</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={notificationsEnabled}
        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
      />
      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-purple-600 transition-all duration-300"></div>
      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-full"></div>
    </label>
  </div>

<div className="flex gap-5 justify-between py-5">
  {/* Update Username */}
  <form onSubmit={handleUsernameUpdate} className="mb-10 bg-white p-6 rounded-xl shadow">
    <h3 style={{marginBlock:"16px"}} className="text-sm font-semibold text-purple-700 mb-4">Update Username</h3>
    <label style={{marginBlock:"8px"}} className="block text-sm  mb-2 font-medium text-gray-700">Current Username: {username}</label>
    <input
      type="text"
      value={newUsername}
      onChange={(e) => setNewUsername(e.target.value)}
      placeholder="Enter new username"
      style={{marginBlock:"16px"}}
      className="w-full text-sm px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
    <button
      type="submit"
      className="w-full text-sm py-2 border-2 text-purple-500 border-purple-300 bg-purple-200 rounded hover:bg-purple-700 transition"
    >
      Update Username
    </button>
  </form>

  {/* Update Email */}
  <form onSubmit={handleEmailUpdate} className="mb-10 bg-white p-6 rounded-xl shadow">
    <h3 style={{marginBlock:"16px"}} className="text-sm font-semibold text-purple-700 ">Update Email</h3>
    <label style={{marginBlock:"8px"}} className="block text-sm  font-medium text-gray-700">Current Email: {email}</label>
    <input
      type="email"
      value={newEmail}
      onChange={(e) => setNewEmail(e.target.value)}
      placeholder="Enter new email"
      style={{marginBlock:"16px"}}
      className="w-full text-sm px-4 py-2 text-sm border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
    <button
      type="submit"
      className="w-full text-sm py-2 border-2 text-purple-500 border-purple-300 bg-purple-200 rounded hover:bg-purple-700 transition"
    >
      Update Email
    </button>
  </form>
  </div>

  {/* Update Password */}
  <form onSubmit={handlePasswordUpdate} className="mb-10 bg-white p-6 rounded-xl shadow">
    <h3 style={{marginBlock:"16px"}} className="text-sm font-semibold text-purple-700 ">Change Password</h3>
    <label style={{marginBlock:"8px"}} className="block text-sm font-medium text-gray-700">Current Password</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Current Password"
      style={{marginBlock:"16px"}}
      className="w-full text-sm px-4 py-2 border border-gray-300 rounded  focus:outline-none focus:ring-2 focus:ring-purple-400"
    />

    <label style={{marginBlock:"8px"}} className="block text-sm  font-medium text-gray-700">New Password</label>
    <input
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      placeholder="New Password"
      style={{marginBlock:"16px"}}
      className="w-full text-sm px-4 py-2 border border-gray-300 rounded  focus:outline-none focus:ring-2 focus:ring-purple-400"
    />

    <button
      type="submit"
      className="w-full py-2 text-sm border-2 text-purple-500 border-purple-300 bg-purple-200  rounded hover:bg-purple-400 text-white transition"
    >
      Update Password
    </button>
  </form>

  
<div className='flex py-5 justify-between gap-5'>
  {/* Session Management */}
  <div style={{marginBlock:"16px"}} className="mb-10 bg-white p-6 rounded-xl shadow">
    <h3 style={{marginBlock:"16px"}} className="text-sm font-semibold text-purple-700 ">Active Sessions</h3>
    {sessions.length === 0 ? (
      <p className="text-gray-500 text-sm">No active sessions.</p>
    ) : (
      <ul style={{marginBlock:"16px"}} className="flex flex-col gap-3 ">
        {sessions.map((session) => (
          <li key={session.id} className="bg-purple-50 p-3 text-sm rounded border border-purple-100">
            <strong className="text-purple-700">{session.device}</strong> — {session.location}
          </li>
        ))}
      </ul>
    )}
    <button
      onClick={handleLogoutAllSessions}
      className="w-full text-sm py-2 text-red-500 bg-red-200 border-2 border-red-300  rounded hover:bg-red-500 transition"
    >
      Log out of all sessions
    </button>
  </div>
  {/* Remove Account */}
<div className="mb-16 bg-white p-6 rounded-xl shadow border border-red-100">
  <h3 style={{marginBlock:"16px"}} className=" font-semibold text-red-500 text-sm mb-4">Danger Zone</h3>
  <p style={{marginBlock:"16px"}} className="text-gray-600 text-sm ">
    Once you delete your account, there is no going back. Please be certain.
  </p>
  <button
    onClick={handleRemoveAccount}
    
    className="w-full text-sm py-2 text-red-500 bg-red-200 border-2 border-red-300 rounded hover:bg-red-700 transition"
  >
    Delete My Account
  </button>
</div>
</div>

</motion.div>

  )
}

export default Settings