import React from "react";
import { Drawer } from "antd";
import {
  DatabaseOutlined,
  SettingOutlined,
 
  CompassOutlined,
  
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"
const menuItems = [
    { key: "overview", label: "Overview", icon: <DatabaseOutlined className="text-purple-600"/>, path: "/Customer/Overview" },
    { key: "tracking", label: "Tracking", icon: <CompassOutlined className="text-purple-600"/>, path: "/Customer/Tracking" },
    { key: "profile", label: "Profile", icon: <DatabaseOutlined className="text-purple-600"/>, path: "/Customer/Profile" },
    { key: "settings", label: "Settings", icon: <SettingOutlined className="text-purple-600"/>, path: "/Customer/Settings" },
  ];

const CustomerMobileSidebar = ({ toggle }) => {
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

export default CustomerMobileSidebar;
