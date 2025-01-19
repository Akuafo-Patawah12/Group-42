import { NavLink } from "react-router-dom"
import { ReactComponent as SvgIcon } from "../icons/svgl_svg_format_2.svg"

export default function Header() {
 
  return (
     <header className={`header fixed  h-[80px] w-full float-none top-0 z-[44] flex justify-between border-b-[1px] shadow-xl border-green-200 bg-stone-50  `}>
       <SvgIcon className="translate-x-3 translate-y-[-15px]"/>
        <nav className='flex gap-3 h-[40px] mx-[2%] my-auto'>
          <NavLink to={"/Trends"}>
             <button className='rounded-xl h-full flex justify-center px-1 items-center  border-2 border-stone-300 font-medium'><img src="../images/Trending.png" alt="trends"></img>  Trends</button>
          </NavLink>
          <NavLink to={"/Notification"} className={"my-auto"} >
             <button className=" rounded-xl flex h-[40px]  items-center w-auto px-1  border-2 border-stone-300 font-medium "><img src="../images/Bell.png" alt="Bell"></img>NewsFlash</button>
          </NavLink>
          
        </nav>
    </header>
  )
}
