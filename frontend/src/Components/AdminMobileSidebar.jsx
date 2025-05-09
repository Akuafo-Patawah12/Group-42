import React from "react";
import { Drawer } from "antd";
import {
  Menu,
  LayoutDashboard,
  User,
  Truck,
  Package,
  Settings,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={24} />, path: "/L/Dashboard" },
  { key: "user", label: "Users", icon: <User size={24} />, path: "/L/Users" },
  { key: "shipments", label: "Shipments", icon: <Truck size={24} />, path: "/L/Shipments" },
  { key: "containers", label: "Containers", icon: <Package size={24} />, path: "/L/containers" },
  { key: "settings", label: "Settings", icon: <Settings size={24} />, path: "/L/Settings" },
];

const AdminMobileSidebar = ({ toggle }) => {
  const [openMobileSidebar, setOpenMobileSidebar] = toggle;
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setOpenMobileSidebar(false);
    navigate(path);
  };

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile  && <Drawer
        placement="bottom"
        closable={false}
        onClose={() => setOpenMobileSidebar(false)}
        open={openMobileSidebar}
        height="50vh"
        className="adminMobileSidebar rounded-t-2xl "
        bodyStyle={{
          padding: "0",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-300">
          <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
          <button onClick={() => setOpenMobileSidebar(false)}>
            <X className="text-gray-500 hover:text-gray-800" size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-3 gap-4 p-4 overflow-auto">
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => handleNavigate(item.path)}
              className="flex flex-col items-center border border-purple-300 justify-center bg-purple-100 hover:bg-purple-200 transition-all rounded-xl p-4 shadow-md cursor-pointer"
            >
              <div className="text-purple-600">{item.icon}</div>
              <span className="mt-2 text-sm font-medium text-gray-800">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Drawer>}
    </>
  );
};

export default AdminMobileSidebar;
