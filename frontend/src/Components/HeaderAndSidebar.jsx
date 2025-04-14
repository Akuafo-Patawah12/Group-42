import { NavLink } from "react-router-dom"

import {  BellOutlined } from "@ant-design/icons";
import {ShoppingCart} from "lucide-react"
import { Button, Space } from "antd";

export default function Header() {
  const user= localStorage.getItem('user');
 
  return (
     <header className={`header fixed  h-[80px] w-full float-none top-0 z-[44] flex justify-between border-b-[1px]  border-stone-300 bg-white  `}>
       <img src="/svgl_svg_format_2.svg" className="translate-x-3 translate-y-[-15px]" alt="logo"/>
       <nav className="flex gap-3 h-[40px] mx-[2%] my-auto">
      <Space>
        <NavLink to={"/Customer/Trends"}>
          <Button
            icon={<ShoppingCart size={15}/>}
            className="rounded-full size-8 flex justify-center items-center bg-gray-200  font-medium"
          />
           
          
        </NavLink>

        <NavLink to={"/Notification"}>
          <Button
            icon={<BellOutlined />}
            className="rounded-full size-8 flex justify-center items-center  bg-gray-200 font-medium"
          />
          
          
        </NavLink>
        <div className="rounded-full bg-gray-200  flex items-center justify-center  text-xs font-bold text-stone-600 py-1 pl-3 pr-1 gap-1">{user}<span className="size-7 flex items-center justify-center border-[3px] border-purple-400 rounded-full">{user[0]}</span></div>
      </Space>
    </nav>
    </header>
  )
}
