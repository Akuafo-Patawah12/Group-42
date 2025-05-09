import { useState } from "react";
import "./LogisticsReport.css";
import { Modal, Button, Descriptions, Typography, Spin } from "antd";
import { Copy, Check } from "lucide-react"; // Lucide icons

const { Title } = Typography;

const LogisticsReport = ({ order, onClose, visible, loading3 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(order.tracking_no || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  if (!order) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={520}
      centered
      bodyStyle={{
        borderRadius: "12px",
        padding: "20px",
        background: "#f9f5ff",
        boxShadow: "0 8px 24px rgba(159, 122, 234, 0.1)",
      }}
    >
      <Title
        level={3}
        style={{
          textAlign: "center",
          color: "#6b46c1",
          fontWeight: 700,
          marginBottom: "24px",
        }}
      >
        Shipment Details
      </Title>

      {loading3 ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Spin size="large" />
          <p style={{ marginTop: "10px", color: "#6b46c1" }}>
            Loading shipment details...
          </p>
        </div>
      ) : (
        <>
          <Descriptions
            bordered
            column={1}
            size="small"
            contentStyle={{ backgroundColor: "#f3e8ff" }}
            labelStyle={{
              fontWeight: 600,
              backgroundColor: "#ede9fe",
              color: "#6b46c1",
            }}
          >
            <Descriptions.Item label="Tracking No:">
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {order.tracking_no || "N/A"}
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: copied ? "green" : "#6b46c1",
                    whiteSpace: "nowrap",
                  }}
                  onClick={handleCopy}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  <span style={{ marginLeft: "2px", fontSize: "12px" }}>
                    {copied ? "Copied" : ""}
                  </span>
                </span>
              </span>
            </Descriptions.Item>

            <Descriptions.Item label="Status:">
              {order.Status || "Pending"}
            </Descriptions.Item>
            <Descriptions.Item label="CBM">
              {order.cbm || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Port">
              {order?.shipmentId?.port || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Route:">
              {order?.shipmentId?.route || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Quantity:">
              {order.qty || "Unknown"}
            </Descriptions.Item>
            <Descriptions.Item label="Total Amount:">
              {order.cbm ? `$${order.cbm * order.shipmentId?.cbmRate}` : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At:">
              {new Date(order.updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>

          <div style={{ textAlign: "right", marginTop: "24px" }}>
            <Button
              onClick={onClose}
              size="large"
              style={{
                borderRadius: "8px",
                background: "linear-gradient(to right, #9f7aea, #d6bcfa)",
                border: "none",
                color: "white",
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(159, 122, 234, 0.4)",
              }}
            >
              Close
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default LogisticsReport;
