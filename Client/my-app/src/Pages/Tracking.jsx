import React,{useMemo,useEffect} from 'react'
import {motion} from "framer-motion"
import {useNavigate} from "react-router-dom"
import io from "socket.io-client"
import { CarOutlined, DatabaseOutlined,  ProductOutlined, ShoppingCartOutlined, WarningOutlined } from '@ant-design/icons'
import TrackingSub from './TrackingSub'
const Tracking = () => {
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

 const style={ fontSize: '30px',color:"#555" }
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='w-full bg-stone-100  lg:w-[80%] ml-auto'
    >
      <div className='bg-blue-400 rounded-2xl mt-[100px] w-[95%] ml-auto flex gap-4 justify-around'>
        <span className="font-bold text-xl text-wrap w-10 ">Order Tracking</span>
        <span className="bg-stone-300 rounded-lg  flex items-center"><ShoppingCartOutlined style={style} /> Active Orders</span>
        <span className="bg-stone-300 rounded-lg flex items-center"><CarOutlined style={style}/> Total Shipments</span>
        <span className='bg-stone-300 rounded-lg flex items-center'><ProductOutlined style={style}/> Delivered Items</span><span className="bg-stone-300 rounded-lg"></span></div>
      <div className='flex justify-between mt-2 bg-slate-200 w-[95%] ml-auto items-center h-12 rounded-l-2xl gap-2'>
        <section className="font-medium  h-4/5 rounded-2xl leading-9 bg-slate-400 flex w-[110px] "><button  className='rounded-[50%] my-auto  bg-stone-300 size-[30px] '><DatabaseOutlined /></button> View Data</section>
        <span className='font-small'>
          <WarningOutlined color='red'/>
          You have 5 pending shipment
        </span>
        <section className="flex items-center gap-2 h-full">
          <button className='bg-green-300 rounded-2xl h-4/5 font-medium px-2 '>Get Personal report</button>
          <button className='bg-green-300 rounded-2xl h-4/5 font-medium px-2'>Create Shipment</button>
        </section>
      </div>
      <TrackingSub />
    </motion.div>
  )
}

export default Tracking