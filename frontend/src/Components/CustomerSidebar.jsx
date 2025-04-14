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
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className="fixed left-2 top-8 h-screen   bg-stone-100">
      {/* Sidebar Toggle Button */}
      <div className="flex justify-center my-4">
        <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
      </div>

      {/* Sidebar Menu */}
      <Menu theme="light" mode="inline" selectedKeys={[location.pathname]} style={{height:"80%",borderRadius:"10px",border:"1px solid #d6d3d1",boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.05)"}} defaultSelectedKeys={["overview"]}>
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
      </Menu>

      {/* Logout Button */}
      <div className="absolute translate-x-[-50%] translate-y-[-50%] left-[50%] bottom-[100px] w-[90%] flex justify-center">
        <Tooltip title="Log Out">
          <Button type="primary"  className="bg-red-300 border text-red-500 border-red-400" icon={<LogoutOutlined />} onClick={logout} block={!collapsed}>
            {!collapsed && "Log Out"}
          </Button>
        </Tooltip>
      </div>
    </Sider>
  );
};

export default CustomerSidebar;
