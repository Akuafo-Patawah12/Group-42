import React,{useState,useMemo,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from "jwt-decode"
import {motion} from "framer-motion"
import io from "socket.io-client"
const Orders = () => {

    const accesstoken=localStorage.getItem("accesstoken")
    const decode=jwtDecode(accesstoken)
  const socket = useMemo(() =>io("http://localhost:5000/orderList",{
    transports: ['websocket'],
  }),[])
  const navigate= useNavigate()

  useEffect(()=>{
    socket.emit("joinRoom",{id:decode.id})
  },[])


  useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });
    
   socket.on("joined",(data)=>{
       console.log(data)
   }) 

    socket.on('receivedOrder',(data)=>{
      console.log("order data",data)
    })
   
    socket.on('disconnect',(reasons)=>{
        console.log(reasons)
      })
     
    
    return()=>{
        socket.off('connect');
        socket.off("receivedOrder")
        
        socket.off('disconnect');
              
    }
},[socket,navigate])
const [inputValue, setInputValue] = useState('');

    // Predefined options for the datalist
    const options = [
        "All",
        "Delivered",
        "In Transit",
        "Pending"
    ];

    // Handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

const style={color:" #57534e", fontSize: "0.875rem", lineHeight: "1.25rem",border:"2px solid  #e7e5e4"}
  return (
    <motion.div
    className='w-full bg-stone-100  lg:w-[80%] ml-auto'
    >
     <section className="mt-24 pt-4 flex gap-3">
       <form >
           <input 
              type="text"
               placeholder='Filter orders'
               autoComplete={false}
               className='h-10 border-2 border-stone-200'
               ></input>
       </form>
       <input
                id="activity"
                list="activities"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Filter by activity"
                style={{
                    width: '110px',
                    padding: '6px',
                    border: '2px solid #e7e5e4',
                    borderRadius: '5px',
                    fontSize: '16px',
                    color: '#333'
                }}
            />
            <datalist id="activities">
                {options.map((option, index) => (
                    <option key={index} value={option} />
                ))}
            </datalist>
     </section>
     <table className="w-[95%] bg-white mt-3 ml-auto">
        <thead>
            <tr>
                <th style={style}>Order ID</th>
                <th style={style}>Product</th>
                <th style={style}>Quantity</th>
                <th style={style}>Price</th>
                <th style={style}>Status</th>
                <th style={style}>Arrival time</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                
            </tr>
            <tr>
                
            </tr>
            <tr>
                
            </tr>
        </tbody>
    </table>
    </motion.div>
  )
}

export default Orders