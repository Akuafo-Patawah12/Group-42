import React,{useState,useMemo,useEffect} from 'react'
import {motion} from "framer-motion"
import {useNavigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import "./Pages.css"
import "./Invoice.css"
import {v4} from "uuid"
import {Link} from "react-router-dom"
import io from "socket.io-client"

import { PlusOutlined,CarOutlined, DatabaseOutlined,  ProductOutlined, ShoppingCartOutlined, WarningOutlined } from '@ant-design/icons'
import TrackingSub from './TrackingSub'

const Overview = () => {
   



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





let active=activeOrders.length

 const style={ fontSize: '30px',color:"#555" }






 // Pop up info


 
     
 
       
       
     
     
 
 
 
 
 
 
 
     
 
 
 
 
 
 
 
 
 const addItem = () => {
   setItems([...items, {  description: "", trackingNo: "", ctnNo: "", cbm: "", amount: "" }]);
 };
 
 const removeItem = (index) => {
   setItems(items.filter((_, i) => i !== index));
 };
 
 const handleSubmit = (e) => {
   e.preventDefault()
   setCreatingOrder(true)
   setTimeout(()=>{
     socket.emit("createOrder",{items,...location,tracking_id: v4()})
   },1000)
   
   // Reset form
   
   setItems([{ description: "", trackingNo: "", ctnNo: "", cbm: "", amount: "" }]);
   togglePopup();
 };
 
 
 
 
 
   
 
   const [invoiceNumber, setInvoiceNumber] = useState("");
   const [invoiceDate, setInvoiceDate] = useState("");
   const [invoiceDueDate, setInvoiceDueDate] = useState("");
   
 
   const[total,setTotal] =useState(0)
   
   const [items, setItems] = useState([
       { description: "", trackingNo: "", ctnNo: "", cbm: "", Amount: "",length:"",width:"",height:"" }
   ]);
 
   // Generate a random invoice number
   const generateInvoiceNumber = () => {
       const invNumber = 'INV-' + Math.floor(100000 + Math.random() * 900000);
       setInvoiceNumber(invNumber);
   };
 
   // Format the date to dd/mm/yyyy
   const formatDateToDDMMYYYY = (date) => {
       let dd = date.getDate();
       let mm = date.getMonth() + 1; // Months are zero-based
       const yyyy = date.getFullYear();
 
       // Ensure two digits for day and month
       if (dd < 10) dd = '0' + dd;
       if (mm < 10) mm = '0' + mm;
 
       return `${dd}/${mm}/${yyyy}`;
   };
 
   useEffect(() => {
     const newTotal = items.reduce((sum, row) => {
       const amount = parseFloat(row.Amount) || 0;
       return sum + amount;
     }, 0);
     setTotal(newTotal.toFixed(2));
   }, [items]); // Only rerun when items change
 
   function calculateCBM(index) {
     // Create a new array to avoid mutating the state directly
     const newItems = [...items];
     
     // Calculate CBM based on dimensions
     const cbm = items[index].length * items[index].width * items[index].height;
     newItems[index]["cbm"] = cbm.toFixed(3);
 
     // Calculate the amount based on CBM
     const amount = cbm * 230;
     newItems[index]["Amount"] = amount.toFixed(2);
 
     // Update the items state, which will trigger the effect to recalculate the total
     setItems(newItems);
     setActiveIndex(activeIndex === index ? null : index);
 
   }
 
   
 
   // Set the current date as Invoice Date and format it
   const setInvoice_date = () => {
       const today = new Date();
       setInvoiceDate(formatDateToDDMMYYYY(today));
       setInvoiceDueDate(formatDateToDDMMYYYY(new Date(today.setDate(today.getDate() + 3))));
   };
 
 
  
 
   // Handle input changes for item rows
   const handleInputChange = (index, event) => {
       const { name, value } = event.target;
       const newItems = [...items];
       newItems[index][name] = value;
 
       if (name === "length" || name === "width" || name === "height") {
           const length = parseFloat(newItems[index].length || 0);
           const width = parseFloat(newItems[index].width || 0);
           const height = parseFloat(newItems[index].height || 0);
           const cbm = (length * width * height).toFixed(3);
           newItems[index].cbm = cbm;
 
           // Calculate amount (example rate: $230 per CBM)
           newItems[index].Amount = (cbm * 230).toFixed(2);
       }
 
       setItems(newItems);
   };
 
   // Initialize on component mount
   useEffect(() => {
       generateInvoiceNumber();
       setInvoice_date();
   }, []);
 
 

 
   const [activeIndex, setActiveIndex] = useState(null);
 
   const toggleDimensions = (index) => {
     setActiveIndex(activeIndex === index ? null : index); // Toggle visibility
   };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='w-full bg-stone-100 lg:w-[80%] ml-auto'
    >
      {creatingOrder&&<span className='fixed top-[70px] z-2 -translate-x-[50%] -translate-y-[50%] left-[50%] bg-orange-200'>Creating Order...</span>}
      <div className='bg-purple-300 rounded-2xl mt-[100px] w-[95%] mx-auto flex gap-4 justify-around'>
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
      <div className='flex justify-between mt-2 bg-slate-200 w-[95%] mx-auto items-center h-12 rounded-l-2xl gap-2'>
        <section className="font-medium  h-4/5 rounded-2xl leading-9 bg-slate-400 flex w-[110px] "><button  className='rounded-[50%] my-auto  bg-stone-300 size-[30px] '><DatabaseOutlined /></button> View Data</section>
        <span className='font-small'>
          <WarningOutlined color='red'/>
          You have {pendingOrders.length} pending orders
        </span>
        <section className="flex items-center gap-2 h-full">
          <button className='bg-[var(--purple)] text-white rounded-2xl h-4/5 font-medium px-2 '>Get Personal report</button>
          <button onClick={togglePopup} className='bg-[var(--purple)] text-white rounded-2xl h-4/5 font-medium px-2'>Create Order</button>
        </section>

        
        {isOpen && (
            <div style={{borderRadius:"15px 0 15px 0"}} className="w-full bg-white fixed z-50 bottom-0 h-[85vh] overflow-y-auto left-0">
<div>
</div>

        <div>
        <div  style={{padding:"16px"}}>
        
              <form onSubmit={handleSubmit}>
              
                  <p style={{marginTop:"30px",paddingBottom:"10px"}}>Shipments Details</p>
                  <section style={{border:"1px solid #ddd"}} className='hero'>
    <table className="details-table">
  <thead>
    <tr>
      <th>DESCRIPTION</th>
      <th>TRACKING NO.</th>
      <th>CTN NO.</th>
      <th>CBM</th>
      <th>Amount $</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item, index) => (
      <tr key={index} className="table-row">
        <td>
          <input
            type="text"
            name="description"
            value={item.description}
            onChange={(e) => handleInputChange(index, e)}
          />
        </td>
        <td>
          <input
            type="text"
            name="trackingNo"
            value={item.trackingNo}
            onChange={(e) => handleInputChange(index, e)}
          />
        </td>
        <td>
          <input
            type="text"
            name="ctnNo"
            value={item.ctnNo}
            onChange={(e) => handleInputChange(index, e)}
          />
        </td>
        <td style={{display:"flex",minWidth:"100px"}}>
          <input
            type="text"
            name="cbm"
            placeholder="Dimension"
            value={item.cbm}
            onChange={(e) => handleInputChange(index, e)}
            disabled={true}
          />
          <button>Add</button>
        </td>
        <td>
          <input
            type="text"
            name="amount"
            value={item.Amount}
            onChange={(e) => handleInputChange(index, e)}
            disabled={true}
          />
        </td>
        <td>
          <button
            type="button"
            className="remove-item-button"
            onClick={() => removeItem(index)}
          >
            &times;
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


{items.map((item, index) => (
  <div key={index} className="table">
  
  <section>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleInputChange(index, e)}
          />
        </section>
        <section>
          <input
            type="text"
            name="trackingNo"
            placeholder='Tracking No.'
            value={item.trackingNo}
            onChange={(e) => handleInputChange(index, e)}
          />
        </section>
        <section>
          <input
            type="text"
            name="ctnNo"
            placeholder="Ctn No."
            value={item.ctnNo}
            onChange={(e) => handleInputChange(index, e)}
          />
        </section>
        <section>
          <input
            type="text"
            name="cbm"
            placeholder="CBM"
            value={item.cbm}
            disabled={true}
            style={{cursor:"not-allowed"}}
            onChange={(e) => handleInputChange(index, e)}
          />
          <button className="dimensions" type="button" onClick={() => toggleDimensions(index)} >Add dimensions</button>
        </section>
        <section>
          <input
            type="text"
            name="amount"
            placeholder="Amount $"
            value={item.Amount}
            style={{cursor:"not-allowed"}}
            onChange={(e) => handleInputChange(index, e)}
            disabled={true}
          />
        </section>
        {activeIndex === index && (<div className='dimen-container'>
        
        <div className="dimen">
        <div className="dimen-index">{index+1}</div>
        <button type="button" onClick={()=> toggleDimensions(index)} className='close-dimen'>X</button>
          <input type='number' placeholder='Width'
            name="width"
            value={item.width}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input type='number' placeholder='Height'
            name="height"
            value={item.height}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input type='number' placeholder='Length'
            name="length"
            value={item.length}
            onChange={(e) => handleInputChange(index, e)}
          />

          <button type="button" onClick={()=> calculateCBM(index)}>Add</button>
        </div>
        </div>)}


        <section>
          <button
            type="button"
            className="remove-item-button"
            onClick={() => removeItem(index)}
          >
            &times;
          </button>
        </section>
        <div className='table-index'>{index + 1}</div>
  </div>
))}
                 
<div className="total">
  <section>Total</section>
  <section>${total}</section>
</div>   
                  <button
                    type="button"
                    className="add_btn"
                    onClick={addItem}
                  >
                    <PlusOutlined />
                    Add Item
                  </button>
                 
                  </section>
                
                
               


            <div class="order_note">
            <h3>Note:</h3>
            <ol>
                <li>SFGL does not ship contraband goods. Your goods will be security checked.</li>
                <li>Our departure timelines are subject to cargo availability.</li>
                <li>Ship transit times may change without recourse to us.</li>
                <li>Cargo may require inspection by customs and other regulatory bodies at their instance and time.</li>
                <li>Our minimum CBM is 0.02. All items below 0.02CBM will be charged per our minimum CBM.</li>
                <li>Measurements will be re-taken at the warehouse in Ghana to confirm CBM before payments are made.</li>
                <li>Goods stored in our warehouse are subject to warehouse lien...</li>
                <li>After goods have arrived, leaving items at the warehouse for more than 4 days will incur a warehouse charge...</li>
                <li>Goods more than 300kg will be charged per ton and goods...</li>
                <li>Goods weighing more than 700kg is equivalent to 1 CBM.</li>
            </ol>
        </div>


                <div className="payment_btn" style={{display:"flex",border:"none",gap:"10px",justifyContent:"flex-end",marginTop:"20px"}} >
                  <button
                    type="button"
                    className="btn"
                    onClick={togglePopup}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    
                    className="animated-button"
                    
                    style={{display:"flex",gap:"5px",background:"#A7C756",border:"none",color:"white",paddingBlock:"8px",paddingInline:"16px",borderRadius:"10px"}}
            
                  >
                    Make Payment
                  </button>
                  <Link to={"/AllOrders"}><button className="view">View Orders</button></Link>
                </div>
              </form>
            </div>
          </div>

          {creatingOrder && <div className='creating_order'>Creating Order... </div> }
          <div>
      
      
    </div>
         


           
        </div>
      )}
      </div>
      <TrackingSub orders={[...orders]} deleteOrder={deleteOrder}/>
    </motion.div>
  );
};

export default Overview;
