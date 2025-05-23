import React, { useState } from "react";
import {
  DatabaseOutlined,
  SettingOutlined,
 
  CompassOutlined,
  
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Tooltip } from "antd";
import { NavLink,useLocation } from "react-router-dom";
import axios from "axios";
import useLogout from "../Hooks/Logout";

const { Sider } = Layout;

const CustomerSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
 
  const location = useLocation();
  axios.defaults.withCredentials = true;

  const logout = useLogout()

  const menuItems = [
    { key: "overview", label: "Overview", icon: <DatabaseOutlined className="text-purple-600"/>, path: "/Customer/Overview" },
    { key: "tracking", label: "Tracking", icon: <CompassOutlined className="text-purple-600"/>, path: "/Customer/Tracking" },
    { key: "profile", label: "Profile", icon: <DatabaseOutlined className="text-purple-600"/>, path: "/Customer/Profile" },
    { key: "settings", label: "Settings", icon: <SettingOutlined className="text-purple-600"/>, path: "/Customer/Settings" },
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{position:"fixed",background:"#eee"}} className="customer_sidebar z-3 left-2 top-18 h-screen   bg-stone-100">
      

      {/* Sidebar Menu */}
      <Menu theme="light" mode="inline" selectedKeys={[location.pathname]} style={{position:"relative",height:"90%",borderRadius:"10px",border:"1px solid #d6d3d1",boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.05)"}} defaultSelectedKeys={["overview"]}>
        {menuItems.map((item) => (
          <Menu.Item 
           style={{
            borderRadius: "8px",
            fontWeight: 500,
            backgroundColor: location.pathname === item.path ? "#E9D5FF" : "transparent", // bg-purple-300
            transition: "background 0.3s ease",
          }}
           key={item.key}
            icon={<span className="text-purple-600">
            {item.icon}
            </span>}>
            <NavLink to={item.path}>{item.label}</NavLink>
          </Menu.Item>
        ))}

        {/* Logout Button */}
      <div className="absolute translate-x-[-50%] translate-y-[-50%] left-[50%] bottom-[10px] w-[90%] flex justify-center">
        <Tooltip title="Log Out">
          <Button type="primary" style={{background:"#f87171"}}  className="bg-red-300 border text-red-500 border-red-400" icon={<LogoutOutlined />} onClick={logout} block={!collapsed}>
            {!collapsed && "Log Out"}
          </Button>
        </Tooltip>
      </div>
      </Menu>

      
    </Sider>
  );
};

export default CustomerSidebar;
