import { Bell } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client"; // your socket instance
import {jwtDecode} from "jwt-decode"

export default function Notification({ open,setOpen }) {
    const socket= io("http://localhost:4000/notify",{
        transports:["websocket"],
        withCredentials:true
    })
  
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const notificationRef = useRef();

   const token =localStorage.getItem("accesstoken")  // extracting token from local storage
      
  const decodedToken = jwtDecode(token)

  useEffect(() => {
    socket.on("connect",()=>{
        console.log("connected to notification namespace")
    })
    socket.on("notificationList", (data) => {
     console.log(data)
      setNotifications(data);
    });

    socket.on("disconnect",(reason)=>{
        console.log(reason)
    })

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      socket.off("notificationList");
      socket.off("connect")
      socket.off("disconnect")
    };
  }, [socket]);

  useEffect(() => {
    if (open) {
      socket.emit("markNotificationsRead", { userId: decodedToken.id });
    }
  }, [open]);

  return (
    <div className="relative" ref={notificationRef}>
      

      {open && (
        <div className="fixed right-0 top-12  h-auto  bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
          <h3 style={{marginBlock:"10px"}} className="flex justify-between text-sm font-semibold text-purple-700 mb-2"> Notifications <Bell size={15}/></h3>
          <div className="overflow-y-auto w-[300px] max-h-[400px]">
          {notifications.length === 0 ? (
            <div style={{marginBlock:"15px"}} className="flex flex-col gap-2 justify-center items-center">
            <img src="/images/no-data.svg" alt="no data" className="w-1/4 h-auto"/>
            <p className="text-gray-500 text-sm">No new notifications</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {notifications.slice(0, showAll ? notifications.length : 10).map((n, i) => (
                <li key={i} className="bg-purple-50 p-2 rounded-md shadow-sm text-sm">
                  {n.message}
                  <div className="text-[10px] text-right text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {notifications.length > 10 && !showAll && (
            <button
              className="text-purple-600 mt-2 text-sm hover:underline"
              onClick={() => setShowAll(true)}
            >
              See more
            </button>
          )}
        </div>
        </div>
      )}
    </div>
  );
}
