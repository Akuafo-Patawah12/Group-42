import React, { useState } from "react";
import {
 
 
  LogoutOutlined,

} from "@ant-design/icons";
import { Package,LayoutDashboard, Truck,User, Settings } from 'lucide-react';

import {  NavLink,useLocation } from "react-router-dom";
import { Layout, Menu, Button, Tooltip } from "antd";
import axios from "axios";
import   useLogout  from  "../Hooks/Logout"

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const location = useLocation()

  const logout = useLogout()

  axios.defaults.withCredentials = true;


  const [isMobile, setIsMobile] = React.useState(window.innerWidth > 768);
  
    React.useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth > 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20}/>, path: "/L/Dashboard" },
    { key: "user", label: "Users", icon: <User size={20} style={{color:"#333"}}/>, path: "/L/Users" },
    { key: "shipments", label: "Shipments", icon: <Truck size={20} style={{color:"#333"}}/>, path: "/L/Shipments" },
    { key: "containers", label: "Containers", icon: <Package size={20} style={{color:"#333"}}/>, path: "/L/containers" },
    { key: "settings", label: "Settings", icon: <Settings size={20} style={{color:"#333"}}/>, path: "/L/Settings" },
  ];

  return (
    <>
    {isMobile &&
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{position:"fixed",background:"#eee"}} className="customer_sidebar z-3 left-2 top-18 h-screen   bg-stone-100">
          
    
          {/* Sidebar Menu */}
          <Menu theme="light" mode="inline" selectedKeys={[location.pathname]} style={{height:"80%",borderRadius:"10px",border:"1px solid #d6d3d1",boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",position:"relative"}} defaultSelectedKeys={["overview"]}>
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
                <NavLink to={item.path} style={{color:"#333"}}>{item.label}</NavLink>
              </Menu.Item>
            ))}

            {/* Logout Button */}
          <div className="absolute translate-x-[-50%] translate-y-[-50%] left-[50%] bottom-[10px] w-[90%] flex justify-center">
            <Tooltip title="Log Out">
              <Button type="primary" danger className="bg-red-300" icon={<LogoutOutlined />} onClick={logout} block={!collapsed}>
                {!collapsed && "Log Out"}
              </Button>
            </Tooltip>
          </div>
          </Menu>
    
          
        </Sider>}
        </>
  );
};

export default Sidebar;
