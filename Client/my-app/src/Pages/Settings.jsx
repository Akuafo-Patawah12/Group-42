import React,{useState,useMemo,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {motion } from "framer-motion"
import io from "socket.io-client"
const Settings = () => {
  const socket = useMemo(() =>io("http://localhost:5000",{
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


const [profile, setProfile] = useState({
  name: "John Simons",
  email: "john.simons@example.com",
  phone: "+123 456 789",
});

const [password, setPassword] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const [notifications, setNotifications] = useState({
  email: true,
  sms: false,
  push: true,
});

const handleProfileChange = (e) => {
  setProfile({ ...profile, [e.target.name]: e.target.value });
};

const handlePasswordChange = (e) => {
  setPassword({ ...password, [e.target.name]: e.target.value });
};

const handleNotificationChange = (e) => {
  setNotifications({ ...notifications, [e.target.name]: e.target.checked });
};


  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='w-full bg-stone-100  lg:w-[80%] ml-auto'
  >
    
    <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Settings</h1>
        <p className="text-gray-600 text-lg">Manage your profile, account, and preferences.</p>
      </header>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* Profile Settings */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Password Management */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Password Management</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="email"
                checked={notifications.email}
                onChange={handleNotificationChange}
                className="w-5 h-5 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-3 text-gray-600">Email Notifications</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="sms"
                checked={notifications.sms}
                onChange={handleNotificationChange}
                className="w-5 h-5 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-3 text-gray-600">SMS Notifications</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="push"
                checked={notifications.push}
                onChange={handleNotificationChange}
                className="w-5 h-5 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-3 text-gray-600">Push Notifications</label>
            </div>
          </div>
        </div>
      </div>

  </motion.div>
  )
}

export default Settings