import React from 'react'
import { SettingOutlined,DashboardOutlined , ProductOutlined, LogoutOutlined,DatabaseOutlined, PullRequestOutlined, TruckOutlined, ContainerOutlined } from '@ant-design/icons'
import { useNavigate,NavLink } from 'react-router-dom'
import axios from 'axios'

const Sidebar = ({}) => {
    const data=[
        {name:"Dashboard",icon:<DashboardOutlined />},
        {name:"Clients",icon:<DatabaseOutlined />},
        {name:"Shipments", icon: <ProductOutlined />},
        {name:"Orders",icon:<TruckOutlined/>}, 
        {name:"Reports",icon:<PullRequestOutlined/>},
        {name:"Warehousing",icon:<ContainerOutlined/>},
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
      
        return(
          <aside className={`fixed left-0 top-[60px] w-[20%] bg-stone-100 hidden h-screen lg:block`}>
             <ul className='translate-y-[40px]  flex flex-col gap-2 mx-auto w-[80%]'>
            {data.map((item,index)=>(
               <NavLink to={`/${item.name}`}>
                <li key={index} className='text-stone-500 pl-2 py-2 rounded-xl font-medium border-2 border-stone-300 hover:text-stone-600 hover:border-stone-400 '>{item.icon}{item.name}</li>
                </NavLink>
    
            ))}
               <li><button onClick={LogOut} className='bg-red-300 py-2 rounded-xl font-medium h-full w-full '><LogoutOutlined /> Log Out</button></li>
              
             </ul>
              
          </aside>
        )
    }

export default Sidebar