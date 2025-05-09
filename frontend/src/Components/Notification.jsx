import { Bell } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";

export default function Notification({ open, setOpen }) {
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const notificationRef = useRef();
  const socket = useRef(null);
  const [loader, setLoader] = useState(true);

  const token = localStorage.getItem("accesstoken");
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    socket.current = io("http://localhost:4000/notify", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.current.on("connect", () => {
      console.log("connected to notification namespace");
    });

    socket.current.on("notificationList", (data) => {
      console.log(data);
      setTimeout(() => {
      setLoader(false);
      setNotifications(data);
      }
      , 1000);
    });

    socket.current.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

 useEffect(()=>{

 
  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  }
 },[setOpen])

  useEffect(() => {
    if (open && socket.current) {
      socket.current.emit("markNotificationsRead", { userId: decodedToken.id });
    }
  }, [open, decodedToken.id]);

  return (
    <div className="relative" ref={notificationRef}>
  {open && (
    loader ? (
      <div className="fixed right-0 top-12 w-[300px] h-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
        <h3 className="flex justify-between text-sm font-semibold text-purple-700 mb-2">
          Notifications <Bell size={15} />
        </h3>
        <div className="flex justify-center items-center h-20">
          <div className="w-6 h-6 border-2 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
        </div>
      </div>
    ) : (
      <div className="fixed right-0 top-12 h-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
        <h3 className="flex justify-between text-sm font-semibold text-purple-700 mb-2">
          Notifications <Bell size={15} />
        </h3>
        <div className="overflow-y-auto w-[300px] max-h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col gap-2 justify-center items-center my-4">
              <img src="/images/no-data.svg" alt="no data" className="w-1/4 h-auto" />
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
    )
  )}
</div>

  );
}
