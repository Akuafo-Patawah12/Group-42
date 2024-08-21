import React,{useMemo,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import io from "socket.io-client"

const Inventory = () => {
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-full bg-stone-100  lg:w-[80%] ml-auto'
    >Inventry</motion.div>
  )
}

export default Inventory