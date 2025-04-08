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
           
    
    
            <nav className="nav-tabbar">
  <NavLink to="/" className={({ isActive }) => isActive ? "tab-link active" : "tab-link"}>
    Home
  </NavLink>

  <div className="tab-link">
    <span>About ▾</span>
    <div className="dropdown">
      <Link to="/" style={{ fontSize: "14px" }}>Why choose us</Link>
      <Link to="/About" style={{ fontSize: "14px" }}>About us</Link>
    </div>
  </div>

  <div className="tab-link">
    <NavLink to="/Services" className={({ isActive }) => isActive ? "tab-link active" : "tab-link"}>Services ▾</NavLink>
    <div className="dropdown">
      <Link to="/Services/AirFreight">Air Freight</Link>
      <Link to="/Services/SeaFreight">Sea Freight</Link>
      <Link to="/Services/Procurement">Procurement</Link>
      <Link to="/Services/Door2door">Door to Door</Link>
      <Link to="/Services/Groupage">Groupage</Link>
      <Link to="/Services/Marketing">Shop with Us</Link>
    </div>
  </div>

  <NavLink to="/Contact_us" className={({ isActive }) => isActive ? "tab-link active" : "tab-link"}>
    Contact
  </NavLink>

  <div className="tab-link">
    <NavLink to="/More" className={({ isActive }) => isActive ? "tab-link active" : "tab-link"}>More ▾</NavLink>
    <div className="dropdown">
      <Link to="/More/FAQs">FAQs</Link>
      <Link to="/Orders">Get a Quote</Link>
      <Link to="/More/Gallery">Gallery</Link>
      <Link to="/More/Privacy_&_Policy">Privacy & Policy</Link>
    </div>
  </div>
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