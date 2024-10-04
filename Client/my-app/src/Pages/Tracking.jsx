import React,{useState,useMemo,useEffect} from 'react'
import {motion} from "framer-motion"
import {useNavigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import "./Pages.css"
import io from "socket.io-client"
import { CarOutlined, DatabaseOutlined,  ProductOutlined, ShoppingCartOutlined, WarningOutlined } from '@ant-design/icons'
import TrackingSub from './TrackingSub'


const Tracking = () => {
  const[orders,setOrders]=useState([]) //the array that stores alll the specific clients orders
  const socket = useMemo(() =>io("http://localhost:5000/Tracking",{
    transports: ['websocket'],
  }),[])


  const navigate= useNavigate()   
 const[Id,setId]= useState("") //id extracted from access token
 const [creatingOrder,setCreatingOrder]= useState(false);

  useEffect(() => {
    const token =localStorage.getItem("accesstoken")  // extracting token from local storage
    if (token) {
      try {
        const decodedToken = jwtDecode(token); //decoding the content of the token
        setId(decodedToken.id); 

        socket.emit("allOrders",decodedToken.id)
       
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  },[]);
  

  useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });
    socket.on("receive",(data)=>{
      setCreatingOrder(false)
      setOrders(prev=>[data,...prev])
      console.log("order data",data)
    })

    socket.on("getOrders",(data)=>{
      setOrders(data)
      console.log("order data",data)
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
        },500)
      }
   })
   socket.on("orderDeleted",(data)=>{
    console.log(data)
    setOrders(prevOrders=>{

      // remove the deleted order from the orders array
      const orderReturned= prevOrders.filter(order=> order._id !==data )

      return orderReturned
     })
})
   
  socket.on("StatusUpdate",(data)=>{
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
        socket.off("Deleted")
        socket.off("orderDeleted")
        socket.off("StatusUpdate")
        socket.off("receive")
        socket.off("getOrders")
        socket.off('disconnect');
              
    }
},[socket,orders])

const [activeOrders, setActiveOrders]= useState([])
const [pendingOrders, setPendingOrders]= useState([])
useEffect(()=>{
   
     
        const activeOrder=orders.filter(order => order.Status==="in-transit")
        setActiveOrders(activeOrder)

        const pendingOrder=orders.filter(order => order.Status==="Pending...")
        setPendingOrders(pendingOrder)
   
},[activeOrders,pendingOrders])



function deleteOrder(order_id,customer_id){  //function to delete an order
 
  setTimeout(()=>{
    socket.emit("deleteOrder",{order_id,customer_id})

  },5000)
    
}



const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState([{ itemName: '', quantity: 1 }]);
const [location,setLocation]= useState({
    origin:"",
    destination:""
})

const togglePopup = () => {
  setIsOpen(!isOpen);
};

const handleItemChange = (index, field, value) => {
  const newItems = [...items];
  newItems[index][field] = value;
  setItems(newItems);
};

const addItem = () => {
  setItems([...items, { itemName: '', quantity: 1 }]);
};

const removeItem = (index) => {
  setItems(items.filter((_, i) => i !== index));
};

const handleSubmit = (e) => {
  e.preventDefault()
  setCreatingOrder(true)
  setTimeout(()=>{
    socket.emit("createOrder",{items,Id,...location})
  },1000)
  
  // Reset form
  
  setItems([{itemName: '', quantity: 1 }]);
  togglePopup();
};

