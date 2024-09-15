import React,{useMemo,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import io from "socket.io-client"

const Shipment = () => {
  const socket = useMemo(() =>io("http://localhost:5000/Shipping",{
    transports: ['websocket'],
  }),[])

  const navigate= useNavigate()
  useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });

    socket.on("SendShippment",(data)=>{
      console.log(data)
    })
   
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-full bg-stone-100  lg:w-[80%] ml-auto'
    >

      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-2 mt-24 rounded hover:bg-blue-600"
      >
        Create Shipment
      </button>
      <div className=" mx-auto flex w-[90%] gap-3 ">
        <section className="w-[45%] border-2 border-stone-600"></section>
        <section className="w-[45%] border-2 border-stone-600"></section>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center z-[70] justify-center bg-black bg-opacity-50">
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