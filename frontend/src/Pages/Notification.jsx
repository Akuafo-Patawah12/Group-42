import React, { useEffect,useState } from 'react'
import io from 'socket.io-client'
export default function Notification(){
    const socket= io("http://localhost:4000/notify",{transports: ['websocket']});

    const[notification,setNotification]= useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log("Connected to server")
            
        });
        socket.on("orderNotification",(data)=>{
            console.log(data)
            setLoading(false)
            setNotification(prev=>[data,...prev])
        })
        socket.on("notify",(data)=>{
            console.log(data)
            
            setNotification(prev=>[data,...prev])
        })
        socket.on('disconnect',(reasons)=>{
            console.log(reasons)
            
        });
        return()=>{
            socket.off("orderNotification")
            socket.off("notify")
            socket.off('connect')
            socket.off('disconnect')
        }
    },[socket])
    return(
        <div className='mt-[120px] flex flex-col gap-3'>
            {loading ? (
                <div className="flex justify-center items-center h-20">
                <div className="w-8 h-8 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
            <>
            {notification.map((item,index)=>(
                <div key={index} className='w-[50%] bg-stone-100 h-9 flex rounded-xl items-center gap-1 mx-auto'><span className=' border-2 border-green-400 rounded-[50%] text-center size-[25px]'>{item.message[0]}</span><span>{item.message}</span></div>
                
            ))}
            </>
            )
            }
        </div>
    )
}