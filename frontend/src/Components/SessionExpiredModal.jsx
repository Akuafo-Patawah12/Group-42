// SessionExpiredModal.js
import { Modal } from "antd";
import { LogOut } from "lucide-react"; // Lucide React icon
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SessionExpiredModal = ({ visible }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(visible);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  const handleOk = () => {
    setOpen(false);
    navigate("/Login");
  };

  return (
    <Modal
      open={open}
      centered
      closable={false}
      onOk={handleOk}
      
      cancelButtonProps={{ style: { display: "none" } }}
      okText="Login"
      okButtonProps={{
            style: {
            backgroundColor: "var(--purple)", // or any color you want
            color: "#fff",
            border: "none",
            width:"100%",
            paddingBlock:"10px",
            fontWeight:"bold",
            marginInline:"auto",
            marginTop:"30px",
            outlineOffset:"3px",
            outline:"2px solid var(--purple)"
            }
        }}
      title={
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <LogOut size={20} style={{ color: "#fa541c" }} />
          Session Expired
        </span>
      }
    >
      <p>Your session has expired or you've been logged out. Please log in again.</p>
    </Modal>
  );
};

export default SessionExpiredModal;
