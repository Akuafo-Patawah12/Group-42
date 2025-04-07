import { NavLink } from "react-router-dom"
import { ReactComponent as SvgIcon } from "../icons/svgl_svg_format_2.svg"
import {  BellOutlined } from "@ant-design/icons";
import {ShoppingCart} from "lucide-react"
import { Button, Space } from "antd";

export default function Header() {
  const user= localStorage.getItem('user');
 
  return (
     <header className={`header fixed  h-[80px] w-full float-none top-0 z-[44] flex justify-between border-b-[1px]  border-stone-300 bg-white  `}>
       <SvgIcon className="translate-x-3 translate-y-[-15px]"/>
       <nav className="flex gap-3 h-[40px] mx-[2%] my-auto">
      <Space>
        <NavLink to={"/Customer/Trends"}>
          <Button
            icon={<ShoppingCart size={15}/>}
            className="rounded-xl flex justify-center items-center border-2 border-gray-300 font-medium"
          >
            Marketplace
          </Button>
        </NavLink>

        <NavLink to={"/Notification"}>
          <Button
            icon={<BellOutlined />}
            className="rounded-xl flex justify-center items-center border-2 border-gray-300 font-medium"
          >
            NewsFlash
          </Button>
        </NavLink>
        <div className="rounded-full size-7 border-[3px] border-purple-400 flex items-center justify-center bg-stone-50 text-xs font-bold text-stone-600">{user[0]}</div>
      </Space>
    </nav>
    </header>
  )
}
