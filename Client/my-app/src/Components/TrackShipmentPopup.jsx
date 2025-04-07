import React, { useState } from "react";

import { Modal, Input, Button, Typography, Alert, Space } from "antd";

const { Title, Text } = Typography;

const TrackShipmentPopup = ({open,trackRef}) => {
    const [setIsOpen,isOpen] = open
  
  const [trackingId, setTrackingId] = useState("");
  const [shipmentStatus, setShipmentStatus] = useState(null);

  const handleTrackShipment = () => {
    // Simulate API call to fetch shipment status
    if (trackingId) {
      setShipmentStatus({
        id: trackingId,
        status: "In Transit",
        estimatedDelivery: "2025-01-15",
      });
    }
  };

  return (
    <div >
      

      <Modal
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
        setTrackingId("");
        setShipmentStatus(null);
      }}
      footer={null}
      title="Track Your Shipment"
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Input
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />

        <Alert
          type="info"
          showIcon
          className="border-2 border-purple-300 bg-purple-50"
          message={
            <div>
              <Text strong>NB:</Text> Your Consignment No. is the same as the Tracking number, which is sent to the email address you submitted for registration. <br />
              <br />
              The tracking number is a 13-digit code which starts with the prefix <Text code>“ILL”</Text> and ends with <Text code>“-SHP”</Text>.
              <br />
              <br />
              If you cannot find the email in your inbox, please check your Spam. Kindly get in touch with us if you still have not received your tracking number.
            </div>
          }
        />

        <Button type="primary" className="bg-purple-500" block onClick={handleTrackShipment}>
          Track
        </Button>

        {shipmentStatus && (
          <div style={{ background: "#f5f5f5", padding: 12, borderRadius: 6 }}>
            <p>
              <Text strong>Tracking ID:</Text> {shipmentStatus.id}
            </p>
            <p>
              <Text strong>Status:</Text> {shipmentStatus.status}
            </p>
            <p>
              <Text strong>Estimated Delivery:</Text> {shipmentStatus.estimatedDelivery}
            </p>
          </div>
        )}

        <Button danger block onClick={() => {
          setIsOpen(false);
          setTrackingId("");
          setShipmentStatus(null);
        }}>
          Close
        </Button>
      </Space>
    </Modal>
    </div>
  );
};

export default TrackShipmentPopup;
