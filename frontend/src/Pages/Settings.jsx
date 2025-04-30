import React,{useState,useMemo,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {motion } from "framer-motion"
import { jwtDecode } from 'jwt-decode'
import axios from "../api/api";
import {toast} from "react-toastify" 
import io from "socket.io-client"
const Settings = () => {
  const socket = useMemo(() =>io("http://localhost:4000",{
    transports: ['websocket'],
  }),[])
  const navigate= useNavigate()

  const accesstoken = localStorage.getItem('accesstoken');
  let decode = null;

  try {
    if (accesstoken) decode = jwtDecode(accesstoken);
  } catch (err) {
    console.error("Invalid token:", err);
    decode = null;
  }
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
  const [loading, setLoading] = useState(true);


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
      } finally {
        setLoading(false); // make sure to do this
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
      } finally {
        setLoading(false);
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
   
    setError('');

    try {
      const res = await axios.post('/change-username', { newUsername }, { withCredentials: true });
      toast.message("Username updated successfully");
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
    setError('');

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



  const [error, setError] = useState('');

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
        setError(err.response?.data?.message || 'Verification failed');
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
  <form onSubmit={handleSubmitUsername} className="mb-10 bg-white p-6 rounded-xl shadow">
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
      className="w-full text-sm py-2 border-2 font-semibold text-purple-800 border-purple-300 bg-purple-200 rounded hover:text-white hover:bg-purple-400  transition"
    >
      Update Username
    </button>
  </form>

  {/* Update Email */}
  <form onSubmit={requestEmailChange} className="mb-10 bg-white p-6 rounded-xl shadow">
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
      className="w-full text-sm py-2 border-2 font-semibold text-purple-800 border-purple-300 bg-purple-200 rounded hover:text-white hover:bg-purple-400  transition"
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
      placeholder="Current Password"
      style={{marginBlock:"16px"}}
      className="w-full text-sm  px-4 py-2 border border-gray-300 rounded  focus:outline-none focus:ring-2 focus:ring-purple-400"
    />

    <button
      type="submit"
      className="w-full text-sm py-2 border-2 font-semibold text-purple-800 border-purple-300 bg-purple-200 rounded hover:text-white hover:bg-purple-400  transition"
    >
      Update Password
    </button>
  </form>

  
<div className='flex flex-col py-5 justify-between gap-5 lg:flex-row'>
  {/* Session Management */}
  <div style={{marginBlock:"16px"}} className="mb-10 bg-white p-6 rounded-xl shadow">
    <h3 style={{marginBlock:"16px"}} className="text-sm font-semibold text-purple-700 ">Manage Sessions</h3>
    {sessions.length === 0 ? (
      <p className="text-gray-500 text-sm">No active sessions.</p>
    ) : (
      <ul style={{marginBlock:"16px"}} className="flex flex-col gap-3 ">
        {sessions.map((session,index) => (
          <li key={index} className="bg-purple-50 p-3 text-xs font-semibold rounded border border-purple-100">
            <p className="text-purple-700">{session}</p> 
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
    onClick={handleDeleteAccount}
    
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