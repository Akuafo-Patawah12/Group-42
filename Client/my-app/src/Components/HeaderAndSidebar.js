import { NavLink } from "react-router-dom"
import { ReactComponent as SvgIcon } from "../icons/svgl_svg_format_2.svg"
import { FireOutlined, BellOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export default function Header() {
 
  return (
     <header className={`header fixed  h-[80px] w-full float-none top-0 z-[44] flex justify-between border-b-[1px] shadow-xl border-purple-500 bg-stone-50  `}>
       <SvgIcon className="translate-x-3 translate-y-[-15px]"/>
       <nav className="flex gap-3 h-[40px] mx-[2%] my-auto">
      <Space>
        <NavLink to={"/Customer/Trends"}>
          <Button
            icon={<FireOutlined />}
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
      </Space>
    </nav>
    </header>
  )
}
