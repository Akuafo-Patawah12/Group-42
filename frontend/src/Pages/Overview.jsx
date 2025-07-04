import {useState,useMemo,useEffect} from 'react'
import {motion} from "framer-motion"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card,Badge, Modal, Button, Form, Input , Empty, Typography, Alert, Space } from "antd";

import {jwtDecode} from "jwt-decode"
import "./Pages.css"
import "./Invoice.css"
import {v4} from "uuid"
import { useLocation,useNavigate } from "react-router-dom"
import io from "socket.io-client"
import {toast} from "react-toastify"
import {BarChartOutlined , CarOutlined, DatabaseOutlined,  ProductOutlined, ShoppingCartOutlined, WarningOutlined } from '@ant-design/icons'
import TrackingSub from './TrackingSub'
import LogisticsReport from './LogisticsReport'
import SessionExpiredModal from '../Components/SessionExpiredModal';

const Overview = () => {
   


  const [selectedOrder, setSelectedOrder] = useState(null);

  const [visible,setVisible] = useState(false)
  const locationPath = useLocation();
  const navigate = useNavigate()
  const[shipments,setShipments]=useState([]) //the array that stores alll the specific clients orders
  const socket = useMemo(() =>io("http://localhost:4000/Tracking",{
    transports: ['websocket'],
  }),[])

  useEffect(()=>{
    socket.connect();
  },[socket])
     
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
  },[socket]);
  

  useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });
    socket.on("receive",(data)=>{
      setCreatingOrder(false)
      setShipments(prev=>[data,...prev])
      console.log("order data",data)
    })

    socket.on("getOrders",(data)=>{
     setShipments(data)
      console.log("order data",data)
   })
   
   socket.on("update_shipment",(data)=>{
    console.log(data)
      setShipments(prev=>
         prev.map((order)=> 
           order._id===data._id ? 
              {
                ...order,
                port:data.shipmentId.port,
                route:data.shipmentId.route,
                status:data.shipmentId.status}
                 :
                order
              )
      )
   })

  

   socket.on("Deleted",(data)=>{
        console.log(data)
        const rowElement = document.getElementById(`row-${data}`);
      if (rowElement) {
        rowElement.classList.add("fade-out");
        
        // Wait for the transition to complete before updating state
        setTimeout(() => {
        setShipments(prevOrders=>{

          // remove the deleted order from the orders array
          const orderReturned= prevOrders.filter(order=> order._id !==data )

          return orderReturned
         })
        },500)
      }
   })
   socket.on("orderDeleted",(data)=>{
    console.log(data)
    toast.success("Shipment deleted")
    setShipments(prevOrders=>{

      // remove the deleted order from the orders array
      const orderReturned= prevOrders.filter(order=> order._id !==data )

      return orderReturned
     })
})
   
  socket.on("StatusUpdate",(data)=>{
    console.log(data)
    setShipments(prevOrders=>{

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
      
    socket.on("connect_error", (err)=>{
                  console.log(err)
                   if (err.message.includes("Refresh token expired")) {
                                  
                                    setVisible(true) 
                              
                               }
                else if(err.message.includes("No cookies found")){
                  setTimeout(()=>{
                  setVisible(true)
                },1000)
                  
               }
                });
    
    return()=>{
        socket.off('connect');
        socket.off("Deleted")
        socket.off("orderDeleted")
        socket.off("StatusUpdate")
        socket.off("receive")
        socket.off("getOrders")
        socket.off('disconnect');
              
    }
},[socket,shipments])


const [selectedFilter, setSelectedFilter] = useState("All");
const [filteredOrders, setFilteredOrders] = useState([]);

// Function to filter orders based on status
useEffect(() => {
  if (shipments.length > 0) {
    setFilteredOrders(shipments);
    setData(processData(shipments)); // Ensure data is set initially
  }
}, [shipments]); // Runs when `orders` is updated

const filterOrders = (status) => {
  setSelectedFilter(status);

  if (status === "All") {
    setFilteredOrders(shipments);
  } else {
    const orderItem = shipments.filter(order => 
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
   
     
        const activeOrder= shipments.filter(order => order.Status==="in-Transit")
        setActiveOrders(activeOrder)

        const pendingOrder= shipments.filter(order => order.Status==="Pending")
        setPendingOrders(pendingOrder)
   
},[shipments])


function pending(){
  const pendingOrders = shipments.filter((order) => order.Status === "Pending");
    setShipments(pendingOrders);
}

function transit(){
  const pendingOrders = shipments.filter((order) => order.Status === "in-Transit");
    setShipments(pendingOrders);
}


function deleteOrder(order_id,customer_id){  //function to delete an order
 
 
    socket.emit("deleteOrder",{order_id,customer_id},(response)=>{
       if(response.status==="error"){
         toast.error(response.message)
       }
    })


    
}



const [isOpen, setIsOpen] = useState(false);

const [location,setLocation]= useState("")
const [suppliersNumber,setSupplierNumber] = useState("")
const [description,setDescription]= useState("")

const togglePopup = () => {
  setIsOpen(!isOpen);
};



  useEffect(() => {
    // Check if the 'showModal' query parameter exists in the URL
    const params = new URLSearchParams(locationPath.search);
    if (params.get('showModal') === 'true') {
      setIsOpen(true);  // Open the modal if 'showModal=true' is present in the URL
    }
  }, [locationPath.search]);

  const handleCloseModal = () => {
    setIsOpen(false);

    // Remove the 'showModal' query parameter from the URL
    navigate('/customer/overview', { replace: true });
  };



let active=activeOrders.length

 const style={ fontSize: '20px',color:"#555" }






 

function shortUUID(length = 12) {
  const uuid = v4().replace(/-/g, '');
  const base10 = BigInt('0x' + uuid);
  const base36 = base10.toString(36); // Use base 36 (max allowed)
  return base36.slice(0, length);
}
 
 
 
 const handleSubmit = () => {
   
   setCreatingOrder(true)
   console.log({Id:Id,location,description,suppliersNumber,tracking_id: shortUUID()})
   setTimeout(()=>{
     socket.emit("createOrder",{Id:Id,location,description,suppliersNumber,tracking_id: shortUUID()})
   },1000)
   
   // Reset form
   
   
   togglePopup();
 };
 
 
 
 
 
   
 
   
   
   
 const processData = (shipments) => {
  const monthlyOrders = {};

  shipments.forEach((order) => {
    const date = new Date(order.createdAt);
    const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`; // e.g., "Jan 2024"

    if (!monthlyOrders[monthYear]) {
      monthlyOrders[monthYear] = 0;
    }
    monthlyOrders[monthYear] += 1;
  });

  return Object.keys(monthlyOrders).map((month) => ({
    month,
    shipments: monthlyOrders[month],
  }));
};


  const [data, setData] = useState([]);

  useEffect(() => {
  if (shipments && shipments.length > 0) {
    setData(processData(shipments));
  }
}, [shipments]);

   
   
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
  
 
  
 
   
 

 
   

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className=' layout-shift w-full bg-stone-100 pt-5 lg:w-[80%] '
    >
      {creatingOrder && (
  <div className="fixed top-[70px] left-1/2 transform -translate-x-1/2 z-50 bg-purple-100 text-orange-800 px-4 py-2 rounded-lg shadow-md flex items-center space-x-3">
    <svg
      className="animate-spin h-5 w-5 text-purple-800"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
    <span style={{marginLeft:"4px"}}>Creating Order.</span>
  </div>
)}

<div  style={{margin: '70px auto 0'}} className="w-[95%] mt-[70px] p-4 grid  grid-cols-3 md:grid-cols-4 gap-4 items-center bg-white rounded-xl shadow-md mx-auto">

{/* Title spans full width on md, 2 cols on sm */}
<div className="col-span-3 md:col-span-1">
  <span className="font-bold text-md text-center sm:text-xl">Shipments Overview</span>
</div>

{/* Active Orders */}
<div>
  <Badge count={active} size="small" offset={[5, -5]}>
    <span className="border border-purple-200 bg-gray-100 px-3 py-3 rounded-lg flex flex-col items-center justify-center gap-2 font-medium text-sm md:flex-row text-center">
      <CarOutlined style={style} /> Active Shipments
    </span>
  </Badge>
</div>

{/* Total Shipments */}
<div >
  <Badge count={shipments.length} size="small" offset={[5, -5]}>
    <span className="border border-purple-200 bg-gray-100 px-3 py-3 rounded-lg flex flex-col items-center justify-center gap-2 font-medium text-sm md:flex-row text-center">
      <ShoppingCartOutlined style={style} /> Total Shipments
    </span>
  </Badge>
</div>

{/* Delivered Items */}
<div>
  <span className="border border-purple-200 bg-gray-100 px-3 py-3 rounded-lg flex flex-col items-center justify-center gap-2 font-medium text-sm md:flex-row text-center">
    <ProductOutlined style={style} /> Delivered Items
  </span>
</div>
</div>


      <div style={{marginInline:"auto",marginTop:"8px"}} className='flex  justify-between mt-2 bg-purple-100 border border-purple-200 w-[95%] mx-auto items-center py-4 rounded-2xl gap-2 '>
        <div className="flex flex-col px-[2%] w-full gap-3 md:flex-row">
        

        <Card className="w-full rounded-xl shadow-md md:w-1/2">
      {/* View Data Section */}
      <div className="flex items-center justify-between bg-gray-100 border border-purple-200 p-4 rounded-lg">
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
        <Button type="primary" style={{background:"var(--purple)"}}>Personal Report</Button>
        <Button type="primary" style={{background:"var(--purple)"}} text-white onClick={() => setIsOpen(true)}>
          Request Quote
        </Button>
      </Space>
    </Card>
     

    <Card  className="w-full rounded-xl shadow-md md:w-1/2">
      {/* View Analytics Section */}
      <div className="flex items-center justify-between bg-gray-100 border border-purple-200 p-4 rounded-lg">
        <Button shape="circle" icon={<BarChartOutlined />} size="large" />
        <Typography.Text className="font-medium">Analytics overview</Typography.Text>
      </div>

     

     
      {shipments.length===0 ?<div style={{marginTop:"10px"}}><Empty styles={{ image:{ height: 50 } }} description="No shipment" /> </div>:
      <ResponsiveContainer width="100%" height={190}>
    <BarChart data={data}>
      <XAxis dataKey="month" />
      <YAxis allowDecimals={false} />
      <Tooltip  />
      <Bar dataKey="shipments" fill="#c084fc" barSize={18} radius={[8, 8, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>}
        
    </Card>
        
        </div>
        </div>
        
       
        

       
      
      
    

  

 

      {/* Request a quote modal */}
      <Modal
        title={
          <>
          <div className=" pb-3">
            Request a Quote
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-white via-stone-300 to-white"></div>
          </>
        }
        open={isOpen}
        onCancel={()=>handleCloseModal()}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
         

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter the product location" }]}
          >
            <Input placeholder="Enter the product location" style={{paddingBlock:"7px"}} value={location} onChange={(e)=> setLocation(e.target.value)}/>
          </Form.Item>
          
          <Form.Item label="Supplier Number" name="suppliersNumber">
            <Input placeholder="Enter supplier number (Optional)" style={{paddingBlock:"7px"}} value={suppliersNumber} onChange={(e)=> setSupplierNumber(e.target.value)}/>
          </Form.Item>

          <Form.Item
            label="Description"
            name="message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea rows={4} placeholder="Describe your request" value={description} onChange={(e)=> setDescription(e.target.value)}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{paddingBlock:"7px",background:"var(--purple)"}}>
              Submit Request
            </Button>
          </Form.Item>
        </Form>
      </Modal>
  

      <SessionExpiredModal visible={visible}/>
      {selectedOrder && <LogisticsReport order={selectedOrder} loading3={loading3} visible={isVisible} onClose={CloseReport} />} 
      <TrackingSub orders={[...filteredOrders]} setSelectedOrder={setSelectedOrder} handleOpen={handleOpen} filterOrders={filterOrders} selectedFilter={selectedFilter} deleteOrder={deleteOrder} pending={pending} transit={transit}/>
    </motion.div>
  );
};

export default Overview;
