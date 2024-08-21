import React,{useMemo,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from "framer-motion"
import io from "socket.io-client"
const Logistics = () => {
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
    className='w-full bg-stone-100  lg:w-[80%] ml-auto'
    >
      <div className='bg-blue-400 w-1/5 pt-5 mt-24 mx-auto'>
      <form>
           <input type="text" ></input>
           <input type="text" ></input>
           <input type="text" ></input>
           <input type="text" ></input>
           <input type="submit" ></input>
        </form>
        </div>
    </motion.div>
  )
}

export default Logistics