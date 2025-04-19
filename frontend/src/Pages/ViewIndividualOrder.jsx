import React,{useEffect,useState,useMemo} from 'react'
import { useParams,Link } from 'react-router-dom'
import {motion} from "framer-motion"
import {jwtDecode} from "jwt-decode"
import {io} from "socket.io-client"
import "./Pages.css"

const ViewIndividualOrder = () => {

    const {id}=useParams()
    const[orders,setOrders] = useState([])
    const accesstoken=localStorage.getItem("accesstoken")
    const decode=jwtDecode(accesstoken)
    const socket = useMemo(() =>io("http://localhost:5000/orderList",{
        transports: ['websocket'],
      }),[])
   
    useEffect(()=>{
        socket.emit("getUserOrder",id)
        socket.emit("joinRoom",{id:decode.id})
    },[])
    useEffect(()=>{
        socket.on("connect",()=>{
            console.log("user connected")
        })
        socket.on("sendUserOrder",(data)=>{
            console.log(data)
            setOrders(data)
        })
        socket.on('receiveOneOrder',(data)=>{
            if(data.customer_id===id){
                
                    setOrders(prev => [data,...prev])
                
            }
            
            console.log("order data",data)
          })
        socket.on("disconnect",(reason)=>{
            console.log(reason)
        })
        return()=>{
            socket.off("connect")
            socket.off("sendUserOrder")
            socket.off("receiveOneOrder")
            socket.off("disconnect")
        }
    },[socket])
    const style={color:" #57534e", fontSize: "0.875rem", lineHeight: "1.25rem",border:"2px solid  #e7e5e4",paddingBock:"10px"}

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
       className=' w-full bg-stone-100 pt-24 lg:w-[80%] ml-auto '>
        <div className='flex ml-[5%] max-w-[250px]'>
        <Link to={"/Orders"} className='breadcrumb1'>Orders</Link>
        <Link className='breadcrumb'>View Order</Link>
        </div>
        
        <div className='rounded-xl border-[1px] border-stone-300 py-5 w-[95%] ml-auto mt-3'>
        <table className="w-[95%] bg-white mt-3  overflow-hidden rounded-2xl">
        <thead>
            <tr className='bg-stone-300 h-[40px] rounded-2xl'>
                <th><input type="checkbox" ></input></th>
                <th style={style}>#Order ID</th>
                <th style={style}>#Client</th>
                <th style={style}>Product</th>
                <th style={style}>Quantity</th>
                <th style={style}>Status</th>
                <th style={style}>Arrival time</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order,index)=>(
              <tr key={index} className='border-b-[1px] border-stone-200 h-[35px] relative'>
                <td className='flex justify-center item-center'><input type="checkbox" className='my-auto'></input></td>
                <td style={{cursor:"pointer",scrollbarWidth:"none",overflowX:"auto",maxWidth:"80px",fontSize: '15px', color:"#57534e"}}>
                {order._id} 
                </td>
                <td className="pl-2 text-stone-600">{order.customerName} </td>
                <td></td>
                <td ><span className='absolute right-2 top-2'></span> </td>
                
                <td style={{fontSize: '15px',color:"#57534e"}}>
                  {order.Status}  
                </td> 
                <td></td>
            </tr>
            ))}
        </tbody>
    </table>
    </div>
    </motion.div>
  )
}

export default ViewIndividualOrder