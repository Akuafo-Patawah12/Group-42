
import React from "react"
import { NavLink,Link } from "react-router-dom"
import { jwtDecode } from 'jwt-decode';
import {  BellOutlined } from "@ant-design/icons";
import {ShoppingCart,Menu} from "lucide-react"
import io from "socket.io-client"



import { Button, Space } from "antd";

export default function Header({open,setOpen,toggleDrawer}) {
  const socket = io("http://localhost:4000/notify",{
    transports:["websocket"],
    withWredentials:true
  })
  const user= localStorage.getItem('user');
  const [unreadCount,setUnreadCount] = React.useState([])
    const accesstoken = localStorage.getItem('accesstoken');
    const decode = jwtDecode(accesstoken);
    
    React.useEffect(()=>{
      
      socket.emit('getUnreadNotifications', decode?.id);
    },[])

  React.useEffect(()=>{
     socket.on("connect",()=>{
        console.log("web socket is active")
     })

     socket.on('unreadNotifications', (data) => {
      setUnreadCount(data);
    });

     socket.on("notify",(data)=>{
      console.log(data,"notified")
       setUnreadCount(prev=> [data,...prev])
     })

     socket.on("disconnect",(reason)=>{
        console.log(reason)
     })

     return()=>{
       socket.off("connect")
       socket.off("notify")
       socket.off("diconnect")
     }
  },[socket])
 
  return (
     <header className={`header fixed  h-[60px] w-full float-none top-0 z-[44] flex justify-between border-b-[1px] items-center  border-stone-300 bg-white  `}>
       <div className='flex items-center font-bold text-xl'><Link to="/"><img src="/images/sfgl_logo.jpg" alt='logo' className='w-14 '/></Link><div className='content'><p>SFGL</p><p>SFGL</p></div></div>
       <nav style={{marginRight:"1.8%"}} className="flex gap-3 h-[40px] mx-[2%] my-auto">
      <Space>
        <NavLink to={"/Customer/Trends"}>
          <Button
            icon={<ShoppingCart size={15}/>}
            title="Marketplace"
            className="rounded-full size-8 flex justify-center items-center bg-gray-200  font-medium"
          />
           
          
        </NavLink>

        <div to={"/Notification"} className={"relative"}>
          <Button
            icon={<BellOutlined />}
            onClick={()=>{
              setOpen(!open)
              setUnreadCount([])
              }}
            title="Notification"
            className="rounded-full  size-8 flex justify-center items-center  bg-gray-200 font-medium"
          />
          {unreadCount.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {unreadCount.length}
        </span>
      )}
          
        </div>
        <div className="rounded-full bg-gray-200  flex items-center justify-center  text-xs font-bold text-stone-600 py-1 pl-1 pr-1 gap-1 md:pl-3"><span title={user} className="hidden md:block">{user}</span><span title={user} className="size-7 flex items-center justify-center border-[3px] border-purple-400 rounded-full">{user[0]}</span></div>
        <button title="Menu" className="border-0 bg-white lg:hidden"><Menu size={24} xlinkTitle="Menu"  onClick={()=> toggleDrawer()}/></button>
      </Space>
      
      
    </nav>
    </header>
  )
}
