import React,{useState,useMemo,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {motion } from "framer-motion"

import axios from "../api/api";
import {toast} from "react-toastify" 
import {Trash2} from "lucide-react"
import io from "socket.io-client"
const Settings = () => {
  const socket = useMemo(() =>io("http://localhost:4000",{
    transports: ['websocket'],
  }),[])
  const navigate= useNavigate()

 
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



  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
 
  const [sessions, setSessions] = useState([]);

  
  const [notifyEnabled, setNotifyEnabled] = useState(true);
 


  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/getUser");
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setSessions(user.device_info);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data.");
      } 
    };

    getUser();
  }, []);

  // Fetch current preference on mount
  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const res = await axios.get('/get-notification-preference', { withCredentials: true });
        setNotifyEnabled(res.data.allowNotifications);
      } catch (err) {
        toast.error('Failed to load preferences');
        console.error("Error fetching notification preference:", err);
      } 
    };

    fetchPreference();
  }, []);

  // Handle toggle
  const handleToggle = async () => {
    try {
      const newPref = !notifyEnabled;
      setNotifyEnabled(newPref);

      await axios.post(
        '/update-notification-preference',
        { allowNotifications: newPref },
        { withCredentials: true }
      );

      toast.success(`Notifications ${newPref ? 'enabled' : 'disabled'}`);
    } catch (err) {
      console.log(err)
      toast.error('Failed to update preference');
    }
  };

 
  

  const handleSubmitUsername = async (e) => {
    e.preventDefault();
   
    

    try {
      const res = await axios.post('/change-username', { newUsername }, { withCredentials: true });
      toast.message(res.data.message);
      setNewUsername('');

    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    toast.success(newPassword)
    if (password==="" || newPassword==="") {
      toast.warning('All fields are required');
      return;
    }
    

    try {
      const res = await axios.post(
        '/update-password',
        { password, newPassword },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  
  


  const requestEmailChange = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        '/request-email-change',
        { newEmail },
        
      );
      if(response.status===200){
      toast.success("Verification link sent to your new email");
      }
    } catch (error) {
      throw error.response?.data || { message: 'Something went wrong' };
    }
  };



  

  // Extract token outside useEffect
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  useEffect(() => {
    if (!token) return; // Don't run if there's no token

    const verifyEmailChange = async () => {
      try {
        const res = await axios.post('/verify-email-change', { token });
        if (res.status===200){
        toast.success("Verified");
        }
      } catch (err) {
        console.log(err.response?.data?.message || 'Verification failed');
      }
    };

    verifyEmailChange();
  }, [token]); // Only run if token exists
  

  const handleLogoutAllSessions = () => {
    // Replace with backend API logic in real app
    alert("Logged out from all devices!");
    setSessions([]);
  };

  
  

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    try {
      const res = await axios.post('/delete-all-devices', {}, { withCredentials: true });
      toast.success(res.data.message);
      window.location.href = '/login';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error removing devices');
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
  <div className="mb-10 w-full  mx-auto flex items-center justify-between bg-white p-6 rounded-2xl shadow-md border border-gray-200">
  <div className="flex flex-col">
    <span className="text-lg font-semibold text-gray-800">Receive Notifications</span>
    <span className="text-sm text-gray-500">Toggle to enable or disable notifications</span>
  </div>

  <div className="flex items-center gap-4">
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={notifyEnabled}
        onChange={handleToggle}
      />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-600 transition-all duration-300"></div>
      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-full"></div>
    </label>
    <span className={`text-sm font-medium ${notifyEnabled ? 'text-green-600' : 'text-red-500'}`}>
      {notifyEnabled ? 'Enabled' : 'Disabled'}
    </span>
  </div>
</div>



<div className="flex flex-col gap-5 justify-between py-5 lg:flex-row">
  {/* Update Username */}
  <form
    onSubmit={handleSubmitUsername}
    className="bg-white p-6 rounded-xl border border-gray-200 shadow"
    style={{ marginBottom: "24px" }}
  >
    <h3 className="text-sm font-semibold text-purple-600 mb-4">Update Username</h3>
    <label style={{marginBottom:"8px"}} className="block text-sm font-medium text-gray-700 mb-2">
      Current Username: {username}
    </label>
    <input
      type="text"
      value={newUsername}
      onChange={(e) => setNewUsername(e.target.value)}
      placeholder="Enter new username"
      style={{marginBottom:"16px"}}
      className="w-full text-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4"
    />
    <button
      type="submit"
      className="w-full text-sm py-2 font-semibold text-purple-700 bg-purple-100 border border-purple-200 rounded hover:bg-purple-300 hover:text-white transition"
    >
      Update Username
    </button>
  </form>

  {/* Update Email */}
  <form
    onSubmit={requestEmailChange}
    className="bg-white p-6 rounded-xl border border-gray-200 shadow"
    style={{ marginBottom: "24px" }}
  >
    <h3 className="text-sm font-semibold text-purple-600 mb-4">Update Email</h3>
    <label style={{marginBottom:"8px"}} className="block text-xs font-medium text-gray-700 mb-2">
      Current Email: {email}
    </label>
    <input
      type="email"
      value={newEmail}
      onChange={(e) => setNewEmail(e.target.value)}
      placeholder="Enter new email"
      style={{marginBottom:"16px"}}
      className="w-full text-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4"
    />
    <button
      type="submit"
      className="w-full text-sm py-2 font-semibold text-purple-700 bg-purple-100 border border-purple-200 rounded hover:bg-purple-300 hover:text-white transition"
    >
      Update Email
    </button>
  </form>

  {/* Update Password */}
  <form
    onSubmit={handlePasswordUpdate}
    className="bg-white p-6 rounded-xl border border-gray-200 shadow"
    style={{ marginBottom: "24px" }}
  >
    <h3 className="text-sm font-semibold text-purple-600 mb-4">Change Password</h3>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Current Password"
      style={{marginBottom:"16px"}}
      className="w-full text-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4"
    />
    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
    <input
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      placeholder="New Password"
      style={{marginBottom:"16px"}}
      className="w-full text-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4"
    />
    <button
      type="submit"
      className="w-full text-sm py-2 font-semibold text-purple-700 bg-purple-100 border border-purple-200 rounded hover:bg-purple-300 hover:text-white transition"
    >
      Update Password
    </button>
  </form>
</div>

<div className=" py-5 justify-between   columns-1 grid-gap-2 md:columns-2">
  {/* Manage Sessions */}
  <div
    className="bg-white p-6 rounded-xl border border-gray-200 shadow break-inside-avoid"
    style={{ marginBottom: "24px" }}
  >
    <h3 className="text-sm font-semibold text-purple-600 mb-4">Manage Sessions</h3>
    {sessions.length === 0 ? (
      <p className="text-gray-500 text-sm">No active sessions.</p>
    ) : (
      <ul className="flex flex-col gap-3 mb-4">
        {sessions.map((session, index) => (
          <li
            key={index}
            className="bg-purple-50 px-4 py-3 flex justify-between items-center text-xs font-medium rounded border border-purple-100"
          >
            <span className="text-purple-700">{session}</span>
            <Trash2 size={18} className="text-purple-500 cursor-pointer hover:text-purple-700" />
          </li>
        ))}
      </ul>
    )}
    <button
      onClick={handleLogoutAllSessions}
      style={{marginTop:"16px"}}
      className="w-full text-sm py-2 text-red-600 bg-red-100 border border-red-200 rounded hover:bg-red-500 hover:text-white transition"
    >
      Log out of all sessions
    </button>
  </div>

  {/* Danger Zone */}
  <div
    className="bg-white p-6 rounded-xl border border-red-100 shadow break-inside-avoid"
    style={{ marginBottom: "24px" }}
  >
    <h3 className="text-sm font-semibold text-red-500 mb-4">Danger Zone</h3>
    <p style={{marginBottom:"16px"}} className="text-gray-600 text-sm mb-4">
      Once you delete your account, there is no going back. Please be certain.
    </p>
    <button
      onClick={handleDeleteAccount}
      className="w-full text-sm py-2 text-red-600 bg-red-100 border border-red-200 rounded hover:bg-red-500 hover:text-white transition"
    >
      Delete My Account
    </button>
  </div>
</div>

<footer className="w-full py-4 text-center text-sm text-gray-500 bg-transparent border-t border-gray-200 mt-10">
  © {new Date().getFullYear()} Group 42. All rights reserved.
</footer>

</motion.div>

  )
}

export default Settings