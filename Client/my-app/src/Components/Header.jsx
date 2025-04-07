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

            const Link_text={textDecoration:"none", fontSize:"14px",paddingInline:"4px"}
      

            


  return (
    <header className='w-full  bg-white sticky top-0 z-40 h-[80px] items-center flex justify-between' >
            <SvgIcon />
           
    
    
    <nav className="px-3 h-[40px] rounded-xl bg-slate-100 hidden gap-4 text-sm  md:flex lg:flex items-center justify-center" style={{border:"1px solid #ddd"}}>
         <NavLink to={"/"}><span className='header_links' style={{fontSize:"14px",fontWeight:"600",borderRight:"2px solid #ccc"}}>Home</span> </NavLink>
         <NavLink to={"/About_us"} style={{position:"relative"}} className="click border-r-2 border-r-[#ccc]" onClick={()=>{setPopNav(prev => !prev)}}><span style={{display:"flex",fontSize:"14px",fontWeight:"500"}}>About  <Triangle style={{rotate:"180deg",transform:"translateY(-8px)"}}/></span> 
              <div className="drop" style={{position:"absolute",background:"white",width:"200%",padding:"8px",zIndex:"40"}}>
                <a href='#why_choose_us'><p ><Link className="block px-4 py-2 hover:bg-gray-100 transition"  to={"/"} style={{fontSize:"14px"}}>Why choose us</Link></p></a>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/About"} style={{fontSize:"14px"}}>About us</Link></p>
                
         </div>
         </NavLink>

         
         <NavLink to={"/Services"} style={{fontSize:"14px",position:"relative",borderRight:"2px solid #ccc"}} className="click "><span style={{display:"flex",fontSize:"14px",fontWeight:"500"}}>Services  <Triangle style={{rotate:"180deg",transform:"translateY(-10px)"}}/></span> 
              <div className="drop" style={{position:"absolute",background:"white",width:"170%",padding:"8px",isolation:"isolate",zIndex:"99"}}>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/AirFreight"} style={Link_text}>Air freight</Link></p>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/SeaFreight"} style={Link_text}>Sea freight</Link></p>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/Procurement"} style={Link_text}>Procurement</Link></p>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/Door2door"} style={Link_text}>Door to door delivery</Link></p>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/Groupage"} style={Link_text}>Groupage</Link></p>
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Services/Marketing"} style={Link_text}>Shop with us</Link></p>
              </div>
         </NavLink>
         
         <NavLink to={"/Contact_us"} style={Link_text} className="header_links border-r-2 border-r-[#ccc]"><span style={{fontSize:"14px",fontWeight:"600"}} >Contact</span> </NavLink>
 
         <NavLink to={"/More"} style={Link_text} className=" click"><span style={{display:"flex",fontSize:"14px",fontWeight:"500"}}>More  <Triangle style={{rotate:"180deg",transform:"translateY(-8px)"}}/></span> 
         <div className="drop" style={{position:"absolute",background:"white",width:"170%",padding:"8px",isolation:"isolate",zIndex:"99"}}>
              
               
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/More/FAQs"} style={Link_text}>FAQs</Link></p>
                
              
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/Orders"} style={Link_text}>Get a quote</Link></p>

                
               <p> <Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/More/Gallery"} style={Link_text}>Gallery</Link></p>
               
                <p><Link className="block px-4 py-2 hover:bg-gray-100 transition" to={"/More/Privacy_&_Policy"} style={Link_text}>Privacy & Policy</Link></p>
                
            </div>
              
         </NavLink>     
          </nav> 
          

          <div className='flex gap-2 h-full items-center'>
         <button onClick={()=> setIsOpen(prev=> !prev)} className="h-[40px] block bg-purple-200 bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 border-2 border-purple-400 " style={{color:"#222",borderRadius:"10px",paddingInline:"8px",fontSize:"14px",fontWeight:"500"}}>Track shipments</button>

         <div className="flex items-center justify-center md:hidden lg:hidden">
  <button
    onClick={pop2}
    aria-label="Toggle Menu"
    className="relative w-9 h-9 flex items-center justify-center rounded-md transition-all duration-300 group focus:outline-none"
  >
    {/* Top bar */}
    <span
      className={`absolute w-6 h-[3px] bg-stone-700 rounded-md transform transition-transform duration-300 ease-in-out ${
        popUp2 ? "rotate-45 top-1/2" : "top-2"
      }`}
    ></span>

    {/* Middle bar */}
    <span
      className={`absolute w-6 h-[3px] bg-stone-700 rounded-md transition-opacity duration-300 ease-in-out ${
        popUp2 ? "opacity-0" : "top-[47%]"
      }`}
    ></span>

    {/* Bottom bar */}
    <span
      className={`absolute  h-[3px] bg-stone-700 rounded-md transform transition-transform duration-300 ease-in-out ${
        popUp2 ? "-rotate-45 top-1/2 w-6" : "bottom-2 w-4 left-[20%]"
      }`}
    ></span>
  </button>
</div>

    </div>
        </header>
  )
}

export default Header