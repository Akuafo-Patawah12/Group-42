import React, { useEffect,useState } from 'react'
import io from 'socket.io-client'
export default function Notification(){
    const socket= io("http://localhost:5000/notify",{transports: ['websocket']});

    const[notification,setNotification]= useState([])
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log("Connected to server")
            
        });
        socket.on("notify",(data)=>{
            console.log(data)
            setNotification(prev=>[data,...prev])
        })
        socket.on('disconnect',(reasons)=>{
            console.log(reasons)
            
        });
        return()=>{
            socket.off("notify")
            socket.off('connect')
            socket.off('disconnect')
        }
    },[socket])
    return(
        <div className='mt-[120px] flex flex-col gap-3'>
            
            {notification.map((item,index)=>(
                <div key={index} className='w-[50%] bg-stone-100 h-9 flex rounded-xl items-center gap-1 mx-auto'><span className=' border-2 border-green-400 rounded-[50%] text-center size-[25px]'>{item.message[0]}</span><span>{item.message}</span></div>
                
            ))}
        </div>
    )
}