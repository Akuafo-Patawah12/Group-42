import React,{useState,useMemo,useEffect} from 'react'
import {Link} from "react-router-dom"
import "./Pages.css"
import {DeleteOutlined, MessageOutlined,CopyOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'  
import {jwtDecode} from "jwt-decode"
import {motion} from "framer-motion"
import io from "socket.io-client"
import OrderMessagePopup from './OrderMessagePopup'
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
    socket.on("Deleted",(data)=>{
      console.log(data)
      const rowElement = document.getElementById(`row-${data}`);
      if (rowElement) {
        rowElement.classList.add("fade-out");
        
        // Wait for the transition to complete before updating state
        setTimeout(() => {
      setOrders(prevOrders=>{

        // remove the deleted order from the orders array
        const orderReturned= prevOrders.filter(order=> order._id !==data )

        return orderReturned
      })
      }, 500); // Ensure it matches CSS transition duration
    }
       
 })
    socket.on("SendShippment",(data)=>{
       console.log(data)
       setOrders(prevOrders=>{

        const orderReturned = prevOrders.map(order => 
          order._id === data.order_id 
              ? { ...order, Status: data.status }  // Update the matching object
              : order                          // Keep other objects unchanged
      );
      
      return orderReturned;
       })
    })
    socket.on('disconnect',(reasons)=>{
        console.log(reasons)
      })
     
    
    return()=>{
        socket.off('connect');
        socket.off("receivedOrder")
        socket.off("orderDeleted")
        socket.off("SendShippment")
        socket.off('disconnect');
        socket.off("getAllOrders")    
    }
},[navigate])

const[checked,setChecked]= useState([
  {id:""}
])




function deleteOrder(order_id,customer_id){  //function to delete an order
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

    const [msgPop, setMsgPop]= useState(false)

    function copy(id){
      navigator.clipboard.writeText(id)
    }

const style={color:" #57534e", fontSize: "0.875rem", lineHeight: "1.25rem",border:"2px solid  #e7e5e4",paddingBock:"10px"}
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='w-full bg-stone-100 pt-24 lg:w-[80%] ml-auto'
    >
      <button className="ml-[5%] font-medium">#Orders</button>
     <section className=" ml-[5%] pt-4 flex gap-3">
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
     <div className='rounded-xl border-[1px] border-stone-300 py-5 w-[95%] ml-auto mt-3'>
     <table className="w-[95%] bg-white mt-3  overflow-hidden rounded-2xl">
        <thead>  {/*Table head */}
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
        <tbody className="transition-all">
            {orders.map((order,index)=>(
              <tr key={order._id} id={`row-${order._id}`} className='border-b-[1px] border-stone-200 h-[35px]  relative'>
                <td className='flex justify-center item-center'>
                  <input 
                   type="checkbox"
                   value={checked}
                   onCheck={()=>{setChecked(order._id)}}
                   className='my-auto'
                   ></input>
                  </td>
                <td style={{cursor:"pointer",scrollbarWidth:"none",overflowX:"auto",maxWidth:"80px",fontSize: '15px', color:"#57534e"}}>
                <Link to={`/Orders/View_Order/${order.customer_id}`}>{order._id}</Link> {/* Adding the customer id into the URL*/}<span onClick={()=>copy(order._id)}  className='absolute bg-white left-[20%] z-1 top-1'><CopyOutlined /></span>
                </td>
                <td className="pl-2 text-stone-600">{order.customerName} <span onClick={()=>{setMsgPop(!msgPop)}}><MessageOutlined /></span></td>
                <td></td>
                <td onClick={() => deleteOrder(order._id,order.customer_id)}><span className='absolute right-2 top-2'><DeleteOutlined /></span> </td>
                
                <td style={{fontSize: '15px',color:"#57534e"}}>
                  {order.Status}  
                </td> 
                <td></td>
            </tr>
            ))}
        </tbody>
    </table>
    <OrderMessagePopup msgPop={msgPop}/> 
    </div>
    </motion.div>
  )
}

export default Orders