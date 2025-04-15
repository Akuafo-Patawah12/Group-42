import React,{useState,useMemo,useEffect} from 'react'
import {motion} from "framer-motion"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card,Badge, Modal, Button, Form, Input , Empty, Typography, Alert, Space } from "antd";

import {jwtDecode} from "jwt-decode"
import "./Pages.css"
import "./Invoice.css"
import {v4} from "uuid"

import io from "socket.io-client"

import {BarChartOutlined , CarOutlined, DatabaseOutlined,  ProductOutlined, ShoppingCartOutlined, WarningOutlined } from '@ant-design/icons'
import TrackingSub from './TrackingSub'
import LogisticsReport from './LogisticsReport'

const Overview = () => {
   


  const [selectedOrder, setSelectedOrder] = useState(null);

  

  const[orders,setOrders]=useState([]) //the array that stores alll the specific clients orders
  const socket = useMemo(() =>io("http://localhost:4000/Tracking",{
    transports: ['websocket'],
  }),[])


     
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


const [selectedFilter, setSelectedFilter] = useState("All");
const [filteredOrders, setFilteredOrders] = useState([]);

// Function to filter orders based on status
useEffect(() => {
  if (orders.length > 0) {
    setFilteredOrders(orders);
    setData(processData(orders)); // Ensure data is set initially
  }
}, [orders]); // Runs when `orders` is updated

const filterOrders = (status) => {
  setSelectedFilter(status);

  if (status === "All") {
    setFilteredOrders(orders);
  } else {
    const orderItem = orders.filter(order => 
      order.Status && order.Status.toLowerCase() === status.toLowerCase()
    );
    setFilteredOrders(orderItem);
    
  }
};

// Update chart when filteredOrders change
useEffect(() => {
  setData(processData(filteredOrders));
}, [filteredOrders]);


const [activeOrders, setActiveOrders]= useState([])
const [pendingOrders, setPendingOrders]= useState([])
useEffect(()=>{
   
     
        const activeOrder= orders.filter(order => order.Status==="in-Transit")
        setActiveOrders(activeOrder)

        const pendingOrder= orders.filter(order => order.Status==="Pending")
        setPendingOrders(pendingOrder)
   
},[orders])


function pending(){
  const pendingOrders = orders.filter((order) => order.Status === "Pending");
    setOrders(pendingOrders);
}

function transit(){
  const pendingOrders = orders.filter((order) => order.Status === "in-Transit");
    setOrders(pendingOrders);
}


function deleteOrder(order_id,customer_id){  //function to delete an order
 
  setTimeout(()=>{
    socket.emit("deleteOrder",{order_id,customer_id})

  },5000)
    
}



const [isOpen, setIsOpen] = useState(false);

const [location,setLocation]= useState("")
const [supplierNumber,setSupplierNumber] = useState("")
const [description,setDescription]= useState("")

const togglePopup = () => {
  setIsOpen(!isOpen);
};







let active=activeOrders.length

 const style={ fontSize: '20px',color:"#555" }






 


 
 
 
 const handleSubmit = () => {
   
   setCreatingOrder(true)
   console.log({Id:Id,location,description,supplierNumber,tracking_id: v4()})
   setTimeout(()=>{
     socket.emit("createOrder",{Id:Id,location,description,supplierNumber,tracking_id: v4()})
   },1000)
   
   // Reset form
   
   
   togglePopup();
 };
 
 
 
 
 
   
 
   
   
   
 const processData = (orders) => {
  const monthlyOrders = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`; // e.g., "Jan 2024"

    if (!monthlyOrders[monthYear]) {
      monthlyOrders[monthYear] = 0;
    }
    monthlyOrders[monthYear] += 1;
  });

  return Object.keys(monthlyOrders).map((month) => ({
    month,
    orders: monthlyOrders[month],
  }));
};


  const [data, setData] = useState([]);

  useEffect(() => {
  if (orders && orders.length > 0) {
    setData(processData(orders));
  }
}, [orders]);

   
   
 const [isVisible,setIsVisible] = useState(false)
 const [loading3,setLoading3]= useState(false)
   
const handleOpen = () => {
  setLoading3(true);
  setIsVisible(true);

  // Simulating data fetching delay
  setTimeout(() => {
    
    setLoading3(false);
  }, 1000);
};

const CloseReport = () => {
  setIsVisible(false);
  setSelectedOrder(null);
};
  
 
  
 
   
 

 
   const [activeIndex, setActiveIndex] = useState(null);
 
   const toggleDimensions = (index) => {
     setActiveIndex(activeIndex === index ? null : index); // Toggle visibility
   };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className=' layout-shift w-full bg-stone-100 pt-5 lg:w-[80%] '
    >
      {creatingOrder&&<span className='fixed top-[70px] z-2 -translate-x-[50%] -translate-y-[50%] left-[50%] bg-orange-200'>Creating Order...</span>}
      <Card
      style={{
  width: '95%',
  margin: '70px auto 0',
  padding: '0.5rem',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '1rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}}

    >
      {/* Title */}
      <span className="font-bold text-lg sm:text-xl">Shipments Overview</span>

      {/* Active Orders */}
      <Badge count={active} size="small" offset={[5, -5]}>
        <span className="bg-stone-100 px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
          <CarOutlined style={style} /> Active Orders
        </span>
      </Badge>

      {/* Total Shipments */}
      <Badge count={orders.length} size="small" offset={[5, -5]}>
        <span className="bg-stone-100 px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
          <ShoppingCartOutlined style={style} /> Total Shipments
        </span>
      </Badge>

      {/* Delivered Items */}
      <span className="bg-stone-100 px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
        <ProductOutlined style={style} /> Delivered Items
      </span>
    </Card>
      <div style={{marginInline:"auto",marginTop:"8px"}} className='flex  justify-between mt-2 bg-slate-200 w-[95%] mx-auto items-center py-4 rounded-2xl gap-2 '>
        <div className="flex flex-col px-[2%] w-full gap-3 md:flex-row">
        

        <Card className="w-full rounded-xl shadow-md md:w-1/2">
      {/* View Data Section */}
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
        <Button shape="circle" icon={<DatabaseOutlined />} size="large" />
        <Typography.Text className="font-medium">View Data</Typography.Text>
      </div>

      {/* Pending Shipments Alert */}
      <Alert
        message={`You have ${pendingOrders.length} pending shipments`}
        type="warning"
        showIcon
        icon={<WarningOutlined />}
        style={{marginBlock:"12px"}}
        
      />

      {/* Actions */}
      <Space>
        <Button type="primary" className="bg-[var(--purple)]">Personal Report</Button>
        <Button type="primary" className="bg-[var(--purple)]" text-white onClick={() => setIsOpen(true)}>
          Request Quote
        </Button>
      </Space>
    </Card>
     

    <Card  className="w-full rounded-xl shadow-md md:w-1/2">
      {/* View Analytics Section */}
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
        <Button shape="circle" icon={<BarChartOutlined />} size="large" />
        <Typography.Text className="font-medium">Analytics overview</Typography.Text>
      </div>

     

     
      {orders.length===0 ?<div><Empty styles={{ image:{ height: 50 } }} description="No shipment" /> </div>:
      <ResponsiveContainer width="100%" height={190}>
    <BarChart data={data}>
      <XAxis dataKey="month" />
      <YAxis allowDecimals={false} />
      <Tooltip  />
      <Bar dataKey="orders" fill="#c084fc" barSize={20} />
    </BarChart>
  </ResponsiveContainer>}
        
    </Card>
        
        </div>
        </div>
        
       
        

       
      
      
    

  

 

      {/* Request a quote modal */}
      <Modal
        title="Request a Quote"
        open={isOpen}
        onCancel={()=>setIsOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
         

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter the product location" }]}
          >
            <Input placeholder="Enter the product location" value={location} onChange={(e)=> setLocation(e.target.value)}/>
          </Form.Item>
          
          <Form.Item label="Supplier Number" name="supplierNumber">
            <Input placeholder="Enter supplier number (Optional)" value={supplierNumber} onChange={(e)=> setSupplierNumber(e.target.value)}/>
          </Form.Item>

          <Form.Item
            label="Description"
            name="message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea rows={4} placeholder="Describe your request" value={description} onChange={(e)=> setDescription(e.target.value)}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Request
            </Button>
          </Form.Item>
        </Form>
      </Modal>
  


      {selectedOrder && <LogisticsReport order={selectedOrder} loading3={loading3} visible={isVisible} onClose={CloseReport} />} 
      <TrackingSub orders={[...filteredOrders]} setSelectedOrder={setSelectedOrder} handleOpen={handleOpen} filterOrders={filterOrders} selectedFilter={selectedFilter} deleteOrder={deleteOrder} pending={pending} transit={transit}/>
    </motion.div>
  );
};

export default Overview;
