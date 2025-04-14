import React,{useState,useEffect,useRef} from "react"
import {motion } from "framer-motion"
const CustomerGoods=()=>{
    const popRef= useRef(null)
                useEffect(()=>{   //this function allows u to close the popup menu by clicking outside of it.
                  let closePop =(event)=>{
                    if(popRef.current && !popRef.current.contains(event.target)){
                      setOpenDialog(false);
                    }
                       /**This function is executed when you click outside the pop up menu in event.js to close it */
                  }
                  document.addEventListener("mousedown",closePop);
                  return()=>{
                    document.removeEventListener("mousedown",closePop)
                    /**This function is executed when you click outside the sidebar to close it in ToggleSideBar.jsx */
                  }
                },[]);     
    const [openDialog,setOpenDialog]= useState(false)

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 1024);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return(
        <motion.div 
        initial={{ width:"0" }}
  animate={{ width: `${isSmallScreen ?"100%" :"80%"}`}}
        exit={{ width:"0" }}
        className="mt-[90px]   w-full  lg:w-[80%] ml-auto">
          <div className="container relative   mt-[50px] w-[80%] overflow-x-auto  mx-auto">
            <div className="flex gap-3">
            <button onClick={()=>setOpenDialog(true)} className=" bg-stone-400 font-medium h-[45px] leading-10 rounded-lg text-nowrap px-3">Make Order</button>
            <button className=" bg-stone-400 font-medium h-[45px] leading-10 rounded-lg px-3 text-nowrap">Goods at hand</button> 
            <button className="bg-stone-400 font-medium h-[45px] leading-10 rounded-lg px-3">Shipment</button>
            <button className=" bg-stone-400 font-medium h-[45px] leading-10 rounded-lg px-3">Shipment</button>
            <button className=" bg-stone-400 font-medium h-[45px] leading-10 rounded-lg px-3">Shipment</button>
            <button className=" bg-stone-400 font-medium h-[45px] leading-10 rounded-lg px-3">Shipment</button>
            <button className=" bg-stone-400 font-medium h-[45px] leading-10 rounded-lg px-3">Shipment</button>
            <button className=" bg-stone-400 font-medium h-[45px] leading-10 rounded-lg px-3">Shipment</button>
            <button className=" bg-stone-400 font-medium h-[45px] leading-10 rounded-lg px-3">Shipment</button>
            </div>
          </div>
          
            {openDialog && <div  className='fixed inset-0 bg-black/40 backdrop-blur-custom z-[78]'>
        {/*pop up menu */}
        <div  ref={popRef} className=' fixed w-[80%] h-[70%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] w-[80%] bg-white rounded-lg md:w-[50%] lg:w-[30%]'>
         
         
      <form  className='form flex justify-around  '>
    
        
      
      
      
       <button type='submit'
        className='rounded-xl bg-green-300 h-[40px] w-[100px]'>
          Post
        </button>
       
      </form>
      </div>
      </div>}{/*ending of popup menu */}
        </motion.div>
    )
}
export default CustomerGoods;