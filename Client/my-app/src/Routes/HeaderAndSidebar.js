import { BellOutlined, SettingOutlined,DashboardOutlined , ProductOutlined, LogoutOutlined } from '@ant-design/icons'
import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
 
  
  return (
    <header className={`header fixed  h-[60px] w-full float-none top-0 z-1 flex justify-around border-2 border-green-200 bg-white lg:w-4/5 right-0 `}>
        <h3 className='bg-blue-300 flex item-center justify-center font-bold text-lg my-auto'>SCMS</h3>
        <nav className='flex gap-3 h-[40px] my-auto'>
          <NavLink to={"/Trends"} >
             <button className='rounded-xl h-full flex justify-center items-center'><img src="../images/Trending.png" alt="trends"></img>  Trends</button>
          </NavLink>
          <NavLink to={"/"} >
             <button className="flex h-full justify-center items-cemter"><img src="../images/Bell.png" alt="Bell"></img>NewsFlash</button>
          </NavLink>
        </nav>
    </header>
  )
}

export function Sidebar(){
  const data=[
    {name:"Dashboard",icon:<DashboardOutlined />},
    {name:"Inventory"},
    {name:"Product", icon: <ProductOutlined />},
    {name:"Settings",icon:<SettingOutlined />}
  ]

  
    return(
      <aside className={`fixed left-0 top-0 bg-blue-300 w-[20%] hidden h-screen lg:block`}>
         <ul className='translate-y-[80px] bg-yellow-300 flex flex-col gap-2 mx-auto w-[80%]'>
        {data.map((item,index)=>(
           
            <li key={index} className='bg-orange-300 py-2 font-medium'>{item.icon}{item.name}</li>

        ))}
           <li className='bg-red-300 py-2'><LogoutOutlined /> Log Out</li>
          
         </ul>
          
      </aside>
    )
}