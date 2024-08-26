import React from 'react';
import axios from 'axios'
import {DatabaseOutlined,SettingOutlined,FileTextOutlined,BarChartOutlined,CompassOutlined,TruckOutlined,LogoutOutlined} from "@ant-design/icons"
import {NavLink} from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const CustomerSidebar = () => {
    const data=[
        {name:"Overview",icon:<DatabaseOutlined />},
        {name:"Shipping", icon: <TruckOutlined />},
        {name:"Invoice",icon:<FileTextOutlined/>}, 
        {name:"Analytics",icon:<BarChartOutlined />},
        {name:"Tracking",icon:<CompassOutlined />},
        {name:"Settings",icon:<SettingOutlined />}
      ]
      const navigate= useNavigate()

   axios.defaults.withCredentials=true
  const LogOut =async()=>{
     try{
        await axios.post("http://localhost:5000/logout")
        .then(res=>{
         if(res.data==="Success"){
          localStorage.removeItem("accesstoken")
            navigate("/Login")
         }
        })
        .catch(err=> console.log(err))
       
        
     }catch(e){
       console.error(e)
     }
  }
  return (
    <aside className={`fixed left-0 top-[60px] w-[20%] bg-stone-100 hidden h-screen lg:block`}>
         <ul className='translate-y-[40px]  flex flex-col gap-2 mx-auto w-[80%]'>
        {data.map((item,index)=>(
           <NavLink to={`/Customer/${item.name}`}>
            <li key={index} className='text-stone-500 pl-2 py-2 rounded-xl font-medium border-2 border-stone-300 hover:text-stone-600 hover:border-stone-400'>{item.icon}{item.name}</li>
            </NavLink>

        ))}
           <li  ><button onClick={LogOut} className='bg-red-300 py-2 rounded-xl font-medium h-full w-full '><LogoutOutlined /> Log Out</button></li>
          
         </ul>
         
      </aside>
  );
};

export default CustomerSidebar;