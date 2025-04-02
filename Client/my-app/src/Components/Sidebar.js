import React, { useState } from "react";
import {
  SettingOutlined,
  DashboardOutlined,
  LogoutOutlined,
  DatabaseOutlined,
  PullRequestOutlined,
  TruckOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate, NavLink } from "react-router-dom";
import { Layout, Menu, Button, Tooltip } from "antd";
import axios from "axios";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

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
    { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, path: "/L/Dashboard" },
    { key: "clients", label: "Clients", icon: <DatabaseOutlined />, path: "/L/Clients" },
    { key: "shipments", label: "Shipments", icon: <TruckOutlined />, path: "/L/Shipments" },
    { key: "orders", label: "Orders", icon: <PullRequestOutlined />, path: "/L/Orders" },
    { key: "reports", label: "Reports", icon: <ContainerOutlined />, path: "/L/Reports" },
    { key: "warehousing", label: "Warehousing", icon: <ContainerOutlined />, path: "/L/Warehousing" },
    { key: "settings", label: "Settings", icon: <SettingOutlined />, path: "/L/Settings" },
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className="h-screen shadow-md">
      {/* Toggle Sidebar Button */}
      <div className="flex justify-center my-4">
        <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
      </div>

      {/* Sidebar Menu */}
      <Menu theme="light" mode="inline" defaultSelectedKeys={["dashboard"]}>
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <NavLink to={item.path}>{item.label}</NavLink>
          </Menu.Item>
        ))}
      </Menu>

      {/* Logout Button */}
      <div className="absolute bottom-4 w-full flex justify-center">
        <Tooltip title="Log Out">
          <Button type="primary" danger icon={<LogoutOutlined />} onClick={LogOut} block={!collapsed}>
            {!collapsed && "Log Out"}
          </Button>
        </Tooltip>
      </div>
    </Sider>
  );
};

export default Sidebar;
