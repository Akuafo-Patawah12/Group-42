import React,{useMemo,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import io from "socket.io-client"
import { CompassTwoTone } from '@ant-design/icons'
import PostLoader from '../icons/PostLoader'

const Shipment = () => {
  const socket = useMemo(() =>io("http://localhost:5000/Shipping",{
    transports: ['websocket'],
  }),[])

  const [loadingProgress, setLoadingProgress] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
 const [shipments,setShipment] = useState([])
  useEffect(()=>{
    socket.emit("allShipment")
  },[])
  const navigate= useNavigate()
  useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });
    

    socket.on("SendShippment",(data)=>{
      console.log(data)
      setShipment(prevShipment =>[data,...prevShipment])
    })


    const handleFetchData = (data) => {
      fetchData(data);
      console.log(data)
  };
    socket.on("getAllShipment",handleFetchData)
      
      
   
   
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
        socket.off("getAllShipment",handleFetchData)
        socket.off('disconnect');
              
    }
},[socket,navigate,shipments])

const fetchData = async (newData)=>{
  
  try{
    const Alldata= newData.length
    if(!hasFetched){
    for(let i = 0; i < Alldata;i++){
      setShipment(prevData => [...prevData, newData[i]])
      setLoadingProgress(true)
    await new Promise(resolve=> setTimeout(resolve,500))
    }
    
  
  setHasFetched(true);
  setLoadingProgress(false)
  }
}catch(error){
   console.error('Error fetching data:', error)
}
}

const[shippmentDetail,setShippmentDetails]= useState(
  {
    status:"",
    shippingDate:"",
    Tracking_id:"",
    Courier:""
  }
)

function submitShippmentDetails(e){
  e.preventDefault()
  console.log(shippmentDetail)
  socket.emit("StartShippment",shippmentDetail)
}

const [isOpen, setIsOpen] = useState(false);

const togglePopup = () => {
  setIsOpen(!isOpen);
};
  return (
    <motion.div
    initial={{ opacity: 0, perspective: 1000, rotateY: -90 ,y:100}}
    animate={{ opacity: 1, perspective: 1000, rotateY: 0 ,y:0}}
    exit={{ opacity: 0, y:-100 }}
      className='w-full bg-stone-100  lg:w-[80%] ml-auto'
    >

      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-2 mt-24 rounded hover:bg-blue-600"
      >
        Create Shipment
      </button>

      <main className='flex flex-wrap gap-3'>
      
          {shipments.map((shipment,index)=>(
            
            <div key={index} className='flex flex-col rounded-lg border-2 p-4 max-w-[350px] bg-gradient-to-r from-white via-gray-200 to-white'>
            <section className=' flex justify-between'><span className="font-medium text-stone-700"><CompassTwoTone /> Live tracking</span><span><span className='font-medium text-stone-700'>Status:</span> {shipment?.status}</span> </section>
             <section className="text-sm"><span className="font-medium  text-stone-600">Tracking ID:</span> {shipment?.order_id}</section>
             <section className='flex justify-between w-full font-medium mt-2'>
              <span className='text-sm bg-stone-300 relative p-1 rounded-lg'>Origin <span className="absolute -bottom-1 size-2 bg-stone-300 rotate-45 left-2"></span></span>
              <span className='text-sm bg-stone-300 relative p-1 rounded-lg'>Destination <span className="absolute -bottom-1 size-2 bg-stone-300 rotate-45 right-2"></span></span>
             </section>
             <section className='bg-stone-300 relative mt-3 w-full h-[2px] '>
              <span className='bg-stone-300 size-2 absolute -top-[3px] rounded-[50%] left-2'></span>
              <span className='bg-stone-300 size-2 absolute -top-[3px] rounded-[50%] right-2'></span>
             </section>
             <section className='flex justify-between text-sm'>
                <span>{shipment?.origin}</span><span>{shipment?.destination}</span>
             </section>
             <section>{shipment?.shipmentDate}</section>
        </div> 
      ))} {loadingProgress? <PostLoader/>:""}
        </main>


      <div className=" mx-auto flex w-[90%] gap-3 ">
        <section className="w-[45%] border-2 border-stone-600"></section>
        <section className="w-[45%] border-2 border-stone-600"></section>
      </div>
      {isOpen && (
        <div className="fixed inset-0   z-[70]  bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Shipment Details</h2>
              <button onClick={togglePopup} className="text-gray-600 hover:text-gray-800">
                &times;
              </button>
            </div>

            <div className="p-4">
              <form onSubmit={(e)=>{submitShippmentDetails(e)}}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="trackingNumber">
                    Tracking Number
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="text"
                    id="trackingNumber"
                    value={shippmentDetail.Tracking_id}
                    onChange={(e)=>{setShippmentDetails({...shippmentDetail,Tracking_id:e.target.value})}}
                    placeholder="Enter tracking number"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="shipmentDate">
                    Shipment Date
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="date"
                    id="shipmentDate"
                    value={shippmentDetail.shippingDate}
                    onChange={(e)=>{setShippmentDetails({...shippmentDetail,shippingDate:e.target.value})}}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="carrier">
                    Carrier
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="text"
                    id="carrier"
                    value={shippmentDetail.Courier}
                    onChange={(e)=>{setShippmentDetails({...shippmentDetail,Courier:e.target.value})}}
                    placeholder="Enter carrier name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <select onChange={(e)=>{setShippmentDetails({...shippmentDetail,status:e.target.value})}} className="w-full px-3 py-2 border rounded" id="status">
                    <option value="shipped">Shipped</option>
                    <option value="in-transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
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
                    Start shipment
                  </button>
                </div>
              </form>
            </div>
          </div>

          
        </div>
        
      )}
    </motion.div>
  )
}

export default Shipment