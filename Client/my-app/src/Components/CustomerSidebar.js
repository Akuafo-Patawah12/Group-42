import React, { useState } from "react";
import {
  DatabaseOutlined,
  SettingOutlined,
  FileTextOutlined,
  BarChartOutlined,
  CompassOutlined,
  TruckOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Tooltip } from "antd";
import { NavLink, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

const { Sider } = Layout;

const CustomerSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  axios.defaults.withCredentials = true;

  const LogOut = async () => {
    try {
      await axios.post("http://localhost:5000/logout").then((res) => {
        if (res.data === "Success") {
          localStorage.removeItem("accesstoken");
          navigate("/Login");
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const menuItems = [
    { key: "overview", label: "Overview", icon: <DatabaseOutlined className="text-purple-600"/>, path: "/Customer/Overview" },
    { key: "shipping", label: "Shipping", icon: <TruckOutlined className="text-purple-600"/>, path: "/Customer/Shipping" },
    { key: "invoice", label: "Invoice", icon: <FileTextOutlined className="text-purple-600"/>, path: "/Customer/Invoice" },
    { key: "analytics", label: "Analytics", icon: <BarChartOutlined className="text-purple-600"/>, path: "/Customer/Analytics" },
    { key: "tracking", label: "Tracking", icon: <CompassOutlined className="text-purple-600"/>, path: "/Customer/Tracking" },
    { key: "settings", label: "Settings", icon: <SettingOutlined className="text-purple-600"/>, path: "/Customer/Settings" },
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className="fixed left-2 top-8 h-screen  bg-stone-100">
      {/* Sidebar Toggle Button */}
      <div className="flex justify-center my-4">
        <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
      </div>

      {/* Sidebar Menu */}
      <Menu theme="light" mode="inline" selectedKeys={[location.pathname]} style={{height:"80%",borderRadius:"10px",boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.05)"}} defaultSelectedKeys={["overview"]}>
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
          <Button type="primary" danger className="bg-red-300" icon={<LogoutOutlined />} onClick={LogOut} block={!collapsed}>
            {!collapsed && "Log Out"}
          </Button>
        </Tooltip>
      </div>
    </Sider>
  );
};

export default CustomerSidebar;
