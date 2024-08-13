import React, { useEffect,useState } from 'react'
import io from 'socket.io-client'
export default function Notification(){
    const socket= io("http://localhost:5000");

    const[notification,setNotification]= useState([])
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log("Connected to server")
            
        });
        socket.on("notification",(data)=>{
            console.log(data)
            setNotification(prev=>[data,...prev])
        })
        socket.on('disconnect',(reasons)=>{
            console.log(reasons)
            
        });
        return()=>{
            socket.off("notification")
            socket.off('connect')
            socket.off('disconnect')
        }
    },[socket])
    return(
        <div>
            
            {notification.map((item,index)=>(
                <div key={index} className='w-[50%] bg-white rounded-xl mt-[120px] mx-auto'>{item.message}</div>
                
            ))}
        </div>
    )
}