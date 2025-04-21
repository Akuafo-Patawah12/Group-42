import { useState } from "react";
import "./LogisticsReport.css"; // Assuming you have a CSS file for styling
import { Modal, Button, Descriptions, Typography, Spin } from "antd";
const{Title} = Typography
const LogisticsReport = ({ order, onClose,visible,loading3 }) => {
  if (!order) return null;

  return (
    
      <Modal 
      open={visible} 
      onCancel={onClose} 
      footer={null} 
      width={500} 
      centered
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Shipment Details
      </Title>

      {loading3 ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
          <p>Loading shipment details...</p>
        </div>
      ) : (
        <>
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Tracking No:"> {order.tracking_no || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Status:">{order.Status || "Pending"}</Descriptions.Item>
            <Descriptions.Item label="CBM">{order.cbm || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Port">{order?.shipmentId?.port === undefined ? 'N/A' : order.shipmentId.port}</Descriptions.Item>
            <Descriptions.Item label="Route:">{order?.shipmentId?.route === undefined ? 'N/A' : order.shipmentId.route }</Descriptions.Item>
            <Descriptions.Item label="Quantity:">{order.qty || "Unknown"}</Descriptions.Item>
            
            
            <Descriptions.Item label="Total Amount:">
            {order.totalAmount ? `$${order.totalAmount}` : "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Updated At:">
              {new Date(order.updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>

          
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <Button type="primary" onClick={onClose}>Close</Button>
          </div>
        </>
      )}
    </Modal>
    
  );
};

export default LogisticsReport;