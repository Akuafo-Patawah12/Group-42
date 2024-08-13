import React,{useState,useEffect,useRef} from "react"
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
    return(
        <div className="mt-[70px] h-[300px] w-[50%]">
            <button onClick={()=>setOpenDialog(true)} className="flex bg-stone-400 rounded-lg">Make Order</button>
            {openDialog && <div  className='Css'>
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
        </div>
    )
}
export default CustomerGoods;