import React,{useState,useMemo,useEffect} from 'react'
import {DeleteOutlined } from '@ant-design/icons'
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
 const[orders,setOrders]=useState([])
  useEffect(()=>{
    socket.emit("joinRoom",{id:decode.id})
  },[socket])

  useEffect(()=>{
     socket.emit("clientOrders")
  },[])
 
  useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });
    
   socket.on("joined",(data)=>{
       console.log(data)
   }) 
   socket.on("getAllOrders",(data)=>{
    console.log(data)
      setOrders(data)
   })
    socket.on('receivedOrder',(data)=>{
      setOrders(prev => [data,...prev])
      console.log("order data",data)
    })
    socket.on("orderDeleted",(data)=>{
      setOrders(prevOrders=>{
         const updatedOrders = prevOrders.filter(order => order._id !== data);
        
         // Return the updated array
         return updatedOrders;
     })
    })
   
    socket.on('disconnect',(reasons)=>{
        console.log(reasons)
      })
     
    
    return()=>{
        socket.off('connect');
        socket.off("receivedOrder")
        socket.off("orderDeleted")
        socket.off('disconnect');
        socket.off("getAllOrders")    
    }
},[navigate])

function deleteOrder(order_id,customer_id){
    socket.emit("deleteOrder",{order_id,customer_id}) 
}
const [inputValue, setInputValue] = useState('');
    // Predefined options for the datalist
    const Options = [
        "#All",
        "#Delivered",
        "#In Transit",
        "#Pending"
    ];

    // Handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

const style={color:" #57534e", fontSize: "0.875rem", lineHeight: "1.25rem",border:"2px solid  #e7e5e4",paddingBock:"10px"}
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
            <datalist id="activities" className='bg-[#333]'>
                {Options.map((Option, index) => (
                    <option key={index} value={Option} />
                ))}
            </datalist>
     </section>
     <div className='rounded-xl border-2 border-stone-300 py-5 w-[95%] ml-auto mt-3'>
     <table className="w-[95%] bg-white mt-3  rounded-2xl border-2 border-stone-200">
        <thead>
            <tr className='bg-stone-300 h-[40px] rounded-2xl'>
                <th><input type="checkbox" ></input></th>
                <th style={style}>Order ID</th>
                <th style={style}>Product</th>
                <th style={style}>Quantity</th>
                <th style={style}>Date</th>
                <th style={style}>Status</th>
                <th style={style}>Arrival time</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order,index)=>(
              <tr key={index} className='border-b-[1px] border-stone-200 h-[35px]'>
                <td className='flex justify-center item-center'><input type="checkbox" className='my-auto'></input></td>
                <td style={{cursor:"pointer",scrollbarWidth:"none",overflowX:"auto",maxWidth:"80px",fontSize: '15px', color:"#57534e"}}>
                  {order._id}
                </td>
                <td></td>
                <td></td>
                <td onClick={() => deleteOrder(order._id,customer_id)}><DeleteOutlined /> </td>
                
                <td style={{fontSize: '15px',color:"#57534e"}}>
                  {order.Status}  
                </td> 
            </tr>
            ))}
        </tbody>
    </table>
    </div>
    </motion.div>
  )
}

export default Orders