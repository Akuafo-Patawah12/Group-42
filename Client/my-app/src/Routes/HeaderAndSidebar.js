import { SettingOutlined,DashboardOutlined , ProductOutlined, LogoutOutlined,DatabaseOutlined, PullRequestOutlined, TruckOutlined, ContainerOutlined } from '@ant-design/icons'
import axios from 'axios'
import { NavLink,useNavigate } from 'react-router-dom'

export default function Header() {
 
  return (
     <header className={`header fixed  h-[60px] w-full float-none top-0 z-[44] flex justify-between border-b-[1px] shadow-xl border-green-200 bg-stone-50  `}>
        <h3 className='text-green-500 flex item-center justify-center font-bold text-lg my-auto'>SCMS</h3>
        <nav className='flex gap-3 h-[40px] my-auto'>
          <NavLink to={"/Trends"} >
             <button className='rounded-xl h-full flex justify-center px-1 items-center'><img src="../images/Trending.png" alt="trends"></img>  Trends</button>
          </NavLink>
          <NavLink to={"/Notification"} className={"my-auto"} >
             <button className="flex h-[40px]  items-center w-auto px-1 "><img src="../images/Bell.png" alt="Bell"></img>NewsFlash</button>
          </NavLink>
          
        </nav>
    </header>
  )
}

export function Sidebar(){
  const data=[
    {name:"Dashboard",icon:<DashboardOutlined />},
    {name:"Inventory",icon:<DatabaseOutlined />},
    {name:"Product", icon: <ProductOutlined />},
    {name:"Logistics",icon:<TruckOutlined/>}, 
    {name:"Sourcing",icon:<PullRequestOutlined/>},
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
            <li key={index} className='text-stone-500 pl-2 py-2 rounded-xl font-medium border-2 border-stone-300 hover:text-stone-600 hover:border-stone-400'>{item.icon}{item.name}</li>
            </NavLink>

        ))}
           <li  ><button onClick={LogOut} className='bg-red-300 py-2 rounded-xl font-medium h-full w-full '><LogoutOutlined /> Log Out</button></li>
          
         </ul>
          
      </aside>
    )
}