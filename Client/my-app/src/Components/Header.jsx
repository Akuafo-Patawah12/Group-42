import React,{useState} from 'react'
import {Link,NavLink} from "react-router-dom"
import { ReactComponent as SvgIcon } from "../icons/svgl_svg_format_2.svg"
import { ReactComponent as Triangle } from "../icons/Triangle.svg"
import "./Header.css"

const Header = ({popDetails,setIsOpen,rotate}) => {

    const [pop1,pop2,popUp1,setPopUp1,popUp2,setPopUp2] = popDetails
    const [isRotate,setIsRotate]= rotate
    const[popNav,setPopNav]= useState(false) 
    const[height,setHeight]= useState(false)
    function toggleHeight({setIsOpen}){
       setHeight(!height)
    }

            const Link_text={textDecoration:"none", fontSize:"15px"}
      

            


  return (
    <header className='w-full border-b-2 bg-white fixed top-0 z-40 h-[80px] items-center flex justify-between' style={{borderTop:"5px solid var(--purple)"}}>
            <SvgIcon />
           
    
    
    <nav   style={{transform:"translateY(10px)"}} className="hidden gap-4 text-lg font-semibold md:flex lg:flex">
         <NavLink to={"/"}><span className='header_links' style={{fontSize:"16px",fontWeight:"600",}}>Home</span> </NavLink>
         <NavLink to={"/About_us"} style={{position:"relative"}} className="click" onClick={()=>{setPopNav(prev => !prev)}}><span style={{display:"flex",fontSize:"16px",fontWeight:"500"}}>About  <Triangle style={{rotate:"180deg",transform:"translateY(-8px)"}}/></span> 
              <div className="drop" style={{position:"absolute",background:"white",width:"200%",padding:"8px",zIndex:"40"}}>
                <a href='#why_choose_us'><p ><Link className="block px-4 py-2 hover:bg-gray-100 transition"  to={"/"} style={{fontSize:"15px"}}>Why choose us</Link></p></a>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/About"} style={{fontSize:"15px"}}>About us</Link></p>
                
         </div>
         </NavLink>

         
         <NavLink to={"/Services"} style={{position:"relative",}} className="click "><span style={{display:"flex",fontSize:"16px",fontWeight:"500"}}>Services  <Triangle style={{rotate:"180deg",transform:"translateY(-10px)"}}/></span> 
              <div className="drop" style={{position:"absolute",background:"white",width:"170%",padding:"8px",isolation:"isolate",zIndex:"99"}}>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/AirFreight"} style={Link_text}>Air freight</Link></p>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/SeaFreight"} style={Link_text}>Sea freight</Link></p>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/Procurement"} style={Link_text}>Procurement</Link></p>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/Door2door"} style={Link_text}>Door to door delivery</Link></p>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/Groupage"} style={Link_text}>Groupage</Link></p>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/Marketing"} style={Link_text}>Shop with us</Link></p>
              </div>
         </NavLink>
         
         <NavLink to={"/Contact_us"} style={Link_text} className="header_links"><span style={{fontSize:"16px",fontWeight:"600"}} >Contact</span> </NavLink>
 
         <NavLink to={"/More"} style={Link_text} className=" click"><span style={{display:"flex",fontSize:"16px",fontWeight:"500"}}>More  <Triangle style={{rotate:"180deg",transform:"translateY(-8px)"}}/></span> 
         <div className="drop" style={{position:"absolute",background:"white",width:"170%",padding:"8px",isolation:"isolate",zIndex:"99"}}>
              
               
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/More/FAQs"} style={Link_text}>FAQs</Link></p>
                
              
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Orders"} style={Link_text}>Get a quote</Link></p>

                
               <p> <Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/More/Gallery"} style={Link_text}>Gallery</Link></p>
               
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/More/Privacy_&_Policy"} style={Link_text}>Privacy & Policy</Link></p>
                
            </div>
              
         </NavLink>     
          </nav> 
          

          <div className='flex gap-2 h-full items-center'>
         <button onClick={()=> setIsOpen(prev=> !prev)} className="h-[60px] block" style={{border:"none",background:"#a422d0",borderRadius:"10px",paddingInline:"10px",color:"#fff",fontSize:"16px",fontWeight:"500"}}>Track shipments</button>

         <div className="flex items-center justify-center   md:hidden lg:hidden">
      <button
        onClick={pop2}
        className="relative w-10 h-10 focus:outline-none"
      >
        {/* Top bar */}
        <div
          className={`absolute top-1 left-0 w-full h-[5px] border-purple-600 border-2 rounded transition-transform duration-300 ${
            popUp2 ? "rotate-45 translate-y-3 border-stone-600" : ""
          }`}
        ></div>
        {/* Middle bar */}
        <div
          className={`absolute top-4 left-0 w-full h-[5px] bg-stone-500  rounded transition-opacity duration-300 ${
            popUp2 ? "opacity-0" : ""
          }`}
        ></div>
        {/* Bottom bar */}
        <div
          className={`absolute top-7 left-0 w-full h-[5px] border-purple-600 border-2 rounded transition-transform duration-300 ${
            popUp2 ? "-rotate-45 -translate-y-3 border-stone-600" : ""
          }`}
        ></div>
      </button>
    </div>
    </div>
        </header>
  )
}

export default Header