let active=activeOrders.length

 const style={ fontSize: '30px',color:"#555" }
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='w-full bg-stone-100 lg:w-[80%] ml-auto'
    >
      {creatingOrder&&<span className='fixed top-[70px] z-2 -translate-x-[50%] -translate-y-[50%] left-[50%] bg-orange-200'>Creating Order...</span>}
      <div className='bg-blue-400 rounded-2xl mt-[100px] w-[95%] ml-auto flex gap-4 justify-around'>
        <span className="font-bold text-xl text-wrap w-10 ">Order Tracking</span>
        <span className="relative bg-stone-300 rounded-lg  flex items-center">< CarOutlined style={style} /> Active Orders <span className='absolute top-[-5px] right-[-5px] font-thin text-center leading-4 text-sm size-5 rounded-[50%] bg-red-400 text-white'>
        <motion.span
        
        key={active} // Key helps Framer Motion recognize content changes
        dangerouslySetInnerHTML={{ __html: active }}
        initial={{ opacity: 0, y: 10 }} // Starting animation
        animate={{ opacity: 1, y: 0 }} // Ending animation
        exit={{ opacity: 0, y: -10 }} // When content exits
        transition={{ duration: 0.5 }} // Duration of the animation
      />
          </span></span>
        <span className="relative bg-stone-300 rounded-lg flex items-center"><ShoppingCartOutlined style={style}/> Total Orders<span className='absolute top-[-5px] right-[-5px] font-thin text-center leading-4 text-sm size-5 rounded-[50%] bg-red-400 text-white'>
        <motion.div
        
        key={orders.length} // Key helps Framer Motion recognize content changes
        dangerouslySetInnerHTML={{ __html: orders.length }}
        initial={{ opacity: 0, y: 10 }} // Starting animation
        animate={{ opacity: 1, y: 0 }} // Ending animation
        exit={{ opacity: 0, y: -10 }} // When content exits
        transition={{ duration: 0.5 }} // Duration of the animation
      />
          
      </span></span>
        <span className='bg-stone-300 rounded-lg flex items-center'><ProductOutlined style={style}/> Delivered Items</span><span className="bg-stone-300 rounded-lg"></span></div>
      <div className='flex justify-between mt-2 bg-slate-200 w-[95%] ml-auto items-center h-12 rounded-l-2xl gap-2'>
        <section className="font-medium  h-4/5 rounded-2xl leading-9 bg-slate-400 flex w-[110px] "><button  className='rounded-[50%] my-auto  bg-stone-300 size-[30px] '><DatabaseOutlined /></button> View Data</section>
        <span className='font-small'>
          <WarningOutlined color='red'/>
          You have {pendingOrders.length} pending orders
        </span>
        <section className="flex items-center gap-2 h-full">
          <button className='bg-green-300 rounded-2xl h-4/5 font-medium px-2 '>Get Personal report</button>
          <button onClick={togglePopup} className='bg-green-300 rounded-2xl h-4/5 font-medium px-2'>Create Order</button>
        </section>

        
        {isOpen && (
        <div className="fixed inset-0 flex items-center z-[70] justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Create Order</h2>
              <button onClick={togglePopup} className="text-gray-600 hover:text-gray-800">
                &times;
              </button>
            </div>

            <div className="p-4">
              <form onSubmit={handleSubmit}>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Items</label>
                  {items.map((item, index) => (
                    <div key={index} className="mb-2 flex items-center">
                      <input
                        className="w-full px-3 py-2 border rounded mr-2"
                        type="text"
                        placeholder="Item name"
                        value={item.itemName}
                        onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      />
                      <input
                        className="w-24 px-3 py-2 border rounded mr-2"
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      />
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => removeItem(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <section className='flex'>
                      <input type="text" 
                      className="w-24 px-3 py-2 border rounded mr-2"
                       name="location" 
                       id="origin" 
                       onChange={(e) => setLocation({ ...location, origin: e.target.value })}
                       placeholder='Origin'/>

                      <input type="text" 
                      className="w-24 px-3 py-2 border rounded mr-2" 
                      name="location" 
                      id="destination"
                      onChange={(e) => setLocation({ ...location, destination: e.target.value })}
                       placeholder='Destination'/>
                  </section>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-2"
                    onClick={addItem}
                  >
                    Add Item
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                    onClick={togglePopup}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>
      <TrackingSub orders={[...orders]} deleteOrder={deleteOrder}/>
    </motion.div>
  )
}

export default Tracking